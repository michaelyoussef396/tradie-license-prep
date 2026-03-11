
-- Add notes column to leads table
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes text;

-- Allow authenticated users to update leads
CREATE POLICY "Authenticated can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create students table
CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  course text,
  referral_code text UNIQUE,
  total_referrals integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Create referral_codes table
CREATE TABLE public.referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  code text UNIQUE NOT NULL,
  total_referrals integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Create referrals table
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code text NOT NULL,
  referee_name text NOT NULL,
  referee_email text NOT NULL,
  referee_phone text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- RLS for students
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read students" ON public.students FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert students" ON public.students FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update students" ON public.students FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- RLS for referral_codes
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read referral_codes" ON public.referral_codes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert referral_codes" ON public.referral_codes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update referral_codes" ON public.referral_codes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- RLS for referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read referrals" ON public.referrals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert referrals" ON public.referrals FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update referrals" ON public.referrals FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
