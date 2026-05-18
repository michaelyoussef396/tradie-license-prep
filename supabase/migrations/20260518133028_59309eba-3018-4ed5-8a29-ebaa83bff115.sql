REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION private.get_my_student_id() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION private.get_my_referred_leads() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.get_my_student_id() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.get_my_referred_leads() TO authenticated, service_role;