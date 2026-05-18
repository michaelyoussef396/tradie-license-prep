CREATE TABLE IF NOT EXISTS public.student_auth_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (student_id),
  UNIQUE (user_id)
);

ALTER TABLE public.student_auth_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins full access student_auth_links" ON public.student_auth_links;
CREATE POLICY "Admins full access student_auth_links"
ON public.student_auth_links
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Students read own student_auth_links" ON public.student_auth_links;
CREATE POLICY "Students read own student_auth_links"
ON public.student_auth_links
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS student_auth_links_student_id_idx
ON public.student_auth_links (student_id);

CREATE INDEX IF NOT EXISTS student_auth_links_user_id_idx
ON public.student_auth_links (user_id);

WITH unique_auth_emails AS (
  SELECT lower(email) AS normalized_email, (array_agg(id))[1] AS user_id
  FROM auth.users
  WHERE email IS NOT NULL
  GROUP BY lower(email)
  HAVING count(*) = 1
)
INSERT INTO public.student_auth_links (student_id, user_id)
SELECT s.id, u.user_id
FROM public.students s
JOIN unique_auth_emails u ON lower(s.email) = u.normalized_email
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION private.get_my_student_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT student_id
  FROM public.student_auth_links
  WHERE user_id = auth.uid()
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_my_student_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT private.get_my_student_id()
$$;

ALTER POLICY "Students read own record"
ON public.students
USING (id = private.get_my_student_id());

REVOKE EXECUTE ON FUNCTION public.get_my_student_id() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_student_id() TO service_role;
REVOKE EXECUTE ON FUNCTION private.get_my_student_id() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.get_my_student_id() TO authenticated, service_role;