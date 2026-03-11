import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { X, Loader2, CheckCircle, XCircle, FlaskConical } from "lucide-react";

interface TestResult {
  name: string;
  status: "pending" | "running" | "pass" | "fail";
  detail: string;
}

const INITIAL_TESTS: TestResult[] = [
  { name: "Seed test leads", status: "pending", detail: "" },
  { name: "New Leads tab", status: "pending", detail: "" },
  { name: "Status update", status: "pending", detail: "" },
  { name: "Pipeline tab", status: "pending", detail: "" },
  { name: "Notes saving", status: "pending", detail: "" },
  { name: "Add student", status: "pending", detail: "" },
  { name: "Welcome email", status: "pending", detail: "" },
  { name: "Follow-up function", status: "pending", detail: "" },
  { name: "Clean up", status: "pending", detail: "" },
];

const TestRunner = ({ onClose }: { onClose: () => void }) => {
  const [tests, setTests] = useState<TestResult[]>(INITIAL_TESTS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const update = (idx: number, status: TestResult["status"], detail: string) => {
    setTests((prev) => prev.map((t, i) => (i === idx ? { ...t, status, detail } : t)));
  };

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const runTests = async () => {
    setRunning(true);
    setDone(false);
    setTests(INITIAL_TESTS);

    let testStudentId = "";
    let testReferralCode = "";

    // Test 1 — Seed leads
    update(0, "running", "Inserting 3 test leads...");
    try {
      const { error } = await supabase.from("leads").insert([
        { name: "Test Tradie One", email: "test1@test.com", phone: "0411111111", license_type: "Domestic Builder Unlimited", years_experience: "6-10 years", message: "Interested in BPC", source: "contact-form", status: "new" },
        { name: "Test Tradie Two", email: "test2@test.com", phone: "0422222222", license_type: "General Builder", years_experience: "11+ years", message: "Ready to enrol", source: "contact-form", status: "thinking_about_it" },
        { name: "Test Tradie Three", email: "test3@test.com", phone: "0433333333", license_type: "Specialist", years_experience: "3-5 years", message: "Just looking", source: "contact-form", status: "qualified" },
      ]);
      if (error) throw error;
      update(0, "pass", "3 leads seeded");
    } catch (e: any) {
      update(0, "fail", e.message);
    }

    await delay(500);

    // Test 2 — New leads visible
    update(1, "running", "Checking New Leads...");
    try {
      const { data, error } = await supabase.from("leads").select("*").eq("status", "new").eq("email", "test1@test.com");
      if (error) throw error;
      if (data && data.length > 0) update(1, "pass", "Test Tradie One found in New Leads");
      else update(1, "fail", "Test Tradie One not found");
    } catch (e: any) {
      update(1, "fail", e.message);
    }

    await delay(300);

    // Test 3 — Status update
    update(2, "running", "Updating status...");
    try {
      const { error } = await supabase.from("leads").update({ status: "thinking_about_it" }).eq("email", "test1@test.com");
      if (error) throw error;
      const { data } = await supabase.from("leads").select("*").eq("status", "new").eq("email", "test1@test.com");
      if (data && data.length === 0) update(2, "pass", "Status updated, removed from New Leads");
      else update(2, "fail", "Lead still in New Leads after update");
    } catch (e: any) {
      update(2, "fail", e.message);
    }

    await delay(300);

    // Test 4 — Pipeline
    update(3, "running", "Checking Pipeline columns...");
    try {
      const { data: thinking } = await supabase.from("leads").select("*").eq("status", "thinking_about_it").like("email", "%@test.com");
      const { data: qualified } = await supabase.from("leads").select("*").eq("status", "qualified").like("email", "%@test.com");
      const thinkingCount = thinking?.length || 0;
      const qualifiedCount = qualified?.length || 0;
      if (thinkingCount >= 2 && qualifiedCount >= 1) {
        update(3, "pass", `Thinking About It: ${thinkingCount}, Qualified: ${qualifiedCount}`);
      } else {
        update(3, "fail", `Expected 2 thinking + 1 qualified, got ${thinkingCount} + ${qualifiedCount}`);
      }
    } catch (e: any) {
      update(3, "fail", e.message);
    }

    await delay(300);

    // Test 5 — Notes
    update(4, "running", "Saving notes...");
    try {
      await supabase.from("leads").update({ notes: "Test note 123" }).eq("email", "test2@test.com");
      const { data } = await supabase.from("leads").select("notes").eq("email", "test2@test.com").single();
      if (data?.notes === "Test note 123") update(4, "pass", "Notes saved and persisted");
      else update(4, "fail", `Notes mismatch: ${data?.notes}`);
    } catch (e: any) {
      update(4, "fail", e.message);
    }

    await delay(300);

    // Test 6 — Add student
    update(5, "running", "Creating student...");
    try {
      const code = "TEST-" + Math.floor(1000 + Math.random() * 9000);
      testReferralCode = code;
      const { data: student, error: sErr } = await supabase.from("students").insert({
        name: "Test Student", email: "test@test.com", phone: "0444444444", course: "BPC Registration",
        referral_code: code, status: "active",
      }).select().single();
      if (sErr) throw sErr;
      testStudentId = student.id;

      const { error: rcErr } = await supabase.from("referral_codes").insert({ student_id: student.id, code });
      if (rcErr) throw rcErr;

      // Verify
      const { data: rcData } = await supabase.from("referral_codes").select("*").eq("code", code);
      if (rcData && rcData.length > 0) update(5, "pass", `Student created with code ${code}`);
      else update(5, "fail", "Referral code not found in referral_codes table");
    } catch (e: any) {
      update(5, "fail", e.message);
    }

    await delay(300);

    // Test 7 — Welcome email
    update(6, "running", "Invoking send-student-welcome...");
    try {
      const { error } = await supabase.functions.invoke("send-student-welcome", {
        body: { name: "Test Student", email: "test@test.com", referralCode: testReferralCode },
      });
      if (error) throw error;
      update(6, "pass", "Welcome email sent");
    } catch (e: any) {
      update(6, "fail", e.message);
    }

    await delay(300);

    // Test 8 — Follow-up function
    update(7, "running", "Invoking send-followup-emails...");
    try {
      const { data, error } = await supabase.functions.invoke("send-followup-emails", { body: {} });
      if (error) throw error;
      update(7, "pass", `Function responded: ${JSON.stringify(data)}`);
    } catch (e: any) {
      update(7, "fail", e.message);
    }

    await delay(300);

    // Test 9 — Cleanup
    update(8, "running", "Cleaning up test data...");
    try {
      // Delete referral codes for test student
      if (testStudentId) {
        await supabase.from("referral_codes").delete().eq("student_id", testStudentId);
      }
      // Delete test student
      await supabase.from("students").delete().eq("email", "test@test.com");
      // Delete test leads
      await supabase.from("leads").delete().like("email", "%@test.com");
      update(8, "pass", "Test data cleaned up");
    } catch (e: any) {
      update(8, "fail", e.message);
    }

    setRunning(false);
    setDone(true);
  };

  const passCount = tests.filter((t) => t.status === "pass").length;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <FlaskConical className="h-5 w-5" /> Test Runner
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-4 space-y-2">
          {tests.map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#0f172a]">
              <div className="mt-0.5">
                {t.status === "pending" && <div className="w-5 h-5 rounded-full border-2 border-gray-600" />}
                {t.status === "running" && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
                {t.status === "pass" && <CheckCircle className="w-5 h-5 text-green-400" />}
                {t.status === "fail" && <XCircle className="w-5 h-5 text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">Test {i + 1} — {t.name}</p>
                {t.detail && <p className={`text-xs mt-1 ${t.status === "fail" ? "text-red-400" : "text-gray-400"}`}>{t.detail}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          {done && (
            <p className={`text-center font-bold mb-3 ${passCount === 9 ? "text-green-400" : "text-orange-400"}`}>
              {passCount}/9 tests passed
            </p>
          )}
          <Button
            className="w-full bg-[#1B4FD8] hover:bg-[#1640b0] text-white"
            onClick={runTests}
            disabled={running}
          >
            {running ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Running...</> : "Run Tests"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestRunner;
