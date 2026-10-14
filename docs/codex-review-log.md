# Codex review log

Every Codex review run on this repo, one entry per run (RULES.md rule 2). Codex is read-only and
writes nothing; Claude records each finding with a disposition after checking it against the repo.
Earlier reviews (claims sweep, Sep 2026) live in `.ai/CODEX_REVIEW.md` and `.ai/REVIEW_RESOLUTIONS.md`.

## 2026-10-14 — `fix/followup-cron-auth` (send-followup-emails)

Codex CLI 0.153.4, `codex exec -s read-only --ephemeral`, foreground, in a detached worktree
(`../tlp-review-followup`). `codex review --commit` was tried first and rejected because it can't
take custom instructions alongside `--commit`. Model and effort were Codex config defaults. Codex
could not run `deno check` (Deno is not installed), so its review was static only.

| Run | Commit | Diff (lines) | Wall | Findings |
|---|---|---|---|---|
| 1 | `c224607` delete followup-day3/day7 | 272 (deletion only) | 38 s | 0 new (1 pre-existing, fixed by `7efbf9c`) |
| 2 | `e9ae1d6` copy.ts | 70 | 45 s | 2 |
| 3 | `7efbf9c` index.ts rewrite | 273 (147+ / 126−, whole-file rewrite) | 78 s | 5 |
| 4 | `19bd0d6` round-1 fixes | 24 | 66 s | 1 (partial close of 3.2) |

Runs 1 and 3 exceed the 150-line cap by line count. Run 1 is pure deletion. Run 3 replaces one
147-line file, and the email copy was split into its own commit (run 2) to keep the logic review
as small as the rewrite allowed.

### Findings and dispositions

| # | Sev | Finding | Disposition |
|---|---|---|---|
| 1.0 | P1 | Pre-existing: function requires admin JWT, so the cron's x-cron-secret POST gets 401 | **confirmed-fixed** in `7efbf9c` (the reason for this branch) |
| 2.1 | P2 | Day-3 "I tried to reach you" asserts a contact attempt the function can't know happened | **confirmed-fixed** `19bd0d6`: now "Just checking in on your enquiry about BPC registration." |
| 2.2 | P3 | Day-7 "Last one from me" is an unconfirmed promise | **confirmed-fixed** `19bd0d6`: clause removed |
| 3.1 | P1 | Hand-set `followed_up_3` (both sent_at null) gets a day-7 email | **confirmed-fixed** `19bd0d6`: `followed_up_3` qualifies only with `followup_day3_sent_at` set; run 4 verified the `.or(…and(…))` syntax |
| 3.2 | P2 | Resend accepts, DB write fails, so the next run resends | **confirmed-fixed (partial)** `19bd0d6`: Resend `Idempotency-Key` per lead+step. Run 4: the key only lasts 24 h, and the next daily run lands at about 24 h. See 4.1 |
| 3.3 | P2 | Lead moved on mid-run still gets the email (status read at query time) | **deferred**: the window is one run's send loop (seconds). A per-lead re-read before send is also check-then-act and only narrows it. The post-send write is guarded on the status read, so the case shows up in `errors[]` instead of overwriting Adrian's status |
| 3.4 | P2 | Default 1,000-row limit, client-side email filter can hide valid rows | **rejected**: day-3 and day-7 queries cover 4- and 3-day windows of real enquiries, orders of magnitude under 1,000. The dead set only holds leads this function moved to `followed_up_7`, and it drains every run |
| 3.5 | P2 | Raw Resend error text (can include an email address) goes into `errors[]`, which pg_net stores | **confirmed-fixed** `19bd0d6`: only `status` + Resend error `name`; thrown errors log `e.name` only |
| 4.1 | P2 | Duplicate send still possible if the DB write fails and the next run is >24 h later | **deferred, Michael's call**: closing it needs a write before the send (a claim column), which requirement 4 forbids. The failure is reported as `email SENT but … not written` in `errors[]` |

Found later that Codex missed: none yet.
