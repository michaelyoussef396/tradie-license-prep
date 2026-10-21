import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertTriangle, Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";
import { UNLIMITED_MINIMUM_YEARS } from "@/data/eligibility";

/**
 * BPC exam guide. Every regulatory fact on this page comes from the BPC's own
 * pages, or from HIA or Consumer Affairs Victoria where the copy says so — see
 * SOURCES, which also render at the foot of the page, and the check log in
 * .ai/bpc-guide-sources.md. Re-check them and bump LAST_REVIEWED whenever the
 * page is edited: this topic changes month to month.
 */
const LAST_REVIEWED = "21 October 2026";
const SOURCE = "bpc-exam-changes";

const SOURCES = {
  exams: {
    label: "BPC — Building exams (last updated 28 August 2026)",
    href: "https://www.bpc.vic.gov.au/builders/building-exams",
  },
  examsFaq: {
    label: "BPC — Building exams: frequently asked questions (last updated 30 June 2026)",
    href: "https://www.bpc.vic.gov.au/builders/building-exams/building-exams-frequently-asked-questions",
  },
  reforms: {
    label: "BPC — Licensing and registration reforms (30 June 2026)",
    href: "https://www.bpc.vic.gov.au/resource-hub/industry-updates/licensing-and-registration-reforms",
  },
  applications: {
    label: "BPC — Builder registration applications (notice dated 19 October 2026)",
    href: "https://www.bpc.vic.gov.au/builders/registration",
  },
  eligibility: {
    label: "BPC — Registration requirements and eligibility (last updated 30 June 2026)",
    href: "https://www.bpc.vic.gov.au/builders/registration/registration-requirements-and-eligibiity",
  },
  domesticWork: {
    label: "BPC — What is domestic building work? (last updated 6 July 2026)",
    href: "https://www.bpc.vic.gov.au/resource-hub/info-sheets/What-is-domestic-building-work",
  },
  fees: {
    label: "BPC — Registration fees (last updated 25 August 2026)",
    href: "https://www.bpc.vic.gov.au/builders/registration/registration-fees",
  },
  launch: {
    label: "BPC — New BPC putting consumers first from day one (1 July 2025)",
    href: "https://www.bpc.vic.gov.au/news/2025/new-bpc-putting-consumers-first-from-day-one",
  },
  testTakerGuide: {
    label: "BPC — Applicant test taker guide (last updated 30 June 2026)",
    href: "https://www.bpc.vic.gov.au/builders/building-exams/applicant-test-taker-guide",
  },
  engaging: {
    label: "BPC — Engaging a builder (last updated 30 June 2026)",
    href: "https://www.bpc.vic.gov.au/home-owners/before-you-start-building/engaging-a-builder",
  },
  cav: {
    label:
      "Consumer Affairs Victoria — About builders, tradespeople and other building practitioners (last updated 12 December 2025)",
    href: "https://www.consumer.vic.gov.au/housing-and-accommodation/building-and-renovating/plan-and-manage-your-building-project/about-builders-tradespeople-and-other-building-practitioners",
  },
  hia: {
    label: "HIA — Building and Plumbing Commission online exams (15 July 2026)",
    href: "https://hia.com.au/resources-and-advice/managing-your-business/managing-compliance/articles/building-and-plumbing-commission-online-examinations",
  },
} as const;

type SourceKey = keyof typeof SOURCES;

// Each answer's sources render as links after it on the page; the FAQPage
// JSON-LD carries the answer text only.
const FAQS: { q: string; a: string; src: SourceKey[] }[] = [
  {
    q: "Do you still need a builder's licence in Victoria?",
    a: "Yes, though the official name is registration. What most people call a builder's licence is building practitioner registration with the Building and Plumbing Commission (BPC). The BPC says home owners need a registered builder for domestic building work worth more than $10,000, counting labour, materials and GST. Consumer Affairs Victoria adds that work needing a building permit requires a registered practitioner whatever its value.",
    src: ["engaging", "cav"],
  },
  {
    q: "How do you become a registered builder in Victoria?",
    a: "Apply to the BPC in your chosen registration class, meet the qualification and experience requirements, submit your supporting documents, and pass the exam if the BPC asks you to sit one. Under the reformed process this is a single exam rather than a face-to-face interview plus a plan-based exam. From 19 October 2026 the BPC says some building application processes are online only, through the BPC Portal or its existing online services.",
    src: ["eligibility", "reforms", "applications"],
  },
  {
    q: "What is the BPC builder registration exam?",
    a: "From January 2026 the BPC began replacing the face-to-face interview and the plan-based exam with a single exam, starting with Domestic Builder (Unlimited) and extending to other classes. It is delivered through Janison-Proctortrack with proctoring and uses multi-format questions (multiple choice, drag and drop, reorder, true/false and image select). It is open book: online, you use only the permitted reference materials inside the exam, and the BPC's exams page says hard copy materials are allowed for in-person exams. That page also currently says these exams are being conducted in person at BPC Head Office while technical issues are resolved.",
    src: ["reforms", "exams"],
  },
  {
    q: "How long is the BPC exam?",
    a: "The BPC says exams are either 1 or 2 hours. It sets the length based on the class you're applying for and factors such as your qualifications, building experience, employment history and technical referees. Answers submit automatically when time runs out.",
    src: ["examsFaq"],
  },
  {
    q: "How many questions are in the BPC exam, and what is the pass mark?",
    a: "The BPC does not publish a question count or a fixed pass mark. It says it sets a passing standard that reflects minimum competence, every exam version is held to the same standard, and the pass mark adjusts to the difficulty of the questions. HIA reports that the Domestic Builder (Unlimited) exam has 100 questions drawn from a pool of about 1,000, with two hours to complete it, and that a shorter 50-question, 60-minute exam is available for certain applicants.",
    src: ["examsFaq", "hia"],
  },
  {
    q: "Is the BPC exam open book?",
    a: "Yes, with conditions. Sitting online, you can only use the permitted reference materials, viewed inside the exam; your own notes and other printed material, search engines and AI tools are not allowed. For in-person exams, the BPC's exams page says hard copy materials are allowed, although its FAQ page still says hard copy reference material is not, so confirm with the BPC what you can bring. To use Australian Standards you need your own active subscription or purchased online version, and your login for it during the exam.",
    src: ["exams", "examsFaq"],
  },
  {
    q: "Is a Certificate IV in Building and Construction enough to get registered?",
    a: "Not on its own. The BPC says the Certificate IV in Building and Construction (Building) is not a prescribed course for any registration class under the Building Regulations 2018. It partly meets the knowledge requirements for domestic builder classes, and applicants without the prescribed course for their class may be asked to sit an additional BPC exam. For Domestic Builder (Unlimited) the prescribed qualification is a Diploma of Building and Construction (Building) (CPC50210 or CPC50220) or one of two specified construction management degrees.",
    src: ["eligibility", "domesticWork"],
  },
  {
    q: "What happens if you fail the BPC builder registration exam?",
    a: "Your application for registration is likely to be refused and you will be notified in writing. You can seek an internal review of that decision. To sit another exam you must lodge a new application for registration.",
    src: ["examsFaq"],
  },
  {
    q: "What if I have dyslexia or need adjustments for the exam?",
    a: "Contact the BPC within three business days of receiving your exam invitation to request reasonable adjustments — by email to onlineexams@bpc.vic.gov.au or by phone on 1300 067 088.",
    src: ["exams"],
  },
  {
    q: "How much does builder registration cost in Victoria?",
    a: "For 2026–27 the BPC lists, for an individual, a registration application fee of $1,039.00 for Domestic Builder (Unlimited) and $831.20 for Domestic Builder (Limited) or Commercial Builder (Unlimited), with annual fees of $519.50 and $415.50 respectively once registered. Company fees are higher. The fees are GST-exempt and the fee page lists no separate exam fee. Budget too for your own online Australian Standards access for the exam, and domestic building insurance once you are registered and working.",
    src: ["fees", "exams"],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Cta = ({ id }: { id?: string }) => (
  <div id={id} className="my-12 max-w-xl">
    <HeroEnquiryForm source={SOURCE} title="Check if you're eligible — free, 2 minutes" />
  </div>
);

const H2 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="mt-14 mb-4 scroll-mt-32 text-2xl sm:text-3xl font-bold text-slate-900">
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-8 mb-3 text-xl font-bold text-slate-900">{children}</h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-base sm:text-lg leading-relaxed text-slate-700">{children}</p>
);

const UL = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="mb-5 list-disc space-y-2 pl-6 text-base sm:text-lg text-slate-700">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

/** Inline citation to one of SOURCES. */
const Src = ({ k }: { k: SourceKey }) => (
  <a
    href={SOURCES[k].href}
    target="_blank"
    rel="noopener noreferrer"
    className="whitespace-nowrap text-sm text-blue-700 underline underline-offset-2"
  >
    (source)
  </a>
);

const CONTENTS = [
  { id: "what-changed", label: "What changed" },
  { id: "applications-online", label: "Some applications are now online only" },
  { id: "in-person", label: "Exams are being held in person" },
  { id: "exam-format", label: "What the exam is like" },
  { id: "before-the-exam", label: "Before exam day" },
  { id: "rules", label: "The rules" },
  { id: "results", label: "Results, failing and re-sitting" },
  { id: "cert-iv", label: "Is a Cert IV enough?" },
  { id: "faq", label: "Common questions" },
];

const BpcExamChanges = () => {
  return (
    <PageTransition>
      <Seo
        title="BPC Exam 2026: Format, Rules & What's Changed | Qualify Pro"
        description="How the BPC builder registration exam works in 2026: 1 or 2 hours, open-book rules, ID checks, in-person sittings and what happens if you fail."
        path="/bpc-exam-changes"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="container mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            The BPC exam has replaced the interview. Here's what that actually means.
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last reviewed: {LAST_REVIEWED} · checked against the BPC's own pages and the other
            sources listed at the bottom
          </p>

          <div className="mt-8">
            <P>
              If you've been putting off your builder registration, the goalposts have moved — and
              mostly in your favour.
            </P>
            <P>
              The face-to-face interview is gone. The separate plan-based exam is gone. Both have
              been replaced by a single exam, and for Domestic Builder (Unlimited) the supporting
              documents you submit have dropped from 40 to 7.
            </P>
            <P>
              If you started an application under the old system, or you've been told to prepare for
              an interview, this page explains where things stand.
            </P>
          </div>

          <nav aria-label="On this page" className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              On this page
            </p>
            <ol className="list-decimal space-y-1 pl-5 text-base text-slate-700">
              {CONTENTS.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="text-blue-700 underline underline-offset-2">
                    {c.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Cta id="eligibility-form" />

          <H2 id="what-changed">What changed</H2>
          <P>
            On 1 July 2025, the Victorian Building Authority became the{" "}
            <strong>Building and Plumbing Commission (BPC)</strong>. That wasn't just a name change
            — the BPC brought together the VBA, Domestic Building Dispute Resolution Victoria and the
            domestic building insurance arm of the VMIA. <Src k="launch" />
          </P>
          <P>
            In January 2026, the BPC started rolling out a new way of assessing applicants,
            beginning with <strong>Domestic Builder (Unlimited)</strong>. <Src k="reforms" />
          </P>
          <p className="mb-2 font-semibold text-slate-900">Old system:</p>
          <UL
            items={[
              "A face-to-face interview with assessors",
              "A separate plan-based exam",
              "40 supporting documents for Domestic Builder (Unlimited)",
            ]}
          />
          <p className="mb-2 font-semibold text-slate-900">New system:</p>
          <UL
            items={[
              "One exam, tailored to your registration class",
              "No interview",
              "7 supporting documents for Domestic Builder (Unlimited)",
            ]}
          />
          <P>
            The BPC planned to extend the reduced paperwork to all domestic and commercial builder
            classes by the end of March 2026. <Src k="reforms" />
          </P>
          <P>
            The BPC's stated reason for removing the interview is to reduce human bias and protect
            against corruption. In practical terms: you're no longer being judged in a room by a
            person. You're answering questions against a standard. The BPC designed the new Domestic
            Builder (Unlimited) exam with the{" "}
            <strong>Australian Council for Educational Research (ACER)</strong>. <Src k="reforms" />
          </P>

          <H3>Which classes sit the new exam</H3>
          <P>
            The BPC is transitioning gradually. It began with Domestic Builder (Unlimited) in January
            2026 <Src k="reforms" /> and said all exams would be available online by June 2026.{" "}
            <Src k="exams" />
          </P>
          <P>
            The classes listed include Domestic Builder (Unlimited), the limited Domestic Builder
            classes — carpentry, framing, footings and slabs, cladding, roof tiling, pools and spas,
            retaining walls, waterproofing and more — Commercial Builder classes, Demolisher classes,
            Building Inspector (pool safety) and Building Designer. <Src k="exams" />
          </P>
          <P>
            <strong>You don't opt in.</strong> The BPC will tell you by email if you need to sit an
            exam, and the timeframe you have to complete it. <Src k="exams" />
          </P>

          <H2 id="applications-online">Some applications are now online only</H2>
          <div className="my-6 rounded-xl border-l-4 border-blue-600 bg-blue-50 p-6">
            <div className="mb-3 flex items-center gap-2 font-bold text-blue-900">
              <Info className="h-5 w-5" />
              New from 19 October 2026
            </div>
            <p className="text-base leading-relaxed text-blue-950">
              The BPC says that from 19 October 2026 some building application processes are online
              only — through the BPC Portal or its existing online services — and manual payment
              methods are no longer available. Apply and pay online.{" "}
              <Src k="applications" />
            </p>
          </div>

          <H2 id="in-person">Important — exams are being held in person</H2>
          <div className="my-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6">
            <div className="mb-3 flex items-center gap-2 font-bold text-amber-900">
              <AlertTriangle className="h-5 w-5" />
              Live situation — check before exam day
            </div>
            <p className="mb-4 text-base leading-relaxed text-amber-950">
              The BPC's exams page (last updated 28 August 2026) says building practitioner online
              examinations are <strong>being conducted in person at BPC Head Office</strong> while
              technical issues are resolved, and that affected applicants are being contacted
              directly. The notice was still there when we checked on {LAST_REVIEWED}.{" "}
              <Src k="exams" />
            </p>
            <p className="mb-4 text-base leading-relaxed text-amber-950">
              In person, you sit on a BPC-provided laptop and a BPC supervisor helps you get started.{" "}
              <Src k="exams" /> If you've been preparing on the assumption you'll sit at your kitchen
              table, check your email and confirm your arrangements before exam day.
            </p>
            <p className="text-base leading-relaxed text-amber-950">
              This may change. If you're mid-application and unsure where you stand, contact the BPC
              on 1300 067 088 or onlineexams@bpc.vic.gov.au — or get in touch with us and we'll help
              you work out where you sit.
            </p>
          </div>

          <H2 id="exam-format">What the exam is actually like</H2>
          <P>
            <strong>Format.</strong> It's not an essay and it's not a viva. Questions are
            multi-format — multiple choice, drag and drop, reorder, true/false and image select.{" "}
            <Src k="exams" /> Exams are tailored to the knowledge and experience each registration
            class requires, and the questions are randomised and changed frequently.{" "}
            <Src k="reforms" />
          </P>
          <P>
            <strong>Length.</strong> 1 or 2 hours — your notification letter confirms which. The BPC
            sets the length based on the class you're applying for and factors such as your
            qualifications, building experience, employment history and technical referees.{" "}
            <Src k="examsFaq" />
          </P>
          <P>
            <strong>Questions and pass mark.</strong> The BPC doesn't publish a question count or a
            fixed pass mark. It sets a passing standard that reflects minimum competence; every exam
            version is held to the same standard, and the pass mark adjusts to the difficulty of the
            questions. <Src k="examsFaq" /> HIA reports that the Domestic Builder (Unlimited) exam
            has 100 questions drawn from a pool of about 1,000, with two hours to complete it, and
            that a shorter 50-question, 60-minute exam is available for certain applicants.{" "}
            <Src k="hia" />
          </P>
          <P>
            <strong>Delivered by.</strong> Janison-Proctortrack. <Src k="exams" /> Your ID check
            during onboarding, the scan of your room and the exam itself are recorded through your
            webcam and microphone <Src k="examsFaq" />, along with your computer desktop.{" "}
            <Src k="exams" />
          </P>
          <P>
            <strong>Open book — with conditions.</strong> Sitting online, you can use the BPC's
            permitted reference materials, but only the online versions accessible inside the exam,
            plus the exam's own Resources, Calculator and Notes functions. No printed notes. No cheat
            sheets. No quick-reference guides you've made yourself. In person it's different: the
            BPC's exams page says hard copy materials are allowed for in-person exams, although its
            FAQ page still says hard copy reference material is not, so confirm with the BPC what
            you can bring. <Src k="exams" /> <Src k="examsFaq" />
          </P>
          <P>
            <strong>During the exam.</strong> A countdown timer sits in the top left of every
            screen. You can flag questions and use a progress grid to go back to anything answered,
            unanswered or flagged — right up until you press Finish or time runs out.{" "}
            <Src k="examsFaq" />
          </P>
          <P>
            <strong>When.</strong> Sat remotely, it's available 24/7 within the timeframe the BPC
            gives you. If you're sitting in person, the BPC sets the date, time and location.{" "}
            <Src k="exams" />
          </P>
          <P>
            <strong>Ending.</strong> You must finish within the allotted time: if you haven't, your
            answers submit automatically when it runs out. <Src k="examsFaq" /> If you need
            adjustments to how you sit the exam, ask before it (see below).
          </P>

          <H3>The cost nobody mentions</H3>
          <P>
            To access the <strong>Australian Standards</strong> during your exam, you need an active
            subscription or a purchased online version. The BPC is explicit that this is the test
            taker's responsibility, not theirs. <Src k="exams" />
          </P>
          <ol className="mb-5 list-decimal space-y-2 pl-6 text-base sm:text-lg text-slate-700">
            <li>Budget for it. It's a real cost on top of your application fee.</li>
            <li>
              Sort it out early and <strong>know your login before exam day</strong> — you have to
              enter those credentials mid-exam to get in.
            </li>
          </ol>

          <H2 id="before-the-exam">Before exam day</H2>
          <H3>Allow time for onboarding</H3>
          <P>
            Before you can sit, you go through onboarding in Janison-Proctortrack: a system check, a
            face scan, government photo ID (licence or passport), and desk and room scans. Approval
            usually takes 8 to 24 hours, but the BPC says to allow{" "}
            <strong>up to three days</strong> — and you can't start the exam until it's approved.
            Applicants who leave onboarding to the last minute run out of runway.{" "}
            <Src k="examsFaq" />
          </P>
          <H3>Check your computer</H3>
          <UL
            items={[
              "A laptop or desktop with a keyboard and mouse, a working webcam and microphone, and high-speed internet",
              "Tablets, Chromebooks and phones don't qualify",
              "You need administrator rights to install Proctortrack — a locked-down work laptop can fail (the BPC FAQ mentions an \"Error 404\")",
              <>
                No suitable computer? Email the BPC to arrange an alternative.{" "}
                <Src k="examsFaq" /> <Src k="testTakerGuide" />
              </>,
            ]}
          />
          <H3>Need a different date?</H3>
          <P>
            Email onlineexams@bpc.vic.gov.au within 3 days of your notification. The BPC says new
            dates should generally fall within two weeks of the timeframe you were given, unless
            there are extenuating circumstances, and you may need to provide evidence. If you decide
            not to proceed, tell the BPC at least 48 hours before your scheduled exam.{" "}
            <Src k="examsFaq" />
          </P>

          <H2 id="rules">The rules, in plain English</H2>
          <p className="mb-2 font-semibold text-slate-900">During the exam you must:</p>
          <UL
            items={[
              "Stay plugged into power",
              "Hold a stable internet connection",
              "Keep webcam, speakers and microphone on",
              "Stay seated and in view of the camera — if you stand to stretch, stay in frame",
              "Be alone in the room",
              "Have only one browser open",
            ]}
          />
          <P>
            <em>On your desk you may have:</em> a drink, reading glasses, and medication such as an
            inhaler or pain relief. That's it. Everything else comes off the desk.{" "}
            <Src k="exams" />
          </P>
          <p className="mb-2 font-semibold text-slate-900">Not permitted:</p>
          <UL
            items={[
              "Talking — including reading questions out loud to yourself",
              "Help from anyone else",
              "Printed material, including notes you've prepared (online sittings — see below for in-person)",
              "Google, Bing or any search engine",
              "Any AI tool such as ChatGPT",
              "Phones, watches, earbuds, headphones, tablets, electronic notebooks",
              "Your own calculator — there's one built into the exam",
              "A second monitor",
              "Recording, screenshotting or writing down questions, during or after",
            ]}
          />
          <P>
            <strong>If you breach the rules,</strong> you may be required to re-sit in person,
            undergo further assessment, or have your application refused. <Src k="exams" />
          </P>

          <H3>If you already have hardcopy reference materials</H3>
          <P>
            There's a transitional arrangement. Applicants who already hold hardcopy permitted
            reference materials can ask to sit the exam in person at a BPC venue — email
            onlineexams@bpc.vic.gov.au. The BPC's exams page says hard copy materials are allowed for
            in-person exams. In-person places are limited, so this can delay your exam being
            scheduled. <Src k="exams" />
          </P>

          <H3>If you need adjustments</H3>
          <P>
            If you need reasonable adjustments to how you sit the exam, contact the BPC within{" "}
            <strong>three business days</strong> of receiving your exam invitation, by email or on
            1300 067 088. <Src k="exams" />
          </P>

          <H2 id="results">Results, failing and re-sitting</H2>
          <P>
            You won't see a result on screen — the BPC emails it to you.{" "}
            <Src k="testTakerGuide" /> If you pass, the email tells you the next steps in your
            assessment. <Src k="examsFaq" />
          </P>
          <P>
            If you don't meet the required standard, your application is likely to be refused, and
            you'll be notified in writing. You can seek an internal review of that decision.{" "}
            <strong>
              To sit again, you need to lodge a new application for registration.
            </strong>{" "}
            It isn't a free re-sit. <Src k="examsFaq" />
          </P>
          <P>
            If you missed the exam window and there were exceptional circumstances, you can ask for
            another opportunity — the BPC may require written evidence. <Src k="examsFaq" />
          </P>
          <P>
            That's the case for preparing properly the first time rather than treating the exam as
            something you'll figure out on the day. (The BPC keeps your ID for 12 months to support
            any future exam attempts, and your exam recording for 6 months for auditing and appeals.){" "}
            <Src k="examsFaq" />
          </P>

          <H2 id="cert-iv">Is a Cert IV enough to get registered?</H2>
          <P>
            Not on its own. The BPC says the{" "}
            <strong>Certificate IV in Building and Construction (Building)</strong> is not a
            prescribed course for any registration class under the Building Regulations 2018. It
            partly meets the knowledge requirements for domestic builder classes, and applicants
            without the prescribed course for their class may be asked to sit an{" "}
            <strong>additional BPC exam</strong>. <Src k="eligibility" />
          </P>
          <P>
            For Domestic Builder (Unlimited), the prescribed qualification is a Diploma of Building
            and Construction (Building) (CPC50210 or CPC50220), or one of two specified construction
            management degrees, and the BPC's info sheet asks for at least {UNLIMITED_MINIMUM_YEARS}{" "}
            years of practical experience. <Src k="domesticWork" />
          </P>
          <P>
            The BPC says experience should be supervised by a registered building practitioner, paid
            (employment or contracting), cover technical, supervision and contractual work, and have
            been gained within the last seven years. It says not to rely on owner-builder experience
            or experience from training courses, which it may disregard. <Src k="eligibility" />
          </P>

          <H2>Where we fit</H2>
          <P>We're not an RTO and we don't run six-week Zoom courses.</P>
          <P>
            Qualify Pro is face-to-face mentorship in small groups, in Melbourne, run by a
            registered building practitioner who has been through the system. You're taken through
            what the assessment actually expects, using your own experience and your own jobs as the
            material — not a generic slide deck.
          </P>
          <P>
            <Link
              to="/builder-registration-course-melbourne"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              See how the builder registration course works →
            </Link>
          </P>

          <Cta />

          <H2 id="faq">Common questions</H2>
          {FAQS.map(({ q, a, src }) => (
            <div key={q}>
              <H3>{q}</H3>
              <P>
                {a}{" "}
                {src.map((k) => (
                  <span key={k}>
                    <Src k={k} />{" "}
                  </span>
                ))}
              </P>
            </div>
          ))}

          <H2>Not sure where your application stands?</H2>
          <P>
            If you started under the old system, or you've been told to prepare for an interview
            that may no longer happen, we'll help you work out where you actually sit — no charge,
            no obligation.
          </P>

          <Cta />

          <section aria-labelledby="sources" className="mt-16 border-t border-slate-200 pt-8">
            <h2 id="sources" className="mb-3 text-lg font-bold text-slate-900">
              Sources
            </h2>
            <p className="mb-3 text-sm text-slate-500">
              Checked {LAST_REVIEWED}. The BPC updates these pages often — always confirm with the
              BPC before acting.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {Object.values(SOURCES).map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline underline-offset-2"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default BpcExamChanges;
