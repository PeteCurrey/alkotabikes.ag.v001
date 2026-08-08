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
  project01AlpineTesting: "/images/project01-alpine-testing.png",
  engineeringWorkshop: "/images/engineering-workshop.png",

  // Social Sharing Card
  ogImage: "/og-image.png",
} as const;

export const componentAssets = {
  overviewGrid: "/images/components/component-overview-grid.png",
  
  // Brakes (Hope EVO V6Ti Front / Hope TR4 Rear)
  hopeEvoDark: "/images/components/hope-evo-v6ti-dark.png",
  hopeEvoAngleDark: "/images/components/hope-evo-v6ti-angle-dark.png",
  hopeEvoAlpine: "/images/components/hope-evo-v6ti-alpine.png",
  hopeTr4SilverAlpine: "/images/components/hope-tr4-silver-alpine.png",
  
  // Suspension (FOX 38 Factory Fork / FOX Float X2 Rear Shock)
  fox38Dark: "/images/components/fox-38-factory-dark.png",
  fox38Alpine: "/images/components/fox-38-factory-alpine.png",
  foxFloatX2Dark: "/images/components/fox-float-x2-dark.png",
  foxFloatX2Alpine: "/images/components/fox-float-x2-alpine.png",

  // Drivetrain (SRAM XX Eagle AXS Transmission)
  sramXxEagleDark: "/images/components/sram-xx-eagle-axs-dark.png",
  sramXxEagleAlpine: "/images/components/sram-xx-eagle-axs-alpine.png",

  // Wheels (DT Swiss EXC 1200 Carbon)
  dtSwissExc1200Dark: "/images/components/dt-swiss-exc-1200-dark.png",
  dtSwissExc1200Alpine: "/images/components/dt-swiss-exc-1200-alpine.png",

  // Tyres (Maxxis Assegai Front / Maxxis Minion DHR II Rear Tan Wall)
  maxxisAssegaiDark: "/images/components/maxxis-assegai-dark.png",
  maxxisAssegaiAlpine: "/images/components/maxxis-assegai-alpine.png",
  maxxisMinionDhrDark: "/images/components/maxxis-minion-dhr-dark.png",
  maxxisMinionDhrAlpine: "/images/components/maxxis-minion-dhr-alpine.png",

  // Cockpit (Renthal Fatbar Carbon & Apex Stem)
  renthalFatbarDark: "/images/components/renthal-fatbar-dark.png",
  renthalFatbarAlpine: "/images/components/renthal-fatbar-alpine.png",

  // Touchpoints (Ergon GE1 Evo Grips)
  ergonGe1Dark: "/images/components/ergon-ge1-evo-dark.png",
  ergonGe1Alpine: "/images/components/ergon-ge1-evo-alpine.png",
} as const;

export type BrandAssetKey = keyof typeof brandAssets;
export type ComponentAssetKey = keyof typeof componentAssets;

