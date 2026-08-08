"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export interface StoryChapter {
  slug: string;
  href: string;
  number: string;
  title: string;
  shortTitle: string;
  descriptor: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    slug: "about",
    href: "/about",
    number: "01",
    title: "ABOUT ALKOTA",
    shortTitle: "ABOUT",
    descriptor: "Origin & Vision",
  },
  {
    slug: "story",
    href: "/about/story",
    number: "02",
    title: "OUR STORY",
    shortTitle: "OUR STORY",
    descriptor: "History & Founder",
  },
  {
    slug: "reverse-engineering",
    href: "/about/reverse-engineering",
    number: "03",
    title: "REVERSE ENGINEERING",
    shortTitle: "REVERSE ENG.",
    descriptor: "Rider Requirement Analysis",
  },
  {
    slug: "build-process",
    href: "/about/build-process",
    number: "04",
    title: "BUILD PROCESS",
    shortTitle: "BUILD PROCESS",
    descriptor: "Idea to Trail Hardware",
  },
  {
    slug: "materials",
    href: "/about/materials",
    number: "05",
    title: "MATERIALS & COMPOSITES",
    shortTitle: "MATERIALS",
    descriptor: "Carbon & Titanium Science",
  },
  {
    slug: "testing",
    href: "/about/testing",
    number: "06",
    title: "VALIDATION & TESTING",
    shortTitle: "TESTING",
    descriptor: "ISO+ & Haute-Savoie Field R&D",
  },
  {
    slug: "philosophy",
    href: "/about/philosophy",
    number: "07",
    title: "ENGINEERING PHILOSOPHY",
    shortTitle: "PHILOSOPHY",
    descriptor: "Integrated Machine Architecture",
  },
];

export default function StoryNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-alkota-carbon/95 border-b border-white/10 backdrop-blur-md sticky top-[42px] z-40 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
          <span className="text-alkota-signal font-bold uppercase text-[10px] pr-2 flex items-center gap-1 border-r border-white/10 mr-1 flex-shrink-0">
            <span>STORY</span>
            <ChevronRight className="w-3 h-3 text-alkota-slate" />
          </span>

          {STORY_CHAPTERS.map((ch) => {
            const isActive = pathname === ch.href;

            return (
              <Link
                key={ch.slug}
                href={ch.href}
                className={`px-3 py-1.5 whitespace-nowrap uppercase transition-all flex items-center gap-2 border text-[11px] ${
                  isActive
                    ? "border-alkota-signal bg-alkota-signal text-alkota-white font-bold shadow-md"
                    : "border-transparent text-alkota-slate hover:text-white hover:border-white/20"
                }`}
              >
                <span className={isActive ? "text-alkota-white" : "text-alkota-signal font-bold"}>
                  {ch.number}
                </span>
                <span>{ch.shortTitle}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
