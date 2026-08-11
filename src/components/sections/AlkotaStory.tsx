"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight } from "lucide-react";

export default function AlkotaStory() {
  return (
    <section className="w-full bg-alkota-carbon text-alkota-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 tech-grid-dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column — Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <TechnicalAnnotation label="ORIGIN & METHODOLOGY" value="THE ALKOTA STORY" variant="signal" />

          <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            THERE&apos;S A STORY<br />
            <span className="text-alkota-signal">BEHIND THE MACHINE.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-alkota-snow font-light leading-relaxed">
            Project 01 did not begin with a catalogue or a component list.
          </p>

          <p className="font-sans text-xs sm:text-sm text-alkota-slate leading-relaxed font-light">
            It began with decades spent riding, racing, selling, maintaining and questioning bicycles — followed by a simple decision: start again from the ride.
          </p>

          {/* 3 Gateway Links */}
          <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
            <Link
              href="/about/story"
              className="px-6 py-3.5 bg-alkota-signal text-alkota-white font-bold uppercase hover:bg-white hover:text-alkota-black transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>OUR STORY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about/reverse-engineering"
              className="px-6 py-3.5 border border-white/20 text-alkota-white hover:border-alkota-signal hover:text-alkota-signal font-bold uppercase transition-colors flex items-center gap-2"
            >
              <span>REVERSE ENGINEERING</span>
            </Link>

            <Link
              href="/about/build-process"
              className="px-6 py-3.5 border border-white/10 text-alkota-slate hover:border-white/30 hover:text-alkota-white uppercase transition-colors flex items-center gap-2"
            >
              <span>HOW PROJECT 01 IS BUILT</span>
            </Link>
          </div>
        </div>

        {/* Right Column — Powerful Founder + Project 01 Image */}
        {/* Right Column — Powerful Project 01 System Presentation */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative w-full h-[400px] sm:h-[480px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl group">
            <Image
              src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
              alt="Project 01 Glacier White flagship all-mountain chassis"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1.5 text-alkota-signal uppercase border border-white/10">
              PROJECT 01 · GLACIER WHITE ALL-MOUNTAIN CHASSIS
            </div>
          </div>
          <div className="font-mono text-[10px] text-alkota-slate flex items-center justify-between uppercase">
            <span>PROJECT 01 · ALPINE R&D BASELINE</span>
            <span>HAUTE-SAVOIE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
