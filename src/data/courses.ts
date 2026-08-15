/**
 * SINGLE SOURCE OF TRUTH for all course information.
 *
 * Every page, component and JSON-LD block that mentions a course price, name,
 * duration, format or inclusion count MUST import from here. Do not repeat any
 * course detail as a literal anywhere else in the codebase.
 *
 * Conventions:
 *  - `price` is the raw number, `priceDisplay` the formatted string.
 *  - "inc GST" is NEVER baked into priceDisplay — render `GST_SUFFIX` as a
 *    separate element next to the price.
 *  - Time ranges use an en-dash: 6pm–9pm.
 */

export const GST_SUFFIX = "inc GST";

export interface CourseAddOn {
  name: string;
  price: number;
  priceDisplay: string;
  note: string;
  inclusions: string[];
}

export interface Course {
  id: string;
  /** Canonical short name — use this everywhere. */
  name: string;
  duration: string;
  format: string;
  whoItsFor: string;
  price: number;
  priceDisplay: string;
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
    whoItsFor:
      "For applicants going for both domestic and commercial (low-rise) registration who want the most thorough preparation possible.",
    price: 7995,
    priceDisplay: "$7,995",
    practiceQuestions: "600+",
    inclusions: [
      "600+ practice questions with detailed explanations",
      "Comprehensive training materials and resources",
      "Complete application and portfolio preparation",
      "BPC test preparation and practice sessions",
      "Pass first time, or we sit you down again for free — at no extra cost",
      "Small group training (maximum 10 students)",
      "One-on-one consultation sessions",
      "Interview preparation and mock interviews",
      "Post-registration support and guidance",
      "8-month access to online testing platform",
    ],
  },
  {
    id: "evening",
    // NOTE: price is identical to the 9-week Private 1-on-1 Training below.
    // Pending client (Adrian) confirmation — do not change without sign-off.
    name: "Evening Builder Course",
    duration: "7 weeks",
    format: "Evenings, 1 night per week, 6pm–9pm · In person, small group",
    whoItsFor:
      "For working tradies going for domestic builder registration who can't take time off during the day.",
    price: 5650,
    priceDisplay: "$5,650",
    practiceQuestions: "600+",
    inclusions: [
      "7 evening sessions (6pm–9pm, one night per week)",
      "Small group training (maximum 10 students)",
      "600+ Q&A practice tests with explanations",
      "Complete application preparation support",
      "Portfolio development and review",
      "Pass first time, or we sit you down again for free — at no extra cost",
      "All training materials included",
      "BPC interview preparation",
      "Post-course support via email/phone",
    ],
  },
  {
    id: "private",
    // NOTE: price is identical to the 7-week Evening Builder Course above.
    // Pending client (Adrian) confirmation — do not change without sign-off.
    name: "Private 1-on-1 Training",
    duration: "9 weeks",
    format: "One-on-one, 3 hours per week via Zoom",
    whoItsFor:
      "For people who want individual coaching and flexible scheduling, or training tailored to their specific gaps.",
    price: 5650,
    priceDisplay: "$5,650",
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
    whoItsFor:
      "For qualified carpenters going for DB-L (Domestic Builder – Limited) registration.",
    price: 3790,
    priceDisplay: "$3,790",
    practiceQuestions: "450+",
    inclusions: [
      "450+ carpentry-specific practice questions",
      "DB-L focused training materials",
      "Application guidance and support",
      "BPC interview preparation",
      "Technical knowledge assessment",
      "Portfolio development support",
      "Small group format (max 10 students)",
      "Email support throughout the course",
    ],
    addOn: {
      name: "Application Prep Package",
      price: 1460,
      priceDisplay: "+$1,460",
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

/** e.g. "600+ practice questions and answers (450+ for the carpentry course)" */
export const practiceQuestionsSummary = `${courseById.comprehensive.practiceQuestions} practice questions and answers (${courseById.carpentry.practiceQuestions} for the carpentry course)`;
