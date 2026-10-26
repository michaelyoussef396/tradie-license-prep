import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { CALLBACK_PROMISE } from "./callback";

const SRC = fileURLToPath(new URL("..", import.meta.url));
const read = (path: string) => readFileSync(join(SRC, "..", path), "utf8");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

describe("callback promise", () => {
  test("should be repeated word for word in the send-lead-emails auto-reply", () => {
    const fn = read("supabase/functions/send-lead-emails/index.ts").replace(/<\/?strong>/g, "");

    expect(fn).toContain(CALLBACK_PROMISE);
  });

  test("should not leave a 24-hour promise anywhere on the site except the two email-reply lines", () => {
    // The hello@ email-reply lines ("We respond … within 24 hours") are a separate claim;
    // "Approval usually takes 8 to 24 hours" is the BPC's, quoted in the exam guide.
    const allowed = /We respond( to all emails)? within 24 hours|Approval usually takes 8 to 24 hours/;
    const files = [...sourceFiles(SRC), join(SRC, "..", "index.html")];
    const offenders = files.flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .filter((line) => /\b24[- ]?(hours?|hrs?)\b/i.test(line) && !allowed.test(line) && !/^(\/\/|\*|\/\*)/.test(line.trim()))
        .map((line) => `${file}: ${line.trim()}`),
    );

    expect(offenders).toEqual([]);
  });

  test("should not leave the old 24-hour promise in the auto-reply", () => {
    expect(read("supabase/functions/send-lead-emails/index.ts")).not.toContain("24 hours");
  });
});
