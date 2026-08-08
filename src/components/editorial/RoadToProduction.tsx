import React from "react";

interface Phase {
  year: string;
  title: string;
  description: string;
  items: string[];
  status: "CURRENT" | "PLANNED";
}

const PHASES: Phase[] = [
  {
    year: "2026",
    title: "ENGINEERING DEVELOPMENT",
    description: "Core engineering programme. Geometry, kinematics, structural development, component integration, and prototype preparation.",
    items: [
      "Geometry & kinematics finalisation",
      "Structural development",
      "Component integration",
      "Prototype preparation",
    ],
    status: "CURRENT",
  },
  {
    year: "2027",
    title: "RACE DEVELOPMENT",
    description: "Planned Alkota Racing development programme. Prototype testing under competitive conditions.",
    items: [
      "Prototype trail and race testing",
      "Development feedback loop",
      "Specification refinement",
    ],
    status: "PLANNED",
  },
  {
    year: "2028",
    title: "PRODUCTION LAUNCH",
    description: "Project 01 production launch.",
    items: [
      "Final engineering validation",
      "Production release",
    ],
    status: "PLANNED",
  },
];

interface RoadToProductionProps {
  className?: string;
  compact?: boolean;
}

export default function RoadToProduction({ className = "", compact = false }: RoadToProductionProps) {
  return (
    <div className={`font-mono ${className}`}>
      {!compact && (
        <div className="mb-8 space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-alkota-signal font-semibold">
            PROGRAMME TIMELINE
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-medium uppercase text-alkota-white tracking-tight">
            ROAD TO PRODUCTION
          </h3>
        </div>
      )}

      <div className="relative">
        <div className="hidden md:block absolute left-[88px] top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-0">
          {PHASES.map((phase) => {
            const isCurrent = phase.status === "CURRENT";
            return (
              <div key={phase.year} className="relative grid grid-cols-1 md:grid-cols-[88px_1fr] gap-0">
                <div className="md:pr-6 pb-2 md:pb-0 flex md:flex-col md:items-end md:justify-start pt-6">
                  <span className={`text-xl font-bold ${isCurrent ? "text-alkota-white" : "text-alkota-slate/60"}`}>
                    {phase.year}
                  </span>
                </div>

                <div className="hidden md:flex absolute left-[88px] top-[28px] -translate-x-1/2 items-center justify-center w-5 h-5">
                  <div className={`w-2.5 h-2.5 rounded-full border-2 ${isCurrent ? "border-alkota-signal bg-alkota-signal" : "border-alkota-slate/40 bg-alkota-black"}`} />
                </div>

                <div className={`md:pl-10 pt-6 pb-8 border-b border-white/10 last:border-b-0 ${isCurrent ? "" : "opacity-60"}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className={`text-sm font-bold uppercase tracking-wider ${isCurrent ? "text-alkota-white" : "text-alkota-slate"}`}>
                      {phase.title}
                    </h4>
                    <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border font-bold ${
                      isCurrent
                        ? "border-alkota-signal/50 text-alkota-signal bg-alkota-signal/5"
                        : "border-alkota-slate/30 text-alkota-slate/60"
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  <p className="text-alkota-snow/70 text-xs leading-relaxed font-sans font-light mb-4 max-w-lg">
                    {phase.description}
                  </p>

                  {!compact && (
                    <ul className="space-y-1.5">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[10px] text-alkota-slate uppercase tracking-wider">
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isCurrent ? "bg-alkota-signal" : "bg-alkota-slate/40"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-[9px] uppercase tracking-widest text-alkota-slate/50 leading-relaxed">
        All post-2026 programme phases are planned and subject to engineering progress. No future dates imply completion of activities not yet undertaken.
      </p>
    </div>
  );
}