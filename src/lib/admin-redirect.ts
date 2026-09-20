/**
 * Where an admin lands after signing in.
 *
 * `from` is router state set by RequireAdmin, so it is not attacker-reachable
 * from a URL the way a query parameter would be. It is still validated here so
 * the login screen holds the guarantee on its own rather than trusting its
 * caller.
 */

export const DEFAULT_ADMIN_DESTINATION = "/admin/dashboard";

const ADMIN_PREFIX = "/admin/";

/**
 * Returns `from` only when it is an in-app admin path, else the dashboard.
 *
 * Traversal segments are rejected because the browser resolves them away on
 * pushState: `/admin/../../elsewhere` satisfies a prefix check but navigates
 * outside `/admin`. Backslashes are rejected because some browsers normalise
 * them to forward slashes.
 */
export const resolveAdminDestination = (from: unknown): string => {
  if (typeof from !== "string") return DEFAULT_ADMIN_DESTINATION;
  if (!from.startsWith(ADMIN_PREFIX)) return DEFAULT_ADMIN_DESTINATION;
  if (from.includes("\\")) return DEFAULT_ADMIN_DESTINATION;
  if (from.split("/").includes("..")) return DEFAULT_ADMIN_DESTINATION;
  return from;
};
