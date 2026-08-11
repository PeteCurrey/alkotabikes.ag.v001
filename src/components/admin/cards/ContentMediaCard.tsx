import React from "react";
import { AdminCard, CardUnavailable, StatRow } from "../AdminCard";
import { fetchContentMediaStats } from "@/lib/admin/dashboardData";
import { AlertOctagon, FileCheck, Image as ImageIcon } from "lucide-react";

export default async function ContentMediaCard() {
  const result = await fetchContentMediaStats();

  if (!result.ok) {
    return <CardUnavailable title="CONTENT & MEDIA" error={result.error} />;
  }

  const {
    mediaCount,
    totalSlots,
    requiredSlots,
    filledRequiredSlots,
    missingAltText,
    unknownLicence,
    unknownProvenance,
    worstPages,
    cmsConnected,
  } = result.data;

  // ABSOLUTE RULE: If media count is 0, render RED ALERT for disconnected CMS
  if (!cmsConnected || mediaCount === 0) {
    return (
      <AdminCard title="CONTENT & MEDIA" state="building" href="/admin/media">
        <div className="bg-red-500/15 border-2 border-red-500 p-4 space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs uppercase tracking-wider">
            <AlertOctagon className="w-5 h-5 flex-shrink-0 animate-pulse text-red-500" />
            <span>CMS NOT CONNECTED — SITE IS SERVING HARDCODED IMAGES</span>
          </div>
          <p className="font-mono text-xs text-red-200/90 leading-relaxed font-light">
            Database contains <strong className="text-white">0 media assets</strong>. Public site pages are currently relying on static fallback image paths. Upload assets to the registry to activate database-driven content delivery.
          </p>
          <div className="pt-2 border-t border-red-500/30 font-mono text-[10px] text-red-300 flex justify-between">
            <span>REGISTRY REQUIRED SLOTS: {requiredSlots}</span>
            <span>FILLED IN DB: 0/{requiredSlots}</span>
          </div>
        </div>
      </AdminCard>
    );
  }

  const fillFraction = `${filledRequiredSlots}/${requiredSlots}`;
  const isComplete = filledRequiredSlots === requiredSlots;

  return (
    <AdminCard title="CONTENT & MEDIA" state="live" href="/admin/media">
      <div className="space-y-4">
        {/* Core Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 border border-white/5">
            <div className="font-mono text-2xl font-bold text-alkota-white">
              {mediaCount}
            </div>
            <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
              MEDIA ASSETS IN REGISTRY
            </div>
          </div>

          <div className="bg-white/5 p-3 border border-white/5">
            <div className="font-mono text-2xl font-bold text-alkota-signal">
              {fillFraction}
            </div>
            <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
              REQUIRED SLOTS FILLED
            </div>
          </div>
        </div>

        {/* Health checks */}
        <div className="space-y-1">
          <StatRow
            label="MISSING ALT TEXT (ACCESSIBILITY)"
            value={missingAltText}
            accent={missingAltText > 0}
          />
          <StatRow
            label="UNRESOLVED LICENCE ('UNKNOWN')"
            value={unknownLicence}
            accent={unknownLicence > 0}
          />
          <StatRow
            label="UNVERIFIED PROVENANCE"
            value={unknownProvenance}
            accent={unknownProvenance > 0}
          />
        </div>

        {/* Worst 5 pages by completeness */}
        {worstPages.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest border-b border-white/10 pb-1 flex justify-between">
              <span>PAGE COMPLETENESS (LOWEST)</span>
              <span>REQUIRED FILLED</span>
            </div>
            <div className="space-y-1">
              {worstPages.map((p) => (
                <StatRow
                  key={p.pageKey}
                  label={p.label}
                  value={`${p.filled}/${p.total}`}
                  accent={p.filled < p.total}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminCard>
  );
}
