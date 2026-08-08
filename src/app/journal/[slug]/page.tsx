import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ARTICLES } from "@/lib/data/journalData";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-alkota-black uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO FIELD NOTES</span>
        </Link>

        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="flex items-center gap-3">
            <TechnicalAnnotation label={article.category} variant="slate" />
            <span className="font-mono text-xs text-alkota-slate">{article.readTime}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-[0.95]">
            {article.title}
          </h1>

          <div className="flex justify-between font-mono text-xs text-alkota-slate pt-2">
            <span>AUTHOR: {article.author}</span>
            <span>{article.date}</span>
          </div>
        </div>

        <div className="space-y-6 font-sans text-base text-alkota-graphite leading-relaxed font-light">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
