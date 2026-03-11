import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Users, GitBranch, GraduationCap, LogOut, Menu, X, FlaskConical } from "lucide-react";
import qualifyProLogo from "@/assets/qualify-pro-logo.png";
import NewLeadsTab from "@/components/admin/NewLeadsTab";
import PipelineTab from "@/components/admin/PipelineTab";
import StudentsTab from "@/components/admin/StudentsTab";
import TestRunner from "@/components/admin/TestRunner";

const tabs = [
  { id: "leads", label: "New Leads", icon: Users },
  { id: "pipeline", label: "Pipeline", icon: GitBranch },
  { id: "students", label: "Students", icon: GraduationCap },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }
      setLoading(false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#1e293b] border-r border-gray-700 flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <img src={qualifyProLogo} alt="Qualify Pro" className="w-40" />
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
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
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-[#1e293b] border-b border-gray-700 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-white font-semibold text-sm md:text-base">Qualify Pro Admin</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setShowTests(true)} className="text-gray-400 hover:text-white hover:bg-gray-700">
              <FlaskConical className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Run Tests</span>
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-white hover:bg-gray-700">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {activeTab === "leads" && <NewLeadsTab />}
          {activeTab === "pipeline" && <PipelineTab />}
          {activeTab === "students" && <StudentsTab />}
        </main>
      </div>
      {showTests && <TestRunner onClose={() => setShowTests(false)} />}
    </div>
  );
};

export default AdminDashboard;
