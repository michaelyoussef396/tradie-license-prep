# Disposition of `.ai/CODEX_REVIEW.md`

Review of `claims-sweep-2026-09` @ `53671c8`, dispositioned 20 September 2026.
Every finding was re-verified against the repo before acting. Build passes; lint
is unchanged from baseline (14 problems, 7 errors — all pre-existing, none in
files touched here).

**Summary:** 8 findings, 11 discrete claims. **10 confirmed and fixed, 1 rejected.**
The review also corrected an inaccurate statement in my own handoff, which is
accepted and amended.

---

## Findings

### 1. Homepage still claims 500+ registrations — CONFIRMED, FIXED

`src/components/Hero.tsx:158` read "Join **500+** tradies who've gained their
registration". Correct: a third stale-count surface, and it falsified my
handoff's claim that no stale figures remained.

**Why both earlier sweeps missed it.** The first pass grepped for
`[0-9]{3,}\+ (students|tradies)`, which needs the number and noun adjacent; here
they are separated by a `</span>`. The second pass then swept `value:`/`number:`/
`highlight:` *fields*, and this is inline JSX, not a field. Neither shape
matched. A plain `500` grep would have caught it and was the obvious check.

**Fix:** now "Join the **100+** tradies Adrian has helped gain their
registration" — confirmed count, credited to Adrian. `grep -rn '500+' src index.html`
now returns nothing.

### 2. Unattributable graduate testimonial survived — CONFIRMED, FIXED

`src/components/AboutAdrian.tsx:86-89`, live on the homepage, carried a quote
attributed only to "Graduate feedback". The 13 removed quotes were all found by
searching for `quote:`/`testimonial:` **data fields**; this one is hardcoded
directly in JSX, so it was never in the inventory. Attributed to no one, it is
weaker evidence than the named quotes that were removed.

**Fix:** block removed, `Quote` import dropped. Text recorded in HANDOFF §2.8
for restoration if Adrian confirms it.

### 3. Student claims beyond the confirmed table — 3 CONFIRMED, 1 REJECTED

**3a. "What These Success Stories Have In Common" — CONFIRMED, FIXED.**
The four `successFactors` asserted, in the past tense and explicitly about the
five featured students ("Every student received individual attention", "This
deeper understanding helped them pass"), training histories that Adrian's source
does not cover. Cutting the per-student narratives left the same claims standing
in aggregate. **Fix:** reframed to present-tense description of how the program
is run, which is supported by the course inclusions; heading is now "How The
Program Works" and the intro no longer claims a shared student history. A comment
in the source records why it must stay a program description.

**3b. Outcome cards — CONFIRMED, FIXED.**
- "Students achieved Domestic Builder Unlimited, DB-L Carpentry, or **Commercial**
  licences" — no Commercial student exists in the confirmed table, and the card
  omitted Bathroom and Kitchen Limited, which does. Now lists exactly the four
  confirmed classes.
- "Students take on **bigger projects and greater responsibility**" — a
  before/after comparison the source does not support. Card removed; grid is now
  two columns.
- "Many students launched their own building companies" — **kept.** Supported for
  four of the five (Fauzi, Jordan, Sidhu, Manny).

**3c. Jordan "Launched a business" — REJECTED.**
The review states the source confirms "outdoor living work and supplier
partnerships, not a business-launch history". It does not. Adrian's confirmed
line for Jordan is, verbatim:

> "Jordan: Carpentry licence. **Launched a business** focused on high-end outdoor
> living spaces; partners with numerous suppliers delivering premium
> installations throughout Melbourne."

"Launched a business" is Adrian's own wording. No change made.

**3d. "Video Testimonials Coming Soon" — CONFIRMED, FIXED.**
`src/pages/SuccessStoriesPage.tsx:478-501` promised testimonials "currently being
filmed". No confirmation of any filming or delivery plan, and it is a forward
commitment rather than a fact. Removing every quote as unverified while promising
video versions of them is incoherent. **Fix:** section removed, `Video` import
dropped.

### 4. Unsupported registration timelines — CONFIRMED, FIXED

Three surfaces promised registration in "3-6 months" or "a few months":
`src/components/FAQ.tsx`, `src/pages/Courses.tsx`, `src/pages/FAQ.tsx`. Nothing
confirms a turnaround, and the dominant term is BPC's own processing, which
Qualify Pro does not control. One page already said so correctly
(`BuilderRegistrationCourseMelbourne`: "BPC processing time sits on top of that
and varies").

**Fix:** the outcome promise is gone from all three. Course durations — a fact
about the product — stay; processing time is now described as BPC's and varying.
No new figure invented. Also dropped "We help expedite this", which implied
influence over the regulator.

### 5. Blanket application support vs the paid carpentry add-on — CONFIRMED, FIXED

Four surfaces promised "complete application support ... in all our programs",
while for the carpentry course complete form assistance, portfolio compilation
and submission preparation are in a **separately priced $1,606 add-on**. A
carpentry customer could reasonably read the FAQ as promising the paid service
free. Predates the sweep.

**Fix:** blanket "complete" wording replaced with what the base courses actually
include, plus an explicit note that the DB-L Application Prep Package adds form
assistance, reference coordination and submission checking. Wording derives from
the `courses.ts` inclusion lists rather than restating them.

### 6. Comprehensive course shows the Unlimited minimum unlabelled — CONFIRMED, FIXED

`UNLIMITED_EXPERIENCE_SUMMARY` gave "at least 3 years ... across a minimum of 3
projects" without naming its class, while the Comprehensive course is sold for
**domestic and commercial low-rise**. Readers got an Unlimited-only figure
presented as the requirement for both. The review is careful here, and correct:
this does not show 3 years is wrong for Commercial, only that the evidence does
not reach that far.

**Fix:** the constant now reads "**For Domestic Builder (Unlimited),** at least
3 years ...". A new `COMMERCIAL_EXPERIENCE_NOTE` states that Commercial
(Low-Rise) requirements differ and will be confirmed on enquiry — no figure
invented. The Comprehensive course renders both. Commercial minimum added to
HANDOFF §2.9.

### 7. SEO page duplicates eligibility facts three times — CONFIRMED, FIXED

`BuilderRegistrationCourseMelbourne.tsx` hardcoded the minimums in the FAQPage
JSON-LD, the entry-requirements list and the visible FAQ, without importing the
module — introduced by this sweep, and in direct breach of `CLAUDE.md`'s rule
that eligibility detail is never repeated as a literal, JSON-LD included.
Correct today, stale on the next change.

**Fix:** all three derive from `src/data/eligibility.ts`.
`grep -nE "3 years|2 years|3 projects"` on that file now returns nothing.

### 8. Final CTA labels licence type required but does not enforce it — CONFIRMED, FIXED

`FinalCTA.tsx` showed "Licence Type \*" while the schema had
`licenseType: z.string().optional()` and the submit path mapped an empty value to
`null`. Contact enforces it; this form did not.

**Fix:** the asterisk is removed, so the label matches the behaviour.

**Deliberately not the other option.** The review offered either direction. I
aligned the label rather than enforcing the field because a repeated instruction
on this branch is that leads must keep submitting; adding a blocking validation
to a lead-capture form would trade leads for tidiness. Say the word and I will
invert it.

---

## Other traceability gaps — DEFERRED, recorded not removed

The review lists ~13 categories (course durations, max class size, 24-hour
response, consultation length, Adrian's credentials, BPC operational dates,
service coverage, "Most Popular", free consultation, and more) where the handoff
does not record written confirmation.

**Not actioned, deliberately.** The review is explicit that these are
"documentation/confirmation gaps, not assertions that the underlying facts are
false", and that the BPC operational details "need a regulatory source/
confirmation record, not an automatic rewrite as part of this sweep". Stripping
them would remove course durations, class sizes, Adrian's credentials and the
entire BPC exam explainer — deleting accurate content on the grounds that nobody
has yet been asked to confirm it.

`CLAUDE.md`'s "unconfirmed never goes on the site" rule governs claims this sweep
put there or was asked to check. Applied retroactively to everything predating
it, it would empty the site. The right next step is a confirmation pass with
Adrian, not deletion.

**Recorded as HANDOFF §5, "Confirmation queue"**, grouped so it can go to Adrian
as one list. Two items promoted out of it and fixed above because they were
contradicted by evidence already in hand (finding 5, the add-on) or were forward
promises rather than facts (finding 3d).

## Known HOLD items still advertised — ALREADY TRACKED, one correction accepted

Correctly identified as deliberate retentions under HANDOFF §2.

**One correction accepted.** My handoff said the 95% pass rate is "always
attributed to Qualify Pro's own student records". That is **wrong**, and the
review is right to flag it. Verified: `index.html:29`, `:37`, `:43` and
`src/pages/Index.tsx:18` publish the figure bare in metadata, and
`Hero.tsx:23`/`Footer.tsx:59` render it as an unqualified stat. HANDOFF §3 is
amended. The figure itself is untouched — it was never in this sweep's scope —
but it is now described accurately and sits in the confirmation queue.

## Tracked `.env` — ACCEPTED, no action

Inventory confirms five `VITE_*` variables, none a server-side secret; the
Supabase key is the public anon key already hardcoded in
`src/integrations/supabase/client.ts`. Remains a configuration-hygiene item, not
a credential leak. Untracking it is still worth doing and stays in HANDOFF §3.

## Review's own verification — spot-checked

Re-ran the two checks that matter most and confirm the review's results: the five
GST-inclusive totals ($8,794.50 / $6,215 / $6,215 / $4,169 / $1,606) and all four
`getUnderMinimumNote()` branches. The review's note that it did not re-run lint is
fair; lint was re-run here and is at baseline.
