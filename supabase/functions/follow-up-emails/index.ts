import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const FROM_EMAIL = "Qualify Pro <onboarding@resend.dev>";

function buildDay3Html(firstName: string): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#333;font-size:15px;line-height:1.7">
      <p>Hey ${firstName},</p>
      <p>Just checking in – I tried to reach you but might have missed you.</p>
      <p>If you're still thinking about getting your BPC registration, happy to have a quick chat about:</p>
      <ul>
        <li>What experience you need</li>
        <li>Which course suits your situation</li>
        <li>How long the process takes</li>
      </ul>
      <p>Just reply to this email or call me on <strong>0411 626 398</strong>.</p>
      <div style="border-top:1px solid #eee;padding-top:12px;margin-top:16px;color:#555">
        <strong style="color:#333">Adrian</strong><br/>0411 626 398
      </div>
    </div>`;
}

function buildDay7Html(firstName: string): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#333;font-size:15px;line-height:1.7">
      <p>Hey ${firstName},</p>
      <p>Last one from me – just wanted to check if you had any questions I can help with?</p>
      <p>No stress either way. When you're ready to get your license, we're here.</p>
      <div style="border-top:1px solid #eee;padding-top:12px;margin-top:16px;color:#555">
        <strong style="color:#333">Adrian</strong><br/>0411 626 398
      </div>
    </div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const now = new Date();

    // Day 3 follow-ups: status = 'new', created >= 3 days ago, < 4 days ago
    const day3Start = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString();
    const day3End = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();

    const { data: day3Leads, error: day3Error } = await supabase
      .from("leads")
      .select("*")
      .eq("status", "new")
      .gte("created_at", day3Start)
      .lt("created_at", day3End);

    if (day3Error) throw day3Error;

    // Day 7 follow-ups: status = 'followed_up_3', created >= 7 days ago, < 8 days ago
    const day7Start = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString();
    const day7End = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: day7Leads, error: day7Error } = await supabase
      .from("leads")
      .select("*")
      .eq("status", "followed_up_3")
      .gte("created_at", day7Start)
      .lt("created_at", day7End);

    if (day7Error) throw day7Error;

    const results: string[] = [];

    // Send Day 3 emails
    for (const lead of day3Leads || []) {
      const firstName = lead.name.split(" ")[0];
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [lead.email],
          subject: "Still keen to get your builders license?",
          html: buildDay3Html(firstName),
        }),
      });
      const data = await res.json();
      results.push(`Day3 → ${lead.email}: ${JSON.stringify(data)}`);

      // Update status
      await supabase.from("leads").update({ status: "followed_up_3" }).eq("id", lead.id);
    }

    // Send Day 7 emails
    for (const lead of day7Leads || []) {
      const firstName = lead.name.split(" ")[0];
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [lead.email],
          subject: "Quick question",
          html: buildDay7Html(firstName),
        }),
      });
      const data = await res.json();
      results.push(`Day7 → ${lead.email}: ${JSON.stringify(data)}`);

      // Update status
      await supabase.from("leads").update({ status: "followed_up_7" }).eq("id", lead.id);
    }

    console.log("Follow-up results:", results);

    return new Response(
      JSON.stringify({ success: true, day3Count: day3Leads?.length || 0, day7Count: day7Leads?.length || 0, results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("follow-up-emails error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
