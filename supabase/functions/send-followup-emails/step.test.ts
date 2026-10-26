import { describe, expect, test } from "bun:test";

import { runFollowupStep, type SendResult, type StepDeps } from "./step";

function deps(over: Partial<{ claim: Awaited<ReturnType<StepDeps["claim"]>>; send: SendResult | Error; release: Awaited<ReturnType<StepDeps["release"]>> }>) {
  const calls: string[] = [];
  const d: StepDeps = {
    claim: async () => {
      calls.push("claim");
      return over.claim ?? { claimed: true };
    },
    send: async () => {
      calls.push("send");
      if (over.send instanceof Error) throw over.send;
      return over.send ?? { ok: true };
    },
    release: async () => {
      calls.push("release");
      return over.release ?? { released: true };
    },
  };
  return { d, calls };
}

describe("runFollowupStep", () => {
  test("should claim before sending", async () => {
    const { d, calls } = deps({});

    const result = await runFollowupStep("day3 L1", d);

    expect(calls).toEqual(["claim", "send"]);
    expect(result).toEqual({ outcome: "sent" });
  });

  test("should not send when the lead could not be claimed", async () => {
    const { d, calls } = deps({ claim: { claimed: false } });

    const result = await runFollowupStep("day3 L1", d);

    expect(calls).toEqual(["claim"]);
    expect(result).toEqual({ outcome: "skipped" });
  });

  test("should not send when the claim errors", async () => {
    const { d, calls } = deps({ claim: { claimed: false, error: "db down" } });

    const result = await runFollowupStep("day3 L1", d);

    expect(calls).toEqual(["claim"]);
    expect(result.outcome).toBe("not_sent");
  });

  test("should release the claim when Resend definitely refused the email", async () => {
    const { d, calls } = deps({ send: { ok: false, definite: true, detail: "Resend 422 validation_error" } });

    const result = await runFollowupStep("day3 L1", d);

    expect(calls).toEqual(["claim", "send", "release"]);
    expect(result.outcome).toBe("not_sent");
  });

  test("should keep the claim when the send outcome is unknown", async () => {
    const { d, calls } = deps({ send: new TypeError("network") });

    const result = await runFollowupStep("day3 L1", d);

    expect(calls).toEqual(["claim", "send"]);
    expect(result.outcome).toBe("unknown");
  });

  test("should report a claim that could not be released", async () => {
    const { d } = deps({
      send: { ok: false, definite: true, detail: "Resend 500" },
      release: { released: false, error: "db down" },
    });

    const result = await runFollowupStep("day3 L1", d);

    expect(result.outcome === "not_sent" && result.error).toContain("could not be undone");
  });
});
