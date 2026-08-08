import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Flame, Lock, Layers } from "lucide-react";

interface StatusTickerProps {
  className?: string;
  variant?: "full" | "compact" | "banner";
}

export default function DevelopmentStatusTicker({ className = "", variant = "full" }: StatusTickerProps) {
  if (variant === "compact") {
    return (
      <div className={`font-mono text-[10px] bg-alkota-black/90 border border-white/10 px-3 py-1.5 flex items-center justify-between gap-4 text-alkota-slate ${className}`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-alkota-signal animate-pulse" />
          <span className="text-alkota-white font-bold uppercase tracking-wider">PROJECT 01</span>
          <span className="text-alkota-slate">·</span>
          <span className="text-alkota-signal uppercase font-bold">R00 BASELINE</span>
        </div>
        <Link href="/road-to-2028" className="text-alkota-slate hover:text-white uppercase flex items-center gap-1">
          <span>ROAD TO 2028</span>
          <ArrowRight className="w-3 h-3 text-alkota-signal" />
        </Link>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`w-full bg-alkota-black border-y border-white/10 py-3 px-4 sm:px-6 font-mono text-[10px] text-alkota-slate ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-alkota-signal animate-pulse" />
              <span className="text-white font-bold uppercase tracking-wider">PROJECT 01 CONTROL PANEL</span>
            </div>
            <span className="text-alkota-slate/50 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="text-alkota-slate uppercase">STATUS:</span>
              <span className="text-alkota-signal font-bold uppercase">PRE-PRODUCTION ENGINEERING</span>
            </div>
            <span className="text-alkota-slate/50 hidden md:inline">|</span>
            <div className="flex items-center gap-2 hidden md:flex">
              <span className="text-alkota-slate uppercase">REVISION:</span>
              <span className="text-white font-bold uppercase">R00 BASELINE</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-alkota-slate uppercase hidden lg:inline">2027 RACING · 2028 PRODUCTION</span>
            <Link
              href="/road-to-2028"
              className="text-alkota-signal hover:text-white uppercase font-bold flex items-center gap-1.5 tracking-wider"
            >
              <span>DEVELOPMENT ROADMAP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-alkota-black border border-white/10 p-4 sm:p-6 font-mono text-xs text-alkota-white space-y-4 shadow-xl ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-alkota-signal animate-pulse" />
          <span className="font-bold text-sm text-alkota-white uppercase tracking-tight">PROJECT 01 DEVELOPMENT STATE</span>
        </div>
        <span className="px-2 py-0.5 border border-alkota-signal/40 text-alkota-signal text-[9px] uppercase font-bold tracking-widest bg-alkota-signal/10">
          PRE-PRODUCTION
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
        <div className="bg-alkota-carbon p-3 border border-white/10 space-y-1">
          <span className="text-[9px] text-alkota-slate uppercase block">01 / CURRENT</span>
          <span className="text-alkota-signal font-bold block uppercase">ENGINEERING R00</span>
        </div>

        <div className="bg-alkota-carbon p-3 border border-white/10 space-y-1">
          <span className="text-[9px] text-alkota-slate uppercase block">02 / NEXT</span>
          <span className="text-white font-bold block uppercase">PROTOTYPE R&D</span>
        </div>

        <div className="bg-alkota-carbon p-3 border border-white/10 space-y-1">
          <span className="text-[9px] text-alkota-slate uppercase block">03 / RACING</span>
          <span className="text-white font-bold block uppercase">PLANNED 2027</span>
        </div>

        <div className="bg-alkota-carbon p-3 border border-white/10 space-y-1">
          <span className="text-[9px] text-alkota-slate uppercase block">04 / PRODUCTION</span>
          <span className="text-white font-bold block uppercase">PLANNED 2028</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-alkota-slate">
        <span>SINGLE SOURCE BASELINE: R00-P01</span>
        <Link href="/road-to-2028" className="text-alkota-signal hover:text-white uppercase font-bold flex items-center gap-1">
          <span>EXPLORE ROAD TO 2028</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
