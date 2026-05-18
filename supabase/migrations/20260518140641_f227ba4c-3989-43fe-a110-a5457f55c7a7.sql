CREATE OR REPLACE FUNCTION private.link_student_auth_user_by_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  linked_user_id uuid;
  match_count integer;
BEGIN
  IF NEW.email IS NULL THEN
    RETURN NEW;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.student_auth_links
    WHERE student_id = NEW.id
  ) THEN
    RETURN NEW;
  END IF;

  SELECT (array_agg(au.id))[1], count(*)::integer
  INTO linked_user_id, match_count
  FROM auth.users au
  WHERE lower(au.email) = lower(NEW.email);

  IF match_count = 1 AND linked_user_id IS NOT NULL THEN
    INSERT INTO public.student_auth_links (student_id, user_id)
    VALUES (NEW.id, linked_user_id)
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_student_auth_link_by_email ON public.students;
CREATE TRIGGER sync_student_auth_link_by_email
AFTER INSERT OR UPDATE OF email
ON public.students
FOR EACH ROW
EXECUTE FUNCTION private.link_student_auth_user_by_email();

REVOKE EXECUTE ON FUNCTION private.link_student_auth_user_by_email() FROM PUBLIC, anon, authenticated;