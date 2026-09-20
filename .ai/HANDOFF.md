# Qualify Pro — site-wide claims sweep

**Branch:** `claims-sweep-2026-09` (not merged)
**Source of truth:** Adrian's written confirmations, 9 Sep 2026
**Result:** 17 files changed, +150 / −252. `bun run build` passes. `bun run lint` is unchanged from baseline (14 problems, 7 errors — all pre-existing, all in files this sweep did not touch).

---

## 1. Changes by category

### (a) Builder count → "100+", credited to Adrian personally

| File:line | Before | After |
|---|---|---|
| `src/components/AboutAdrian.tsx:110` | "He's helped hundreds of tradies bridge that gap" | "Adrian has helped 100+ tradies bridge that gap" |
| `src/components/FAQ.tsx:26` | "We've done this hundreds of times" | "Adrian has guided 100+ tradies through this" |
| `src/pages/About.tsx:393` | "Join hundreds of Melbourne tradies" | "Join the 100+ Melbourne tradies Adrian has helped" |
| `src/pages/SuccessStoriesPage.tsx:638` | "Join hundreds of Melbourne tradies" | "Join the 100+ Melbourne tradies Adrian has helped" |
| `src/pages/About.tsx` stats | **"500+ Students Trained"** | "100+ Tradies Helped By Adrian" |
| `src/pages/Courses.tsx` feature card | "Hundreds of practice questions…" | "600+ practice questions and answers (450+ for the carpentry course)…" |

> **Not on your term list but same claim class:** the About page carried a `500+ Students Trained` stat. It directly contradicts the confirmed 100+, so it was changed. Flagging it because it was a bigger number than anything the word "hundreds" was hiding.

### (b) Entry requirement → 3 years / 3 projects

Canonical wording, now centralised in the new **`src/data/eligibility.ts`**:

> At least 3 years' experience working under a registered building practitioner, across a minimum of 3 projects.

Copy updated at: `src/components/FAQ.tsx:21` · `src/pages/FAQ.tsx:88` · `src/pages/Courses.tsx` (4 × `requirements`, 1 × FAQ answer) · `src/pages/BuilderRegistrationCourseMelbourne.tsx` (entry-requirements bullet, "What experience do I need?", and the **FAQPage JSON-LD** answer).

**Form options and logic** — so under-3 never reads as eligible:

- `src/pages/Contact.tsx` buckets were `2-3 / 4-5 / 6-10 / 10+`. The `2-3` bucket straddled the threshold, so the set is now `Under 3 / 3-5 / 5-10 / 10+`, matching the hero form.
- Both enquiry forms (`HeroEnquiryForm`, `Contact`) now render an inline note when `Under 3` is selected, stating the real BPC minimum. Submission is **not** blocked — the lead is still captured, it just is not told it qualifies.
- Both forms import the options and the note from `src/data/eligibility.ts`, so the threshold cannot drift between them.
- `src/pages/Courses.tsx` (3 × `requirements`, 1 × FAQ answer) and `src/pages/FAQ.tsx` also build their copy from that module. The old "2 years" wording was duplicated as a literal in 9 places, which is how it went stale; the figure is now stated once. Prose that embeds the requirement mid-sentence was left as plain copy.

### (c) BPC exam — interview removed, VBA renamed

**Interview-prep claims deleted (removed, not reworded):**

- `src/data/courses.ts` — dropped `"Interview preparation and mock interviews"` (comprehensive) and `"BPC interview preparation"` (evening, carpentry).
- `src/pages/Courses.tsx` — dropped 4 `whatYouLearn` bullets ("Interview techniques and confidence building", "Interview preparation and techniques", "Interview skills and confidence building", "BPC interview preparation for DB-L") and the carpentry `schedule` tail "and interview preparation".
- `src/pages/SuccessStoriesPage.tsx` — 10 interview-prep clauses cut from the case-study narratives (see §4 for what was deliberately *not* cut).
- `src/pages/About.tsx:76` — "building interview confidence" → "finding your way around the references".

**Entries whose whole purpose was interview prep → replaced with factual exam copy** (reference-based; Building Act, Regulations, NCC, Australian Standards; speed of finding the answer over memory; only prep features already on the site cited):

- `src/pages/FAQ.tsx` — "How do I prepare for the interview?" → "How do I prepare for the exam?"; "What does the BPC test involve?" → exam wording; category heading "BPC Test & Registration" → "BPC Exam & Registration".
- `src/components/FAQ.tsx` — "What does the BPC test involve?" → single supervised online exam, reference-based.
- `src/pages/Courses.tsx` — "What does the BPC test involve?" → exam wording; feature card "Interview Preparation / Mock interviews and technique coaching" → "Reference Navigation / The exam is open book — practice finding and applying the right clause under time pressure."

**VBA → BPC.** First mention per page is now *"the Building and Plumbing Commission (BPC), formerly the VBA"* on: `components/FAQ.tsx:16`, `pages/Courses.tsx:138`, `pages/Contact.tsx:177`, `pages/FAQ.tsx:26`, `pages/SuccessStoriesPage.tsx:261`. Later same-page mentions are plain "BPC" (`SuccessStoriesPage.tsx:305`).

Two deliberate exceptions:
- **`src/components/Footer.tsx`** renders below the body on *every* page, so it can never be a page's first mention. It now says plain "BPC"; using the full introduction there would re-introduce VBA at the bottom of pages that already used BPC above.
- **`src/pages/BpcExamChanges.tsx:121`** keeps "the VBA" — it is past tense ("the VBA … were merged into one regulator"), which your brief exempts. All the "the interview was replaced" copy on that page, plus `HomeResourceLinks.tsx:10` and `ThankYou.tsx:84`, was left intact as instructed.

### (d) History → "training builders since 2017"

`src/components/AboutAdrian.tsx:11` (credential chip) · `src/components/Footer.tsx:62` (badge) · `src/pages/About.tsx:45` + `:100` (credential card and meta description) · `src/pages/FAQ.tsx:41` · `src/pages/BuildersLicenceMelbourne.tsx:19` · `src/pages/BuilderRegistrationCourseMelbourne.tsx:192` · `index.html:29` (meta description) · `src/pages/About.tsx` stat `10+ / Years Experience` → `2017 / Training Since` · `src/pages/Contact.tsx:703` stat → `2017 / Training Builders Since`.

Left alone as instructed: building-industry experience claims (site experience, positions from carpenter to site manager) and the `10+` **form option** in both enquiry forms. Qualify Pro's own 2024 founding date does not appear anywhere on the site, so nothing needed changing there. No other business is named.

### (e) GST — inc-GST is now the headline

`src/data/courses.ts` was restructured so **ex-GST is the only money authored by hand** and every display string derives from it. This removes the class of error the sweep was cleaning up.

| Course | Headline (inc GST) | Beside it |
|---|---|---|
| Comprehensive Builder Program | **$8,794.50** | ($7,995 + GST) |
| Evening Builder Course | **$6,215** | ($5,650 + GST) |
| Private 1-on-1 Training | **$6,215** | ($5,650 + GST) |
| Carpentry Licence (DB-L) | **$4,169** | ($3,790 + GST) |
| Application Prep add-on | **+$1,606** | ($1,460 + GST) |

Verified by executing the module — all five match your figures exactly.

- The `GST_SUFFIX = "inc GST"` export is **deleted**. It was being rendered next to ex-GST figures on every price on the site, which was the mislabel.
- `priceDisplay` now means the GST-inclusive total, so all four render sites show the total as the prominent figure; the new `exGstNote` sits beside it in smaller text. Updated in `CourseCards.tsx`, `Courses.tsx` (card grid, detail header, add-on), `BuilderRegistrationCourseMelbourne.tsx` (card grid, add-on line).
- **JSON-LD:** nothing to convert. The repo has three JSON-LD blocks — `Course` and `FAQPage` in `BuilderRegistrationCourseMelbourne.tsx`, `LocalBusiness` in `index.html` — and **none carries an `offers` or `price` field**. No Offer prices were invented. If you want price-bearing `Offer` markup, that is a separate call.
- **"Save $X" maths:** no numeric savings claim exists. The only one is the add-on badge `"Discounted vs. purchasing separately"` (`courses.ts`, rendered `Courses.tsx:461`) — no figure, so no maths to break.

### (f) Referral reward → $300, no "cash"

- `src/pages/StudentDashboard.tsx` — reward total now `enrolled * REFERRAL_REWARD_AUD` (named constant, 300) instead of a bare `* 100`. Copy: "you earn a $300 referral reward".
- `supabase/functions/send-student-welcome/index.ts:76` — "you'll earn $100 cash" → "you'll earn a $300 referral reward".
- The word **"cash" appears nowhere** in `src/` or `supabase/` any more.

The mate's discount was deliberately **not** touched — see HOLD §2.5.

---

## 2. HOLD — not edited, listed for the follow-up

### 2.1 Guarantee / resit / "until you pass"
```
src/components/WhyChooseAdrian.tsx:39
src/data/courses.ts:86, :111
src/pages/Contact.tsx:705          "Resit If You Don't Pass First Time"
src/pages/Courses.tsx:158, :167, :211
src/pages/FAQ.tsx:67, :124
```
One adjacent edit for disclosure: the FAQ **question** text `"What if I fail the BPC test?"` → `"…the BPC exam?"` (`Courses.tsx`) and `"What if I don't pass the test?"` → `"…the exam?"` (`FAQ.tsx`). The guarantee **answers** are byte-for-byte untouched.

### 2.2 Class times
```
src/components/Footer.tsx:157                        9am–9pm
src/data/courses.ts:99, :100, :106                   6pm–9pm, 1 night per week
src/pages/Contact.tsx:494, :505, :506                9am–9pm 7 days; 6pm–9pm
src/pages/BuilderRegistrationCourseMelbourne.tsx:155, :188   "Evening classes"
src/pages/FAQ.tsx:70, :72                            evening classes Q&A
src/pages/Courses.tsx:93                             One evening per week (6pm–9pm)
src/pages/SuccessStoriesPage.tsx:105                 One evening per week (6pm–9pm)
```

### 2.3 Evening vs Private 1-on-1 price parity
`src/data/courses.ts:94–126` — both remain $5,650 ex-GST ($6,215 inc). The two existing "price is identical … pending Adrian's sign-off" comments are preserved. Treated as ex-GST per your instruction; still pending confirmation.

### 2.4 Payment plans
```
src/components/CourseCards.tsx:174, :183
src/pages/BuildersLicenceMelbourne.tsx:292
src/pages/BuilderRegistrationCourseMelbourne.tsx:344
src/pages/FAQ.tsx:75, :77, :140
src/pages/Courses.tsx:161, :162, :581, :584, :587
```

### 2.5 Mate's discount — returns as 15% once Adrian confirms
Left at `$100 off` everywhere, including the form hint and the admin lead email, as instructed:
```
src/pages/Contact.tsx:389                       form hint: "Enter it for $100 off"
src/components/FinalCTA.tsx:322                 form hint: "Enter it for $100 off"
src/pages/StudentDashboard.tsx:168              "They get $100 off, you earn a $300 referral reward"
supabase/functions/send-student-welcome/index.ts:76   "they'll get $100 off"
supabase/functions/send-lead-emails/index.ts:35       admin email: "REFERRAL LEAD — DISCOUNT REQUIRED"
supabase/functions/send-lead-emails/index.ts:39       admin email: "quote them $100 off"
src/components/admin/PipelineTab.tsx:149        admin badge: "REFERRAL: $100 OFF"
src/components/admin/NewLeadsTab.tsx:144        admin note: "Apply $100 off when invoicing"
```
> The last two are internal admin UI that I did not list earlier — they carry the same instruction to Adrian and will need the same 15% edit.

### 2.6 Named-student quotes — REMOVED, restore verbatim if Adrian confirms
All 13 removed site-wide as unverified testimonials. Exact text and original location below.

**`src/pages/SuccessStoriesPage.tsx`** (also removed the quote render block, lines 438–453)
- `:54` **Fauzi** — "Adrian's personalized approach helped me understand the regulations I was struggling with. The small class size meant I could ask questions without feeling rushed, and the practice tests prepared me perfectly for the BPC process. I passed first time and never looked back. Now I run my own company building elite homes - something that wouldn't have been possible without my unlimited builder registration."
- `:84` **Jordan** — "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on. His teaching style is clear and practical. I passed first time and launched my business within weeks. Now I'm doing the high-end outdoor work I always wanted to do, working with the best suppliers in Melbourne."
- `:114` **Sidhu** — "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex regulations easy to understand and gave me the confidence to pass my interview. His focus on understanding principles rather than memorizing really helped. Now I'm building new homes across Melbourne's growth corridors under my own company name."
- `:144` **Manny** — "Small classes made all the difference. I could ask questions without feeling rushed or stupid, and Adrian always took the time to explain things properly. He identified exactly where I needed to improve and focused on those areas. I passed first time and now I'm running a successful high-volume building company. Worth every dollar."
- `:174` **Ben** — "I failed on my own, but with Adrian's help I passed easily the second time. His teaching style focuses on understanding, not just memorizing answers. He was patient, supportive, and identified exactly what I needed to work on. Now I run my own renovation business doing 40+ projects a year. I'm so glad I didn't give up on my dream."

**`src/pages/About.tsx`** — the entire "What Students Say" section was removed, because all four of its items were quotes.
- `:93` **Jordan** (DB-L Carpentry Licence) — "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on."
- `:100` **Manny** (Domestic Builder - Unlimited) — "What I appreciated most was how Adrian personalized his teaching. He identified where I was weak and spent extra time helping me improve those areas."
- `:107` **Ben** (Bathroom & Kitchen Licence) — "Small class sizes made all the difference. I could ask questions without feeling stupid, and Adrian always took the time to explain things properly."
- `:114` **Fauzi** (Domestic Builder - Unlimited) — "Adrian has been on the tools, been a site manager, and been a builder. He understands the practical side of building, not just theory."

**`src/pages/Courses.tsx`** — all four per-course testimonial cards removed.
- `:78` **Fauzi** ("Now running his own building company") — "Adrian's comprehensive program gave me everything I needed. The small class size meant I got personal attention, and the 600+ practice questions were invaluable. I passed first time and now run my own building company."
- `:102` **Manny** ("Licensed builder completing 50+ homes/year") — "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex topics easy to understand, and I felt fully prepared for my interview."
- `:126` **Jordan** ("Licensed carpenter running outdoor living business") — "One-on-one training was worth every dollar. Adrian identified exactly where I was weak and we focused on those areas. The flexible schedule meant I could fit it around my work commitments."
- `:149` **Jordan** ("Licensed DB-L carpenter") — "The DB-L course was exactly what I needed. Adrian knows the carpentry trade inside out and focused on what BPC actually asks. Passed first time and now running my own carpentry business."

> **Layout consequence:** About lost a whole section and Courses lost its testimonial cards. Both pages still read fine, but they are noticeably lighter on social proof. The success stories themselves were kept.

---

## 3. Narrative detail beyond Adrian's one-liners — flagged, not cut

Adrian's source material gave one outcome line per student. Everything else on the page is unverified. Not cut, per instruction.

| Student | Adrian confirmed | On the site, unconfirmed |
|---|---|---|
| **Fauzi** | $15M+/yr building company | "Elite Homes Melbourne"; "Elite custom homes"; Toorak, Brighton, Armadale; "employs multiple teams"; "Licensed 5 years ago". **The $15M+/yr figure appears nowhere on the site.** |
| **Jordan** | Carpentry licence, outdoor living business | "Premium Outdoor Living"; "High-end installations"; "partnering with top suppliers"; "Licensed 3 years ago" |
| **Sidhu** | Domestic builder, new homes in Melbourne's north and west | "Sidhu Building Constructions"; "dozens of homes"; "energy-efficient homes"; "Licensed 4 years ago" |
| **Manny** | 50+ homes/yr | volume matches ✓ — but "Manny's Building Company"; "Licensed 5 years ago" |
| **Ben** | 40+ renos/yr | volume matches ✓ — but "Ben's Renovations"; kitchen/bathroom, inner suburbs; timeframe (see below) |

Also flagged:
- **Internal inconsistency:** Ben is "Licensed 4 years ago" on the homepage (`src/components/SuccessStories.tsx:49`) but `yearsAgo: "3 years ago"` on the success stories page (`src/pages/SuccessStoriesPage.tsx:150`).
- The homepage story strip (`src/components/SuccessStories.tsx`) carries its own third-person blurbs for Fauzi, Jordan, Manny and Ben, with the same unverified business detail. **Sidhu is missing from it entirely.**
- All five `currentBusiness` names look like descriptive placeholders rather than registered trading names.

---

## 4. Other decisions worth a second opinion

1. **"BPC test" → "BPC exam" terminology.** Your brief did not ask for this, but leaving "test" next to the new exam copy read as two different assessments. Changed in headings, FAQ questions and one `courses.ts` inclusion. Easy to revert if you want "test" kept.
2. **Success-story narratives** had their interview-prep clauses cut per your call, but the surrounding history was kept. Those students genuinely did sit interviews pre-2026, so the pages now describe their journeys without saying what the interview prep did for them. Worth a read-through for tone.
3. **`95% pass rate`** is out of scope and untouched everywhere. It is always attributed to "Qualify Pro's own student records". Mentioning it only because it is the last big unverified number left on the site.
4. **`highlights` in `CourseCards.tsx` index into `courses.ts` inclusions by position** — removing a bullet silently changes which ones a card shows. I checked all four; the only shift is the carpentry card, which previously highlighted "BPC interview preparation" and now shows "Technical knowledge assessment". That is the desired outcome, but the index coupling is fragile and worth replacing with keys.
5. **`.env` is committed to git** and is not in `.gitignore`. Unrelated to this sweep, but I hit it while scanning and it should probably be untracked.

---

## 5. Verification

```
bun run build    ✓ built in 2.40s
bun run lint     14 problems (7 errors, 7 warnings) — identical to HEAD baseline;
                 none in files this sweep touched
bunx tsc -b      no syntax or type errors introduced
prices           executed src/data/courses.ts — all 5 totals match the brief
```

Not merged. Branch `claims-sweep-2026-09`.
