import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (isProduction) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/partners/portal", "/my-alkota", "/cart", "/api"],
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  // Staging / Preview / Development environment backstop: disallow all crawling
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
