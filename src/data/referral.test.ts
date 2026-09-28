import { describe, expect, test } from "bun:test";

import { REFERRER_GIFT_CARD_AUD, summariseReferralRewards } from "./referral";

describe("summariseReferralRewards", () => {
  test("should count a Paid Out referral as earned", () => {
    const { earnedAud } = summariseReferralRewards([{ status: "Paid Out" }]);

    expect(earnedAud).toBe(REFERRER_GIFT_CARD_AUD);
  });

  test("should not count an Enrolled referral as earned", () => {
    const { earnedAud } = summariseReferralRewards([{ status: "Enrolled" }]);

    expect(earnedAud).toBe(0);
  });

  test("should count an Enrolled referral as pending", () => {
    const { pendingAud } = summariseReferralRewards([{ status: "Enrolled" }]);

    expect(pendingAud).toBe(REFERRER_GIFT_CARD_AUD);
  });

  test("should not count a Paid Out referral as pending", () => {
    const { pendingAud } = summariseReferralRewards([{ status: "Paid Out" }]);

    expect(pendingAud).toBe(0);
  });

  test("should count Enrolled and Paid Out referrals as successful enrolments", () => {
    const { successfulEnrolments } = summariseReferralRewards([
      { status: "Enrolled" },
      { status: "Paid Out" },
      { status: "Pending" },
    ]);

    expect(successfulEnrolments).toBe(2);
  });

  test("should leave every total at zero when referrals are only Pending or unset", () => {
    const summary = summariseReferralRewards([{ status: "Pending" }, { status: null }]);

    expect(summary).toEqual({ successfulEnrolments: 0, earnedAud: 0, pendingAud: 0 });
  });
});
