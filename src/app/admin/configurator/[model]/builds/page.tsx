import React from "react";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { BarChart3, Download, Filter, Eye, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ model: string }>;
}

export default async function AdminConfiguratorBuildsPage({ params }: PageProps) {
  const { model } = await params;

  // Fetch model
  const { data: modelRow } = await supabaseAdmin
    .from("configurator_models")
    .select("id, slug, name")
    .eq("slug", model)
    .single();

  if (!modelRow) notFound();

  // Fetch saved builds
  const { data: builds } = await supabaseAdmin
    .from("saved_builds")
    .select("id, token, computed_price_minor, currency, market, is_valid, status, view_count, created_at, selections")
    .eq("model_id", modelRow.id)
    .order("created_at", { ascending: false })
    .limit(100);

  const savedBuildsList = builds || [];
  const totalCount = savedBuildsList.length;

  // Compute option selection shares across saved builds
  const selectionShare: Record<string, Record<string, number>> = {};
  for (const b of savedBuildsList) {
    const sel = b.selections as Record<string, string>;
    if (!sel) continue;
    for (const [gKey, oKey] of Object.entries(sel)) {
      if (!selectionShare[gKey]) selectionShare[gKey] = {};
      selectionShare[gKey][oKey] = (selectionShare[gKey][oKey] || 0) + 1;
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs text-alkota-gold font-bold uppercase tracking-widest flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            DEMAND SIGNAL & PRE-ORDER ANALYTICS
          </div>
          <h1 className="font-mono text-2xl font-bold uppercase mt-1">
            SAVED BUILDS — {modelRow.name}
          </h1>
          <p className="font-sans text-xs text-[#9ab0c4] mt-1">
            Analyze customer configuration preferences, option popularity share, and saved specifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/15 hover:bg-white/5 rounded font-mono text-xs font-bold uppercase transition">
            <Download className="w-4 h-4 text-alkota-gold" />
            EXPORT CSV
          </button>
        </div>
      </div>

      {/* Aggregate Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border border-white/10 bg-alkota-carbon p-4 rounded-xl space-y-1">
          <div className="font-mono text-xs text-white/50 uppercase">TOTAL SAVED BUILDS</div>
          <div className="font-mono text-2xl font-black text-white">{totalCount}</div>
        </div>

        <div className="border border-white/10 bg-alkota-carbon p-4 rounded-xl space-y-1">
          <div className="font-mono text-xs text-white/50 uppercase">VALID CONFIGURATIONS</div>
          <div className="font-mono text-2xl font-black text-emerald-400">
            {savedBuildsList.filter((b) => b.is_valid).length}
          </div>
        </div>

        <div className="border border-white/10 bg-alkota-carbon p-4 rounded-xl space-y-1">
          <div className="font-mono text-xs text-white/50 uppercase">UK / US MARKET RATIO</div>
          <div className="font-mono text-2xl font-black text-alkota-gold">
            {savedBuildsList.filter((b) => b.market === "GB").length} :{" "}
            {savedBuildsList.filter((b) => b.market === "US").length}
          </div>
        </div>

        <div className="border border-white/10 bg-alkota-carbon p-4 rounded-xl space-y-1">
          <div className="font-mono text-xs text-white/50 uppercase">AVG CONFIGURED SUBTOTAL</div>
          <div className="font-mono text-2xl font-black text-white">
            {totalCount > 0
              ? `£${(
                  savedBuildsList.reduce((acc, b) => acc + (b.computed_price_minor || 0), 0) /
                  totalCount /
                  100
                ).toFixed(0)}`
              : "£0"}
          </div>
        </div>
      </div>

      {/* Option Selection Share Panel */}
      <div className="border border-white/10 bg-alkota-carbon rounded-xl p-6 space-y-4">
        <h3 className="font-mono text-sm font-bold text-white uppercase border-b border-white/10 pb-2">
          OPTION SELECTION SHARE BY GROUP
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(selectionShare).map(([groupKey, options]) => (
            <div key={groupKey} className="border border-white/10 bg-black/40 p-4 rounded-lg space-y-2">
              <div className="font-mono text-xs font-bold text-alkota-gold uppercase">{groupKey}</div>
              <div className="space-y-1.5 font-mono text-xs">
                {Object.entries(options).map(([optKey, count]) => {
                  const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                  return (
                    <div key={optKey} className="space-y-0.5">
                      <div className="flex justify-between text-white/80">
                        <span>{optKey}</span>
                        <span className="font-bold">{pct}% ({count})</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-alkota-gold h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Builds List Table */}
      <div className="border border-white/10 bg-alkota-carbon rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-mono text-sm font-bold text-white uppercase">SAVED BUILD RECORDS</h3>
          <span className="font-mono text-xs text-white/50">SHOWING RECENT {savedBuildsList.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-white/50 text-[10px] uppercase">
                <th className="p-3">TOKEN</th>
                <th className="p-3">CREATED</th>
                <th className="p-3">MARKET</th>
                <th className="p-3">PRICE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">VIEWS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {savedBuildsList.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition">
                  <td className="p-3 font-bold text-alkota-gold">{b.token}</td>
                  <td className="p-3 text-white/70">
                    {new Date(b.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3 text-white/70">{b.market}</td>
                  <td className="p-3 text-white font-bold">
                    {b.currency === "USD" ? "$" : "£"}
                    {((b.computed_price_minor || 0) / 100).toFixed(2)}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/70 uppercase">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 text-white/50">{b.view_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
