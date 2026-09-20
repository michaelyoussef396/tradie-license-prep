import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const ADMIN_LOGIN_PATH = "/admin";

/**
 * Gates a route on an authenticated user holding the admin role.
 *
 * This is UX only. It keeps internal pages out of casual reach, but the gated
 * page's code still ships in the client bundle — RLS is the real boundary for
 * anything that reads data. Don't put secrets behind it.
 *
 * Auth events re-verify in the background and never clear `isAllowed`. Clearing
 * it would unmount the gated page on every token refresh, which resets the
 * dashboard's open tab and refetches every panel.
 */
const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();
  const attemptedPath = useLocation().pathname;

  // Held in a ref so the subscription below depends on nothing and runs once
  // per mount. Depending on `navigate` would re-subscribe — and re-query — on
  // any router identity change.
  const redirectToLoginRef = useRef<() => void>(() => {});
  useEffect(() => {
    redirectToLoginRef.current = () =>
      navigate(ADMIN_LOGIN_PATH, { replace: true, state: { from: attemptedPath } });
  });

  useEffect(() => {
    let isActive = true;
    // getSession() and the listener's INITIAL_SESSION carry the same session.
    // Whichever arrives first performs the one initial check.
    let hasRunInitialCheck = false;

    const redirectToLogin = () => {
      if (!isActive) return;
      redirectToLoginRef.current();
    };

    const hasAdminRole = async (userId: string) => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      return !error && !!data;
    };

    const verify = async (session: Session | null) => {
      if (!session) {
        redirectToLogin();
        return;
      }
      const isAdmin = await hasAdminRole(session.user.id);
      if (!isActive) return;
      if (!isAdmin) {
        await supabase.auth.signOut();
        redirectToLogin();
        return;
      }
      setIsAllowed(true);
    };

    const runInitialCheck = (session: Session | null) => {
      if (hasRunInitialCheck) return;
      hasRunInitialCheck = true;
      verify(session);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isActive) return;
      runInitialCheck(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (!isActive) return;
        if (event === "SIGNED_OUT") {
          redirectToLogin();
          return;
        }
        if (event === "INITIAL_SESSION") {
          runInitialCheck(session);
          return;
        }
        verify(session);
      },
    );

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;
