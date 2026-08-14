import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";

const LAST_REVIEWED = "14 August 2026";
const SOURCE = "bpc-exam-changes";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you still need a builder's licence in Victoria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Victoria does not issue builders licences. You apply for building practitioner registration through the Building and Plumbing Commission. Registration is required to carry out domestic building work over the prescribed value, or to advertise and contract as a builder in Victoria.",
      },
    },
    {
      "@type": "Question",
      name: "How do you become a registered builder in Victoria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apply to the Building and Plumbing Commission in your chosen registration class, meet the qualification and experience requirements, submit your supporting documents, and pass the required exam. Under the reformed process this is a single online exam rather than a face-to-face interview plus a plan-based exam, and 7 supporting documents rather than 40.",
      },
    },
    {
      "@type": "Question",
      name: "What is the new BPC builder registration exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From January 2026 the BPC replaced the face-to-face interview and the plan-based exam with a single exam, starting with Domestic Builder (Unlimited) and extending to other classes. It is delivered online through Janison-Proctortrack with remote proctoring, uses multi-format questions including multiple choice, drag and drop, reorder, true/false and image select, and is open book using permitted online reference materials only.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if you fail the BPC builder registration exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you do not meet the required standard your application for registration may be refused and you will be notified in writing. If your application is refused, you must lodge a new application for registration to have the opportunity to sit another exam.",
      },
    },
  ],
};

const Cta = ({ id }: { id?: string }) => (
  <div id={id} className="my-12 max-w-xl">
    <HeroEnquiryForm source={SOURCE} title="Check if you're eligible — free, 2 minutes" />
  </div>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-14 mb-4 text-2xl sm:text-3xl font-bold text-slate-900">{children}</h2>
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

const BpcExamChanges = () => {
  return (
    <PageTransition>
      <Seo
        title="BPC Exam Changes 2026 | What Victorian Builders Need to Know"
        description="The BPC has replaced the face-to-face interview and plan-based exam with a single online exam. What changed, what the exam involves, and what it means if you're mid-application."
        path="/bpc-exam-changes"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="container mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            The BPC has changed how you get registered. Here's what that actually means.
          </h1>
          <p className="mt-3 text-sm text-slate-500">Last reviewed: {LAST_REVIEWED}</p>

          <div className="mt-8">
            <P>
              If you've been putting off your builder registration, the goalposts have moved — and
              mostly in your favour.
            </P>
            <P>
              The face-to-face interview is gone. The separate plan-based exam is gone. Both have
              been replaced by a single exam you sit online, and the paperwork you need to submit
              has been cut dramatically.
            </P>
            <P>
              If you started an application under the old system, or you've been told to prepare for
              an interview, this page explains where things stand.
            </P>
          </div>

          <Cta id="eligibility-form" />

          <H2>What changed</H2>
          <P>
            In July 2025, the Victorian Building Authority became the{" "}
            <strong>Building and Plumbing Commission (BPC)</strong>. That wasn't just a name change
            — the VBA, Domestic Building Dispute Resolution Victoria and VMIA's insurance function
            were merged into one regulator.
          </P>
          <P>
            From January 2026, the BPC started rolling out a new way of assessing applicants,
            beginning with <strong>Domestic Builder (Unlimited)</strong>.
          </P>
          <p className="mb-2 font-semibold text-slate-900">Old system:</p>
          <UL
            items={[
              "A face-to-face interview with assessors",
              "A separate plan-based exam",
              "Up to 40 supporting documents",
            ]}
          />
          <p className="mb-2 font-semibold text-slate-900">New system:</p>
          <UL items={["One exam, sat online", "No interview", "7 supporting documents"]} />
          <P>
            The BPC's stated reason for removing the interview is to reduce human bias and protect
            against corruption. In practical terms: you're no longer being judged in a room by a
            person. You're answering questions against a standard.
          </P>
          <P>
            The BPC designed the new exam with the{" "}
            <strong>Australian Council for Educational Research (ACER)</strong>.
          </P>

          <H2>Is this happening now, or later?</H2>
          <P>
            Both. The BPC is transitioning gradually. It began with Domestic Builder (Unlimited) in
            January 2026 and is extending to the other building and plumbing registration classes,
            with all exams available online by June 2026.
          </P>
          <P>
            The classes now covered include Domestic Builder (Unlimited), all the limited Domestic
            Builder classes — carpentry, framing, waterproofing, re-stumping, structural
            landscaping, swimming pools and more — every Commercial Builder class, Demolisher
            classes, Building Inspector (pool safety) and Building Designer.
          </P>
          <P>
            <strong>You don't opt in.</strong> The BPC will notify you by email if you're required
            to sit an online exam, and tell you the timeframe you have to complete it.
          </P>

          <H2>Important — exams are temporarily back in person</H2>
          <div className="my-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6">
            <div className="mb-3 flex items-center gap-2 font-bold text-amber-900">
              <AlertTriangle className="h-5 w-5" />
              Live situation — check before exam day
            </div>
            <p className="mb-4 text-base leading-relaxed text-amber-950">
              As of early August 2026, the BPC has advised that building practitioner online
              examinations are <strong>being conducted in person at BPC Head Office</strong> while
              technical issues are resolved. The BPC says affected applicants are being contacted
              directly.
            </p>
            <p className="mb-4 text-base leading-relaxed text-amber-950">
              If you've been preparing on the assumption you'll sit at your kitchen table, check
              your email and confirm your arrangements before exam day.
            </p>
            <p className="text-base leading-relaxed text-amber-950">
              This is a live situation and may change. If you're mid-application and unsure where
              you stand, contact the BPC on 1300 067 088 or onlineexams@bpc.vic.gov.au — or get in
              touch with us and we'll help you work out where you sit.
            </p>
          </div>

          <H2>What the exam is actually like</H2>
          <P>
            <strong>Format.</strong> It's not an essay and it's not a viva. Questions are
            multi-format — multiple choice, drag and drop, reorder, true/false and image select.
          </P>
          <P>
            <strong>Delivered by.</strong> Janison-Proctortrack. When sat remotely, your webcam,
            microphone and computer desktop are all recorded and reviewed.
          </P>
          <P>
            <strong>Open book — with conditions.</strong> You can use the BPC's permitted reference
            materials, but only the online versions accessible inside the exam. No printed notes. No
            cheat sheets. No quick-reference guides you've made yourself.
          </P>
          <P>
            <strong>When.</strong> Sat remotely, it's available 24/7 within the timeframe the BPC
            gives you. If you're sitting in person, the BPC sets the date, time and location and
            provides the laptop.
          </P>
          <P>
            <strong>Ending.</strong> When your time expires, your answers submit automatically
            whether you're finished or not. You can't return to the questions afterwards.
          </P>

          <H3>The cost nobody mentions</H3>
          <P>
            To access the <strong>Australian Standards</strong> during your exam, you need an active
            subscription or a purchased online version. The BPC is explicit that this is the test
            taker's responsibility, not theirs.
          </P>
          <ol className="mb-5 list-decimal space-y-2 pl-6 text-base sm:text-lg text-slate-700">
            <li>Budget for it. It's a real cost on top of your application fee.</li>
            <li>
              Sort it out early and <strong>know your login before exam day</strong> — you have to
              enter those credentials mid-exam to get in.
            </li>
          </ol>

          <H3>Allow time for onboarding</H3>
          <P>
            Before you can sit, you go through ID checks in the Janison-Proctortrack platform. Those
            can take <strong>up to three days</strong> to approve. Applicants who leave onboarding
            to the last minute run out of runway.
          </P>

          <H2>The rules, in plain English</H2>
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
            inhaler or pain relief. That's it. Everything else comes off the desk.
          </P>
          <p className="mb-2 font-semibold text-slate-900">Not permitted:</p>
          <UL
            items={[
              "Talking — including reading questions out loud to yourself",
              "Help from anyone else",
              "Printed material of any kind, including notes you've prepared",
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
            undergo further assessment, or have your application refused.
          </P>

          <H3>If you already have hardcopy reference materials</H3>
          <P>
            There's a transitional arrangement. Applicants who already hold hardcopy permitted
            reference materials can ask to sit the exam in person at a BPC-nominated venue — email
            onlineexams@bpc.vic.gov.au. In-person places are limited, so this can delay your exam
            being scheduled.
          </P>

          <H3>If you need adjustments</H3>
          <P>
            If you need reasonable adjustments to how you sit the exam, contact the BPC within{" "}
            <strong>three business days</strong> of receiving your exam invitation.
          </P>

          <H2>What happens if you don't pass</H2>
          <P>This is the part worth understanding before you sit.</P>
          <P>
            If you don't meet the required standard, your application for registration may be
            refused, and you'll be notified in writing.{" "}
            <strong>
              If your application is refused, you need to lodge a new application to get another
              opportunity to sit.
            </strong>{" "}
            It isn't a free re-sit.
          </P>
          <P>
            If you missed the exam window and there were exceptional circumstances, you can ask for
            another opportunity — the BPC may require written evidence.
          </P>
          <P>
            That's the case for preparing properly the first time rather than treating the exam as
            something you'll figure out on the day.
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

          <H2>Common questions</H2>
          <H3>Do you still need a builder's licence in Victoria?</H3>
          <P>
            Victoria doesn't issue "builders licences" — the term everyone uses. What you actually
            apply for is building practitioner <strong>registration</strong>, through the Building
            and Plumbing Commission. You need it to carry out domestic building work over the
            prescribed value, or to advertise and contract as a builder in Victoria.
          </P>
          <H3>How do you become a registered builder in Victoria?</H3>
          <P>
            You apply to the BPC in the registration class you want, show you meet the qualification
            and experience requirements, submit your supporting documents, and pass the required
            exam. Under the reformed process that's one online exam rather than an interview plus a
            plan-based exam, and 7 supporting documents rather than 40.
          </P>
          <H3>What qualifications do you need to be a registered builder?</H3>
          <P>
            For Domestic Builder (Unlimited) you generally need a Diploma-level building
            qualification or recognised equivalent, together with demonstrated industry experience.
          </P>
          <H3>How long does it take to get your builder's licence in Victoria?</H3>
          <P>
            It depends on how complete your application is, how quickly you clear exam onboarding —
            ID checks alone can take up to three days — and current BPC processing times. The
            document reduction from 40 to 7 was made partly to cut processing times.
          </P>
          <H3>How much does it cost to get a builder's licence in Victoria?</H3>
          <P>
            There's the BPC application fee, plus your own Australian Standards access for the exam,
            plus domestic building insurance once you're registered and working.
          </P>

          <H2>Not sure where your application stands?</H2>
          <P>
            If you started under the old system, or you've been told to prepare for an interview
            that may no longer happen, we'll help you work out where you actually sit — no charge,
            no obligation.
          </P>

          <Cta />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default BpcExamChanges;
