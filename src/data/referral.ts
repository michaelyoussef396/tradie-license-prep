/**
 * SINGLE SOURCE OF TRUTH for the referral offer, confirmed by Adrian
 * (Vryan email, 27 Sep 2026).
 *
 * The edge functions `send-lead-emails` and `send-student-welcome` deploy
 * separately and cannot import this module, so they repeat both figures as
 * literals. Change all three together.
 *
 * Adrian approved the discount as a 3-month trial, reviewed internally. That is
 * not a public end date: no expiry, countdown or "limited time" wording on the
 * site. The "$300 off your own course" alternative to the gift card is on HOLD
 * (see .ai/HANDOFF.md) and must not be published.
 */

/** Off the referred new student's course fee. */
export const REFERRED_DISCOUNT_PERCENT = 15;

/** Gift card for the referrer, paid once the referred student's course is fully paid. */
export const REFERRER_GIFT_CARD_AUD = 300;
