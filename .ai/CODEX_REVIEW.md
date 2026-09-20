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
