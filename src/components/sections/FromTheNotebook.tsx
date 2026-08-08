import React from "react";
import Link from "next/link";
import { ArrowRight, Archive } from "lucide-react";
import DesignArtifact from "@/components/editorial/DesignArtifact";
import { DESIGN_ARCHIVE, toDesignJourneyAsset } from "@/content/design/archive";

// Use featured artifacts from the new archive source
const FEATURED_IDS = ["ALK-SKETCH-001", "ALK-SKETCH-005", "ALK-SKETCH-011"];

export default function FromTheNotebook() {
  const featuredArtifacts = FEATURED_IDS
    .map((id) => DESIGN_ARCHIVE.find((a) => a.id === id))
    .filter(Boolean)
    .map((a) => toDesignJourneyAsset(a!));

  return (
    <section className="w-full bg-alkota-black text-alkota-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-alkota-signal font-semibold">
              DEVELOPMENT ARCHIVE · 2026
            </span>
            <h2 className="font-display font-medium text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.9] text-alkota-white">
              FROM THE<br />
              <span className="text-alkota-slate">DRAWING BOARD.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-16 space-y-6">
            <p className="font-sans text-base md:text-lg text-alkota-snow/80 leading-relaxed font-light max-w-lg">
              Every finished machine leaves behind a trail of decisions.
            </p>
            <div className="font-sans text-sm text-alkota-slate space-y-1 leading-relaxed">
              <p>Sketches.</p>
              <p>Geometry.</p>
              <p>Rejected ideas.</p>
              <p>Better ones that replaced them.</p>
            </div>
            <p className="font-sans text-sm text-alkota-snow/60 leading-relaxed max-w-md">
              Project 01 is no different.
              <br />
              This is the record of the drawings behind the machine.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/project-01/design-archive"
                className="inline-flex items-center gap-2 px-6 py-3 bg-alkota-white text-alkota-black font-mono text-xs font-bold uppercase hover:bg-alkota-signal hover:text-alkota-white transition-colors"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>OPEN THE DESIGN ARCHIVE</span>
              </Link>
              <Link
                href="/journal/project-01"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-alkota-signal text-alkota-white hover:text-alkota-signal font-mono text-xs font-bold uppercase transition-colors"
              >
                <span>DEVELOPMENT JOURNAL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured artifacts — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-white/10 pt-10">
          {featuredArtifacts.map((asset) => (
            <Link
              key={asset.id}
              href={`/project-01/design-archive/${asset.id.toLowerCase().replace("-", "-")}`}
              className="group block hover:opacity-90 transition-opacity"
              aria-label={`View artifact ${asset.id}`}
            >
              <DesignArtifact
                asset={asset}
                theme="blueprint"
                showCaption
              />
            </Link>
          ))}
        </div>

        {/* Footer strip */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <span className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
            ALKOTA PERFORMANCE ENGINEERING · PROJECT 01
          </span>
          <Link
            href="/project-01/design-archive"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-alkota-signal hover:text-white uppercase font-bold transition-colors"
          >
            VIEW ALL {DESIGN_ARCHIVE.filter(a => a.visibility === "PUBLIC").length} ARTIFACTS
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}