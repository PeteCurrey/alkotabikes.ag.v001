import type { Metadata } from "next";
import type { RegionCode } from "@/lib/regions";
import { getRegion } from "@/lib/regions";
import siteUrl from "@/lib/env";

export interface BuildRegionalMetadataOptions {
  region: RegionCode;
  /**
   * The clean path relative to the region root.
   * e.g. "", "/order", "/bikes/project-01", "/engineering/kinematics"
   */
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  robots?: Metadata["robots"];
}

/**
 * Single source of truth for region-aware page metadata.
 * Generates correct canonical, hreflang alternates, OpenGraph, and Twitter tags.
 */
export function buildRegionalMetadata(options: BuildRegionalMetadataOptions): Metadata {
  const { region, path, title, description, ogImage, robots } = options;

  // Clean path to ensure leading slash if not empty
  let cleanPath = path.trim();
  if (cleanPath === "/") {
    cleanPath = "";
  } else if (cleanPath.length > 0 && !cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  const regionObj = getRegion(region);

  const canonical = `${siteUrl}/${region}${cleanPath}`;
  const ukUrl = `${siteUrl}/uk${cleanPath}`;
  const usUrl = `${siteUrl}/us${cleanPath}`;

  const defaultOgImage = `${siteUrl}/og-image.jpg`;
  const ogImageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
    : defaultOgImage;

  return {
    title,
    description,
    robots,
    alternates: {
      canonical,
      languages: {
        "en-GB": ukUrl,
        "en-US": usUrl,
        "x-default": usUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Alkota Cycles",
      locale: region === "uk" ? "en_GB" : "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
