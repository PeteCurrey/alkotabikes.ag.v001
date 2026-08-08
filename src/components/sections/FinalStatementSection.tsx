"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { ArrowRight, Settings } from "lucide-react";

export default function FinalStatementSection() {
  return (
    <section className="relative w-full bg-alkota-carbon text-alkota-white py-32 px-4 sm:px-6 lg:px-8 tech-grid-dark overflow-hidden text-center">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <Logo variant="hero" className="mx-auto" />

        <h2 className="font-display font-extrabold text-4xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
          PERFORMANCE<br />
          <span className="text-alkota-signal">IS ENGINEERED.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-alkota-slate max-w-xl mx-auto font-light leading-relaxed">
          Project 01 represents our unwavering commitment to performance engineering. Designed without compromise. Validated on real mountain terrain.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/configure"
            className="w-full sm:w-auto px-8 py-4 bg-alkota-signal text-alkota-black hover:bg-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-3"
          >
            <Settings className="w-4 h-4" />
            <span>DISCOVER PROJECT 01</span>
          </Link>

          <Link
            href="/engineering"
            className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-3 bg-alkota-black/40"
          >
            <span>ENTER ENGINEERING</span>
            <ArrowRight className="w-4 h-4 text-alkota-signal" />
          </Link>
        </div>
      </div>
    </section>
  );
}
