

## Fix Lead Notification Email + Remove Follow-Up Functions

### Current Status Confirmed

| # | Email | To | Trigger | Status |
|---|-------|----|---------|--------|
| 1 | Lead Notification | michaelyoussef396@gmail.com | Form submitted | **Not arriving** |
| 2 | Auto-Reply | Lead's email | Form submitted | **Working** |

Follow-up emails (Day 3, Day 7) and review request exist as code but should be removed entirely.

### Root Cause — Notification Not Arriving

The `ADMIN_EMAIL` on line 17 is set to `support@adcopropertyinspectionsmelbourne.com.au`. On Resend's free tier using `onboarding@resend.dev` as the sender, you can **only send to the email that owns the Resend account**. Since the Resend account belongs to `michaelyoussef396@gmail.com`, the notification to the other address silently fails while the auto-reply (also going to a test address matching the account) works fine.

**Fix**: Change `ADMIN_EMAIL` to `michaelyoussef396@gmail.com`.

### Changes

**1. `supabase/functions/send-lead-emails/index.ts`**
- Change `ADMIN_EMAIL` from `support@adcopropertyinspectionsmelbourne.com.au` to `michaelyoussef396@gmail.com`
- Keep both HTML email templates as-is (they already send as HTML with inline CSS — the "plain text" appearance is just Resend's default sender styling, the HTML is correct)

**2. Delete `supabase/functions/follow-up-emails/index.ts`**
- Remove the entire follow-up-emails edge function directory

**3. `supabase/config.toml`**
- Remove the `[functions.follow-up-emails]` section

**4. Remove cron job migration**
- Create a new migration to drop the `pg_cron` job for `follow-up-emails-daily` if it exists

That's it — one line change fixes the notification, and three deletions clean up what shouldn't exist.

