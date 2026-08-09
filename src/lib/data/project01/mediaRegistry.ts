/**
 * ALKOTA Performance Engineering — Media Rights & Source Registry
 * Canonical manifest tracking all media assets, rights statuses,
 * primary sources, copyright provenance, and approved usage rules.
 */

export type RightsStatus =
  | "ALKOTA OWNED"
  | "MANUFACTURER APPROVED"
  | "PERMISSION REQUIRED"
  | "DEVELOPMENT ONLY"
  | "DO NOT PUBLISH";

export interface MediaAsset {
  id: string;
  filename: string;
  publicPath: string;
  assetType: "PRODUCT_HERO" | "COMPONENT_DARK" | "COMPONENT_ALPINE" | "WORKSHOP" | "TERRAIN" | "GRAPHIC";
  product: string;
  brand: string;
  sourceUrl: string;
  rightsStatus: RightsStatus;
  dateObtained: string;
  approvedForPublicUse: boolean;
  resolution: string;
  altText: string;
  notes?: string;
}

export const MEDIA_REGISTRY: Record<string, MediaAsset> = {
  "p01-glacier-white": {
    id: "p01-glacier-white",
    filename: "project01-glacier-white.png",
    publicPath: "/images/project01-glacier-white.png",
    assetType: "PRODUCT_HERO",
    product: "PROJECT 01",
    brand: "ALKOTA",
    sourceUrl: "https://alkota.com/brand/assets",
    rightsStatus: "ALKOTA OWNED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1440x900",
    altText: "ALKOTA Project 01 full-suspension mountain bike in Glacier White alpine showroom finish",
  },
  "p01-naked-carbon": {
    id: "p01-naked-carbon",
    filename: "project01-naked-carbon-hero.jpg",
    publicPath: "/images/project01-naked-carbon-hero.jpg",
    assetType: "PRODUCT_HERO",
    product: "PROJECT 01",
    brand: "ALKOTA",
    sourceUrl: "https://alkota.com/brand/assets",
    rightsStatus: "ALKOTA OWNED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1440x900",
    altText: "ALKOTA Project 01 full-suspension mountain bike in Naked Carbon raw composite finish",
  },
  "fox-38-dark": {
    id: "fox-38-dark",
    filename: "fox-38-factory-dark.png",
    publicPath: "/images/components/fox-38-factory-dark.png",
    assetType: "COMPONENT_DARK",
    product: "38 FACTORY GRIP X2",
    brand: "FOX",
    sourceUrl: "https://www.ridefox.com/family.php?m=bike&family=38",
    rightsStatus: "MANUFACTURER APPROVED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1000x1200",
    altText: "FOX 38 Factory front suspension fork dark studio portrait",
  },
  "fox-38-alpine": {
    id: "fox-38-alpine",
    filename: "fox-38-factory-alpine.png",
    publicPath: "/images/components/fox-38-factory-alpine.png",
    assetType: "COMPONENT_ALPINE",
    product: "38 FACTORY GRIP X2",
    brand: "FOX",
    sourceUrl: "https://www.ridefox.com/family.php?m=bike&family=38",
    rightsStatus: "MANUFACTURER APPROVED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1000x1200",
    altText: "FOX 38 Factory front suspension fork alpine showroom portrait",
  },
  "hope-v6ti-dark": {
    id: "hope-v6ti-dark",
    filename: "hope-evo-v6ti-dark.png",
    publicPath: "/images/components/hope-evo-v6ti-dark.png",
    assetType: "COMPONENT_DARK",
    product: "EVO V6Ti",
    brand: "HOPE TECHNOLOGY",
    sourceUrl: "https://www.hopetech.com/products/brakes/",
    rightsStatus: "MANUFACTURER APPROVED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1000x1200",
    altText: "Hope EVO V6Ti 6-piston CNC front brake caliper dark studio portrait",
  },
  "sram-xx-dark": {
    id: "sram-xx-dark",
    filename: "sram-xx-eagle-axs-dark.png",
    publicPath: "/images/components/sram-xx-eagle-axs-dark.png",
    assetType: "COMPONENT_DARK",
    product: "XX EAGLE AXS TRANSMISSION",
    brand: "SRAM",
    sourceUrl: "https://www.sram.com/en/sram/models/rd-xx-e-b1",
    rightsStatus: "MANUFACTURER APPROVED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1000x1200",
    altText: "SRAM XX Eagle AXS Transmission rear derailleur dark studio portrait",
  },
  "dt-swiss-dark": {
    id: "dt-swiss-dark",
    filename: "dt-swiss-exc-1200-dark.png",
    publicPath: "/images/components/dt-swiss-exc-1200-dark.png",
    assetType: "COMPONENT_DARK",
    product: "EXC 1200 CLASSIC",
    brand: "DT SWISS",
    sourceUrl: "https://www.dtswiss.com/en/wheels/wheels-mtb/enduro/exc-1200",
    rightsStatus: "MANUFACTURER APPROVED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1000x1200",
    altText: "DT Swiss EXC 1200 Classic carbon wheelset dark studio portrait",
  },
  "maxxis-assegai-dark": {
    id: "maxxis-assegai-dark",
    filename: "maxxis-assegai-dark.png",
    publicPath: "/images/components/maxxis-assegai-dark.png",
    assetType: "COMPONENT_DARK",
    product: "ASSEGAI TAN WALL",
    brand: "MAXXIS",
    sourceUrl: "https://www.maxxis.com/us/tire/assegai/",
    rightsStatus: "MANUFACTURER APPROVED",
    dateObtained: "2026-08-08",
    approvedForPublicUse: true,
    resolution: "1000x1200",
    altText: "Maxxis Assegai 3C MaxxGrip tan-wall front tyre dark studio portrait",
  },
};
