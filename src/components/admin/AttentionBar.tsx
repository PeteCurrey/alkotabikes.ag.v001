import React from "react";
import Link from "next/link";
import { fetchAttentionItems } from "@/lib/admin/dashboardData";
import { AlertTriangle, AlertCircle, ArrowRight } from "lucide-react";

export default async function AttentionBar() {
  const result = await fetchAttentionItems();

  // If query failed or returned no items, DO NOT RENDER ANYTHING
  if (!result.ok || !result.data || result.data.length === 0) {
    return null;
  }

  const items = result.data;

  return (
    <section className="bg-red-500/10 border border-red-500/40 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
        <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 animate-pulse text-red-500" />
          <span>ACTION REQUIRED ({items.length} PLATFORM ISSUES DETECTED)</span>
        </div>
        <span className="font-mono text-[10px] text-red-400/80">
          ATTENTION REQUIRED BEFORE DEPLOYMENT
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-black/40 border border-red-500/20 p-2.5 hover:border-red-500/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase tracking-wider ${
                  item.severity === "critical"
                    ? "bg-red-500 text-black"
                    : "bg-amber-500 text-black"
                }`}
              >
                {item.severity}
              </span>
              <span className="font-mono text-xs text-alkota-white font-medium">
                {item.description}
              </span>
            </div>

            <Link
              href={item.href}
              className="font-mono text-[10px] text-alkota-signal hover:text-white uppercase font-bold tracking-wider inline-flex items-center gap-1 self-end sm:self-auto"
            >
              <span>FIX IN {item.href.replace("/admin/", "").toUpperCase()}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
