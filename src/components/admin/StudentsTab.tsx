import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertCircle, Plus, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course: string | null;
  referral_code: string | null;
  status: string | null;
  created_at: string | null;
}

const COURSES = [
  "Comprehensive Builder Program",
  "Evening Builder Course",
  "Private 1-on-1 Training",
  "Carpentry License Course (DB-L)",
];

const StudentsTab = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "" });
  const { toast } = useToast();

  const fetchStudents = async () => {
    setError(null);
    setLoading(true);
    const { data, error: fetchError } = await supabase.from("students").select("*").order("created_at", { ascending: false });
    if (fetchError) { setError(fetchError.message); setLoading(false); return; }
    setStudents((data || []) as Student[]);
    setLoading(false);
  };

  useEffect(() => { fetchStudents(); }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-AU", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const generateReferralCode = (name: string) => {
    const firstName = name.trim().split(" ")[0].toUpperCase();
    const num = Math.floor(1000 + Math.random() * 9000);
    return `${firstName}-${num}`;
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      toast({ title: "Error", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const referralCode = generateReferralCode(form.name);

    // Insert student
    const { data: studentData, error: studentError } = await supabase.from("students").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      course: form.course || null,
      referral_code: referralCode,
      status: "active",
    }).select().single();

    if (studentError) {
      toast({ title: "Error", description: studentError.message, variant: "destructive" });
      setSaving(false);
      return;
    }

    // Insert referral code
    await supabase.from("referral_codes").insert({
      student_id: studentData.id,
      code: referralCode,
    });

    // Send welcome email
    try {
      await supabase.functions.invoke("send-student-welcome", {
        body: { name: form.name, email: form.email, referralCode },
      });
    } catch {
      // Non-blocking — student is still saved
    }

    toast({ title: "Student added!", description: `Referral code: ${referralCode}` });
    setStudents((prev) => [studentData as Student, ...prev]);
    setForm({ name: "", email: "", phone: "", course: "" });
    setSheetOpen(false);
    setSaving(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#1B4FD8]" /></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-red-400">{error}</p>
        <Button onClick={fetchStudents} className="bg-[#1B4FD8] text-white">Retry</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Students ({students.length})</h2>
        <Button className="bg-[#1B4FD8] hover:bg-[#1640b0] text-white" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Student
        </Button>
      </div>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-400 text-lg">No students yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Phone</TableHead>
                <TableHead className="text-gray-400">Course</TableHead>
                <TableHead className="text-gray-400">Referral Code</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell className="text-white font-medium">{s.name}</TableCell>
                  <TableCell className="text-gray-300">{s.email}</TableCell>
                  <TableCell>
                    {s.phone ? (
                      <a href={`tel:${s.phone}`} className="text-[#1B4FD8] hover:underline flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {s.phone}
                      </a>
                    ) : <span className="text-gray-600">—</span>}
                  </TableCell>
                  <TableCell className="text-gray-300">{s.course || "—"}</TableCell>
                  <TableCell><span className="font-mono text-[#1B4FD8] font-bold">{s.referral_code || "—"}</span></TableCell>
                  <TableCell className="text-gray-300 capitalize">{s.status || "—"}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{formatDate(s.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="bg-[#1e293b] border-gray-700 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">Add Student</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-gray-300">Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-[#0f172a] border-gray-600 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Email *</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-[#0f172a] border-gray-600 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Phone</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[#0f172a] border-gray-600 text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Course</Label>
              <Select value={form.course} onValueChange={(v) => setForm({ ...form, course: v })}>
                <SelectTrigger className="bg-[#0f172a] border-gray-600 text-white">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e293b] border-gray-600">
                  {COURSES.map((c) => (
                    <SelectItem key={c} value={c} className="text-white hover:bg-gray-700">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-[#1B4FD8] hover:bg-[#1640b0] text-white mt-4" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {saving ? "Saving..." : "Save Student"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default StudentsTab;
