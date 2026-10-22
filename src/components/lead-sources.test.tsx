import { afterAll, describe, expect, mock, test } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Every lead row records which form it came from in `source`, and the form's GA4
 * contact_form_submit event carries the same value. Two parts:
 * - reading the code: every lead form in src/ stores one source, no two pages share one, and a
 *   component that fixes its own source (FinalCTA, Hero) is mounted by one page only;
 * - submitting HeroEnquiryForm and FinalCTA with Supabase and gtag stubbed: the row and the event
 *   carry the same source.
 * Anything the reader can't follow fails, rather than being skipped.
 */

// Register the DOM before anything imports Radix: its layout-effect choice is made at import time
// and sticks for every later suite in this process. Other suites may have registered it already.
if (!GlobalRegistrator.isRegistered) GlobalRegistrator.register();
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// ── Reading the code ─────────────────────────────────────────────────────────────

const SRC = fileURLToPath(new URL("..", import.meta.url));
const FORM = "components/HeroEnquiryForm.tsx";

/** Every .ts/.tsx file under src/, except tests, as a path relative to src/. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path.slice(SRC.length)] : [];
  });
}
const FILES = sourceFiles(SRC);
const TEXT = new Map(FILES.map((file) => [file, readFileSync(join(SRC, file), "utf8")]));
const problems: string[] = [];

/** From an opening bracket at `open` to its partner, skipping strings. */
function balanced(text: string, open: number): string | null {
  const close: Record<string, string> = { "{": "}", "(": ")", "[": "]" };
  const stack: string[] = [];
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (c === '"' || c === "'" || c === "`") {
      for (i++; i < text.length && text[i] !== c; i++) if (text[i] === "\\") i++;
    } else if (close[c]) stack.push(close[c]);
    else if (c === stack[stack.length - 1]) {
      stack.pop();
      if (!stack.length) return text.slice(open, i + 1);
    }
  }
  return null;
}

/** A JSX opening tag from its "<" to the ">" that ends it (props may hold arrows and JSX). */
function jsxTag(text: string, start: number): string {
  let depth = 0;
  for (let i = start + 1; i < text.length; i++) {
    const c = text[i];
    if (c === '"' || c === "'" || c === "`") {
      for (i++; i < text.length && text[i] !== c; i++) if (text[i] === "\\") i++;
    } else if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === ">" && depth === 0) return text.slice(start, i + 1);
  }
  return text.slice(start);
}

/** The value of `key:` in an object literal's text (shorthand `key,` gives "key"). */
function property(object: string, key: string): string | undefined {
  const at = object.search(new RegExp(`[{,\\s]${key}\\s*[:,}]`));
  if (at < 0) return undefined;
  let i = object.indexOf(key, at) + key.length;
  while (/\s/.test(object[i])) i++;
  if (object[i] !== ":") return key;
  const start = ++i;
  for (let depth = 0; i < object.length; i++) {
    const c = object[i];
    if (c === '"' || c === "'" || c === "`") {
      for (i++; i < object.length && object[i] !== c; i++) if (object[i] === "\\") i++;
    } else if ("{([".includes(c)) depth++;
    else if ("})]".includes(c)) {
      if (depth === 0) break;
      depth--;
    } else if (c === "," && depth === 0) break;
  }
  return object.slice(start, i).trim();
}

/** The string a source expression names: a string literal, or a string const (here or exported). */
function resolve(expression: string, file: string): string | null {
  const literal = expression.match(/^(["'`])([^"'`$]*)\1$/);
  if (literal) return literal[2];
  if (!/^[A-Za-z_$][\w$]*$/.test(expression)) return null;
  const declaration = (prefix: string) =>
    new RegExp(`${prefix}const ${expression}\\s*(?::[^=]+)?=\\s*(["'\`])([^"'\`$]*)\\1`);
  const own = TEXT.get(file).match(declaration(""));
  if (own) return own[2];
  const exported = FILES.map((f) => TEXT.get(f).match(declaration("export "))).filter(Boolean);
  return exported.length === 1 ? exported[0][2] : null;
}

/** The local names `file` imports `component` (a path under src/, without extension) as. */
function importedAs(file: string, component: string): string[] {
  const name = component.split("/").pop();
  const pattern = new RegExp(`import\\s+(\\w+)\\s+from\\s+["'](?:@/${component}|(?:\\.\\.?/)+(?:[\\w-]+/)*${name})["']`, "g");
  return [...TEXT.get(file).matchAll(pattern)].map((m) => m[1]);
}

/** Every opening tag in `file` for a component imported as one of `names`. */
function tagsOf(file: string, names: string[]): string[] {
  const text = TEXT.get(file);
  return names.flatMap((name) => [...text.matchAll(new RegExp(`<${name}(?=[\\s/>])`, "g"))].map((m) => jsxTag(text, m.index)));
}

/** HeroEnquiryForm's default `source`, used when a page passes none. */
const DEFAULT_SOURCE = TEXT.get(FORM).match(/\bsource\s*=\s*(["'])([^"']+)\1/)?.[2];

type Surface = { file: string; stored: string[]; tracked: string[]; direct: boolean };

/** Every file that stores leads: through HeroEnquiryForm's `source` prop, or by inserting itself. */
const surfaces: Surface[] = FILES.filter((file) => file !== FORM).flatMap((file) => {
  const text = TEXT.get(file);
  const stored: string[] = [];
  const tracked: string[] = [];
  const read = (expression: string | undefined, what: string) => {
    const source = expression === undefined ? null : resolve(expression, file);
    if (source === null) problems.push(`${file}: can't read the source of ${what} (${expression ?? "none given"})`);
    return source;
  };

  for (const tag of tagsOf(file, importedAs(file, FORM.replace(/\.tsx$/, "")))) {
    const literal = tag.match(/\ssource=(["'])([^"']*)\1/);
    const braced = tag.search(/\ssource=\{/);
    if (literal) stored.push(literal[2]);
    else if (braced >= 0) stored.push(read(balanced(tag, tag.indexOf("{", braced))?.slice(1, -1).trim(), "a HeroEnquiryForm"));
    else stored.push(DEFAULT_SOURCE); // no source given: HeroEnquiryForm's default
  }

  let direct = false;
  for (const from of text.matchAll(/\.from\(\s*(["'`])leads\1\s*\)/g)) {
    const after = text.slice(from.index + from[0].length);
    const insert = after.match(/^\s*\.insert\(\s*/);
    if (!insert) continue; // a select or an update
    direct = true;
    const argument = after[insert[0].length] === "{" ? balanced(after, insert[0].length) : null;
    if (!argument) problems.push(`${file}: can't read a leads insert that isn't an object literal`);
    else stored.push(read(property(argument, "source"), "its leads insert"));
  }
  if (direct) {
    for (const call of text.matchAll(/trackContactFormSubmit\(\s*/g)) {
      const at = call.index + call[0].length;
      const argument = text[at] === "{" ? balanced(text, at) : null;
      tracked.push(read(argument ? property(argument, "source") : undefined, "its contact_form_submit event"));
    }
    if (!tracked.length) problems.push(`${file}: inserts leads but sends no contact_form_submit event with a source`);
  }

  return stored.length ? [{ file, stored: [...new Set(stored)], tracked: [...new Set(tracked)], direct }] : [];
});

describe("lead sources in the code", () => {
  test("every lead form can be read", () => {
    expect(DEFAULT_SOURCE).toBeString();
    expect(problems).toEqual([]);
    const files = surfaces.map((s) => s.file);
    for (const known of ["components/Hero.tsx", "components/FinalCTA.tsx", "pages/Contact.tsx", "pages/BuildersLicenceMelbourne.tsx"]) {
      expect(files).toContain(known);
    }
  });

  test("each file stores its leads under one source", () => {
    expect(surfaces.filter((s) => s.stored.length !== 1).map((s) => `${s.file}: ${s.stored.join(", ")}`)).toEqual([]);
  });

  test("no two forms share a source", () => {
    const files = new Map<string, string[]>();
    for (const { file, stored } of surfaces) for (const source of stored) files.set(source, [...(files.get(source) ?? []), file]);
    expect([...files].filter(([, f]) => f.length > 1).map(([source, f]) => `${source}: ${f.join(", ")}`)).toEqual([]);
  });

  test("a component that fixes its own source is mounted by one page only", () => {
    const misplaced = surfaces
      .filter((s) => s.file.startsWith("components/"))
      .flatMap(({ file }) => {
        const component = file.replace(/\.tsx$/, "");
        const mountedBy = FILES.filter((f) => tagsOf(f, importedAs(f, component)).length);
        return mountedBy.length === 1 && mountedBy[0].startsWith("pages/") ? [] : [`${file}: mounted by ${mountedBy.join(", ") || "nothing"}`];
      });
    expect(misplaced).toEqual([]);
  });

  test("a form's GA4 event carries the same source as its lead row", () => {
    const mismatched = surfaces.filter((s) => s.direct && s.tracked.join() !== s.stored.join());
    expect(mismatched.map((s) => `${s.file}: row ${s.stored.join(", ")}, event ${s.tracked.join(", ")}`)).toEqual([]);
  });
});

// ── Submitting ───────────────────────────────────────────────────────────────────

const rows: Array<Record<string, unknown>> = [];
mock.module("@/integrations/supabase/client", () => ({
  supabase: {
    from: (table: string) => ({
      insert: async (row: Record<string, unknown>) => {
        if (table === "leads") rows.push(row);
        return { error: null };
      },
    }),
    functions: { invoke: () => Promise.resolve({ data: null, error: null }) },
  },
}));

const React = await import("react");
const { createRoot } = await import("react-dom/client");
// From react-router (react-router-dom re-exports it): other suites mock react-router-dom.
const { MemoryRouter } = await import("react-router");
const { default: HeroEnquiryForm } = await import("./HeroEnquiryForm");
const { default: FinalCTA } = await import("./FinalCTA");

const events: unknown[][] = [];
const gtag = window.gtag;
window.gtag = (...args: unknown[]) => events.push(args);
// A public page, so the analytics helpers send events. The document is shared with the other
// suites, so put things back afterwards.
const happyDOM = (window as unknown as { happyDOM: { setURL(url: string): void } }).happyDOM;
const url = window.location.href;
happyDOM.setURL("https://www.qualifypro.com.au/");
afterAll(() => {
  window.gtag = gtag;
  happyDOM.setURL(url);
});

const type = (field: HTMLInputElement, value: string) => {
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(field, value);
  field.dispatchEvent(new window.Event("input", { bubbles: true }));
};

/** Renders `form`, fills its required fields, submits it, and returns the row and the event's source. */
async function submit(form: React.ReactElement) {
  rows.length = 0;
  events.length = 0;
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await React.act(async () => root.render(<MemoryRouter>{form}</MemoryRouter>));
  const element = container.querySelector("form");
  await React.act(async () => {
    type(element.querySelector('input[type="text"]'), "Probe");
    type(element.querySelector('input[type="tel"]'), "0400000000");
    type(element.querySelector('input[type="email"]'), "probe@example.com");
  });
  await React.act(async () => {
    element.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
    for (let i = 0; i < 50 && !rows.length; i++) await new Promise((r) => setTimeout(r, 0));
  });
  await React.act(async () => root.unmount());
  container.remove();
  const submitted = events.filter((e) => e[0] === "event" && e[1] === "contact_form_submit");
  return { row: rows.map((r) => r.source), event: submitted.map((e) => (e[2] as { source?: string }).source) };
}

describe("lead sources when a form is submitted", () => {
  test("HeroEnquiryForm stores and reports the source it's given", async () => {
    expect(await submit(<HeroEnquiryForm source="probe-page" />)).toEqual({ row: ["probe-page"], event: ["probe-page"] });
  });

  test("FinalCTA stores and reports the source the code says", async () => {
    const source = surfaces.find((s) => s.file === "components/FinalCTA.tsx")?.stored[0];
    expect(source).toBeString();
    expect(await submit(<FinalCTA />)).toEqual({ row: [source], event: [source] });
  });
});
