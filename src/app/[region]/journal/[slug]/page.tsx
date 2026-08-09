import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import { notFound } from "next/navigation";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ARTICLES } from "@/lib/data/journalData";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import ArticleSchema from "@/components/schema/ArticleSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const title = `${article.title} | Alkota Cycles`;

  return {
    title,
    description: article.excerpt,
    alternates: {
      canonical: `${siteUrl}/journal/${slug}`,
    },
    openGraph: {
      title,
      description: article.excerpt,
      url: `${siteUrl}/journal/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: article.title, path: `/journal/${slug}` },
  ];

  return (
    <>
      <ArticleSchema
        headline={article.title}
        description={article.excerpt}
        datePublished={article.date}
        url={`/journal/${slug}`}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-alkota-black uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ENGINEERING JOURNAL</span>
          </Link>

          <div className="space-y-4 border-b border-black/10 pb-8">
            <div className="flex items-center gap-3">
              <TechnicalAnnotation label={article.category} variant="slate" />
              <span className="font-mono text-xs text-alkota-slate">{article.readTime}</span>
            </div>

            <h1 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black leading-[0.95]">
              {article.title}
            </h1>

            <p className="font-sans text-lg text-alkota-graphite font-light leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="prose prose-slate max-w-none font-sans text-sm leading-relaxed text-alkota-graphite space-y-6">
            <p>{article.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
