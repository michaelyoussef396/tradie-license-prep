# Qualify Pro — site-wide claims sweep

**Branch:** `claims-sweep-2026-09` (not merged)
**Source of truth:** Adrian's written confirmations, 9 Sep 2026
**Commits:**
1. `Site-wide claims sweep: counts, entry requirement, BPC exam, GST, referral`
2. `Scope experience by licence class, cut unverified story detail, clear admin discount`
3. `Remove the referral discount amount from every surface pending the 15%`

`bun run build` passes. `bun run lint` is unchanged from baseline (14 problems, 7 errors — all pre-existing, none in files this sweep touched).

---

## 1. Changes by category

### (a) Builder count → "100+", credited to Adrian personally

| File | Before | After |
|---|---|---|
| `src/components/AboutAdrian.tsx:110` | "He's helped hundreds of tradies" | "Adrian has helped 100+ tradies" |
| `src/components/FAQ.tsx:26` | "We've done this hundreds of times" | "Adrian has guided 100+ tradies through this" |
| `src/pages/About.tsx:393` | "Join hundreds of Melbourne tradies" | "Join the 100+ Melbourne tradies Adrian has helped" |
| `src/pages/SuccessStoriesPage.tsx` | "Join hundreds of Melbourne tradies" | "Join the 100+ Melbourne tradies Adrian has helped" |
| `src/pages/About.tsx` stat | **"500+ Students Trained"** | "100+ Tradies Helped By Adrian" |
| `src/pages/SuccessStoriesPage.tsx` hero stat | **"500+ Licensed Tradies"** | "100+ Tradies Helped By Adrian" |
| `src/pages/Courses.tsx` feature card | "Hundreds of practice questions…" | "600+ practice questions and answers (450+ for the carpentry course)…" |

> **Two `500+` stats, not one.** Neither was on your term list. The second (`SuccessStoriesPage` hero) was missed on the first pass because the value and label live in separate JSX fields, so `500+ students` never matched as one string. A `value:`/`number:`/`highlight:` field sweep now confirms no stale figures remain anywhere.

### (b) Entry requirement — scoped by registration class

BPC's minimum is class-dependent, so **no page, form or FAQ states a single figure as "the" BPC minimum.** All of it derives from `src/data/eligibility.ts`:

| Class | Minimum |
|---|---|
| Domestic Builder (Unlimited) | 3 years under a registered building practitioner, across a minimum of 3 projects |
| Domestic Builder (Limited), e.g. carpentry DB-L | 2 years' practical experience |
| Anything else / not yet chosen | both stated, neither presented as universal |

**Course requirements** (`src/pages/Courses.tsx`):
- Comprehensive Builder Program → Unlimited wording (covers domestic + commercial low-rise)
- Evening Builder Course → Unlimited wording
- Private 1-on-1 Training → class-neutral (it is sold as tailored to any class)
- Carpentry Licence (DB-L) → states BPC's 2-year minimum; **the course's own entry bar is on HOLD** (§2.6)

**Class-neutral copy** now states both minimums: `src/components/FAQ.tsx:21`, `src/pages/FAQ.tsx:89`, `src/pages/Courses.tsx` FAQ, and on `BuilderRegistrationCourseMelbourne.tsx` the entry-requirements list (now two bullets), the "What experience do I need?" answer, and the **FAQPage JSON-LD**.

**Forms.** The under-3 note branches on the selected licence type via `getUnderMinimumNote(licenceType)`:

```
Domestic Builder - Unlimited  → "For Domestic Builder (Unlimited), BPC requires at least 3 years'
                                 experience working under a registered building practitioner,
                                 across a minimum of 3 projects. …"
Carpentry Licence (DB-L)      → "For Domestic Builder (Limited) classes such as carpentry, BPC
                                 requires at least 2 years' practical experience. …"
Commercial / Other / unset    → both minimums, neither presented as universal
```

`Contact.tsx` passes the selected licence type. **`HeroEnquiryForm` collects trade, not registration class**, so it always gets the both-classes wording — it has no way to know which class the applicant wants. Leads submit in every case; nothing is blocked.

`Contact.tsx` licence-type options now come from `LICENCE_TYPE_OPTIONS` in the same module, so the branch keys cannot drift from the dropdown values.

### (c) BPC exam — interview removed, VBA renamed

Interview-prep claims were **deleted rather than reworded**: 4 course inclusions (`courses.ts`), 4 `whatYouLearn` bullets and a schedule tail (`Courses.tsx`), 10 narrative clauses (`SuccessStoriesPage.tsx`), and "building interview confidence" (`About.tsx:76`).

Three entries existed purely to sell interview prep and now carry factual exam copy — reference-based, Building Act / Regulations / NCC / Australian Standards, speed of finding the answer over memory, citing only prep features already on the site: the `pages/FAQ.tsx` prepare-for-the-exam entry, the `components/FAQ.tsx` and `Courses.tsx` "what does the exam involve" answers, and the Courses feature card (now "Reference Navigation").

**VBA → BPC.** First mention per page is "the Building and Plumbing Commission (BPC), formerly the VBA" on `components/FAQ.tsx`, `pages/Courses.tsx`, `pages/Contact.tsx`, `pages/FAQ.tsx`, `pages/SuccessStoriesPage.tsx`; later same-page mentions are plain "BPC". Two deliberate exceptions:
- **`Footer.tsx`** renders below the body on every page, so it can never be a page's first mention — it says plain "BPC".
- **`BpcExamChanges.tsx:121`** keeps "the VBA" because it is past tense ("the VBA … were merged into one regulator"). All "the interview was replaced" copy on that page, plus `HomeResourceLinks.tsx` and `ThankYou.tsx`, is intact as instructed.

### (d) History → "training builders since 2017"

`AboutAdrian.tsx:11` · `Footer.tsx:62` · `About.tsx:45`, `:100` (meta), stat → `2017 / Training Since` · `FAQ.tsx:41` · `BuildersLicenceMelbourne.tsx:19` · `BuilderRegistrationCourseMelbourne.tsx:192` · `Contact.tsx:703` stat · `SuccessStoriesPage.tsx` hero stat · `index.html:29` (meta).

Building-industry experience claims and the `10+` **form option** are untouched, as instructed. Qualify Pro's 2024 founding date appears nowhere on the site. No other business is named.

### (e) GST — inc-GST is the headline

`src/data/courses.ts` now takes **one hand-authored ex-GST figure per course** and derives everything else.

| Course | Headline (inc GST) | Beside it |
|---|---|---|
| Comprehensive Builder Program | **$8,794.50** | ($7,995 + GST) |
| Evening Builder Course | **$6,215** | ($5,650 + GST) |
| Private 1-on-1 Training | **$6,215** | ($5,650 + GST) |
| Carpentry Licence (DB-L) | **$4,169** | ($3,790 + GST) |
| Application Prep add-on | **+$1,606** | ($1,460 + GST) |

Verified by executing the module — all five match your figures.

- `GST_SUFFIX = "inc GST"` is **deleted**. It was rendered beside every ex-GST figure on the site; that was the mislabel.
- `priceDisplay` now means the GST-inclusive total, so all four render sites show the total prominently with the new `exGstNote` beside it (`CourseCards.tsx`, `Courses.tsx` ×3, `BuilderRegistrationCourseMelbourne.tsx` ×2).
- **"Save $X" maths:** no numeric savings claim exists. The only one is the add-on badge "Discounted vs. purchasing separately" — no figure, nothing to break.

### (f) Referral reward → $300, no "cash"

- `StudentDashboard.tsx` — `enrolled * REFERRAL_REWARD_AUD` (named constant, 300) replaces a bare `* 100`; copy reads "you earn a $300 referral reward".
- `supabase/functions/send-student-welcome/index.ts:76` — "you'll earn $100 cash" → "you'll earn a $300 referral reward".
- The word **"cash" appears nowhere** in `src/` or `supabase/`.

### (g) Success stories — unverified detail cut

Each story now carries **only** what is in Adrian's source, plus one generic training line ("Prepared for BPC registration with Adrian at Qualify Pro.") that is true of every student and makes no per-student claim.

| Student | Licence | Licensed | Outcome (verbatim from source) |
|---|---|---|---|
| Fauzi | Domestic Builder (Unlimited) | 5 years ago | Building company turning over $15M+ a year, elite homes across Melbourne's most prestigious suburbs |
| Jordan | Carpentry Licence (DB-L) | *(not in source — omitted)* | High-end outdoor living spaces; partners with numerous suppliers across Melbourne |
| Sidhu | Domestic Builder | 6 years ago | Building company constructing new homes across Melbourne's northern and western suburbs |
| Manny | *(not in source — omitted)* | 5 years ago | High-volume building company completing 50+ homes a year |
| Ben | Bathroom and Kitchen (Limited) | 4 years ago | 40+ renovation projects a year in Melbourne's inner suburbs |

**Deleted:** the four-part The Starting Point / The Challenge / The Training / The Result narrative for all five students — it was invented end to end. With it went "Elite Homes Melbourne", Toorak / Brighton / Armadale, "employs multiple teams", "Sidhu Building Constructions", "Manny's Building Company", "Ben's Renovations", "Premium Outdoor Living", "dozens of homes", "energy-efficient homes", the `currentBusiness` and `revenue` fields, and all five invented `headline`s.

**Corrections this surfaced:**
- Sidhu was "4 years ago"; source says **6**.
- Ben was "3 years ago" on the stories page and "4 years ago" on the homepage; source says **4**, now used in both.
- Ben's narrative claimed he "passed his **Domestic Builder Unlimited** registration" — source says **Bathroom and Kitchen Limited**. Directly contradictory; gone.
- Jordan had "Licensed 3 years ago" in both places; source gives no timeframe, so the field is now null and the badge does not render.
- Manny had "Domestic Builder – Unlimited"; source gives no class, so the field is null and does not render.

The homepage strip (`src/components/SuccessStories.tsx`) was aligned to the same five facts. Its blurbs were also rendered **inside quotation marks**, which made third-person copy read as attributed testimony — the quote marks are gone.

### (h) Admin panel — stale discount cleared

| File:line | Before | After |
|---|---|---|
| `PipelineTab.tsx:149` | "🎁 REFERRAL: $100 OFF" | "🎁 REFERRAL" |
| `NewLeadsTab.tsx:143-144` | "Owed $100 Discount" / "Apply $100 off when invoicing" | "🎁 REFERRAL LEAD" / "referral discount pending confirmation" |
| `PipelineTab.tsx:177` | "You must apply a **$100 discount** … when invoicing" | "A referral discount applies … amount pending confirmation" |

> **A third location, beyond the two you named.** `PipelineTab.tsx:177` is the lead detail panel and carried the same stale instruction in stronger terms ("You must apply a $100 discount"). My earlier inventory missed it. Leaving it would have meant the badge no longer quoted a figure while the panel behind it still told Adrian to take $100 off, so it was cleared the same way. Say the word if you want it reverted.

> **Resolved.** The admin lead email was stripped too (`send-lead-emails/index.ts:35, :39`): the referral is still flagged, but no amount is named anywhere. See §2.5 — no discount figure now appears on any surface until the 15% is confirmed.

### (i) JSON-LD offers — deliberately left out

No `offers` or `price` field exists in any of the three JSON-LD blocks (`Course` and `FAQPage` in `BuilderRegistrationCourseMelbourne.tsx`, `LocalBusiness` in `index.html`). Per your call this is a separate SEO job once prices are final — **not** an oversight.

---

## 2. HOLD — not edited, listed for the follow-up

### 2.1 Guarantee / resit / "until you pass"
```
src/components/WhyChooseAdrian.tsx:39
src/data/courses.ts:86, :111
src/pages/Contact.tsx      "Resit If You Don't Pass First Time"
src/pages/Courses.tsx:158, :167, :211
src/pages/FAQ.tsx:67, :124
```
One adjacent edit, disclosed: the FAQ **question** text "What if I fail the BPC test?" → "…the BPC exam?" and "What if I don't pass the test?" → "…the exam?". The guarantee **answers** are byte-for-byte untouched.

### 2.2 Class times
```
src/components/Footer.tsx:157                                9am–9pm
src/data/courses.ts:99, :100, :106                           6pm–9pm, 1 night per week
src/pages/Contact.tsx:494, :505, :506                        9am–9pm 7 days; 6pm–9pm
src/pages/BuilderRegistrationCourseMelbourne.tsx:155, :188   "Evening classes"
src/pages/FAQ.tsx:70, :72                                    evening classes Q&A
src/pages/Courses.tsx:93                                     One evening per week (6pm–9pm)
```

### 2.3 Evening vs Private 1-on-1 price parity
`src/data/courses.ts` — both remain $5,650 ex-GST ($6,215 inc). Both existing "price is identical … pending Adrian's sign-off" comments are preserved.

### 2.4 Payment plans
```
src/components/CourseCards.tsx:174, :183
src/pages/BuildersLicenceMelbourne.tsx:292
src/pages/BuilderRegistrationCourseMelbourne.tsx:344
src/pages/FAQ.tsx:75, :77, :140
src/pages/Courses.tsx:161, :162, :581, :584, :587
```

### 2.5 Mate's discount — REMOVED everywhere, returns as 15% in one commit
No discount figure appears on any surface. The referral mechanism is untouched: codes are still entered, validated, stored and flagged to Adrian — only the amount is gone. When Adrian confirms 15%, it goes into all four surfaces together.

| Surface | File:line | Now reads |
|---|---|---|
| Site — student portal | `src/pages/StudentDashboard.tsx:168` | "Share this code with tradie mates. You earn a $300 referral reward." |
| Form hint — contact | `src/pages/Contact.tsx:395` | "Got a code from a mate? Enter it here." |
| Form hint — final CTA | `src/components/FinalCTA.tsx:322` | "Got a code from a mate? Enter it here." |
| Email — student welcome | `supabase/functions/send-student-welcome/index.ts:76` | "…you'll earn a $300 referral reward." |
| Email — admin lead | `supabase/functions/send-lead-emails/index.ts:35, :39` | "🚨 REFERRAL LEAD" / "A referral discount applies — amount pending confirmation." |
| Admin UI — pipeline badge | `src/components/admin/PipelineTab.tsx:149` | "🎁 REFERRAL" |
| Admin UI — lead detail | `src/components/admin/PipelineTab.tsx:177` | "A referral discount applies … amount pending confirmation" |
| Admin UI — new lead | `src/components/admin/NewLeadsTab.tsx:143-144` | "🎁 REFERRAL LEAD" / "referral discount pending confirmation" |

Prior wording, for reference when the 15% lands: the referrer's side was "$100 cash" (now a $300 referral reward); the mate's side was "$100 off" on the site and both form hints, "they'll get $100 off" in the welcome email, "DISCOUNT REQUIRED / Remember to quote them $100 off" in the admin email, and "$100 OFF" / "Owed $100 Discount" / "You must apply a $100 discount" in the admin UI.

### 2.6 DB-L / limited-class course entry requirement — pending Adrian
`src/pages/Courses.tsx` carpentry `requirements` now states **BPC's** 2-year regulatory minimum. Whether Qualify Pro sets its own, higher bar for enrolling on the DB-L course is unconfirmed, so no course-level figure is claimed. Same question applies to any future limited-class course.

### 2.7 Named-student quotes — REMOVED, restore verbatim if Adrian confirms
All 13 removed site-wide as unverified testimonials. Line numbers are from the pre-sweep commit.

**`src/pages/SuccessStoriesPage.tsx`**
- `:54` **Fauzi** — "Adrian's personalized approach helped me understand the regulations I was struggling with. The small class size meant I could ask questions without feeling rushed, and the practice tests prepared me perfectly for the BPC process. I passed first time and never looked back. Now I run my own company building elite homes - something that wouldn't have been possible without my unlimited builder registration."
- `:84` **Jordan** — "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on. His teaching style is clear and practical. I passed first time and launched my business within weeks. Now I'm doing the high-end outdoor work I always wanted to do, working with the best suppliers in Melbourne."
- `:114` **Sidhu** — "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex regulations easy to understand and gave me the confidence to pass my interview. His focus on understanding principles rather than memorizing really helped. Now I'm building new homes across Melbourne's growth corridors under my own company name."
- `:144` **Manny** — "Small classes made all the difference. I could ask questions without feeling rushed or stupid, and Adrian always took the time to explain things properly. He identified exactly where I needed to improve and focused on those areas. I passed first time and now I'm running a successful high-volume building company. Worth every dollar."
- `:174` **Ben** — "I failed on my own, but with Adrian's help I passed easily the second time. His teaching style focuses on understanding, not just memorizing answers. He was patient, supportive, and identified exactly what I needed to work on. Now I run my own renovation business doing 40+ projects a year. I'm so glad I didn't give up on my dream."

**`src/pages/About.tsx`** — the entire "What Students Say" section was removed; all four items were quotes.
- `:93` **Jordan** (DB-L Carpentry Licence) — "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on."
- `:100` **Manny** (Domestic Builder - Unlimited) — "What I appreciated most was how Adrian personalized his teaching. He identified where I was weak and spent extra time helping me improve those areas."
- `:107` **Ben** (Bathroom & Kitchen Licence) — "Small class sizes made all the difference. I could ask questions without feeling stupid, and Adrian always took the time to explain things properly."
- `:114` **Fauzi** (Domestic Builder - Unlimited) — "Adrian has been on the tools, been a site manager, and been a builder. He understands the practical side of building, not just theory."

**`src/pages/Courses.tsx`** — all four per-course testimonial cards removed.
- `:78` **Fauzi** ("Now running his own building company") — "Adrian's comprehensive program gave me everything I needed. The small class size meant I got personal attention, and the 600+ practice questions were invaluable. I passed first time and now run my own building company."
- `:102` **Manny** ("Licensed builder completing 50+ homes/year") — "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex topics easy to understand, and I felt fully prepared for my interview."
- `:126` **Jordan** ("Licensed carpenter running outdoor living business") — "One-on-one training was worth every dollar. Adrian identified exactly where I was weak and we focused on those areas. The flexible schedule meant I could fit it around my work commitments."
- `:149` **Jordan** ("Licensed DB-L carpenter") — "The DB-L course was exactly what I needed. Adrian knows the carpentry trade inside out and focused on what BPC actually asks. Passed first time and now running my own carpentry business."

---

## 3. Open questions and judgment calls

1. **Evening Builder Course is treated as Domestic Builder (Unlimited).** Its `whoItsFor` says "domestic builder registration" without naming a class; carpentry is the only course explicitly sold as limited. If the evening course also serves limited classes, its requirement wording needs the class-neutral version instead.
2. **Sidhu is still missing from the homepage strip** (`src/components/SuccessStories.tsx` shows Fauzi, Jordan, Manny, Ben). Adding him is new work, not a correction, so it was left alone.
3. **`95% pass rate`** is out of scope and untouched. Always attributed to "Qualify Pro's own student records". It is now the last large unverified number on the site.
4. **"BPC test" → "BPC exam"** terminology was changed in headings, FAQ questions and one inclusion. Not requested; leaving "test" beside the new exam copy read as two separate assessments. Easy to revert.
5. **`highlights` in `CourseCards.tsx` index into `courses.ts` inclusions by position**, so removing a bullet silently changes which ones a card shows. All four were checked; the only shift is the carpentry card, which previously highlighted "BPC interview preparation" and now shows "Technical knowledge assessment" — the desired outcome, but the coupling is fragile and worth replacing with keys.
6. **`.env` is committed to git** and absent from `.gitignore`. Unrelated to this sweep, found while scanning, worth untracking.

---

## 4. Verification

```
bun run build    ✓ passes
bun run lint     14 problems (7 errors, 7 warnings) — identical to baseline;
                 none in files this sweep touched
prices           executed src/data/courses.ts — all 5 totals match the brief
eligibility      executed src/data/eligibility.ts — all 4 licence-type branches
                 checked; none states a single minimum for every class
stat fields      swept every value:/number:/highlight: literal; no stale figures
```

Not merged. Branch `claims-sweep-2026-09`.
