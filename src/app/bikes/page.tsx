import React from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { FLAGSHIP_PROJECT_01, CANONICAL_FINISHES } from "@/lib/data/project01";
import { brandAssets } from "@/lib/assets";
import { ArrowRight, Settings, ShieldCheck, Layers } from "lucide-react";

export default function BikesLandingPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="FLAGSHIP PLATFORM" value="ONE MACHINE" variant="signal" />
          <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            ONE PLATFORM.<br />
            <span className="text-alkota-signal">PROJECT 01.</span>
          </h1>
          <p className="font-mono text-xs sm:text-sm text-alkota-signal uppercase tracking-wider">
            ALL-MOUNTAIN / ENDURO CHASSIS • DEVELOPMENT REV 001
          </p>
          <p className="font-sans text-base sm:text-lg text-alkota-snow max-w-2xl font-light leading-relaxed">
            ALKOTA does not build dozens of models. We develop one machine—a single, uncompromising full-suspension carbon chassis engineered to excel across alpine terrain.
          </p>
        </div>

        {/* Hero Showcase Card */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                FLAGSHIP CHASSIS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-alkota-white uppercase">
                PROJECT 01
              </h2>
              <p className="font-mono text-xs text-alkota-slate uppercase">
                170MM FRONT / 160MM REAR • MX & 29 COMPATIBLE
              </p>
            </div>

            <div className="flex items-center space-x-4 font-mono text-xs">
              <Link
                href="/bikes/project-01"
                className="px-6 py-3 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center gap-2"
              >
                <span>EXPLORE PROJECT 01</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/configure"
                className="px-6 py-3 border border-white/20 text-alkota-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                <span>CONFIGURE</span>
              </Link>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] flex items-center justify-center p-6 bg-black/40 border border-white/10">
            <Image
              src={brandAssets.project01WhiteHero}
              alt="ALKOTA Project 01 full-suspension mountain bike Glacier White finish"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain object-center"
            />
          </div>

          {/* Launch Finishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 font-sans">
            {CANONICAL_FINISHES.map((finish) => (
              <div key={finish.id} className="bg-alkota-carbon p-6 border border-white/10 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-alkota-signal font-bold uppercase">FINISH {finish.code}</span>
                  <span className="text-alkota-slate uppercase">{finish.subtitle}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-alkota-white uppercase">{finish.name}</h3>
                <p className="text-alkota-snow/80 text-xs leading-relaxed font-light">{finish.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
