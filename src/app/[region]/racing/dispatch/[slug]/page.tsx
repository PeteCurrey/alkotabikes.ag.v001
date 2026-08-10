import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, ArrowRight } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; slug?: string }>;
}): Promise<Metadata> {
  const { region, slug } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const pageSlug = slug ?? "";
  const displayTitle = pageSlug ? `Race Dispatch | Alkota Racing 2027 — ${pageSlug.replace(/-/g, " ").toUpperCase()}` : "Race Dispatch | Alkota Racing 2027";
  return buildRegionalMetadata({
    region: regionCode,
    path: `/racing/dispatch/${pageSlug}`,
    title: displayTitle,
    description: "Alkota Racing dispatch notes will begin during the 2027 competition development programme.",
  });
}

export default function RaceDispatchSlugPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link
          href="/racing"
          className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-white uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-alkota-signal" />
          <span>RETURN TO ALKOTA RACING</span>
        </Link>

        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="RACE DISPATCH" value="PLANNED 2027" variant="signal" />
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95]">
            RACE DISPATCHES<br />
            <span className="text-alkota-signal">BEGIN IN 2027.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed">
            Once Alkota Racing begins, every competition event will produce telemetry logs, setup decisions, rider feedback dispatches, and engineering findings documented here.
          </p>
        </div>

        <div className="bg-alkota-black border border-white/10 p-8 sm:p-12 space-y-6 font-mono text-center">
          <Lock className="w-10 h-10 text-alkota-slate mx-auto" />
          <span className="text-xs text-alkota-slate uppercase tracking-widest block">
            DISPATCH INFRASTRUCTURE READY · AWAITING 2027 COMPETITION
          </span>
          <p className="font-sans text-xs text-alkota-slate max-w-md mx-auto leading-relaxed">
            In the meantime, track physical prototype progress and engineering chassis notes in the Project 01 Development Journal.
          </p>
          <div className="pt-2">
            <Link
              href="/journal/project-01"
              className="px-6 py-3 border border-white/20 text-white font-mono font-bold text-xs tracking-wider uppercase hover:border-alkota-signal hover:text-alkota-signal transition-all inline-flex items-center gap-2"
            >
              <span>READ DEVELOPMENT JOURNAL</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
