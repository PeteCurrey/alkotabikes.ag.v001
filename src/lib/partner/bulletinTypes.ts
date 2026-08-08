/**
 * ALKOTA PARTNER NETWORK — TECHNICAL BULLETIN TYPES
 *
 * Technical bulletins issued to dealers and optionally customers.
 * No bulletins exist yet. Architecture only.
 */

export type BulletinSeverity =
  | "INFORMATIONAL"
  | "ADVISORY"
  | "ACTION_REQUIRED"
  | "SAFETY";

export type BulletinStatus = "DRAFT" | "ISSUED" | "SUPERSEDED";

export interface TechnicalBulletin {
  id: string;
  bulletinReference: string;        // APN-TB-000001
  bikeModel: string;
  affectedSerialRange: string | null; // null = all / TBC
  severity: BulletinSeverity;
  title: string;
  summary: string;
  action: string;
  customerVisible: boolean;
  dealerVisible: boolean;
  relatedDocuments: string[];
  status: BulletinStatus;
  issuedAt: string | null;
  supersededBy: string | null;      // bulletinReference of newer bulletin
  createdAt: string;
  updatedAt: string;
}

/**
 * Stub store — no bulletins exist yet.
 * When a bulletin is issued it may feed My Alkota where customerVisible: true.
 */
export const TECHNICAL_BULLETINS: TechnicalBulletin[] = [];
// No bulletins issued. Architecture documented for future use.
