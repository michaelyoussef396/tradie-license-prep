import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FROM_EMAIL = "Qualify Pro <onboarding@resend.dev>";

function buildDay3Html(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0f0;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  <tr><td style="background:#d97706;padding:20px 24px;">
    <span style="color:#ffffff;font-size:18px;font-weight:700;">Qualify Pro</span>
  </td></tr>
  <tr><td style="padding:32px 28px;font-size:15px;line-height:1.7;color:#333;">
    <p style="margin:0 0 16px 0;">Hey ${firstName},</p>
    <p style="margin:0 0 16px 0;">Just checking in – I tried to reach you but might have missed you.</p>
    <p style="margin:0 0 12px 0;">If you're still thinking about getting your BPC registration, happy to have a quick chat about:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;">
      <tr><td style="padding:8px 0 8px 16px;font-size:15px;color:#333;">
        <span style="color:#d97706;font-weight:700;margin-right:8px;">•</span> What experience you need
      </td></tr>
      <tr><td style="padding:8px 0 8px 16px;font-size:15px;color:#333;">
        <span style="color:#d97706;font-weight:700;margin-right:8px;">•</span> Which course suits your situation
      </td></tr>
      <tr><td style="padding:8px 0 8px 16px;font-size:15px;color:#333;">
        <span style="color:#d97706;font-weight:700;margin-right:8px;">•</span> How long the process takes
      </td></tr>
    </table>
    <p style="margin:0 0 20px 0;">Just reply to this email or call me on <strong>0411 626 398</strong>.</p>
    <div style="border-top:2px solid #e0e0e0;padding-top:16px;margin-top:8px;">
      <strong style="color:#333;font-size:15px;">Adrian</strong><br/>
      <span style="color:#555;font-size:14px;">0411 626 398</span>
    </div>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

Deno.serve(async (req) => {
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
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email } = await req.json();
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "name and email are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firstName = name.split(" ")[0];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "Still thinking about your builders license?",
        html: buildDay3Html(firstName),
      }),
    });

    const data = await res.json();
    console.log("Day 3 follow-up result:", JSON.stringify(data));

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("followup-day3 error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
