"use client";

import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Clock, ShieldCheck, FileCode, Trophy, Bell } from "lucide-react";

interface PublishingCadenceProps {
  className?: string;
  variant?: "default" | "compact";
}

export default function PublishingCadence({
  className = "",
  variant = "default",
}: PublishingCadenceProps) {
  const CADENCES = [
    {
      title: "QUARTERLY ENGINEERING DISPATCH",
      interval: "Every 3 months",
      description: "Geometry revisions, prototype build progress, FEA results, and component selection decisions.",
      icon: FileCode,
    },
    {
      title: "RACE EVENT COVERAGE",
      interval: "Post-event",
      description: "Following each test or race entry: verified times, rider reports, telemetry data, and teardowns.",
      icon: Trophy,
    },
    {
      title: "MILESTONE ALERTS",
      interval: "Programme triggers",
      description: "Prototype completion, validation sign-off, production specification lock, and reservation release.",
      icon: Bell,
    },
  ];

  if (variant === "compact") {
    return (
      <div className={`bg-alkota-black border border-white/10 p-6 space-y-4 font-mono ${className}`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
            PUBLISHING CADENCE COMMITMENT
          </span>
          <span className="text-[9px] text-alkota-slate uppercase">ZERO MARKETING NOISE</span>
        </div>
        <div className="space-y-3">
          {CADENCES.map((c) => (
            <div key={c.title} className="flex items-start gap-3 text-xs">
              <c.icon className="w-4 h-4 text-alkota-signal flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">{c.title}</span>
                <span className="text-alkota-slate text-[10px] block">{c.interval} — {c.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-alkota-black border border-white/10 p-8 sm:p-12 space-y-8 tech-grid-dark ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <TechnicalAnnotation label="EDITORIAL COMMITMENT" value="COMMUNICATION CADENCE" variant="signal" />
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
            WHAT YOU WILL RECEIVE — AND WHEN.
          </h3>
        </div>
        <div className="bg-alkota-carbon border border-white/15 px-3 py-1.5 font-mono text-[9px] text-alkota-slate uppercase tracking-widest flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-alkota-signal" />
          <span>STRICT PROGRAMME DISPATCH SCHEDULE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {CADENCES.map((c) => (
          <div
            key={c.title}
            className="bg-alkota-carbon border border-white/10 p-6 space-y-3 hover:border-alkota-signal/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <c.icon className="w-5 h-5 text-alkota-signal" />
              <span className="text-[9px] px-2 py-0.5 border border-white/10 text-alkota-slate uppercase tracking-widest">
                {c.interval}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {c.title}
            </h4>
            <p className="text-[11px] text-alkota-snow/80 leading-relaxed font-sans font-light">
              {c.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-alkota-carbon/60 border border-alkota-signal/30 p-5 flex items-start gap-4 font-mono">
        <ShieldCheck className="w-5 h-5 text-alkota-signal flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs text-alkota-signal font-bold uppercase tracking-wider block">
            NO MARKETING NOISE. NO WEEKLY SPAM.
          </span>
          <p className="text-[11px] text-alkota-slate font-sans leading-relaxed">
            We publish only when there is genuine engineering, testing, or programme progress to report. Every dispatch is documented in the Project 01 Journal.
          </p>
        </div>
      </div>
    </div>
  );
}
