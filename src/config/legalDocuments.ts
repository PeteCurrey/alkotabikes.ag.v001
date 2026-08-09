/**
 * ALKOTA CYCLES — LEGAL DOCUMENT VERSION REGISTRY (MULTI-REGION)
 *
 * Controlled document registry per region. Each region has independent document metadata,
 * versioning, and approval status.
 *
 * ONLY APPROVED versions in a region allow commerce to be enabled in that region.
 */

import type { RegionCode } from "@/lib/regions";

export type LegalDocumentStatus = "DRAFT" | "LEGAL_REVIEW" | "APPROVED" | "SUPERSEDED";
export type MMWADesignation = "FULL" | "LIMITED";

export interface LegalDocumentMetadata {
  id: string;
  title: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  status: LegalDocumentStatus;
  approvedBy: string | null;
  approvedAt: string | null;
  route: string;
  description: string;
  /** Magnuson-Moss Warranty Act Designation (Required for US Warranty documents) */
  mmwaDesignation?: MMWADesignation;
}

export type RegionalLegalDocuments = Record<string, LegalDocumentMetadata>;

export const REGIONAL_LEGAL_DOCUMENTS: Record<RegionCode, RegionalLegalDocuments> = {
  uk: {
    terms: {
      id: "ALK-UK-TERMS-001",
      title: "Terms & Conditions of Sale (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/terms",
      description: "UK consumer terms governing purchases, statutory cancellation rights, and order fulfilment.",
    },
    legal: {
      id: "ALK-UK-NOTICE-001",
      title: "Legal Notice & Website Terms (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/legal",
      description: "UK operator particulars, site usage rules, and pre-production status context.",
    },
    warranty: {
      id: "ALK-UK-WARRANTY-001",
      title: "Alkota Limited Warranty Framework (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/warranty",
      description: "UK commercial warranty philosophy, exclusions, and Consumer Rights Act 2015 distinction.",
    },
    privacy: {
      id: "ALK-UK-PRIVACY-001",
      title: "Privacy Policy (UK & UK GDPR)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/privacy",
      description: "UK GDPR data processing transparency, lawful bases, retention, and ICO regulatory rights.",
    },
    reservations: {
      id: "ALK-UK-RES-001",
      title: "Project 01 Reservation Terms (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/legal/reservations",
      description: "UK pre-production reservation rights, deposit conditions, and Build Lock mechanics.",
    },
    returns: {
      id: "ALK-UK-RET-001",
      title: "Returns & Cancellation Policy (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/returns",
      description: "14-day statutory distance selling cancellation rights under Consumer Contracts Regulations 2013.",
    },
    shipping: {
      id: "ALK-UK-SHIP-001",
      title: "Shipping & Delivery Policy (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/shipping",
      description: "UK delivery, Partner handover, dispatch estimates, and VAT handling.",
    },
    safety: {
      id: "ALK-UK-SAFE-001",
      title: "Product Safety & Intended Use (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/safety",
      description: "EN ISO 4210 pre-ride protocols, intended use envelope, carbon inspection, and maintenance.",
    },
    cookies: {
      id: "ALK-UK-COOKIE-001",
      title: "Cookie Policy & Privacy Preferences (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/cookies",
      description: "PECR opt-in storage technology categories, consent rules, and technology register.",
    },
    accessibility: {
      id: "ALK-UK-A11Y-001",
      title: "Accessibility Statement (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/accessibility",
      description: "WCAG 2.2 AA design commitment, reduced motion support, keyboard navigation, and reporting.",
    },
    complaints: {
      id: "ALK-UK-COMP-001",
      title: "Complaints Procedure (UK)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/complaints",
      description: "UK rider complaint submission, internal escalation, resolution timeline, and ADR options.",
    },
  },

  us: {
    terms: {
      id: "ALK-US-TERMS-001",
      title: "Terms & Conditions of Sale (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/terms",
      description: "US consumer sales terms, contractual return policies, state law provisions, and optional arbitration clause.",
    },
    legal: {
      id: "ALK-US-NOTICE-001",
      title: "Legal Notice & Website Terms (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/legal",
      description: "US operator identity, site usage rules, IP protection, and pre-production status context.",
    },
    warranty: {
      id: "ALK-US-WARRANTY-001",
      title: "Alkota Limited Warranty Framework (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/warranty",
      description: "Magnuson-Moss Warranty Act compliant LIMITED warranty designation, pre-sale availability, and claim procedures.",
      mmwaDesignation: "LIMITED",
    },
    privacy: {
      id: "ALK-US-PRIVACY-001",
      title: "US Privacy Notice & State Rights",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/privacy",
      description: "US multi-state privacy notice covering CCPA/CPRA rights, GPC signal support, and Do Not Sell/Share mechanisms.",
    },
    reservations: {
      id: "ALK-US-RES-001",
      title: "Project 01 Reservation Terms (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/legal/reservations",
      description: "US pre-production reservation rights, deposit conditions, and Build Lock mechanics.",
    },
    returns: {
      id: "ALK-US-RET-001",
      title: "Returns & Voluntary Refund Policy (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/returns",
      description: "Contractual voluntary return policy (no statutory 14-day cancellation right), return instructions, and refund conditions.",
    },
    shipping: {
      id: "ALK-US-SHIP-001",
      title: "Shipping & Delivery Policy (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/shipping",
      description: "US domestic fulfilment, carrier delivery times, state sales tax calculation, and cross-border customs disclosures.",
    },
    safety: {
      id: "ALK-US-SAFE-001",
      title: "Product Safety & CPSC Compliance (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/safety",
      description: "CPSC 16 CFR Part 1512 compliance overview, mandatory reflector set requirements, braking standards, and safety checks.",
    },
    cookies: {
      id: "ALK-US-COOKIE-001",
      title: "Cookie Notice & Opt-Out Preferences (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/cookies",
      description: "US cookie and tracking disclosure, opt-out mechanisms, and Global Privacy Control (GPC) signal integration.",
    },
    accessibility: {
      id: "ALK-US-A11Y-001",
      title: "Accessibility Statement (US — ADA / WCAG 2.2 AA)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/accessibility",
      description: "Americans with Disabilities Act (ADA) commitment and WCAG 2.2 AA conformance status.",
    },
    complaints: {
      id: "ALK-US-COMP-001",
      title: "Customer Resolution & Support Procedure (US)",
      version: "1.0.0-DRAFT",
      effectiveDate: "2026-08-09",
      lastUpdated: "2026-08-09",
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      route: "/complaints",
      description: "US customer issue resolution process, support escalation paths, and warranty dispute steps.",
    },
  },
};

/** Default export for UK document baseline (backwards compatibility) */
export const LEGAL_DOCUMENTS = REGIONAL_LEGAL_DOCUMENTS.uk;

/**
 * Get legal document metadata for a specific document key and region.
 */
export function getLegalDocument(
  docKey: string,
  region: RegionCode = "uk"
): LegalDocumentMetadata {
  const regDocs = REGIONAL_LEGAL_DOCUMENTS[region] ?? REGIONAL_LEGAL_DOCUMENTS.uk;
  const doc = regDocs[docKey] ?? REGIONAL_LEGAL_DOCUMENTS.uk[docKey];

  if (!doc) {
    throw new Error(`Unknown legal document key "${docKey}" for region "${region}"`);
  }

  // Magnuson-Moss Warranty Act verification for US Warranty document
  if (region === "us" && docKey === "warranty") {
    if (!doc.mmwaDesignation || !["FULL", "LIMITED"].includes(doc.mmwaDesignation)) {
      throw new Error(
        `US Warranty document (${doc.id}) MUST specify a valid mmwaDesignation ("FULL" or "LIMITED") under the Magnuson-Moss Warranty Act.`
      );
    }
  }

  return doc;
}

/**
 * Check if commerce is enabled in a given region.
 * Commerce requires ALL mandatory legal documents in that region to have status "APPROVED".
 */
export function isCommerceEnabled(region: RegionCode): boolean {
  const docs = REGIONAL_LEGAL_DOCUMENTS[region];
  if (!docs) return false;

  const mandatoryKeys = ["terms", "privacy", "warranty", "returns", "shipping"];
  return mandatoryKeys.every((key) => docs[key]?.status === "APPROVED");
}

export interface AcceptanceRecord {
  documentId: string;
  version: string;
  region: RegionCode;
  timestamp: string;
  customerId?: string;
  transactionRef?: string;
}

export function recordLegalDocumentAcceptance(
  docKey: string,
  region: RegionCode = "uk",
  customerId?: string,
  transactionRef?: string
): AcceptanceRecord {
  const doc = getLegalDocument(docKey, region);
  return {
    documentId: doc.id,
    version: doc.version,
    region,
    timestamp: new Date().toISOString(),
    customerId,
    transactionRef,
  };
}
