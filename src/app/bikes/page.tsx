import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { FLAGSHIP_BIKE } from "@/lib/data/bikesData";
import { ArrowRight, Settings } from "lucide-react";

export default function BikesPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-black/10 pb-8 space-y-3">
          <TechnicalAnnotation label="BICYCLE PLATFORMS" value="PROJECT 01" variant="slate" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
            ONE PLATFORM.<br />
            <span className="text-alkota-slate">UNCOMPROMISING PURPOSE.</span>
          </h1>
          <p className="font-sans text-base text-alkota-graphite max-w-2xl font-light leading-relaxed">
            We do not manufacture a catalog full of minor variations. We engineer one flagship all-mountain chassis platform.
          </p>
        </div>

        {/* Project 01 Card */}
        <div className="bg-alkota-carbon text-alkota-white p-8 md:p-12 border border-white/10 tech-grid-dark grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <TechnicalAnnotation label="FLAGSHIP CHASSIS" value="PROJECT 01" variant="signal" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-alkota-white">
              {FLAGSHIP_BIKE.name}
            </h2>
            <p className="font-sans text-sm sm:text-base text-alkota-snow font-light leading-relaxed">
              {FLAGSHIP_BIKE.overview}
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs text-alkota-slate border-t border-white/10 pt-4">
              <div>TRAVEL: <strong className="text-alkota-white">170MM / 160MM</strong></div>
              <div>FORMAT: <strong className="text-alkota-white">MX / 29</strong></div>
              <div>MATERIAL: <strong className="text-alkota-white">UD CARBON</strong></div>
              <div>STATUS: <strong className="text-alkota-signal">DEVELOPMENT SPEC</strong></div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/bikes/project-01"
                className="px-6 py-3 bg-alkota-white text-alkota-black hover:bg-alkota-signal font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
              >
                <span>EXPLORE PROJECT 01</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/configure"
                className="px-6 py-3 border border-white/20 hover:border-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4 text-alkota-signal" />
                <span>CONFIGURE</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center p-8 bg-alkota-black border border-white/10">
            <svg viewBox="0 0 600 350" className="w-full h-auto">
              <circle cx="150" cy="240" r="80" stroke="#737C84" strokeWidth="4" fill="none" />
              <circle cx="450" cy="240" r="80" stroke="#737C84" strokeWidth="4" fill="none" />
              <polygon points="400,100 280,120 250,250 280,120" fill="none" stroke="#F4F6F7" strokeWidth="14" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
