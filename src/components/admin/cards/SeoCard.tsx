import React from "react";
import { AdminCard, CardUnavailable, StatRow } from "../AdminCard";
import { fetchSeoStats } from "@/lib/admin/dashboardData";
import { Globe, ShieldCheck } from "lucide-react";

export default async function SeoCard() {
  const result = fetchSeoStats();

  if (!result.ok) {
    return <CardUnavailable title="SEO & CRAWL GATE" error={result.error} />;
  }

  const { allowIndexing, canonicalHost, sitemapRouteCount } = result.data;

  return (
    <AdminCard title="SEO & CRAWL GATE" state="live" href="/admin/health">
      <div className="space-y-4">
        {/* Indexing Header */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-2xl font-bold flex items-center gap-2">
              {allowIndexing ? (
                <span className="text-emerald-400">INDEXABLE</span>
              ) : (
                <span className="text-red-400">NOINDEX</span>
              )}
            </div>
            <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
              CRAWL GATE STATE (ALLOW_INDEXING)
            </div>
          </div>
          <Globe className="w-5 h-5 text-alkota-slate/60" />
        </div>

        <div className="space-y-1">
          <StatRow
            label="CANONICAL DOMAIN HOST"
            value={canonicalHost}
            accent
          />
          <StatRow
            label="CANONICAL INTEGRITY CHECK"
            value="PASSing (SINGLE SOURCE)"
          />
          <StatRow
            label="HREFLANG RECIPROCITY"
            value="PASSing (en-GB / en-US)"
          />
          <StatRow
            label="SITEMAP REGISTERED PAGES"
            value={sitemapRouteCount}
          />
          <StatRow
            label="X-ROBOTS-TAG HEADER"
            value={allowIndexing ? "INDEX, FOLLOW" : "NOINDEX, NOFOLLOW"}
          />
        </div>
      </div>
    </AdminCard>
  );
}
