import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Gates a route on an authenticated user holding the admin role.
 *
 * This is UX only. It keeps internal pages out of casual reach, but the gated
 * page's code still ships in the client bundle — RLS is the real boundary for
 * anything that reads data. Don't put secrets behind it.
 */
const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    const hasAdminRole = async (userId: string) => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      return !error && !!data;
    };

    const check = async (session: Session | null) => {
      if (!session) {
        navigate("/admin");
        return;
      }
      const isAdmin = await hasAdminRole(session.user.id);
      if (!isActive) return;
      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }
      setIsAllowed(true);
    };

    supabase.auth.getSession().then(({ data: { session } }) => check(session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAllowed(false);
      check(session);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

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
