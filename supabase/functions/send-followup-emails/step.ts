/**
 * One follow-up email for one lead, written as claim → send → release-on-failure, so a
 * lead can never be emailed twice for the same step.
 *
 * 1. claim:   mark the step sent (and move the status) in the database first, guarded on
 *             the status we read and the step not being marked yet. No row means Adrian
 *             moved the lead, or another run got there first: nothing is sent.
 * 2. send:    call Resend.
 * 3. release: only when Resend definitely refused the email (a non-2xx response), undo the
 *             claim so tomorrow's run can try again. When the outcome is unknown (the request
 *             threw, so Resend may have sent it), the claim stays: a missed email is better
 *             than a duplicate, and it is reported.
 *
 * Pure: the database and Resend calls are passed in, so this runs under `bun test`.
 */

export type SendResult = { ok: true } | { ok: false; definite: boolean; detail: string };

export interface StepDeps {
  claim: () => Promise<{ claimed: boolean; error?: string }>;
  send: () => Promise<SendResult>;
  release: () => Promise<{ released: boolean; error?: string }>;
}

export type StepOutcome =
  | { outcome: "sent" }
  | { outcome: "skipped" }
  | { outcome: "not_sent"; error: string }
  | { outcome: "unknown"; error: string };

export async function runFollowupStep(label: string, deps: StepDeps): Promise<StepOutcome> {
  const claim = await deps.claim();
  if (claim.error) return { outcome: "not_sent", error: `${label}: not sent, claim failed: ${claim.error}` };
  if (!claim.claimed) return { outcome: "skipped" };

  let sent: SendResult;
  try {
    sent = await deps.send();
  } catch (e) {
    sent = { ok: false, definite: false, detail: `send threw ${e instanceof Error ? e.name : "unknown"}` };
  }
  if (sent.ok) return { outcome: "sent" };

  if (!sent.definite) {
    return { outcome: "unknown", error: `${label}: ${sent.detail}; may have sent, left marked as sent so it can't go twice` };
  }

  const release = await deps.release().catch((e) => ({
    released: false,
    error: e instanceof Error ? e.name : "unknown",
  }));
  if (release.released) return { outcome: "not_sent", error: `${label}: ${sent.detail}; not sent, will retry next run` };
  return {
    outcome: "not_sent",
    error: `${label}: ${sent.detail}; not sent, and the claim could not be undone (${release.error ?? "row changed"}): marked as sent without an email`,
  };
}
