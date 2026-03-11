import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Calendar, Tag, Clock, MessageSquare, Globe, Loader2, AlertCircle, StickyNote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  notes: string | null;
}

const NewLeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notesValues, setNotesValues] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const fetchLeads = useCallback(async () => {
    setError(null);
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .eq("status", "new")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }
    const leadsData = (data || []) as Lead[];
    setLeads(leadsData);
    const notes: Record<string, string> = {};
    leadsData.forEach((l) => { notes[l.id] = l.notes || ""; });
    setNotesValues(notes);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();

    const channel = supabase
      .channel("leads-new-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads", filter: "status=eq.new" }, (payload) => {
        const newLead = payload.new as Lead;
        setLeads((prev) => [newLead, ...prev]);
        setNotesValues((prev) => ({ ...prev, [newLead.id]: newLead.notes || "" }));
        toast({ title: "New lead!", description: `${newLead.name} just enquired.` });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchLeads, toast]);

  const updateStatus = async (id: string, status: string) => {
    const { error: updateError } = await supabase.from("leads").update({ status }).eq("id", id);
    if (updateError) {
      toast({ title: "Error", description: updateError.message, variant: "destructive" });
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const saveNotes = async (id: string) => {
    const { error: updateError } = await supabase.from("leads").update({ notes: notesValues[id] || null }).eq("id", id);
    if (updateError) {
      toast({ title: "Error saving notes", description: updateError.message, variant: "destructive" });
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString("en-AU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4FD8]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-red-400">{error}</p>
        <Button onClick={fetchLeads} className="bg-[#1B4FD8] text-white">Retry</Button>
      </div>
    );
  }

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
                <Calendar className="h-4 w-4" /> {formatDate(lead.created_at)}
              </div>
            )}

            {/* Notes */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <StickyNote className="h-4 w-4" /> Notes
              </div>
              <Textarea
                value={notesValues[lead.id] || ""}
                onChange={(e) => setNotesValues((prev) => ({ ...prev, [lead.id]: e.target.value }))}
                onBlur={() => saveNotes(lead.id)}
                placeholder="Add notes about this lead..."
                className="bg-[#0f172a] border-gray-600 text-white text-sm min-h-[60px]"
              />
            </div>

            <div className="space-y-2 pt-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-6" onClick={() => updateStatus(lead.id, "qualified")}>
                ✅ Qualified
              </Button>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base py-6" onClick={() => updateStatus(lead.id, "thinking_about_it")}>
                🤔 Thinking About It
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-6" onClick={() => updateStatus(lead.id, "dead")}>
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
