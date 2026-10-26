import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ALL_STATUSES, OTHER_COLUMN, STATUS_COLUMNS, groupLeadsByColumn } from "./pipeline-columns";

const columnKeys = STATUS_COLUMNS.map((column) => column.key);

/** Every status the follow-up sweep reads or writes, pulled from the function's source. */
function statusesUsedBySweep(): Set<string> {
  const source = readFileSync(
    fileURLToPath(new URL("../../../supabase/functions/send-followup-emails/index.ts", import.meta.url)),
    "utf8",
  );
  const found = new Set<string>();
  const add = (list: string) =>
    list.split(",").forEach((s) => found.add(s.replace(/["'\s]/g, "")));
  for (const m of source.matchAll(/status:\s*"([a-z0-9_]+)"/g)) found.add(m[1]);
  for (const m of source.matchAll(/\.eq\("status",\s*"([a-z0-9_]+)"\)/g)) found.add(m[1]);
  for (const m of source.matchAll(/\.in\("status",\s*\[([^\]]+)\]\)/g)) add(m[1]);
  for (const m of source.matchAll(/status\.in\.\(([^)]+)\)/g)) add(m[1]);
  for (const m of source.matchAll(/status\.eq\.([a-z0-9_]+)/g)) found.add(m[1]);
  // sendFollowup(..., "followup_dayN_sent_at", "<next status>")
  for (const m of source.matchAll(/"followup_day\d+_sent_at",\s*"([a-z0-9_]+)"\)/g)) found.add(m[1]);
  return found;
}

describe("pipeline columns", () => {
  test("should give every status the follow-up sweep reads or writes its own column", () => {
    const used = statusesUsedBySweep();

    // Guard against the parser silently finding nothing.
    expect(used.has("followed_up_3")).toBe(true);
    expect(used.has("followed_up_7")).toBe(true);
    expect(used.has("dead")).toBe(true);
    for (const status of used) expect(columnKeys).toContain(status);
  });

  test("should offer exactly the board's statuses in the lead sheet", () => {
    expect(ALL_STATUSES.map((s) => s.value)).toEqual(columnKeys);
  });

  test("should have no duplicate column keys", () => {
    expect(new Set(columnKeys).size).toBe(columnKeys.length);
  });
});

describe("groupLeadsByColumn", () => {
  const lead = (id: string, status: string | null) => ({ id, status });

  test("should show leads the sweep moved to followed_up_3 and followed_up_7", () => {
    const groups = groupLeadsByColumn([lead("a", "followed_up_3"), lead("b", "followed_up_7")]);
    const byKey = Object.fromEntries(groups.map((g) => [g.column.key, g.leads.map((l) => l.id)]));

    expect(byKey.followed_up_3).toEqual(["a"]);
    expect(byKey.followed_up_7).toEqual(["b"]);
  });

  test("should show a lead marked review_requested", () => {
    const groups = groupLeadsByColumn([lead("a", "review_requested")]);

    expect(groups.find((g) => g.column.key === "review_requested")?.leads.map((l) => l.id)).toEqual(["a"]);
  });

  test("should put an unknown or missing status in a trailing Other Status column", () => {
    const groups = groupLeadsByColumn([lead("a", "some_new_status"), lead("b", null), lead("c", "new")]);
    const last = groups[groups.length - 1];

    expect(last.column).toEqual(OTHER_COLUMN);
    expect(last.leads.map((l) => l.id)).toEqual(["a", "b"]);
  });

  test("should leave out the Other Status column when every status is known", () => {
    const groups = groupLeadsByColumn([lead("a", "new"), lead("b", "dead")]);

    expect(groups.map((g) => g.column.key)).toEqual(columnKeys);
  });

  test("should place every lead exactly once, keeping the incoming order", () => {
    const leads = [
      lead("1", "new"), lead("2", "dead"), lead("3", "new"), lead("4", "followed_up_3"),
      lead("5", "mystery"), lead("6", "qualified"), lead("7", null),
    ];
    const groups = groupLeadsByColumn(leads);
    const placed = groups.flatMap((g) => g.leads.map((l) => l.id));

    expect(placed.sort()).toEqual(leads.map((l) => l.id).sort());
    expect(groups.find((g) => g.column.key === "new")?.leads.map((l) => l.id)).toEqual(["1", "3"]);
  });
});
