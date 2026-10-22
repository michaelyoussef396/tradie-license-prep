import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";
import { FaqList, H2, H3, P, SourceList, Src, UL } from "@/components/ClassGuide";
import { faqJsonLd, type Faq } from "@/lib/class-guide";
import { UNLIMITED_MINIMUM_YEARS } from "@/data/eligibility";

/**
 * Domestic Builder (Unlimited) class page. Every requirement here is the BPC's own,
 * cited inline to src/data/bpc-sources.ts and logged in .ai/bpc-guide-sources.md;
 * re-check them and bump LAST_REVIEWED when the page is edited. It makes no Qualify Pro
 * claims and names no course: which courses serve which class is pending Adrian (HANDOFF §2.7).
 */
const LAST_REVIEWED = "22 October 2026";
const SOURCE = "domestic-builder-unlimited";
const PATH = "/domestic-builder-registration/unlimited";

const FAQS: Faq[] = [
  {
    q: "What is Domestic Builder (Unlimited) registration?",
    a: "It's the BPC registration class that covers all components of domestic building work on a home — the construction, renovation, improvement or maintenance of class 1, 2 and 4 buildings and associated class 10 buildings — whether you carry out the work yourself or manage or arrange it.",
    src: ["domesticWork"],
  },
  {
    q: "What qualification do you need for Domestic Builder (Unlimited)?",
    a: "The BPC lists a Diploma of Building and Construction (Building) (CPC50210 or CPC50220), a Bachelor of Construction Management and Economics from Holmesglen, or a Bachelor of Construction Management (Honours) from Deakin University. A Certificate IV in Building and Construction isn't a prescribed course for any class, and without the prescribed course you may be asked to sit an additional BPC exam.",
    src: ["domesticWork", "eligibility"],
  },
  {
    q: "How much experience do you need for Domestic Builder (Unlimited)?",
    a: `The BPC asks for at least ${UNLIMITED_MINIMUM_YEARS} years of practical experience. It should be supervised by a registered building practitioner, paid, across technical, supervision and contractual work, and gained in the last seven years. Experience as an owner-builder or from a training course may be disregarded.`,
    src: ["domesticWork", "eligibility"],
  },
  {
    q: "Is there an exam for Domestic Builder (Unlimited)?",
    a: "Yes. This was the first class moved to the BPC's single exam, which from January 2026 replaces the face-to-face interview and the plan-based exam. Exams run for 1 or 2 hours, depending on your class and your qualifications, experience, employment history and technical referees.",
    src: ["reforms", "examsFaq"],
  },
  {
    q: "How much does Domestic Builder (Unlimited) registration cost?",
    a: "For 2026–27 the BPC lists a $1,039.00 application fee for an individual and a $519.50 annual fee once registered. The fees are GST-exempt and the fee page lists no separate exam fee.",
    src: ["fees"],
  },
];

const DomesticBuilderUnlimited = () => {
  return (
    <PageTransition>
      <Seo
        description="What the BPC asks for to register as a Domestic Builder (Unlimited) in Victoria: scope, qualifications, experience, the exam and fees, with sources."
        path={PATH}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd(FAQS))}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="container mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Domestic Builder (Unlimited) registration in Victoria
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last reviewed: {LAST_REVIEWED} · every requirement is linked to the BPC page it comes
            from
          </p>

          <div className="mt-8">
            <P>
              Domestic Builder (Unlimited) is the registration class that covers all of the building
              work on a home: new builds, renovations, improvements and maintenance. This page sets
              out what the Building and Plumbing Commission (BPC) asks for to register in it.
            </P>
          </div>

          <H2 id="what-it-covers">What the class covers</H2>
          <P>
            The BPC says a Domestic Builder (Unlimited) is responsible for carrying out, or managing
            or arranging the carrying out of, all components of domestic building work for the
            construction, renovation, improvement or maintenance of a home — class 1, 2 and 4
            buildings and associated class 10 buildings. <Src k="domesticWork" />
          </P>
          <P>
            The BPC tells home owners they need a registered builder for domestic building work worth
            more than $10,000, counting labour, materials and GST. <Src k="engaging" />
          </P>

          <H2 id="qualifications">Qualifications</H2>
          <P>
            The BPC lists three qualifications for this class: <Src k="domesticWork" />
          </P>
          <UL
            items={[
              "Diploma of Building and Construction (Building) — CPC50210 or CPC50220",
              "Bachelor of Construction Management and Economics (Holmesglen)",
              "Bachelor of Construction Management (Honours) (Deakin University)",
            ]}
          />
          <H3>What about a Cert IV?</H3>
          <P>
            The BPC says the Certificate IV in Building and Construction (Building) is not a
            prescribed course for any class of registration: it meets parts of the knowledge
            requirements for domestic builder classes, but not all of them. You can include it in your application
            and the BPC will consider it as part of the broader assessment of your knowledge and
            experience, but if you don't hold the prescribed course for your class you may be asked
            to sit an additional BPC exam. <Src k="eligibility" />
          </P>

          <H2 id="experience">Experience</H2>
          <P>
            The BPC asks for at least {UNLIMITED_MINIMUM_YEARS} years of practical experience for
            Domestic Builder (Unlimited). <Src k="domesticWork" /> It says your experience should be:{" "}
            <Src k="eligibility" />
          </P>
          <UL
            items={[
              "supervised by a registered building practitioner",
              "gained in a paid capacity, as an employee or a contractor",
              "across all aspects of the work — technical, supervision and contractual",
              "gained in the last seven years",
            ]}
          />
          <P>
            Don't rely on experience gained as an owner-builder or as part of a training course: the
            BPC may disregard it. Keep records of your employment and contract work, because you may be
            asked for evidence that your experience was paid. <Src k="eligibility" />
          </P>
          <H3>What you need to be able to show</H3>
          <P>
            The BPC expects you to be able to carry out, manage or arrange domestic building work
            competently and to a professional standard, including: <Src k="domesticWork" />
          </P>
          <UL
            items={[
              "working out whether a building permit is needed, obtaining it and complying with it",
              "arranging certification of completed work when it's required",
              "producing cost estimates and quotes",
              "setting up a major domestic building contract when one is required",
              "planning and preparing for construction, and arranging workers and subcontractors to do the work safely and competently",
              "site safety: safety plans, inductions and keeping to them throughout the build",
              "supervising all construction work to the National Construction Code, Australian Standards, local authority requirements and the safety and environmental laws that apply",
            ]}
          />

          <H2 id="exam">The exam</H2>
          <P>
            Domestic Builder (Unlimited) was the first class moved to the BPC's new process: from
            January 2026 a single exam replaces the face-to-face interview and the plan-based exam.{" "}
            <Src k="reforms" />
          </P>
          <P>
            Exams run for 1 or 2 hours. The BPC sets the length by the class you're applying for and
            by your qualifications, building experience, employment history and technical referees.{" "}
            <Src k="examsFaq" />
          </P>
          <P>
            The BPC's exams page currently says its online exams are being conducted in person at its
            Head Office while it resolves technical issues. <Src k="exams" />
          </P>
          <P>
            <Link to="/bpc-exam-changes" className="font-semibold text-blue-700 underline underline-offset-4">
              Our BPC exam guide
            </Link>{" "}
            covers the format, the open-book rules, exam day and what happens if you don't pass.
          </P>

          <H2 id="applying">Applying, and what it costs</H2>
          <P>
            From 19 October 2026 the BPC says some building application processes are online only,
            through the BPC Portal or its existing online services. <Src k="applications" />
          </P>
          <P>
            Every supporting document you submit must be certified as a true copy of the original, and
            you must show that you're a "fit and proper" person — the BPC may ask you for a
            declaration and a criminal history check. <Src k="eligibility" />
          </P>
          <P>
            For 2026–27 the BPC lists a registration application fee of $1,039.00 for an individual
            applying for Domestic Builder (Unlimited), and an annual fee of $519.50 once you're
            registered. Company fees are higher, the fees are GST-exempt, and the fee page lists no
            separate exam fee. <Src k="fees" />
          </P>

          <H2 id="courses">How Qualify Pro can help</H2>
          <P>
            Qualify Pro runs courses that prepare you for builder registration, including your
            application. Which one fits depends on your class and your situation —{" "}
            <Link to="/courses" className="font-semibold text-blue-700 underline underline-offset-4">
              compare the courses
            </Link>
            , or ask below.
          </P>
          <div id="enquiry-form" className="mb-6 max-w-xl scroll-mt-32">
            <HeroEnquiryForm source={SOURCE} title="Ask about Domestic Builder (Unlimited) registration" />
          </div>

          <H2 id="faq">Common questions</H2>
          <FaqList faqs={FAQS} />

          <P>
            Going for a limited class such as carpentry instead?{" "}
            <Link
              to="/domestic-builder-registration/limited"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              Domestic Builder (Limited) registration
            </Link>
          </P>

          <SourceList keys={["domesticWork", "eligibility", "reforms", "examsFaq", "exams", "applications", "fees", "engaging"]} />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default DomesticBuilderUnlimited;
