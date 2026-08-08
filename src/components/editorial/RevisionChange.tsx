import React from "react";

interface RevisionChangeProps {
  fromRev: string;
  toRev: string;
  whatChanged: string;
  why: string;
  effect: string;
  className?: string;
}

export default function RevisionChange({
  fromRev = "R00",
  toRev = "R01",
  whatChanged,
  why,
  effect,
  className = "",
}: RevisionChangeProps) {
  return (
    <div className={`border border-white/10 bg-alkota-carbon/90 p-6 font-mono space-y-5 tech-grid-dark ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-alkota-signal uppercase tracking-[0.25em] font-bold">
            REVISION CHANGE
          </span>
          <span className="text-xs text-alkota-slate">·</span>
          <span className="text-xs text-alkota-white font-bold">
            {fromRev} → {toRev}
          </span>
        </div>
        <div className="text-[9px] text-alkota-slate uppercase tracking-widest px-2 py-0.5 border border-white/10 bg-black/40">
          ENGINEERING REVISION LOG
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <span className="text-[9px] text-alkota-slate uppercase tracking-[0.2em] block">
            WHAT CHANGED?
          </span>
          <p className="font-sans text-sm text-alkota-white font-semibold leading-relaxed">
            {whatChanged}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[9px] text-alkota-slate uppercase tracking-[0.2em] block">
            WHY?
          </span>
          <p className="font-sans text-sm text-alkota-snow/85 leading-relaxed font-light">
            {why}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[9px] text-alkota-slate uppercase tracking-[0.2em] block">
            EFFECT?
          </span>
          <p className="font-sans text-sm text-alkota-signal font-medium leading-relaxed">
            {effect}
          </p>
        </div>
      </div>
    </div>
  );
}
