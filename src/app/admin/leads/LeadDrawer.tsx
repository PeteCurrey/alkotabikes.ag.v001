"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Clock, FileText, Download, Trash2, Send, ShieldAlert, MessageSquare } from "lucide-react";

export interface LeadRecord {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  lead_type: string;
  status: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  locale?: string;
  country_code?: string;
  message?: string;
  marketing_consent: boolean;
  consent_text?: string;
  consent_at?: string;
  consent_ip_hash?: string;
  double_optin_at?: string;
  unsubscribed_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  author_id?: string;
  body: string;
  created_at: string;
}

export interface LeadEvent {
  id: string;
  lead_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

export default function LeadDrawer({
  lead,
  onClose,
  onStatusUpdate,
}: {
  lead: LeadRecord | null;
  onClose: () => void;
  onStatusUpdate: () => void;
}) {
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState(lead?.status || "new");
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [events, setEvents] = useState<LeadEvent[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [submittingNote, setSubmittingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      fetchDetails(lead.id);
    }
  }, [lead]);

  const fetchDetails = async (id: string) => {
    setLoadingNotes(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}/sar`);
      if (res.ok) {
        const data = await res.json();
        setNotes(data.lead_notes || []);
        setEvents(data.lead_audit_events || []);
      }
    } catch {
    } finally {
      setLoadingNotes(false);
    }
  };

  if (!lead) return null;

  const handleStatusChange = async (newStatus: string) => {
    setUpdatingStatus(true);
    setActionMsg("");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          action: "update_status",
          status: newStatus,
        }),
      });

      if (res.ok) {
        setStatus(newStatus);
        setActionMsg("Status updated successfully.");
        onStatusUpdate();
        fetchDetails(lead.id);
      }
    } catch {
      setActionMsg("Failed to update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSubmittingNote(true);
    setActionMsg("");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          action: "add_note",
          noteBody: newNote.trim(),
        }),
      });

      if (res.ok) {
        setNewNote("");
        fetchDetails(lead.id);
        setActionMsg("Note appended to audit log.");
      }
    } catch {
      setActionMsg("Failed to add note.");
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleErase = async () => {
    if (!confirm(`PERMANENT DATA ERASURE WARNING:\n\nAre you sure you want to permanently erase lead ${lead.email}? This action CANNOT be undone and will hard-delete the record in accordance with UK GDPR Article 17.`)) {
      return;
    }

    setErasing(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/erase`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Lead record permanently erased.");
        onClose();
        onStatusUpdate();
      } else {
        alert("Failed to execute erasure.");
      }
    } catch {
      alert("Error processing erasure request.");
    } finally {
      setErasing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-alkota-black border-l border-white/15 h-full overflow-y-auto p-6 space-y-8 text-xs font-mono shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] text-alkota-signal uppercase font-bold tracking-widest block">
              LEAD RECORD DETAIL
            </span>
            <h2 className="text-xl font-bold text-white font-display uppercase tracking-tight">
              {lead.full_name || lead.email}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-white/10 hover:border-white text-alkota-slate hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {actionMsg && (
          <div className="p-3 bg-alkota-signal/10 border border-alkota-signal text-alkota-signal font-bold text-[11px]">
            {actionMsg}
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-1 border-b border-white/10 pb-4">
          <a
            href={`/api/admin/leads/${lead.id}/sar`}
            download
            className="px-3 py-2 bg-white/5 border border-white/20 hover:border-alkota-signal text-white text-[11px] uppercase font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-alkota-signal" />
            <span>EXPORT SAR (JSON)</span>
          </a>

          <button
            type="button"
            onClick={handleErase}
            disabled={erasing}
            className="px-3 py-2 bg-red-950/40 border border-red-500/50 hover:bg-red-900/60 text-red-200 text-[11px] uppercase font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>ERASE RECORD (GDPR)</span>
          </button>
        </div>

        {/* Core Attributes */}
        <div className="space-y-4">
          <div className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest border-b border-white/10 pb-1">
            IDENTITY &amp; REGIONAL CONTEXT
          </div>

          <div className="grid grid-cols-2 gap-4 bg-alkota-carbon p-4 border border-white/10">
            <div>
              <span className="text-alkota-slate text-[10px] block uppercase">EMAIL</span>
              <span className="text-white font-bold text-sm truncate block">{lead.email}</span>
            </div>
            <div>
              <span className="text-alkota-slate text-[10px] block uppercase">LEAD TYPE</span>
              <span className="text-alkota-signal font-bold text-xs uppercase block">{lead.lead_type}</span>
            </div>
            <div>
              <span className="text-alkota-slate text-[10px] block uppercase">PHONE</span>
              <span className="text-white font-light text-xs block">{lead.phone || "N/A"}</span>
            </div>
            <div>
              <span className="text-alkota-slate text-[10px] block uppercase">LOCALE / COUNTRY</span>
              <span className="text-white font-light text-xs block">{lead.locale || "en-GB"} ({lead.country_code || "GB"})</span>
            </div>
          </div>
        </div>

        {/* Status Control */}
        <div className="space-y-2">
          <span className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest block">
            STATUS MANAGEMENT
          </span>
          <div className="flex items-center gap-3 bg-alkota-carbon p-3 border border-white/10">
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updatingStatus}
              className="bg-alkota-black border border-white/20 px-3 py-2 text-white font-bold text-xs uppercase focus:border-alkota-signal focus:outline-none flex-1"
            >
              <option value="new">NEW</option>
              <option value="contacted">CONTACTED</option>
              <option value="qualified">QUALIFIED</option>
              <option value="customer">CUSTOMER</option>
              <option value="unqualified">UNQUALIFIED</option>
              <option value="unsubscribed">UNSUBSCRIBED</option>
              <option value="bounced">BOUNCED</option>
            </select>
          </div>
        </div>

        {/* Legal Consent Audit Block */}
        <div className="space-y-3">
          <span className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest block">
            GDPR / PECR CONSENT AUDIT
          </span>
          <div className="bg-alkota-carbon p-4 border border-white/10 space-y-3 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-alkota-slate">MARKETING CONSENT:</span>
              <span className={`font-bold px-2 py-0.5 ${lead.marketing_consent ? "bg-alkota-signal/20 text-alkota-signal" : "bg-red-950 text-red-400"}`}>
                {lead.marketing_consent ? "EXPLICITLY OPTED IN" : "NO MARKETING CONSENT"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-alkota-slate">DOUBLE OPT-IN CONFIRMED:</span>
              <span className="text-white font-bold">
                {lead.double_optin_at ? new Date(lead.double_optin_at).toLocaleString() : "PENDING / NOT CONFIRMED"}
              </span>
            </div>
            <div>
              <span className="text-alkota-slate text-[10px] block mb-1">VERBATIM CONSENT TEXT RECORDED:</span>
              <div className="p-2 bg-alkota-black border border-white/10 text-alkota-snow italic font-sans text-xs">
                "{lead.consent_text || "No consent text recorded"}"
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-alkota-slate pt-1 border-t border-white/10">
              <span>IP HASH: {lead.consent_ip_hash ? lead.consent_ip_hash.slice(0, 16) + "..." : "N/A"}</span>
              <span>CONSENT DATE: {lead.consent_at ? new Date(lead.consent_at).toLocaleDateString() : "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Message / Enquiry Payload */}
        {lead.message && (
          <div className="space-y-2">
            <span className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest block">
              SUBMITTED ENQUIRY MESSAGE
            </span>
            <div className="p-4 bg-alkota-carbon border border-white/10 font-sans text-xs text-white leading-relaxed">
              {lead.message}
            </div>
          </div>
        )}

        {/* Notes Thread (Append-Only) */}
        <div className="space-y-4">
          <span className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest block">
            APPEND-ONLY INTERNAL NOTES
          </span>

          <form onSubmit={handleAddNote} className="space-y-2">
            <textarea
              rows={3}
              required
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add internal note... (Append-only audit trail)"
              className="w-full bg-alkota-carbon border border-white/20 p-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50 text-xs"
            />
            <button
              type="submit"
              disabled={submittingNote || !newNote.trim()}
              className="px-4 py-2 bg-alkota-white text-alkota-black font-bold uppercase hover:bg-alkota-signal transition-colors text-[11px] disabled:opacity-40"
            >
              {submittingNote ? "APPENDING..." : "APPEND NOTE"}
            </button>
          </form>

          <div className="space-y-2 pt-2">
            {notes.map((n) => (
              <div key={n.id} className="p-3 bg-alkota-carbon border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-alkota-slate">
                  <span>NOTE ID: {n.id.slice(0, 8)}</span>
                  <span>{new Date(n.created_at).toLocaleString()}</span>
                </div>
                <p className="font-sans text-xs text-alkota-snow">{n.body}</p>
              </div>
            ))}
            {notes.length === 0 && <span className="text-alkota-slate text-[10px]">No notes appended yet</span>}
          </div>
        </div>

        {/* Audit Event Timeline */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <span className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest block">
            AUDIT EVENT TIMELINE
          </span>
          <div className="space-y-2">
            {events.map((ev) => (
              <div key={ev.id} className="p-2.5 bg-alkota-carbon border border-white/5 flex items-start justify-between gap-4 text-[11px]">
                <div>
                  <span className="text-alkota-signal font-bold uppercase">{ev.event_type}</span>
                  <pre className="text-[10px] text-alkota-slate mt-0.5">{JSON.stringify(ev.payload)}</pre>
                </div>
                <span className="text-[10px] text-alkota-slate whitespace-nowrap">
                  {new Date(ev.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
