import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function RoadTo2028Strip({ className = "" }: { className?: string }) {
  const stages = [
    {
      year: "2026",
      stage: "STAGE 01",
      title: "ENGINEER IT.",
      status: "CURRENT",
      desc: "Core engineering, geometry & carbon structural development.",
      active: true,
    },
    {
      year: "2027",
      stage: "STAGE 02",
      title: "RACE IT.",
      status: "PLANNED",
      desc: "Competition validation in race paddock environments.",
      active: false,
    },
    {
      year: "2028",
      stage: "STAGE 03",
      title: "BUILD IT.",
      status: "PLANNED LAUNCH",
      desc: "Production release and initial customer build delivery.",
      active: false,
    },
  ];

  return (
    <div className={`bg-alkota-black border border-white/10 p-6 md:p-10 space-y-8 tech-grid-dark ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <TechnicalAnnotation label="PROGRAMME ROADMAP" value="ROAD TO 2028" variant="signal" />
          <h3 className="font-display font-semibold text-2xl sm:text-3xl uppercase text-alkota-white tracking-tight">
            ONE BIKE. THREE STAGES.
          </h3>
        </div>

        <Link
          href="/road-to-2028"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-alkota-signal hover:text-white uppercase tracking-wider group"
        >
          <span>EXPLORE ROADMAP</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stages.map((stg) => (
          <div
            key={stg.year}
            className={`p-6 border space-y-3 transition-all ${
              stg.active
                ? "bg-alkota-carbon border-alkota-signal/50 shadow-xl"
                : "bg-alkota-carbon/60 border-white/10 opacity-75"
            }`}
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-alkota-signal text-lg">{stg.year}</span>
              <span
                className={`text-[9px] px-2 py-0.5 border font-bold uppercase tracking-widest ${
                  stg.active
                    ? "border-alkota-signal text-alkota-signal bg-alkota-signal/10"
                    : "border-white/20 text-alkota-slate"
                }`}
              >
                {stg.status}
              </span>
            </div>

            <h4 className="font-display font-bold text-xl uppercase text-alkota-white tracking-tight">
              {stg.title}
            </h4>

            <p className="font-sans text-xs text-alkota-slate leading-relaxed font-light">
              {stg.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
