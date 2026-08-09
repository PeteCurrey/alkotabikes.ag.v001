import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";
import { PROJECT_01_JOURNAL_ENTRIES, JournalEntry } from "@/content/journal/project01/entries";
import { DESIGN_ARCHIVE } from "@/content/design/archive";
import { products } from "@/content/store/products";
import { PROJECT_01_SYSTEMS } from "@/lib/data/project01";

function parseValidDate(dateStr?: string): Date | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}`, priority: 1.0, changeFrequency: "daily" },
    { url: `${siteUrl}/bikes/project-01`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${siteUrl}/order`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${siteUrl}/configure`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/road-to-2028`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/engineering`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/engineering/chassis`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/engineering/kinematics`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/engineering/materials`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/engineering/testing`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/engineering-philosophy`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/about/story`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/about/philosophy`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/about/build-process`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/about/testing`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/about/reverse-engineering`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/about/materials`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/journal`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/project-01/design-archive`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/racing`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/racing/2027`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/partners`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/partners/find`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/ownership`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/my-alkota`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/contact`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${siteUrl}/privacy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/terms`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/cookies`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/legal`, priority: 0.4, changeFrequency: "monthly" },
    { url: `${siteUrl}/warranty`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${siteUrl}/returns`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${siteUrl}/shipping`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${siteUrl}/safety`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${siteUrl}/complaints`, priority: 0.4, changeFrequency: "yearly" },
    { url: `${siteUrl}/accessibility`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/faq`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${siteUrl}/glossary`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/ambassadors`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${siteUrl}/work-with-us`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${siteUrl}/mission`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/store`, priority: 0.7, changeFrequency: "weekly" },
  ];

  // Dynamic Journal Entries
  const journalRoutes: MetadataRoute.Sitemap = PROJECT_01_JOURNAL_ENTRIES.map((entry: JournalEntry) => ({
    url: `${siteUrl}/journal/project-01/${entry.slug}`,
    lastModified: parseValidDate(entry.date),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  // Dynamic Component Details
  const componentRoutes: MetadataRoute.Sitemap = PROJECT_01_SYSTEMS.map((sys) => ({
    url: `${siteUrl}/bikes/project-01/components/${sys.slug}`,
    lastModified: parseValidDate(sys.sourceLastVerified),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  // Dynamic Design Archive Artifacts
  const designArchiveRoutes: MetadataRoute.Sitemap = DESIGN_ARCHIVE.map((artifact) => ({
    url: `${siteUrl}/project-01/design-archive/${artifact.slug}`,
    lastModified: parseValidDate(artifact.dateAdded),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  // Dynamic Store Products
  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${siteUrl}/store/${prod.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [
    ...staticRoutes,
    ...journalRoutes,
    ...componentRoutes,
    ...designArchiveRoutes,
    ...productRoutes,
  ];
}
