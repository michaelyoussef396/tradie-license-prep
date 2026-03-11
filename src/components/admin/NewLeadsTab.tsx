import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Calendar, Tag, Clock, MessageSquare, Globe } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  license_type: string | null;
  years_experience: string | null;
  message: string | null;
  source: string | null;
  created_at: string | null;
}

const NewLeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .eq("status", "new")
      .order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  if (loading) return <div className="text-gray-400">Loading leads...</div>;

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-2xl text-gray-400">No new leads right now 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-4">New Leads ({leads.length})</h2>
      {leads.map((lead) => (
        <Card key={lead.id} className="bg-[#1e293b] border-gray-700">
          <CardContent className="p-5 space-y-3">
            <h3 className="text-xl font-bold text-white">{lead.name}</h3>
            
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-lg font-bold text-[#1B4FD8] hover:underline">
                <Phone className="h-5 w-5" /> {lead.phone}
              </a>
            )}
            
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="h-4 w-4" /> {lead.email}
            </div>

            {lead.license_type && (
              <div className="flex items-center gap-2 text-gray-300">
                <Tag className="h-4 w-4" /> {lead.license_type}
              </div>
            )}

            {lead.years_experience && (
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" /> {lead.years_experience} years experience
              </div>
            )}

            {lead.message && (
              <div className="flex items-start gap-2 text-gray-300">
                <MessageSquare className="h-4 w-4 mt-1" /> <span>{lead.message}</span>
              </div>
            )}

            {lead.source && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Globe className="h-4 w-4" /> {lead.source}
              </div>
            )}

            {lead.created_at && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="h-4 w-4" /> {new Date(lead.created_at).toLocaleString("en-AU")}
              </div>
            )}

            <div className="space-y-2 pt-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-6"
                onClick={() => updateStatus(lead.id, "qualified")}
              >
                ✅ Qualified
              </Button>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base py-6"
                onClick={() => updateStatus(lead.id, "thinking_about_it")}
              >
                🤔 Thinking About It
              </Button>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-6"
                onClick={() => updateStatus(lead.id, "dead")}
              >
                ❌ Dead — Not Interested
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewLeadsTab;
