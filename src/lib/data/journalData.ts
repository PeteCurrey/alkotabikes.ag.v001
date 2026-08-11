export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  author: string;
  status: "PUBLISHED" | "EDITORIAL PLAN";
  image?: string;
  relatedSystemId?: string;
  primarySources?: { title: string; url: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "project-01-building-one-platform",
    title: "PROJECT 01: BUILDING ONE PLATFORM",
    category: "CHASSIS DEVELOPMENT",
    date: "DEVELOPMENT DISPATCH / 001",
    readTime: "4 MIN READ",
    excerpt: "Why we started with one single flagship platform rather than a full product range, and what we demanded from its geometry.",
    author: "ENGINEERING TEAM",
    status: "PUBLISHED",
    image: "/images/story/engineering-design-meeting.jpg",
    relatedSystemId: "chassis-monocoque",
    primarySources: [
      { title: "ALKOTA Project 01 Chassis Development", url: "https://alkota.com/engineering" }
    ],
    content: [
      "When we initiated ALKOTA Performance Engineering, the standard industry model suggested launching five distinct frame models across different travel brackets. We rejected that premise.",
      "The brief for Project 01 was straightforward yet uncompromising: build one chassis capable of conquering steep alpine descents without penalizing the rider on technical multi-hour climbs.",
      "By focusing our complete finite element modeling, kinematic optimization, and prototype iteration onto a single platform, every carbon weave layer and CNC link detail receives maximum scrutiny.",
    ],
  },
  {
    slug: "why-mixed-wheels",
    title: "WHY MIXED WHEELS: 29 FRONT / 27.5 REAR",
    category: "GEOMETRY & KINEMATICS",
    date: "DEVELOPMENT DISPATCH / 002",
    readTime: "5 MIN READ",
    excerpt: "Understanding the physics behind mixed-wheel (MX) setups: rollover momentum at the front versus chainstay agility and butt-clearance at the rear.",
    author: "KINEMATICS LAB",
    status: "PUBLISHED",
    image: "/images/story/haute-savoie-alpine-field-test.jpg",
    relatedSystemId: "dt-swiss-exc-1200-rear",
    primarySources: [
      { title: "DT Swiss EXC 1200 Technology", url: "https://www.dtswiss.com/en/wheels/wheels-mtb/enduro/exc-1200" }
    ],
    content: [
      "The 29er front wheel is non-negotiable for high-speed alpine stability: its larger attack angle rolls over square-edged rocks and roots with far less momentum loss.",
      "However, in steep alpine chutes and tight berm switchbacks, a 27.5\" rear wheel provides crucial butt-clearance for rider weight transfer and allows shorter chainstays for fast cornering turn-in.",
      "Project 01 features a modular dropout flip-chip architecture, enabling riders to switch seamlessly between full 29er and MX configurations without compromising bottom bracket height or head tube angle.",
    ],
  },
  {
    slug: "asymmetric-braking-front-vs-rear",
    title: "ASYMMETRIC BRAKING: HOPE V6Ti FRONT / TR4 REAR",
    category: "HARDWARE PHILOSOPHY",
    date: "DEVELOPMENT DISPATCH / 003",
    readTime: "6 MIN READ",
    excerpt: "Why matching front and rear brake calipers is a flaw in mountain bike engineering, and how asymmetric piston sizing optimizes weight shift dynamics.",
    author: "HARDWARE DEPT",
    status: "PUBLISHED",
    image: "/images/story/component-development-bench.jpg",
    relatedSystemId: "hope-evo-v6ti",
    primarySources: [
      { title: "Hope Technology Brake Engineering", url: "https://www.hopetech.com/products/brakes/" }
    ],
    content: [
      "Front-wheel braking demands are fundamentally different from rear-wheel braking demands. During hard deceleration on a steep gradient, weight transfers forward, providing up to 70% of total stopping traction to the front tire.",
      "To match this physical reality, Project 01 uses an asymmetric Hope brake specification: a 6-piston CNC machined Hope EVO V6Ti caliper with titanium pistons at the front for ultimate thermal dissipation, paired with a 4-piston Hope TR4 caliper at the rear for fine modulation.",
      "This intentional asymmetry prevents premature rear-wheel lockup while granting full deceleration authority to the rider's index finger.",
    ],
  },
  {
    slug: "why-fox-38-and-float-x2",
    title: "WHY FOX 38 + FLOAT X2 INTEGRATION",
    category: "SUSPENSION INTEGRATION",
    date: "DEVELOPMENT DISPATCH / 004",
    readTime: "5 MIN READ",
    excerpt: "Matching the stiffness of a 38mm stanchion fork with a high-volume trunnion air shock for consistent spring curves under heavy G-loads.",
    author: "SUSPENSION TEAM",
    status: "PUBLISHED",
    image: "/images/story/complete-machine-integration.jpg",
    relatedSystemId: "fox-38-factory",
    primarySources: [
      { title: "FOX Factory 38 Specification", url: "https://www.ridefox.com/family.php?m=bike&family=38" }
    ],
    content: [
      "Long-travel enduro chassis demand front-to-rear chassis balance. A stiff carbon front triangle paired with a flexing fork creates high-frequency binding in the stanchions during hard cornering.",
      "The 38mm chassis of the FOX 38 Factory fork provides the structural rigidity necessary to keep damper bushings operating smoothly under high flex loads.",
      "At the rear, the FOX Float X2 Factory trunnion shock features an EVOL air sleeve and VVC dampers, mirroring the linear air spring progression of the front fork.",
    ],
  },
  {
    slug: "selecting-the-wheel-system",
    title: "SELECTING THE WHEEL SYSTEM: DT SWISS EXC 1200",
    category: "WHEEL ARCHITECTURE",
    date: "DEVELOPMENT DISPATCH / 005",
    readTime: "5 MIN READ",
    excerpt: "Why ultra-stiff carbon rims cause fatigue, and how DT Swiss tuned radial compliance to absorb trail vibration while preserving cornering tracking.",
    author: "COMPOSITES LAB",
    status: "PUBLISHED",
    image: "/images/story/alpine-trail-testing-action.jpg",
    relatedSystemId: "dt-swiss-exc-1200-front",
    primarySources: [
      { title: "DT Swiss EXC 1200 Classic Carbon", url: "https://www.dtswiss.com/en/wheels/wheels-mtb/enduro/exc-1200" }
    ],
    content: [
      "Early carbon mountain bike wheels were engineered with extreme vertical stiffness, resulting in harsh ride characteristics and deflected lines over loose rock.",
      "DT Swiss EXC 1200 carbon rims utilize a lower-profile rim height that allows controlled radial compliance over trail square-edges while retaining high lateral stiffness for steering response.",
      "Paired with DT Swiss 180 straightpull hub bodies and Ratchet EXP 36T engagement, energy transfer is instantaneous upon pedaling out of corners.",
    ],
  },
  {
    slug: "designing-for-serviceability",
    title: "DESIGNING FOR SERVICEABILITY",
    category: "CHASSIS ENGINEERING",
    date: "DEVELOPMENT DISPATCH / 006",
    readTime: "5 MIN READ",
    excerpt: "Why mechanics hate modern internal cable routing, and how we solved clean cable packaging without needing headset entry ports.",
    author: "HARDWARE DEPT",
    status: "PUBLISHED",
    image: "/images/story/workshop-chassis-assembly.jpg",
    relatedSystemId: "chassis-monocoque",
    primarySources: [
      { title: "ALKOTA Project Workspace", url: "https://alkota.com/support/technical" }
    ],
    content: [
      "Bicycles exist to be ridden on harsh, wet, gritty terrain. When hardware requires three hours of workshop teardown just to replace a headset bearing or brake hose, engineering has failed.",
      "We spent months designing guided internal carbon tubes molded directly into the frame interior, ensuring cables pop out precisely at their target ports with zero noise, rattle, or fluid disconnection required.",
    ],
  },
];
