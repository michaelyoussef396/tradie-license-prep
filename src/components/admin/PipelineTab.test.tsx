import { beforeEach, describe, expect, mock, test } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Other component suites may have registered it already (bun runs files in one process).
if (!GlobalRegistrator.isRegistered) GlobalRegistrator.register();
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string | null;
  created_at: string;
};

let leadRows: LeadRow[] = [];
let updates: Array<{ values: Record<string, unknown>; id: unknown }> = [];
let toasts: Array<{ title?: string; description?: string; variant?: string }> = [];
let updateError: { message: string } | null = null;

const row = (id: string, name: string, status: string | null): LeadRow => ({
  id,
  name,
  email: `${id}@example.test`,
  phone: null,
  status,
  created_at: "2026-10-20T00:00:00Z",
});

mock.module("@/integrations/supabase/client", () => {
  const leadsQuery = {
    select: () => leadsQuery,
    eq: () => leadsQuery,
    order: async () => ({ data: leadRows, error: null }),
    update: (values: Record<string, unknown>) => ({
      eq: async (_column: string, id: unknown) => {
        updates.push({ values, id });
        return { error: updateError };
      },
    }),
  };
  const referralsQuery = {
    select: () => referralsQuery,
    in: async () => ({ data: [], error: null }),
  };
  return {
    supabase: { from: (table: string) => (table === "leads" ? leadsQuery : referralsQuery) },
  };
});

mock.module("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: (t: { title?: string; description?: string; variant?: string }) => toasts.push(t) }),
}));

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { default: PipelineTab } = await import("./PipelineTab");

const renderBoard = async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await React.act(async () => {
    root.render(React.createElement(PipelineTab));
  });
  // fetchLeads resolves in two awaits (leads, then referrals); let both settle.
  await React.act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
  return container;
};

/** The names shown under the column whose heading is `label`. */
const namesInColumn = (container: HTMLElement, label: string): string[] => {
  const heading = [...container.querySelectorAll("h3")].find((h) => h.textContent === label);
  if (!heading) return [];
  const column = heading.closest(".min-w-\\[250px\\]") as HTMLElement;
  return [...column.querySelectorAll("p.font-semibold")].map((p) => p.textContent ?? "");
};

/** Opens the lead sheet for the card named `name`. */
const openLead = async (container: HTMLElement, name: string) => {
  const card = [...container.querySelectorAll("p.font-semibold")].find((p) => p.textContent === name);
  await React.act(async () => {
    (card?.closest("[class*='cursor-pointer']") as HTMLElement).click();
  });
};

const reviewButton = () =>
  [...document.querySelectorAll("button")].find((b) => b.textContent?.includes("Mark Review Requested"));

beforeEach(() => {
  leadRows = [];
  updates = [];
  toasts = [];
  updateError = null;
  document.body.innerHTML = "";
});

describe("PipelineTab", () => {
  test("should show leads the follow-up sweep moved to Followed Up (Day 3) and (Day 7)", async () => {
    leadRows = [row("a", "Day Three", "followed_up_3"), row("b", "Day Seven", "followed_up_7"), row("c", "Fresh", "new")];

    const container = await renderBoard();

    expect(namesInColumn(container, "Followed Up (Day 3)")).toEqual(["Day Three"]);
    expect(namesInColumn(container, "Followed Up (Day 7)")).toEqual(["Day Seven"]);
    expect(namesInColumn(container, "New")).toEqual(["Fresh"]);
  });

  test("should show a lead with an unknown status under Other Status instead of dropping it", async () => {
    leadRows = [row("a", "Odd One", "something_else")];

    const container = await renderBoard();

    expect(namesInColumn(container, "Other Status")).toEqual(["Odd One"]);
  });

  test("should not render an Other Status column when every status is known", async () => {
    leadRows = [row("a", "Fresh", "new")];

    const container = await renderBoard();

    expect(namesInColumn(container, "New")).toEqual(["Fresh"]);
    expect([...container.querySelectorAll("h3")].some((h) => h.textContent === "Other Status")).toBe(false);
  });

  test("should show a lead with no status as such, not as New", async () => {
    leadRows = [row("a", "No Status", null)];
    const container = await renderBoard();

    expect(namesInColumn(container, "Other Status")).toEqual(["No Status"]);
    await openLead(container, "No Status");
    const trigger = document.querySelector("[role='combobox']");
    expect(trigger?.textContent).toBe("No status");
  });

  test("should mark review requested without claiming an email was sent", async () => {
    leadRows = [row("a", "Past Student", "completed")];
    const container = await renderBoard();

    await openLead(container, "Past Student");
    const button = reviewButton();
    expect(button).toBeDefined();
    expect(document.body.textContent).not.toContain("Send Review Request");

    await React.act(async () => {
      button!.click();
    });

    expect(updates).toEqual([{ values: { status: "review_requested" }, id: "a" }]);
    expect(toasts).toHaveLength(1);
    expect(toasts[0].title).toBe("Marked as review requested");
    expect(toasts[0].description).toContain("No email was sent");
    expect(namesInColumn(container, "Review Requested")).toEqual(["Past Student"]);
  });

  test("should not report success when the status update fails", async () => {
    leadRows = [row("a", "Past Student", "completed")];
    updateError = { message: "permission denied" };
    const container = await renderBoard();

    await openLead(container, "Past Student");
    await React.act(async () => {
      reviewButton()!.click();
    });

    expect(toasts).toEqual([{ title: "Error", description: "permission denied", variant: "destructive" }]);
    expect(namesInColumn(container, "Completed")).toEqual(["Past Student"]);
    expect(namesInColumn(container, "Review Requested")).toEqual([]);
  });
});
