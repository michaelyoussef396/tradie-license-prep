import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

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

const read = (file: string) => readFileSync(join(SRC, file), "utf8");

/** The string a `source` expression names: a string literal, or a const declared in the same file. */
function resolve(expression: string, text: string): string {
  const name = expression.trim();
  const literal = name.match(/^["'`]([^"'`]*)["'`]$/);
  if (literal) return literal[1];
  const declared = text.match(new RegExp(`const ${name}\\s*=\\s*["'\`]([^"'\`]*)["'\`]`));
  return declared ? declared[1] : `<unresolved ${name}>`;
}

const DEFAULT_SOURCE = read(FORM).match(/\bsource = "([^"]+)"/)?.[1] ?? "<no default>";

/**
 * Every file that captures leads: the source its lead rows are stored under (a HeroEnquiryForm's
 * `source` prop, or the default when none is passed, or the `source` of a direct insert into
 * leads) and the source its own GA4 form events carry.
 */
const surfaces = sourceFiles(SRC).flatMap((file) => {
  if (file === FORM) return [];
  const text = read(file);
  const stored: string[] = [];
  for (const tag of text.match(/<HeroEnquiryForm\b[^>]*>/g) ?? []) {
    const prop = tag.match(/\bsource=(?:\{([^}]*)\}|("[^"]*"))/);
    stored.push(prop ? resolve(prop[1] ?? prop[2], text) : DEFAULT_SOURCE);
  }
  for (const insert of text.match(/from\(["']leads["']\)\s*\.insert\(\{[\s\S]*?\}\)/g) ?? []) {
    const value = insert.match(/\bsource:\s*([^,\n}]+)/);
    stored.push(value ? resolve(value[1], text) : "<no source>");
  }
  const tracked = [...text.matchAll(/trackContactFormSubmit\(\{[\s\S]*?\bsource:\s*([^,\n}]+)/g)].map((m) =>
    resolve(m[1], text),
  );
  return stored.length ? [{ file, stored: [...new Set(stored)], tracked: [...new Set(tracked)] }] : [];
});

describe("lead sources", () => {
  test("finds the lead forms", () => {
    const files = surfaces.map((s) => s.file);
    expect(files).toContain("components/Hero.tsx");
    expect(files).toContain("components/FinalCTA.tsx");
    expect(files).toContain("pages/Contact.tsx");
    expect(files).toContain("pages/BuildersLicenceMelbourne.tsx");
  });

  test("each page stores its leads under one source of its own", () => {
    for (const { file, stored } of surfaces) {
      expect({ file, stored: stored.filter((s) => s.startsWith("<")) }).toEqual({ file, stored: [] });
      expect({ file, count: stored.length }).toEqual({ file, count: 1 });
    }
    const all = surfaces.map((s) => s.stored[0]);
    const shared = all.filter((source, i) => all.indexOf(source) !== i);
    expect(shared).toEqual([]);
  });

  test("a form's GA4 event carries the same source as its lead row", () => {
    for (const { file, stored, tracked } of surfaces.filter((s) => s.tracked.length)) {
      expect({ file, tracked }).toEqual({ file, tracked: stored });
    }
    // HeroEnquiryForm sends its `source` prop to both.
    const form = read(FORM);
    expect(form).toMatch(/\.insert\(\{[\s\S]*?\n\s*source,\n/);
    expect(form).toMatch(/trackContactFormSubmit\(\{[\s\S]*?\n\s*source,\n/);
  });
});
