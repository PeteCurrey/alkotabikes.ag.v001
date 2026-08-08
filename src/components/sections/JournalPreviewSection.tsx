"use client";

import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ARTICLES } from "@/lib/data/journalData";
import { ArrowRight, BookOpen } from "lucide-react";

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
              className="group p-6 bg-alkota-snow border border-black/10 hover:border-alkota-black hover:bg-white transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-alkota-black group-hover:text-alkota-graphite transition-colors uppercase tracking-tight">
                  {article.title}
                </h3>

                <p className="font-sans text-xs text-alkota-graphite leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="border-t border-black/10 pt-3 flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                <span>{article.date}</span>
                <ArrowRight className="w-3.5 h-3.5 text-alkota-black group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
