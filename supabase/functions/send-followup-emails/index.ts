import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Auth check
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const supabaseAuth = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const results = { day3: 0, day7: 0, day10: 0, errors: [] as string[] };

    const sendEmail = async (to: string, subject: string, html: string) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({ from: "onboarding@resend.dev", to: [to], subject, html }),
      });
      if (!res.ok) throw new Error(`Resend: ${await res.text()}`);
    };

    const wrapHtml = (body: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B4FD8; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Qualify Pro</h1>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          ${body}
        </div>
      </div>`;

    // Day 3: thinking_about_it, created 3-4 days ago
    const { data: day3Leads } = await supabase
      .from("leads")
      .select("id, name, email")
      .eq("status", "thinking_about_it")
      .gte("created_at", new Date(Date.now() - 4 * 86400000).toISOString())
      .lte("created_at", new Date(Date.now() - 3 * 86400000).toISOString());

    for (const lead of day3Leads || []) {
      try {
        await sendEmail(
          lead.email,
          `Still thinking about your builders license, ${lead.name}?`,
          wrapHtml(`<p style="font-size:16px;color:#333;">Hey ${lead.name},</p>
            <p style="font-size:16px;color:#333;">Just checking in — still thinking about getting your BPC registration? Happy to answer any questions. Call or reply anytime.</p>
            <p style="font-size:16px;color:#333;">Adrian — 0411 626 398</p>`)
        );
        await supabase.from("leads").update({ status: "followed_up_3" }).eq("id", lead.id);
        results.day3++;
      } catch (e) { results.errors.push(`Day3 ${lead.email}: ${e.message}`); }
    }

    // Day 7: followed_up_3, created 7-8 days ago
    const { data: day7Leads } = await supabase
      .from("leads")
      .select("id, name, email")
      .eq("status", "followed_up_3")
      .gte("created_at", new Date(Date.now() - 8 * 86400000).toISOString())
      .lte("created_at", new Date(Date.now() - 7 * 86400000).toISOString());

    for (const lead of day7Leads || []) {
      try {
        await sendEmail(
          lead.email,
          `Quick one, ${lead.name}`,
          wrapHtml(`<p style="font-size:16px;color:#333;">Hey ${lead.name},</p>
            <p style="font-size:16px;color:#333;">Last one from me — no pressure at all. When you're ready, we're here.</p>
            <p style="font-size:16px;color:#333;">Adrian — 0411 626 398</p>`)
        );
        await supabase.from("leads").update({ status: "followed_up_7" }).eq("id", lead.id);
        results.day7++;
      } catch (e) { results.errors.push(`Day7 ${lead.email}: ${e.message}`); }
    }

    // Day 10: followed_up_7, created 10+ days ago → mark dead
    const { data: day10Leads } = await supabase
      .from("leads")
      .select("id")
      .eq("status", "followed_up_7")
      .lte("created_at", new Date(Date.now() - 10 * 86400000).toISOString());

    for (const lead of day10Leads || []) {
      try {
        await supabase.from("leads").update({ status: "dead" }).eq("id", lead.id);
        results.day10++;
      } catch (e) { results.errors.push(`Day10 ${lead.id}: ${e.message}`); }
    }

    return new Response(JSON.stringify(results), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
