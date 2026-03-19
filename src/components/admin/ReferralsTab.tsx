import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, AlertCircle, CheckCircle, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Referral {
  id: string;
  referrer_student_id: string;
  referred_lead_id: string;
  status: string | null;
  created_at: string | null;
  referrer_name?: string;
  referred_name?: string;
}

const ReferralsTab = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchReferrals = async () => {
    setError(null);
    setLoading(true);

    const { data, error: fetchError } = await supabase
      .from("referrals")
      .select("id, referrer_student_id, referred_lead_id, status, created_at")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      setReferrals([]);
      setLoading(false);
      return;
    }

    // Fetch student and lead names
    const studentIds = [...new Set(data.map((r) => r.referrer_student_id).filter(Boolean))];
    const leadIds = [...new Set(data.map((r) => r.referred_lead_id).filter(Boolean))];

    const [studentsRes, leadsRes] = await Promise.all([
      studentIds.length > 0
        ? supabase.from("students").select("id, name").in("id", studentIds)
        : Promise.resolve({ data: [] }),
      leadIds.length > 0
        ? supabase.from("leads").select("id, name").in("id", leadIds)
        : Promise.resolve({ data: [] }),
    ]);

    const studentMap = new Map((studentsRes.data || []).map((s) => [s.id, s.name]));
    const leadMap = new Map((leadsRes.data || []).map((l) => [l.id, l.name]));

    const enriched = data.map((r) => ({
      ...r,
      referrer_name: studentMap.get(r.referrer_student_id) || "Unknown",
      referred_name: leadMap.get(r.referred_lead_id) || "Unknown",
    }));

    setReferrals(enriched);
    setLoading(false);
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    const { error } = await supabase.from("referrals").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Status changed to ${newStatus}` });
      setReferrals((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    }
    setUpdating(null);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-AU", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const statusBadge = (status: string | null) => {
    const s = status || "Pending";
    const colors: Record<string, string> = {
      Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Enrolled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Paid Out": "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return (
      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colors[s] || colors.Pending}`}>
        {s}
      </span>
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#1B4FD8]" /></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-red-400">{error}</p>
        <Button onClick={fetchReferrals} className="bg-[#1B4FD8] text-white">Retry</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Referrals ({referrals.length})</h2>
      </div>

      {referrals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-400 text-lg">No referrals yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-400">Referrer</TableHead>
                <TableHead className="text-gray-400">Referred Lead</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((r) => (
                <TableRow key={r.id} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell className="text-white font-medium">{r.referrer_name}</TableCell>
                  <TableCell className="text-gray-300">{r.referred_name}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{formatDate(r.created_at)}</TableCell>
                  <TableCell>{statusBadge(r.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {r.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updating === r.id}
                          onClick={() => updateStatus(r.id, "Enrolled")}
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                        >
                          {updating === r.id ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <CheckCircle className="h-3 w-3 mr-1" />}
                          Mark Enrolled
                        </Button>
                      )}
                      {r.status === "Enrolled" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updating === r.id}
                          onClick={() => updateStatus(r.id, "Paid Out")}
                          className="border-green-500/50 text-green-400 hover:bg-green-500/20 hover:text-green-300"
                        >
                          {updating === r.id ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <DollarSign className="h-3 w-3 mr-1" />}
                          Mark Paid Out
                        </Button>
                      )}
                      {r.status === "Paid Out" && (
                        <span className="text-green-400 text-sm">✓ Complete</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ReferralsTab;
