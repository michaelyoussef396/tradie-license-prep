import { beforeEach, describe, expect, mock, test } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type AuthListener = (event: string, session: unknown) => void;

const ADMIN_SESSION = { user: { id: "admin-1" } };
const GATED_PATH = "/admin/dashboard";

let listeners: AuthListener[] = [];
let roleQueryCount = 0;
let navigations: Array<{ to: string; state?: unknown }> = [];
let signOutCount = 0;
let isAdmin = true;
let currentSession: unknown = ADMIN_SESSION;
/** When set, the role query hangs until released, so the in-flight window is observable. */
let deferRoleQuery = false;
let releaseRoleQuery: (() => void) | null = null;

/** Fires an auth event the way supabase-js would. */
const emit = (event: string, session: unknown = currentSession) => {
  listeners.forEach((listener) => listener(event, session));
};

mock.module("@/integrations/supabase/client", () => {
  const roleQuery = {
    select: () => roleQuery,
    eq: () => roleQuery,
    maybeSingle: async () => {
      roleQueryCount += 1;
      if (deferRoleQuery) {
        await new Promise<void>((resolve) => {
          releaseRoleQuery = resolve;
        });
      }
      return { data: isAdmin ? { role: "admin" } : null, error: null };
    },
  };
  return {
    supabase: {
      auth: {
        getSession: async () => ({ data: { session: currentSession } }),
        onAuthStateChange: (listener: AuthListener) => {
          listeners.push(listener);
          return {
            data: {
              subscription: {
                unsubscribe: () => {
                  listeners = listeners.filter((l) => l !== listener);
                },
              },
            },
          };
        },
        signOut: async () => {
          signOutCount += 1;
          currentSession = null;
        },
      },
      from: () => roleQuery,
    },
  };
});

// Stable identity, as react-router's own useNavigate provides.
const navigateSpy = (to: string, options?: { state?: unknown }) => {
  navigations.push({ to, state: options?.state });
};

mock.module("react-router-dom", () => ({
  useNavigate: () => navigateSpy,
  useLocation: () => ({ pathname: GATED_PATH }),
}));

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { default: RequireAdmin } = await import("./RequireAdmin");

let mountCount = 0;

const Gated = () => {
  React.useEffect(() => {
    mountCount += 1;
  }, []);
  return React.createElement("div", { id: "gated" }, "gated content");
};

const renderGuard = async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await React.act(async () => {
    root.render(React.createElement(RequireAdmin, null, React.createElement(Gated)));
  });
  return { container, root };
};

const isGatedVisible = (container: HTMLElement) => !!container.querySelector("#gated");

beforeEach(() => {
  listeners = [];
  roleQueryCount = 0;
  navigations = [];
  signOutCount = 0;
  mountCount = 0;
  isAdmin = true;
  currentSession = ADMIN_SESSION;
  deferRoleQuery = false;
  releaseRoleQuery = null;
  document.body.innerHTML = "";
});

describe("RequireAdmin", () => {
  test("should run exactly one role query per mount", async () => {
    const { container } = await renderGuard();
    await React.act(async () => {
      emit("INITIAL_SESSION");
    });

    expect(roleQueryCount).toBe(1);
    expect(isGatedVisible(container)).toBe(true);
  });

  test("should keep the gated page mounted while a token refresh re-verifies", async () => {
    const { container } = await renderGuard();
    await React.act(async () => {
      emit("INITIAL_SESSION");
    });
    const mountsBeforeRefresh = mountCount;

    // Hold the re-verification open so the in-flight window is observable —
    // that window is where clearing isAllowed would unmount the page.
    deferRoleQuery = true;
    await React.act(async () => {
      emit("TOKEN_REFRESHED");
    });

    expect(isGatedVisible(container)).toBe(true);
    expect(mountCount).toBe(mountsBeforeRefresh);

    await React.act(async () => {
      releaseRoleQuery?.();
    });

    expect(isGatedVisible(container)).toBe(true);
    expect(mountCount).toBe(mountsBeforeRefresh);
  });

  test("should redirect to login on sign out", async () => {
    await renderGuard();
    await React.act(async () => {
      emit("INITIAL_SESSION");
    });

    await React.act(async () => {
      emit("SIGNED_OUT", null);
    });

    expect(navigations.at(-1)?.to).toBe("/admin");
  });

  test("should pass the attempted path to login", async () => {
    currentSession = null;
    await renderGuard();

    expect(navigations.at(-1)?.state).toEqual({ from: GATED_PATH });
  });

  test("should sign out a user without the admin role", async () => {
    isAdmin = false;
    await renderGuard();

    expect(signOutCount).toBe(1);
    expect(navigations.at(-1)?.to).toBe("/admin");
  });

  test("should not redirect after unmount", async () => {
    const { root } = await renderGuard();
    await React.act(async () => {
      emit("INITIAL_SESSION");
    });
    await React.act(async () => {
      root.unmount();
    });

    const navigationsBefore = navigations.length;
    await React.act(async () => {
      emit("SIGNED_OUT", null);
    });

    expect(navigations.length).toBe(navigationsBefore);
  });
});
