import { afterAll, describe, expect, mock, test } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

/**
 * Every lead row records which form it came from in `source`, and the form's GA4
 * contact_form_submit event carries the same value. Two parts:
 * - reading the code (with the TypeScript parser): every lead form in src/ stores one source, no two
 *   forms share one, and each is mounted in one place only — a page's forms by its route, a
 *   component that fixes its own source (FinalCTA, Hero) by the one page it belongs to;
 * - submitting HeroEnquiryForm and FinalCTA with Supabase and gtag stubbed: the row and the event
 *   carry the same source.
 * Lead-form code the reader can't follow — a leads call other than insert/select/update/delete, an
 * insert or event without a readable source, a lead form loaded in a way it doesn't recognise —
 * fails the first test instead of being skipped.
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

/** Every node of every file, depth first. */
const NODES = new Map(
  FILES.map((file) => {
    const kind = file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    const root = ts.createSourceFile(file, readFileSync(join(SRC, file), "utf8"), ts.ScriptTarget.Latest, true, kind);
    const nodes: ts.Node[] = [];
    const visit = (node: ts.Node) => {
      nodes.push(node);
      ts.forEachChild(node, visit);
    };
    visit(root);
    return [file, nodes];
  }),
);
const problems: string[] = [];

const moduleOf = (file: string) => file.replace(/\.tsx?$/, "");

/** The module (src-relative, no extension) a specifier in `file` points at; null for packages. */
function target(file: string, specifier: string): string | null {
  if (specifier.startsWith("@/")) return specifier.slice(2).replace(/\.tsx?$/, "");
  if (specifier.startsWith(".")) return normalize(join(dirname(file), specifier)).replace(/\.tsx?$/, "");
  return null;
}

const isConstExported = (declaration: ts.VariableDeclaration) => {
  const statement = declaration.parent?.parent;
  return !!statement && ts.isVariableStatement(statement) && !!statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
};

/** The const named `name` that `file` can see: its own, or the one exported from another file. */
function constNamed(name: string, file: string): [string, ts.VariableDeclaration] | null {
  const consts = (f: string) =>
    NODES.get(f).filter(
      (n): n is ts.VariableDeclaration =>
        ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.name.text === name && (n.parent.flags & ts.NodeFlags.Const) !== 0,
    );
  const own = consts(file);
  if (own.length) return own.length === 1 ? [file, own[0]] : null;
  const exported = FILES.flatMap((f) => consts(f).filter(isConstExported).map((d) => [f, d] as [string, ts.VariableDeclaration]));
  return exported.length === 1 ? exported[0] : null;
}

const unwrap = (node: ts.Node | undefined) => {
  let e = node;
  while (e && (ts.isParenthesizedExpression(e) || ts.isAsExpression(e) || ts.isSatisfiesExpression(e))) e = e.expression;
  return e;
};

/**
 * The string an expression evaluates to: a string literal, a string const (here or exported
 * elsewhere), or a property of a const object of strings (`SOURCES.blm`).
 */
function resolve(expression: ts.Node | undefined, file: string, depth = 0): string | null {
  const e = unwrap(expression);
  if (!e || depth > 5) return null;
  if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return e.text;
  if (ts.isIdentifier(e)) {
    const found = constNamed(e.text, file);
    return found ? resolve(found[1].initializer, found[0], depth + 1) : null;
  }
  const key = ts.isPropertyAccessExpression(e) ? e.name.text : ts.isElementAccessExpression(e) ? resolve(e.argumentExpression, file, depth + 1) : null;
  const owner = ts.isPropertyAccessExpression(e) || ts.isElementAccessExpression(e) ? unwrap(e.expression) : null;
  if (key === null || !owner || !ts.isIdentifier(owner)) return null;
  const found = constNamed(owner.text, file);
  const object = found && unwrap(found[1].initializer);
  if (!object || !ts.isObjectLiteralExpression(object)) return null;
  for (const p of object.properties) {
    if (ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === key) {
      return resolve(p.initializer, found[0], depth + 1);
    }
  }
  return null;
}

/** The value of `source` in an object literal (null if absent, spread over, or not a known string). */
function sourceOf(object: ts.ObjectLiteralExpression, file: string): string | null {
  if (object.properties.some(ts.isSpreadAssignment)) return null;
  for (const p of object.properties) {
    if (ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === "source") return resolve(p.initializer, file);
    if (ts.isShorthandPropertyAssignment(p) && p.name.text === "source") return resolve(p.name, file);
  }
  return null;
}

/**
 * The names `file` gives `module`'s default export: `import X`, `import { default as X }`, or a
 * `const X = lazy(() => import(...))`-style wrapper. Any other reference to the module is a problem.
 */
function bindings(file: string, module: string): string[] {
  const names: string[] = [];
  for (const node of NODES.get(file)) {
    if (!ts.isStringLiteral(node) || target(file, node.text) !== module) continue;
    const owner = node.parent;
    if (ts.isImportDeclaration(owner)) {
      const clause = owner.importClause;
      if (clause?.name) names.push(clause.name.text);
      const named = clause?.namedBindings;
      if (named && ts.isNamedImports(named)) {
        for (const el of named.elements) if ((el.propertyName ?? el.name).text === "default") names.push(el.name.text);
      }
      if (!names.length) problems.push(`${file}: imports ${module} without naming its default export`);
    } else if (ts.isCallExpression(owner) && owner.expression.kind === ts.SyntaxKind.ImportKeyword) {
      let up: ts.Node = owner.parent;
      while (up && !ts.isVariableDeclaration(up) && !ts.isSourceFile(up)) up = up.parent;
      if (up && ts.isVariableDeclaration(up) && ts.isIdentifier(up.name)) names.push(up.name.text);
      else problems.push(`${file}: loads ${module} in a way this test can't follow`);
    } else {
      problems.push(`${file}: refers to ${module} in a way this test can't follow`);
    }
  }
  return names;
}

/** The attributes of every JSX element in `file` whose tag is one of `names`. */
const elements = (file: string, names: string[]) =>
  NODES.get(file)
    .filter(
      (n): n is ts.JsxSelfClosingElement | ts.JsxOpeningElement =>
        (ts.isJsxSelfClosingElement(n) || ts.isJsxOpeningElement(n)) && ts.isIdentifier(n.tagName) && names.includes(n.tagName.text),
    )
    .map((n) => n.attributes);

/** HeroEnquiryForm's default `source` (`({ source = "…" })`), if it has one. */
const DEFAULT_SOURCE = (() => {
  for (const n of NODES.get(FORM)) {
    if (ts.isBindingElement(n) && ts.isIdentifier(n.name) && n.name.text === "source" && n.initializer) return resolve(n.initializer, FORM);
  }
  return null;
})();

type Surface = { file: string; stored: string[]; tracked: string[]; direct: boolean; mountedBy: string[]; pages: string[] };

/**
 * The pages that end up rendering `file`, following any components in between (a section that
 * wraps FinalCTA, say). A page counts once for each route that mounts it; a component mounted
 * in App.tsx itself is on every page, which shows up as "App.tsx".
 */
function pagesRendering(file: string, seen = new Set<string>()): string[] {
  if (seen.has(file)) return [];
  seen.add(file);
  const module = moduleOf(file);
  return FILES.filter((f) => f !== file && elements(f, bindings(f, module)).length).flatMap((mounter) => {
    if (mounter === "App.tsx") return file.startsWith("pages/") ? elements(mounter, bindings(mounter, module)).map(() => file) : [mounter];
    return mounter.startsWith("pages/") ? [mounter] : pagesRendering(mounter, seen);
  });
}

/** Every file that stores leads: through HeroEnquiryForm's `source` prop, or by inserting itself. */
const surfaces: Surface[] = FILES.filter((file) => file !== FORM).flatMap((file) => {
  const stored: string[] = [];
  const tracked: string[] = [];
  const read = (source: string | null, what: string) => {
    if (source === null) problems.push(`${file}: can't read the source of ${what}`);
    return source;
  };

  for (const attributes of elements(file, bindings(file, moduleOf(FORM)))) {
    const prop = attributes.properties.find((a): a is ts.JsxAttribute => ts.isJsxAttribute(a) && ts.isIdentifier(a.name) && a.name.text === "source");
    const value = prop?.initializer && (ts.isStringLiteral(prop.initializer) ? prop.initializer : ts.isJsxExpression(prop.initializer) ? prop.initializer.expression : undefined);
    if (prop) stored.push(read(resolve(value, file), "a HeroEnquiryForm"));
    else if (attributes.properties.some(ts.isJsxSpreadAttribute)) stored.push(read(null, "a HeroEnquiryForm given spread props"));
    else if (DEFAULT_SOURCE !== null) stored.push(DEFAULT_SOURCE);
    else problems.push(`${file}: renders HeroEnquiryForm without a source, and it has no default`);
  }

  let direct = false;
  for (const node of NODES.get(file)) {
    if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression) || node.expression.name.text !== "from") continue;
    if (resolve(node.arguments[0], file) !== "leads") continue;
    const access = node.parent;
    const method = ts.isPropertyAccessExpression(access) && access.expression === node ? access.name.text : null;
    const call = method && ts.isCallExpression(access.parent) && access.parent.expression === access ? access.parent : null;
    if (call && ["select", "update", "delete"].includes(method)) continue;
    if (call && method === "insert") {
      direct = true;
      const [argument] = call.arguments;
      // An object literal, or a const holding one (`const row = {…}; insert(row)`).
      const row = argument && ts.isIdentifier(argument) ? unwrap(constNamed(argument.text, file)?.[1].initializer) : argument;
      if (row && ts.isObjectLiteralExpression(row)) stored.push(read(sourceOf(row, file), "its leads insert"));
      else problems.push(`${file}: inserts into leads with something other than an object literal`);
    } else {
      problems.push(`${file}: uses the leads table in a way this test can't follow (${method ?? "no method call"})`);
    }
  }
  if (direct) {
    for (const node of NODES.get(file)) {
      if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "trackContactFormSubmit") continue;
      const [argument] = node.arguments;
      tracked.push(read(argument && ts.isObjectLiteralExpression(argument) ? sourceOf(argument, file) : null, "its contact_form_submit event"));
    }
    if (!tracked.length) problems.push(`${file}: inserts leads but sends no contact_form_submit event`);
  }

  if (!stored.length) return [];
  const module = moduleOf(file);
  const mountedBy = FILES.filter((f) => f !== file && elements(f, bindings(f, module)).length);
  return [{ file, stored: [...new Set(stored)], tracked: [...new Set(tracked)], direct, mountedBy, pages: pagesRendering(file) }];
});

describe("lead sources in the code", () => {
  test("every lead form can be read", () => {
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

  test("each lead form ends up on one page only", () => {
    // A page through its one route in App.tsx; a component that fixes its own source (directly or
    // inside a section component) on the one page it belongs to.
    const wrong = surfaces
      .filter((s) => s.pages.length !== 1 || !s.pages[0].startsWith("pages/"))
      .map((s) => `${s.file}: on ${s.pages.join(", ") || "no page"} (mounted by ${s.mountedBy.join(", ") || "nothing"})`);
    expect(wrong).toEqual([]);
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
