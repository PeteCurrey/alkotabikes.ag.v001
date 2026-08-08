import React from "react";
import { Metadata } from "next";
import StudioShell from "../StudioShell";

export const metadata: Metadata = {
  title: "Production | Alkota Studio",
  robots: { index: false, follow: false },
};

const PRODUCTION_GATES = [
  { id: 1, label: "Engineering revision PRODUCTION_RELEASED", status: "BLOCKED", note: "R00 is DEVELOPMENT_BASELINE" },
  { id: 2, label: "Production revision defined", status: "BLOCKED", note: "Not yet created" },
  { id: 3, label: "Manufacturing partner confirmed", status: "BLOCKED", note: "TBC" },
  { id: 4, label: "Batch capacity approved", status: "BLOCKED", note: "No batches defined" },
  { id: 5, label: "Serial number format approved", status: "BLOCKED", note: "Explicitly deferred" },
  { id: 6, label: "QC template approved by operations", status: "BLOCKED", note: "Stub only" },
  { id: 7, label: "Dealer handover process documented", status: "BLOCKED", note: "Not yet defined" },
  { id: 8, label: "Build photography decision", status: "BLOCKED", note: "Explicitly deferred" },
  { id: 9, label: "Delivery logistics confirmed", status: "BLOCKED", note: "Routes typed, not actioned" },
  { id: 10, label: "Production revision distinct from engineering", status: "BLOCKED", note: "Concept documented, not approved" },
];

export default function ProductionPage() {
  return (
    <StudioShell>
      <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
        <div className="space-y-1 mb-8">
          <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">
            ALKOTA STUDIO
          </div>
          <h1 className="font-display font-bold text-2xl text-white uppercase">
            Production
          </h1>
          <div className="font-mono text-[8px] text-[#647789] uppercase">
            Phase 03 — Allocation + Build Tracker infrastructure in development.
            Production planned 2028.
          </div>
        </div>

        {/* Production gate */}
        <div className="space-y-4 mb-8">
          <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest border-b border-white/10 pb-3">
            PRODUCTION GATE — {PRODUCTION_GATES.filter((g) => g.status === "BLOCKED").length}/
            {PRODUCTION_GATES.length} CONDITIONS BLOCKED
          </div>
          <div className="space-y-1">
            {PRODUCTION_GATES.map((gate) => (
              <div
                key={gate.id}
                className="flex items-start gap-4 bg-[#131313] border border-white/8 px-4 py-3"
              >
                <div className="font-mono text-[8px] text-[#647789] w-4 flex-shrink-0 pt-0.5">
                  {String(gate.id).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[9px] text-white uppercase">
                    {gate.label}
                  </div>
                  <div className="font-mono text-[8px] text-[#647789] mt-0.5">
                    {gate.note}
                  </div>
                </div>
                <div className="font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border border-red-500/30 text-red-400 bg-red-500/5 flex-shrink-0">
                  BLOCKED
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono text-[8px] text-[#647789]/50 uppercase text-center py-8">
          PRODUCTION ALLOCATION SYSTEM (PHASE 03) — INFRASTRUCTURE IN DEVELOPMENT
        </div>
      </div>
    </StudioShell>
  );
}
