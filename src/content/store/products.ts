// ALKOTA SUPPLY — Product Catalogue
// Status: INTENT-BASED PLACEHOLDER
// Prices are indicative and subject to confirmation.
// Do not display £0.00 — use status "coming_soon" to show "COMING SOON".

export type ProductStatus = "available" | "coming_soon" | "sold_out";

export interface ProductVariant {
  label: string;   // e.g. "S / M / L" or "Black / White"
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  price: number | null;        // null = price not confirmed
  status: ProductStatus;
  variants: ProductVariant[];
  description: string;
  details: string[];
  imagePlaceholder: string;    // SVG/CSS placeholder colour key
  badge?: string;              // e.g. "NEW" | "WORKSHOP EDITION"
}

export const products: Product[] = [
  {
    id: "ALK-CAP-001",
    slug: "performance-engineering-cap",
    name: "Performance Engineering Cap",
    subtitle: "5-panel structured cap",
    category: "HEADWEAR",
    price: 45,
    status: "coming_soon",
    variants: [
      { label: "COLOUR", options: ["Black", "Graphite"] },
    ],
    description:
      "A structured 5-panel cap built for the paddock and the trail. Minimal branding. Maximum function. ALKOTA wordmark embroidered in white.",
    details: [
      "Structured 5-panel silhouette",
      "Pre-curved peak",
      "Embroidered ALKOTA wordmark",
      "Snapback closure",
      "Available in Black and Graphite",
    ],
    imagePlaceholder: "cap",
    badge: "WORKSHOP EDITION",
  },
  {
    id: "ALK-TEE-001",
    slug: "engineering-tee-black",
    name: "Engineering Tee — Black",
    subtitle: "Heavyweight cotton crew",
    category: "APPAREL",
    price: 55,
    status: "coming_soon",
    variants: [
      { label: "SIZE", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    ],
    description:
      "220gsm heavyweight cotton. The ALKOTA mark, nothing more. A shirt that works in the workshop, the paddock and the mountain.",
    details: [
      "220gsm 100% cotton",
      "Boxy relaxed fit",
      "ALKOTA wordmark screen-print — chest left",
      "Reinforced collar seam",
      "Pre-washed for minimal shrink",
    ],
    imagePlaceholder: "tee-black",
  },
  {
    id: "ALK-TEE-002",
    slug: "engineering-tee-white",
    name: "Engineering Tee — White",
    subtitle: "Heavyweight cotton crew",
    category: "APPAREL",
    price: 55,
    status: "coming_soon",
    variants: [
      { label: "SIZE", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    ],
    description:
      "Same heavyweight cotton in Alkota Snow. ALKOTA mark printed in carbon. An object of daily use from the development programme.",
    details: [
      "220gsm 100% cotton",
      "Boxy relaxed fit",
      "ALKOTA wordmark screen-print — chest left in carbon",
      "Reinforced collar seam",
      "Pre-washed for minimal shrink",
    ],
    imagePlaceholder: "tee-white",
  },
  {
    id: "ALK-HOOD-001",
    slug: "workshop-hoodie",
    name: "Workshop Hoodie",
    subtitle: "400gsm fleece-lined pullover",
    category: "APPAREL",
    price: 120,
    status: "coming_soon",
    variants: [
      { label: "SIZE", options: ["XS", "S", "M", "L", "XL", "XXL"] },
      { label: "COLOUR", options: ["Carbon", "Graphite"] },
    ],
    description:
      "The hoodie worn during build sessions. 400gsm heavyweight fleece. Kangaroo pocket. ALKOTA system label inside the neck.",
    details: [
      "400gsm cotton-poly fleece lining",
      "Brushed interior finish",
      "Kangaroo hand warmer pocket",
      "Embroidered ALKOTA wordmark — chest",
      "Technical woven label at neck — ALK-REF WORKSHOP",
      "Ribbed cuffs and hem",
    ],
    imagePlaceholder: "hoodie",
    badge: "WORKSHOP EDITION",
  },
  {
    id: "ALK-OVER-001",
    slug: "paddock-overshirt",
    name: "Paddock Overshirt",
    subtitle: "Technical woven overshirt",
    category: "APPAREL",
    price: null,
    status: "coming_soon",
    variants: [
      { label: "SIZE", options: ["S", "M", "L", "XL", "XXL"] },
    ],
    description:
      "A purpose-built overshirt designed for the race paddock environment. Technical woven shell with minimal branding and a clean engineering silhouette.",
    details: [
      "Technical ripstop woven shell",
      "Two chest patch pockets",
      "Clean back panel — no graphics",
      "ALKOTA woven tab at chest pocket",
      "Drop hem, relaxed fit",
    ],
    imagePlaceholder: "overshirt",
    badge: "COMING 2027",
  },
  {
    id: "ALK-BTL-001",
    slug: "aluminium-water-bottle",
    name: "Aluminium Water Bottle",
    subtitle: "Workshop and trail companion",
    category: "EQUIPMENT",
    price: 28,
    status: "coming_soon",
    variants: [
      { label: "VOLUME", options: ["500ml", "750ml"] },
      { label: "COLOUR", options: ["Black", "Raw Aluminium"] },
    ],
    description:
      "A clean aluminium bottle for the workshop and the mountain. Laser-etched ALKOTA wordmark. No-nonsense cap. Dishwasher safe.",
    details: [
      "6061 aluminium construction",
      "Laser-etched ALKOTA wordmark",
      "Matte powder-coat finish (Black option)",
      "Stainless steel loop cap",
      "Wide mouth for ice",
      "Dishwasher safe",
    ],
    imagePlaceholder: "bottle",
  },
  {
    id: "ALK-MUG-001",
    slug: "workshop-mug",
    name: "Workshop Mug",
    subtitle: "Heavyweight ceramic — 350ml",
    category: "EQUIPMENT",
    price: 22,
    status: "coming_soon",
    variants: [
      { label: "COLOUR", options: ["Carbon Black", "Snow White"] },
    ],
    description:
      "A proper heavyweight mug. Made for long build sessions. ALKOTA wordmark and the Project 01 ref code printed in the engineering language of the programme.",
    details: [
      "350ml capacity",
      "Heavyweight vitrified ceramic",
      "Dishwasher and microwave safe",
      "ALKOTA wordmark print — side",
      "PROJECT / 01 reference code — base",
    ],
    imagePlaceholder: "mug",
  },
  {
    id: "ALK-DEC-001",
    slug: "alkota-decal-set",
    name: "Alkota Decal Set",
    subtitle: "Die-cut vinyl — 8 piece",
    category: "ACCESSORIES",
    price: 12,
    status: "coming_soon",
    variants: [
      { label: "FINISH", options: ["Gloss Black", "Matte White", "Clear / White"] },
    ],
    description:
      "Eight die-cut vinyl decals from the Alkota development programme. Wordmark, monogram, Project 01 reference and engineering system tags. Built for helmets, frames, tool-boxes and laptops.",
    details: [
      "8 decals per set",
      "Die-cut premium vinyl",
      "UV-resistant laminate",
      "ALKOTA wordmark × 2 (large + small)",
      "ALKOTA monogram × 1",
      "PROJECT / 01 reference tag × 2",
      "Engineering system labels × 3",
    ],
    imagePlaceholder: "decals",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export const categories = [...new Set(products.map((p) => p.category))];
