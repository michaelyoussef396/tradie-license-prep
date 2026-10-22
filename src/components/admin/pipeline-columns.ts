/**
 * Pipeline board columns, and how leads are grouped into them.
 *
 * Status strings are shared with the `send-followup-emails` edge function, which moves
 * leads to `followed_up_3` on day 3, `followed_up_7` on day 7 and `dead` on day 10 — change
 * both together (CLAUDE.md, "Lead pipeline"). Every status a lead can hold needs a column
 * here, or the lead drops off the board; a lead whose status has no column lands in the
 * "Other status" column instead of disappearing.
 */
export interface StatusColumn {
  key: string;
  label: string;
  color: string;
}

export const STATUS_COLUMNS: StatusColumn[] = [
  { key: "new", label: "New", color: "bg-blue-500" },
  { key: "thinking_about_it", label: "Thinking About It", color: "bg-orange-500" },
  { key: "followed_up_3", label: "Followed Up (Day 3)", color: "bg-sky-500" },
  { key: "followed_up_7", label: "Followed Up (Day 7)", color: "bg-indigo-500" },
  { key: "qualified", label: "Qualified", color: "bg-green-500" },
  { key: "enrolled", label: "Enrolled", color: "bg-purple-500" },
  { key: "completed", label: "Completed", color: "bg-teal-500" },
  { key: "review_requested", label: "Review Requested", color: "bg-yellow-500" },
  { key: "dead", label: "Dead", color: "bg-red-500" },
];

/** The statuses Adrian can pick in the lead sheet — the same list, so the two can't drift. */
export const ALL_STATUSES = STATUS_COLUMNS.map(({ key, label }) => ({ value: key, label }));

/** Catch-all for a status with no column (or no status at all). Only shown when it has leads. */
export const OTHER_COLUMN: StatusColumn = { key: "__other", label: "Other Status", color: "bg-gray-500" };

const KNOWN_STATUSES = new Set(STATUS_COLUMNS.map((column) => column.key));

/**
 * One group per column, in board order, each keeping the leads' incoming order.
 * Leads with an unknown or missing status go to a trailing "Other Status" group.
 */
export function groupLeadsByColumn<T extends { status: string | null }>(
  leads: T[],
): Array<{ column: StatusColumn; leads: T[] }> {
  const groups = STATUS_COLUMNS.map((column) => ({
    column,
    leads: leads.filter((lead) => lead.status === column.key),
  }));
  const other = leads.filter((lead) => !lead.status || !KNOWN_STATUSES.has(lead.status));
  return other.length > 0 ? [...groups, { column: OTHER_COLUMN, leads: other }] : groups;
}
