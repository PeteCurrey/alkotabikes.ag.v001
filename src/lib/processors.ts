/**
 * ALKOTA CYCLES — DATA PROCESSOR INVENTORY
 * lib/processors.ts
 *
 * Canonical list of third-party data processors used by alkotacycles.com.
 *
 * UK GDPR Art. 30(2) requires controllers to maintain records of processing activities.
 * This file serves as the machine-readable version of that record for data processors.
 *
 * CATEGORIES:
 *   INFRASTRUCTURE   — hosting, edge functions, CDN
 *   PAYMENT          — payment processing and fraud detection
 *   EMAIL            — transactional and marketing email delivery
 *   ANALYTICS        — traffic and performance analytics
 *   DATABASE         — managed database and storage
 *   SECURITY         — security monitoring, DDoS protection
 *   SUPPORT          — customer support tooling
 *   LOGISTICS        — delivery and shipping partners
 *
 * TRANSFER BASIS (UK/EEA → Third Country):
 *   ADEQUACY         — adequacy decision in force
 *   SCCs             — Standard Contractual Clauses
 *   BINDING_RULES    — Binding Corporate Rules
 *   NA               — No international transfer (EEA/UK only)
 */

export type ProcessorCategory =
  | "INFRASTRUCTURE"
  | "PAYMENT"
  | "EMAIL"
  | "ANALYTICS"
  | "DATABASE"
  | "SECURITY"
  | "SUPPORT"
  | "LOGISTICS";

export type TransferBasis = "ADEQUACY" | "SCCs" | "BINDING_RULES" | "NA";

export interface DataProcessor {
  /** Short identifier used in references */
  id: string;
  /** Company name */
  name: string;
  /** Category of processing */
  category: ProcessorCategory;
  /** What this processor is used for */
  purpose: string;
  /** Types of personal data shared */
  dataTypes: string[];
  /** Country of primary processing */
  country: string;
  /** UK/EEA adequacy or transfer mechanism if third country */
  transferBasis: TransferBasis;
  /** Link to processor's privacy / DPA page */
  privacyUrl: string;
  /** Whether a Data Processing Agreement is in place */
  dpaInPlace: boolean;
  /** Internal notes */
  note?: string;
}

export const DATA_PROCESSORS: DataProcessor[] = [
  // ── INFRASTRUCTURE ──────────────────────────────────────────────────────
  {
    id: "vercel",
    name: "Vercel Inc.",
    category: "INFRASTRUCTURE",
    purpose: "Web application hosting, edge functions, CDN delivery, and build pipeline.",
    dataTypes: ["IP address", "Request logs", "Authentication tokens (transit only)"],
    country: "USA",
    transferBasis: "SCCs",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
    dpaInPlace: true,
  },

  // ── DATABASE ─────────────────────────────────────────────────────────────
  {
    id: "supabase",
    name: "Supabase Inc.",
    category: "DATABASE",
    purpose:
      "Managed PostgreSQL database storing registrations, configurations, portal data, and ownership records. Also provides object storage for media assets.",
    dataTypes: [
      "Identity & contact",
      "Registration data",
      "Configuration data",
      "Ownership records",
      "Audit logs",
    ],
    country: "USA",
    transferBasis: "SCCs",
    privacyUrl: "https://supabase.com/privacy",
    dpaInPlace: true,
  },

  // ── EMAIL ────────────────────────────────────────────────────────────────
  {
    id: "resend",
    name: "Resend (formerly Loops Technologies, Inc.)",
    category: "EMAIL",
    purpose:
      "Transactional email delivery: registration confirmations, magic link authentication, order updates, and partner communications.",
    dataTypes: ["Email address", "Name", "Reference numbers"],
    country: "USA",
    transferBasis: "SCCs",
    privacyUrl: "https://resend.com/legal/privacy-policy",
    dpaInPlace: false,
    note: "DPA to be executed prior to processing personal data through Resend.",
  },

  // ── ANALYTICS ────────────────────────────────────────────────────────────
  {
    id: "vercel-analytics",
    name: "Vercel Analytics (Vercel Inc.)",
    category: "ANALYTICS",
    purpose:
      "Privacy-respecting web analytics: page view counts, Core Web Vitals performance monitoring. No user-level tracking or cross-site fingerprinting.",
    dataTypes: ["Aggregated page views", "Performance metrics (no personal data stored)"],
    country: "USA",
    transferBasis: "SCCs",
    privacyUrl: "https://vercel.com/legal/privacy-policy#analytics",
    dpaInPlace: true,
    note:
      "Vercel Analytics is designed to not process personal data at the individual level. Cookie consent is not required for strictly aggregated metrics.",
  },

  // ── PAYMENT ──────────────────────────────────────────────────────────────
  {
    id: "stripe",
    name: "Stripe, Inc.",
    category: "PAYMENT",
    purpose:
      "Payment card processing for Alkota Supply store and future Project 01 reservation deposits. Fraud prevention and PCI-DSS compliance.",
    dataTypes: [
      "Billing name",
      "Billing address",
      "Payment card details (direct to Stripe — not stored by Alkota)",
      "Transaction amount",
      "IP address (fraud)",
    ],
    country: "USA",
    transferBasis: "SCCs",
    privacyUrl: "https://stripe.com/gb/privacy",
    dpaInPlace: false,
    note:
      "Payment processing not yet live. Stripe DPA and Stripe Radar review required prior to live commerce activation.",
  },
];

// ── Lookup helpers ───────────────────────────────────────────────────────────

export function getProcessorById(id: string): DataProcessor | undefined {
  return DATA_PROCESSORS.find((p) => p.id === id);
}

export function getProcessorsByCategory(
  category: ProcessorCategory
): DataProcessor[] {
  return DATA_PROCESSORS.filter((p) => p.category === category);
}

export function getProcessorsRequiringDPA(): DataProcessor[] {
  return DATA_PROCESSORS.filter((p) => !p.dpaInPlace);
}

export function getInternationalTransferProcessors(): DataProcessor[] {
  return DATA_PROCESSORS.filter((p) => p.transferBasis !== "NA");
}
