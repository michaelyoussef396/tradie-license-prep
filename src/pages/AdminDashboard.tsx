import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Users, GitBranch, GraduationCap, Share2, LogOut } from "lucide-react";
import qualifyProLogo from "@/assets/qualify-pro-logo.png";
import NewLeadsTab from "@/components/admin/NewLeadsTab";
import PipelineTab from "@/components/admin/PipelineTab";
import StudentsTab from "@/components/admin/StudentsTab";
import ReferralsTab from "@/components/admin/ReferralsTab";

const tabs = [
  { id: "leads", label: "New Leads", icon: Users },
  { id: "pipeline", label: "Pipeline", icon: GitBranch },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "referrals", label: "Referrals", icon: Share2 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin");
        return;
      }
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/admin");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0f172a]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <img src={qualifyProLogo} alt="Qualify Pro" className="h-8" />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#1B4FD8] text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-[#1e293b] border-b border-gray-700 flex items-center justify-between px-6">
          <h2 className="text-white font-semibold">Qualify Pro Admin</h2>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Tab content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "leads" && <NewLeadsTab />}
          {activeTab === "pipeline" && <PipelineTab />}
          {activeTab === "students" && <StudentsTab />}
          {activeTab === "referrals" && <ReferralsTab />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
