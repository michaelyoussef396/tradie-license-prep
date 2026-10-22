import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Other suites may have registered it already (bun runs every file in one process).
if (!GlobalRegistrator.isRegistered) GlobalRegistrator.register();

const { NOT_FOUND_TITLE, PAGE_TITLES, pageTitle, provideTitlesToHistoryHook, titleForPath } = await import(
  "./page-titles"
);

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

/** The prerendered routes, read from App.tsx's PRERENDER_ROUTES (importing App would pull in the whole app). */
function prerenderedRoutes(): string[] {
  const table = read("../App.tsx").match(/const PRERENDER_ROUTES[\s\S]*?> = \{([\s\S]*?)\};/)?.[1] ?? "";
  return [...table.matchAll(/"(\/[^"]*)"\s*:/g)].map((m) => m[1]);
}

const indexHtml = read("../../index.html");
/** The history hook script from index.html, run below exactly as the browser runs it. */
const HOOK = indexHtml.match(/<script>\s*(\(function \(\) \{\s*function retitle\(\)[\s\S]*?\}\)\(\);)\s*<\/script>/)?.[1];

describe("titleForPath", () => {
  test("should have a title for every prerendered route and for /thank-you", () => {
    const routes = prerenderedRoutes();
    expect(routes.length).toBeGreaterThanOrEqual(9);
    for (const route of [...routes, "/thank-you"]) {
      expect(PAGE_TITLES[route]).toBeTruthy();
      expect(titleForPath(route)).toBe(PAGE_TITLES[route]);
      expect(pageTitle(route)).toBe(PAGE_TITLES[route]);
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

  test("pageTitle should have no fallback, so a page missing from the table is caught", () => {
    expect(pageTitle("/no-such-page")).toBeUndefined();
    expect(pageTitle("/admin")).toBeUndefined();
  });
});

describe("history hook in index.html", () => {
  const nativePush = window.history.pushState;
  const nativeReplace = window.history.replaceState;
  const nativeAddEventListener = window.addEventListener;
  /** document.title at the moment the URL actually changed: what the browser keeps as the
   * label of the page being left in its Back-button history. */
  let titleWhenUrlChanged: string[] = [];
  /** What a GA4-style hook installed after index.html's would read. */
  let titlesSeenByAnalytics: string[] = [];
  let listeners: [string, EventListenerOrEventListenerObject, boolean | AddEventListenerOptions | undefined][] = [];

  /** Runs the hook script against stand-ins for the native history methods. */
  const runHook = () => {
    window.history.pushState = function (this: History, ...args: Parameters<History["pushState"]>) {
      titleWhenUrlChanged.push(document.title);
      return nativePush.apply(this, args);
    };
    window.history.replaceState = function (this: History, ...args: Parameters<History["replaceState"]>) {
      titleWhenUrlChanged.push(document.title);
      return nativeReplace.apply(this, args);
    };
    window.addEventListener = function (this: Window, ...args: Parameters<Window["addEventListener"]>) {
      listeners.push([args[0], args[1], args[2]]);
      return nativeAddEventListener.apply(this, args);
    } as Window["addEventListener"];
    new Function(HOOK!)();
    window.addEventListener = nativeAddEventListener;
  };

  /** GA4 wraps history when gtag.js loads, which is always after the hook: it lets the call
   * through, then reads the title. */
  const installAnalyticsHook = () => {
    const inner = window.history.pushState;
    window.history.pushState = function (this: History, ...args: Parameters<History["pushState"]>) {
      const result = inner.apply(this, args);
      titlesSeenByAnalytics.push(document.title);
      return result;
    };
    const onPopState = () => titlesSeenByAnalytics.push(document.title);
    window.addEventListener("popstate", onPopState);
    listeners.push(["popstate", onPopState, undefined]);
  };

  beforeEach(() => {
    titleWhenUrlChanged = [];
    titlesSeenByAnalytics = [];
    listeners = [];
    // A real origin to resolve relative URLs against (happy-dom starts at about:blank).
    (globalThis as { happyDOM?: { setURL: (url: string) => void } }).happyDOM?.setURL("https://www.qualifypro.com.au/faq");
    document.title = PAGE_TITLES["/faq"];
    provideTitlesToHistoryHook();
  });

  afterEach(() => {
    window.history.pushState = nativePush;
    window.history.replaceState = nativeReplace;
    for (const [type, listener, options] of listeners) window.removeEventListener(type, listener, options);
    delete window.__qpTitleForPath;
  });

  test("should be in index.html, above the analytics snippet", () => {
    expect(HOOK).toBeTruthy();
    expect(indexHtml.indexOf("__qpTitleForPath")).toBeLessThan(indexHtml.indexOf("googletagmanager.com"));
  });

  test("should set the new page's title once the URL has changed, before analytics reads it", () => {
    runHook();
    installAnalyticsHook();

    window.history.pushState(null, "", "/courses");

    expect(window.location.pathname).toBe("/courses");
    expect(titlesSeenByAnalytics).toEqual([PAGE_TITLES["/courses"]]);
    expect(document.title).toBe(PAGE_TITLES["/courses"]);
    // The page being left keeps its own name in the browser's history.
    expect(titleWhenUrlChanged).toEqual([PAGE_TITLES["/faq"]]);
  });

  test("should set the title on Back and Forward before analytics reads it", () => {
    runHook();
    installAnalyticsHook();

    nativePush.call(window.history, null, "", "/about"); // where Back lands
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));

    expect(titlesSeenByAnalytics).toEqual([PAGE_TITLES["/about"]]);
  });

  test("should handle replaceState, full URLs and query strings", () => {
    runHook();

    window.history.replaceState(null, "", `${window.location.origin}/about?ref=nav`);

    expect(document.title).toBe(PAGE_TITLES["/about"]);
  });

  test("should not touch the title for an internal route or a state-only update", () => {
    runHook();

    window.history.pushState(null, "", "/admin");
    expect(document.title).toBe(PAGE_TITLES["/faq"]);

    window.history.replaceState({ scroll: 1 }, "");
    expect(document.title).toBe(PAGE_TITLES["/faq"]);
  });

  test("should do nothing before main.tsx has provided the titles", () => {
    delete window.__qpTitleForPath;
    runHook();

    window.history.pushState(null, "", "/courses");

    expect(window.location.pathname).toBe("/courses");
    expect(document.title).toBe(PAGE_TITLES["/faq"]);
  });
});
