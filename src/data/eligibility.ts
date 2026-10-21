/**
 * SINGLE SOURCE OF TRUTH for the BPC experience minimums.
 *
 * Confirmed by Adrian 9 Sep 2026. The minimum depends on the registration
 * class, so no page, form or FAQ may present one figure as "the" BPC minimum.
 * Class-neutral copy must use EXPERIENCE_BY_CLASS_SUMMARY.
 *
 * HOLD (21 Oct 2026): the Domestic Builder (Limited) figure — "at least 2 years
 * ... such as carpentry" — is off the site. The BPC's "What is domestic building
 * work?" info sheet lists at least 3 years for carpentry (2 for framing, 1 for
 * external wall cladding), so no limited-class figure is stated until Adrian
 * confirms in writing. Prior wording: .ai/HANDOFF.md §2.18.
 */

export const UNLIMITED_MINIMUM_YEARS = 3;
export const UNLIMITED_MINIMUM_PROJECTS = 3;

/**
 * Domestic Builder (Unlimited). Names its class deliberately: the figure is
 * confirmed for that class only, and the Comprehensive course is also sold for
 * Commercial (Low-Rise), whose minimum is not yet confirmed.
 */
export const UNLIMITED_EXPERIENCE_SUMMARY = `For Domestic Builder (Unlimited), at least ${UNLIMITED_MINIMUM_YEARS} years' experience working under a registered building practitioner, across a minimum of ${UNLIMITED_MINIMUM_PROJECTS} projects.`;

/** Commercial (Low-Rise) minimum is unconfirmed — never state a figure for it. */
export const COMMERCIAL_EXPERIENCE_NOTE =
  "Requirements for Commercial (Low-Rise) registration differ — ask and we'll confirm what applies to you.";

/**
 * Domestic Builder (Limited) classes, e.g. carpentry DB-L. On HOLD — states no
 * figure (see header).
 */
export const LIMITED_EXPERIENCE_SUMMARY =
  "Domestic Builder (Limited) classes such as carpentry each have their own experience requirement — ask and we'll confirm what applies to you.";

/** For copy that is not tied to one registration class. */
export const EXPERIENCE_BY_CLASS_SUMMARY = `The minimum depends on the class you're applying for: at least ${UNLIMITED_MINIMUM_YEARS} years working under a registered building practitioner, across a minimum of ${UNLIMITED_MINIMUM_PROJECTS} projects, for Domestic Builder (Unlimited). ${LIMITED_EXPERIENCE_SUMMARY}`;

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
    return `Domestic Builder (Limited) classes such as carpentry each have their own experience requirement. ${ENQUIRY_INVITATION}`;
  }
  return `${EXPERIENCE_BY_CLASS_SUMMARY} ${ENQUIRY_INVITATION}`;
}
