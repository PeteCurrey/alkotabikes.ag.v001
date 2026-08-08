import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, ArrowRight } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export const metadata: Metadata = {
  title: "2027 Season Programme | Alkota Racing",
  description: "Alkota Racing 2027 season programme. Currently under development ahead of planned competition validation.",
};

export default function Racing2027Page() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link
          href="/racing"
          className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-white uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-alkota-signal" />
          <span>RETURN TO RACING PROGRAMME</span>
        </Link>

        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="ALKOTA RACING" value="PLANNED 2027 PROGRAMME" variant="signal" />
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95]">
            2027 SEASON<br />
            <span className="text-alkota-signal">PROGRAMME IN DEVELOPMENT.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed">
            The planned 2027 race-development calendar, paddock team selection, and technical dispatch infrastructure are currently in pre-production setup.
          </p>
        </div>

        <div className="bg-alkota-black border border-white/10 p-8 sm:p-12 space-y-6 text-center font-mono">
          <Lock className="w-10 h-10 text-alkota-signal mx-auto" />
          <span className="text-xs text-alkota-signal uppercase tracking-widest font-bold block">
            ANNOUNCEMENTS WILL BE MADE WHEN THEY ARE REAL
          </span>
          <p className="font-sans text-sm text-alkota-slate max-w-xl mx-auto font-light leading-relaxed">
            We are not publishing fictional race dates, fake rider lineups, or manufactured sponsor announcements. Full programme disclosures will occur ahead of the 2027 season start.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/order"
              className="px-6 py-3 bg-alkota-signal text-alkota-black font-bold text-xs tracking-wider uppercase hover:bg-white transition-all inline-flex items-center gap-2"
            >
              <span>FOLLOW DEVELOPMENT PROGRAMME</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
