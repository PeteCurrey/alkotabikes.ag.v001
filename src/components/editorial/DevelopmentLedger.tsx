import React from "react";

interface DevelopmentLedgerProps {
  question: string;
  decision: string;
  why: string;
  status: string;
  statusVariant?: "baseline" | "planned" | "validation";
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  baseline: "border-alkota-signal/40 text-alkota-signal bg-alkota-signal/5",
  planned: "border-alkota-slate/40 text-alkota-slate bg-alkota-slate/5",
  validation: "border-alkota-ice/40 text-alkota-ice bg-alkota-ice/5",
};

export default function DevelopmentLedger({
  question,
  decision,
  why,
  status,
  statusVariant = "baseline",
  className = "",
}: DevelopmentLedgerProps) {
  const statusStyle = STATUS_STYLES[statusVariant];

  return (
    <div className={`border border-white/10 bg-alkota-black/60 font-mono ${className}`}>
      <div className="px-6 pt-5 pb-4 border-b border-white/10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-alkota-signal font-semibold">
          DEVELOPMENT LEDGER
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-[0.25em] text-alkota-slate block">
              QUESTION
            </span>
            <p className="text-alkota-snow font-sans text-sm leading-relaxed font-normal">
              {question}
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-[0.25em] text-alkota-slate block">
              DECISION
            </span>
            <p className="text-alkota-white font-sans text-sm leading-relaxed font-semibold">
              {decision}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-[0.25em] text-alkota-slate block">
              WHY
            </span>
            <p className="text-alkota-snow/80 font-sans text-sm leading-relaxed font-light">
              {why}
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-[0.25em] text-alkota-slate block">
              STATUS
            </span>
            <div className={`inline-block px-3 py-1.5 border text-[10px] uppercase tracking-widest font-bold ${statusStyle}`}>
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}