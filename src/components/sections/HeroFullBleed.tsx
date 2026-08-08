"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { brandAssets } from "@/lib/assets";

export default function HeroFullBleed() {
  return (
    <section className="relative w-full min-h-[92vh] md:min-h-screen bg-alkota-carbon text-alkota-white flex flex-col justify-between pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Photographic Alpine Showroom Background featuring canonical Project 01 Glacier White */}
      <div className="absolute inset-0 z-0 opacity-65 md:opacity-85 transition-opacity duration-700">
        <Image
          src={brandAssets.project01WhiteHero}
          alt="ALKOTA Project 01 Glacier White full-suspension mountain bike with tan-wall Maxxis tyres in alpine showroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
        />
        {/* Gradients for typography legibility and seamless background blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-carbon via-alkota-carbon/90 to-alkota-carbon/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon via-transparent to-alkota-carbon/70" />
      </div>

      {/* Top Status Technical Annotation Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 z-10">
        <TechnicalAnnotation label="ALKOTA / PROJECT 01" value="DEVELOPMENT PLATFORM" variant="signal" />
        <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest hidden sm:block">
          FLAGSHIP CHASSIS REV 001 • ALL-MOUNTAIN / ENDURO
        </div>
      </div>

      {/* Hero Headline & Primary CTA Narrative */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 md:py-20 z-10 space-y-8">
        <div className="space-y-4">
          <div className="font-mono text-xs md:text-sm text-alkota-signal tracking-ultra uppercase font-medium">
            ALKOTA PERFORMANCE ENGINEERING
          </div>
          <h1 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] text-alkota-white">
            ENGINEERED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-alkota-white via-alkota-snow to-alkota-slate">
              TO GO FURTHER.
            </span>
          </h1>
        </div>

        <p className="font-sans text-sm sm:text-base md:text-lg text-alkota-snow/90 max-w-xl leading-relaxed font-normal">
          Performance mountain bikes shaped by precision engineering, real terrain and an obsession with the details that change the ride.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          <Link
            href="/bikes/project-01"
            className="px-8 py-4 bg-alkota-white text-alkota-black hover:bg-alkota-signal font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            <span>EXPLORE PROJECT 01</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/engineering"
            className="px-8 py-4 border border-white/20 hover:border-alkota-signal text-alkota-white hover:text-alkota-signal font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-3 bg-alkota-black/40 backdrop-blur-sm"
          >
            <span>ENGINEERING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Technical Bar & Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-end border-t border-white/10 pt-4 z-10 font-mono text-xs text-alkota-slate">
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider">
          <span>SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 text-alkota-signal animate-bounce" />
        </div>
      </div>
    </section>
  );
}
