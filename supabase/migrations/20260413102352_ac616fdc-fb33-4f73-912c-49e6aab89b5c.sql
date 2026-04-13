
-- Drop the overly permissive policy that exposes full lead PII to students
DROP POLICY IF EXISTS "Students read own referred leads" ON public.leads;

-- Create a security definer function that returns only id and first name
-- for leads referred by the calling student
CREATE OR REPLACE FUNCTION public.get_my_referred_leads()
RETURNS TABLE(id uuid, name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT l.id, split_part(l.name, ' ', 1) AS name
  FROM public.leads l
  INNER JOIN public.referrals r ON r.referred_lead_id = l.id
  WHERE r.referrer_student_id = public.get_my_student_id()
  ORDER BY l.created_at DESC;
$$;
