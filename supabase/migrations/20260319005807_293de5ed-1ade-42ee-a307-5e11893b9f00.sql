
-- 1. Create role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. Security definer functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_my_student_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.students
  WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  LIMIT 1
$$;

-- 3. Assign admin role to existing admin user
INSERT INTO public.user_roles (user_id, role)
VALUES ('c617ee5b-ffce-46cd-a59a-d286b8e82ae1', 'admin');

-- 4. Drop old overly-permissive policies on STUDENTS
DROP POLICY IF EXISTS "Authenticated can read students" ON public.students;
DROP POLICY IF EXISTS "Authenticated can insert students" ON public.students;
DROP POLICY IF EXISTS "Authenticated can update students" ON public.students;
DROP POLICY IF EXISTS "Authenticated can delete students" ON public.students;

CREATE POLICY "Admins full access students" ON public.students FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students read own record" ON public.students FOR SELECT TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 5. Drop old policies on LEADS
DROP POLICY IF EXISTS "Only authenticated can read" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can insert leads" ON public.leads;

CREATE POLICY "Admins full access leads" ON public.leads FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students read own referred leads" ON public.leads FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT referred_lead_id FROM public.referrals
      WHERE referrer_student_id = public.get_my_student_id()
    )
  );

-- 6. Drop old policies on REFERRAL_CODES
DROP POLICY IF EXISTS "Authenticated can read referral_codes" ON public.referral_codes;
DROP POLICY IF EXISTS "Authenticated can insert referral_codes" ON public.referral_codes;
DROP POLICY IF EXISTS "Authenticated can update referral_codes" ON public.referral_codes;
DROP POLICY IF EXISTS "Authenticated can delete referral_codes" ON public.referral_codes;

CREATE POLICY "Admins full access referral_codes" ON public.referral_codes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students read own referral_codes" ON public.referral_codes FOR SELECT TO authenticated
  USING (student_id = public.get_my_student_id());

-- 7. Drop old policies on REFERRALS
DROP POLICY IF EXISTS "Authenticated can read referrals" ON public.referrals;
DROP POLICY IF EXISTS "Authenticated can insert referrals" ON public.referrals;
DROP POLICY IF EXISTS "Authenticated can update referrals" ON public.referrals;

CREATE POLICY "Admins full access referrals" ON public.referrals FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students read own referrals" ON public.referrals FOR SELECT TO authenticated
  USING (referrer_student_id = public.get_my_student_id());

-- 8. USER_ROLES policies
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users read own role" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());
