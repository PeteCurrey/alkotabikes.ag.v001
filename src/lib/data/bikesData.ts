import { PROJECT_01_SYSTEMS, FLAGSHIP_PROJECT_01, CANONICAL_FINISHES } from "./project01";

export interface Hotspot {
  id: string;
  title: string;
  category: "CHASSIS" | "KINEMATICS" | "GEOMETRY" | "MATERIAL" | "CONFIGURATION";
  top: string;
  left: string;
  description: string;
  specLabel: string;
  slug?: string;
}

export interface GeometryRow {
  parameter: string;
  medium: string;
  large: string;
  extraLarge: string;
  unit: string;
}

export const FINISH_COLORWAYS = CANONICAL_FINISHES;

export const FLAGSHIP_BIKE = {
  id: "project-01",
  name: FLAGSHIP_PROJECT_01.name,
  descriptor: FLAGSHIP_PROJECT_01.descriptor,
  status: FLAGSHIP_PROJECT_01.status,
  tagline: FLAGSHIP_PROJECT_01.tagline,
  overview: FLAGSHIP_PROJECT_01.overview,
  philosophyHeadline: FLAGSHIP_PROJECT_01.philosophyHeadline,
  philosophyBody: FLAGSHIP_PROJECT_01.philosophyBody,

  hotspots: PROJECT_01_SYSTEMS.slice(0, 8).map((sys) => ({
    id: sys.id,
    title: sys.model,
    category: (sys.category === "SUSPENSION" ? "KINEMATICS" : sys.category === "CHASSIS" ? "CHASSIS" : "GEOMETRY") as Hotspot["category"],
    top: sys.hotspotDesktop.top,
    left: sys.hotspotDesktop.left,
    description: sys.engineeringRationale,
    specLabel: sys.verifiedSpecifications[0]?.value || sys.variant,
    slug: sys.slug,
  })),

  specifications: PROJECT_01_SYSTEMS.slice(0, 10).map((sys) => ({
    label: sys.systemName,
    value: `${sys.brand} ${sys.model} (${sys.variant})`,
  })),

  geometryTable: FLAGSHIP_PROJECT_01.geometryTable,
};

export { PROJECT_01_SYSTEMS, FLAGSHIP_PROJECT_01, CANONICAL_FINISHES };
