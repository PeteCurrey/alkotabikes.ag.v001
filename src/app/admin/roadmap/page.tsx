import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { getRoadmapModules } from "@/lib/admin/modules";
import { Map, Layers, Lock, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRoadmapPage() {
  await verifyAdminAuth();
  const plannedModules = getRoadmapModules();

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TechnicalAnnotation label="ARCHITECTURE ROADMAP" value="PLANNED MODULES" variant="signal" />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
            <span>SYSTEM DEVELOPMENT ROADMAP</span>
          </h1>
          <p className="font-mono text-xs text-alkota-slate mt-1">
            Planned platform modules (Phase 3–5). Excluded from active sidebar navigation until functional.
          </p>
        </div>
      </div>

      {/* Planned Modules Grid */}
      <div className="space-y-6">
        <div className="font-mono text-xs text-alkota-slate uppercase tracking-wider font-bold">
          PLANNED MODULE REGISTRY ({plannedModules.length} MODULES PLANNED)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plannedModules.map((mod) => (
            <div
              key={mod.key}
              className="bg-alkota-black/80 border border-white/10 p-6 space-y-4 relative opacity-90"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-alkota-slate" />
                  <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    {mod.label}
                  </span>
                </div>
                <span className="bg-white/10 text-alkota-slate text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest">
                  {mod.phase || "PLANNED"}
                </span>
              </div>

              <p className="font-mono text-xs text-alkota-slate leading-relaxed font-light">
                {mod.description}
              </p>

              {mod.blockers && mod.blockers.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/5 font-mono text-[10px]">
                  <span className="text-amber-400 font-bold uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>PREREQUISITE BLOCKERS</span>
                  </span>
                  <ul className="space-y-1 text-alkota-slate pl-4">
                    {mod.blockers.map((b, idx) => (
                      <li key={idx}>• {b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
