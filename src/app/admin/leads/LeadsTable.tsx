"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import LeadDrawer from "./LeadDrawer";
import type { LeadRecord } from "./LeadDrawer";
import { Search, Filter, Download, ArrowRight, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export interface LeadsTableProps {
  initialLeads: LeadRecord[];
  totalLeads: number;
  currentPage: number;
  pageSize: number;
  currentFilters: {
    search: string;
    type: string;
    status: string;
    consent: string;
    locale: string;
  };
}

export default function LeadsTable({
  initialLeads,
  totalLeads,
  currentPage,
  pageSize,
  currentFilters,
}: LeadsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [search, setSearch] = useState(currentFilters.search);
  const [type, setType] = useState(currentFilters.type);
  const [status, setStatus] = useState(currentFilters.status);
  const [consent, setConsent] = useState(currentFilters.consent);
  const [locale, setLocale] = useState(currentFilters.locale);

  const applyFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([k, v]) => {
      if (v) {
        params.set(k, v);
      } else {
        params.delete(k);
      }
    });
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search, type, status, consent, locale });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalLeads / pageSize);

  const exportCsvUrl = `/api/admin/leads/export?type=${type}&status=${status}&consent=${consent}&locale=${locale}`;

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* ── FILTER & SEARCH TOOLBAR ── */}
      <div className="p-4 bg-alkota-black border border-white/10 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-alkota-slate absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search email, name or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-alkota-carbon border border-white/15 pl-9 pr-4 py-2.5 text-white placeholder:text-alkota-slate/50 focus:border-alkota-signal focus:outline-none"
            />
          </div>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              applyFilters({ search, type: e.target.value, status, consent, locale });
            }}
            className="bg-alkota-carbon border border-white/15 px-3 py-2.5 text-white focus:border-alkota-signal focus:outline-none"
          >
            <option value="">ALL TYPES</option>
            <option value="newsletter">NEWSLETTER</option>
            <option value="waitlist">WAITLIST</option>
            <option value="dealer_enquiry">DEALER ENQUIRY</option>
            <option value="press">PRESS</option>
            <option value="general_contact">GENERAL CONTACT</option>
            <option value="warranty">WARRANTY</option>
            <option value="preorder_interest">PREORDER INTEREST</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              applyFilters({ search, type, status: e.target.value, consent, locale });
            }}
            className="bg-alkota-carbon border border-white/15 px-3 py-2.5 text-white focus:border-alkota-signal focus:outline-none"
          >
            <option value="">ALL STATUSES</option>
            <option value="new">NEW</option>
            <option value="contacted">CONTACTED</option>
            <option value="qualified">QUALIFIED</option>
            <option value="customer">CUSTOMER</option>
            <option value="unqualified">UNQUALIFIED</option>
            <option value="unsubscribed">UNSUBSCRIBED</option>
            <option value="bounced">BOUNCED</option>
          </select>

          <select
            value={consent}
            onChange={(e) => {
              setConsent(e.target.value);
              applyFilters({ search, type, status, consent: e.target.value, locale });
            }}
            className="bg-alkota-carbon border border-white/15 px-3 py-2.5 text-white focus:border-alkota-signal focus:outline-none"
          >
            <option value="">ALL CONSENT</option>
            <option value="true">OPTED IN ONLY</option>
            <option value="false">NO MARKETING</option>
          </select>

          <select
            value={locale}
            onChange={(e) => {
              setLocale(e.target.value);
              applyFilters({ search, type, status, consent, locale: e.target.value });
            }}
            className="bg-alkota-carbon border border-white/15 px-3 py-2.5 text-white focus:border-alkota-signal focus:outline-none"
          >
            <option value="">ALL LOCALES</option>
            <option value="en-GB">EN-GB (UK)</option>
            <option value="en-US">EN-US (US)</option>
          </select>

          <a
            href={exportCsvUrl}
            download
            className="px-4 py-2.5 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center gap-1.5 ml-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT SELECTION (CSV)</span>
          </a>
        </form>
      </div>

      {/* ── TABLE ── */}
      <div className="bg-alkota-black border border-white/10 overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-[10px] text-alkota-slate uppercase tracking-wider">
              <th className="p-3">EMAIL / NAME</th>
              <th className="p-3">LEAD TYPE</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">SOURCE PAGE</th>
              <th className="p-3">LOCALE</th>
              <th className="p-3">CONSENT</th>
              <th className="p-3">DOUBLE OPT-IN</th>
              <th className="p-3">CREATED</th>
              <th className="p-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[11px]">
            {initialLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                <td className="p-3">
                  <div className="font-bold text-white truncate max-w-[200px]">{lead.email}</div>
                  <div className="text-[10px] text-alkota-slate font-light">{lead.full_name || "Anonymous"}</div>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/15 text-alkota-signal uppercase font-bold text-[10px]">
                    {lead.lead_type}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 uppercase text-[10px] font-bold ${
                      lead.status === "new"
                        ? "bg-alkota-signal/20 text-alkota-signal border border-alkota-signal/40"
                        : lead.status === "qualified" || lead.status === "customer"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                        : "bg-white/5 text-alkota-slate border border-white/10"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="p-3 text-alkota-snow truncate max-w-[150px]">{lead.source_page || "/"}</td>
                <td className="p-3 text-alkota-slate font-mono text-[10px]">{lead.locale || "en-GB"}</td>
                <td className="p-3">
                  {lead.marketing_consent ? (
                    <span className="inline-flex items-center gap-1 text-alkota-signal font-bold text-[10px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>YES</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-alkota-slate/60 text-[10px]">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>NO</span>
                    </span>
                  )}
                </td>
                <td className="p-3 text-alkota-slate text-[10px]">
                  {lead.double_optin_at ? (
                    <span className="text-emerald-400 font-bold">CONFIRMED</span>
                  ) : (
                    <span>PENDING</span>
                  )}
                </td>
                <td className="p-3 text-alkota-slate text-[10px] whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="px-2.5 py-1 bg-alkota-carbon border border-white/20 hover:border-alkota-signal text-white hover:text-alkota-signal transition-colors text-[10px] font-bold uppercase inline-flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>INSPECT</span>
                  </button>
                </td>
              </tr>
            ))}

            {initialLeads.length === 0 && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-alkota-slate italic text-xs">
                  No lead records found matching the current search filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── PAGINATION FOOTER ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-alkota-black border border-white/10 text-xs">
        <div className="text-alkota-slate text-[11px]">
          SHOWING PAGE <strong className="text-white">{currentPage}</strong> OF <strong className="text-white">{totalPages || 1}</strong> ({totalLeads} TOTAL RECORDS)
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 bg-alkota-carbon border border-white/20 hover:border-white text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV</span>
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 bg-alkota-carbon border border-white/20 hover:border-white text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detail Drawer */}
      <LeadDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onStatusUpdate={() => router.refresh()}
      />
    </div>
  );
}
