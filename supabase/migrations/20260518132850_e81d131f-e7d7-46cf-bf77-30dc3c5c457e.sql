-- Move SECURITY DEFINER helpers out of the public API surface and update policies.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION private.get_my_student_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id
  FROM public.students
  WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION private.get_my_referred_leads()
RETURNS TABLE(id uuid, name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, private
AS $$
  SELECT l.id, split_part(l.name, ' ', 1) AS name
  FROM public.leads l
  INNER JOIN public.referrals r ON r.referred_lead_id = l.id
  WHERE r.referrer_student_id = private.get_my_student_id()
  ORDER BY l.created_at DESC
$$;

-- Keep the student dashboard RPC callable from the app, but make the exposed
-- public function a non-definer wrapper around the private privileged helper.
CREATE OR REPLACE FUNCTION public.get_my_referred_leads()
RETURNS TABLE(id uuid, name text)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public, private
AS $$
  SELECT * FROM private.get_my_referred_leads()
$$;

-- Admin policies now call the private helper rather than an exposed public helper.
ALTER POLICY "Admins full access leads" ON public.leads
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins full access referral_codes" ON public.referral_codes
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Students read own referral_codes" ON public.referral_codes
  USING (student_id = private.get_my_student_id());

ALTER POLICY "Admins full access referrals" ON public.referrals
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Students read own referrals" ON public.referrals
  USING (referrer_student_id = private.get_my_student_id());

ALTER POLICY "Admins full access students" ON public.students
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

ALTER POLICY "Admins manage roles" ON public.user_roles
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Limit direct function execution on privileged helpers.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_my_student_id() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_referral_code(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.get_my_referred_leads() TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_referral_code(text) TO service_role;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.get_my_student_id() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.get_my_referred_leads() TO authenticated, service_role;