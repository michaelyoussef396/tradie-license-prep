
-- 1. Add used_referral_code to leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS used_referral_code text;

-- 2. Restructure referrals table: drop old columns, add new ones
ALTER TABLE public.referrals
  DROP COLUMN IF EXISTS referee_name,
  DROP COLUMN IF EXISTS referee_email,
  DROP COLUMN IF EXISTS referee_phone,
  DROP COLUMN IF EXISTS referral_code;

ALTER TABLE public.referrals
  ADD COLUMN IF NOT EXISTS referrer_student_id uuid REFERENCES public.students(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS referred_lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE;

-- Update default status to 'Pending'
ALTER TABLE public.referrals ALTER COLUMN status SET DEFAULT 'Pending';

-- 3. Create validate_referral_code function (security definer)
CREATE OR REPLACE FUNCTION public.validate_referral_code(code text)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.students WHERE referral_code = code LIMIT 1;
$$;

-- 4. RLS: allow anon to insert referrals (for auto-creation on form submit)
CREATE POLICY "Anon can insert referrals"
  ON public.referrals
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. Allow anon to call validate_referral_code
GRANT EXECUTE ON FUNCTION public.validate_referral_code(text) TO anon;
GRANT EXECUTE ON FUNCTION public.validate_referral_code(text) TO authenticated;
