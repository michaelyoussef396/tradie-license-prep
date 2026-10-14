/**
 * Day-3 and day-7 follow-up copy. Plain check-ins only: no pass rates or percentages,
 * no "pass first time", guarantees or resits, no years-in-business or builder counts,
 * no payment plans, testimonials or reviews, and no interview prep (the BPC interview
 * is now a supervised online exam). See CLAUDE.md "Public claims".
 */

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** "jordan smith" → "Jordan", matching the auto-reply in send-lead-emails. */
function firstName(name: string): string {
  const word = String(name ?? "").trim().split(/\s+/)[0] || "there";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0f0;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">
  <tr><td style="background:#1B4FD8;padding:20px 24px;">
    <span style="color:#ffffff;font-size:18px;font-weight:700;">Qualify Pro</span>
  </td></tr>
  <tr><td style="padding:32px 28px;font-size:15px;line-height:1.7;color:#333;">
    ${body}
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

const p = (text: string) => `<p style="margin:0 0 16px 0;">${text}</p>`;

export function day3Html(name: string): string {
  return wrapHtml(
    p(`Hey ${esc(firstName(name))},`) +
      p("Just checking in on your enquiry about BPC registration.") +
      p("If you're still thinking about it, I'm happy to have a quick chat about:") +
      `<ul style="margin:0 0 16px 0;padding-left:20px;">
        <li>What experience you need for your registration class</li>
        <li>Which course suits your situation</li>
        <li>How the process works from enquiry to registration</li>
      </ul>` +
      p("Just reply to this email or call me on <strong>0411 626 398</strong>."),
  );
}

export function day7Html(name: string): string {
  return wrapHtml(
    p(`Hey ${esc(firstName(name))},`) +
      p("Just wanted to check if you had any questions I can help with.") +
      p("No stress either way. When you're ready to go for your registration, reply to this email or give me a call."),
  );
}
