# /bpc-exam-changes — source check log

The BPC exam guide (`src/pages/BpcExamChanges.tsx`) states regulatory facts, so each one has to
trace to a regulatory source rather than to Adrian (HANDOFF §5 item 15). This file records what was
checked, when, and against which page, so the next edit can re-check quickly.

**Last full check: 21 October 2026** (`LAST_REVIEWED` in the page). Every page below was read
directly; the wording that matters is noted in short.

## Sources and what the page takes from each

| Key in `SOURCES` | Page (last updated) | Facts used |
|---|---|---|
| `launch` | BPC news, *New BPC putting consumers first from day one* (1 Jul 2025) | VBA became the BPC on 1 Jul 2025; brought together the VBA, DBDRV and the VMIA's domestic building insurance arm |
| `reforms` | BPC, *Licensing and registration reforms* (30 Jun 2026) | Roll-out began January 2026 with DB-U exams; 40 → 7 documents, stated for DB-U; flow-down to all domestic and commercial builder classes "by the end of March 2026"; single exam replaces the interview and the plan-based exam; reason: reduce human bias and protect against corruption; ACER; exams tailored to each class; questions randomised and changed frequently |
| `exams` | BPC, *Building exams* (28 Aug 2026) | Question formats (incl. image select); class list; notified by email; 24/7 within the timeframe; in person at Head Office "while we resolve technical issues"; BPC laptop and supervisor in person; Janison-Proctortrack; desktop and room recorded; rules lists; "(Hard copy materials are allowed for in-person exams)"; transitional in-person option for hardcopy holders; breach consequences; adjustments within three business days; Australian Standards are the test taker's cost; all exams online by June 2026 |
| `examsFaq` | BPC, *Building exams: FAQs* (30 Jun 2026) | 1 or 2 hours, set by class plus qualifications, building experience, employment history and technical referees; passing standard; timer, flags, progress grid; onboarding 8–24 h, allow up to 3 days; computer requirements and admin rights; rescheduling; 48-hour withdrawal; ID check, environment scan and exam recorded; results by email; likely refusal on fail, internal review, new application to re-sit; missed window with written evidence; ID kept 12 months for future attempts, recording 6 months for auditing and appeals; "must complete your exam within the allotted time" |
| `testTakerGuide` | BPC, *Applicant test taker guide* (30 Jun 2026) | "No exam results are shown"; result advised by email; onboarding steps (system check, face scan, photo ID — licence or passport, desk and room scans); admin install |
| `applications` | BPC, *Builder registration* (modified 19 Oct 2026) | From 19 Oct 2026 **some** application processes are online only; manual payments ending; BPC Portal |
| `eligibility` | BPC, *Registration requirements and eligibility* (30 Jun 2026; the URL's "eligibiity" typo is the BPC's) | Cert IV is not a prescribed course for any class, partly meets domestic knowledge requirements, may trigger an additional exam; experience rules (supervised, paid, technical/supervision/contractual, last seven years; owner-builder and training-course experience "may disregard"); "may be required to complete an exam or interview depending on the class" |
| `domesticWork` | BPC info sheet, *What is domestic building work?* (6 Jul 2026) | DB-U prescribed qualifications (CPC50210/CPC50220 diploma, Holmesglen and Deakin degrees); DB-U "At least 3 years of practical experience" (matches `UNLIMITED_MINIMUM_YEARS`) |
| `fees` | BPC, *Registration fees* (25 Aug 2026) | 2026–27 individual fees $1,039.00 / $831.20 application, $519.50 / $415.50 annual; company fees higher ($1,454.80 / $1,163.70, $727.30 / $581.70); GST-exempt; no exam fee listed |
| `engaging` | BPC, *Engaging a builder* (30 Jun 2026) | Registered builder needed for work worth more than $10,000, counting labour, materials and GST |
| `cav` | Consumer Affairs Victoria, *About builders, tradespeople and other building practitioners* (12 Dec 2025) | Work needing a building permit requires a registered practitioner regardless of value |
| `hia` | HIA, *Building and Plumbing Commission online exams* (15 Jul 2026) | Attributed to HIA in the copy: DB-U exam has 100 questions from a pool of about 1,000 and two hours; a 50-question, 60-minute exam "will be available for certain applicants" |

## The class pages (checked 22 October 2026)

`src/pages/DomesticBuilderUnlimited.tsx` (`/domestic-builder-registration/unlimited`) and
`src/pages/DomesticBuilderLimited.tsx` (`/domestic-builder-registration/limited`) cite the same
`SOURCES` (now in `src/data/bpc-sources.ts`). `domesticWork`, `eligibility` and `exams` were re-read
on 22 Oct; the rest are as checked for the guide on 21 Oct.

| Key | What the class pages take from it |
|---|---|
| `domesticWork` | DB-U scope ("all components of domestic building work for the construction, renovation, improvement or maintenance of a home (class 1, 2, and 4 buildings, and associated class 10 buildings)"), its three prescribed qualifications, "At least 3 years of practical experience" and its list of general competencies (permits, certification, quotes, major domestic building contracts, planning, workers and subcontractors, site safety, supervising to the NCC, Australian Standards and local authority requirements); the limited classes and examples of them; carpentry scope ("carpentry work for homes and associated class 10 structures … homes, carports, garages, pergolas, decks, verandas and similar structures"), Certificate III in Carpentry (CPC30211/CPC30220) plus CPCCBC4026(A), CPCCBC4005(A), CPCCBC4003(A)/CPCCBC4003, and the extra carpentry experience (fixing strip flooring; formwork for stairs and ramps, and for suspended slabs, columns, beams and walls) |
| `eligibility` | Cert IV: not prescribed for any class, "meets parts of the knowledge requirements for Domestic Builder classes, but not all", may trigger an additional exam; experience rules (supervised, paid, technical/supervision/contractual, last seven years; owner-builder and training-course experience may be disregarded; evidence of paid work); certified copies; "fit and proper" (declaration, criminal history check); "exam or interview depending on the class". The page shows no last-updated date on 22 Oct. |
| `exams` | "Domestic Builder (limited to carpentry)" is among the classes that may need the online exam; the BPC tells applicants if they need one; exams currently held in person at Head Office |
| `reforms`, `examsFaq`, `applications`, `fees`, `engaging` | As for the guide above: single exam from January 2026 starting with DB-U; 1 or 2 hours and what sets the length; some applications online only from 19 Oct 2026; 2026–27 fees ($1,039.00 / $519.50 DB-U, $831.20 / $415.50 DB-L, GST-exempt, no exam fee listed); the $10,000 threshold |

**HOLD:** the carpentry page states no experience figure. It uses `CARPENTRY_EXPERIENCE_SUMMARY` and
says the BPC's info sheet sets the minimum, with a link. If Michael decides to show the BPC's own
figure (at least 3 years for carpentry), change it in `src/data/eligibility.ts` and both places
follow.

## Open items

- **Hard copies, in person.** Both BPC pages allow them during the transitional period. The exams
  page (28 Aug) says "(Hard copy materials are allowed for in-person exams)"; the FAQ page (30 Jun)
  says hard copy reference material is not allowed in the online exam, but that applicants with
  their own hard copies may "attend an exam at a BPC location … for a transitional period", after
  which that option ends. Re-check when the transition ends and update the guide's open-book
  paragraph, the hardcopy section and FAQs 3 and 6 together. (An earlier draft wrongly said the two
  pages contradict each other; the second independent review caught it.)
- **In-person notice.** The "conducted in-person at Head Office" notice was live on 21 Oct 2026. When
  it goes, update the guide's amber box, FAQ answer and "When" paragraph together, and the exam
  section of both class pages.
- **HIA figures are HIA's**, scoped to DB-U. The BPC itself publishes no question count or pass mark.
- **"Licence" vs "registration" (for Adrian).** The FAQ now says what people call a builder's licence
  is building practitioner registration with the BPC, so it no longer contradicts the site's
  "Builder's Licence" headings. Adrian should read it once and say if he wants different wording.
- **The $10,000 threshold** comes from the BPC's *Engaging a builder* page and the permit rule from
  Consumer Affairs Victoria. The same BPC page says "Each builder category and class has specific
  requirements for when a practitioner must register with the BPC", so don't extend either rule to
  specific classes without a source.
- **"Exam or interview".** The eligibility page still says applicants "may be required to complete
  an exam or interview depending on the class of registration", so the guide scopes "no interview"
  to Domestic Builder (Unlimited) and says the change is extending to other classes; the carpentry
  page quotes the same sentence. Re-check when the BPC says the roll-out is complete, and update the
  guide and both class pages together.
