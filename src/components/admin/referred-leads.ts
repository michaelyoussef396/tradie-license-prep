import { supabase } from "@/integrations/supabase/client";

interface ReferredLeadsResult {
  referredLeadIds: Set<string>;
  error: string | null;
}

/**
 * Lead ids that have a `referrals` row.
 *
 * `leads.used_referral_code` is whatever the enquirer typed, valid or not.
 * The `referrals` row is created server-side by `send-lead-emails` only after
 * `validate_referral_code` matches a real code, so its presence — not the
 * typed string — is what makes a lead an actual referral.
 */
export const fetchReferredLeadIds = async (leadIds: string[]): Promise<ReferredLeadsResult> => {
  if (leadIds.length === 0) return { referredLeadIds: new Set(), error: null };

  const { data, error } = await supabase
    .from("referrals")
    .select("referred_lead_id")
    .in("referred_lead_id", leadIds);

  if (error) return { referredLeadIds: new Set(), error: error.message };

  const ids = (data || [])
    .map((row) => row.referred_lead_id)
    .filter((id): id is string => Boolean(id));
  return { referredLeadIds: new Set(ids), error: null };
};
