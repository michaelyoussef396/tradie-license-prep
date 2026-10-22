import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Other suites may have registered it already (bun runs every file in one process).
if (!GlobalRegistrator.isRegistered) GlobalRegistrator.register();

const { NOT_FOUND_TITLE, PAGE_TITLES, setTitleBeforeNavigation, titleForPath } = await import("./page-titles");

/** The prerendered routes, read from App.tsx's PRERENDER_ROUTES (importing App would pull in the whole app). */
function prerenderedRoutes(): string[] {
  const source = readFileSync(fileURLToPath(new URL("../App.tsx", import.meta.url)), "utf8");
  const table = source.match(/const PRERENDER_ROUTES[\s\S]*?> = \{([\s\S]*?)\};/)?.[1] ?? "";
  return [...table.matchAll(/"(\/[^"]*)"\s*:/g)].map((m) => m[1]);
}

describe("titleForPath", () => {
  test("should have a title for every prerendered route and for /thank-you", () => {
    const routes = prerenderedRoutes();
    expect(routes.length).toBeGreaterThanOrEqual(9);
    for (const route of [...routes, "/thank-you"]) {
      expect(PAGE_TITLES[route]).toBeTruthy();
      expect(titleForPath(route)).toBe(PAGE_TITLES[route]);
    }
  });

  test("should ignore a trailing slash", () => {
    expect(titleForPath("/courses/")).toBe(PAGE_TITLES["/courses"]);
  });

  test("should give unknown and wrong-case paths the 404 title, as the router does", () => {
    expect(titleForPath("/no-such-page")).toBe(NOT_FOUND_TITLE);
    expect(titleForPath("/Courses")).toBe(NOT_FOUND_TITLE);
  });

  test("should leave internal routes alone", () => {
    expect(titleForPath("/admin")).toBeUndefined();
    expect(titleForPath("/admin/email-templates")).toBeUndefined();
    expect(titleForPath("/dashboard")).toBeUndefined();
  });
});

describe("setTitleBeforeNavigation", () => {
  const originalPush = window.history.pushState;
  const originalReplace = window.history.replaceState;
  /** What a GA4-style history hook would read when the URL changes. */
  let titlesSeenByHook: string[] = [];

  /** A stand-in for GA4's hook: lets the push through, then reads the title. */
  const installHook = () => {
    const inner = window.history.pushState;
    window.history.pushState = function (this: History, ...args: Parameters<History["pushState"]>) {
      const result = inner.apply(this, args);
      titlesSeenByHook.push(document.title);
      return result;
    };
  };

  beforeEach(() => {
    window.history.pushState = originalPush;
    window.history.replaceState = originalReplace;
    titlesSeenByHook = [];
    // A real origin to resolve relative URLs against (happy-dom starts at about:blank).
    (globalThis as { happyDOM?: { setURL: (url: string) => void } }).happyDOM?.setURL("https://www.qualifypro.com.au/faq");
    document.title = PAGE_TITLES["/faq"];
  });

  afterEach(() => {
    window.history.pushState = originalPush;
    window.history.replaceState = originalReplace;
  });

  test("should set the next page's title before the URL changes", () => {
    setTitleBeforeNavigation();
    installHook();

    window.history.pushState(null, "", "/courses");

    expect(titlesSeenByHook).toEqual([PAGE_TITLES["/courses"]]);
    expect(window.location.pathname).toBe("/courses");
  });

  test("should work when the analytics hook was installed first", () => {
    installHook();
    setTitleBeforeNavigation();

    window.history.pushState(null, "", "/thank-you");

    expect(titlesSeenByHook).toEqual([PAGE_TITLES["/thank-you"]]);
  });

  test("should handle replaceState, full URLs and query strings", () => {
    setTitleBeforeNavigation();

    window.history.replaceState(null, "", `${window.location.origin}/about?ref=nav`);

    expect(document.title).toBe(PAGE_TITLES["/about"]);
  });

  test("should not touch the title for an internal route or a state-only update", () => {
    setTitleBeforeNavigation();

    window.history.pushState(null, "", "/admin");
    expect(document.title).toBe(PAGE_TITLES["/faq"]);

    window.history.replaceState({ scroll: 1 }, "");
    expect(document.title).toBe(PAGE_TITLES["/faq"]);
  });
});
