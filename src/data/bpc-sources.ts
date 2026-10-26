/**
 * The BPC pages (and the two non-BPC sources) that the BPC exam guide and the
 * Domestic Builder class pages cite. Labels carry each page's own "last updated" date
 * as it was when last checked; the check log is .ai/bpc-guide-sources.md. When a source
 * changes, re-check every page that cites it.
 */
export const SOURCES = {
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

export type SourceKey = keyof typeof SOURCES;
