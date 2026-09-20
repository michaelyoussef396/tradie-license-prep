/**
 * SINGLE SOURCE OF TRUTH for the BPC experience requirement.
 *
 * Confirmed by Adrian 9 Sep 2026. Any page, form or FAQ that states the entry
 * requirement MUST import from here rather than repeating the figures, so the
 * site can never imply that an under-minimum applicant is eligible.
 */

export const MINIMUM_EXPERIENCE_YEARS = 3;
export const MINIMUM_PROJECTS = 3;

/** Canonical phrasing of the requirement. */
export const MINIMUM_EXPERIENCE_SUMMARY = `At least ${MINIMUM_EXPERIENCE_YEARS} years' experience working under a registered building practitioner, across a minimum of ${MINIMUM_PROJECTS} projects.`;

/** The one option value that falls below the minimum. */
export const UNDER_MINIMUM_EXPERIENCE = "Under 3";

/** Experience buckets for enquiry forms — split on the eligibility threshold. */
export const EXPERIENCE_OPTIONS = [UNDER_MINIMUM_EXPERIENCE, "3-5", "5-10", "10+"];

/** Shown when an applicant selects the under-minimum bucket. */
export const MINIMUM_EXPERIENCE_NOTE = `BPC requires at least ${MINIMUM_EXPERIENCE_YEARS} years' experience working under a registered building practitioner, across a minimum of ${MINIMUM_PROJECTS} projects. Send your enquiry anyway and we'll tell you where you stand.`;
