import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Calendar, Loader2, AlertCircle, Mail, Tag, Clock, MessageSquare, Globe, StickyNote } from "lucide-react";
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
  status: string | null;
  used_referral_code: string | null;
}

const STATUS_COLUMNS = [
  { key: "new", label: "New", color: "bg-blue-500" },
  { key: "thinking_about_it", label: "Thinking About It", color: "bg-orange-500" },
  { key: "qualified", label: "Qualified", color: "bg-green-500" },
  { key: "enrolled", label: "Enrolled", color: "bg-purple-500" },
  { key: "completed", label: "Completed", color: "bg-teal-500" },
  { key: "dead", label: "Dead", color: "bg-red-500" },
];

const ALL_STATUSES = [
  { value: "new", label: "New" },
  { value: "thinking_about_it", label: "Thinking About It" },
  { value: "qualified", label: "Qualified" },
  { value: "enrolled", label: "Enrolled" },
  { value: "completed", label: "Completed" },
  { value: "followed_up_3", label: "Followed Up (Day 3)" },
  { value: "followed_up_7", label: "Followed Up (Day 7)" },
  { value: "review_requested", label: "Review Requested" },
  { value: "dead", label: "Dead" },
];

const PipelineTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editNotes, setEditNotes] = useState("");
  const { toast } = useToast();

  const fetchLeads = async () => {
    setError(null);
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (fetchError) { setError(fetchError.message); setLoading(false); return; }
    setLeads((data || []) as Lead[]);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-AU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setEditNotes(lead.notes || "");
    setSheetOpen(true);
  };

  const updateLeadStatus = async (newStatus: string) => {
    if (!selectedLead) return;
    const { error: updateError } = await supabase.from("leads").update({ status: newStatus }).eq("id", selectedLead.id);
    if (updateError) { toast({ title: "Error", description: updateError.message, variant: "destructive" }); return; }
    setLeads((prev) => prev.map((l) => l.id === selectedLead.id ? { ...l, status: newStatus } : l));
    setSelectedLead((prev) => prev ? { ...prev, status: newStatus } : null);
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    const { error: updateError } = await supabase.from("leads").update({ notes: editNotes || null }).eq("id", selectedLead.id);
    if (updateError) { toast({ title: "Error saving notes", description: updateError.message, variant: "destructive" }); return; }
    setLeads((prev) => prev.map((l) => l.id === selectedLead.id ? { ...l, notes: editNotes } : l));
  };

  const sendReviewRequest = async () => {
    if (!selectedLead) return;
    toast({ title: "Review request sent", description: `Email sent to ${selectedLead.email}` });
    await updateLeadStatus("review_requested");
  };

  const getStatusColor = (status: string | null) => {
    return STATUS_COLUMNS.find((s) => s.key === status)?.color || "bg-gray-500";
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#1B4FD8]" /></div>;
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

  return (
    <>
      <h2 className="text-xl font-bold text-white mb-4">Pipeline</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUS_COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.key);
          return (
            <div key={col.key} className="min-w-[250px] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${col.color}`} />
                <h3 className="text-sm font-semibold text-white">{col.label}</h3>
                <span className="text-xs text-gray-400">({colLeads.length})</span>
              </div>
              <div className="space-y-2">
                {colLeads.map((lead) => (
                  <Card key={lead.id} className="bg-[#1e293b] border-gray-700 cursor-pointer hover:border-gray-500 transition-colors" onClick={() => openDetail(lead)}>
                    <CardContent className="p-3 space-y-2">
                      <p className="text-white font-semibold text-sm">{lead.name}</p>
                      {lead.used_referral_code && (
                        <span className="inline-block bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">🎁 REFERRAL: $100 OFF</span>
                      )}
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-[#1B4FD8] text-xs hover:underline">
                          <Phone className="h-3 w-3" /> {lead.phone}
                        </a>
                      )}
                      <p className="text-gray-500 text-xs">{formatDate(lead.created_at)}</p>
                    </CardContent>
                  </Card>
                ))}
                {colLeads.length === 0 && <p className="text-gray-600 text-xs text-center py-4">No leads</p>}
              </div>
            </div>
          );
        })}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="bg-[#1e293b] border-gray-700 text-white overflow-y-auto w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white">{selectedLead?.name}</SheetTitle>
          </SheetHeader>
          {selectedLead && (
            <div className="space-y-4 mt-4">
              {selectedLead.phone && (
                <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 text-lg font-bold text-[#1B4FD8] hover:underline">
                  <Phone className="h-5 w-5" /> {selectedLead.phone}
                </a>
              )}
              <div className="flex items-center gap-2 text-gray-300"><Mail className="h-4 w-4" /> {selectedLead.email}</div>
              {selectedLead.license_type && <div className="flex items-center gap-2 text-gray-300"><Tag className="h-4 w-4" /> {selectedLead.license_type}</div>}
              {selectedLead.years_experience && <div className="flex items-center gap-2 text-gray-300"><Clock className="h-4 w-4" /> {selectedLead.years_experience} years</div>}
              {selectedLead.message && <div className="flex items-start gap-2 text-gray-300"><MessageSquare className="h-4 w-4 mt-1" /> <span>{selectedLead.message}</span></div>}
              {selectedLead.source && <div className="flex items-center gap-2 text-gray-400 text-sm"><Globe className="h-4 w-4" /> {selectedLead.source}</div>}
              <div className="flex items-center gap-2 text-gray-500 text-sm"><Calendar className="h-4 w-4" /> {formatDate(selectedLead.created_at)}</div>

              {/* Status dropdown */}
              <div className="space-y-1">
                <label className="text-gray-400 text-sm">Status</label>
                <Select value={selectedLead.status || "new"} onValueChange={updateLeadStatus}>
                  <SelectTrigger className="bg-[#0f172a] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e293b] border-gray-600">
                    {ALL_STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value} className="text-white hover:bg-gray-700">{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400 text-sm"><StickyNote className="h-4 w-4" /> Notes</div>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  onBlur={saveNotes}
                  placeholder="Add notes..."
                  className="bg-[#0f172a] border-gray-600 text-white text-sm"
                />
              </div>

              {/* Review request button */}
              {selectedLead.status === "completed" && (
                <Button className="w-full bg-[#1B4FD8] hover:bg-[#1640b0] text-white" onClick={sendReviewRequest}>
                  📧 Send Review Request
                </Button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PipelineTab;
