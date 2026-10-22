import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";
import { CourseCard, FaqList, H2, H3, P, SourceList, Src, UL } from "@/components/ClassGuide";
import { faqJsonLd, scrollToEnquiry, type Faq } from "@/lib/class-guide";
import { getCourse } from "@/data/courses";
import { CARPENTRY_EXPERIENCE_SUMMARY } from "@/data/eligibility";

/**
 * Domestic Builder (Limited) class page, with carpentry in detail. Every requirement
 * here is the BPC's own, cited inline to src/data/bpc-sources.ts and logged in
 * .ai/bpc-guide-sources.md; re-check them and bump LAST_REVIEWED when the page is
 * edited. The carpentry experience minimum is on HOLD (src/data/eligibility.ts): this
 * page states no years figure and points to the BPC's info sheet instead.
 */
const LAST_REVIEWED = "22 October 2026";
const SOURCE = "domestic-builder-limited";
const PATH = "/domestic-builder-registration/limited";

const CARPENTRY = getCourse("carpentry");

const FAQS: Faq[] = [
  {
    q: "What is Domestic Builder (Limited) registration?",
    a: "It's BPC registration for one kind of domestic building work, such as carpentry, framing, bricklaying or waterproofing, rather than all of it. Each limited class has its own qualification and experience requirements, set out in the BPC's info sheet.",
    src: ["domesticWork"],
  },
  {
    q: "What can a Domestic Builder (limited to carpentry) do?",
    a: "Carpentry work for homes and associated class 10 structures: the construction, alteration, renovation and repair of homes, carports, garages, pergolas, decks, verandas and similar structures.",
    src: ["domesticWork"],
  },
  {
    q: "What qualification do you need for carpentry (DB-L) registration?",
    a: "The BPC lists a Certificate III in Carpentry (CPC30211 or CPC30220), plus three units: Arrange building applications and approvals, Produce labour and material schedules for ordering, and Select and prepare (or Select, prepare and administer) a construction contract.",
    src: ["domesticWork"],
  },
  {
    q: "How much experience do you need for carpentry (DB-L) registration?",
    a: `${CARPENTRY_EXPERIENCE_SUMMARY} The BPC's info sheet sets the minimum, and on top of general domestic building experience it asks you to show fixing strip flooring and formwork for stairs, ramps, suspended slabs, columns, beams and walls.`,
    src: ["domesticWork"],
  },
  {
    q: "Is there an exam for carpentry (DB-L) registration?",
    a: "There may be. The BPC lists Domestic Builder (limited to carpentry) among the classes that may need its online exam, and says it will tell you if you need one. Its eligibility page says you may be required to complete an exam or an interview, depending on the class.",
    src: ["exams", "eligibility"],
  },
  {
    q: "How much does Domestic Builder (Limited) registration cost?",
    a: "For 2026–27 the BPC lists an $831.20 application fee for an individual and a $415.50 annual fee once registered. The fees are GST-exempt and the fee page lists no separate exam fee.",
    src: ["fees"],
  },
];

const DomesticBuilderLimited = () => {
  return (
    <PageTransition>
      <Seo
        description="What the BPC asks for to register in a Domestic Builder (Limited) class in Victoria, with carpentry (DB-L) in detail: the scope, Cert III and units, experience, the exam and fees."
        path={PATH}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd(FAQS))}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="container mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Domestic Builder (Limited) registration in Victoria: carpentry and the other limited
            classes
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last reviewed: {LAST_REVIEWED} · every requirement is linked to the BPC page it comes
            from
          </p>

          <div className="mt-8">
            <P>
              The limited classes register you for one kind of domestic building work, such as
              carpentry, framing or waterproofing. This page sets out what the Building and Plumbing
              Commission (BPC) asks for, with carpentry (DB-L) in detail.
            </P>
          </div>

          <H2 id="limited-classes">What the limited classes are</H2>
          <P>
            Alongside Domestic Builder (Unlimited), the BPC registers builders in limited classes,
            each covering one kind of domestic building work. Its info sheet sets out the work, the
            qualifications and the experience for each one. <Src k="domesticWork" /> They include:
          </P>
          <UL
            items={[
              "carpentry",
              "framing",
              "bricklaying and blocklaying",
              "bathroom, kitchen and laundry renovation",
              "cabinet making, joinery and stair construction",
              "door and window replacement and installation",
              "external wall cladding",
              "footings and slab work",
              "roof tiling",
              "waterproofing",
            ]}
          />
          <P>
            Every limited class needs the general domestic building experience — building permits,
            quotes, contracts, site safety and supervising work to the National Construction Code —
            plus experience in that class's own work. <Src k="domesticWork" />
          </P>

          <H2 id="carpentry">Carpentry (DB-L)</H2>
          <H3>What the class covers</H3>
          <P>
            The BPC describes Domestic Builder (limited to carpentry) as carpentry work for homes and
            associated class 10 structures: the construction, alteration, renovation and repair of
            homes, carports, garages, pergolas, decks, verandas and similar structures.{" "}
            <Src k="domesticWork" />
          </P>
          <H3>Qualification</H3>
          <P>
            The BPC lists a Certificate III in Carpentry (CPC30211 or CPC30220), plus three units:{" "}
            <Src k="domesticWork" />
          </P>
          <UL
            items={[
              "Arrange building applications and approvals (CPCCBC4026A or CPCCBC4026)",
              "Produce labour and material schedules for ordering (CPCCBC4005A or CPCCBC4005)",
              "Select and prepare a construction contract (CPCCBC4003A), or Select, prepare and administer a construction contract (CPCCBC4003)",
            ]}
          />
          <H3>Experience</H3>
          <P>
            {CARPENTRY_EXPERIENCE_SUMMARY} The BPC's info sheet sets the minimum for each limited
            class. On top of the general experience, it says you must be able to carry out, manage or
            arrange these competently and to a professional standard: <Src k="domesticWork" />
          </P>
          <UL
            items={[
              "fixing strip flooring",
              "erecting, altering and dismantling formwork for stairs and ramps",
              "erecting, altering and dismantling formwork for suspended slabs, columns, beams and walls",
            ]}
          />
          <P>
            The BPC says your experience should be supervised by a registered building practitioner,
            paid (as an employee or a contractor), across technical, supervision and contractual work,
            and gained in the last seven years. Experience as an owner-builder or from a training course
            may be disregarded. <Src k="eligibility" />
          </P>

          <H2 id="exam">The exam</H2>
          <P>
            The BPC's exams page lists Domestic Builder (limited to carpentry) among the classes that
            may need its online exam, and says the BPC will tell you if you need one.{" "}
            <Src k="exams" /> Its eligibility page says you may be required to complete an exam or an
            interview, depending on the class. <Src k="eligibility" />
          </P>
          <P>
            The single exam replaces the face-to-face interview and the plan-based exam. The BPC
            started with Domestic Builder (Unlimited) in January 2026 and is extending it to other
            classes. <Src k="reforms" /> Exams run for 1 or 2 hours, depending on your class and your
            qualifications, experience, employment history and technical referees.{" "}
            <Src k="examsFaq" /> For now, the BPC's exams page says they're being conducted in person at
            its Head Office while it resolves technical issues. <Src k="exams" />
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
            For 2026–27 the BPC lists a registration application fee of $831.20 for an individual
            applying for Domestic Builder (Limited), and an annual fee of $415.50 once you're
            registered. Company fees are higher, the fees are GST-exempt, and the fee page lists no
            separate exam fee. <Src k="fees" />
          </P>

          <H2 id="course">How Qualify Pro can help</H2>
          <P>
            The {CARPENTRY.name} course prepares you for carpentry registration.{" "}
            <Link to="/courses" className="font-semibold text-blue-700 underline underline-offset-4">
              Compare all courses
            </Link>
          </P>
          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <CourseCard course={CARPENTRY} onEnquire={scrollToEnquiry} />
          </div>
          <P>Applying in a different limited class? Ask, and we'll confirm what applies to you.</P>
          <div id="enquiry-form" className="mb-6 max-w-xl scroll-mt-32">
            <HeroEnquiryForm source={SOURCE} title="Ask about carpentry (DB-L) registration" />
          </div>

          <H2 id="faq">Common questions</H2>
          <FaqList faqs={FAQS} />

          <P>
            Going for all domestic building work instead?{" "}
            <Link
              to="/domestic-builder-registration/unlimited"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              Domestic Builder (Unlimited) registration
            </Link>
          </P>

          <SourceList keys={["domesticWork", "eligibility", "exams", "reforms", "examsFaq", "applications", "fees"]} />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default DomesticBuilderLimited;
