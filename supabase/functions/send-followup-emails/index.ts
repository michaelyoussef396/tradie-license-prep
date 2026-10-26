import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { day3Html, day7Html } from "./copy.ts";
import { runFollowupStep, type SendResult } from "./step.ts";

/**
 * Daily lead follow-up sweep, driven only by pg_cron job `send-followup-emails-daily`.
 *
 * Auth is the `x-cron-secret` header, compared in constant time to env `CRON_SECRET`
 * (the cron job sends vault secret `followup_cron_secret`; the two must match).
 * verify_jwt is off, so this check is the only gate.
 *
 * By age since `created_at`, non-test leads with a usable email:
 *   Day 3  — 3 to <7 days,  status `new` | `thinking_about_it`, day-3 not yet sent
 *   Day 7  — 7 to <10 days, status `new` | `thinking_about_it`, or a `followed_up_3` this
 *            function set (day-3 sent), day-7 not yet sent
 *   Dead   — 10+ days,      status `followed_up_7` with day-7 actually sent by this function
 * A lead outside its window gets nothing late. Any other status (`qualified`,
 * `enrolled`, `completed`, `review_requested`, `dead`, or a hand-set `followed_up_*`) means
 * Adrian has handled it and is left alone. Status strings match `PipelineTab.tsx`.
 *
 * Each email is claimed in the database before it is sent (see `step.ts`), so a lead is never
 * emailed twice for the same step; a failed send is released for the next run only when Resend
 * definitely refused it.
 *
 * Body `{"dry_run": true}` returns the ids each step would touch; nothing is sent or written.
 */

const DAY_MS = 86_400_000;
const FROM_EMAIL = "Qualify Pro <hello@qualifypro.com.au>";

type Lead = { id: string; name: string; email: string | null; status: string | null };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

/** Constant-time: both sides are hashed to 32 bytes first, so length leaks nothing either. */
async function secretMatches(given: string, expected: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(given)),
    crypto.subtle.digest("SHA-256", enc.encode(expected)),
  ]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

function hasUsableEmail(lead: Lead): boolean {
  const email = (lead.email ?? "").trim().toLowerCase();
  return email.includes("@") && !email.startsWith("no-email@");
}

Deno.serve(async (req) => {
  const expected = Deno.env.get("CRON_SECRET") ?? "";
  const given = req.headers.get("x-cron-secret") ?? "";
  if (!expected || !given || !(await secretMatches(given, expected))) {
    return json({ error: "Unauthorized" }, 401);
  }

  let dryRun = false;
  try {
    dryRun = (await req.json())?.dry_run === true;
  } catch {
    // Empty or non-JSON body: a normal run.
  }

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const errors: string[] = [];
  const now = Date.now();
  const ago = (days: number) => new Date(now - days * DAY_MS).toISOString();

  // created_at in (now - olderThan, now - newerThan]: age >= newerThan days and < olderThan days.
  const base = () =>
    supabase.from("leads").select("id, name, email, status").eq("is_test", false).not("created_at", "is", null);

  const fetchStep = async (label: string, query: ReturnType<typeof base>): Promise<Lead[]> => {
    const { data, error } = await query;
    if (error) {
      errors.push(`${label} query: ${error.message}`);
      return [];
    }
    return ((data ?? []) as Lead[]).filter(hasUsableEmail);
  };

  const [day3Leads, day7Leads, deadLeads] = await Promise.all([
    fetchStep(
      "day3",
      base().in("status", ["new", "thinking_about_it"]).is("followup_day3_sent_at", null).lte("created_at", ago(3)).gt("created_at", ago(7)),
    ),
    fetchStep(
      "day7",
      base()
        // followed_up_3 counts only if this function sent day 3; a hand-set one means Adrian took over.
        .or("status.in.(new,thinking_about_it),and(status.eq.followed_up_3,followup_day3_sent_at.not.is.null)")
        .is("followup_day7_sent_at", null).lte("created_at", ago(7)).gt("created_at", ago(10)),
    ),
    fetchStep("dead", base().eq("status", "followed_up_7").not("followup_day7_sent_at", "is", null).lte("created_at", ago(10))),
  ]);

  if (dryRun) {
    return json({
      dry_run: true,
      day3: day3Leads.map((l) => l.id),
      day7: day7Leads.map((l) => l.id),
      dead: deadLeads.map((l) => l.id),
      errors,
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) return json({ error: "RESEND_API_KEY not configured" }, 500);

  const results = { day3: 0, day7: 0, dead: 0, errors };

  const sendFollowup = async (
    step: "day3" | "day7",
    lead: Lead,
    subject: string,
    html: string,
    sentColumn: "followup_day3_sent_at" | "followup_day7_sent_at",
    nextStatus: string,
  ) => {
    const claimedAt = new Date().toISOString();
    const result = await runFollowupStep(`${step} ${lead.id}`, {
      // Guarded on the status we read, so a lead Adrian moved mid-run keeps his status and gets nothing.
      claim: async () => {
        const { data, error } = await supabase
          .from("leads")
          .update({ [sentColumn]: claimedAt, status: nextStatus })
          .eq("id", lead.id)
          .eq("status", lead.status!)
          .is(sentColumn, null)
          .select("id");
        return { claimed: !error && !!data?.length, error: error?.message };
      },
      send: async (): Promise<SendResult> => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
            // Belt and braces: Resend also drops a repeat of this key within 24h.
            "Idempotency-Key": `followup-${step}-${lead.id}`,
          },
          body: JSON.stringify({ from: FROM_EMAIL, to: [lead.email!.trim()], subject, html }),
        });
        if (res.ok) return { ok: true };
        // Error name only: Resend's message text can carry email addresses, and pg_net stores this response.
        const name = await res.json().then((b) => String(b?.name ?? ""), () => "");
        // A 4xx is a refusal; a 5xx may still have been sent, so it counts as unknown.
        return { ok: false, definite: res.status < 500, detail: `Resend ${res.status} ${name}`.trim() };
      },
      // Only undoes this run's own claim, and only if nothing has moved the lead since.
      release: async () => {
        const { data, error } = await supabase
          .from("leads")
          .update({ [sentColumn]: null, status: lead.status })
          .eq("id", lead.id)
          .eq("status", nextStatus)
          .eq(sentColumn, claimedAt)
          .select("id");
        return { released: !error && !!data?.length, error: error?.message };
      },
    });
    if (result.outcome === "sent") results[step]++;
    else if (result.outcome !== "skipped") errors.push(result.error);
  };

  for (const lead of day3Leads) {
    await sendFollowup("day3", lead, "Still thinking about your BPC registration?", day3Html(lead.name), "followup_day3_sent_at", "followed_up_3");
  }
  for (const lead of day7Leads) {
    await sendFollowup("day7", lead, "Any questions about your BPC registration?", day7Html(lead.name), "followup_day7_sent_at", "followed_up_7");
  }

  for (const lead of deadLeads) {
    const { data, error } = await supabase
      .from("leads")
      .update({ status: "dead" })
      .eq("id", lead.id)
      .eq("status", "followed_up_7")
      .select("id");
    if (error) errors.push(`dead ${lead.id}: ${error.message}`);
    else if (data?.length) results.dead++;
  }

  return json(results);
});
