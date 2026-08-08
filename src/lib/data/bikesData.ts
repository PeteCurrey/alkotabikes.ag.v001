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
    { label: "DRIVETRAIN", value: "SRAM XX1 Eagle AXS / Hope EVO V6Ti Brakes" },
    { label: "WHEELSET", value: "Reserve 30|HD Carbon Rim on Hope Pro 4 Hubs" },
    { label: "COCKPIT", value: "Race Face ERA Carbon Bar 800mm & Turbine R Stem" },
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
