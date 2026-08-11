"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ARTICLES } from "@/lib/data/journalData";
import { ArrowRight } from "lucide-react";

export default function JournalPreviewSection() {
  return (
    <section className="w-full bg-alkota-white text-alkota-black py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div className="space-y-3">
            <TechnicalAnnotation label="EDITORIAL DISPATCHES" variant="slate" />
            <h2 className="font-display font-extrabold text-4xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              FIELD NOTES.
            </h2>
          </div>

          <Link
            href="/journal"
            className="px-6 py-3 bg-alkota-black text-alkota-white hover:bg-alkota-slate font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
          >
            <span>VIEW ALL DISPATCHES</span>
            <ArrowRight className="w-4 h-4 text-alkota-signal" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group p-6 bg-alkota-black text-alkota-white border border-black/10 hover:border-alkota-signal transition-all duration-500 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-lg min-h-[300px]"
            >
              {/* Reveal-on-hover Background Image */}
              {article.image && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={article.image}
                    alt={`ALKOTA Dispatch — ${article.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center opacity-20 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Gradient Overlay for Contrast & Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-alkota-black/80 to-alkota-black/50 group-hover:via-alkota-black/70 group-hover:to-alkota-black/30 transition-colors duration-700" />
                </div>
              )}

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between font-mono text-[10px] text-alkota-signal font-bold tracking-wider uppercase">
                  <span>{article.category}</span>
                  <span className="text-alkota-slate">{article.readTime}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-alkota-white group-hover:text-alkota-signal transition-colors uppercase tracking-tight">
                  {article.title}
                </h3>

                <p className="font-sans text-xs text-alkota-slate group-hover:text-alkota-snow transition-colors leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[10px] text-alkota-slate relative z-10">
                <span>{article.date}</span>
                <ArrowRight className="w-4 h-4 text-alkota-slate group-hover:text-alkota-signal group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
