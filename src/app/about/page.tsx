import React from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import AlkotaStory from "@/components/sections/AlkotaStory";
import { brandAssets } from "@/lib/assets";
import { ArrowRight, Compass, Wrench } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 tech-grid-dark space-y-0 min-h-screen">
      {/* Hero Header */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-6">
          <TechnicalAnnotation label="COMPANY PHILOSOPHY" value="ORIGIN STATEMENT" variant="signal" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            PERFORMANCE<br />
            <span className="text-alkota-slate">IS ENGINEERED.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow max-w-2xl font-light leading-relaxed">
            ALKOTA Performance Engineering exists around one central belief: high-performance mountain bicycles are created through physical discipline, advanced engineering analysis, and continuous trail validation.
          </p>
        </div>
      </div>

      {/* Full-bleed workshop image strip */}
      <div className="relative w-full h-[380px] sm:h-[520px] overflow-hidden">
        <Image
          src={brandAssets.engineeringWorkshop}
          alt="ALKOTA Performance Engineering workshop"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon via-transparent to-alkota-carbon/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-carbon/70 to-transparent w-full md:w-2/3" />

        <div className="absolute bottom-8 left-4 sm:left-8 lg:left-12 space-y-2 max-w-lg">
          <div className="flex items-center gap-2 font-mono text-xs text-alkota-signal uppercase">
            <Wrench className="w-4 h-4" />
            <span>ALKOTA / PERFORMANCE ENGINEERING FACILITY</span>
          </div>
          <p className="font-sans text-xl sm:text-2xl text-alkota-white font-light leading-snug">
            Where every iteration either earns its place or disappears.
          </p>
        </div>
      </div>

      {/* AlkotaStory Section */}
      <AlkotaStory />

      {/* Terrain validation strip */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full min-h-[380px] bg-alkota-black border border-white/10 overflow-hidden group shadow-2xl">
            <Image
              src={brandAssets.project01AlpineTesting}
              alt="ALKOTA Project 01 alpine field testing"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center opacity-50 group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-alkota-carbon via-alkota-carbon/70 to-transparent w-full md:w-2/3" />
            <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon/60 via-transparent to-transparent" />

            <div className="relative z-10 p-8 md:p-12 flex flex-col justify-between h-full min-h-[380px] space-y-8">
              <div className="flex items-center gap-2 font-mono text-xs text-alkota-signal uppercase">
                <Compass className="w-4 h-4" />
                <span>ALPINE FIELD VALIDATION • HAUTE-SAVOIE • 2,400M</span>
              </div>

              <div className="space-y-4 max-w-xl">
                <p className="font-sans text-xl sm:text-2xl md:text-3xl text-alkota-white font-normal leading-snug">
                  Numbers help us understand a bicycle. Terrain tells us whether we understood it correctly.
                </p>
                <Link
                  href="/engineering/testing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors"
                >
                  <span>VIEW TESTING PROGRAMME</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
