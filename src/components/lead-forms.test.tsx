import { afterAll, describe, expect, mock, test } from "bun:test";
import { Window } from "happy-dom";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

// Rendering never calls Supabase, and the real client can't be created here (it needs
// localStorage). Suites that do need it mock it themselves.
mock.module("@/integrations/supabase/client", () => ({ supabase: {} }));

const { default: HeroEnquiryForm } = await import("./HeroEnquiryForm");
const { default: FinalCTA } = await import("./FinalCTA");

/**
 * Three enquiry forms on one page, as /builder-registration-course-melbourne and
 * /bpc-exam-changes have, plus the home page's closing form, rendered the way
 * scripts/prerender.ts renders pages. Parsed in a standalone happy-dom window so nothing
 * is registered globally.
 */
const window = new Window();
const { document } = window;
document.body.innerHTML = renderToString(
  <StaticRouter location="/">
    <HeroEnquiryForm source="one" />
    <HeroEnquiryForm source="two" />
    <HeroEnquiryForm source="three" />
    <FinalCTA />
  </StaticRouter>,
);
const forms = [...document.querySelectorAll("form")];

afterAll(() => window.happyDOM.close());

/** Each label's text and the kind of field it points at, checking the field is in `form`. */
const labelledFields = (form: (typeof forms)[number]) =>
  [...form.querySelectorAll("label")].map((label) => {
    const field = document.getElementById(label.htmlFor);
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
    const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
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
});
