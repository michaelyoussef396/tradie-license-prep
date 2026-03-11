

## Plan: Complete Admin Dashboard + Automated Follow-Up Emails

### What Gets Built

9 files created or modified. No database migrations needed — all tables already exist.

---

### 1. `src/App.tsx` — Add admin routes

Add lazy imports for AdminLogin and AdminDashboard. Add two routes:
- `/admin` → AdminLogin
- `/admin/dashboard` → AdminDashboard

### 2. `src/pages/AdminDashboard.tsx` — Fix dashboard layout

- Remove Referrals tab and its import (only 3 tabs: New Leads, Pipeline, Students)
- Add mobile hamburger menu with slide-out sidebar and overlay
- Sidebar collapses on mobile, fixed on desktop

### 3. `src/components/admin/NewLeadsTab.tsx` — Enhance with notes + real-time

- Add `notes` field to Lead interface
- Add editable textarea per card that saves to `notes` column on blur
- Add real-time subscription via `supabase.channel()` — new leads appear instantly
- Add loading spinner (Loader2), error state with retry button
- Format created_at as DD/MM/YYYY HH:MM

### 4. Create `src/components/admin/PipelineTab.tsx` — Kanban board

- Fetch all leads, group into 6 status columns: New (blue), Thinking About It (orange), Qualified (green), Enrolled (purple), Completed (teal), Dead (red)
- Horizontally scrollable columns
- Each card: Name, Phone (tel: link), Created At
- Click card opens Sheet side panel with all fields, status dropdown (saves immediately), notes textarea (auto-saves on blur)
- Also handles followed_up_3, followed_up_7, review_requested statuses in the dropdown

### 5. Create `src/components/admin/StudentsTab.tsx` — Student management

- Table with columns: Name, Email, Phone, Course, Referral Code, Status, Created At
- "Add Student" button opens Sheet slide-out form (Name, Email, Phone, Course)
- On save: generate referral code (FIRSTNAME-XXXX), insert into students + referral_codes tables, invoke `send-student-welcome` edge function
- Toast notification on success showing the referral code
- Empty state, loading spinner, error handling

### 6. Create `supabase/functions/send-student-welcome/index.ts`

- POST `{ name, email, referralCode }`
- Sends branded email via Resend (blue #1B4FD8 header)
- Subject: "Welcome to Qualify Pro — your referral code is [CODE]"
- Body: congratulations message, referral code displayed large and bold in blue box, dashboard link, Adrian's signature

### 7. Create `supabase/functions/send-followup-emails/index.ts`

Designed to run daily via pg_cron. Uses SUPABASE_SERVICE_ROLE_KEY to query leads server-side.

- **Day 3**: Query leads where status='thinking_about_it' AND created 3-4 days ago. Send fixed template: "Hey [Name], just checking in — still thinking about getting your BPC registration? Happy to answer any questions. Call or reply anytime. Adrian — 0411 626 398". Update status to 'followed_up_3'.
- **Day 7**: Query leads where status='followed_up_3' AND created 7-8 days ago. Send: "Hey [Name], last one from me — no pressure at all. When you're ready, we're here. Adrian — 0411 626 398". Update status to 'followed_up_7'.
- **Day 10**: Query leads where status='followed_up_7' AND created 10+ days ago. Update status to 'dead'. No email sent.

No AI APIs. Plain fixed templates with name substitution. Zero cost.

### 8. `supabase/config.toml` — Register new functions

Add `send-student-welcome` and `send-followup-emails` with `verify_jwt = false`

### 9. `public/robots.txt` — Block admin from search engines

Add `Disallow: /admin` and `Disallow: /dashboard` under Googlebot, Bingbot, and wildcard user-agents

### After Deployment — pg_cron Setup

Run via SQL Editor to schedule the follow-up function daily at 9am AEST (11pm UTC):
```sql
select cron.schedule(
  'daily-followup-emails',
  '0 23 * * *',
  $$
  select net.http_post(
    url:='https://dpceyonfjfjaogwkyrhp.supabase.co/functions/v1/send-followup-emails',
    headers:=jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwY2V5b25mamZqYW9nd2t5cmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMTIzOTAsImV4cCI6MjA4ODc4ODM5MH0.kwKuzt1HTvDJOo2Apq5vJ_30CKiJVPob3JIS33d-KaM'
    ),
    body:='{}'::jsonb
  ) as request_id;
  $$
);
```

