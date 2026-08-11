import React from "react";
import Link from "next/link";
import { fetchRecentActivity } from "@/lib/admin/dashboardData";
import { Activity, ArrowRight } from "lucide-react";

export default async function RecentActivity() {
  const result = await fetchRecentActivity();

  const activities = result.ok ? result.data : [];

  return (
    <section className="bg-alkota-black/60 border border-white/10 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-alkota-signal" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-alkota-slate">
            RECENT SYSTEM & OPERATIONAL ACTIVITY
          </span>
        </div>
        <span className="font-mono text-[10px] text-alkota-slate">
          LAST 15 ENTRIES
        </span>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-2">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-xs p-2 bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="bg-alkota-signal/20 text-alkota-signal text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                  {act.action}
                </span>
                <span className="text-white font-medium">{act.subject}</span>
                <span className="text-alkota-slate text-[10px]">by {act.actor}</span>
              </div>
              <span className="text-alkota-slate/60 text-[10px] self-end sm:self-auto">
                {act.createdAt ? new Date(act.createdAt).toLocaleString() : ""}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center font-mono text-xs text-alkota-slate italic bg-white/5 border border-white/5">
          No audit log activity recorded yet. System mutations will automatically appear here.
        </div>
      )}
    </section>
  );
}
