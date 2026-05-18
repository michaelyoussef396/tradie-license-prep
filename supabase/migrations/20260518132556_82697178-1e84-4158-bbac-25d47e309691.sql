-- Tighten executable permissions for SECURITY DEFINER helper functions.
-- Keep only the roles that need each helper for the app to work.

REVOKE EXECUTE ON FUNCTION public.get_my_referred_leads() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_my_referred_leads() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_my_referred_leads() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.validate_referral_code(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.validate_referral_code(text) TO anon, authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.get_my_student_id() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_my_student_id() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_my_student_id() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO service_role;