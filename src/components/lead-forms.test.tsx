import { afterAll, describe, expect, mock, test } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register the DOM before anything imports Radix: @radix-ui/react-use-layout-effect decides at
// import time whether a document exists, and a no-op choice would stick for every later suite in
// this process. Other component suites may have registered it already.
if (!GlobalRegistrator.isRegistered) GlobalRegistrator.register();
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Rendering never calls Supabase. Suites that need it mock it themselves.
mock.module("@/integrations/supabase/client", () => ({ supabase: {} }));

// Radix uses useLayoutEffect, which React warns about once per component when rendering to a
// string. Harmless here, as in scripts/prerender.ts; anything else still reaches the console.
const consoleError = console.error;
const logged: string[] = [];
console.error = (...args: unknown[]) => {
  const message = args.map(String).join(" ");
  if (message.includes("useLayoutEffect does nothing on the server")) return;
  logged.push(message);
  consoleError(...args);
};

const React = await import("react");
const { renderToString } = await import("react-dom/server");
const { hydrateRoot } = await import("react-dom/client");
// From react-router (react-router-dom re-exports it): other suites mock react-router-dom.
const { StaticRouter } = await import("react-router");
const { default: HeroEnquiryForm } = await import("./HeroEnquiryForm");
const { default: FinalCTA } = await import("./FinalCTA");

/**
 * Three enquiry forms on one page, as /builder-registration-course-melbourne and
 * /bpc-exam-changes have, plus the home page's closing form. Rendered to a string the way
 * scripts/prerender.ts renders pages, then hydrated the way src/main.tsx hydrates them.
 */
const page = (
  <StaticRouter location="/">
    <HeroEnquiryForm source="one" />
    <HeroEnquiryForm source="two" />
    <HeroEnquiryForm source="three" />
    <FinalCTA />
  </StaticRouter>
);
const container = document.createElement("div");
container.innerHTML = renderToString(page);
document.body.appendChild(container);
const forms = [...container.querySelectorAll("form")];

// The document is shared with the other suites: leave nothing behind.
afterAll(() => {
  container.remove();
  console.error = consoleError;
});

const byId = (id: string) => [...container.querySelectorAll("[id]")].find((el) => el.id === id) ?? null;

/** Each label's text and the kind of field it points at, checking the field is in `form`. */
const labelledFields = (form: (typeof forms)[number]) =>
  [...form.querySelectorAll("label")].map((label) => {
    const field = byId(label.htmlFor);
    expect(field).not.toBeNull();
    expect(form.contains(field)).toBe(true);
    const kind = field.getAttribute("role") ?? field.getAttribute("type") ?? field.tagName.toLowerCase();
    return [label.textContent?.trim(), kind];
  });

describe("lead forms, several on one page", () => {
  test("renders all four forms", () => {
    expect(forms).toHaveLength(4);
  });

  test("no id appears twice", () => {
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(21); // five fields per enquiry form, six in FinalCTA
  });

  test("each enquiry form's labels point at that form's own fields", () => {
    for (const form of forms.slice(0, 3)) {
      expect(labelledFields(form)).toEqual([
        ["First name *", "text"],
        ["Phone number *", "tel"],
        ["Email address *", "email"],
        ["Your trade", "combobox"],
        ["Years of experience", "combobox"],
      ]);
    }
  });

  test("FinalCTA's labels point at its own fields", () => {
    expect(labelledFields(forms[3])).toEqual([
      ["Name *", "text"],
      ["Phone *", "tel"],
      ["Email *", "email"],
      ["Licence Type", "combobox"],
      ["Referral Code (Optional)", "text"],
      ["Tell us about your experience", "textarea"],
    ]);
  });

  test("hydrating keeps the prerendered ids", async () => {
    const before = [...container.querySelectorAll("[id]")].map((el) => el.id);
    const recoverable: unknown[] = [];
    logged.length = 0;
    let root: ReturnType<typeof hydrateRoot>;
    await React.act(async () => {
      root = hydrateRoot(container, page, { onRecoverableError: (error) => recoverable.push(error) });
    });
    // React logs "Prop `id` did not match" (or `htmlFor`) when the browser's ids differ.
    expect(logged.filter((message) => message.includes("did not match"))).toEqual([]);
    expect(recoverable).toEqual([]);
    expect([...container.querySelectorAll("[id]")].map((el) => el.id)).toEqual(before);
    await React.act(async () => root.unmount());
  });
});
