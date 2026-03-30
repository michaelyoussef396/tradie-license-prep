-- 1. Tighten leads anon INSERT: only allow safe fields, force status='new' and nullify internal fields
DROP POLICY IF EXISTS "Allow inserts from website" ON public.leads;
CREATE POLICY "Allow inserts from website" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (
    status = 'new'
    AND notes IS NULL
  );

-- 2. Tighten referrals anon INSERT: validate both FKs exist
DROP POLICY IF EXISTS "Anon can insert referrals" ON public.referrals;
CREATE POLICY "Anon can insert referrals" ON public.referrals
  FOR INSERT TO anon
  WITH CHECK (
    status = 'Pending'
    AND referrer_student_id IS NOT NULL
    AND referred_lead_id IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.students WHERE id = referrer_student_id)
    AND EXISTS (SELECT 1 FROM public.leads WHERE id = referred_lead_id)
  );