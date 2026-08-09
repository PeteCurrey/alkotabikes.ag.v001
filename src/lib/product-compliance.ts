/**
 * ALKOTA CYCLES — PRODUCT COMPLIANCE REGISTRY
 * lib/product-compliance.ts
 *
 * Records per-region applicable product safety standards and their current
 * verification status.
 *
 * ⚠️  PHYSICAL PRODUCT IMPLICATION — US MARKET
 * ─────────────────────────────────────────────
 * CPSC 16 CFR Part 1512 (Requirements for Bicycles) mandates physical product
 * requirements that EN ISO 4210 does NOT share, including:
 *
 *   • A full CPSC-specified reflector set FITTED AS SOLD (front, rear, pedal,
 *     and side reflectors). This is not a documentation requirement — the
 *     physical product must ship with reflectors attached.
 *   • Specific braking performance requirements (stopping distance from 15 mph
 *     on a wet surface) that differ from EN ISO 4210 test protocols.
 *   • Protrusion requirements limiting sharp or projecting parts.
 *   • Handlebar, stem, and seat tube extension limits.
 *
 * These are ENGINEERING AND SUPPLY CHAIN requirements, not content requirements.
 * They must be addressed in the Project 01 physical product specification before
 * any US market product ships. FLAGGED FOR ENGINEERING REVIEW.
 *
 * This module does NOT assert compliance with any standard. It records which
 * standard applies per region and that validation is part of the development
 * programme.
 *
 * STATUS DEFINITIONS
 * ──────────────────
 * UNVERIFIED  — standard identified; compliance testing not yet conducted
 * IN_PROGRESS — testing or certification process has commenced
 * VERIFIED    — third-party tested and documented
 * NOT_REQUIRED — standard does not apply to this product/region combination
 */

import type { RegionCode } from "./regions";

export type ComplianceStatus =
  | "UNVERIFIED"
  | "IN_PROGRESS"
  | "VERIFIED"
  | "NOT_REQUIRED";

export interface ComplianceStandard {
  /** Short identifier */
  id: string;
  /** Full standard name and citation */
  name: string;
  /** Issuing body */
  issuingBody: string;
  /** Scope description */
  scope: string;
  /** Current verification status */
  status: ComplianceStatus;
  /** Date status was last assessed */
  lastAssessed: string;
  /** Any notes relevant to the development programme */
  developmentNotes: string;
  /** Physical product implications that affect engineering/supply chain */
  physicalProductImplications?: string[];
}

export interface RegionalCompliance {
  region: RegionCode;
  primaryStandard: ComplianceStandard;
  additionalStandards: ComplianceStandard[];
  /** Internal notes for engineering — never rendered on the website */
  engineeringNotes: string;
  /** Date of this regional compliance assessment */
  assessedDate: string;
}

export const PRODUCT_COMPLIANCE: Record<RegionCode, RegionalCompliance> = {
  uk: {
    region: "uk",
    primaryStandard: {
      id: "EN_ISO_4210",
      name: "EN ISO 4210 — Cycles — Safety requirements for bicycles",
      issuingBody: "British Standards Institution (BSI) / ISO",
      scope:
        "Mechanical and structural safety, braking, steering, lighting equipment requirements for bicycles. The standard is multi-part; off-road bicycle series are governed by EN ISO 4210-6.",
      status: "UNVERIFIED",
      lastAssessed: "2026-08-01",
      developmentNotes:
        "Compliance validation is part of the Project 01 development programme. Third-party testing is planned prior to any production release. No compliance claim is made at this stage.",
    },
    additionalStandards: [
      {
        id: "UK_SUPPLY_OF_GOODS",
        name: "Consumer Rights Act 2015 — satisfactory quality and fitness for purpose",
        issuingBody: "UK Parliament",
        scope:
          "Statutory implied terms applying to all goods sold to consumers in the United Kingdom.",
        status: "NOT_REQUIRED",
        lastAssessed: "2026-08-01",
        developmentNotes:
          "Statutory obligation — not a voluntary standard. Applies automatically to all consumer sales.",
      },
    ],
    engineeringNotes:
      "EN ISO 4210-6 covers mountain bicycles specifically. Full suspension testing and sub-frame assessment required. Recommend engaging a UKAS-accredited test house during prototype validation phase.",
    assessedDate: "2026-08-01",
  },

  us: {
    region: "us",
    primaryStandard: {
      id: "CPSC_16_CFR_1512",
      name: "CPSC 16 CFR Part 1512 — Requirements for Bicycles",
      issuingBody: "US Consumer Product Safety Commission (CPSC)",
      scope:
        "Federal mandatory safety requirements for bicycles sold in the United States, including braking, reflectors, protrusions, and structural requirements.",
      status: "UNVERIFIED",
      lastAssessed: "2026-08-01",
      developmentNotes:
        "Compliance validation is part of the Project 01 development programme. Testing is planned prior to any US market production release. No compliance claim is made at this stage.",
      physicalProductImplications: [
        "REFLECTOR SET — MANDATORY: 16 CFR 1512.16 requires a full reflector set FITTED AS SOLD. Required: one front reflector (white/clear), one rear reflector (red), pedal reflectors (amber/clear, both pedals), and side reflectors or reflective tyres (amber front sector, red rear sector). These must be physically attached to the production bicycle, not supplied separately.",
        "BRAKING PERFORMANCE — 16 CFR 1512.5: front and rear brakes required (with exceptions for fixed-gear). Stopping distance from 15 mph on wet surface: ≤15 feet. Test protocol differs from EN ISO 4210. Both braking systems must be independently evaluated to CPSC test conditions.",
        "PROTRUSION LIMITS — 16 CFR 1512.4: limits on projecting or sharp parts that could cause injury. Component selection and cable routing must be reviewed against these requirements.",
        "HANDLEBAR HEIGHT AND STEM EXTENSION — 16 CFR 1512.6: minimum insertion-depth marks on handlebar stems and seat posts. Engineering must incorporate these into the design.",
        "GENERAL OBLIGATION — As a consumer product, Project 01 is subject to mandatory CPSC reporting under section 15(b) of the Consumer Product Safety Act. Import and distribution must be coordinated with a CPSC-registered importer or fulfilled by a US-based entity.",
      ],
    },
    additionalStandards: [
      {
        id: "ASTM_F2043",
        name: "ASTM F2043 — Standard Classification for Bicycle Usage",
        issuingBody: "ASTM International",
        scope:
          "Classification of bicycle categories and recommended usage conditions. Informs warranty and safety labelling.",
        status: "UNVERIFIED",
        lastAssessed: "2026-08-01",
        developmentNotes:
          "Relevant to determining the appropriate usage category designation for Project 01.",
      },
      {
        id: "CPSA_15B",
        name: "Consumer Product Safety Act §15(b) — Substantial Product Hazard Reporting",
        issuingBody: "US Consumer Product Safety Commission (CPSC)",
        scope:
          "Mandatory reporting obligation if a product defect creates a substantial risk of injury to the public.",
        status: "NOT_REQUIRED",
        lastAssessed: "2026-08-01",
        developmentNotes:
          "Statutory obligation — applies automatically upon US product sales. Procedures to be established before US launch.",
      },
    ],
    engineeringNotes:
      "⚠️ PRIORITY FLAG: CPSC 16 CFR 1512 compliance has physical product implications. The reflector set, braking performance, and protrusion requirements must be addressed in the Project 01 physical product specification — these cannot be resolved in software. Recommend engaging a CPSC-accredited laboratory (e.g., Intertek, SGS, UL) for pre-production testing. Import classification under HTS 8712.00 should be confirmed with customs counsel given potential Section 301 duties on bicycles of Chinese origin.",
    assessedDate: "2026-08-01",
  },
};

/**
 * Get compliance record for a region.
 */
export function getRegionalCompliance(region: RegionCode): RegionalCompliance {
  return PRODUCT_COMPLIANCE[region];
}

/**
 * Returns all physical product implications for a region, or empty array.
 */
export function getPhysicalProductImplications(region: RegionCode): string[] {
  return (
    PRODUCT_COMPLIANCE[region].primaryStandard.physicalProductImplications ?? []
  );
}

/**
 * Returns true if the primary standard for a region is verified.
 */
export function isPrimaryComplianceVerified(region: RegionCode): boolean {
  return PRODUCT_COMPLIANCE[region].primaryStandard.status === "VERIFIED";
}
