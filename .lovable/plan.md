

# Referral Program System — Implementation Plan

## Overview
Build a double-sided referral program: referring students earn $100 cash (paid offline by Adrian), referred leads get $100 off. The app is a tracking ledger only — no payment processing.

## 1. Database Changes (Migration)

**Add column to `leads` table:**
- `used_referral_code` (text, nullable)

**Restructure `referrals` table** (already exists but needs different schema):
- Drop existing columns and recreate with: `id`, `referrer_student_id` (FK → students), `referred_lead_id` (FK → leads), `status` (text, default 'Pending', values: 'Pending' / 'Enrolled' / 'Paid Out'), `created_at`
- RLS: authenticated users get full CRUD; anon can INSERT (for auto-creation on form submit)

**Note:** The `students` table already has a `referral_code` column — no change needed there.

## 2. Contact Form Update (Public Website)

**Files:** `src/pages/Contact.tsx`, `src/components/FinalCTA.tsx`

- Add optional "Referral Code" text input to both contact forms
- Add `referralCode` to form state and validation (optional, max 20 chars)
- On submit: save `used_referral_code` to leads insert
- After successful lead insert: if a referral code was provided, look up the student by `referral_code`, and if found, insert a record into `referrals` with status 'Pending' and the student's ID as `referrer_student_id`
- Pass referral code to `send-lead-emails` so admin notification includes it

## 3. Student Dashboard (`/dashboard`)

**New file:** `src/pages/StudentDashboard.tsx`

- Protected route requiring Supabase auth session
- Query `students` table by authenticated user's email to get their record
- Display referral code prominently with a "Copy Code" button
- Metric cards: Total Referrals, Successful Enrolments (status = 'Enrolled' or 'Paid Out'), Total Rewards (enrolments × $100)
- Referral history table: Date, Referred first name (from joined leads table), Status badge
- Simple dark-themed UI matching the admin style

**Router update:** Add `/dashboard` route in `App.tsx`

**Auth note:** Students need Supabase auth accounts. When Adrian adds a student, we'll need to note that the student must sign up / be invited separately. The dashboard matches by email.

## 4. Admin Dashboard — Referrals Tab

**New file:** `src/components/admin/ReferralsTab.tsx`

- New tab in admin sidebar (icon: `Gift` or `Users`)
- Table: Referrer Name, Referred Lead Name, Date, Status
- Fetches from `referrals` joined with `students` (referrer) and `leads` (referred)
- Action buttons per row:
  - "Mark as Enrolled" — updates status to 'Enrolled' (visible when status is 'Pending')
  - "Mark as Paid Out" — updates status to 'Paid Out' (visible when status is 'Enrolled')
- Status shown as color-coded badges

**Update:** `src/pages/AdminDashboard.tsx` — add Referrals tab to sidebar navigation

## 5. Student Creation Updates

**File:** `src/components/admin/StudentsTab.tsx`

- Already generates referral codes in `FIRSTNAME-XXXX` format — no change needed
- Already creates referral_codes table entry — no change needed

## 6. Welcome Email Update

**File:** `supabase/functions/send-student-welcome/index.ts`

- Add dashboard login link to the email (e.g., `https://tradie-license-prep.lovable.app/dashboard`)
- Referral code is already included in the email template
- Redeploy edge function after changes

## Technical Details

- The referrals table join query will use Supabase's `.select("*, students!referrer_student_id(name), leads!referred_lead_id(name)")` syntax
- Student dashboard auth: check `supabase.auth.getSession()`, then query `students` where email matches session user email
- Contact form referral code lookup uses an unauthenticated query — needs an RLS policy allowing anon SELECT on `students.referral_code` column (or use a database function)
- Alternative: validate referral code server-side in the `send-lead-emails` edge function to avoid exposing student data

### Referral Code Validation Approach
Use a security-definer database function `validate_referral_code(code text)` that returns the student_id if valid, null otherwise. This avoids needing anon SELECT on the students table. The contact form calls this RPC before inserting the referral record.

