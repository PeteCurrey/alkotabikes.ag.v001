import React from "react";
import Link from "next/link";
import { Shield, AlertTriangle, CheckCircle, Globe, Server, Database, Lock, EyeOff, Eye } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { SITE_URL } from "@/lib/env";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";

export default async function AdminHealthPage() {
  await verifyAdminAuth();

  const allowIndexing = process.env.ALLOW_INDEXING === "true";
  const siteHost = new URL(SITE_URL).hostname;
  const vercelEnv = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
  const vercelUrl = process.env.VERCEL_URL || siteHost;
  const gitCommitSha = (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7) || "local";

  // Check database connectivity & media assets count
  let dbStatus: "HEALTHY" | "UNAVAILABLE" = "UNAVAILABLE";
  let totalMediaAssets = 0;
  let unknownProvenanceAssets = 0;
  let claimAssets = 0;
  let dbErrorMsg = "";

  try {
    const { count: mediaCount, error: countErr } = await supabaseAdmin
      .from("media_assets")
      .select("*", { count: "exact", head: true });

    if (!countErr) {
      dbStatus = "HEALTHY";
      totalMediaAssets = mediaCount || 0;

      const { count: unknownCount } = await supabaseAdmin
        .from("media_assets")
        .select("*", { count: "exact", head: true })
        .eq("provenance", "unknown");
      unknownProvenanceAssets = unknownCount || 0;

      const { count: claimCount } = await supabaseAdmin
        .from("media_assets")
        .select("*", { count: "exact", head: true })
        .eq("claim", true);
      claimAssets = claimCount || 0;
    } else {
      dbErrorMsg = countErr.message;
    }
  } catch (err) {
    dbErrorMsg = err instanceof Error ? err.message : String(err);
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TechnicalAnnotation label="SYSTEM HEALTH" value="DIAGNOSTICS & CRAWL GATE" variant="signal" />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white">
            SYSTEM HEALTH & INTEGRITY
          </h1>
          <p className="text-xs text-alkota-slate mt-1 font-mono">
            Platform environment, crawl gate status, canonical domain, and media provenance diagnostics.
          </p>
        </div>
      </div>

      {/* Crawl Gate Status Banner */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold text-alkota-slate uppercase tracking-wider">
          1. INDEXING & CRAWL GATE STATE
        </h2>
        {allowIndexing ? (
          <div className="p-6 bg-green-500/10 border-2 border-green-500 space-y-3">
            <div className="flex items-center gap-3 text-green-400 font-bold uppercase tracking-wider text-sm">
              <Eye className="w-5 h-5" />
              <span>INDEXING ENABLED (ALLOW_INDEXING = true)</span>
            </div>
            <p className="text-xs text-green-300 leading-relaxed font-mono">
              The site is configured for search engine crawling and indexing. Standard robots.txt rules apply. Ensure this is an intentional production launch deployment.
            </p>
          </div>
        ) : (
          <div className="p-6 bg-red-500/10 border-2 border-red-500 space-y-3">
            <div className="flex items-center gap-3 text-red-400 font-bold uppercase tracking-wider text-sm">
              <EyeOff className="w-5 h-5" />
              <span>CRAWL GATE CLOSED — NOINDEX, NOFOLLOW ACTIVE</span>
            </div>
            <p className="text-xs text-red-300 leading-relaxed font-mono">
              The site is strictly protected against search engine indexing across three layers:
            </p>
            <ul className="text-xs text-red-200 font-mono list-disc pl-5 space-y-1">
              <li>robots.txt returns <code className="bg-black/50 px-1 py-0.5">Disallow: /</code> for all user agents</li>
              <li>Middleware injects <code className="bg-black/50 px-1 py-0.5">X-Robots-Tag: noindex, nofollow</code> on all non-asset responses</li>
              <li>Root layout injects <code className="bg-black/50 px-1 py-0.5">&lt;meta name="robots" content="noindex,nofollow"&gt;</code> into &lt;head&gt;</li>
            </ul>
          </div>
        )}
      </section>

      {/* Canonical Domain & Environment Diagnostics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-alkota-black border border-white/15 space-y-4">
          <div className="flex items-center gap-2 text-alkota-signal text-xs font-bold uppercase tracking-wider border-b border-white/10 pb-3">
            <Globe className="w-4 h-4" />
            <span>CANONICAL DOMAIN CONFIGURATION</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-alkota-slate">SITE_URL:</span>
              <span className="text-white font-bold">{SITE_URL}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-alkota-slate">CANONICAL HOST:</span>
              <span className="text-alkota-signal font-bold">{siteHost}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-alkota-slate">FALLBACK DOMAINS:</span>
              <span className="text-red-400 font-bold">DISABLED (THROW ON MISSING)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-alkota-slate">BUILD ASSERTION:</span>
              <span className="text-green-400 font-bold">ACTIVE (check-canonical-host.ts)</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-alkota-black border border-white/15 space-y-4">
          <div className="flex items-center gap-2 text-alkota-signal text-xs font-bold uppercase tracking-wider border-b border-white/10 pb-3">
            <Server className="w-4 h-4" />
            <span>DEPLOYMENT ENVIRONMENT</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-alkota-slate">ENVIRONMENT:</span>
              <span className="text-white font-bold uppercase">{vercelEnv}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-alkota-slate">DEPLOYMENT HOST:</span>
              <span className="text-white">{vercelUrl}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-alkota-slate">GIT COMMIT SHA:</span>
              <span className="text-alkota-signal font-bold">{gitCommitSha}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-alkota-slate">DATABASE STATE:</span>
              <span className={dbStatus === "HEALTHY" ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                {dbStatus} {dbErrorMsg ? `(${dbErrorMsg})` : ""}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Media Assets Provenance & Claim Diagnostics */}
      <section className="p-6 bg-alkota-black border border-white/15 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-alkota-signal font-bold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>MEDIA ASSET PROVENANCE & BUILD GATE STATUS</span>
          </div>
          <Link href="/admin/media" className="text-alkota-signal hover:underline text-[11px] uppercase">
            MANAGE MEDIA LIBRARY &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-alkota-carbon border border-white/10 space-y-1">
            <div className="text-alkota-slate text-[10px] uppercase">TOTAL MEDIA ASSETS</div>
            <div className="text-2xl font-bold text-white">{totalMediaAssets}</div>
          </div>
          <div className="p-4 bg-alkota-carbon border border-white/10 space-y-1">
            <div className="text-alkota-slate text-[10px] uppercase">UNKNOWN PROVENANCE ASSETS</div>
            <div className="text-2xl font-bold text-amber-400">{unknownProvenanceAssets}</div>
          </div>
          <div className="p-4 bg-alkota-carbon border border-white/10 space-y-1">
            <div className="text-alkota-slate text-[10px] uppercase">OPERATIONAL CLAIM ASSETS</div>
            <div className="text-2xl font-bold text-red-400">{claimAssets}</div>
          </div>
        </div>

        <div className="p-4 bg-alkota-carbon border border-white/10 text-alkota-slate space-y-2">
          <div className="font-bold text-white uppercase text-[11px]">BUILD GATE RULE ENFORCEMENT:</div>
          <p className="leading-relaxed">
            Assets with <code className="text-amber-300">provenance IN ('unknown', 'ai_generated', 'licensed_stock')</code> AND <code className="text-red-300">claim = true</code> cannot be referenced by a published content slot. Build fails automatically if violated.
          </p>
        </div>
      </section>
    </div>
  );
}
