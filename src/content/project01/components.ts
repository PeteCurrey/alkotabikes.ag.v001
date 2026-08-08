/**
 * ALKOTA PROJECT 01 — COMPONENT CATALOGUE
 *
 * Source of truth for all components considered, planned, or baseline
 * for Project 01. This is a development catalogue — status reflects
 * engineering programme state, not a production specification.
 *
 * POLICY:
 * - Do NOT invent fictional component specifications
 * - Only reference real manufacturer products
 * - Asset paths must map to real images in /public/images/components/
 * - Status must reflect genuine development state
 * - priceDelta = null until pricing is formally confirmed
 */

export type ComponentStatus =
  | "BASELINE"      // Current development baseline — subject to validation
  | "UNDER_REVIEW"  // Being evaluated against alternatives
  | "OPTION"        // A selectable alternative within the build
  | "PLANNED"       // Intended for inclusion, not yet confirmed
  | "SUPERSEDED";   // Previously considered, now replaced

export type AssetStatus =
  | "AVAILABLE"     // Real official/licensed asset exists in project
  | "PENDING"       // Asset requested from manufacturer, not yet received
  | "UNAVAILABLE";  // No asset available — show placeholder

export interface TechnicalData {
  label: string;
  value: string;
  note?: string;
}

export interface Project01Component {
  id: string;
  category: ComponentCategory;
  manufacturer: string;
  product: string;
  variant: string;
  status: ComponentStatus;
  officialImage: string | null;        // path to real image in /public
  integrationImages: string[];         // additional context images
  description: string;                 // What this component is
  whySelected: string;                 // Why Project 01 uses this
  technicalData: TechnicalData[];      // Only real confirmed data
  compatibility: string[];             // Compatible chassis/system notes
  developmentNotes: string[];          // Engineering programme notes
  priceDelta: number | null;           // null = TBC; 0 = included in base
  available: boolean;
  sourceUrl: string | null;            // Manufacturer URL for reference
  assetStatus: AssetStatus;
  raceDevelopmentRelevant: boolean;    // Is this part of 2027 race programme intent?
  journalRef?: string;                 // Link to related journal entry slug
}

export type ComponentCategory =
  | "CHASSIS"
  | "FORK"
  | "REAR_SHOCK"
  | "BRAKES"
  | "WHEELS"
  | "TYRES"
  | "DRIVETRAIN"
  | "CRANKSET"
  | "COCKPIT"
  | "HANDLEBAR"
  | "STEM"
  | "GRIPS"
  | "DROPPER_POST"
  | "SADDLE"
  | "CONTACT_POINTS";

// ──────────────────────────────────────────────────────
// COMPONENT CATALOGUE
// ──────────────────────────────────────────────────────

export const PROJECT01_COMPONENTS: Project01Component[] = [

  // ── CHASSIS ──────────────────────────────────────────
  {
    id: "chassis-p01-carbon",
    category: "CHASSIS",
    manufacturer: "ALKOTA Performance Engineering",
    product: "Project 01",
    variant: "Full Carbon Development Chassis",
    status: "BASELINE",
    officialImage: "/images/story/workshop-chassis-assembly.png",
    integrationImages: [
      "/images/story/carbon-fiber-layup-development.png",
      "/images/story/chassis-engineering-review.png",
    ],
    description:
      "Full-carbon all-mountain chassis. Low-pivot four-bar / Horst-style rear suspension family. 160 mm front / 150 mm rear development targets.",
    whySelected:
      "Project 01 is designed from ride goals backwards. Full carbon was selected because the weight, stiffness-tuning flexibility, and structural optimisation potential are not achievable in aluminium at the performance targets Pete set. The architecture is guided by FEA simulation before any physical material is committed.",
    technicalData: [
      { label: "Front Travel Target", value: "160 mm", note: "Development target — subject to validation" },
      { label: "Rear Travel Target", value: "150 mm", note: "Development target — subject to validation" },
      { label: "Wheel Platform", value: "29 / 29 Primary", note: "MX under secondary study" },
      { label: "Suspension Architecture", value: "Low-pivot four-bar / Horst-style family", note: "Kinematic hard points under development" },
      { label: "Material Intent", value: "Full carbon, custom layup", note: "Provisional architecture" },
    ],
    compatibility: ["Project 01 R00"],
    developmentNotes: [
      "Current phase: engineering development. Physical prototype not yet built.",
      "Geometry is being solved Large-first. Full size run geometry will follow.",
      "Rear centre and head angle finalisation pending prototype feedback.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: null,
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
    journalRef: "001-the-design-brief",
  },

  // ── FORK ─────────────────────────────────────────────
  {
    id: "fork-fox38-factory",
    category: "FORK",
    manufacturer: "FOX",
    product: "38 Factory",
    variant: "160 mm · GRIP X2 Damper · Kashima Coat · 44 mm offset",
    status: "BASELINE",
    officialImage: "/images/components/fox-38-factory-dark.png",
    integrationImages: [
      "/images/components/fox-38-factory-alpine.png",
    ],
    description:
      "FOX 38 Factory 160 mm travel fork with GRIP X2 damper. Kashima coated stanchions. 44 mm offset. The current development baseline for Project 01 front suspension.",
    whySelected:
      "The FOX 38 is sized to match the 160 mm front travel target and the chassis stiffness profile Project 01 is engineered around. The GRIP X2 damper provides the adjustment range that allows the same fork to be set up for trail riding, alpine all-mountain, and competition use without swapping components.",
    technicalData: [
      { label: "Travel", value: "160 mm" },
      { label: "Damper", value: "GRIP X2" },
      { label: "Stanchion Coating", value: "Genuine Kashima Coat" },
      { label: "Offset", value: "44 mm" },
      { label: "Axle", value: "15 × 110 mm Boost" },
    ],
    compatibility: ["29 wheel · Boost spacing · Project 01 R00"],
    developmentNotes: [
      "Baseline specification for R00 engineering development.",
      "Offset selection is under review alongside head angle development.",
      "Factory kashima trim intended for launch specification.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.ridefox.com/fox17/products/bikes/forks/38.html",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── REAR SHOCK ────────────────────────────────────────
  {
    id: "shock-fox-floatx2-factory",
    category: "REAR_SHOCK",
    manufacturer: "FOX",
    product: "FLOAT X2 Factory",
    variant: "205 × 65 mm · Trunnion Mount · VVC · EVOL Air Sleeve",
    status: "BASELINE",
    officialImage: "/images/components/fox-float-x2-dark.png",
    integrationImages: [
      "/images/components/fox-float-x2-alpine.png",
    ],
    description:
      "FOX FLOAT X2 Factory rear shock. Trunnion mount. VVC (Variable Volume Chamber) rebound and compression. EVOL Air Sleeve. Current development baseline for Project 01 rear suspension.",
    whySelected:
      "The FLOAT X2 provides the adjustment bandwidth needed for the 150 mm rear travel target and the kinematics family Project 01 is being developed around. Trunnion mount reduces flex in the rear triangle linkage. VVC adjustability allows the shock curve to be matched to final kinematic tuning before production lock.",
    technicalData: [
      { label: "Size", value: "205 × 65 mm" },
      { label: "Mount", value: "Trunnion" },
      { label: "Air Sleeve", value: "EVOL" },
      { label: "Adjusters", value: "High and Low Speed Rebound + Compression" },
    ],
    compatibility: ["Project 01 R00 · Trunnion mount linkage"],
    developmentNotes: [
      "Shock sizing confirmed for 150 mm travel target at R00.",
      "VVC volume adjustment to be calibrated against final kinematics.",
      "Subject to validation once physical prototype is built.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.ridefox.com/fox17/products/bikes/shocks/float-x2.html",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── BRAKES (FRONT) ────────────────────────────────────
  {
    id: "brake-front-hope-evov6ti",
    category: "BRAKES",
    manufacturer: "Hope Technology",
    product: "EVO V6Ti",
    variant: "Front · 6-Piston · Titanium Hardware",
    status: "BASELINE",
    officialImage: "/images/components/hope-evo-v6ti-dark.png",
    integrationImages: [
      "/images/components/hope-evo-v6ti-alpine.png",
      "/images/components/hope-evo-v6ti-angle-dark.png",
    ],
    description:
      "Hope EVO V6Ti front brake. 6-piston titanium hardware. Hope's flagship downhill and enduro brake. UK-manufactured CNC precision.",
    whySelected:
      "Project 01 is designed for aggressive all-mountain terrain. The V6Ti provides the modulation and maximum power to match 160 mm of front travel and the brake force targets that came from reverse-engineering the ride. Hope is UK-based — Pete's choice reflects a deliberate alignment with premium British engineering.",
    technicalData: [
      { label: "Pistons", value: "6" },
      { label: "Hardware", value: "Titanium bolts" },
      { label: "Origin", value: "Skipton, UK — CNC machined" },
      { label: "Rotor compatibility", value: "180 – 220 mm" },
    ],
    compatibility: ["Project 01 R00 · Asymmetric brake specification"],
    developmentNotes: [
      "Front spec confirmed as EVO V6Ti for launch specification.",
      "Rotor size to be confirmed against final weight and braking targets.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.hopetech.com/products/components/brakes/",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── BRAKES (REAR) ─────────────────────────────────────
  {
    id: "brake-rear-hope-tr4",
    category: "BRAKES",
    manufacturer: "Hope Technology",
    product: "TR4",
    variant: "Rear · 4-Piston · CNC Silver",
    status: "BASELINE",
    officialImage: "/images/components/hope-tr4-silver-alpine.png",
    integrationImages: [],
    description:
      "Hope TR4 rear brake. 4-piston CNC aluminium. Asymmetric pairing with the EVO V6Ti front. UK-manufactured.",
    whySelected:
      "The asymmetric setup — 6-piston front, 4-piston rear — reflects the genuine difference in braking requirement front-to-rear on aggressive terrain. The rear carries less weight under braking and generates less heat. The TR4 provides enough power and modulation for the rear without the weight overhead of the V6Ti.",
    technicalData: [
      { label: "Pistons", value: "4" },
      { label: "Finish", value: "Silver CNC aluminium" },
      { label: "Origin", value: "Skipton, UK — CNC machined" },
    ],
    compatibility: ["Project 01 R00 · Asymmetric brake specification"],
    developmentNotes: [
      "Confirmed as rear brake for launch specification.",
      "Asymmetric front/rear strategy is intentional — see WHY THIS section.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.hopetech.com/products/components/brakes/",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── WHEELS ────────────────────────────────────────────
  {
    id: "wheels-dt-swiss-exc1200",
    category: "WHEELS",
    manufacturer: "DT Swiss",
    product: "EXC 1200",
    variant: "Carbon · 29 inch · Boost · Centre-Lock",
    status: "BASELINE",
    officialImage: "/images/components/dt-swiss-exc-1200-dark.png",
    integrationImages: [
      "/images/components/dt-swiss-exc-1200-alpine.png",
    ],
    description:
      "DT Swiss EXC 1200 carbon enduro wheels. 29 inch. Boost spacing. Centre-Lock disc interface. Current development baseline for Project 01 wheel platform.",
    whySelected:
      "The EXC 1200 represents the carbon wheel specification that matches Project 01's stiffness and weight targets. DT Swiss hub quality and the centre-lock interface aligns with the overall brake specification. Carbon rims allow rim profile optimisation for tubeless tyre geometry.",
    technicalData: [
      { label: "Rim Material", value: "Carbon" },
      { label: "Wheel Size", value: "29 inch" },
      { label: "Spacing", value: "Boost 15 × 110 / 12 × 148" },
      { label: "Disc Interface", value: "Centre-Lock" },
    ],
    compatibility: ["Project 01 R00 · 29/29 primary wheel platform"],
    developmentNotes: [
      "Wheel specification subject to final chassis interface confirmation.",
      "Inner rim width to be finalised alongside tyre selection.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.dtswiss.com",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── TYRES (FRONT) ──────────────────────────────────────
  {
    id: "tyre-front-maxxis-assegai",
    category: "TYRES",
    manufacturer: "Maxxis",
    product: "Assegai",
    variant: "Front · 29 × 2.5 · MaxTerra · Exo+ · Tubeless Ready",
    status: "BASELINE",
    officialImage: "/images/components/maxxis-assegai-dark.png",
    integrationImages: [
      "/images/components/maxxis-assegai-alpine.png",
    ],
    description:
      "Maxxis Assegai front tyre. 29 × 2.5 inch. MaxTerra compound. Exo+ carcass. Tubeless ready.",
    whySelected:
      "The Assegai is the current benchmark all-mountain front tyre for the terrain Project 01 is being designed around — predictable at high lean angles, good wet grip, and capable in loose and rocky conditions. The 2.5 width and MaxTerra compound are matched to the EXC 1200 rim profile.",
    technicalData: [
      { label: "Width", value: "2.5 inch" },
      { label: "Diameter", value: "29 inch" },
      { label: "Compound", value: "MaxTerra (dual compound)" },
      { label: "Carcass", value: "Exo+" },
      { label: "Tubeless", value: "Ready" },
    ],
    compatibility: ["DT Swiss EXC 1200 · 29 inch · Project 01 R00"],
    developmentNotes: [
      "Tyre selection will be confirmed against final rim width specification.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.maxxis.com",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── TYRES (REAR) ───────────────────────────────────────
  {
    id: "tyre-rear-maxxis-minionDHR",
    category: "TYRES",
    manufacturer: "Maxxis",
    product: "Minion DHR II",
    variant: "Rear · 29 × 2.4 · MaxTerra · Exo+ · Tubeless Ready · Tan Wall",
    status: "BASELINE",
    officialImage: "/images/components/maxxis-minion-dhr-dark.png",
    integrationImages: [
      "/images/components/maxxis-minion-dhr-alpine.png",
    ],
    description:
      "Maxxis Minion DHR II rear tyre. 29 × 2.4 inch. MaxTerra compound. Exo+ carcass. Tan wall treatment. Tubeless ready.",
    whySelected:
      "The Minion DHR II rear paired with the Assegai front is the established benchmark combination for the terrain Project 01 targets. The DHR II provides the fast-rolling rear characteristic that balances the heavier Assegai up front. Tan wall is the planned aesthetic treatment for Project 01.",
    technicalData: [
      { label: "Width", value: "2.4 inch" },
      { label: "Diameter", value: "29 inch" },
      { label: "Compound", value: "MaxTerra (dual compound)" },
      { label: "Carcass", value: "Exo+" },
      { label: "Tubeless", value: "Ready" },
      { label: "Sidewall", value: "Tan Wall" },
    ],
    compatibility: ["DT Swiss EXC 1200 · 29 inch · Project 01 R00"],
    developmentNotes: [
      "Tan wall treatment is planned for production aesthetic.",
      "Width and compound subject to validation on physical prototype.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.maxxis.com",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── DRIVETRAIN ────────────────────────────────────────
  {
    id: "drivetrain-sram-xx-eagle-axs",
    category: "DRIVETRAIN",
    manufacturer: "SRAM",
    product: "XX Eagle AXS Transmission",
    variant: "12-Speed · Wireless · Hangerless · Full Mount",
    status: "BASELINE",
    officialImage: "/images/components/sram-xx-eagle-axs-dark.png",
    integrationImages: [
      "/images/components/sram-xx-eagle-axs-alpine.png",
    ],
    description:
      "SRAM XX Eagle AXS Transmission. 12-speed wireless electronic shifting. Hangerless direct-mount derailleur. Full mount interface eliminates the derailleur hanger.",
    whySelected:
      "The hangerless transmission system is integral to the Project 01 chassis design. By eliminating the derailleur hanger, the rear dropout geometry can be optimised for stiffness and the drivetrain alignment is more precise. Wireless AXS removes cable routing complexity from a carbon frame that has been designed with clean internal routing in mind.",
    technicalData: [
      { label: "Speeds", value: "12" },
      { label: "Interface", value: "Hangerless — Full Mount" },
      { label: "Shifting", value: "Wireless AXS" },
      { label: "Battery", value: "Derailleur internal" },
    ],
    compatibility: ["Project 01 R00 · Full Mount rear dropout"],
    developmentNotes: [
      "Full Mount / hangerless interface is committed in chassis design.",
      "Cassette range to be confirmed against final geometry and terrain targets.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.sram.com/en/sram/mountain/series/xx-eagle",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: true,
  },

  // ── COCKPIT ───────────────────────────────────────────
  {
    id: "cockpit-renthal-fatbar-carbon",
    category: "HANDLEBAR",
    manufacturer: "Renthal",
    product: "Fatbar Carbon",
    variant: "35 mm · 800 mm width · Development Rise TBC",
    status: "BASELINE",
    officialImage: "/images/components/renthal-fatbar-dark.png",
    integrationImages: [
      "/images/components/renthal-fatbar-alpine.png",
    ],
    description:
      "Renthal Fatbar Carbon handlebar. 35 mm clamp diameter. 800 mm width as development baseline. Rise to be confirmed alongside final cockpit geometry.",
    whySelected:
      "The Renthal Fatbar Carbon is the current enduro and all-mountain benchmark bar. 35 mm clamp provides stiffness appropriate to the chassis geometry. Carbon construction reduces mass at a high-leverage point. Width and rise are planned to be dialled during physical prototype fit development.",
    technicalData: [
      { label: "Clamp Diameter", value: "35 mm" },
      { label: "Width", value: "800 mm (development baseline)" },
      { label: "Material", value: "Carbon fibre" },
      { label: "Rise", value: "TBC — pending cockpit geometry finalisation" },
    ],
    compatibility: ["35 mm stem clamp · Project 01 R00"],
    developmentNotes: [
      "Width and rise subject to fit development with physical prototype.",
      "35 mm standard confirmed at chassis design stage.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.renthal.com",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: false,
  },

  // ── GRIPS ─────────────────────────────────────────────
  {
    id: "grips-ergon-ge1-evo",
    category: "GRIPS",
    manufacturer: "Ergon",
    product: "GE1 Evo",
    variant: "Enduro · Small or Large",
    status: "PLANNED",
    officialImage: "/images/components/ergon-ge1-evo-dark.png",
    integrationImages: [
      "/images/components/ergon-ge1-evo-alpine.png",
    ],
    description:
      "Ergon GE1 Evo enduro grip. Ergonomic wing shape designed for one or two-finger braking position. Rubber compound selected for durability and feel.",
    whySelected:
      "Project 01 is built around contact-point engineering. Grip ergonomics affect wrist angle, finger position and upper body fatigue. The GE1 Evo wing shape accommodates the one-finger braking style that matches Hope lever blade geometry.",
    technicalData: [
      { label: "Shape", value: "Ergonomic wing, single / double bar-end cap" },
      { label: "Sizes", value: "S / L" },
    ],
    compatibility: ["35 mm bar clamp area · Project 01 R00"],
    developmentNotes: [
      "Grip specification under review — alternative evaluated against final fit data.",
    ],
    priceDelta: 0,
    available: false,
    sourceUrl: "https://www.ergon-bike.com",
    assetStatus: "AVAILABLE",
    raceDevelopmentRelevant: false,
  },
];

// ──────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────

export function getComponentsByCategory(
  category: ComponentCategory
): Project01Component[] {
  return PROJECT01_COMPONENTS.filter((c) => c.category === category);
}

export function getComponentById(id: string): Project01Component | undefined {
  return PROJECT01_COMPONENTS.find((c) => c.id === id);
}

export function getBaselineComponents(): Project01Component[] {
  return PROJECT01_COMPONENTS.filter((c) => c.status === "BASELINE");
}

// Category display metadata
export const CATEGORY_META: Record<
  ComponentCategory,
  { label: string; systemNumber: number; systemLabel: string }
> = {
  CHASSIS:       { label: "Frame / Chassis",     systemNumber: 1,  systemLabel: "01 FRAME" },
  FORK:          { label: "Front Suspension",     systemNumber: 2,  systemLabel: "02 FORK" },
  REAR_SHOCK:    { label: "Rear Suspension",      systemNumber: 3,  systemLabel: "03 REAR SUSPENSION" },
  BRAKES:        { label: "Brakes",               systemNumber: 4,  systemLabel: "04 BRAKES" },
  WHEELS:        { label: "Wheels",               systemNumber: 5,  systemLabel: "05 WHEELS" },
  TYRES:         { label: "Tyres",                systemNumber: 6,  systemLabel: "06 TYRES" },
  DRIVETRAIN:    { label: "Drivetrain",            systemNumber: 7,  systemLabel: "07 DRIVETRAIN" },
  CRANKSET:      { label: "Crankset",             systemNumber: 8,  systemLabel: "08 CRANKSET" },
  COCKPIT:       { label: "Cockpit",              systemNumber: 9,  systemLabel: "09 COCKPIT" },
  HANDLEBAR:     { label: "Handlebar",            systemNumber: 10, systemLabel: "10 HANDLEBAR" },
  STEM:          { label: "Stem",                 systemNumber: 11, systemLabel: "11 STEM" },
  GRIPS:         { label: "Grips",                systemNumber: 12, systemLabel: "12 GRIPS" },
  DROPPER_POST:  { label: "Dropper Post",         systemNumber: 13, systemLabel: "13 DROPPER POST" },
  SADDLE:        { label: "Saddle",               systemNumber: 14, systemLabel: "14 SADDLE" },
  CONTACT_POINTS:{ label: "Contact Points",       systemNumber: 15, systemLabel: "15 CONTACT POINTS" },
};
