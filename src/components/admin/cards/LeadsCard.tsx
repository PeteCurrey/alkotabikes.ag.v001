import React from "react";
import { AdminCard, CardUnavailable, StatRow } from "../AdminCard";
import { fetchLeadStats } from "@/lib/admin/dashboardData";
import { Users, ShieldCheck, TrendingUp } from "lucide-react";

export default async function LeadsCard() {
  const result = await fetchLeadStats();

  if (!result.ok) {
    return <CardUnavailable title="LEADS & CRM" error={result.error} />;
  }

  const {
    total,
    new24h,
    new7d,
    new30d,
    doubleOptInCount,
    doubleOptInRate,
    byType,
    topSourcePages,
    topUtmSources,
    hasSparklineData,
    dailyCounts,
  } = result.data;

  // Max value for simple SVG sparkline scaling if >= 14 days of data exists
  const maxVal = Math.max(...dailyCounts.map((d) => d.count), 1);
  const sparkPoints = dailyCounts
    .map((d, idx) => {
      const x = (idx / Math.max(dailyCounts.length - 1, 1)) * 200;
      const y = 30 - (d.count / maxVal) * 25;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <AdminCard title="LEADS & CRM" state="live" href="/admin/leads">
      <div className="space-y-4">
        {/* Metric Header */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-3xl font-bold text-alkota-white tracking-tight">
              {total.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
              TOTAL RECORDED LEADS
            </div>
          </div>
          <div className="text-right font-mono text-xs text-alkota-signal flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{new24h} (24H)</span>
          </div>
        </div>

        {/* Velocity row */}
        <div className="grid grid-cols-3 gap-2 bg-white/5 p-2 font-mono text-[10px] border border-white/5">
          <div>
            <span className="text-alkota-slate block">24 HOURS</span>
            <span className="font-bold text-white text-xs">+{new24h}</span>
          </div>
          <div>
            <span className="text-alkota-slate block">7 DAYS</span>
            <span className="font-bold text-white text-xs">+{new7d}</span>
          </div>
          <div>
            <span className="text-alkota-slate block">30 DAYS</span>
            <span className="font-bold text-white text-xs">+{new30d}</span>
          </div>
        </div>

        {/* Double Opt-in confirmation rate */}
        <StatRow
          label="DOUBLE OPT-IN CONFIRMATION"
          value={`${doubleOptInRate}%`}
          sub={`(${doubleOptInCount}/${total})`}
          accent={doubleOptInRate >= 50}
        />

        {/* Breakdown by lead_type */}
        {Object.keys(byType).length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest border-b border-white/10 pb-1">
              LEAD TYPE BREAKDOWN
            </div>
            <div className="space-y-1">
              {Object.entries(byType)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([type, count]) => (
                  <StatRow key={type} label={type} value={count} />
                ))}
            </div>
          </div>
        )}

        {/* Top Source Pages & UTM Sources */}
        {topSourcePages.length > 0 && (
          <div className="space-y-1 pt-1">
            <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest border-b border-white/10 pb-1">
              TOP LANDING SOURCE
            </div>
            {topSourcePages.map(({ page, count }) => (
              <StatRow key={page} label={page || "/"} value={count} />
            ))}
          </div>
        )}

        {/* Sparkline — ABSOLUTE RULE: ONLY render if >= 14 days of data */}
        {hasSparklineData ? (
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between font-mono text-[9px] text-alkota-slate uppercase mb-1">
              <span>14-DAY VELOCITY TREND</span>
              <span>LIVE DATA</span>
            </div>
            <svg viewBox="0 0 200 35" className="w-full h-8 stroke-alkota-signal fill-none stroke-2">
              <polyline points={sparkPoints} />
            </svg>
          </div>
        ) : (
          <div className="font-mono text-[9px] text-alkota-slate/60 italic pt-1 border-t border-white/5">
            Note: Sparkline suppressed (requires ≥14 days of historical data).
          </div>
        )}
      </div>
    </AdminCard>
  );
}
