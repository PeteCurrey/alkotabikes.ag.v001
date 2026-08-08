import { BikeConfiguration, ComponentOption } from "./types";

export const FORK_OPTIONS: ComponentOption[] = [
  {
    id: "fork-factory-38",
    name: "GRIP2 Factory 160mm",
    manufacturer: "DEVELOPMENT SPEC",
    model: "38 Factory Kashima",
    description: "High/low speed compression and rebound adjustment for aggressive enduro charging.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "fork-ultimate-zeb",
    name: "Charger 3.1 Ultimate 160mm",
    manufacturer: "DEVELOPMENT SPEC",
    model: "ZEB Ultimate Heavy Air",
    description: "ButterCup vibration damping with independent high/low compression valves.",
    priceDelta: 0,
    weightDelta: 40,
  },
];

export const SHOCK_OPTIONS: ComponentOption[] = [
  {
    id: "shock-float-x2",
    name: "Float X2 Factory Air",
    manufacturer: "DEVELOPMENT SPEC",
    model: "X2 205x65 Trunnion",
    description: "High-volume air sleeve tuned specifically to ALKOTA's 28.4% progressive linkage curve.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "shock-dhx2-coil",
    name: "DHX2 Factory Coil",
    manufacturer: "DEVELOPMENT SPEC",
    model: "DHX2 SLS Spring",
    description: "Maximum small-bump sensitivity and heat dissipation for relentless downhill laps.",
    priceDelta: 0,
    weightDelta: 380,
  },
];

export const DRIVETRAIN_OPTIONS: ComponentOption[] = [
  {
    id: "dt-wireless-t-type",
    name: "Direct-Mount T-Type Wireless",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Transmission 1x12",
    description: "Hangerless derailleur interface mounted directly to frame dropout for flawless shifting under load.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "dt-mechanical-12s",
    name: "Precision Mechanical 12-Speed",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Pro Mechanical 10-52T",
    description: "Tactile mechanical shift feel with stainless cables and oversized pulley wheels.",
    priceDelta: 0,
    weightDelta: -110,
  },
];

export const BRAKE_OPTIONS: ComponentOption[] = [
  {
    id: "brakes-4p-hydraulic",
    name: "4-Piston Hydraulic CNC",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Brake System 223/203mm Rotors",
    description: "Machined caliper body with mineral oil fluid and maximum thermal dissipation heat fins.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "brakes-heavy-duty",
    name: "Heavy-Duty Downhill 4-Piston",
    manufacturer: "DEVELOPMENT SPEC",
    model: "DH Spec 220mm Dual Rotors",
    description: "Thicker 2.3mm rotors and oversized pistons for absolute fade-free stopping power.",
    priceDelta: 0,
    weightDelta: 120,
  },
];

export const WHEELSET_OPTIONS: ComponentOption[] = [
  {
    id: "wheels-carbon-enduro",
    name: "Unidirectional Carbon Enduro",
    manufacturer: "DEVELOPMENT SPEC",
    model: "ALKOTA Carbon 30mm Hookless",
    description: "Engineered radial compliance rim profile absorbing square-edge hits without burping.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "wheels-alloy-dh",
    name: "Welded Alloy Heavy-Duty",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Pro Alloy 30mm Reinforced",
    description: "Impact-resistant alloy rims designed for maximum rim-strip strike protection.",
    priceDelta: 0,
    weightDelta: 210,
  },
];

export const TYRE_OPTIONS: ComponentOption[] = [
  {
    id: "tyre-gravity-soft",
    name: "Gravity Casing SuperSoft 2.5\"",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Front & Rear Aggressive",
    description: "Maximum cornering bite and puncture protection for sharp alpine granite.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "tyre-enduro-sticky",
    name: "Enduro Casing Sticky 2.4\"",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Fast Rolling Center Tread",
    description: "Slightly lighter carcass for improved climbing efficiency and rolling speed.",
    priceDelta: 0,
    weightDelta: -160,
  },
];

export const COCKPIT_OPTIONS: ComponentOption[] = [
  {
    id: "cockpit-carbon-35",
    name: "Carbon Bar (800mm) + 40mm CNC Stem",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Integrated Carbon 35mm Clamp",
    description: "Tuned carbon layup reducing arm pump while preserving precise steering feedback.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "cockpit-alloy-35",
    name: "Alloy Bar (800mm) + 35mm CNC Stem",
    manufacturer: "DEVELOPMENT SPEC",
    model: "AL7050 Stealth Anodized",
    description: "Indestructible aluminium cockpit setup with 25mm rise options.",
    priceDelta: 0,
    weightDelta: 85,
  },
];

export const DROPPER_OPTIONS: ComponentOption[] = [
  {
    id: "dropper-200mm",
    name: "200mm Infinite Adjustable Dropper",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Stealth Internal Route",
    description: "Ultra-low stack collar permitting complete seat post insertion into frame seat tube.",
    priceDelta: 0,
    weightDelta: 0,
  },
  {
    id: "dropper-175mm",
    name: "175mm Infinite Adjustable Dropper",
    manufacturer: "DEVELOPMENT SPEC",
    model: "Stealth Internal Route",
    description: "Optimized drop height for Medium size chassis or shorter inseam riders.",
    priceDelta: 0,
    weightDelta: -45,
  },
];

export const DEFAULT_CONFIG: BikeConfiguration = {
  platform: "PROJECT 01",
  frameSize: "L",
  wheelFormat: "MX-29-275",
  finish: "GRAPHITE",
  fork: FORK_OPTIONS[0],
  shock: SHOCK_OPTIONS[0],
  drivetrain: DRIVETRAIN_OPTIONS[0],
  brakes: BRAKE_OPTIONS[0],
  wheelset: WHEELSET_OPTIONS[0],
  frontTyre: TYRE_OPTIONS[0],
  rearTyre: TYRE_OPTIONS[0],
  cockpit: COCKPIT_OPTIONS[0],
  dropper: DROPPER_OPTIONS[0],
};
