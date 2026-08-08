import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight, Radio } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export const metadata: Metadata = {
  title: "Race Dispatches | Alkota Racing 2027",
  description:
    "Alkota Racing race dispatches, paddock notes and development updates from the 2027 competition programme.",
};

export default function RaceDispatchIndexPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back */}
        <Link
          href="/racing"
          className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-white uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-alkota-signal" />
          <span>RETURN TO ALKOTA RACING</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation
            label="RACE DISPATCH ARCHIVE"
            value="PLANNED 2027"
            variant="signal"
          />
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95]">
            RACE DISPATCHES<br />
            <span className="text-alkota-signal">BEGIN IN 2027.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed max-w-2xl">
            When the Alkota Racing 2027 programme begins competition activity,
            dispatch notes — paddock reports, development observations and
            machine data — will be published here.
          </p>
          <div className="font-mono text-[10px] text-alkota-slate border border-white/10 px-3 py-2 inline-flex items-center gap-2 bg-alkota-black/40">
            <Clock className="w-3 h-3 text-alkota-signal" />
            <span>DISPATCH ARCHIVE OPENS 2027 — PROGRAMME COMMENCEMENT</span>
          </div>
        </div>

        {/* What to expect */}
        <div className="space-y-6">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-2 font-semibold">
            WHAT DISPATCHES WILL COVER
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                code: "DSP-01",
                label: "RACE WEEKEND NOTES",
                desc: "Machine behaviour reports from competition environments.",
              },
              {
                code: "DSP-02",
                label: "DEVELOPMENT OBSERVATIONS",
                desc: "Engineering notes generated from competition use.",
              },
              {
                code: "DSP-03",
                label: "SETUP PHILOSOPHY",
                desc: "Paddock geometry and suspension decisions and rationale.",
              },
              {
                code: "DSP-04",
                label: "POST-EVENT ANALYSIS",
                desc: "What the machine revealed and what it changes in the design.",
              },
            ].map((item) => (
              <div
                key={item.code}
                className="bg-alkota-black/40 border border-white/10 p-5 space-y-2 opacity-70"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest">
                    {item.code}
                  </span>
                  <span className="font-mono text-[9px] text-alkota-slate border border-white/10 px-2 py-0.5 uppercase">
                    PLANNED
                  </span>
                </div>
                <div className="font-display font-semibold text-sm text-alkota-snow uppercase tracking-tight">
                  {item.label}
                </div>
                <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Radio / Notify */}
        <div className="bg-alkota-black border border-white/10 p-8 sm:p-10 space-y-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-alkota-signal" />
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                FOLLOW THE PROGRAMME
              </span>
            </div>
            <p className="font-display font-semibold text-xl sm:text-2xl text-white uppercase tracking-tight">
              FIRST TO KNOW WHEN 2027 BEGINS.
            </p>
            <p className="font-sans text-sm text-alkota-snow/80 font-light max-w-md">
              Register for Project 01 to receive notification when race
              dispatches go live.
            </p>
          </div>
          <Link
            href="/order"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
          >
            <span>JOIN THE REGISTER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Back to Racing */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <Link
            href="/racing"
            className="font-mono text-xs text-alkota-slate hover:text-white uppercase flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RACING PROGRAMME</span>
          </Link>
          <Link
            href="/road-to-2028"
            className="font-mono text-xs text-alkota-signal hover:text-white uppercase flex items-center gap-2 transition-colors font-bold"
          >
            <span>ROAD TO 2028</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
