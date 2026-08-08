export interface Hotspot {
  id: string;
  title: string;
  category: "CHASSIS" | "KINEMATICS" | "GEOMETRY" | "MATERIAL" | "CONFIGURATION";
  top: string; // percentage e.g. "45%"
  left: string; // percentage e.g. "60%"
  description: string;
  specLabel: string;
}

export interface GeometryRow {
  parameter: string;
  medium: string;
  large: string;
  extraLarge: string;
  unit: string;
}

export interface FinishColorway {
  id: "GLACIER" | "CARBON";
  name: string;
  subtitle: string;
  description: string;
  imageKey: "project01WhiteHero" | "project01CarbonHero";
  swatchHex: string;
  borderHex: string;
}

export const FINISH_COLORWAYS: FinishColorway[] = [
  {
    id: "GLACIER",
    name: "GLACIER WHITE",
    subtitle: "Alpine Precision Finish",
    description:
      "A clean alpine white finish designed to emphasise the sculpted carbon chassis and technical detailing.",
    imageKey: "project01WhiteHero",
    swatchHex: "#F4F6F7",
    borderHex: "#A8C6D8",
  },
  {
    id: "CARBON",
    name: "NAKED CARBON",
    subtitle: "Raw Composite Structure",
    description:
      "Visible carbon structure with a restrained protective finish, exposing the material rather than hiding it.",
    imageKey: "project01CarbonHero",
    swatchHex: "#16191C",
    borderHex: "#3A4148",
  },
];

export const FLAGSHIP_BIKE = {
  id: "project-01",
  name: "PROJECT 01",
  descriptor: "ALL-MOUNTAIN / ENDURO CHASSIS",
  status: "DEVELOPMENT / REV 001",
  tagline: "ONE MACHINE. NO DISTRACTIONS.",
  overview:
    "ALKOTA begins with one flagship platform. One chassis developed to climb efficiently, descend with conviction and adapt to the way its rider chooses to build it.",
  philosophyHeadline: "DESIGN THE RIDE. THEN DESIGN THE BIKE.",
  philosophyBody:
    "A mountain bike is a system. Geometry affects weight distribution. Suspension affects traction. Frame stiffness affects feedback. Components affect control. The best result comes when those systems are developed together.",
  
  hotspots: [
    {
      id: "chassis-link",
      title: "STRUCTURAL LINKAGE",
      category: "KINEMATICS",
      top: "48%",
      left: "45%",
      description:
        "Low-center-of-mass progressive linkage engineered to isolate braking forces while maintaining neutral anti-squat under heavy pedaling.",
      specLabel: "PROGRESSION / 28%",
    },
    {
      id: "head-angle",
      title: "CHASSIS HEADTUBE",
      category: "GEOMETRY",
      top: "28%",
      left: "72%",
      description:
        "Precision machined headtube junction designed to balance high-speed stability on steep alpine terrain with instantaneous cornering turn-in.",
      specLabel: "ANGLE / 63.8°",
    },
    {
      id: "carbon-layup",
      title: "UD CARBON COMPOSITE",
      category: "MATERIAL",
      top: "40%",
      left: "56%",
      description:
        "Monocoque front triangle utilizes high-modulus unidirectional carbon layers mapped specifically to high-stress cornering and impact vectors.",
      specLabel: "COMPOSITE / UD CARBON",
    },
    {
      id: "bottom-bracket",
      title: "BB JUNCTION & PROTECTION",
      category: "CHASSIS",
      top: "65%",
      left: "48%",
      description:
        "Over-engineered bottom bracket shell integrating dual sealed cartridge bearings and co-molded impact guarding for high-velocity debris protection.",
      specLabel: "INTERFACE / THREADED BSA",
    },
    {
      id: "dropout-flip",
      title: "FLIP-CHIP GEOMETRY ADJUST",
      category: "CONFIGURATION",
      top: "54%",
      left: "22%",
      description:
        "Modular dropout architecture supporting full 29er or MX (29 front / 27.5 rear) wheel formats with instant chainstay length adjustment.",
      specLabel: "FORMAT / 29 OR MX",
    },
  ] as Hotspot[],

  specifications: [
    { label: "FRAME", value: "ALKOTA Project 01 UD Carbon Monocoque (170mm/160mm)" },
    { label: "FORK", value: "FOX 38 Factory GRIP2 170mm Kashima" },
    { label: "REAR SHOCK", value: "FOX Float X2 Factory 205x65mm Trunnion" },
    { label: "FRONT TYRE", value: "MAXXIS Assegai 29x2.5\" WT 3C MaxxGrip EXO+ (Tan-Wall)" },
    { label: "REAR TYRE", value: "MAXXIS Minion DHR II 29x2.4\" / 27.5x2.4\" WT EXO+ (Tan-Wall)" },
    { label: "BRAKES", value: "Hope EVO V6Ti Front (6-Piston) / TR4 Rear CNC Brakes" },
    { label: "DRIVETRAIN", value: "SRAM XX Eagle AXS 12-Speed Wireless Transmission" },
    { label: "WHEELSET", value: "DT Swiss EXC 1200 Carbon Wheelset (30mm Internal)" },
    { label: "COCKPIT", value: "Renthal Fatbar Carbon 800mm & Apex CNC Stem" },
    { label: "GRIPS", value: "Ergon GE1 Evo Ergonomic Gravity Grips" },
  ],

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
  ] as GeometryRow[],
};

export interface ComponentDetail {
  id: string;
  name: string;
  subtitle: string;
  category: "SUSPENSION" | "BRAKES" | "DRIVETRAIN" | "WHEELS" | "TYRES" | "COCKPIT" | "TOUCHPOINTS";
  specs: string;
  description: string;
  darkImageKey: string;
  alpineImageKey: string;
}

export const COMPONENT_EXCELLENCE: ComponentDetail[] = [
  {
    id: "fox-38-factory",
    name: "FOX 38 FACTORY",
    subtitle: "Front Suspension",
    category: "SUSPENSION",
    specs: "170mm Travel / GRIP2 Damper / Kashima Coat",
    description: "The benchmark in downhill performance. Unrivalled stiffness, sensitivity and high/low-speed compression adjustability for aggressive alpine terrain.",
    darkImageKey: "fox38Dark",
    alpineImageKey: "fox38Alpine",
  },
  {
    id: "fox-float-x2",
    name: "FOX FLOAT X2 FACTORY",
    subtitle: "Rear Shock",
    category: "SUSPENSION",
    specs: "205 x 65mm Trunnion / VVC Rebound / 2-Pos Lever",
    description: "Designed for the hardest hits. Smooth, supportive and fully tunable air spring curve matched to the Project 01 progressive linkage.",
    darkImageKey: "foxFloatX2Dark",
    alpineImageKey: "foxFloatX2Alpine",
  },
  {
    id: "sram-xx-eagle-axs",
    name: "SRAM XX EAGLE AXS",
    subtitle: "Transmission Drivetrain",
    category: "DRIVETRAIN",
    specs: "12-Speed Wireless / Hangerless Full Mount / T-Type",
    description: "Hangerless interface mounts directly to the frame spindle for unbreakable strength and crisp shifting under maximum torque.",
    darkImageKey: "sramXxEagleDark",
    alpineImageKey: "sramXxEagleAlpine",
  },
  {
    id: "hope-evo-v6ti",
    name: "HOPE EVO V6Ti / TR4",
    subtitle: "Hydraulic Disc Brakes",
    category: "BRAKES",
    specs: "Front: EVO V6Ti 6-Piston / Rear: TR4 CNC Machined",
    description: "CNC machined in Barnoldswick, UK from 2014 T6 aircraft aluminum. Delivers unmatched power, thermal stability, and modulation control.",
    darkImageKey: "hopeEvoDark",
    alpineImageKey: "hopeEvoAlpine",
  },
  {
    id: "dt-swiss-exc-1200",
    name: "DT SWISS EXC 1200",
    subtitle: "Carbon Wheelset",
    category: "WHEELS",
    specs: "UD Carbon Rim / 30mm Internal / Ratchet EXP Hubs",
    description: "Ultralight, high-impact carbon rim profile tuned for cornering compliance and high-speed dampening without sacrificing acceleration.",
    darkImageKey: "dtSwissExc1200Dark",
    alpineImageKey: "dtSwissExc1200Alpine",
  },
  {
    id: "maxxis-assegai-dhr",
    name: "MAXXIS ASSEGAI / MINION DHR II",
    subtitle: "Tan Wall Tyres",
    category: "TYRES",
    specs: "Front: Assegai 2.5\" WT 3C MaxxGrip / Rear: Minion DHR II 2.4\" WT",
    description: "Maxxis' premier all-mountain rubber compound with distinctive Tan Wall sidewalls, delivering confidence in wet rock and loose alpine loam.",
    darkImageKey: "maxxisAssegaiDark",
    alpineImageKey: "maxxisAssegaiAlpine",
  },
  {
    id: "renthal-fatbar-carbon",
    name: "RENTHAL FATBAR CARBON",
    subtitle: "Cockpit System",
    category: "COCKPIT",
    specs: "800mm Width / 35mm Clamp / Apex CNC Stem",
    description: "Optimized carbon layup balances vibration dampening with steering precision for reduced arm pump on long alpine descents.",
    darkImageKey: "renthalFatbarDark",
    alpineImageKey: "renthalFatbarAlpine",
  },
  {
    id: "ergon-ge1-evo",
    name: "ERGON GE1 EVO",
    subtitle: "Tactile Grips",
    category: "TOUCHPOINTS",
    specs: "Ergonomic Texture / Integrated Anodized Clamp",
    description: "Designed for aggressive gravity riders. Supports correct upper arm and forearm position for maximum control on technical trails.",
    darkImageKey: "ergonGe1Dark",
    alpineImageKey: "ergonGe1Alpine",
  },
];

