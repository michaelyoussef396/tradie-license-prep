import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  licenseType?: string;
}

const ADMIN_EMAIL = "michaelyoussef396@gmail.com";
const FROM_EMAIL = "Qualify Pro <onboarding@resend.dev>";

function buildNotificationHtml(lead: LeadPayload): string {
  const now = new Date().toLocaleString("en-AU", { timeZone: "Australia/Melbourne" });
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1a56db;padding:16px 24px;color:white;border-radius:8px 8px 0 0">
        <strong>🔔 NEW ENQUIRY FROM WEBSITE</strong>
      </div>
      <div style="background:#f8f9fa;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;padding:0">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px 14px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;width:110px">Name:</td><td style="padding:10px 14px;color:#1a56db;border-bottom:1px solid #e0e0e0">${lead.name}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0">Phone:</td><td style="padding:10px 14px;color:#1a56db;border-bottom:1px solid #e0e0e0">${lead.phone}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0">Email:</td><td style="padding:10px 14px;color:#1a56db;border-bottom:1px solid #e0e0e0">${lead.email}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0">Message:</td><td style="padding:10px 14px;color:#333;border-bottom:1px solid #e0e0e0">${lead.message}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#555">Submitted:</td><td style="padding:10px 14px;color:#333">${now}</td></tr>
        </table>
      </div>
      <p style="font-size:14px;margin-top:16px">Reply directly to this email or call them on <strong>${lead.phone}</strong></p>
    </div>`;
}

function buildAutoReplyHtml(firstName: string): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#333;font-size:15px;line-height:1.7">
      <p>Hey ${firstName},</p>
      <p>Thanks for reaching out about getting your builders license.</p>
      <p>Our team will give you a call <strong>within 24 hours</strong> to have a chat about where you're at and how we can help.</p>
      <p>In the meantime, here's what most tradies want to know:</p>
      <ul>
        <li>Our courses run in small groups (max 10) so you get real support</li>
        <li>95% of our students pass first time</li>
        <li>We focus on getting you registered, not just giving you a certificate</li>
      </ul>
      <p>Talk soon,</p>
      <div style="border-top:1px solid #eee;padding-top:12px;margin-top:16px;color:#555">
        <strong style="color:#333">Adrian Nicolazzo</strong><br/>
        Qualify Pro<br/>
        0411 626 398<br/>
        qualifypro.com.au
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

  try {
    const lead: LeadPayload = await req.json();
    const firstName = lead.name.split(" ")[0];

    // Send both emails in parallel
    const [notifRes, replyRes] = await Promise.all([
      // Email 1: Notification to Adrian
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [ADMIN_EMAIL],
          subject: `New Lead: ${lead.name} – ${lead.phone}`,
          html: buildNotificationHtml(lead),
        }),
      }),
      // Email 2: Auto-reply to lead
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [lead.email],
          subject: "Thanks for contacting Qualify Pro",
          html: buildAutoReplyHtml(firstName),
        }),
      }),
    ]);

    const notifData = await notifRes.json();
    const replyData = await replyRes.json();

    return new Response(
      JSON.stringify({ success: true, notification: notifData, autoReply: replyData }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("send-lead-emails error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
