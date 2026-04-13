import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, CheckCircle, Users, DollarSign, LogOut, Loader2, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import qualifyProLogo from "@/assets/qualify-pro-logo.png";

interface StudentData {
  id: string;
  name: string;
  referral_code: string | null;
}

interface ReferralRow {
  id: string;
  status: string | null;
  created_at: string | null;
  referred_lead_id: string;
  lead_name?: string;
}

const StudentDashboard = () => {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [referrals, setReferrals] = useState<ReferralRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }

      const email = session.user.email;
      const { data: studentData } = await supabase
        .from("students")
        .select("id, name, referral_code")
        .eq("email", email!)
        .maybeSingle();

      if (!studentData) {
        toast({ title: "No student record found", description: "Contact Adrian for help.", variant: "destructive" });
        setLoading(false);
        return;
      }

      setStudent(studentData);

      // Fetch referrals for this student
      const { data: refData } = await supabase
        .from("referrals")
        .select("id, status, created_at, referred_lead_id")
        .eq("referrer_student_id", studentData.id)
        .order("created_at", { ascending: false });

      if (refData && refData.length > 0) {
        // Use secure RPC that returns only id and first name (no PII)
        const { data: leadsData } = await supabase.rpc("get_my_referred_leads");

        const leadMap = new Map((leadsData || []).map((l: { id: string; name: string }) => [l.id, l.name]));
        setReferrals(refData.map((r) => ({ ...r, lead_name: leadMap.get(r.referred_lead_id) })));
      }

      setLoading(false);
    };

    load();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/admin");
    });
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleCopy = () => {
    if (!student?.referral_code) return;
    navigator.clipboard.writeText(student.referral_code);
    setCopied(true);
    toast({ title: "Copied!", description: "Referral code copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const enrolled = referrals.filter((r) => r.status === "Enrolled" || r.status === "Paid Out").length;
  const totalRewards = enrolled * 100;

  const formatDate = (d: string | null) => {
    if (!d) return "";
    return new Date(d).toLocaleString("en-AU", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const firstName = (name?: string) => (name ? name.split(" ")[0] : "—");

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4FD8]" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white gap-4">
        <p className="text-lg">No student record found for your account.</p>
        <Button onClick={handleLogout} variant="outline" className="border-gray-600 text-gray-300">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="bg-[#1e293b] border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={qualifyProLogo} alt="Qualify Pro" className="w-32 sm:w-40" />
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-white hover:bg-gray-700">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Welcome back, {firstName(student.name)}
          </h1>
          <p className="text-gray-400">Manage your referrals and track rewards</p>
        </div>

        {/* Referral Code Card */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Your Referral Code</p>
              <p className="text-3xl sm:text-4xl font-bold font-mono text-[#1B4FD8] tracking-wider">
                {student.referral_code || "—"}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Share this code with tradie mates. They get $100 off, you earn $100 cash.
              </p>
            </div>
            <Button
              onClick={handleCopy}
              className="bg-[#1B4FD8] hover:bg-[#1640b0] text-white shrink-0"
              disabled={!student.referral_code}
            >
              {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy Code"}
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm">Total Referrals</span>
            </div>
            <p className="text-3xl font-bold text-white">{referrals.length}</p>
          </div>
          <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Gift className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-gray-400 text-sm">Successful Enrolments</span>
            </div>
            <p className="text-3xl font-bold text-white">{enrolled}</p>
          </div>
          <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-yellow-400" />
              </div>
              <span className="text-gray-400 text-sm">Total Rewards Earned</span>
            </div>
            <p className="text-3xl font-bold text-white">${totalRewards}</p>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Referral History</h2>
          </div>
          {referrals.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No referrals yet. Share your code to start earning!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Referred</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((r) => (
                    <TableRow key={r.id} className="border-gray-700 hover:bg-gray-800/50">
                      <TableCell className="text-gray-400 text-sm">{formatDate(r.created_at)}</TableCell>
                      <TableCell className="text-white">{firstName(r.lead_name)}</TableCell>
                      <TableCell>{statusBadge(r.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
