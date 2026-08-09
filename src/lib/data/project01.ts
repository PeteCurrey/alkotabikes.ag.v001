/**
 * ALKOTA Performance Engineering — Canonical Project 01 Data Model
 * 
 * Single source of truth for the flagship Project 01 platform,
 * technical specifications, 16 component systems, manufacturer provenance,
 * development status tags, and hotspot coordinates.
 */

export type SystemCategory = 
  | "CHASSIS" 
  | "SUSPENSION" 
  | "BRAKES" 
  | "DRIVETRAIN" 
  | "WHEELS" 
  | "TYRES" 
  | "COCKPIT" 
  | "TOUCHPOINTS";

export type ComponentStatus = 
  | "selected" 
  | "development-target" 
  | "option" 
  | "pending-validation";

export interface ComponentSpecification {
  label: string;
  value: string;
  isVerified: boolean;
}

export interface ProjectComponent {
  id: string;
  slug: string;
  systemNumber: string; // e.g. "01", "02", ... "16"
  systemName: string;
  category: SystemCategory;
  brand: string;
  model: string;
  variant: string;
  status: ComponentStatus;
  summary: string;
  engineeringRationale: string;
  verifiedSpecifications: ComponentSpecification[];
  compatibilityNotes?: string;
  manufacturer: string;
  manufacturerSource: string;
  sourceLastVerified: string;
  darkImageKey: string;
  alpineImageKey: string;
  hotspotDesktop: { top: string; left: string };
  hotspotMobile: { top: string; left: string };
  displayOrder: number;
}

export interface FinishColorway {
  id: "GLACIER" | "CARBON";
  code: string;
  name: string;
  subtitle: string;
  description: string;
  imageKey: string;
  swatchHex: string;
  borderHex: string;
}

export const CANONICAL_FINISHES: FinishColorway[] = [
  {
    id: "GLACIER",
    code: "01",
    name: "GLACIER WHITE",
    subtitle: "Alpine Precision Finish",
    description:
      "Sculpted alpine white paint layout engineered to highlight carbon monocoque tube profiles and titanium hardware accents.",
    imageKey: "/images/project01-glacier-white.png",
    swatchHex: "#F4F6F7",
    borderHex: "#A8C6D8",
  },
  {
    id: "CARBON",
    code: "02",
    name: "NAKED CARBON",
    subtitle: "Raw Composite Structure",
    description:
      "Exposed 3K unidirectional carbon composite layup with a lightweight matte protective clear coat.",
    imageKey: "/images/project01-naked-carbon-hero.jpg",
    swatchHex: "#16191C",
    borderHex: "#3A4148",
  },
];

export const PROJECT_01_SYSTEMS: ProjectComponent[] = [
  {
    id: "chassis-monocoque",
    slug: "chassis-monocoque",
    systemNumber: "01",
    systemName: "FRAME / CHASSIS",
    category: "CHASSIS",
    brand: "ALKOTA",
    model: "PROJECT 01 MONOCOQUE",
    variant: "UD Carbon Monocoque",
    status: "selected",
    summary: "Full UD carbon fiber monocoque chassis engineered for high-speed alpine stability and lateral stiffness.",
    engineeringRationale:
      "A mountain bike frame must manage complex multi-axis torsional forces during heavy cornering and impact. Our monocoque front triangle optimizes fiber alignment along high-stress load paths while retaining compliance for traction.",
    verifiedSpecifications: [
      { label: "FRONT TRAVEL", value: "160mm", isVerified: false },
      { label: "REAR TRAVEL", value: "150mm", isVerified: false },
      { label: "MATERIAL", value: "High-Modulus Unidirectional Carbon Fiber", isVerified: true },
      { label: "BB INTERFACE", value: "73mm Threaded BSA", isVerified: true },
      { label: "REAR SPACING", value: "12x148mm Boost", isVerified: true },
      { label: "HEADSET INTERFACE", value: "Integrated ZS44 / ZS56", isVerified: true },
    ],
    manufacturer: "ALKOTA Performance Engineering",
    manufacturerSource: "https://alkota.com/engineering/project-01",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/project01-naked-carbon-hero.jpg",
    alpineImageKey: "/images/project01-glacier-white.png",
    hotspotDesktop: { top: "44.5%", left: "50.5%" },
    hotspotMobile: { top: "44.5%", left: "50.5%" },
    displayOrder: 1,
  },
  {
    id: "fox-38-factory",
    slug: "fox-38-factory",
    systemNumber: "02",
    systemName: "FRONT SUSPENSION",
    category: "SUSPENSION",
    brand: "FOX",
    model: "38 FACTORY",
    variant: "GRIP X2 / Kashima",
    status: "selected",
    summary: "The benchmark in long-travel single crown enduro forks, featuring 38mm stanchions and GRIP X2 damper.",
    engineeringRationale:
      "Front-end stiffness directly affects steering precision in high-speed rock sections. The FOX 38 chassis provides the torsional rigidity required to keep lines accurate under aggressive braking and cornering.",
    verifiedSpecifications: [
      { label: "TRAVEL", value: "160mm", isVerified: false },
      { label: "DAMPER", value: "GRIP X2 (High/Low Speed Compression & Rebound)", isVerified: true },
      { label: "STANCHIONS", value: "38mm Genuine Kashima Coat", isVerified: true },
      { label: "OFFSET", value: "44mm", isVerified: true },
      { label: "AXLE", value: "15x110mm Kabolt X Floating Axle", isVerified: true },
    ],
    manufacturer: "FOX Factory",
    manufacturerSource: "https://www.ridefox.com/family.php?m=bike&family=38",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/fox-38-factory-dark.png",
    alpineImageKey: "/images/components/fox-38-factory-alpine.png",
    hotspotDesktop: { top: "45.7%", left: "66.3%" },
    hotspotMobile: { top: "45.7%", left: "66.3%" },
    displayOrder: 2,
  },
  {
    id: "fox-float-x2",
    slug: "fox-float-x2",
    systemNumber: "03",
    systemName: "REAR SUSPENSION",
    category: "SUSPENSION",
    brand: "FOX",
    model: "FLOAT X2 FACTORY",
    variant: "Trunnion 205x65mm",
    status: "selected",
    summary: "Gravity-focused air shock delivering coil-like linear plushness with infinite air spring tunability.",
    engineeringRationale:
      "Positioned near-vertically immediately ahead of the seat tube, the Float X2 pairs with our progressive kinematics to absorb high-velocity impacts while resisting bottom-out.",
    verifiedSpecifications: [
      { label: "EYE-TO-EYE / STROKE", value: "205 x 65mm Trunnion Mount", isVerified: true },
      { label: "DAMPER", value: "VVC (Variable Valve Control) Rebound & Compression", isVerified: true },
      { label: "AIR SLEEVE", value: "EVOL High-Volume Air Sleeve", isVerified: true },
      { label: "LEVER", value: "2-Position Open/Firm Independent Circuit", isVerified: true },
    ],
    manufacturer: "FOX Factory",
    manufacturerSource: "https://www.ridefox.com/family.php?m=bike&family=floatx2",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/fox-float-x2-dark.png",
    alpineImageKey: "/images/components/fox-float-x2-alpine.png",
    hotspotDesktop: { top: "53.1%", left: "43.4%" },
    hotspotMobile: { top: "53.1%", left: "43.4%" },
    displayOrder: 3,
  },
  {
    id: "hope-evo-v6ti",
    slug: "hope-evo-v6ti",
    systemNumber: "04",
    systemName: "FRONT BRAKE",
    category: "BRAKES",
    brand: "HOPE TECHNOLOGY",
    model: "EVO V6Ti",
    variant: "6-Piston CNC Titanium / Black",
    status: "selected",
    summary: "CNC machined 6-piston monobloc front brake caliper with titanium pistons for ultimate stopping power.",
    engineeringRationale:
      "Front braking provides up to 70% of total stopping force during steep alpine descents. The 6-piston V6Ti caliper provides unmatched heat management and firm lever feel.",
    verifiedSpecifications: [
      { label: "CALIPER ARCHITECTURE", value: "CNC Machined 2014-T6 Billet Aluminum 6-Piston", isVerified: true },
      { label: "PISTONS", value: "Grade 5 Titanium Heat Insulated Pistons", isVerified: true },
      { label: "ROTOR COMPATIBILITY", value: "220mm / 203mm Floating Rotor", isVerified: true },
      { label: "MANUFACTURING LOCATION", value: "Barnoldswick, Lancashire, UK", isVerified: true },
    ],
    manufacturer: "Hope Technology",
    manufacturerSource: "https://www.hopetech.com/products/brakes/",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/hope-evo-v6ti-dark.png",
    alpineImageKey: "/images/components/hope-evo-v6ti-alpine.png",
    hotspotDesktop: { top: "64.8%", left: "68.4%" },
    hotspotMobile: { top: "64.8%", left: "68.4%" },
    displayOrder: 4,
  },
  {
    id: "hope-evo-tr4",
    slug: "hope-evo-tr4",
    systemNumber: "05",
    systemName: "REAR BRAKE",
    category: "BRAKES",
    brand: "HOPE TECHNOLOGY",
    model: "EVO TR4",
    variant: "4-Piston CNC Billet / Black",
    status: "selected",
    summary: "Precision 4-piston rear brake caliper delivering intuitive modulation without locking the rear wheel.",
    engineeringRationale:
      "Rear braking demands fine modulation rather than sheer brute force. Using the TR4 4-piston rear caliper paired with the V6Ti 6-piston front brake provides asymmetric braking balance tailored to rider weight shift.",
    verifiedSpecifications: [
      { label: "CALIPER ARCHITECTURE", value: "CNC Machined 4-Piston Monobloc", isVerified: true },
      { label: "ROTOR COMPATIBILITY", value: "203mm Floating Rotor", isVerified: true },
      { label: "FLUID", value: "DOT 5.1 High Temperature Fluid", isVerified: true },
    ],
    manufacturer: "Hope Technology",
    manufacturerSource: "https://www.hopetech.com/products/brakes/",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/hope-tr4-silver-alpine.png",
    alpineImageKey: "/images/components/hope-tr4-silver-alpine.png",
    hotspotDesktop: { top: "61.1%", left: "28.5%" },
    hotspotMobile: { top: "61.1%", left: "28.5%" },
    displayOrder: 5,
  },
  {
    id: "dt-swiss-exc-1200-front",
    slug: "dt-swiss-exc-1200-front",
    systemNumber: "06",
    systemName: "FRONT WHEEL",
    category: "WHEELS",
    brand: "DT SWISS",
    model: "EXC 1200 CLASSIC",
    variant: "29\" Carbon 30mm",
    status: "selected",
    summary: "Ultralight carbon gravity wheel built for precision line choice and impact absorption.",
    engineeringRationale:
      "Carbon rim profile tuned for radial compliance to dissipate trail chatter while preserving lateral stiffness for sharp cornering tracking.",
    verifiedSpecifications: [
      { label: "DIAMETER", value: "29\" (622mm)", isVerified: true },
      { label: "INNER RIM WIDTH", value: "30mm Tubeless Ready Carbon", isVerified: true },
      { label: "HUB", value: "DT Swiss 180 Straightpull / Ceramic Bearings", isVerified: true },
      { label: "SPOKES", value: "DT Revolite Aerodynamic Straightpull", isVerified: true },
    ],
    manufacturer: "DT Swiss",
    manufacturerSource: "https://www.dtswiss.com/en/wheels/wheels-mtb/enduro/exc-1200",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/dt-swiss-exc-1200-dark.png",
    alpineImageKey: "/images/components/dt-swiss-exc-1200-alpine.png",
    hotspotDesktop: { top: "82.1%", left: "68.4%" },
    hotspotMobile: { top: "82.1%", left: "68.4%" },
    displayOrder: 6,
  },
  {
    id: "dt-swiss-exc-1200-rear",
    slug: "dt-swiss-exc-1200-rear",
    systemNumber: "07",
    systemName: "REAR WHEEL",
    category: "WHEELS",
    brand: "DT SWISS",
    model: "EXC 1200 CLASSIC",
    variant: "29\" or 27.5\" MX Carbon",
    status: "selected",
    summary: "High-impact carbon rear wheel featuring Ratchet EXP hub mechanism for instant pedal engagement.",
    engineeringRationale:
      "Supports 29\" full-wheel or 27.5\" MX rear wheel setup via the frame's integrated geometry flip-chip.",
    verifiedSpecifications: [
      { label: "FORMAT", value: "29\" or 27.5\" MX Compatible", isVerified: true },
      { label: "FREEHUB", value: "Ratchet EXP 36T / SRAM XD Driver", isVerified: true },
      { label: "INNER RIM WIDTH", value: "30mm Carbon", isVerified: true },
    ],
    manufacturer: "DT Swiss",
    manufacturerSource: "https://www.dtswiss.com/en/wheels/wheels-mtb/enduro/exc-1200",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/dt-swiss-exc-1200-dark.png",
    alpineImageKey: "/images/components/dt-swiss-exc-1200-alpine.png",
    hotspotDesktop: { top: "82.1%", left: "28.5%" },
    hotspotMobile: { top: "82.1%", left: "28.5%" },
    displayOrder: 7,
  },
  {
    id: "maxxis-assegai-front",
    slug: "maxxis-assegai-front",
    systemNumber: "08",
    systemName: "FRONT TYRE",
    category: "TYRES",
    brand: "MAXXIS",
    model: "ASSEGAI",
    variant: "29x2.50\" WT 3C MaxxGrip EXO+ (Tan-Wall)",
    status: "selected",
    summary: "Greg Minnaar's signature tread pattern delivering maximum cornering traction across wet rock and loose alpine loam.",
    engineeringRationale:
      "Combined shoulder knobs create continuous grip at high lean angles. The distinctive Tan Wall construction provides sidewall damping and iconic visual identity.",
    verifiedSpecifications: [
      { label: "SIZE", value: "29 x 2.50\" Wide Trail (WT)", isVerified: true },
      { label: "COMPOUND", value: "3C MaxxGrip (Highest Traction Rubber)", isVerified: true },
      { label: "CASING", value: "EXO+ Puncture Protection / Tan Wall", isVerified: true },
      { label: "TPI", value: "60 TPI Tubeless Ready", isVerified: true },
    ],
    manufacturer: "Maxxis Tyres",
    manufacturerSource: "https://www.maxxis.com/us/tire/assegai/",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/maxxis-assegai-dark.png",
    alpineImageKey: "/images/components/maxxis-assegai-alpine.png",
    hotspotDesktop: { top: "45.7%", left: "70.5%" },
    hotspotMobile: { top: "45.7%", left: "70.5%" },
    displayOrder: 8,
  },
  {
    id: "maxxis-minion-dhr-rear",
    slug: "maxxis-minion-dhr-rear",
    systemNumber: "09",
    systemName: "REAR TYRE",
    category: "TYRES",
    brand: "MAXXIS",
    model: "MINION DHR II",
    variant: "29x2.40\" / 27.5x2.40\" WT 3C MaxxTerra EXO+ (Tan-Wall)",
    status: "selected",
    summary: "Paddle-shaped center tread knobs provide immense braking bite and acceleration drive.",
    engineeringRationale:
      "The benchmark rear tire for steep gravity riding. Ramped center knobs reduce rolling resistance while square braking edges dig into hardpack and loose soil.",
    verifiedSpecifications: [
      { label: "SIZE", value: "29 x 2.40\" / 27.5 x 2.40\" WT", isVerified: true },
      { label: "COMPOUND", value: "3C MaxxTerra (Balanced Grip & Durability)", isVerified: true },
      { label: "CASING", value: "EXO+ Tan-Wall Sidewall Architecture", isVerified: true },
    ],
    manufacturer: "Maxxis Tyres",
    manufacturerSource: "https://www.maxxis.com/us/tire/minion-dhr-ii/",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/maxxis-minion-dhr-dark.png",
    alpineImageKey: "/images/components/maxxis-minion-dhr-alpine.png",
    hotspotDesktop: { top: "47.5%", left: "26.4%" },
    hotspotMobile: { top: "47.5%", left: "26.4%" },
    displayOrder: 9,
  },
  {
    id: "sram-xx-eagle-derailleur",
    slug: "sram-xx-eagle-derailleur",
    systemNumber: "10",
    systemName: "DRIVETRAIN / DERAILLEUR",
    category: "DRIVETRAIN",
    brand: "SRAM",
    model: "XX EAGLE AXS TRANSMISSION",
    variant: "Full-Mount T-Type Wireless",
    status: "selected",
    summary: "Hangerless rear derailleur mounting directly to the frame's rear wheel axle spindle.",
    engineeringRationale:
      "Eliminating the traditional derailleur hanger creates an unbroken load path directly between the rear hub spindle and derailleur, delivering precise shifting under full 1000W sprint load.",
    verifiedSpecifications: [
      { label: "INTERFACE", value: "Full Mount Hangerless Interface", isVerified: true },
      { label: "WIRELESS PROTOCOL", value: "AXS Encryption Circuit", isVerified: true },
      { label: "CLUTCH", value: "Overload Clutch Impact Protection", isVerified: true },
      { label: "PULLEY WHEELS", value: "Magic Wheel Lower Pulley (Keeps Spinning if Debris Trapped)", isVerified: true },
    ],
    manufacturer: "SRAM",
    manufacturerSource: "https://www.sram.com/en/sram/models/rd-xx-e-b1",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/sram-xx-eagle-axs-dark.png",
    alpineImageKey: "/images/components/sram-xx-eagle-axs-alpine.png",
    hotspotDesktop: { top: "67.3%", left: "25.3%" },
    hotspotMobile: { top: "67.3%", left: "25.3%" },
    displayOrder: 10,
  },
  {
    id: "sram-xx-transmission-crank",
    slug: "sram-xx-transmission-crank",
    systemNumber: "11",
    systemName: "CRANK / TRANSMISSION",
    category: "DRIVETRAIN",
    brand: "SRAM",
    model: "XX EAGLE TRANSMISSION CRANKSET",
    variant: "Carbon Arm / DUB Spindle / 32T",
    status: "selected",
    summary: "Hollow-core carbon crankarm design paired with integrated bash guards and direct-mount chainring.",
    engineeringRationale:
      "Torsional crank rigidity transfers every watt of pedal force into rear wheel traction during steep technical climbs.",
    verifiedSpecifications: [
      { label: "CRANKARM MATERIAL", value: "Carbon Fiber with Foam Core", isVerified: true },
      { label: "CHAINRING", value: "32T Direct Mount T-Type Sync 2", isVerified: true },
      { label: "PROTECTION", value: "Dual Removable Composite Bashguards", isVerified: true },
    ],
    manufacturer: "SRAM",
    manufacturerSource: "https://www.sram.com/en/sram/mountain/series/eagle-transmission",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/sram-xx-eagle-axs-dark.png",
    alpineImageKey: "/images/components/sram-xx-eagle-axs-alpine.png",
    hotspotDesktop: { top: "66.7%", left: "42.0%" },
    hotspotMobile: { top: "66.7%", left: "42.0%" },
    displayOrder: 11,
  },
  {
    id: "fox-transfer-neo",
    slug: "fox-transfer-neo",
    systemNumber: "12",
    systemName: "DROPPER POST",
    category: "TOUCHPOINTS",
    brand: "FOX",
    model: "TRANSFER NEO FACTORY",
    variant: "Wireless / Kashima / 200mm",
    status: "selected",
    summary: "Ultra-fast wireless electronic dropper post engineered for instantaneous saddle height adjustment.",
    engineeringRationale:
      "Eliminates internal frame cable routing clutter while delivering 26ms actuation speed so riders can drop the saddle instantly before steep rock drop-ins.",
    verifiedSpecifications: [
      { label: "ACTUATION SPEED", value: "26ms Wireless Protocol", isVerified: true },
      { label: "TRAVEL OPTIONS", value: "150mm / 175mm / 200mm Travel", isVerified: true },
      { label: "STANCHION", value: "Genuine Kashima Coat", isVerified: true },
      { label: "BATTERY", value: "Rechargeable Lithium-Ion (30-40h Runtime)", isVerified: true },
    ],
    manufacturer: "FOX Factory",
    manufacturerSource: "https://www.ridefox.com/family.php?m=bike&family=transfer",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/fox-float-x2-dark.png",
    alpineImageKey: "/images/components/fox-float-x2-alpine.png",
    hotspotDesktop: { top: "34.6%", left: "38.9%" },
    hotspotMobile: { top: "34.6%", left: "38.9%" },
    displayOrder: 12,
  },
  {
    id: "ergon-sm-enduro-pro",
    slug: "ergon-sm-enduro-pro",
    systemNumber: "13",
    systemName: "SADDLE",
    category: "TOUCHPOINTS",
    brand: "ERGON",
    model: "SM ENDURO PRO TITANIUM TEAM",
    variant: "Solid Titanium Rails",
    status: "selected",
    summary: "Ergonomic gravity saddle designed for active leg clearance during technical descents and efficient climbing support.",
    engineeringRationale:
      "Flat rear profile with padded side flanks allowing seamless movement when maneuvering the bike beneath the rider in steep berms.",
    verifiedSpecifications: [
      { label: "RAILS", value: "Solid Titanium (TiNox)", isVerified: true },
      { label: "SHELL", value: "Carbon Neutral Composite Shell", isVerified: true },
      { label: "PADDING", value: "Orthopedic AirCell Foam with Anti-Friction Side Flanks", isVerified: true },
    ],
    manufacturer: "Ergon Bike",
    manufacturerSource: "https://www.ergonbike.com/en/product-sm-enduro.html",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/ergon-ge1-evo-dark.png",
    alpineImageKey: "/images/components/ergon-ge1-evo-alpine.png",
    hotspotDesktop: { top: "24.7%", left: "36.8%" },
    hotspotMobile: { top: "24.7%", left: "36.8%" },
    displayOrder: 13,
  },
  {
    id: "renthal-fatbar-carbon",
    slug: "renthal-fatbar-carbon",
    systemNumber: "14",
    systemName: "HANDLEBAR",
    category: "COCKPIT",
    brand: "RENTHAL",
    model: "FATBAR CARBON 35",
    variant: "800mm Width / 20mm Rise",
    status: "selected",
    summary: "UD carbon handlebar combining high impact strength with vibration absorption to reduce arm pump.",
    engineeringRationale:
      "Renthal's tuned carbon flex characteristic dampens high-frequency trail chatter without flexing under heavy G-force compression turns.",
    verifiedSpecifications: [
      { label: "WIDTH", value: "800mm (Trim Marks to 700mm)", isVerified: true },
      { label: "CLAMP DIAMETER", value: "35.0mm", isVerified: true },
      { label: "RISE", value: "20mm (7° Backsweep / 5° Upsweep)", isVerified: true },
      { label: "MATERIAL", value: "Unidirectional Carbon Composite", isVerified: true },
    ],
    manufacturer: "Renthal Cycling",
    manufacturerSource: "https://www.renthal.com/cycling/handlebars/fatbar-carbon",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/renthal-fatbar-dark.png",
    alpineImageKey: "/images/components/renthal-fatbar-alpine.png",
    hotspotDesktop: { top: "21.6%", left: "59.7%" },
    hotspotMobile: { top: "21.6%", left: "59.7%" },
    displayOrder: 14,
  },
  {
    id: "renthal-apex-stem",
    slug: "renthal-apex-stem",
    systemNumber: "15",
    systemName: "STEM",
    category: "COCKPIT",
    brand: "RENTHAL",
    model: "APEX 35 STEM",
    variant: "40mm Extension / CNC Billet",
    status: "selected",
    summary: "240-degree twin handlebar clamps CNC machined from 2014-T6 aircraft aluminum for maximum clamping rigidity.",
    engineeringRationale:
      "Unique 240-degree clamp structure allows material to be removed from the stem body while increasing handlebar clamping surface area.",
    verifiedSpecifications: [
      { label: "LENGTH", value: "40mm Extension", isVerified: true },
      { label: "CLAMP", value: "35.0mm / 240° Twin Clamps", isVerified: true },
      { label: "RISE", value: "0°", isVerified: true },
      { label: "MATERIAL", value: "CNC Machined 2014-T6 Aluminum", isVerified: true },
    ],
    manufacturer: "Renthal Cycling",
    manufacturerSource: "https://www.renthal.com/cycling/stems/apex-35",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/renthal-fatbar-dark.png",
    alpineImageKey: "/images/components/renthal-fatbar-alpine.png",
    hotspotDesktop: { top: "23.5%", left: "61.5%" },
    hotspotMobile: { top: "23.5%", left: "61.5%" },
    displayOrder: 15,
  },
  {
    id: "ergon-ge1-evo-grips",
    slug: "ergon-ge1-evo-grips",
    systemNumber: "16",
    systemName: "GRIPS",
    category: "TOUCHPOINTS",
    brand: "ERGON",
    model: "GE1 EVO FACTORY SLIM",
    variant: "Frozen Black / Oil Slick Clamp",
    status: "selected",
    summary: "Ergonomic gravity grips designed to support correct forearm position during high-speed technical descents.",
    engineeringRationale:
      "Tilted grip surface texture opposes arm rotation forces, reducing hand fatigue and thumb pump on long alpine descents.",
    verifiedSpecifications: [
      { label: "DIAMETER", value: "Slim Profile (30mm Outer Diameter)", isVerified: true },
      { label: "CLAMP", value: "Integrated Cold-Forged Aluminum Inner Clamp", isVerified: true },
      { label: "COMPOUND", value: "German Gravity Control Rubber Compound", isVerified: true },
    ],
    manufacturer: "Ergon Bike",
    manufacturerSource: "https://www.ergonbike.com/en/product-ge1.html",
    sourceLastVerified: "2026-08-08",
    darkImageKey: "/images/components/ergon-ge1-evo-dark.png",
    alpineImageKey: "/images/components/ergon-ge1-evo-alpine.png",
    hotspotDesktop: { top: "18.5%", left: "51.4%" },
    hotspotMobile: { top: "18.5%", left: "51.4%" },
    displayOrder: 16,
  },
];

export const FLAGSHIP_PROJECT_01 = {
  name: "PROJECT 01",
  descriptor: "ALL-MOUNTAIN / ENDURO CHASSIS",
  status: "DEVELOPMENT / REV 001",
  tagline: "ONE MACHINE. NO DISTRACTIONS.",
  overview:
    "ALKOTA begins with one flagship platform. One chassis developed to climb efficiently, descend with conviction and adapt to the way its rider chooses to build it.",
  philosophyHeadline: "DESIGN THE RIDE. THEN DESIGN THE BIKE.",
  philosophyBody:
    "A mountain bike is a system. Geometry affects weight distribution. Suspension affects traction. Frame stiffness affects feedback. Components affect control. The best result comes when those systems are developed together.",

  systems: PROJECT_01_SYSTEMS,

  geometryTable: [
    { parameter: "Reach", medium: "460", large: "485", extraLarge: "510", unit: "mm" },
    { parameter: "Stack", medium: "625", large: "635", extraLarge: "645", unit: "mm" },
    { parameter: "Head Tube Angle", medium: "63.8", large: "63.8", extraLarge: "63.8", unit: "deg" },
    { parameter: "Effective Seat Tube Angle", medium: "78.2", large: "78.2", extraLarge: "78.2", unit: "deg" },
    { parameter: "Chainstay Length (Short / Long)", medium: "438 / 444", large: "438 / 444", extraLarge: "444 / 450", unit: "mm" },
    { parameter: "Bottom Bracket Drop", medium: "30", large: "30", extraLarge: "30", unit: "mm" },
    { parameter: "Wheelbase", medium: "1245", large: "1275", extraLarge: "1308", unit: "mm" },
    { parameter: "Front Travel", medium: "170", large: "170", extraLarge: "170", unit: "mm" },
    { parameter: "Rear Travel", medium: "160", large: "160", extraLarge: "160", unit: "mm" },
  ],
};
