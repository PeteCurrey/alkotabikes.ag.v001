import React from "react";
import { siteUrl } from "@/lib/env";

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished?: string; // ISO string e.g. "2026-01-15"
  url: string;
  image?: string;
}

export default function ArticleSchema({
  headline,
  description,
  datePublished,
  url,
  image,
}: ArticleSchemaProps) {
  // If no datePublished exists, do not emit Article schema
  if (!datePublished) return null;

  const validDate = new Date(datePublished);
  if (isNaN(validDate.getTime())) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    datePublished: validDate.toISOString(),
    url: `${siteUrl}${url}`,
    image: image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`,
    publisher: {
      "@type": "Organization",
      name: "Alkota Cycles",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/alkota-logo-dark.png`,
      },
    },
    author: {
      "@type": "Organization",
      name: "Alkota Cycles Performance Engineering",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
