import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { siteUrl } from "@/lib/env";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerList = await headers();
  const host = headerList.get("host") || "";

  // Allow crawling ONLY when requested via the official production domain (alkotacycles.com)
  const isOfficialProductionDomain =
    host.includes("alkotacycles.com") && !host.includes("vercel.app");

  if (isOfficialProductionDomain) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api",
          "/studio",
          "/cart",
          "/uk/cart",
          "/us/cart",
          "/my-alkota",
          "/uk/my-alkota",
          "/us/my-alkota",
          "/partners/portal",
          "/uk/partners/portal",
          "/us/partners/portal",
        ],
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  // Preview, staging, localhost, and .vercel.app deployments: disallow all crawling
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
