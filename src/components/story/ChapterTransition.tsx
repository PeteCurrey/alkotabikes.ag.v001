"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { STORY_CHAPTERS, StoryChapter } from "./StoryNavigation";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";

interface ChapterTransitionProps {
  currentSlug: string;
}

const CHAPTER_THUMBNAILS: Record<string, string> = {
  about: ALKOTA_STORY_MEDIA.peteFounderPortrait.src,
  story: ALKOTA_STORY_MEDIA.peteRidingHistory.src,
  "reverse-engineering": ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.src,
  "build-process": ALKOTA_STORY_MEDIA.workshopChassisAssembly.src,
  materials: ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src,
  testing: ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src,
  philosophy: ALKOTA_STORY_MEDIA.completeMachineIntegration.src,
};

export default function ChapterTransition({ currentSlug }: ChapterTransitionProps) {
  const currentIdx = STORY_CHAPTERS.findIndex((c) => c.slug === currentSlug);

  const prevChapter = currentIdx > 0 ? STORY_CHAPTERS[currentIdx - 1] : null;
  const nextChapter = currentIdx < STORY_CHAPTERS.length - 1 ? STORY_CHAPTERS[currentIdx + 1] : null;

  return (
    <section className="w-full bg-alkota-carbon text-alkota-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 tech-grid-dark">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-alkota-slate">
          <span className="text-alkota-signal uppercase font-bold tracking-widest">CHAPTER NAVIGATION</span>
          <span>DISCIPLINE {currentIdx + 1} OF {STORY_CHAPTERS.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Chapter */}
          {prevChapter ? (
            <Link
              href={prevChapter.href}
              className="group p-6 bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-alkota-slate uppercase">
                <ArrowLeft className="w-4 h-4 text-alkota-signal group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS CHAPTER • {prevChapter.number}</span>
              </div>

              <div className="relative w-full h-36 bg-alkota-carbon overflow-hidden border border-white/10">
                <Image
                  src={CHAPTER_THUMBNAILS[prevChapter.slug] || ALKOTA_STORY_MEDIA.peteFounderPortrait.src}
                  alt={prevChapter.title}
                  fill
                  sizes="400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-70"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-alkota-white uppercase tracking-tight group-hover:text-alkota-signal transition-colors">
                  {prevChapter.title}
                </h3>
                <p className="font-sans text-xs text-alkota-slate font-light">
                  {prevChapter.descriptor}
                </p>
              </div>
            </Link>
          ) : (
            <div className="p-6 bg-alkota-black/40 border border-white/5 space-y-2 opacity-50 font-mono text-xs text-alkota-slate">
              <span>CHAPTER 01</span>
              <p className="font-sans text-sm text-alkota-snow font-light">
                Beginning of the ALKOTA story sequence.
              </p>
            </div>
          )}

          {/* Next Chapter */}
          {nextChapter ? (
            <Link
              href={nextChapter.href}
              className="group p-6 bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between font-mono text-xs text-alkota-slate uppercase">
                <span>NEXT CHAPTER • {nextChapter.number}</span>
                <ArrowRight className="w-4 h-4 text-alkota-signal group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="relative w-full h-36 bg-alkota-carbon overflow-hidden border border-white/10">
                <Image
                  src={CHAPTER_THUMBNAILS[nextChapter.slug] || ALKOTA_STORY_MEDIA.completeMachineIntegration.src}
                  alt={nextChapter.title}
                  fill
                  sizes="400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-alkota-white uppercase tracking-tight group-hover:text-alkota-signal transition-colors">
                  {nextChapter.title}
                </h3>
                <p className="font-sans text-xs text-alkota-slate font-light">
                  {nextChapter.descriptor}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href="/bikes/project-01"
              className="group p-6 bg-alkota-black border border-alkota-signal hover:bg-alkota-signal/10 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between font-mono text-xs text-alkota-signal font-bold uppercase">
                <span>EXPLORE FLAGSHIP PLATFORM</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="relative w-full h-36 bg-alkota-carbon overflow-hidden border border-white/10">
                <Image
                  src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
                  alt="Project 01"
                  fill
                  sizes="400px"
                  className="object-contain object-center p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-alkota-white uppercase tracking-tight">
                  PROJECT 01 PLATFORM
                </h3>
                <p className="font-sans text-xs text-alkota-snow font-light">
                  Discover the complete machine hardware architecture.
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
