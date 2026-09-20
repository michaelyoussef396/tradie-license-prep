# Claims sweep review

Reviewed `main` (`f7a983e`) against `claims-sweep-2026-09` (`53671c8`) on 20 September 2026. `main` is the merge base. Read `.ai/HANDOFF.md` and `CLAUDE.md:66–74` before reviewing. All source line numbers below refer to the reviewed branch.

The sweep is incomplete: the homepage still advertises **500+ registered tradies**, an unverified graduate quotation remains, and unsupported student narratives survive outside the deleted case-study cards. The corrected GST totals and class-specific enquiry notes pass the checks described below.

This review covers the diff and remaining claims on current site, portal, admin and email surfaces. **Retained** means the issue already existed on `main`; it is included because the request explicitly asks for remaining claims and broken form branches. **Traceability gap** means the supplied handoff does not establish the claim, not that the claim has independently been proved false. The underlying correspondence from Adrian was not supplied. P2 means a substantive correction/confirmation is needed; P3 means a lower-priority consistency or maintenance issue. No application code was edited.

## Findings

### 1. [P2, retained omission] The live homepage still claims 500+ successful registrations

**Evidence:** `src/components/Hero.tsx:158` says `500+` tradies have gained their registration. `src/pages/Index.tsx:21` renders that hero.

The supported count is 100+, credited to Adrian personally (`.ai/HANDOFF.md:16–28`). This is a third remaining count surface beyond the two statistics identified in the handoff, and directly contradicts its statement at `:28` that no stale figures remain. Replace or remove this claim using the confirmed count and attribution; searching only stat fields missed this inline JSX number.

### 2. [P2, retained omission] An unattributed graduate testimonial survived the quote removal

**Evidence:** `src/components/AboutAdrian.tsx:87` contains the quotation beginning “Patient and understandable”; `:89` attributes it only to “Graduate feedback.” The component is live on the homepage (`src/pages/Index.tsx:25`).

Neither the quotation nor its speaker appears in the handoff's confirmed facts or removed-quote inventory. This fails `CLAUDE.md:68–72` even though the 13 named-student quotations were removed. Obtain an attributable, written confirmation or move it to HOLD and omit the rendered quote.

### 3. [P2, retained/partly edited] Student claims extend beyond the confirmed fact table

**Evidence:** `src/pages/SuccessStoriesPage.tsx:96`, `:101`, `:106` and `:111` still assert that every featured student attended classes of at most 10, received an individual assessment, gained confidence and learned principles that helped them pass and become better builders. The heading and introduction at `:340–344` expressly apply these assertions to these success stories. The sweep edits `:111` only to remove the word “interviews.”

The confirmed table (`.ai/HANDOFF.md:109–115`) supplies licences, elapsed years and business outcomes, not those training histories. The handoff itself says the deleted narratives were invented (`:117`). Removing the individual cards did not remove equivalent claims from the summary section.

Additional unsupported student assertions:

| Evidence | Remaining assertion | Missing support |
| --- | --- | --- |
| `src/pages/SuccessStoriesPage.tsx:231` | Students achieved Commercial licences. | No Commercial licence outcome appears in the confirmed student table. |
| `src/pages/SuccessStoriesPage.tsx:233` | Students take on bigger projects and greater responsibility. | The table gives current outcomes, not a before/after comparison of project size or responsibility. |
| `src/pages/SuccessStoriesPage.tsx:49`; `src/components/SuccessStories.tsx:26` | Jordan “Launched a business.” | HANDOFF `:112` confirms outdoor living work and supplier partnerships, not a business-launch history. This is a strict fact-list traceability gap in otherwise corrected copy. |
| `src/pages/SuccessStoriesPage.tsx:494–495` | Student video testimonials are currently being filmed and coming soon. | No confirmation of filming or delivery plans is recorded. |

Keep only the recorded facts unless Adrian confirms these additions. The generic training sentence at `SuccessStoriesPage.tsx:90` is **not** a finding: HANDOFF `:107` explicitly endorses it. The corrected licence/timeframe/outcome fields for the other students match the table.

### 4. [P2, retained in edited answers] Registration timelines remain unsupported

**Evidence:** `src/components/FAQ.tsx:17` says most students gain their licence within 3–6 months of starting; `src/pages/Courses.tsx:143` says the complete process typically takes 3–6 months and that application preparation expedites it; `src/pages/FAQ.tsx:58` says most gain registration within a few months after finishing.

HANDOFF supplies neither an approved registration turnaround nor supporting student statistics. Replacing “interview” with “exam” retained the original unsupported outcome promise. Confirm the timeline and its starting point or omit it; course length alone does not establish regulator processing time.

### 5. [P2, retained] Blanket application-support claims obscure the paid carpentry add-on

**Evidence:** `src/components/FAQ.tsx:27`, `src/pages/FAQ.tsx:99`, and `src/pages/Courses.tsx:151` and `:216` promise complete application/portfolio preparation in all programs. However, the carpentry base inclusions offer application guidance and portfolio support (`src/data/courses.ts:153–155`), while complete form assistance, portfolio compilation and submission preparation appear in its separately priced add-on (`:159–168`).

The confirmed add-on price is in HANDOFF `:91`, but the handoff does not establish that its full service is included in the base course. Clarify the included-versus-add-on scope; a carpentry customer can currently reasonably read the general FAQ as promising the paid service for no additional charge. This contradiction predates the sweep.

### 6. [P2, scope ambiguity documented in HANDOFF] The comprehensive course presents the Unlimited minimum without naming its class

**Evidence:** `src/pages/Courses.tsx:69` labels the course “Domestic & Commercial”; `src/data/courses.ts:78` explicitly targets both domestic and commercial low-rise registration. Its displayed entry requirement at `src/pages/Courses.tsx:81` uses `UNLIMITED_EXPERIENCE_SUMMARY`, whose text at `src/data/eligibility.ts:14` gives three years/three projects without naming Domestic Builder (Unlimited).

HANDOFF `:36–40` confirms that minimum specifically for Domestic Builder (Unlimited), not Commercial. HANDOFF `:43` explicitly records this implementation choice, so this is a disclosed scope ambiguity rather than an undisclosed numerical regression. Label the requirement with its class and obtain the commercial requirement separately. The supplied evidence does **not** establish that three years is numerically wrong for Commercial; it establishes that the evidence is insufficiently scoped for this combined course.

No other currently rendered experience-number mismatch was found: the DB-L requirement is two years, and Evening, Private and class-neutral FAQs state both domestic minimums.

### 7. [P3, introduced] The SEO course page duplicates the new eligibility facts three times

**Evidence:** `src/pages/BuilderRegistrationCourseMelbourne.tsx:57` hardcodes the minimums in FAQPage JSON-LD; `:300–305` duplicates them in the entry list; `:332–336` duplicates them in the visible FAQ. The page does not import the eligibility module.

The values are correct today, but HANDOFF `:34` says all eligibility content derives from `src/data/eligibility.ts`, and `CLAUDE.md:64` explicitly requires this, including JSON-LD. A future source-module correction will leave all three copies stale. Derive the visible and structured-data wording from the shared facts.

### 8. [P3, pre-existing form issue] The final enquiry form accepts an empty required-labelled licence

**Evidence:** `src/components/FinalCTA.tsx:294` displays “Licence Type *”, but its Select at `:296` lacks `required`, the schema at `:24` permits an empty string, and submission at `:63` converts that empty selection to `null`.

Reproduction: fill a valid name, phone and email, leave licence type unselected, and submit. The isolated current schema accepts this payload; the submit path does not add another licence check. Align the label with optional behavior or enforce the required selection. This is unchanged from `main`, not caused by the referral-hint edit. Contact correctly requires both licence and experience (`src/pages/Contact.tsx:64–65`, `:338`, `:361`).

## Other traceability gaps

These are existing concrete claims for which the handoff does not record affirmative written confirmation. Some are centralized in `src/data/courses.ts`; that prevents copy drift but does not itself provide the missing written evidence. They should be added to the confirmation record or HOLD. These are documentation/confirmation gaps, not assertions that the underlying facts are false.

| Claim | Current file:line evidence |
| --- | --- |
| Course durations of 13, 7, 9 and 6 weeks; private coaching for three hours a week; eight months of platform access | `src/data/courses.ts:74`, `:98`, `:121–123`, `:129`, `:143`; access at `:90`, `:134`. HANDOFF does not confirm those durations/access periods. |
| Maximum 10 students | `src/data/courses.ts:87`, `:107`, `:156`; also `src/components/Hero.tsx:25`, `src/components/TrustBar.tsx:18`, `src/components/WhyChooseAdrian.tsx:9`, `src/pages/About.tsx:60`, `src/pages/FAQ.tsx:63`, `supabase/functions/send-lead-emails/index.ts:117`, `src/pages/EmailTemplates.tsx:150`. |
| Response/callback within 24 hours | `src/pages/Contact.tsx:122`, `:269`, `:423`, `:477`, `:630`; `src/components/FinalCTA.tsx:93`, `:121`, `:235`; `src/pages/ThankYou.tsx:22`, `:55`; `src/pages/BuildersLicenceMelbourne.tsx:260`; `supabase/functions/send-lead-emails/index.ts:113`; `src/pages/EmailTemplates.tsx:147`, `:158`. |
| Consultation takes 15–20 minutes; eligibility check takes two minutes | `src/pages/Contact.tsx:193`; `src/pages/BuilderRegistrationCourseMelbourne.tsx:160`, `:232`, `:361`; `src/pages/BpcExamChanges.tsx:54`. |
| Competitors have 100–400+ reviews | `src/pages/EmailTemplates.tsx:235`. This page is publicly routed at `src/App.tsx:65`; it is not an admin-only document. |
| Adrian's Unlimited/commercial low-rise registration and carpentry qualification; no domestic project-value limit; commercial scope up to three storeys | `src/components/AboutAdrian.tsx:8–10`; `src/pages/About.tsx:30–41`; `src/pages/FAQ.tsx:42`. HANDOFF confirms the training start year, but does not supply evidence for these credential/scope statements. |
| 10+ years of industry experience | `src/components/Hero.tsx:24`; `src/components/TrustBar.tsx:13`. HANDOFF §1(d) expressly says industry-experience copy was left alone, so this is a retained confirmation gap, not a missed conversion of training history. |
| Extra enrolment qualifications/preferences beyond the experience minimums | `src/pages/Courses.tsx:81` (trade qualification preferred/references), `:99` (currently working preferred), `:117` (initial assessment), `:134` (trade certificate required), `:147` (active/recent construction work). HANDOFF's class minimums do not establish these extra criteria. |
| Trade qualifications, same-or-higher-class references and portfolio as general regulatory requirements | `src/components/FAQ.tsx:22`, `:32`; `src/pages/FAQ.tsx:94`, `:104`; `src/pages/BuilderRegistrationCourseMelbourne.tsx:57`, `:308–310`, `:335–336`. These requirements need their own scoped confirmation. |
| Evening course is “Most Popular” | `src/components/CourseCards.tsx:21`; `src/pages/Courses.tsx:87`; `src/pages/FAQ.tsx:73`. No enrolment comparison is recorded. |
| Coverage of waterproofing, bricklaying, cabinetry, external fixtures and other listed classes | `src/components/TradeAreas.tsx:28–34`; `src/pages/FAQ.tsx:130`. HANDOFF does not inventory these additional service offerings. |
| Post-registration support across all programs, insurance guidance and unlimited private-course email support | `src/pages/Courses.tsx:177`; `src/pages/BuilderRegistrationCourseMelbourne.tsx:79–80`; `src/data/courses.ts:137`. The handoff does not confirm the scope/duration of these services. |
| Free consultation with no obligation | `src/pages/Contact.tsx:197`; `src/pages/FAQ.tsx:146`. This service/price commitment is not expressly confirmed in the fact list. |
| Detailed BPC dates, counts and exam procedures | `src/pages/BpcExamChanges.tsx:119` (July 2025 merger), `:125` (January 2026 rollout), `:133`, `:137` (40/7 documents), `:151–152` (June 2026 online availability), `:172–175` (August in-person notice), `:203` (24/7), `:229` (up to three days onboarding), `:279` (three-business-day adjustment deadline), plus provider/reference/subscription/rules at `:145`, `:194–216`, `:235–260`, `:285–291`. HANDOFF expressly preserves the historical interview explanation; it does not enumerate confirmation of these operational details. They need a regulatory source/confirmation record, not an automatic rewrite as part of this sweep. |

## Known HOLD items still advertised

These were deliberately retained under HANDOFF, rather than newly introduced by the diff. Listing them is required by the present request to identify unconfirmed public claims. Their presence remains in tension with `CLAUDE.md:68`, which says unconfirmed claims belong in HOLD, never on the site.

| HOLD item | Current evidence and qualification |
| --- | --- |
| **95% pass rate** — HANDOFF `:234` explicitly calls it unverified | `src/components/Hero.tsx:23`, `src/components/TrustBar.tsx:8`, `src/components/SuccessStories.tsx:82`, `src/components/Footer.tsx:52`, `src/components/FinalCTA.tsx:122`, `src/pages/About.tsx:46`, `:92`, `src/pages/Contact.tsx:708`, `src/pages/Courses.tsx:159`, `src/pages/FAQ.tsx:37`, `src/pages/BuildersLicenceMelbourne.tsx:18`, `src/pages/SuccessStoriesPage.tsx:170`, `:180`, `:187`, `:224`, `:380`. **“Always attributed” is also inaccurate:** `index.html:29`, `:37`, `:43` and `src/pages/Index.tsx:18` publish the percentage in standalone metadata without the student-record attribution. |
| **Free resit / until registered** — HANDOFF §2.1 | `src/components/WhyChooseAdrian.tsx:39`; `src/data/courses.ts:86`, `:111`; `src/pages/Courses.tsx:163`, `:172`, `:216`; `src/pages/FAQ.tsx:68`, `:125`; `src/pages/Contact.tsx:711`. General “all programs” promises extend beyond the two source courses that explicitly list the resit. |
| **Class/contact hours** — HANDOFF §2.2 | `src/components/Footer.tsx:157`; `src/data/courses.ts:99–100`, `:106`; `src/pages/Contact.tsx:500`, `:512`; `src/pages/Courses.tsx:98`; `src/pages/FAQ.tsx:73`. |
| **Evening/private price parity** — HANDOFF §2.3 | Pending-sign-off comments remain at `src/data/courses.ts:95–96` and `:118–119`; prices at `:103` and `:126`. Arithmetic matches the instructed amounts; the equality itself is still awaiting confirmation. |
| **Payment plans** — HANDOFF §2.4 | `src/components/CourseCards.tsx:183`; `src/pages/Courses.tsx:167`, `:586–589`; `src/pages/FAQ.tsx:78`, `:141`; `src/pages/BuildersLicenceMelbourne.tsx:292`; `src/pages/BuilderRegistrationCourseMelbourne.tsx:351`. |

The held DB-L course-specific experience bar and Evening course class scope have not been invented: current copy gives the regulatory minimums without claiming a new confirmed course threshold.

## Requested sweeps and structural checks

- **Interview / hundreds:** No remaining offer of interview preparation or “hundreds” claim found in current application/email text. Remaining interview references in `src/pages/BpcExamChanges.tsx:30`, `:38`, `:83`, `:105–111`, `:131–139`, `:333`, `:355`, `src/components/HomeResourceLinks.tsx:10`, and `src/pages/ThankYou.tsx:84` explain the historical replacement. HANDOFF §1(c) explicitly preserves them. Historical examples inside HANDOFF are not live marketing claims.
- **500+:** The live miss is finding 1. The corrected About and Success Stories stat fields use 100+.
- **Pre-GST prices:** All five executed inclusive totals match HANDOFF: comprehensive $8,794.50; evening $6,215; private $6,215; carpentry $4,169; add-on $1,606. `src/components/CourseCards.tsx:33–34`, `:133–135`, `src/pages/Courses.tsx:48–56`, `:281–282`, `:326–327`, `:442–443`, and `src/pages/BuilderRegistrationCourseMelbourne.tsx:215–220` use the inclusive headline and permitted smaller ex-GST note. No stale ex-GST headline or ex-GST figure labelled inclusive was found. No JSON-LD price/offer is present, as deliberately recorded in HANDOFF §1(i).
- **Referral discount figures:** None remains on the application, portal, admin or email surfaces reviewed. Contact `:395`, FinalCTA `:322`, PipelineTab `:149`, `:177`, NewLeadsTab `:143–144`, and `send-lead-emails/index.ts:35`, `:39` omit the amount. `StudentDashboard.tsx:25`, `:93`, `:168` and `send-student-welcome/index.ts:76` retain the approved **$300 referrer reward**, which is distinct from the mate's discount. HANDOFF `:180`, `:194` still mentions the proposed 15% and old $100 discount as internal historical/HOLD documentation; those numbers are not displayed by the product.
- **Eligibility branches:** Executed `getUnderMinimumNote()` for Unlimited, carpentry, Commercial, Other and unset. Unlimited gives three years under a registered practitioner/three projects; carpentry gives two years; other/unset gives both explicitly named domestic classes. Contact uses matching shared option keys (`src/pages/Contact.tsx:344–376`). Hero collects trade, not licence class, and correctly uses the neutral note (`src/components/HeroEnquiryForm.tsx:194–195`). “Under 3” includes some eligible DB-L applicants, but the note states the two-year minimum and does not reject anyone. No new submission-blocking branch was found.
- **Removed sections:** About's testimonial section and Courses' per-course testimonial wrappers were removed completely; no empty testimonial heading remains. Course jump links at `src/pages/Courses.tsx:231` still target sections at `:303`. No removed ID/anchor left a dangling reference in the reviewed diff. Homepage contact and course-page eligibility targets remain present.
- **Optional student fields/layout:** Manny's omitted licence and Jordan's omitted timeframe are guarded at `src/components/SuccessStories.tsx:117`, `:141–145` and `src/pages/SuccessStoriesPage.tsx:279–285`, including separators. CourseCards' positional inclusion lookups still point to populated entries. SuccessStoriesPage `:184–189` has three stats in a four-column desktop grid, but that exact sparse-grid structure already exists on `main`; it is not a removal regression. No confirmed structural layout regression was found. Browser/mobile visual rendering was not exercised.

## Tracked `.env` inventory — names only

`git ls-files .env` confirms that `.env` is tracked. It is not ignored by `.gitignore`. Values were not printed or included in this report. Credential-type inspection was performed without emitting the credential.

| Location | Variable name | Server-side secret? |
| --- | --- | --- |
| `.env:1` | `VITE_SUPABASE_PROJECT_ID` | No — public project identifier. |
| `.env:2` | `VITE_SUPABASE_PUBLISHABLE_KEY` | No — the stored credential is an anonymous/public client key, not a service-role/server credential. |
| `.env:3` | `VITE_SUPABASE_URL` | No — public client endpoint. |
| `.env:4` | `VITE_GA4_MEASUREMENT_ID` | No — public analytics measurement identifier. |
| `.env:5` | `VITE_CLARITY_PROJECT_ID` | No — public analytics project identifier. |

**None of these five entries is a server-side secret.** Tracking this file is the pre-existing configuration-hygiene issue already noted in HANDOFF `:237`; the inventory does not establish a leaked privileged credential.

## Verification and limits

- Read all 25 changed files and inspected relevant unchanged public, admin and email consumers; compared retained issues with `main`.
- Production Vite build passed: `./node_modules/.bin/vite build --outDir /private/tmp/qualifypro-claims-review-build`. Invoked Vite directly to avoid the `prebuild` hook rewriting tracked `public/sitemap.xml`. Only the existing Browserslist-data warning was emitted alongside the outside-project output-directory notice.
- Executed the pricing and eligibility modules and isolated FinalCTA schema without submitting leads, sending email or calling production services.
- Lint was not rerun; HANDOFF records baseline lint failures. No claim is made here that those failures were independently revalidated.
- Static structure/anchor review was completed; no browser screenshot, visual-regression test or independent regulatory fact-check was performed. References above identify confirmation gaps against the supplied fact record, not a legal assessment of current BPC requirements.
- The only repository file written by this review is `.ai/CODEX_REVIEW.md`.

---

## Follow-up: commits after `405d096`

Reviewed on 20 September 2026, through **`c888b00`**:

- `a4fae2a` — Gate EmailTemplates behind admin auth and hold the 95% pass rate.
- `c888b00` — Move EmailTemplates under /admin so analytics and crawlers skip it.

This appendix reviews `405d096..c888b00`; it does not treat the earlier findings above as current findings without rechecking them. The second commit arrived during review and is included in the final result. All unqualified file:line references in this appendix refer to `c888b00`. Read the current HANDOFF and `CLAUDE.md:66–74` first. HOLD items and the confirmation queue are **not** written confirmation.

**Result:** Both current admin routes use `RequireAdmin`, and the old email-templates URL redirects. However, the extraction does **not** preserve all previous behavior: routine auth refreshes now unmount the dashboard. The rewritten public copy also contains unconfirmed readiness and training-model promises.

### F1. [P2] Auth refresh now discards the dashboard's current state

**Evidence:** `src/components/RequireAdmin.tsx:47–49` calls `setIsAllowed(false)` on every auth event. The loading return at `:58–66` removes the protected child while the asynchronous admin-role query runs. When allowed again, `AdminDashboard` mounts afresh with `activeTab = "leads"` (`src/pages/AdminDashboard.tsx:21`). Local drafts such as pipeline notes (`src/components/admin/PipelineTab.tsx:55–58`) and the add-student form (`src/components/admin/StudentsTab.tsx:30–32`) are lost.

At **`405d096:src/pages/AdminDashboard.tsx:50–57`**, the auth listener rechecked the role without resetting `loading`, so a valid administrator's dashboard remained mounted. A normal `TOKEN_REFRESHED` event is sufficient to trigger the new behavior; the installed Supabase client emits that event (`node_modules/@supabase/auth-js/src/GoTrueClient.ts:5065`). An isolated harness using the actual before/after source and delayed role-query responses reproduced the difference: old dashboard stays visible; new guard switches to Loading until the query resolves.

Preserve mounted content during valid same-user revalidation while still rejecting missing or unauthorized sessions. The role predicate itself is unchanged; the regression is the component lifecycle and resulting loss of work.

### F2. [P2] The replacement success-rate answers promise readiness without confirmation

**Evidence:** `src/pages/Courses.tsx:160` now promises to “make sure you're genuinely ready before you attempt your registration”; `src/pages/FAQ.tsx:37` makes the same promise for BPC registration. The Courses answer also asserts personalized, thorough preparation.

HANDOFF `:71` confirms the reference-based exam preparation, and `:109` endorses a generic preparation sentence. Neither confirms a readiness assessment, its criteria, or the promise that every applicant will be ready before attempting registration. Removing an unverified percentage does not substantiate this replacement assurance. Limit the answer to the recorded preparation facts or obtain written confirmation of the specific service being promised. The unchanged “What's your success rate?” questions also no longer receive a success-rate answer.

### F3. [P2] The new program description invents a universal student profile and no-fixed-syllabus policy

**Evidence:** `src/pages/SuccessStoriesPage.tsx:376–378` says every student has a different background and different gaps, and that training is built around those gaps “rather than a fixed syllabus.”

The student fact list (`.ai/HANDOFF.md:111–117`) establishes licences, elapsed years and current business outcomes. It does not establish each student's learning gaps/background or a syllabus policy for all programs. The approved generic training line (`:109`) and the separately tailored Private course do not establish this universal claim. Record confirmation or remove the unsupported detail. Changing the paragraph from past to present tense has not supplied evidence for it; the subjective statement about the provider's beliefs is not itself the issue.

### F4. [P2, traceability gap] Rewritten promotional sentences still lack a recorded basis for delivery claims

**Evidence:** `index.html:29`, `:37` and `src/pages/Index.tsx:18` now use “Small classes, training builders since 2017.” `index.html:43` adds “Small classes, in person in Melbourne.” `src/components/Footer.tsx:52` now ends “Small classes, personalised teaching.”

The **2017** fact is expressly confirmed in HANDOFF §1(d), `:77–79`. The handoff's confirmed facts do not establish the class-size/delivery/personalization promises; the numeric class cap is expressly awaiting confirmation in §5, item 3. These qualitative statements may be true and some wording is retained from the prior sentences, but they cannot receive a fully confirmed verdict against the requested fact list. Obtain and record the delivery confirmation; do not treat the existing course literals or the confirmation queue as independent written evidence.

### F5. [P2] The new analytics-suppression claim overlooks the initial HTML trackers

**Evidence:** `.ai/HANDOFF.md:288–294` says analytics is now resolved and the legacy redirect's brief render is not tracked. `CLAUDE.md:58` now says everything is suppressed on internal routes and identifies `isInternalRoute()` as the single guard. The React guards exist at `src/components/AnalyticsProvider.tsx:17`, `:25`, and `src/lib/analytics.ts:19–22`, but **`index.html:5–24` loads/configures Google tracking and schedules Clarity unconditionally**, without checking the pathname.

A direct visit to `/admin/email-templates` still receives that HTML via `vercel.json:6`, before React or `RequireAdmin` runs. The host redirect protects the old production URL from rendering its own page; it does not suppress tracking at the destination. The legacy URL served by the development SPA also runs the unguarded HTML before its client redirect.

An isolated execution of the actual inline scripts with mocked `window`/`document` at all three paths (`/admin/dashboard`, `/admin/email-templates`, `/email-templates`) queued two analytics configurations and a tracker-script insertion every time. No tracker was downloaded and no event was actually sent by the review. The unconditional HTML was pre-existing, but the new “now resolved”/“everything” assertions and route-migration rationale are not supported by the implementation. Apply equivalent suppression at the HTML layer or narrow the documented guarantee.

### F6. [P3] The rewritten outcomes section points in the wrong direction and retains an orphaned badge

**Evidence:** `src/pages/SuccessStoriesPage.tsx:224` refers to students “featured above”, but the named case-study sections start at `:256`, below this summary. The new “After Registration” heading (`:221`) also retains the giant standalone “High” badge at `:218`, formerly associated with “Our Pass Rate”.

Correct the directional wording and remove or substantiate the orphaned badge. This is a consequence of the rewrite, not a new confirmed performance claim. The old student-record footnote also remains at `:202`, below the remaining 100+/2017 facts, although the pass-rate stat it previously qualified has been removed.

### Sentence and label coverage

Every added/rewritten public-copy sentence or label in the reviewed commits is covered below. Unchanged sentences preceding a modified sentence in the same string literal are not newly introduced claims; their earlier confirmation gaps remain recorded in the original review/HANDOFF queue.

| Current evidence | New/rewritten content | Verdict against HANDOFF |
| --- | --- | --- |
| `index.html:29`, `:37`; `src/pages/Index.tsx:18` | Small classes; training builders since 2017. | 2017 supported by §1(d); delivery claim lacks recorded confirmation — F4. |
| `index.html:43` | Small classes, in person in Melbourne. | Delivery claims lack recorded confirmation — F4. |
| `src/components/Footer.tsx:52` | Small classes, personalised teaching. | Lacks recorded confirmation — F4. The preceding professional-mentorship sentence is unchanged. |
| `src/components/SuccessStories.tsx:82` | What students achieved after registration. | Supported as an introduction to the recorded student outcomes, HANDOFF `:109–117`; adds no individual number or licence. |
| `src/pages/About.tsx:46` | Helping Melbourne tradies achieve registration since 2017. | Supported by HANDOFF §1(a) and §1(d), in the Adrian credential-card context. |
| `src/pages/Courses.tsx:160` | Personalized/thorough preparation and assurance of readiness. | Unsupported service assurance — F2. |
| `src/pages/FAQ.tsx:37` | Thorough preparation and assurance of readiness. | Unsupported service assurance — F2. |
| `src/pages/SuccessStoriesPage.tsx:171` | Real Student Outcomes. | Supported as a label for the confirmed case studies, HANDOFF `:111–117`. |
| `src/pages/SuccessStoriesPage.tsx:181` | Registered tradies; BPC formerly VBA; where they are now. | Supported by HANDOFF `:73`, `:109–117`; no new individual class/date/outcome. |
| `src/pages/SuccessStoriesPage.tsx:221` | After Registration. | Supported as an outcomes-section label; orphaned adjacent badge noted in F6. |
| `src/pages/SuccessStoriesPage.tsx:224` | What featured students did after licensing. | Recorded outcomes support the introduction; “above” is incorrect — F6. |
| `src/pages/SuccessStoriesPage.tsx:376–378` | Every student has different backgrounds/gaps; training rather than a fixed syllabus. | Unsupported universal student/program detail — F3. |
| `src/pages/EmailTemplates.tsx:235` | “Reviews are what get you found on Google Maps. Ask every student who finishes.” | The causal Google Maps assertion is **not confirmed by HANDOFF**. It is now internal admin advice, not publicly rendered marketing. The second sentence is an instruction, not a factual claim or customer promise. Gating it does not establish its accuracy. |

Other public-file changes remove text/icons/stats or change layout without adding a sentence. No new numeric claim beyond the confirmed 2017 was introduced. The literal 95% marketing claim is removed; the remaining `95%` match in `src/index.css:23` is a color token. Existing qualitative “consistently high pass rate” copy remains at `supabase/functions/send-lead-emails/index.ts:120` and `src/pages/EmailTemplates.tsx:151`; it was not rewritten in these commits and is not new confirmation of a rate.

The new HANDOFF entries documenting the held percentage are historical records, not public testimonials or written confirmation. The route/guard documentation is checked below; its analytics assertions are addressed in F5. The confirmation queue's still-present entries for the removed percentage and competitor-review number are stale inventory, not authority to republish either claim.

### Admin routes, old URL and extraction parity

**Both current routes are protected by the same component:** `src/App.tsx:68` wraps `/admin/dashboard` in `RequireAdmin`; `:69` wraps `/admin/email-templates` in `RequireAdmin`. The dashboard's old inline guard is removed rather than left as a second check.

**The old URL redirects:** `src/App.tsx:66` uses `<Navigate to="/admin/email-templates" replace />`; `vercel.json:3` additionally configures that redirect with `permanent: false`. The old route renders the redirect, not EmailTemplates. The destination then applies `RequireAdmin`. This redirect was absent in `a4fae2a` and is present in final reviewed commit `c888b00`; it is not an outstanding missing-redirect finding. These are source/configuration checks, not a claim that a deployed production response was fetched.

| Branch | Before extraction at `405d096` | Current `RequireAdmin` / result |
| --- | --- | --- |
| Initial authorization pending | Loading screen; protected content not shown (`AdminDashboard.tsx:22`, `:66–73`). | Same loading markup and blocked content (`RequireAdmin.tsx:14`, `:58–63`). |
| No session | Navigate to `/admin`, no role lookup (`AdminDashboard.tsx:40`). | Same (`RequireAdmin.tsx:31–34`). |
| Valid administrator | Query `user_roles` by user ID and `role = admin`, allow only non-error data (`AdminDashboard.tsx:28–36`, `:41–47`). | Same predicate and allow decision (`RequireAdmin.tsx:20–27`, `:35–42`). |
| Non-admin or role-query error | Sign out, then navigate `/admin` (`AdminDashboard.tsx:42–45`). | Same (`RequireAdmin.tsx:37–40`). |
| Signed-out auth event | Navigate `/admin` (`AdminDashboard.tsx:51`). | Same destination via `check(null)` (`RequireAdmin.tsx:31–34`, `:47–49`). |
| Valid administrator's token refresh | Recheck role while keeping dashboard mounted (`AdminDashboard.tsx:50–57`). | **Regression:** render Loading and remount protected child — F1. |
| Dashboard Logout button | `signOut()` followed by navigation (`AdminDashboard.tsx:61–64`). | Same (`src/pages/AdminDashboard.tsx:26–29`). |
| Unmount cleanup | Unsubscribe from auth events (`AdminDashboard.tsx:58`). | Unsubscribe plus `isActive` protection for late role responses (`RequireAdmin.tsx:36`, `:52–54`). |

The shared component gives the two current routes the same authorization decisions, but the token-refresh regression prevents confirming full behavioral parity with the old dashboard. EmailTemplates was publicly accessible before the extraction; its newly required admin access is intentional, not parity with its previous public access. Database RLS remains the data boundary, as the guard's comment states.

### Follow-up validation and limits

- Reviewed the complete diff of both commits and all changed public text against the confirmed HANDOFF facts, excluding held/queued claims as evidence.
- Executed an isolated hook/state harness using the actual `405d096` dashboard and current guard. Checked admin, absent-session, non-admin, role-error, signed-out-event and delayed token-refresh cases. No production auth/database requests were made.
- Executed source assertions for both protected routes, the client redirect with `replace`, and the matching temporary Vercel redirect. No deployment was performed.
- Executed the initial HTML's inline scripts against mocked browser objects to check the suppression claim; no external scripts or tracking requests were sent.
- Production Vite build passed for the final source: `./node_modules/.bin/vite build --outDir /private/tmp/qualifypro-post405-review-build`. Warnings: stale Browserslist data, output outside the project, and a chunk over 500 kB. The sitemap-writing `prebuild` hook was not run.
- No browser/production end-to-end test or external regulatory/Google Maps fact-check was performed. Unsupported-copy findings mean the required confirmation is absent from the supplied record, not that every such claim is independently proved false.
- Only this review appendix was written in the repository. No application code was edited.

---

# Follow-up review — commits after `405d096`

Reviewed `a4fae2a` and `c888b00` on `claims-sweep-2026-09`, 21 September 2026. Scope: every new or
rewritten sentence checked against the fact list in `.ai/HANDOFF.md` and the Public claims section
of `CLAUDE.md`; plus behavioural equivalence of the `RequireAdmin` extraction and the
`/email-templates` redirect. No code edited.

These two commits were authored by the same assistant writing this review. Findings are weighted
accordingly — the guard extraction and the copy rewrites were re-derived from the code and from
`405d096`, not from the commit messages.

**Result: 3 confirmed defects (P2), 6 lower-priority issues (P3), routes and redirect verified
correct.** The guard extraction is **not** behaviourally equivalent to the inline version it
replaced.

## P2 findings

### 9. Two FAQ entries ask for a success rate their answers no longer give

**Evidence:** `src/pages/Courses.tsx:159` asks "What's your success rate?" and `:160` answers "We
use a personalized teaching approach, prepare you thoroughly, and make sure you're genuinely ready
before you attempt your registration." `src/pages/FAQ.tsx:35` asks "What's the success rate?" and
`:37` answers "We prepare you thoroughly and make sure you're genuinely ready…".

Holding the 95% figure (HANDOFF §2.12) was correct, but the questions were left in place. A
visitor who clicks a question titled "What's the success rate?" now gets method copy and no rate,
which reads as evasion rather than as a figure that is pending confirmation. The rewrite removed
the claim and left the promise of one.

Either remove both Q&A pairs while the figure is held, or reword the questions to what the answers
now address. This is a consequence of the removal, not a pre-existing issue.

### 10. "The students featured above" points at a section with no students in it

**Evidence:** `src/pages/SuccessStoriesPage.tsx:224` reads "Here's what the students featured above
went on to do after they got licensed:". That section spans `:207–254`. The case studies render at
`:255` (`caseStudies.map`), i.e. **below** it. Above it is only the hero (`:149–206`).

The sentence replaced "Students who complete our programs achieve a 95% pass rate… Here's what
happens after they get licensed:", which made no positional claim. The rewrite introduced one and
got the direction wrong. "below" is the accurate word, or drop the positional reference.

Related housekeeping: the JSX comment at `:207` still reads `{/* Success Rate Section */}` although
the section no longer mentions a success rate.

### 11. `RequireAdmin` is not behaviourally equivalent to the guard it replaced

This was the specific thing the review was asked to confirm, and it does not hold.

**Evidence:** the original handler at `405d096:src/pages/AdminDashboard.tsx:49–56` never touches
`loading` — on an auth event it re-verifies and navigates away only if the session is invalid. The
replacement at `src/components/RequireAdmin.tsx:46–49` calls `setIsAllowed(false)` **on every
event**, before re-checking:

```js
const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
  setIsAllowed(false);
  check(session);
});
```

`isAllowed === false` renders the loading screen instead of `children` (`:58–65`), so the gated
page **unmounts**.

**Consequence.** `src/integrations/supabase/client.ts:15` sets `autoRefreshToken: true`, so
`TOKEN_REFRESHED` fires on the normal refresh cycle. Each time, `AdminDashboard` unmounts and
remounts: `activeTab` resets from whatever tab the admin was using back to `"leads"`, `sidebarOpen`
resets, and all four tabs refetch. An admin working through the Pipeline is returned to New Leads
mid-task. The previous implementation stayed mounted and re-verified in the background.

**Repro:** sign in as admin, open `/admin/dashboard`, switch to Pipeline, and wait for a token
refresh (or call `supabase.auth.refreshSession()` from the console). The tab resets to New Leads.

To restore the previous behaviour, re-verify without clearing `isAllowed`, and clear it only when
the check actually fails.

## P3 findings

### 12. Duplicate role query and a loading flash on every mount

`supabase-js` v2 emits `INITIAL_SESSION` shortly after `onAuthStateChange` subscribes. Combined
with the explicit `getSession()` call at `RequireAdmin.tsx:44`, each mount runs: `getSession()` →
check → `setIsAllowed(true)`; then `INITIAL_SESSION` → `setIsAllowed(false)` → check →
`setIsAllowed(true)`. That is two `user_roles` queries per mount and a visible flash back to the
loading screen. The original ran one query on mount.

### 13. An unmounted guard can still redirect

`RequireAdmin.tsx:31` calls `navigate("/admin")` on the no-session path *before* the `isActive`
check at `:34`. If the component unmounts while `getSession()` is in flight and resolves without a
session, the redirect still fires and can move a user who has already navigated elsewhere. The
`isActive` guard covers the role-lookup path but not this one.

### 14. No return-to after login, so the moved bookmark lands on the wrong page

`src/pages/AdminLogin.tsx:27` always navigates to `/admin/dashboard`. Anyone opening a saved
`/email-templates` link now redirects to `/admin/email-templates`, is sent to the login screen by
the guard, and after signing in arrives at the dashboard rather than the templates page. Before
`a4fae2a` the URL was public and went straight there. Minor, but it is a regression for the one
person who uses the page.

### 15. A new unverified claim was introduced into site metadata

**Evidence:** `index.html:43` twitter:description now reads "Personalised BPC registration prep for
Melbourne tradies. Small classes, **in person in Melbourne**." The phrase did not exist before
`a4fae2a`; it was added to fill the gap left by removing "95% pass rate".

Two problems. It is new copy written to complete a sentence, which `CLAUDE.md` ("Don't invent,
extrapolate or round a figure to fill a layout") is specifically aimed at. And it is inaccurate as
a site-wide statement: `src/data/courses.ts` gives Private 1-on-1 Training as "One-on-one, 3 hours
per week via Zoom", so one of the four courses is not in person at all. The sibling og:description
at `:37` was handled correctly — it fell back to "training builders since 2017", which is confirmed.

### 16. An unsupported SEO assertion replaced the competitor figure

`src/pages/EmailTemplates.tsx` now reads "Reviews are what get you found on Google Maps. Ask every
student who finishes." The competitor review count was correctly removed, but the replacement is
itself an unverified assertion about how Google Maps ranking works, presented to Adrian as fact.

Mitigating: after `c888b00` this page is admin-gated and internal, so the Public claims rule — which
governs the public site — does not strictly apply. Noted rather than pressed.

### 17. Five stat grids were left short; only one was adjusted

Removing a tile from fixed-column grids left gaps, and the fix was applied inconsistently:

| Evidence | Grid | Items now | Before |
| --- | --- | --- | --- |
| `src/components/TrustBar.tsx:26` | `grid-cols-2 md:grid-cols-3` | 3 | 4 — `md` was corrected, but base `grid-cols-2` now orphans the third tile on mobile |
| `src/components/Hero.tsx:179` | `grid-cols-2` | 3 | 4 — orphan on the second row |
| `src/pages/Contact.tsx:706` | `grid-cols-2 md:grid-cols-4` | 3 | 4 |
| `src/pages/SuccessStoriesPage.tsx:185` | `grid-cols-2 md:grid-cols-4` | 2 | 3 (already sparse on `main`; now sparser) |
| `src/pages/BuildersLicenceMelbourne.tsx:162` | `grid-cols-2 lg:grid-cols-4` | 3 | 4 |

`src/pages/About.tsx:138` uses `flex flex-wrap justify-center` and re-centres cleanly at three — no
issue there. Cosmetic only; no claim is affected. Not visually verified in a browser.

## Verified correct

- **Both routes use the shared guard.** `src/App.tsx:68` wraps `AdminDashboard` and `:69` wraps
  `EmailTemplates`, both in `RequireAdmin`. No second copy of the role check remains:
  `AdminDashboard` no longer imports `useEffect` and holds no `loading` state, and its `navigate`
  is still used by `handleLogout`. The role query itself is unchanged from the original —
  `user_roles`, `eq("role","admin")`, `maybeSingle()`, `!error && !!data` — as is the redirect
  target and the sign-out on a non-admin session. The loading markup is byte-identical to the
  dashboard's previous one. **The one divergence is finding 11.**
- **The old URL redirects, three ways.** `src/App.tsx:66` renders `<Navigate to="/admin/email-templates" replace />`; `vercel.json` declares the redirect ahead of the SPA rewrite, so Vercel serves
  it before the app loads; and `/email-templates` is listed in `INTERNAL_PATH_PREFIXES`
  (`src/lib/analytics.ts:19`) so the render preceding the client-side redirect is not tracked
  either. Route ranking is not a concern — `/email-templates`, `/admin/email-templates` and the
  `*` catch-all are unambiguous.
- **Analytics suppression is single-sourced.** `isInternalRoute` is exported from
  `analytics.ts:21` and used at `:28`, `:46`, `:51`, `:59`; `AnalyticsProvider.tsx:17` and `:25`
  import it rather than re-testing the prefix. No `isAdminRoute` reference survives.
- **Crawling.** `public/robots.txt` disallows `/admin` for Googlebot, Bingbot and `*`, so the page
  is now covered; at `/email-templates` it was not. It was never in `public/sitemap.xml` or
  `scripts/generate-sitemap.ts`.
- **Copy that checks out.** `src/components/Footer.tsx` ("Small classes, personalised teaching"),
  `src/pages/About.tsx` ("Helping Melbourne tradies achieve their building registration since
  2017"), `src/components/SuccessStories.tsx` ("what our students have achieved after getting
  registered"), and on `SuccessStoriesPage` the "Real Student Outcomes" badge, the hero intro, the
  "After Registration" heading and the closing paragraph — all trace to the confirmed fact table or
  to method copy already on the site. The page now carries exactly one "formerly the VBA"
  introduction, at `:181`.
- **No held figure reappeared.** A plain `95` grep across `src/`, `supabase/`, `public/` and
  `index.html` returns only HSL tokens in `index.css` and the `$7,995` example in a `courses.ts`
  comment. No `$100`, `500+`, "hundreds of" or "3-6 months" remains.

## Limits

Static review. No browser, no visual check of the grids in finding 17, and the token-refresh
behaviour in finding 11 was derived from the client configuration and the supabase-js event model
rather than observed against a live session. Lint and build were not re-run for this review.
