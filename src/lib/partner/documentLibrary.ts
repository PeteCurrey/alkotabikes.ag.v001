/**
 * ALKOTA PARTNER NETWORK — DOCUMENT LIBRARY
 *
 * Controlled partner document manifest. Only CURRENT/APPROVED revisions
 * should be distributed. SUPERSEDED documents must be clearly marked.
 *
 * No documents exist yet. Architecture only.
 */

import type { PartnerType } from "./types";

export type DocumentCategory =
  | "PRODUCT"
  | "SETUP"
  | "SERVICE"
  | "TECHNICAL_BULLETIN"
  | "PDI"
  | "WARRANTY"
  | "MARKETING"
  | "PHOTOGRAPHY"
  | "PRICE_LIST";

export type DocumentStatus =
  | "DRAFT"
  | "APPROVED"
  | "CURRENT"
  | "SUPERSEDED"
  | "RETIRED";

export interface PartnerDocument {
  id: string;
  documentReference: string;       // APN-DOC-000001
  category: DocumentCategory;
  title: string;
  description: string | null;
  revision: string;                // e.g. "v1.0"
  status: DocumentStatus;
  partnerTypes: PartnerType[];     // which partner types can access
  filePath: string | null;         // null = not yet uploaded
  fileSize: number | null;
  mimeType: string | null;
  supersededBy: string | null;     // documentReference of newer version
  publishedAt: string | null;
  expiresAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Current document manifest. No documents have been approved yet.
 * Documents must be uploaded and approved before distribution.
 */
export const PARTNER_DOCUMENT_MANIFEST: PartnerDocument[] = [];
// No documents issued. Awaiting commercial/technical content approval.

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  PRODUCT: "Product",
  SETUP: "Setup",
  SERVICE: "Service",
  TECHNICAL_BULLETIN: "Technical Bulletin",
  PDI: "PDI",
  WARRANTY: "Warranty",
  MARKETING: "Marketing",
  PHOTOGRAPHY: "Photography",
  PRICE_LIST: "Price List",
};
