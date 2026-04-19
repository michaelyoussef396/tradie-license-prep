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
  message?: string;
  licenseType?: string;
  yearsExperience?: string;
  referralCode?: string;
}

const ADMIN_EMAIL = "adrian@qualifypro.com.au";
const FROM_EMAIL = "Qualify Pro <hello@qualifypro.com.au>";

const AIRTABLE_BASE_ID = "appdzKGXLVTZe1tHS";
const AIRTABLE_TABLE_ID = "tbl4uVt3WNhAFYYPO";

function parseYearsExperience(value?: string): number | null {
  if (!value) return null;
  // Extract first number from range strings like "2-3", "4-5", "10+"
  const match = value.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

async function syncToAirtable(lead: LeadPayload, source: string): Promise<void> {
  const AIRTABLE_PAT = Deno.env.get("Personal-access-token-airtable");
  if (!AIRTABLE_PAT) {
    console.error("Airtable PAT not configured, skipping sync");
    return;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;
  const payload = {
    records: [{
      fields: {
        "Name": lead.name || "",
        "Email": lead.email || "",
        "Phone": lead.phone || "",
        "License Type": lead.licenseType || "",
        "Years Experience": parseYearsExperience(lead.yearsExperience),
        "Message": lead.message || "",
        "Source": source || "",
        "Status": "New",
      },
    }],
  };

  console.log("Airtable sync URL:", url);
  console.log("Airtable sync payload:", JSON.stringify(payload));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = await res.text();
  if (!res.ok) {
    console.error("Airtable sync FAILED:", res.status, responseBody);
  } else {
    console.log("Airtable sync SUCCESS:", responseBody);
  }
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildNotificationHtml(lead: LeadPayload): string {
  const now = new Date().toLocaleString("en-AU", { timeZone: "Australia/Melbourne" });
  const referralBlock = lead.referralCode ? `
  <tr><td style="background:#dc2626;padding:16px 24px;border-radius:10px 10px 0 0;">
    <span style="color:#ffffff;font-size:16px;font-weight:700;">🚨 REFERRAL LEAD — DISCOUNT REQUIRED</span>
  </td></tr>
  <tr><td style="background:#fef2f2;border:2px solid #dc2626;padding:16px 24px;">
    <p style="margin:0;font-size:15px;color:#991b1b;font-weight:700;">This person was referred using code: ${esc(lead.referralCode)}</p>
    <p style="margin:8px 0 0 0;font-size:15px;color:#991b1b;font-weight:600;">⚡ Remember to quote them <span style="text-decoration:underline;">$100 off</span> the standard course price!</p>
  </td></tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0f0;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  ${referralBlock}
  <tr><td style="background:#1a56db;padding:20px 24px;${lead.referralCode ? '' : 'border-radius:10px 10px 0 0;'}">
    <span style="color:#ffffff;font-size:18px;font-weight:700;">🔔 NEW ENQUIRY FROM WEBSITE</span>
  </td></tr>
  <tr><td style="background:#ffffff;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 10px 10px;padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
      <tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;width:120px;">Name:</td>
        <td style="padding:12px 16px;color:#1a56db;font-weight:600;border-bottom:1px solid #e0e0e0;">${esc(lead.name)}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;">Phone:</td>
        <td style="padding:12px 16px;color:#1a56db;font-weight:600;border-bottom:1px solid #e0e0e0;">${esc(lead.phone)}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;">Email:</td>
        <td style="padding:12px 16px;color:#1a56db;border-bottom:1px solid #e0e0e0;">${esc(lead.email)}</td>
      </tr>
      ${lead.licenseType ? `<tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;">License:</td>
        <td style="padding:12px 16px;color:#333;border-bottom:1px solid #e0e0e0;">${esc(lead.licenseType)}</td>
      </tr>` : ''}
      ${lead.yearsExperience ? `<tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;">Experience:</td>
        <td style="padding:12px 16px;color:#333;border-bottom:1px solid #e0e0e0;">${esc(lead.yearsExperience)} years</td>
      </tr>` : ''}
      ${lead.message ? `<tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;">Message:</td>
        <td style="padding:12px 16px;color:#333;border-bottom:1px solid #e0e0e0;">${esc(lead.message)}</td>
      </tr>` : ''}
      ${lead.referralCode ? `<tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;border-bottom:1px solid #e0e0e0;">Referral Code:</td>
        <td style="padding:12px 16px;color:#1a56db;font-weight:600;border-bottom:1px solid #e0e0e0;">${esc(lead.referralCode)}</td>
      </tr>` : ''}
      <tr>
        <td style="padding:12px 16px;font-weight:600;color:#555;">Submitted:</td>
        <td style="padding:12px 16px;color:#333;">${now}</td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 0 0 0;">
    <p style="font-size:14px;color:#333;margin:0;">Reply directly to this email or call them on <strong>${esc(lead.phone)}</strong></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildAutoReplyHtml(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0f0;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  <tr><td style="background:#059669;padding:20px 24px;">
    <span style="color:#ffffff;font-size:18px;font-weight:700;">Qualify Pro</span>
  </td></tr>
  <tr><td style="padding:32px 28px;font-size:15px;line-height:1.7;color:#333;">
    <p style="margin:0 0 16px 0;">Hey ${firstName},</p>
    <p style="margin:0 0 16px 0;">Thanks for reaching out about getting your builders license.</p>
    <p style="margin:0 0 16px 0;">Our team will give you a call <strong>within 24 hours</strong> to have a chat about where you're at and how we can help.</p>
    <p style="margin:0 0 12px 0;">In the meantime, here's what most tradies want to know:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px 0;">
      <tr><td style="padding:8px 0 8px 16px;font-size:15px;color:#333;">
        <span style="color:#059669;font-weight:700;margin-right:8px;">✓</span> Our courses run in small groups (max 10) so you get real support
      </td></tr>
      <tr><td style="padding:8px 0 8px 16px;font-size:15px;color:#333;">
        <span style="color:#059669;font-weight:700;margin-right:8px;">✓</span> 95% of our students pass first time
      </td></tr>
      <tr><td style="padding:8px 0 8px 16px;font-size:15px;color:#333;">
        <span style="color:#059669;font-weight:700;margin-right:8px;">✓</span> We focus on getting you registered, not just giving you a certificate
      </td></tr>
    </table>
    <p style="margin:0 0 20px 0;">Talk soon,</p>
    <div style="border-top:2px solid #e0e0e0;padding-top:16px;margin-top:8px;">
      <strong style="color:#333;font-size:15px;">Adrian Nicolazzo</strong><br/>
      <span style="color:#555;font-size:14px;">Qualify Pro</span><br/>
      <span style="color:#555;font-size:14px;">0411 626 398</span><br/>
      <a href="https://qualifypro.com.au" style="color:#059669;font-size:14px;text-decoration:none;">qualifypro.com.au</a>
    </div>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

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

    // Input validation
    if (!lead.name || typeof lead.name !== "string" || lead.name.trim().length < 2 || lead.name.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid name (2-100 characters required)" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!lead.email || typeof lead.email !== "string" || !emailRegex.test(lead.email) || lead.email.length > 255) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!lead.phone || typeof lead.phone !== "string" || lead.phone.length < 8 || lead.phone.length > 20) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (lead.message && (typeof lead.message !== "string" || lead.message.length > 2000)) {
      return new Response(JSON.stringify({ error: "Message too long (max 2000 characters)" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Anti-abuse: verify a real lead exists in the database for this email/name
    // (the public form inserts the lead BEFORE invoking this function).
    // Prevents this endpoint from being used as an open email relay.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: leadRows, error: leadLookupErr } = await supabase
      .from("leads")
      .select("id")
      .eq("email", lead.email)
      .eq("name", lead.name)
      .gte("created_at", sixtyMinutesAgo)
      .order("created_at", { ascending: false })
      .limit(1);

    if (leadLookupErr || !leadRows || leadRows.length === 0) {
      console.warn("send-lead-emails: no matching recent lead found, refusing to send", { email: lead.email });
      return new Response(JSON.stringify({ error: "No matching lead submission found" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Server-side referral creation (if referral code provided)
    if (lead.referralCode && typeof lead.referralCode === "string" && lead.referralCode.trim().length > 0) {
      try {
        const code = lead.referralCode.trim();
        // Validate referral code and get student ID
        const { data: studentId } = await supabase.rpc("validate_referral_code", { code });
        if (studentId) {
          const { data: leadRecord } = await supabase
            .from("leads")
            .select("id")
            .eq("email", lead.email)
            .eq("used_referral_code", code)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();
          if (leadRecord) {
            await supabase.from("referrals").insert({
              referrer_student_id: studentId,
              referred_lead_id: leadRecord.id,
              status: "Pending",
            });
          }
        }
      } catch (refErr) {
        console.error("Referral creation error (non-blocking):", refErr);
      }
    }

    const firstName = esc(lead.name.split(" ")[0]);

    // Send emails + Airtable sync in parallel
    const [notifRes, replyRes] = await Promise.all([
      // Email 1: Notification to Adrian
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [ADMIN_EMAIL],
          subject: `New Lead: ${esc(lead.name)} – ${esc(lead.phone)}`,
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

    // Airtable sync - fire and forget, don't block response
    syncToAirtable(lead, "contact-form").catch((err) =>
      console.error("Airtable sync error:", err)
    );

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
