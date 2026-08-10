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
  project01WhiteHero: "/images/project01-glacier-white-hero.jpg",
  project01CarbonHero: "/images/project01-naked-carbon-hero.jpg",

  // Environment & Engineering Photography
  // NOTE: project01AlpineTesting removed 2026-08-09 — was byte-identical to engineeringWorkshop.
  // TerrainBench renders awaiting-asset state pending genuine field imagery (planned 2027).
  engineeringWorkshop: "/images/engineering-workshop.jpg",

  // Social Sharing Card
  ogImage: "/og-image.png",
} as const;

export const componentAssets = {
  overviewGrid: "/images/components/component-overview-grid.jpg",
  
  // Brakes (Hope EVO V6Ti Front / Hope TR4 Rear)
  hopeEvoDark: "/images/components/hope-evo-v6ti-dark.jpg",
  hopeEvoAngleDark: "/images/components/hope-evo-v6ti-angle-dark.jpg",
  hopeEvoAlpine: "/images/components/hope-evo-v6ti-alpine.jpg",
  hopeTr4SilverAlpine: "/images/components/hope-tr4-silver-alpine.jpg",
  
  // Suspension (FOX 38 Factory Fork / FOX Float X2 Rear Shock)
  fox38Dark: "/images/components/fox-38-factory-dark.jpg",
  fox38Alpine: "/images/components/fox-38-factory-alpine.jpg",
  foxFloatX2Dark: "/images/components/fox-float-x2-dark.jpg",
  foxFloatX2Alpine: "/images/components/fox-float-x2-alpine.jpg",

  // Drivetrain (SRAM XX Eagle AXS Transmission)
  sramXxEagleDark: "/images/components/sram-xx-eagle-axs-dark.jpg",
  sramXxEagleAlpine: "/images/components/sram-xx-eagle-axs-alpine.jpg",

  // Wheels (DT Swiss EXC 1200 Carbon)
  dtSwissExc1200Dark: "/images/components/dt-swiss-exc-1200-dark.jpg",
  dtSwissExc1200Alpine: "/images/components/dt-swiss-exc-1200-alpine.jpg",

  // Tyres (Maxxis Assegai Front / Maxxis Minion DHR II Rear Tan Wall)
  maxxisAssegaiDark: "/images/components/maxxis-assegai-dark.jpg",
  maxxisAssegaiAlpine: "/images/components/maxxis-assegai-alpine.jpg",
  maxxisMinionDhrDark: "/images/components/maxxis-minion-dhr-dark.jpg",
  maxxisMinionDhrAlpine: "/images/components/maxxis-minion-dhr-alpine.jpg",

  // Cockpit (Renthal Fatbar Carbon & Apex Stem)
  renthalFatbarDark: "/images/components/renthal-fatbar-dark.jpg",
  renthalFatbarAlpine: "/images/components/renthal-fatbar-alpine.jpg",

  // Touchpoints (Ergon GE1 Evo Grips)
  ergonGe1Dark: "/images/components/ergon-ge1-evo-dark.jpg",
  ergonGe1Alpine: "/images/components/ergon-ge1-evo-alpine.jpg",
} as const;

export type BrandAssetKey = keyof typeof brandAssets;
export type ComponentAssetKey = keyof typeof componentAssets;

