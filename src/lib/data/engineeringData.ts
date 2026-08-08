export interface EngineeringPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  metrics: { label: string; value: string; statusTag?: string }[];
}

export const ENGINEERING_PILLARS: EngineeringPillar[] = [
  {
    id: "chassis",
    number: "01",
    title: "CHASSIS",
    subtitle: "Structure, stiffness, packaging and serviceability.",
    description:
      "A mountain bike frame must manage complex torsional and axial forces while isolating the rider from unwanted harshness. We map structural wall thickness specifically to load pathways.",
    route: "/engineering/chassis",
    metrics: [
      { label: "FRAME MATERIAL", value: "UD CARBON MONOCOQUE" },
      { label: "BB INTERFACE", value: "THREADED 73MM BSA" },
      { label: "PIVOT HARDWARE", value: "ENDURO MAX DUAL SEALED" },
    ],
  },
  {
    id: "kinematics",
    number: "02",
    title: "KINEMATICS",
    subtitle: "Suspension behaviour developed around the complete ride system.",
    description:
      "Suspension is not simply a travel number. It is the dynamic interaction between leverage ratios, pedal anti-squat, braking anti-rise, and rearward axle trajectory.",
    route: "/engineering/kinematics",
    metrics: [
      { label: "FRONT TRAVEL", value: "160 MM" },
      { label: "REAR TRAVEL", value: "150 MM" },
      { label: "KINEMATIC MODEL", value: "PROGRESSIVE LINKAGE (SIMULATION TARGET)" },
    ],
  },
  {
    id: "materials",
    number: "03",
    title: "MATERIALS",
    subtitle: "Carbon, metal and hardware selected according to function.",
    description:
      "We do not use carbon fiber for decorative vanity. Metal components are forged and 5-axis CNC machined where high thread shear strength or impact resistance is non-negotiable.",
    route: "/engineering/materials",
    metrics: [
      { label: "COMPOSITE LAYUP", value: "HIGH-MODULUS UD CARBON" },
      { label: "HARDWARE ALLOY", value: "AL7075-T6 CNC BILLET" },
      { label: "PIVOT HARDWARE", value: "GRADE 5 TITANIUM" },
    ],
  },
  {
    id: "testing",
    number: "04",
    title: "VALIDATION",
    subtitle: "Simulation is the beginning. Real terrain provides the answer.",
    description:
      "Finite Element Analysis (FEA) guides the design, but laboratory fatigue rigs and telemetry-instrumented mountain testing reveal the true physical behavior of the chassis.",
    route: "/engineering/testing",
    metrics: [
      { label: "LAB TEST PROGRAMME", value: "ISO+ FATIGUE PROGRAMME (PENDING PROTOCOL)" },
      { label: "FIELD TELEMETRY", value: "SENSOR INSTRUMENTATION (DEVELOPMENT TARGET)" },
      { label: "DEVELOPMENT STATUS", value: "REV 001 CHASSIS VALIDATION" },
    ],
  },
];

export const DEMO_KINEMATIC_DATA = {
  leverageRatio: [
    { travel: 0, ratio: 3.1 },
    { travel: 20, ratio: 2.95 },
    { travel: 40, ratio: 2.82 },
    { travel: 60, ratio: 2.7 },
    { travel: 80, ratio: 2.58 },
    { travel: 100, ratio: 2.48 },
    { travel: 120, ratio: 2.38 },
    { travel: 140, ratio: 2.29 },
    { travel: 160, ratio: 2.22 },
  ],
  antiSquat: [
    { travel: 0, antiSquat: 135 },
    { travel: 20, antiSquat: 124 },
    { travel: 40, antiSquat: 112 },
    { travel: 60, antiSquat: 101 },
    { travel: 80, antiSquat: 88 },
    { travel: 100, antiSquat: 74 },
    { travel: 120, antiSquat: 60 },
    { travel: 140, antiSquat: 46 },
    { travel: 160, antiSquat: 32 },
  ],
  axlePath: [
    { travel: 0, rearward: 0.0, vertical: 0 },
    { travel: 30, rearward: 4.8, vertical: 29.5 },
    { travel: 60, rearward: 7.2, vertical: 59.0 },
    { travel: 90, rearward: 5.1, vertical: 88.2 },
    { travel: 120, rearward: 1.2, vertical: 117.5 },
    { travel: 160, rearward: -4.5, vertical: 156.0 },
  ],
};

export const PROCESS_STAGES = [
  { step: "01", title: "QUESTION", desc: "Identify terrain demands and riding dynamics." },
  { step: "02", title: "MODEL", desc: "Perform kinematic and structural FEA simulations." },
  { step: "03", title: "DESIGN", desc: "Sculpt industrial geometry & hardware integration." },
  { step: "04", title: "PROTOTYPE", desc: "Lay up carbon molds & 5-axis CNC aluminium linkages." },
  { step: "05", title: "TEST", desc: "Rigorous ISO+ lab stress tests & sensor telemetry." },
  { step: "06", title: "REFINE", desc: "Iterate carbon layup schedule & link dimensions." },
  { step: "07", title: "VALIDATE", desc: "Field testing and iteration in real mountain terrain." },
  { step: "08", title: "APPROVE", desc: "Final production sign-off before manufacturing." },
];
