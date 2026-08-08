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
}

export const ARTICLES: Article[] = [
  {
    slug: "project-01-the-brief",
    title: "PROJECT 01: THE BRIEF",
    category: "CHASSIS DEVELOPMENT",
    date: "DEVELOPMENT DISPATCH / 001",
    readTime: "4 MIN READ",
    excerpt: "Why we started with one single flagship platform rather than a full product range, and what we demanded from its geometry.",
    author: "ENGINEERING TEAM",
    status: "PUBLISHED",
    content: [
      "When we initiated ALKOTA Performance Engineering, the standard industry model suggested launching five distinct frame models across different travel brackets. We rejected that premise.",
      "The brief for Project 01 was straightforward yet uncompromising: build one chassis capable of conquering steep alpine descents without penalizing the rider on technical multi-hour climbs.",
      "By focusing our complete finite element modeling, kinematic optimization, and prototype iteration onto a single platform, every carbon weave layer and CNC link detail receives maximum scrutiny.",
    ],
  },
  {
    slug: "why-kinematics-matter",
    title: "WHY KINEMATICS MATTER",
    category: "SUSPENSION PHYSICS",
    date: "DEVELOPMENT DISPATCH / 002",
    readTime: "6 MIN READ",
    excerpt: "Deconstructing leverage curves, anti-squat percentages, and why pedal kickback is often misunderstood by mountain bikers.",
    author: "KINEMATICS LAB",
    status: "PUBLISHED",
    content: [
      "A suspension link is not just a lever that squashes an air shock; it is a dynamic mathematical force converter that governs tire traction, chassis attitude, and energy transfer.",
      "Anti-squat dictates how pedaling forces counteract rider mass transfer during acceleration. Too much anti-squat creates unwanted pedal kickback over high-speed chatter; too little wastes rider energy in chassis bobbing.",
      "In Project 01, we tuned a flat anti-squat curve around the 30% sag point, transitioning into neutral anti-rise under heavy rear braking.",
    ],
  },
  {
    slug: "designing-for-serviceability",
    title: "DESIGNING FOR SERVICEABILITY",
    category: "CHASSIS ENGINEERING",
    date: "DEVELOPMENT DISPATCH / 003",
    readTime: "5 MIN READ",
    excerpt: "Why mechanics hate modern internal cable routing, and how we solved clean cable packaging without needing headset entry ports.",
    author: "HARDWARE DEPT",
    status: "PUBLISHED",
    content: [
      "Bicycles exist to be ridden on harsh, wet, gritty terrain. When hardware requires three hours of workshop teardown just to replace a headset bearing or brake hose, engineering has failed.",
      "We spent months designing guided internal carbon tubes molded directly into the frame interior, ensuring cables pop out precisely at their target ports with zero noise, rattle, or fluid disconnection required.",
    ],
  },
  {
    slug: "from-cad-to-carbon",
    title: "FROM CAD TO CARBON",
    category: "MATERIALS & MANUFACTURING",
    date: "DEVELOPMENT DISPATCH / 004",
    readTime: "7 MIN READ",
    excerpt: "Inside the composite layup process. How fiber orientation dictates torsional stiffness and impact damping in high-modulus frames.",
    author: "COMPOSITES LAB",
    status: "PUBLISHED",
    content: [
      "Carbon fiber is anisotropic: its mechanical strength exists along the axis of the fibers. This means the layup schedule is where true frame performance is born.",
      "By placing 0-degree unidirectional plies along the downtube for longitudinal stiffness and 45-degree cross-plies around the bottom bracket for torsional rigidity, Project 01 achieves instant acceleration while absorbing high-frequency trail vibrations.",
    ],
  },
  {
    slug: "the-value-of-a-boring-bearing",
    title: "THE VALUE OF A BORING BEARING",
    category: "HARDWARE PHILOSOPHY",
    date: "DEVELOPMENT DISPATCH / 005",
    readTime: "4 MIN READ",
    excerpt: "Exotic custom pivot hardware looks cool in photos. Standardized Enduro MAX bearings last 10x longer on real mountain trails.",
    author: "WORKSHOP LAB",
    status: "PUBLISHED",
    content: [
      "Proprietary, non-standard pivot bearings are a plague in high-end cycling. When a bearing fails mid-trip in the Alps, finding a replacement shouldn't require a 3-week factory backorder.",
      "We deliberately engineered Project 01 pivot locations around standardized double-sealed Enduro MAX full-complement bearings that are globally available and built specifically for high static loads.",
    ],
  },
];
