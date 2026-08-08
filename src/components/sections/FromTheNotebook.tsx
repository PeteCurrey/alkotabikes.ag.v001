import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DesignArtifact from "@/components/editorial/DesignArtifact";
import { DESIGN_JOURNEY } from "@/content/media/designJourney";

export default function FromTheNotebook() {
  const artifacts = [
    DESIGN_JOURNEY.find((a) => a.id === "ALK-SKETCH-001"),
    DESIGN_JOURNEY.find((a) => a.id === "ALK-SKETCH-005"),
    DESIGN_JOURNEY.find((a) => a.id === "ALK-SKETCH-011"),
  ].filter(Boolean);

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
              <span className="text-alkota-slate">NOTEBOOK.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-16 space-y-6">
            <p className="font-sans text-base md:text-lg text-alkota-snow/80 leading-relaxed font-light max-w-lg">
              Project 01 is being developed in public.
            </p>
            <div className="font-sans text-sm text-alkota-slate space-y-1 leading-relaxed">
              <p>Geometry changes.</p>
              <p>Components move.</p>
              <p>Ideas disappear.</p>
              <p>Better ones replace them.</p>
            </div>
            <p className="font-sans text-sm text-alkota-snow/60 leading-relaxed max-w-md">
              The finished bike matters.
              <br />
              So does understanding how we got there.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/about/build-process"
                className="inline-flex items-center gap-2 px-6 py-3 bg-alkota-white text-alkota-black font-mono text-xs font-bold uppercase hover:bg-alkota-signal hover:text-alkota-white transition-colors"
              >
                <span>FOLLOW THE DEVELOPMENT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about/story"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-alkota-signal text-alkota-white hover:text-alkota-signal font-mono text-xs font-bold uppercase transition-colors"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-white/10 pt-10">
          {artifacts.map((artifact) =>
            artifact ? (
              <DesignArtifact
                key={artifact.id}
                asset={artifact}
                theme="blueprint"
                showCaption
              />
            ) : null
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
          <span>ALKOTA PERFORMANCE ENGINEERING · PROJECT 01</span>
          <span>PRE-PRODUCTION · 2026</span>
        </div>
      </div>
    </section>
  );
}