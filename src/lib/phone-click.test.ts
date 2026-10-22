import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("..", import.meta.url));

/** Every .ts/.tsx file under src/, except tests. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

describe("phone_click", () => {
  test("should only be sent by AnalyticsProvider's tel: link listener, so each tap counts once", () => {
    const callers = sourceFiles(SRC)
      .filter((path) => /trackPhoneClick\s*[(})]/.test(readFileSync(path, "utf8")))
      .map((path) => path.slice(SRC.length));
    expect(callers.sort()).toEqual(["components/AnalyticsProvider.tsx", "lib/analytics.ts"]);
  });
});
