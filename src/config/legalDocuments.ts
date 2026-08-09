/**
 * ALKOTA CYCLES — LEGAL DOCUMENT VERSION REGISTRY
 *
 * Every legal document on alkotacycles.com has a controlled document ID,
 * semantic version number, effective date, last updated date, status,
 * approvedBy, and approvedAt.
 *
 * Statuses:
 * - DRAFT
 * - LEGAL_REVIEW
 * - APPROVED
 * - SUPERSEDED
 *
 * ONLY APPROVED versions may be accepted in a live commercial transaction.
 * Historical versions are maintained for recordkeeping and internal Studio retrieval.
 */

export type LegalDocumentStatus = "DRAFT" | "LEGAL_REVIEW" | "APPROVED" | "SUPERSEDED";

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
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocumentMetadata> = {
  terms: {
    id: "ALK-DOC-TERMS-001",
    title: "Terms & Conditions of Sale",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/terms",
    description: "Consumer terms governing purchases, orders, and use of Alkota products.",
  },
  legal: {
    id: "ALK-DOC-NOTICE-001",
    title: "Legal Notice & Website Terms",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/legal",
    description: "Operator particulars, site usage rules, IP protection, and pre-production status context.",
  },
  warranty: {
    id: "ALK-DOC-WARRANTY-001",
    title: "Alkota Limited Warranty Framework",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/warranty",
    description: "Commercial warranty philosophy, exclusions, and statutory rights distinction.",
  },
  privacy: {
    id: "ALK-DOC-PRIVACY-001",
    title: "Privacy Policy",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/privacy",
    description: "Full transparency on data collection, lawful bases, retention, security, and rider rights.",
  },
  reservations: {
    id: "ALK-DOC-RES-001",
    title: "Project 01 Reservation & Pre-Order Terms",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/legal/reservations",
    description: "Pre-production reservation rights, deposit conditions, and Build Lock mechanics.",
  },
  returns: {
    id: "ALK-DOC-RET-001",
    title: "Returns, Cancellations & Refunds Policy",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/returns",
    description: "Distance-selling change-of-mind rights, return conditions, faulty goods, and refund timing.",
  },
  shipping: {
    id: "ALK-DOC-SHIP-001",
    title: "Shipping & Delivery Policy",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/shipping",
    description: "Delivery markets, Partner handover, dispatch estimates, risk, and international customs.",
  },
  safety: {
    id: "ALK-DOC-SAFE-001",
    title: "Product Safety & Intended Use",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/safety",
    description: "Pre-ride protocols, intended use envelope, carbon inspection, torque, and maintenance.",
  },
  cookies: {
    id: "ALK-DOC-COOKIE-001",
    title: "Cookie Policy & Privacy Preferences",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/cookies",
    description: "Categorisation of storage technologies, consent rules, tag control, and technology register.",
  },
  accessibility: {
    id: "ALK-DOC-A11Y-001",
    title: "Accessibility Statement",
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
    id: "ALK-DOC-COMP-001",
    title: "Complaints Procedure",
    version: "1.0.0-DRAFT",
    effectiveDate: "2026-08-09",
    lastUpdated: "2026-08-09",
    status: "DRAFT",
    approvedBy: null,
    approvedAt: null,
    route: "/complaints",
    description: "Single-point complaint submission, internal escalation, resolution timeline, and rider support.",
  },
};

/**
 * Interface to log legal document acceptance for a customer transaction
 */
export interface AcceptanceRecord {
  documentId: string;
  version: string;
  timestamp: string;
  customerId?: string;
  transactionRef?: string;
}

export function recordLegalDocumentAcceptance(
  docKey: keyof typeof LEGAL_DOCUMENTS,
  customerId?: string,
  transactionRef?: string
): AcceptanceRecord {
  const doc = LEGAL_DOCUMENTS[docKey];
  if (!doc) {
    throw new Error(`Unknown legal document key: ${String(docKey)}`);
  }
  return {
    documentId: doc.id,
    version: doc.version,
    timestamp: new Date().toISOString(),
    customerId,
    transactionRef,
  };
}
