import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

/** The prerendered routes, read from App.tsx's PRERENDER_ROUTES (importing App would pull in the whole app). */
const prerendered = () => {
  const table = read("../App.tsx").match(/const PRERENDER_ROUTES[\s\S]*?> = \{([\s\S]*?)\};/)?.[1] ?? "";
  return [...table.matchAll(/"(\/[^"]*)"\s*:/g)].map((m) => m[1]).sort();
};

/** The paths in scripts/generate-sitemap.ts's hand-maintained entries. */
const inSitemap = () => [...read("../../scripts/generate-sitemap.ts").matchAll(/path:\s*"(\/[^"]*)"/g)].map((m) => m[1]).sort();

describe("sitemap", () => {
  test("should list exactly the prerendered public pages", () => {
    expect(prerendered().length).toBeGreaterThanOrEqual(11);
    expect(inSitemap()).toEqual(prerendered());
  });
});
