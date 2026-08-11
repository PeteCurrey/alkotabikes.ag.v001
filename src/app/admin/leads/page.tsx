import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { ADMIN_COOKIE } from "@/lib/auth/adminAuth";
import LeadsTable from "./LeadsTable";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Users, CheckCircle, Clock, TrendingUp, Filter, AlertTriangle } from "lucide-react";

export const revalidate = 0; // Dynamic route

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const reqCookies = await cookies();
  const session = reqCookies.get(ADMIN_COOKIE)?.value;

  if (!session || !session.startsWith("alkota-admin:")) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = 50;
  const offset = (page - 1) * limit;

  const search = params.search?.trim() || "";
  const type = params.type || "";
  const status = params.status || "";
  const consent = params.consent || "";
  const locale = params.locale || "";

  // 1. Query filtered leads for the table
  let query = supabaseAdmin.from("leads").select("*", { count: "exact" });

  if (type) query = query.eq("lead_type", type);
  if (status) query = query.eq("status", status);
  if (locale) query = query.eq("locale", locale);
  if (consent === "true") query = query.eq("marketing_consent", true);
  if (consent === "false") query = query.eq("marketing_consent", false);

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%,message.ilike.%${search}%`);
  }

  query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

  const { data: leads, count: totalFilteredLeads, error: leadsErr } = await query;

  // 2. Query Dashboard Statistics (Today, 7d, 30d, opt-in rate, top sources, top pages)
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const d7Start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const d30Start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { count: countToday } = await supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).gte("created_at", todayStart);
  const { count: count7d } = await supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).gte("created_at", d7Start);
  const { count: count30d } = await supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).gte("created_at", d30Start);
  const { count: countTotal } = await supabaseAdmin.from("leads").select("*", { count: "exact", head: true });

  // Marketing opt-in confirmation rate (newsletter & waitlist)
  const { count: totalMarketingLeads } = await supabaseAdmin
    .from("leads")
    .select("*", { count: "exact", head: true })
    .in("lead_type", ["newsletter", "waitlist"]);

  const { count: confirmedOptinLeads } = await supabaseAdmin
    .from("leads")
    .select("*", { count: "exact", head: true })
    .in("lead_type", ["newsletter", "waitlist"])
    .not("double_optin_at", "is", null);

  const optinRate = totalMarketingLeads && totalMarketingLeads > 0
    ? Math.round(((confirmedOptinLeads || 0) / totalMarketingLeads) * 100)
    : 0;

  // Breakdown by lead_type
  const { data: allLeadsSummary } = await supabaseAdmin.from("leads").select("lead_type, utm_source, source_page");
  
  const typeBreakdown: Record<string, number> = {};
  const sourceBreakdown: Record<string, number> = {};
  const pageBreakdown: Record<string, number> = {};

  (allLeadsSummary || []).forEach((l) => {
    typeBreakdown[l.lead_type] = (typeBreakdown[l.lead_type] || 0) + 1;
    if (l.utm_source) {
      sourceBreakdown[l.utm_source] = (sourceBreakdown[l.utm_source] || 0) + 1;
    }
    if (l.source_page) {
      pageBreakdown[l.source_page] = (pageBreakdown[l.source_page] || 0) + 1;
    }
  });

  const topSources = Object.entries(sourceBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topPages = Object.entries(pageBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-8 font-mono">
      {/* Page Title & Status */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <TechnicalAnnotation label="CRM PLATFORM" value="LEADS & CONSENT REGISTER" variant="signal" />
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
            LEAD ENGINE &amp; AUDIT TRAIL.
          </h1>
          <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed max-w-2xl">
            UK GDPR &amp; PECR compliant lead capture system. Every record includes verbatim consent text, sha256 IP hash, and audit timeline.
          </p>
        </div>
      </div>

      {/* ── DASHBOARD STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
        <div className="p-4 bg-alkota-black border border-white/10 space-y-1">
          <span className="text-alkota-slate uppercase text-[10px]">TOTAL LEADS</span>
          <div className="text-white text-2xl font-bold">{countTotal || 0}</div>
          <div className="text-[10px] text-alkota-slate">All time records</div>
        </div>

        <div className="p-4 bg-alkota-black border border-white/10 space-y-1">
          <span className="text-alkota-slate uppercase text-[10px]">ACQUISITION (24h / 7d / 30d)</span>
          <div className="text-alkota-signal text-xl font-bold">
            {countToday || 0} <span className="text-white/40 text-xs">/ {count7d || 0} / {count30d || 0}</span>
          </div>
          <div className="text-[10px] text-alkota-slate">Recent velocity</div>
        </div>

        <div className="p-4 bg-alkota-black border border-white/10 space-y-1">
          <span className="text-alkota-slate uppercase text-[10px]">DOUBLE OPT-IN RATE</span>
          <div className="text-alkota-signal text-2xl font-bold">{optinRate}%</div>
          <div className="text-[10px] text-alkota-slate">{confirmedOptinLeads || 0} / {totalMarketingLeads || 0} confirmed</div>
        </div>

        <div className="p-4 bg-alkota-black border border-white/10 space-y-1 col-span-1 sm:col-span-2 lg:col-span-2">
          <span className="text-alkota-slate uppercase text-[10px]">LEADS BY TYPE</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {Object.entries(typeBreakdown).map(([tKey, tCount]) => (
              <span key={tKey} className="px-2 py-0.5 bg-white/5 border border-white/15 text-[10px] text-white">
                {tKey}: <strong className="text-alkota-signal">{tCount}</strong>
              </span>
            ))}
            {Object.keys(typeBreakdown).length === 0 && (
              <span className="text-alkota-slate text-[10px]">No records yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Top Conversion Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 bg-alkota-black border border-white/10 space-y-2">
          <span className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest block">
            TOP CONVERTING PAGES
          </span>
          <div className="space-y-1 text-[11px]">
            {topPages.map(([pagePath, pCount]) => (
              <div key={pagePath} className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-alkota-snow truncate max-w-xs">{pagePath}</span>
                <span className="text-alkota-signal font-bold">{pCount} leads</span>
              </div>
            ))}
            {topPages.length === 0 && <span className="text-alkota-slate text-[10px]">No page conversion data yet</span>}
          </div>
        </div>

        <div className="p-4 bg-alkota-black border border-white/10 space-y-2">
          <span className="text-alkota-signal text-[10px] uppercase font-bold tracking-widest block">
            TOP UTM ACQUISITION SOURCES
          </span>
          <div className="space-y-1 text-[11px]">
            {topSources.map(([src, sCount]) => (
              <div key={src} className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-alkota-snow truncate max-w-xs">{src}</span>
                <span className="text-alkota-signal font-bold">{sCount} leads</span>
              </div>
            ))}
            {topSources.length === 0 && <span className="text-alkota-slate text-[10px]">No UTM source data yet</span>}
          </div>
        </div>
      </div>

      {/* ── MAIN LEADS TABLE & ACTIONS ── */}
      <LeadsTable
        initialLeads={leads || []}
        totalLeads={totalFilteredLeads || 0}
        currentPage={page}
        pageSize={limit}
        currentFilters={{ search, type, status, consent, locale }}
      />
    </div>
  );
}
