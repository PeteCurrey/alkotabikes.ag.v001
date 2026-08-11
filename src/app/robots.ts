import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

/**
 * ALKOTA CYCLES — CRAWL GATE
 *
 * Indexing is controlled exclusively by the ALLOW_INDEXING environment variable.
 * Default: false (disallow all).
 *
 * ALLOW_INDEXING=true is a LAUNCH DECISION — set only on production at go-live.
 * Never set ALLOW_INDEXING=true on staging or preview environments.
 *
 * Three-layer crawl protection:
 *   1. robots.txt (this file) — protocol-level crawl gate
 *   2. X-Robots-Tag HTTP header — set in middleware for all responses
 *   3. <meta name="robots"> — set in root layout via metadata export
 */
export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.ALLOW_INDEXING === "true";

  if (!allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // ALLOW_INDEXING=true: selective disallow of internal/operational paths
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
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
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
