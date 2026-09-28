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

export interface ReferralRewardSummary {
  successfulEnrolments: number;
  earnedAud: number;
  pendingAud: number;
}

/**
 * Display totals for a referrer. "Enrolled" is pending — the gift card is paid
 * once that course is fully paid — and only "Paid Out" counts as earned. Adrian
 * sets the statuses in the admin Referrals tab; nothing here changes them.
 */
export function summariseReferralRewards(referrals: { status: string | null }[]): ReferralRewardSummary {
  const enrolledCount = referrals.filter((r) => r.status === "Enrolled").length;
  const paidOutCount = referrals.filter((r) => r.status === "Paid Out").length;
  return {
    successfulEnrolments: enrolledCount + paidOutCount,
    earnedAud: paidOutCount * REFERRER_GIFT_CARD_AUD,
    pendingAud: enrolledCount * REFERRER_GIFT_CARD_AUD,
  };
}
