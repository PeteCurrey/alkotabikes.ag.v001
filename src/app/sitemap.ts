import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";
import { PROJECT_01_JOURNAL_ENTRIES, JournalEntry } from "@/content/journal/project01/entries";
import { DESIGN_ARCHIVE } from "@/content/design/archive";
import { products } from "@/content/store/products";
import { PROJECT_01_SYSTEMS } from "@/lib/data/project01";
import { VALID_REGIONS } from "@/lib/regions";

function parseValidDate(dateStr?: string): Date | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d;
}

const rawStaticPaths = [
  "",
  "/bikes/project-01",
  "/order",
  "/configure",
  "/road-to-2028",
  "/engineering",
  "/engineering/chassis",
  "/engineering/kinematics",
  "/engineering/materials",
  "/engineering/testing",
  "/engineering-philosophy",
  "/about",
  "/about/story",
  "/about/philosophy",
  "/about/build-process",
  "/about/testing",
  "/about/reverse-engineering",
  "/about/materials",
  "/journal",
  "/project-01/design-archive",
  "/racing",
  "/racing/2027",
  "/partners",
  "/partners/find",
  "/ownership",
  "/my-alkota",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/legal",
  "/warranty",
  "/returns",
  "/shipping",
  "/safety",
  "/complaints",
  "/accessibility",
  "/faq",
  "/glossary",
  "/ambassadors",
  "/work-with-us",
  "/mission",
  "/store",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Generate static regional entries
  for (const path of rawStaticPaths) {
    for (const region of VALID_REGIONS) {
      entries.push({
        url: `${siteUrl}/${region}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            "en-GB": `${siteUrl}/uk${path}`,
            "en-US": `${siteUrl}/us${path}`,
            "x-default": `${siteUrl}/us${path}`,
          },
        },
      });
    }
  }

  // Dynamic Journal Entries
  for (const entry of PROJECT_01_JOURNAL_ENTRIES) {
    const path = `/journal/${entry.slug}`;
    for (const region of VALID_REGIONS) {
      entries.push({
        url: `${siteUrl}/${region}${path}`,
        lastModified: parseValidDate(entry.date),
        priority: 0.7,
        changeFrequency: "monthly",
        alternates: {
          languages: {
            "en-GB": `${siteUrl}/uk${path}`,
            "en-US": `${siteUrl}/us${path}`,
            "x-default": `${siteUrl}/us${path}`,
          },
        },
      });
    }
  }

  // Dynamic Component Details
  for (const sys of PROJECT_01_SYSTEMS) {
    const path = `/bikes/project-01/components/${sys.slug}`;
    for (const region of VALID_REGIONS) {
      entries.push({
        url: `${siteUrl}/${region}${path}`,
        lastModified: parseValidDate(sys.sourceLastVerified),
        priority: 0.7,
        changeFrequency: "monthly",
        alternates: {
          languages: {
            "en-GB": `${siteUrl}/uk${path}`,
            "en-US": `${siteUrl}/us${path}`,
            "x-default": `${siteUrl}/us${path}`,
          },
        },
      });
    }
  }

  // Dynamic Design Archive Artifacts
  for (const artifact of DESIGN_ARCHIVE) {
    const path = `/project-01/design-archive/${artifact.slug}`;
    for (const region of VALID_REGIONS) {
      entries.push({
        url: `${siteUrl}/${region}${path}`,
        lastModified: parseValidDate(artifact.dateAdded),
        priority: 0.6,
        changeFrequency: "monthly",
        alternates: {
          languages: {
            "en-GB": `${siteUrl}/uk${path}`,
            "en-US": `${siteUrl}/us${path}`,
            "x-default": `${siteUrl}/us${path}`,
          },
        },
      });
    }
  }

  // Dynamic Store Products
  for (const prod of products) {
    const path = `/store/${prod.slug}`;
    for (const region of VALID_REGIONS) {
      entries.push({
        url: `${siteUrl}/${region}${path}`,
        priority: 0.6,
        changeFrequency: "monthly",
        alternates: {
          languages: {
            "en-GB": `${siteUrl}/uk${path}`,
            "en-US": `${siteUrl}/us${path}`,
            "x-default": `${siteUrl}/us${path}`,
          },
        },
      });
    }
  }

  return entries;
}
