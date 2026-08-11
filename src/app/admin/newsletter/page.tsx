import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { fetchNewsletterStats } from "@/lib/admin/dashboardData";
import { Mail, CheckCircle2, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  await verifyAdminAuth();
  const result = await fetchNewsletterStats();
  const stats = result.ok ? result.data : { marketableCount: 0, suppressionCount: 0, lastCampaignDate: null };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TechnicalAnnotation label="MODULE STATUS" value="BUILDING (PHASE 4)" variant="signal" />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
            <span>NEWSLETTER & CAMPAIGNS</span>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-mono px-2 py-0.5 border border-amber-500/40">
              BUILDING
            </span>
          </h1>
          <p className="font-mono text-xs text-alkota-slate mt-1">
            Marketable subscriber resolution, double opt-in verification, and campaign dispatch controls.
          </p>
        </div>
      </div>

      {/* Module Overview Card */}
      <div className="bg-alkota-black/80 border border-white/10 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              MARKETABLE SUBSCRIBERS
            </span>
            <span className="font-mono text-2xl font-bold text-alkota-signal">
              {stats.marketableCount}
            </span>
            <span className="font-mono text-[9px] text-alkota-slate block mt-1">
              (Double opted-in & not unsubscribed)
            </span>
          </div>

          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              SUPPRESSION LIST
            </span>
            <span className="font-mono text-2xl font-bold text-white">
              {stats.suppressionCount}
            </span>
            <span className="font-mono text-[9px] text-alkota-slate block mt-1">
              (Unsubscribed or bounced)
            </span>
          </div>

          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              DISPATCH ENGINE STATUS
            </span>
            <span className="font-mono text-sm font-bold text-amber-400 uppercase block">
              DISPATCH ENGINE PENDING
            </span>
            <span className="font-mono text-[9px] text-alkota-slate block mt-1">
              Resend campaign broadcast API pending Phase 4
            </span>
          </div>
        </div>

        {/* What Works & What Is Blocked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 font-mono text-xs">
          <div className="space-y-3">
            <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>CURRENTLY WORKING IN PLATFORM</span>
            </div>
            <ul className="space-y-2 text-alkota-slate border-l border-emerald-500/30 pl-4">
              <li>• Lead capture form integration with double opt-in token generation</li>
              <li>• Automated double opt-in confirmation email dispatch via Resend</li>
              <li>• Unsubscribe link token resolution & suppression list recording</li>
              <li>• Marketable lead filtering (strictly resolving confirmed subscribers)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>BLOCKING DEVELOPMENT ITEMS</span>
            </div>
            <ul className="space-y-2 text-alkota-slate border-l border-amber-500/30 pl-4">
              <li>• Rich-text email campaign editor for admin interface</li>
              <li>• Automated scheduled campaign broadcast cron runner</li>
              <li>• Open & click tracking webhook analytics integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
