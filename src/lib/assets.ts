/**
 * ALKOTA Performance Engineering — Central Asset Registry
 * Canonical mapping for all brand identity artwork, product imagery,
 * technical illustrations, and media assets across the platform.
 */

export const brandAssets = {
  // Primary Horizontal Logo Lockup (ALKOTA PERFORMANCE ENGINEERING)
  logoPrimaryDark: "/brand/alkota-logo-dark.png",
  logoPrimaryLight: "/brand/alkota-logo-light.png",
  
  // Standalone Monogram Mark (APE Mountain Symbol)
  logoMarkDark: "/brand/alkota-monogram-dark.png",
  logoMarkLight: "/brand/alkota-monogram-light.png",

  // Canonical Project 01 Hero Imagery (Glacier White & Naked Carbon)
  project01WhiteHero: "/images/project01-glacier-white.png",
  project01WhiteHeroWebp: "/images/project01-glacier-white.webp",
  project01CarbonHero: "/images/project01-naked-carbon.png",
  project01CarbonHeroWebp: "/images/project01-naked-carbon.webp",

  // Environment & Engineering Photography
  project01AlpineTesting: "/images/project01-alpine-testing.png",
  project01AlpineTestingWebp: "/images/project01-alpine-testing.webp",
  engineeringWorkshop: "/images/engineering-workshop.png",
  engineeringWorkshopWebp: "/images/engineering-workshop.webp",

  // Social Sharing Card
  ogImage: "/og-image.png",
} as const;

export type BrandAssetKey = keyof typeof brandAssets;
