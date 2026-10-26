/**
 * SINGLE SOURCE OF TRUTH for how fast a new enquiry gets a call back.
 *
 * Source: Adrian's commitment to call new enquiries within 1 hour, 9am–9pm,
 * relayed in writing by Vryan (email to Michael, 23 Oct 2026: "He can commit
 * to it"). Michael accepted the relay as confirmation on 26 Oct 2026. It
 * replaces the old, unconfirmed "within 24 hours" (HANDOFF §5 row 4).
 *
 * The commitment is conditional on when the enquiry arrives, and the toasts,
 * /thank-you and the auto-reply show whenever someone submits (11pm included),
 * so the wording states the condition rather than a bare "within the hour".
 *
 * Scope: phone call-backs on form enquiries only. The separate "we respond to
 * emails within 24 hours" lines on /contact are about hello@ email and are not
 * covered by this commitment.
 *
 * The edge function `send-lead-emails` deploys separately and cannot import
 * this module, so its auto-reply repeats CALLBACK_PROMISE as a literal
 * (`callback.test.ts` checks the two agree). Change both together.
 */

/** A full sentence: "Enquiries between 9am and 9pm get a call back within the hour." */
export const CALLBACK_PROMISE = "Enquiries between 9am and 9pm get a call back within the hour.";

/** Short form for badges and bullet lists. */
export const CALLBACK_BADGE = "1-hour call back on 9am–9pm enquiries";
