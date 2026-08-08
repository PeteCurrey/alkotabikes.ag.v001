import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ARTICLES } from "@/lib/data/journalData";
import { ArrowRight } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-black/10 pb-8 space-y-3">
          <TechnicalAnnotation label="FIELD NOTES JOURNAL" value="DISPATCHES" variant="slate" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
            FIELD NOTES.
          </h1>
          <p className="font-sans text-base text-alkota-graphite max-w-2xl font-light leading-relaxed">
            Engineering dispatches, kinematics analysis, materials testing notes, and stories from alpine mountain trails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
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

                <h2 className="font-display text-xl font-bold text-alkota-black group-hover:text-alkota-graphite transition-colors uppercase tracking-tight">
                  {article.title}
                </h2>

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
    </div>
  );
}
