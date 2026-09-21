# Qualify Pro — site-wide claims sweep

**Branch:** `claims-sweep-2026-09` (not merged)
**Source of truth:** Adrian's written confirmations, 9 Sep 2026
**Commits:**
1. `Site-wide claims sweep: counts, entry requirement, BPC exam, GST, referral`
2. `Scope experience by licence class, cut unverified story detail, clear admin discount`
3. `Remove the referral discount amount from every surface pending the 15%`
4. `Add CLAUDE.md with a public-claims rule`
5. `Use class-neutral experience wording for the Evening Builder Course`
6. `Resolve the Codex review: three missed claim surfaces, four unsupported promises`
7. `Gate EmailTemplates behind admin auth and hold the 95% pass rate`
8. `Move EmailTemplates under /admin so analytics and crawlers skip it`
9. `Fix the RequireAdmin refresh regression and the fallout from holding the pass rate`
10. `Remove the held pass-rate claim from both emails and mutation-test the admin guard`
11. `Ignore supabase/.temp and record the 21 Sep edge function deploys`
12. `Clear the claim scaffolding the pass-rate removal left behind` (branch `fix-live-site-claims-2026-09-21`)

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
- Evening Builder Course → class-neutral; which classes it serves is unconfirmed (§2.7)
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

Each story now carries **only** what is in Adrian's source, plus one generic training line ("Trained with Adrian before registering." — reworded in §2.17) that is true of every student and makes no per-student claim.

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

### 2.7 Which classes the Evening Builder Course serves — pending Adrian
`src/data/courses.ts` describes it only as "for working tradies going for domestic builder
registration", which does not name a class. It was briefly written up as Domestic Builder
(Unlimited) on inference alone; that was wrong to assume, so `src/pages/Courses.tsx:99` now uses
the class-neutral wording and states both BPC minimums. Once Adrian confirms whether the course
serves Unlimited only, limited classes too, or both, the requirement can be narrowed — and the
`whoItsFor` line in `courses.ts` should be made explicit at the same time.

### 2.8 Named-student quotes — REMOVED, restore verbatim if Adrian confirms
All 13 removed site-wide as unverified testimonials. Line numbers are from the pre-sweep commit.

**`src/pages/SuccessStoriesPage.tsx`**
- `:54` **Fauzi** — "Adrian's personalized approach helped me understand the regulations I was struggling with. The small class size meant I could ask questions without feeling rushed, and the practice tests prepared me perfectly for the BPC process. I passed first time and never looked back. Now I run my own company building elite homes - something that wouldn't have been possible without my unlimited builder registration."
- `:84` **Jordan** — "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on. His teaching style is clear and practical. I passed first time and launched my business within weeks. Now I'm doing the high-end outdoor work I always wanted to do, working with the best suppliers in Melbourne."
- `:114` **Sidhu** — "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex regulations easy to understand and gave me the confidence to pass my interview. His focus on understanding principles rather than memorizing really helped. Now I'm building new homes across Melbourne's growth corridors under my own company name."
- `:144` **Manny** — "Small classes made all the difference. I could ask questions without feeling rushed or stupid, and Adrian always took the time to explain things properly. He identified exactly where I needed to improve and focused on those areas. I passed first time and now I'm running a successful high-volume building company. Worth every dollar."
- `:174` **Ben** — "I failed on my own, but with Adrian's help I passed easily the second time. His teaching style focuses on understanding, not just memorizing answers. He was patient, supportive, and identified exactly what I needed to work on. Now I run my own renovation business doing 40+ projects a year. I'm so glad I didn't give up on my dream."

**`src/components/AboutAdrian.tsx`** (homepage) — found by the Codex review; hardcoded in JSX rather than a `quote:` field, so the original inventory missed it. Attributed only to "Graduate feedback", i.e. to no one.
- **unattributed** — "Patient and understandable - makes things simple and straightforward. Adrian doesn't just teach from a book, he explains it like a tradie would."

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

### 2.9 Commercial (Low-Rise) experience minimum — pending Adrian
The Comprehensive course is sold for domestic **and** commercial low-rise, but the confirmed
3-years/3-projects figure covers Domestic Builder (Unlimited) only. `UNLIMITED_EXPERIENCE_SUMMARY`
now names its class and `COMMERCIAL_EXPERIENCE_NOTE` says commercial requirements differ and will
be confirmed on enquiry. No commercial figure is claimed. Needs Adrian's confirmation.

### 2.10 Registration turnaround — removed pending confirmation
"Most students gain their licence within 3-6 months" (and "within a few months") came off
`components/FAQ.tsx`, `pages/Courses.tsx` and `pages/FAQ.tsx`. Course durations remain; BPC
processing is now described as theirs and varying. Restore a turnaround only with a confirmed
figure and a stated starting point.

### 2.11 Video testimonials — removed pending confirmation
`SuccessStoriesPage` promised testimonials "currently being filmed". Removed. Prior heading:
"Video Testimonials Coming Soon"; body: "We're currently filming video testimonials with our
successful students. Check back soon to watch them share their stories in their own words."

### 2.12 Pass rate — REMOVED everywhere, restore on written confirmation
Only verbally confirmed, so it is held under the Public claims rule. Adrian is confirming in
writing this week; restore in one commit.

**Verify with wording, not digits.** The figure was removed from 21 numeric occurrences across 13
files, and a `95` grep is clean — but that grep missed three instances of the same claim written
without a number, each found by a later review. Re-check with
`grep -rniIE 'pass rate|success rate|high pass' src supabase` before declaring this closed. There
is **no `public/llms.txt`** in this repo.

The "pass first time, or we sit you down again for free" wording that this sweep also surfaces is
the free-resit promise (§2.1), not a pass-rate claim, and is deliberately untouched.

| File | Was |
|---|---|
| `index.html` ×3 | meta description "Small classes, 95% pass rate, training builders since 2017"; og:description "Small classes, 95% pass rate"; twitter:description "95% pass rate" |
| `src/pages/Index.tsx` | Seo description "Small classes, 95% pass rate." |
| `src/components/Hero.tsx` | trust badge `{ icon: TrendingUp, stat: "95%", label: "Pass Rate" }` |
| `src/components/Footer.tsx` ×2 | "…personalised teaching, 95% pass rate (based on Qualify Pro's own student records)." + "95% Pass Rate" badge and its "Based on Qualify Pro's own student records." footnote |
| `src/components/TrustBar.tsx` | stat tile `{ icon: Trophy, stat: "95%", description: "Pass Rate" }` (grid 4→3 cols) |
| `src/components/FinalCTA.tsx` | benefit `{ icon: Shield, text: "95% pass rate (own student records)" }` |
| `src/components/SuccessStories.tsx` | "A **95% pass rate** (based on Qualify Pro's own student records) — here's what our students have achieved." |
| `src/pages/About.tsx` ×2 | credential card "…with a 95% pass rate (based on Qualify Pro's own student records)." + stat `{ number: "95%", label: "Pass Rate" }` |
| `src/pages/Contact.tsx` | stat tile `{ icon: CheckCircle2, value: "95%", label: "Pass Rate" }` |
| `src/pages/Courses.tsx` | FAQ "What's your success rate?" — "…achieve a 95% pass rate for their registration (based on Qualify Pro's own student records). This is due to our personalized teaching approach…" |
| `src/pages/FAQ.tsx` | "Students who complete our programs achieve a 95% pass rate for their BPC registration (based on Qualify Pro's own student records)." |
| `src/pages/BuildersLicenceMelbourne.tsx` | trust item `{ icon: TrendingUp, text: "95% BPC pass rate (own student records)" }` |
| `src/pages/SuccessStoriesPage.tsx` ×5 | hero badge "95% Pass Rate"; hero intro "Our students achieve a 95% pass rate for registration with the BPC…"; hero stat `{ value: "95%", label: "Pass Rate" }`; section heading "Our Pass Rate" + body "…achieve a 95% pass rate… Here's what happens after they get licensed:"; closing "What they all received was personalized training… That's why our students achieve a 95% pass rate…" |

Five unused icon imports (`Trophy`, `Shield`, `TrendingUp` ×2, and `TrendingUp` in Hero) were
dropped with them; restore those too.

**Also removed in the follow-up pass**, once it was clear the figure was going:

| File | Was |
|---|---|
| `src/pages/Courses.tsx` | whole FAQ entry — Q "What's your success rate?" / A "We use a personalized teaching approach, prepare you thoroughly, and make sure you're genuinely ready before you attempt your registration." |
| `src/pages/FAQ.tsx` | whole FAQ entry — Q "What's the success rate?" / A "We prepare you thoroughly and make sure you're genuinely ready before you attempt your BPC registration." |
| `src/pages/About.tsx` | image overlay badge — "**High**" / "Success Rate" |
| `supabase/functions/send-lead-emails/index.ts` | auto-reply bullet — "Our students achieve a consistently high pass rate" |
| `src/pages/EmailTemplates.tsx` | the same bullet in the template preview of that email |

The two FAQ entries were first rewritten to drop the figure, which left questions asking for a
rate their answers no longer gave. They are removed entirely and come back **with** the figure.
The About badge is the same claim without a number, so a `95` grep could never have found it;
holding the figure while leaving "High Success Rate" on the About page would have defeated the
point. The same was true of the auto-reply email — and that one was the most consequential of the
three, because `send-lead-emails` sends it to **every lead**, so the held claim was still going out
in writing. `EmailTemplates.tsx` is the preview of that email, which is why the wording appeared
twice. No FAQ JSON-LD carried either entry — the only `FAQPage` blocks are in
`BuilderRegistrationCourseMelbourne.tsx` and `BpcExamChanges.tsx`, neither of which mentions a
success rate.

### 2.13 EmailTemplates is now admin-gated
`/email-templates` was publicly routed. It is now wrapped in the shared `RequireAdmin` guard,
the same one `/admin/dashboard` uses — `AdminDashboard`'s inline copy was extracted into
`src/components/RequireAdmin.tsx` so the two cannot drift. The competitor-review figure
("Your competitors have 100-400+ reviews") is removed from the review-request template.

**Caveat:** this is a client-side guard, so it stops casual access but the gated page's markup
still ships in the JS bundle. It holds no data and makes no authenticated calls, so nothing
privileged is exposed — but it is not a server-side control.

**Analytics and crawling, now resolved.** The page moved to `/admin/email-templates`, so it is
covered by the `/admin*` analytics suppression and by the existing `Disallow: /admin` in
`public/robots.txt` — at `/email-templates` it was crawlable, though it was never in the sitemap.
The old URL redirects three ways over: a Vercel `redirects` entry (applied before the SPA rewrite,
so production never renders it), a client-side `<Navigate replace>` for dev and in-app links, and
`/email-templates` is listed in `INTERNAL_PATH_PREFIXES` so even the brief render before the
client-side redirect fires is not tracked. The Vercel redirect is `permanent: false` (307)
deliberately — a 308 would be cached hard by browsers and is awkward to undo for an internal page.

### 2.14 `RequireAdmin` refresh regression — fixed, now covered by a test
The first extraction cleared `isAllowed` on every auth event, so `TOKEN_REFRESHED` unmounted the
gated page: the dashboard's open tab reset to New Leads, the sidebar collapsed and all four panels
refetched. The original inline guard never did this — it re-verified in the background.

Now: auth events re-verify without clearing `isAllowed`; only `SIGNED_OUT` or a failed role check
redirects. `getSession()` and the listener's `INITIAL_SESSION` are deduped so each mount runs one
`user_roles` query with no loading flash. The redirect is held in a ref and the subscription effect
has empty deps, so router identity changes cannot re-subscribe or re-query. Redirects are skipped
after unmount.

`RequireAdmin` now passes the attempted path to the login screen as router state, and `AdminLogin`
returns there after sign-in — a saved `/email-templates` link ends up on the templates page rather
than the dashboard. Only paths beginning `/admin/` are honoured, so crafted router state cannot
redirect a signed-in admin elsewhere.

**Covered by `src/components/RequireAdmin.test.tsx`** (6 tests, `bun test`). The token-refresh test
was confirmed to fail against the regressed version before the fix was restored. Getting it to fail
required holding the mocked role query open — with an immediately-resolving mock React batches the
two state updates and the intermediate unmount never commits, so the test passed vacuously. Worth
remembering if these are extended.

### 2.15 Stat grids rebalanced after the pass-rate removal
Removing a tile left five fixed-column grids with a short row. `TrustBar`, `Contact` and
`BuildersLicenceMelbourne` are now `grid-cols-1 sm:grid-cols-3` for their three items;
`SuccessStoriesPage`'s hero stats are `grid-cols-2` in a narrower container for their two. `Hero`
keeps two columns and gives a trailing odd badge `col-span-2` — its badges put an icon beside a
`text-2xl` stat, and "Melbourne" at that size would crowd a third column even on desktop.

**Not visually verified** — no browser check was run. `About.tsx`'s stats row uses
`flex flex-wrap justify-center` and re-centres on its own, so it needed nothing.

### 2.17 Post-deploy pass — orphaned scaffolding and a false referral badge

Found on the live site after PR #1 shipped. Five fixes, all on
`fix-live-site-claims-2026-09-21`.

**The footnote outlived its figure.** "Based on Qualify Pro's own student records." was written to
source the 95%. §2.12 removed the figure from `Footer.tsx` **with** its footnote, but six other
copies of the same footnote were attached to stat blocks rather than to the tile, so they survived
the tile's deletion and now sourced whatever was left beside them — "10+ Years Experience",
"Max 10 Per Class", "Melbourne", "Training builders since 2017". None of those comes from student
records, and one of the two figures it still sat under (`100+`) is Adrian's estimate, not a record
count. Removed from `Hero.tsx`, `BuildersLicenceMelbourne.tsx`, `About.tsx`, `Contact.tsx` and
`SuccessStoriesPage.tsx` — and from `TrustBar.tsx`, which was then deleted outright as dead code
(see below), so that sixth removal never mattered.

**A second "High" survived.** §2.12's follow-up caught the About page's "High / Success Rate"
overlay badge but missed the identical construction on `SuccessStoriesPage.tsx:216` — a
`text-7xl` **"High"** in an emerald card directly above the heading "After Registration". It was
the pass-rate tile with its number taken out. Removed; the heading now opens the section.

**The training line named two things that did not exist yet.** "Prepared for BPC registration with
Adrian at Qualify Pro." → **"Trained with Adrian before registering."** The featured students were
licensed 4–6 years ago; Qualify Pro dates to 2024 and the BPC to 2025, so the old line
back-dated both the business and the regulator onto registrations that predate them.

**Fauzi's homepage tile invented a specialty.** `highlight: "Elite" / highlightLabel: "Custom
Homes"` — the source says *elite* homes, never *custom*, and "Elite" in the value slot was a
non-figure where the other three tiles ("$15M+"-scale, "50+", "40+") carry numbers. Now
`"$15M+" / "Annual Turnover"`, which is the figure already in his own `story` string and in the
table at §1(g).

**An invalid referral code produced a discount promise.** Reported from a live submission with
`jrodna-1234`, which matches no `referral_codes` row. `send-lead-emails` validated the code
*only* to decide whether to insert the `referrals` row — the admin email keyed its red
**REFERRAL LEAD** banner and "A referral discount applies" line off the raw `lead.referralCode`
string instead, so any typed text triggered both. The admin UI had the same bug against
`leads.used_referral_code`.

- The email now takes a `ReferralCheck` (`none` | `valid` | `invalid` | `unverified`). Only
  `valid` renders the banner and the discount line; `invalid` shows "Code entered: X (not a valid
  code)". `unverified` — the RPC itself errored — says "could not be checked — verify manually",
  because a failed check is not a rejection and the email must not claim a verdict it never got.
- `NewLeadsTab` and `PipelineTab` now gate every referral badge on a **`referrals` row existing**
  for that lead (`fetchReferredLeadIds`, covered by `referred-leads.test.ts`), since that row is
  only ever created server-side after `validate_referral_code` matches. A code that was typed but
  not matched is shown as plain grey text, not an amber action-required badge. `NewLeadsTab`'s
  realtime channel also subscribes to `referrals` inserts, so a genuine referral still lights up
  live — the row lands a moment after the lead.

**Swept for the same failure elsewhere; two things surfaced that needed a decision rather than a
fix. Both are now resolved.**

1. **`src/components/TrustBar.tsx` rendered nowhere — deleted.** `grep -rn "TrustBar"` returned
   only its own declaration and its `export default`; `Index.tsx` goes
   `Hero → WhyChooseAdrian → CourseCards → SuccessStories → AboutAdrian → TradeAreas →
   HomeResourceLinks → FAQ → FinalCTA → Footer`. §2.12 re-gridded this file 4→3 cols and this
   pass deleted its footnote — **two rounds of claim surgery on a dead component**, neither of
   which ever reached the live site. The file is gone; its citations in the §5 queue (rows 1, 3
   and 7) no longer resolve, and those claims remain live via the other files in the same rows.
   Its `stat: "Melbourne"` above `description: "Melbourne Based"` was a separate pre-existing wart
   from `6469761` and went with it.

2. **Jordan's homepage tile no longer renders.** It read `"High-End" / "Outdoor Living"`;
   `git log -p` shows it was born that way in `d710efa`, so no figure was ever removed from it.
   But once Fauzi's tile became `$15M+`, it was the only word-valued tile in a row of
   `$15M+` / `50+` / `40+` and **read as a number that had been pulled.** Adrian's source gives
   Jordan no turnover or volume figure, so rather than invent one, `highlight` and `highlightLabel`
   are now `null` and the block is guarded — the same treatment his missing `timeframe` and
   Manny's missing `licence` already get. His card keeps its name, licence and story; it is the one
   homepage story with no headline figure. **A figure for it is §5 row 16.**

**The pattern to watch.** Four of these five are the same failure: a held or corrected figure was
deleted, and the label, footnote, unit or container it lived in was left behind to attach itself
to whatever was nearby. §2.12's advice to "verify with wording, not digits" holds, and should
extend to the scaffolding — grep the *labels* ("Pass Rate", "Success Rate", "Based on"), not just
the numbers.

### 2.16 Admin guard invariants are now mutation-tested
The first test pass caught the regression it was written for and missed three others: the
"no redirect after unmount" test unmounted the root, which unsubscribed the listener, so the event
it then emitted reached nobody. It asserted a true thing for the wrong reason.

The unmount tests now hold one async step open — `getSession()`, the role query, or `signOut()` —
unmount while it is pending, and release it afterwards, which is the only way to reach the
`isActive` guards. `resolveAdminDestination` moved to `src/lib/admin-redirect.ts` so it can be
tested without loading the login page's asset imports, and is hardened against traversal segments
and backslashes as well as the prefix check.

Every guard was verified by reintroducing the mutation and confirming the suite fails:

| Mutation | Caught by |
|---|---|
| `setIsAllowed(false)` on auth events | token-refresh test |
| initial-check dedupe removed | one-query test (×2) |
| `isActive` removed from `redirectToLogin` | sign-out-after-unmount test |
| `isActive` removed from `verify` | role-query-after-unmount test |
| `isActive` removed from `getSession().then` | session-after-unmount test |
| order-independent dedupe removed | event-before-INITIAL_SESSION test |
| prefix check removed | 5 resolver tests |
| traversal check removed | 2 resolver tests |
| backslash check removed | 1 resolver test |
| non-string fallback removed | 1 resolver test |

21 tests across 2 files. **Add a mutation to any new guard before trusting its test** — twice now a
test here has passed against the bug it was meant to catch.

---

## 3. Open questions and judgment calls

1. **Sidhu is still missing from the homepage strip** (`src/components/SuccessStories.tsx` shows Fauzi, Jordan, Manny, Ben). Adding him is new work, not a correction, so it was left alone.
2. **`95% pass rate`** — now removed from the site entirely and held (§2.12). Adrian is confirming it in writing this week.
3. **"BPC test" → "BPC exam"** terminology was changed in headings, FAQ questions and one inclusion. Not requested; leaving "test" beside the new exam copy read as two separate assessments. Easy to revert.
4. **`highlights` in `CourseCards.tsx` index into `courses.ts` inclusions by position**, so removing a bullet silently changes which ones a card shows. All four were checked; the only shift is the carpentry card, which previously highlighted "BPC interview preparation" and now shows "Technical knowledge assessment" — the desired outcome, but the coupling is fragile and worth replacing with keys.
5. **`.env` is committed to git** and absent from `.gitignore`. Unrelated to this sweep, found while scanning, worth untracking.
6. ~~**`TrustBar.tsx` is dead code**~~ — resolved: deleted in §2.17.
7. ~~**Jordan's homepage highlight tile has no figure to show**~~ — resolved: the tile is nulled and guarded (§2.17); a figure is queued for Adrian as §5 row 16.

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

---

## 5. Confirmation queue — send to Adrian

Concrete claims already live on the site for which no written confirmation is on record.
Raised by the Codex review as traceability gaps. **Not removed** — the review is explicit these
are gaps in the record, not findings that the facts are false, and stripping them would delete
course durations, credentials and the whole BPC explainer. They need one confirmation pass.

| # | Claim | Where |
|---|---|---|
| 1 | 95% pass rate (and whether the student-record attribution must appear everywhere) | `Hero.tsx:23`, `TrustBar.tsx:8`, `Footer.tsx:52`, `:59`, `index.html:29`, `:37`, `:43`, `Index.tsx:18`, + 10 more |
| 2 | Course durations: 13 / 7 / 9 / 6 weeks; 3 hrs per week private; 8-month platform access | `src/data/courses.ts` |
| 3 | Maximum 10 students per group course | `courses.ts` ×3, `Hero.tsx`, `TrustBar.tsx`, `WhyChooseAdrian.tsx`, `About.tsx`, `FAQ.tsx`, `send-lead-emails`, `EmailTemplates.tsx` |
| 4 | Response / callback within 24 hours | `Contact.tsx` ×5, `FinalCTA.tsx` ×3, `ThankYou.tsx` ×2, `BuildersLicenceMelbourne.tsx`, `send-lead-emails`, `EmailTemplates.tsx` |
| 5 | Consultation 15–20 minutes; eligibility check 2 minutes | `Contact.tsx:193`, `BuilderRegistrationCourseMelbourne.tsx` ×3, `BpcExamChanges.tsx:54` |
| 6 | Adrian's Unlimited + commercial low-rise registration, carpentry qualification, no domestic project-value limit, commercial scope to three storeys | `AboutAdrian.tsx:8-10`, `About.tsx:30-41`, `FAQ.tsx:42` |
| 7 | 10+ years industry experience (distinct from training since 2017, which is confirmed) | `Hero.tsx:24`, `TrustBar.tsx:13` |
| 8 | Enrolment preferences beyond the class minimums: trade qualification preferred, references required, currently working preferred, trade certificate required | `Courses.tsx` ×5 |
| 9 | Trade quals, same-or-higher-class references and portfolio as general BPC requirements | `components/FAQ.tsx`, `pages/FAQ.tsx`, `BuilderRegistrationCourseMelbourne.tsx` |
| 10 | Evening course is "Most Popular" — no enrolment comparison on record | `CourseCards.tsx:21`, `Courses.tsx`, `FAQ.tsx` |
| 11 | Coverage of waterproofing, bricklaying, cabinetry, external fixtures and other listed classes | `TradeAreas.tsx:28-34`, `FAQ.tsx:130` |
| 12 | Post-registration support scope, insurance guidance, unlimited private-course email support | `Courses.tsx:177`, `BuilderRegistrationCourseMelbourne.tsx:79-80`, `courses.ts:137` |
| 13 | Free consultation, no obligation | `Contact.tsx:197`, `FAQ.tsx:146` |
| 14 | Competitors have 100–400+ reviews — on a **publicly routed** page (`App.tsx:65`), not admin-only | `EmailTemplates.tsx:235` |
| 15 | BPC operational detail: July 2025 merger, January 2026 rollout, 40→7 documents, proctoring, 24/7 booking, onboarding and adjustment deadlines | `BpcExamChanges.tsx` throughout |
| 16 | **A figure for Jordan's tile** — annual turnover, project volume or similar, in the shape of Fauzi's `$15M+`, Manny's `50+` or Ben's `40+`. His tile currently renders no highlight at all (§2.17) | `SuccessStories.tsx:24-26` |

Item 15 needs a regulatory source rather than Adrian's sign-off. Item 14 is worth reviewing first
— it is a comparative claim about named competitors on a public URL. Item 16 is the only one here
that is *blocking a visible gap* rather than backfilling an existing claim — Jordan's card is now
the one story on the homepage with no headline figure beside it.

**`TrustBar.tsx` was deleted in §2.17**, so its citations in rows 1, 3 and 7 no longer resolve.
Those claims are still live via the other files listed in the same rows.

---

## 6. Deployment log

### 21 September 2026 — PR #1 merged, two edge functions deployed

PR #1 merged as `b867d1a` (merge commit; `mergedAt 2026-09-20T15:02:55Z` UTC). `main` was pulled
and `a0c38fa` confirmed as an ancestor **before** any deploy, and both function files were read
back on `main` to confirm they were the post-sweep versions rather than trusting ancestry alone.
That check mattered: an earlier attempt was made from a `main` checkout that still held the
pre-sweep code, which would have redeployed the old copy and reinstated both held claims.

| Function | Deployed | What went live |
|---|---|---|
| `send-lead-emails` | yes | Admin notification no longer reads "DISCOUNT REQUIRED" / "quote them $100 off"; the auto-reply sent to every lead no longer claims "a consistently high pass rate" |
| `send-student-welcome` | yes | "$100 cash and they'll get $100 off" becomes "a $300 referral reward" |
| `send-followup-emails` | no, deliberately | PR #1 did not change it, and it holds the Day 10 auto-dead logic below |

Both went to project `dpceyonfjfjaogwkyrhp` with the deploy command plus
`--project-ref dpceyonfjfjaogwkyrhp --no-verify-jwt`, run by Michael in his own terminal because
the agent's Bash tool is gated by the Supabase guard hook. Supabase CLI 2.101.0.

**Not verified against a live send.** The deploys succeeded; no test enquiry was submitted, so the
new copy has not been observed in a received email. A submission through /contact would exercise
`send-lead-emails` end to end.

### Day 10 auto-dead — still undeployed, needs a decision

`send-followup-emails` is the only function containing it
(`supabase/functions/send-followup-emails/index.ts:128-142`). Day 3 and Day 7 each bound their
query with both `.gte` and `.lte`, a one-day window. Day 10 has only `.lte`, so on a first run it
sweeps the entire history of `followed_up_7` leads with no lower bound and no limit.

Because the function has never run, nothing reached `followed_up_7` automatically — every affected
lead is one Adrian set by hand. `followed_up_7` is not in `STATUS_COLUMNS`
(`src/components/admin/PipelineTab.tsx`), so those leads are invisible on the Kanban today and the
count cannot be read off the board. No email is sent by this branch; the effect is pipeline state
only. It is not cleanly reversible: `status` is overwritten with no `previous_status` column, and
the response returns a count rather than ids, so afterwards an auto-dead lead cannot be told apart
from a manually-dead one. Test leads are correctly skipped.

Before it ever runs:

    select count(*) from public.leads
    where status = 'followed_up_7'
      and (is_test = false or is_test is null)
      and created_at <= now() - interval '10 days';

    create table leads_status_backup_20260921 as
    select id, status from public.leads where status = 'followed_up_7';

### supabase/.temp/ is untracked but not ignored

The deploys created `supabase/.temp/`, and `linked-project.json` inside it records
`{"ref":"dpceyonfjfjaogwkyrhp", ...}` along with the organization id. It is **not** matched by
`.gitignore`, so a careless `git add` would commit a default target into the repo. That is the
shape of the 2026-08-27 incident the Supabase guard was written for, where a tracked
`supabase/.temp/project-ref` carried the PROD ref and every clone and worktree inherited it.
Harmless here because the ref is the correct one, but `supabase/.temp/` should be added to
`.gitignore`.

