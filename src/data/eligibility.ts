/**
 * SINGLE SOURCE OF TRUTH for the BPC experience minimums.
 *
 * Confirmed by Adrian 9 Sep 2026. The minimum depends on the registration
 * class, so no page, form or FAQ may present one figure as "the" BPC minimum.
 * Class-neutral copy must use EXPERIENCE_BY_CLASS_SUMMARY.
 */

export const UNLIMITED_MINIMUM_YEARS = 3;
export const UNLIMITED_MINIMUM_PROJECTS = 3;
export const LIMITED_MINIMUM_YEARS = 2;

/** Domestic Builder (Unlimited). */
export const UNLIMITED_EXPERIENCE_SUMMARY = `At least ${UNLIMITED_MINIMUM_YEARS} years' experience working under a registered building practitioner, across a minimum of ${UNLIMITED_MINIMUM_PROJECTS} projects.`;

/** Domestic Builder (Limited) classes, e.g. carpentry DB-L. */
export const LIMITED_EXPERIENCE_SUMMARY = `BPC requires at least ${LIMITED_MINIMUM_YEARS} years' practical experience for Domestic Builder (Limited) classes such as carpentry.`;

/** For copy that is not tied to one registration class. */
export const EXPERIENCE_BY_CLASS_SUMMARY = `The minimum depends on the class you're applying for: at least ${UNLIMITED_MINIMUM_YEARS} years working under a registered building practitioner, across a minimum of ${UNLIMITED_MINIMUM_PROJECTS} projects, for Domestic Builder (Unlimited), and at least ${LIMITED_MINIMUM_YEARS} years' practical experience for Domestic Builder (Limited) classes such as carpentry.`;

/** Licence-type option values shared with the enquiry forms. */
export const LICENCE_TYPE_UNLIMITED = "Domestic Builder - Unlimited";
export const LICENCE_TYPE_CARPENTRY = "Carpentry Licence (DB-L)";
export const LICENCE_TYPE_COMMERCIAL = "Commercial Building (Low-Rise)";
export const LICENCE_TYPE_UNSURE = "Other / Not Sure";

export const LICENCE_TYPE_OPTIONS = [
  LICENCE_TYPE_UNLIMITED,
  LICENCE_TYPE_CARPENTRY,
  LICENCE_TYPE_COMMERCIAL,
  LICENCE_TYPE_UNSURE,
];

/** The one experience bucket that can fall below every class minimum. */
export const UNDER_MINIMUM_EXPERIENCE = "Under 3";

export const EXPERIENCE_OPTIONS = [UNDER_MINIMUM_EXPERIENCE, "3-5", "5-10", "10+"];

const ENQUIRY_INVITATION = "Send your enquiry anyway and we'll tell you where you stand.";

/**
 * Note shown when an applicant selects the under-3 bucket.
 *
 * Branches on registration class because the BPC minimum is class-dependent.
 * An unknown or unselected class gets the both-classes wording — never a
 * single figure presented as applying to everyone.
 */
export function getUnderMinimumNote(licenceType?: string): string {
  if (licenceType === LICENCE_TYPE_UNLIMITED) {
    return `For Domestic Builder (Unlimited), BPC requires at least ${UNLIMITED_MINIMUM_YEARS} years' experience working under a registered building practitioner, across a minimum of ${UNLIMITED_MINIMUM_PROJECTS} projects. ${ENQUIRY_INVITATION}`;
  }
  if (licenceType === LICENCE_TYPE_CARPENTRY) {
    return `For Domestic Builder (Limited) classes such as carpentry, BPC requires at least ${LIMITED_MINIMUM_YEARS} years' practical experience. ${ENQUIRY_INVITATION}`;
  }
  return `${EXPERIENCE_BY_CLASS_SUMMARY} ${ENQUIRY_INVITATION}`;
}
