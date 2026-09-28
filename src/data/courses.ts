/**
 * SINGLE SOURCE OF TRUTH for all course information.
 *
 * Every page, component and JSON-LD block that mentions a course price, name,
 * duration, format or inclusion count MUST import from here. Do not repeat any
 * course detail as a literal anywhere else in the codebase.
 *
 * Conventions:
 *  - Adrian quotes every course price EX-GST. `price` is that ex-GST figure and
 *    is the only money authored by hand; every other price field is derived.
 *  - The GST-INCLUSIVE total is always the headline. Render `priceDisplay` as
 *    the prominent figure and `exGstNote` beside it — never the other way
 *    round, and never label an ex-GST figure "inc GST".
 *  - Time ranges use an en-dash: 5pm–9pm.
 */

const GST_RATE = 0.1;

/** Confirmed by Adrian (Vryan email, 27 Sep 2026). Nights per week is not confirmed. */
const EVENING_SESSION_TIME = "5pm–9pm";

/** Formats AUD, dropping a trailing ".00" but keeping real cents ($8,794.50). */
function formatAud(amount: number): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return `$${amount.toLocaleString("en-AU", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export interface GstPricing {
  /** Ex-GST, as quoted by Adrian. */
  price: number;
  /** GST-inclusive total — what the customer actually pays. */
  priceIncGst: number;
  /** GST-inclusive total, formatted. This is the headline price. */
  priceDisplay: string;
  /** e.g. "($7,995 + GST)". Render beside `priceDisplay`, never instead of it. */
  exGstNote: string;
}

function gstPricing(exGst: number): GstPricing {
  const priceIncGst = Math.round(exGst * (1 + GST_RATE) * 100) / 100;
  return {
    price: exGst,
    priceIncGst,
    priceDisplay: formatAud(priceIncGst),
    exGstNote: `(${formatAud(exGst)} + GST)`,
  };
}

export interface CourseAddOn extends GstPricing {
  name: string;
  note: string;
  inclusions: string[];
}

export interface Course extends GstPricing {
  id: string;
  /** Canonical short name — use this everywhere. */
  name: string;
  duration: string;
  format: string;
  /** Compact format label for cards and pills. */
  formatShort: string;
  /** Class time for courses with a fixed session, e.g. "5pm–9pm". */
  sessionTime?: string;
  whoItsFor: string;
  /** Practice question count, e.g. "600+". Never use the "450-600+" phrasing. */
  practiceQuestions: string;
  inclusions: string[];
  addOn?: CourseAddOn;
}

export const courses: Course[] = [
  {
    id: "comprehensive",
    name: "Comprehensive Builder Program",
    duration: "13 weeks",
    format: "In person, small group",
    formatShort: "In person",
    whoItsFor:
      "For applicants going for both domestic and commercial (low-rise) registration who want the most thorough preparation possible.",
    ...gstPricing(7995),
    practiceQuestions: "600+",
    inclusions: [
      "600+ practice questions with detailed explanations",
      "Comprehensive training materials and resources",
      "Complete application and portfolio preparation",
      "BPC exam preparation and practice sessions",
      // HOLD: resit wording pending Adrian's written answer
      "Small group training (maximum 10 students)",
      "One-on-one consultation sessions",
      "Post-registration support and guidance",
      "8-month access to online testing platform",
    ],
  },
  {
    id: "evening",
    // NOTE: same price as Private 1-on-1 Training below — confirmed by Adrian
    // (Vryan email, 27 Sep 2026).
    name: "Evening Builder Course",
    duration: "7 weeks",
    format: `Evenings, ${EVENING_SESSION_TIME} · In person, small group`,
    formatShort: `Evenings, ${EVENING_SESSION_TIME}`,
    sessionTime: EVENING_SESSION_TIME,
    whoItsFor:
      "For working tradies going for domestic builder registration who can't take time off during the day.",
    ...gstPricing(6650),
    practiceQuestions: "600+",
    inclusions: [
      `7 evening sessions (${EVENING_SESSION_TIME})`,
      "Small group training (maximum 10 students)",
      "600+ Q&A practice tests with explanations",
      "Complete application preparation support",
      "Portfolio development and review",
      // HOLD: resit wording pending Adrian's written answer
      "All training materials included",
      "Post-course support via email/phone",
    ],
  },
  {
    id: "private",
    // NOTE: same price as the Evening Builder Course above — confirmed by Adrian
    // (Vryan email, 27 Sep 2026).
    name: "Private 1-on-1 Training",
    duration: "9 weeks",
    format: "One-on-one, 3 hours per week via Zoom",
    formatShort: "3 hrs/week via Zoom",
    whoItsFor:
      "For people who want individual coaching and flexible scheduling, or training tailored to their specific gaps.",
    ...gstPricing(6650),
    practiceQuestions: "600+",
    inclusions: [
      "9 weeks of one-on-one coaching (3 hours per week)",
      "Flexible scheduling via Zoom",
      "Completely personalised curriculum",
      "Licensed builder as your personal coach",
      "All training materials and resources",
      "8-month access to online testing platform",
      "Complete application preparation",
      "Portfolio development and review",
      "Unlimited email support during training",
    ],
  },
  {
    id: "carpentry",
    name: "Carpentry Licence (DB-L)",
    duration: "6 weeks",
    format: "In person, small group",
    formatShort: "In person",
    whoItsFor:
      "For qualified carpenters going for DB-L (Domestic Builder – Limited) registration.",
    ...gstPricing(3790),
    practiceQuestions: "450+",
    inclusions: [
      "450+ carpentry-specific practice questions",
      "DB-L focused training materials",
      "Application guidance and support",
      "Technical knowledge assessment",
      "Portfolio development support",
      "Small group format (max 10 students)",
      "Email support throughout the course",
    ],
    addOn: {
      name: "Application Prep Package",
      ...gstPricing(1460),
      note: "Discounted vs. purchasing separately",
      inclusions: [
        "Complete application form assistance",
        "Portfolio compilation and review",
        "Technical reference coordination",
        "Documentation review and correction",
        "Submission preparation and checking",
      ],
    },
  },
];

export const courseById = Object.fromEntries(
  courses.map((c) => [c.id, c]),
) as Record<string, Course>;

export const getCourse = (id: string): Course => courseById[id];

/**
 * Offered alongside every course and NOT included in any course fee. Confirmed
 * by Adrian (Vryan email, 27 Sep 2026). There is no price field on purpose: the
 * unit it would be priced in is pending, so the call to action stands in for it.
 */
export const practiceExamsAddOn = {
  label: "Add-on · Not included in course fees",
  name: "Practice exams and book tabbing",
  description:
    "The BPC exam is reference-based: the Building Act, the Regulations, the NCC and the Australian Standards. It tests how fast you can find and apply the right answer. Adrian runs practice exams and teaches you to tab your books.",
  callToAction: "Ask us about it",
};

/** e.g. "600+ practice questions and answers (450+ for the carpentry course)" */
export const practiceQuestionsSummary = `${courseById.comprehensive.practiceQuestions} practice questions and answers (${courseById.carpentry.practiceQuestions} for the carpentry course)`;
