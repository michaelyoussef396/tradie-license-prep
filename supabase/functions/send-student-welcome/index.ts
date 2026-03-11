import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, referralCode } = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B4FD8; padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Qualify Pro</h1>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <p style="font-size: 16px; color: #333;">Hi ${name},</p>
        <p style="font-size: 16px; color: #333;">You've completed the course and you're now a registered builder. Welcome to the Qualify Pro community.</p>
        <p style="font-size: 16px; color: #333;">Your referral code is:</p>
        <div style="background: #EBF0FE; border: 2px solid #1B4FD8; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <span style="font-size: 28px; font-weight: bold; color: #1B4FD8; letter-spacing: 2px;">${referralCode}</span>
        </div>
        <p style="font-size: 16px; color: #333;">Share this code with any tradie mates who need their BPC registration. When they enrol using your code, you'll earn a reward.</p>
        <p style="font-size: 16px; color: #333;">Cheers,<br/><strong>Adrian</strong><br/>Qualify Pro<br/>0411 626 398</p>
      </div>
    </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [email],
        subject: `Welcome to Qualify Pro — your referral code is ${referralCode}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
