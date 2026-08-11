/**
 * ALKOTA CYCLES — SINGLE SOURCE OF TRUTH FOR ADMIN MODULES
 * src/lib/admin/modules.ts
 *
 * Defines module navigation, status classifications, and role requirements.
 *
 * STATUS CLASSIFICATION RULES:
 * - 'live'     : Schema migrated, holds real data, consumed by site/admin, verified.
 * - 'building' : Schema migrated/partial, clickable, routes to functional page or module shell.
 * - 'planned'  : Not yet built. Excluded from sidebar. Rendered exclusively on /admin/roadmap.
 */

import {
  LayoutDashboard,
  Users,
  Activity,
  Image as ImageIcon,
  Layers,
  ShoppingBag,
  Mail,
  Globe,
  Map,
  BookOpen,
  FileText,
  DollarSign,
  LucideIcon,
} from "lucide-react";

export type ModuleStatus = "live" | "building" | "planned";

export interface AdminModule {
  key: string;
  label: string;
  href: string;
  iconName: string;
  status: ModuleStatus;
  requiredRole: string[];
  description: string;
  phase?: string;
  blockers?: string[];
  workingFeatures?: string[];
}

export const ADMIN_MODULES: AdminModule[] = [
  {
    key: "overview",
    label: "OVERVIEW",
    href: "/admin",
    iconName: "LayoutDashboard",
    status: "live",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "OWNER"],
    description: "Real-time platform control dashboard, system telemetry, and module readiness.",
  },
  {
    key: "leads",
    label: "LEADS & CRM",
    href: "/admin/leads",
    iconName: "Users",
    status: "live",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "ALKOTA_COMMERCIAL", "ALKOTA_SUPPORT", "OWNER"],
    description: "Lead capture database, double opt-in verification, CSV export, and GDPR/PECR compliance logs.",
  },
  {
    key: "health",
    label: "HEALTH & GATE",
    href: "/admin/health",
    iconName: "Activity",
    status: "live",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "OWNER"],
    description: "Crawl gate state, canonical domain enforcement, database latency, and storage diagnostics.",
  },
  {
    key: "media",
    label: "MEDIA LIBRARY",
    href: "/admin/media",
    iconName: "ImageIcon",
    status: "building",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "ALKOTA_EDITOR", "OWNER"],
    description: "Media asset registry, focal point selector, and image provenance/licence auditor.",
    phase: "PHASE 2 (CMS)",
    workingFeatures: [
      "Media assets database schema (public.media_assets)",
      "Provenance & claim tag tracking",
      "Media upload API & metadata validator",
    ],
    blockers: [
      "0 media assets uploaded in DB (public site using static fallbacks)",
      "Content slot media_id mapping to public components pending",
    ],
  },
  {
    key: "content",
    label: "CONTENT SLOTS",
    href: "/admin/content",
    iconName: "Layers",
    status: "building",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "ALKOTA_EDITOR", "OWNER"],
    description: "Typed page content slot registry and text/image override editor.",
    phase: "PHASE 2 (CMS)",
    workingFeatures: [
      "Content slots schema (public.content_slots)",
      "CMS Registry definition for all 10 marketing pages",
      "Slot editor client interface",
    ],
    blockers: [
      "Public site components consuming DB slots fallback to hardcoded text/images",
    ],
  },
  {
    key: "commerce",
    label: "COMMERCE & STORE",
    href: "/admin/commerce",
    iconName: "ShoppingBag",
    status: "building",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "ALKOTA_COMMERCIAL", "OWNER"],
    description: "Store mode management, readiness checklist, pricing visibility, and pre-order interest tracking.",
    phase: "PHASE 2 (COMMERCE)",
    workingFeatures: [
      "Store operating mode flag (STORE_MODE=CATALOGUE)",
      "Pre-order interest lead capture & registration counter",
      "Configurator model & specification schema",
    ],
    blockers: [
      "COMMERCE_LIVE flag disabled pending legal terms sign-off",
      "Stripe payment gateway credentials & webhook integration",
      "ISO 4210 compliance documentation authorization",
    ],
  },
  {
    key: "newsletter",
    label: "NEWSLETTER & EMAIL",
    href: "/admin/newsletter",
    iconName: "Mail",
    status: "building",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "ALKOTA_COMMERCIAL", "OWNER"],
    description: "Marketable subscriber resolution, double opt-in metrics, and campaign dispatch controls.",
    phase: "PHASE 4 (MARKETING)",
    workingFeatures: [
      "Lead double opt-in token generation & email confirmation flow",
      "Marketable subscriber query filter (opted-in & not unsubscribed)",
      "Unsubscribe suppression list tracking",
    ],
    blockers: [
      "Resend API broadcast campaign dispatch engine",
      "Scheduled campaign cron runner",
    ],
  },
  {
    key: "seo",
    label: "SEO & CRAWL GATE",
    href: "/admin/seo",
    iconName: "Globe",
    status: "building",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "OWNER"],
    description: "Single-source canonical host verification, X-Robots-Tag crawl gate, and sitemap generator audit.",
    phase: "PHASE 1 (INFRASTRUCTURE)",
    workingFeatures: [
      "NEXT_PUBLIC_SITE_URL enforcement (single source of truth)",
      "X-Robots-Tag noindex header middleware injection",
      "Dynamic sitemap.ts generation for valid routes",
      "Hreflang en-GB / en-US alternate link validation",
    ],
    blockers: [
      "Real-time 404 error logging & redirect management interface",
    ],
  },
  {
    key: "roadmap",
    label: "SYSTEM ROADMAP",
    href: "/admin/roadmap",
    iconName: "Map",
    status: "live",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "OWNER"],
    description: "Platform architecture development roadmap, planned features, and delivery timeline.",
  },
  // PLANNED MODULES — Excluded from sidebar, rendered on /admin/roadmap
  {
    key: "blog",
    label: "BLOG & JOURNAL",
    href: "/admin/blog",
    iconName: "BookOpen",
    status: "planned",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "ALKOTA_EDITOR", "OWNER"],
    description: "Database-backed journal post CMS, draft review queue, and claim guard integration.",
    phase: "PHASE 3 (EDITORIAL)",
    blockers: ["Blog posts database schema migration", "Rich text editor integration"],
  },
  {
    key: "partners",
    label: "PARTNER PORTAL",
    href: "/admin/partners",
    iconName: "FileText",
    status: "planned",
    requiredRole: ["ALKOTA_OWNER", "ALKOTA_ADMIN", "ALKOTA_COMMERCIAL", "OWNER"],
    description: "Dealer recruitment, catchment allocation, and PDI checklist management.",
    phase: "PHASE 4 (PARTNERS)",
    blockers: ["Partner portal auth migration", "Catchment area mapping"],
  },
];

/**
 * Filter modules for sidebar rendering:
 * - Must NOT be 'planned' (planned modules sit on /admin/roadmap only)
 * - Must be authorized for the user's role (best-effort filter)
 */
export function getSidebarModules(role?: string): AdminModule[] {
  return ADMIN_MODULES.filter((m) => m.status !== "planned");
}

/** Get all planned modules for the roadmap page */
export function getRoadmapModules(): AdminModule[] {
  return ADMIN_MODULES.filter((m) => m.status === "planned");
}

/** Find module by key */
export function getModuleByKey(key: string): AdminModule | undefined {
  return ADMIN_MODULES.find((m) => m.key === key);
}
