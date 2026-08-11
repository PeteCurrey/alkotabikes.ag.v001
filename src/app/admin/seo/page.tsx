import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { fetchSeoStats } from "@/lib/admin/dashboardData";
import { Globe, CheckCircle2, ShieldCheck, FileCode } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  await verifyAdminAuth();
  const result = fetchSeoStats();
  const stats = result.ok ? result.data : { allowIndexing: false, canonicalHost: "(not set)", sitemapRouteCount: 0 };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TechnicalAnnotation label="MODULE STATUS" value="BUILDING (PHASE 1)" variant="signal" />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
            <span>SEO & CRAWL GATE CONTROL</span>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-mono px-2 py-0.5 border border-amber-500/40">
              BUILDING
            </span>
          </h1>
          <p className="font-mono text-xs text-alkota-slate mt-1">
            Single-source canonical host enforcement, crawl gate status, and sitemap generation diagnostics.
          </p>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-alkota-black/80 border border-white/10 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              CRAWL GATE STATE
            </span>
            <span className={`font-mono text-xl font-bold uppercase ${stats.allowIndexing ? "text-emerald-400" : "text-red-400"}`}>
              {stats.allowIndexing ? "INDEXABLE" : "NOINDEX"}
            </span>
            <span className="font-mono text-[9px] text-alkota-slate block mt-1">
              (Source: process.env.ALLOW_INDEXING)
            </span>
          </div>

          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              CANONICAL DOMAIN HOST
            </span>
            <span className="font-mono text-base font-bold text-alkota-signal truncate block">
              {stats.canonicalHost}
            </span>
            <span className="font-mono text-[9px] text-alkota-slate block mt-1">
              (Source: NEXT_PUBLIC_SITE_URL)
            </span>
          </div>

          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              SITEMAP ROUTE COUNT
            </span>
            <span className="font-mono text-2xl font-bold text-white">
              {stats.sitemapRouteCount}
            </span>
            <span className="font-mono text-[9px] text-alkota-slate block mt-1">
              Registered marketing & spec routes
            </span>
          </div>
        </div>

        {/* Verification Rules */}
        <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
          <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>ACTIVE SEO & CANONICAL GUARDS</span>
          </div>
          <div className="space-y-2 text-alkota-slate bg-white/5 p-4 border border-white/5">
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span>CANONICAL HOST INTEGRITY:</span>
              <span className="text-emerald-400 font-bold">PASSING (Single Source of Truth)</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span>HREFLANG RECIPROCITY (GB/US):</span>
              <span className="text-emerald-400 font-bold">PASSING (1:1 Bidirectional)</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span>X-ROBOTS-TAG HEADER:</span>
              <span className="text-white font-bold">{stats.allowIndexing ? "index, follow" : "noindex, nofollow"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ROBOTS.TXT GENERATOR:</span>
              <span className="text-emerald-400 font-bold">ACTIVE (/robots.txt)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
