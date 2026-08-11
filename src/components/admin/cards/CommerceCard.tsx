import React from "react";
import { AdminCard, CardUnavailable, StatRow } from "../AdminCard";
import { fetchCommerceStats } from "@/lib/admin/dashboardData";
import { ShoppingBag, Lock } from "lucide-react";

export default async function CommerceCard() {
  const result = await fetchCommerceStats();

  if (!result.ok) {
    return <CardUnavailable title="COMMERCE & STORE" error={result.error} />;
  }

  const { commerceLive, pricingVisible, storeMode, registeredInterest } = result.data;

  // Blocking readiness items
  const blockingItems = [
    "Legal Terms & Conditions Sign-off",
    "Live Stripe Payment Integration",
    "ISO 4210 Compliance Documentation",
    "Final Pricing Authorization",
  ];

  return (
    <AdminCard title="COMMERCE & STORE" state="building">
      <div className="space-y-4">
        {/* Metric Header */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-2xl font-bold text-alkota-white flex items-center gap-2">
              <span>{storeMode}</span>
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
              STORE OPERATING MODE
            </div>
          </div>
          <ShoppingBag className="w-5 h-5 text-alkota-slate/60" />
        </div>

        {/* Flag states */}
        <div className="space-y-1">
          <StatRow
            label="COMMERCE_LIVE FLAG"
            value={commerceLive ? "ENABLED" : "DISABLED"}
            accent={commerceLive}
          />
          <StatRow
            label="PRICING_VISIBLE FLAG"
            value={pricingVisible ? "ENABLED" : "DISABLED"}
          />
          <StatRow
            label="REGISTERED PRE-ORDER INTEREST"
            value={registeredInterest}
            accent={registeredInterest > 0}
          />
        </div>

        {/* Readiness Checklist */}
        <div className="space-y-1.5 pt-1 border-t border-white/5">
          <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest flex justify-between">
            <span>READINESS CHECKLIST</span>
            <span className="text-amber-400 font-bold">0/4 PASSED</span>
          </div>
          <div className="space-y-1 font-mono text-[10px] text-alkota-slate">
            {blockingItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono text-[9px] text-alkota-slate/60 italic pt-1 border-t border-white/5">
          Note: Revenue charts and figures are suppressed until transactional commerce is live.
        </div>
      </div>
    </AdminCard>
  );
}
