import { beforeEach, describe, expect, mock, test } from "bun:test";

type ReferralRow = { referred_lead_id: string | null };

let referralRows: ReferralRow[] = [];
let queryError: { message: string } | null = null;
let lastRequestedIds: string[] | null = null;

mock.module("@/integrations/supabase/client", () => {
  const query = {
    select: () => query,
    in: (_column: string, ids: string[]) => {
      lastRequestedIds = ids;
      return Promise.resolve({ data: referralRows, error: queryError });
    },
  };
  return { supabase: { from: () => query } };
});

const { fetchReferredLeadIds } = await import("./referred-leads");

beforeEach(() => {
  referralRows = [];
  queryError = null;
  lastRequestedIds = null;
});

describe("fetchReferredLeadIds", () => {
  test("should return the ids of leads that have a referrals row", async () => {
    referralRows = [{ referred_lead_id: "lead-a" }, { referred_lead_id: "lead-c" }];

    const { referredLeadIds } = await fetchReferredLeadIds(["lead-a", "lead-b", "lead-c"]);

    expect([...referredLeadIds].sort()).toEqual(["lead-a", "lead-c"]);
  });

  test("should exclude a lead that has no referrals row", async () => {
    referralRows = [{ referred_lead_id: "lead-a" }];

    const { referredLeadIds } = await fetchReferredLeadIds(["lead-a", "lead-b"]);

    expect(referredLeadIds.has("lead-b")).toBe(false);
  });

  test("should return an empty set when no referrals row matches", async () => {
    const { referredLeadIds } = await fetchReferredLeadIds(["lead-a"]);

    expect(referredLeadIds.size).toBe(0);
  });

  test("should query only the lead ids it was given", async () => {
    await fetchReferredLeadIds(["lead-a", "lead-b"]);

    expect(lastRequestedIds).toEqual(["lead-a", "lead-b"]);
  });

  test("should skip the query when given no lead ids", async () => {
    await fetchReferredLeadIds([]);

    expect(lastRequestedIds).toBeNull();
  });

  test("should drop a referrals row with a null referred_lead_id", async () => {
    referralRows = [{ referred_lead_id: null }, { referred_lead_id: "lead-a" }];

    const { referredLeadIds } = await fetchReferredLeadIds(["lead-a"]);

    expect([...referredLeadIds]).toEqual(["lead-a"]);
  });

  test("should surface the query error message", async () => {
    queryError = { message: "permission denied for table referrals" };

    const { error } = await fetchReferredLeadIds(["lead-a"]);

    expect(error).toBe("permission denied for table referrals");
  });

  test("should return an empty set when the query errors", async () => {
    queryError = { message: "permission denied for table referrals" };

    const { referredLeadIds } = await fetchReferredLeadIds(["lead-a"]);

    expect(referredLeadIds.size).toBe(0);
  });
});
