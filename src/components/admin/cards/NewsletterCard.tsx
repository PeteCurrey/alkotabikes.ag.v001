import React from "react";
import { AdminCard, CardUnavailable, StatRow } from "../AdminCard";
import { fetchNewsletterStats } from "@/lib/admin/dashboardData";
import { Mail } from "lucide-react";

export default async function NewsletterCard() {
  const result = await fetchNewsletterStats();

  if (!result.ok) {
    return <CardUnavailable title="NEWSLETTER & EMAIL" error={result.error} />;
  }

  const { marketableCount, suppressionCount, lastCampaignDate } = result.data;

  return (
    <AdminCard title="NEWSLETTER & EMAIL" state="building">
      <div className="space-y-4">
        {/* Metric Header */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-3xl font-bold text-alkota-signal">
              {marketableCount.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
              MARKETABLE SUBSCRIBERS (DOUBLE OPTED-IN)
            </div>
          </div>
          <Mail className="w-5 h-5 text-alkota-slate/60" />
        </div>

        <div className="space-y-1">
          <StatRow
            label="SUPPRESSION LIST (UNSUBSCRIBED)"
            value={suppressionCount}
            accent={suppressionCount > 0}
          />
          <StatRow
            label="LAST CAMPAIGN BROADCAST"
            value={lastCampaignDate ? new Date(lastCampaignDate).toLocaleDateString() : "NONE SENT"}
          />
          <StatRow label="AUTOMATED DISPATCH CRON" value="PLANNED (PHASE 4)" />
        </div>

        <p className="font-mono text-[10px] text-alkota-slate leading-relaxed border-t border-white/5 pt-2">
          Subscribers represent verified double opt-in leads eligible for broadcast dispatches. Campaign dispatch engine is currently in development.
        </p>
      </div>
    </AdminCard>
  );
}
