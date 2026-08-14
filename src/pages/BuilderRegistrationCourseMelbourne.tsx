import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, MapPin, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";

const SOURCE = "builder-registration-course-melbourne";

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Builder Registration Course Melbourne",
  description:
    "In-person, small-group mentorship in Melbourne preparing experienced tradespeople for Building and Plumbing Commission builder registration in Victoria.",
  provider: {
    "@type": "Organization",
    name: "Qualify Pro",
    url: "https://www.qualifypro.com.au",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "VIC",
        addressCountry: "AU",
      },
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a builder registration course take in Melbourne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualify Pro's courses run from 6 to 13 weeks depending on the registration class and format. Building and Plumbing Commission processing time applies on top of the course and varies by application.",
      },
    },
    {
      "@type": "Question",
      name: "What experience do you need for builder registration in Victoria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally a minimum of two years practical experience in the trade you are applying for, together with technical references from registered builders in the same class or higher, and an evidence portfolio.",
      },
    },
    {
      "@type": "Question",
      name: "Is the builder registration course in person or online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Group courses are delivered in person in Melbourne in small groups. A private one-on-one option is delivered online via Zoom for those who need scheduling flexibility.",
      },
    },
  ],
};

const courses = [
  {
    name: "Domestic & Commercial Builder Application Program",
    duration: "13 weeks",
    format: "In person, small group",
    suits: "For applicants going for both domestic and commercial registration.",
    price: "$7,995 inc GST",
  },
  {
    name: "Domestic Builder Registration Course + Application",
    duration: "7 weeks",
    format: "Evenings, 1 night per week, 6pm–9pm · In person, small group",
    suits: "For working tradies going for domestic builder registration.",
    price: "$5,650 inc GST",
  },
  {
    name: "Private Domestic Builder Registration Course",
    duration: "9 weeks",
    format: "One-on-one, 3 hours per week via Zoom",
    suits: "For people who want individual coaching and flexible scheduling.",
    price: "$5,650 inc GST",
  },
  {
    name: "DB-L Carpentry Licence Course",
    duration: "6 weeks",
    format: "In person, small group",
    suits: "For carpenters going for DB-L registration.",
    price: "$3,790 inc GST — application prep available as an add-on",
  },
];

const included = [
  "Small-group training with a registered builder",
  "Your online application and portfolio prepared with you",
  "600+ practice questions and answers (450+ for the carpentry course)",
  "Study guides, sample questions and mock tests",
  "Guidance on the Acts, Regulations and Australian Standards",
  "Step-by-step preparation for the BPC assessment",
  "Insurance guidance",
  "Support after you're registered",
];

const tradeAreas = [
  "Domestic Builder — Unlimited",
  "Commercial Building — low rise",
  "Carpentry (DB-L)",
  "Bricklaying and blocklaying",
  "Cabinet making, joinery and stair construction",
  "Bathroom, kitchen and laundry renovations",
  "Waterproofing",
  "Door and window replacement",
  "External fixtures — pergolas, decks",
  "Sheds and non-habitable structures",
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-base sm:text-lg leading-relaxed text-slate-700">{children}</p>
);

const scrollToForm = () => {
  document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const BuilderRegistrationCourseMelbourne = () => {
  return (
    <PageTransition>
      <Seo
        title="Builder Registration Course Melbourne | Face-to-Face Mentorship"
        description="Small-group, in-person builder registration mentorship in Melbourne. Get your BPC registration with one-on-one support from a registered building practitioner."
        path="/builder-registration-course-melbourne"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(courseJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navigation />

        {/* HERO */}
        <section className="relative bg-slate-900 pt-32 pb-20">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="container relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                Builder registration course in Melbourne — in person, in small groups
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300">
                Most builder registration training in Victoria is a six-week Zoom course run by a
                training organisation, or a national operator handling five states at once.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                This isn't that. It's in-person mentorship in Melbourne, in small groups, with a
                registered building practitioner who has done the job and been through the process.
                You work on your gaps, not a generic syllabus.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 text-slate-300">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" /> Small groups
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" /> Melbourne, in person
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" /> Evening classes
                </span>
              </div>
            </div>
            <div id="eligibility-form">
              <HeroEnquiryForm source={SOURCE} title="Check if you're eligible — free, 2 minutes" />
            </div>
          </div>
        </section>

        <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-20">
          <section className="mb-16">
            <H2>Who this is for</H2>
            <P>Experienced tradies who can do the work but haven't got the registration.</P>
            <P>
              If you've been on the tools for years, have the jobs behind you, and keep putting off
              the application because the process is confusing — that's exactly who this is built
              for.
            </P>
          </section>

          <section className="mb-16">
            <H2>What makes it different</H2>
            <P>
              <strong>Small groups.</strong> You get attention. Questions get answered when you ask
              them, not filed for later.
            </P>
            <P>
              <strong>Your gaps, not a syllabus.</strong> The teaching adapts to where you're weak.
              If your problem is technical knowledge, that's where the time goes. If your problem is
              sitting tests, that's the work. That only happens in a small room.
            </P>
            <P>
              <strong>In person, after hours.</strong> Evening classes so you don't lose work days.
            </P>
            <P>
              <strong>Taught by someone registered.</strong> Registered Building Practitioner
              (Unlimited) and Commercial Builder limited to low rise, qualified carpenter, 10+ years
              training, with site experience across residential, commercial and industrial in every
              position from carpenter to site manager.
            </P>
            <P>
              <strong>Application done with you.</strong> The online application and portfolio are
              prepared alongside you, not left as homework.
            </P>
          </section>

          <section className="mb-16">
            <H2>Course options</H2>
            <div className="grid gap-6 sm:grid-cols-2">
              {courses.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-blue-700">{c.duration}</p>
                  <p className="mt-1 text-sm text-slate-600">{c.format}</p>
                  <p className="mt-3 flex-1 text-base text-slate-700">{c.suits}</p>
                  <p className="mt-4 text-lg font-bold text-slate-900">{c.price}</p>
                  <Button onClick={scrollToForm} className="mt-5 w-full">
                    Talk to us
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-xl">
            <HeroEnquiryForm source={SOURCE} title="Check if you're eligible — free, 2 minutes" />
          </section>

          <section className="mb-16">
            <H2>What's included</H2>
            <ul className="space-y-3">
              {included.map((i) => (
                <li key={i} className="flex gap-3 text-base sm:text-lg text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                  {i}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <H2>Trade areas covered</H2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {tradeAreas.map((t) => (
                <li key={t} className="flex gap-3 text-base text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                  {t}
                </li>
              ))}
            </ul>
            <P>
              <span className="mt-4 block">
                Not sure which class applies to your work? That's the first thing we sort out.
              </span>
            </P>
          </section>

          <section className="mb-16">
            <H2>How it works</H2>
            <ol className="space-y-4 text-base sm:text-lg text-slate-700">
              <li>
                <strong>1. Free eligibility check.</strong> A short conversation about your
                experience, your trade and what you're aiming for. No cost, no obligation.
              </li>
              <li>
                <strong>2. We confirm your class and pathway.</strong> Which registration class fits
                your work, and what you'll need to evidence.
              </li>
              <li>
                <strong>3. You do the course.</strong> In person, in a small group, working on your
                gaps.
              </li>
              <li>
                <strong>4. Your application goes in.</strong> Prepared with you, not handed to you
                as homework.
              </li>
              <li>
                <strong>5. You sit the BPC assessment.</strong> Prepared for the format that applies
                to you.{" "}
                <Link
                  to="/bpc-exam-changes"
                  className="font-semibold text-blue-700 underline underline-offset-4"
                >
                  See our page on the BPC exam changes →
                </Link>
              </li>
            </ol>
          </section>

          <section className="mb-16">
            <H2>Entry requirements</H2>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-base sm:text-lg text-slate-700">
              <li>Minimum 2 years' practical experience in the trade you're applying for</li>
              <li>
                Technical references from registered builders in the same or a higher class
              </li>
              <li>An evidence portfolio — we help you build this</li>
            </ul>
            <P>
              Everyone's circumstances are different. If you're not sure whether you qualify, ask —
              the eligibility check is free.
            </P>
          </section>

          <section className="mb-16">
            <H2>Common questions</H2>
            <h3 className="mb-2 text-xl font-bold text-slate-900">How long does it take?</h3>
            <P>
              The courses run from 6 to 13 weeks depending on which one fits you. BPC processing
              time sits on top of that and varies.
            </P>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Do you help with the application?</h3>
            <P>
              Yes. The online application and portfolio are prepared with you as part of the course,
              not left for you to work out afterwards.
            </P>
            <h3 className="mb-2 text-xl font-bold text-slate-900">What experience do I need?</h3>
            <P>
              Generally a minimum of 2 years' practical experience in your trade, plus technical
              references from registered builders in the same class or higher.
            </P>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              What qualifications do I need, and can you help me get them?
            </h3>
            <P>
              Requirements vary by registration class. The eligibility check identifies what you
              need and what you're missing.
            </P>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Is it online or in person?</h3>
            <P>
              The group courses are in person in Melbourne. There's also a private one-on-one option
              delivered online via Zoom for people who need the flexibility.
            </P>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Are payment plans available?</h3>
            <P>Get in touch and we'll work something out based on your situation.</P>
          </section>

          <section>
            <H2>Start with a free eligibility check</H2>
            <P>
              Two minutes, no obligation. We'll tell you which registration class fits your work and
              what the path looks like from here.
            </P>
            <div className="mt-8 max-w-xl">
              <HeroEnquiryForm source={SOURCE} title="Check if you're eligible — free, 2 minutes" />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default BuilderRegistrationCourseMelbourne;
