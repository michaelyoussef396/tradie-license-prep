

# Fix Edge Functions Auth & Deploy

## Problem
All four authenticated edge functions (`send-student-welcome`, `send-followup-emails`, `followup-day3`, `followup-day7`) use `supabase.auth.getClaims(token)` which is not a valid method in the Supabase JS client v2. This causes every authenticated call to fail with a 401 error — including the welcome email sent when Adrian adds a new student.

## Fix

Replace `getClaims(token)` with `getUser(token)` in all four edge functions. The pattern change:

```text
BEFORE:
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) { ... }

AFTER:
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) { ... }
```

## Files to update
1. `supabase/functions/send-student-welcome/index.ts` — fix auth check
2. `supabase/functions/send-followup-emails/index.ts` — fix auth check
3. `supabase/functions/followup-day3/index.ts` — fix auth check
4. `supabase/functions/followup-day7/index.ts` — fix auth check

All four functions will then be redeployed automatically.

## No other changes needed
- The welcome email template already includes the referral code, $100 reward details, and dashboard link
- The ReferralsTab component is working correctly
- The StudentDashboard is functional
- The contact form referral code flow is intact

