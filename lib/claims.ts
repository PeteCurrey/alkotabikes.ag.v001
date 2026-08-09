/**
 * ALKOTA CYCLES — CONTENT CLAIMS REGISTRY
 *
 * Every factual assertion rendered to a user must be registered here.
 * The `claim()` helper throws at build time if an id is not in the registry.
 * This file is intentionally separate from the engineering claims system
 * (src/lib/claims/) which governs engineering specifications.
 * This file governs editorial and marketing assertions.
 */

export type ClaimStatus =
  | 'UNSET'           // Requires explicit owner decision/categorisation
  | 'VERIFIED'        // true today — evidence field required
  | 'PLANNED'         // committed future intent, not yet true
  | 'TARGET'          // design target, may not be achieved
  | 'SUPPLIER_SPEC';  // manufacturer specification — evidence field required

export interface Claim {
  id: string;          // ALK-CLAIM-NNN
  text: string;        // the exact assertion as rendered to users
  status: ClaimStatus;
  evidence?: string;   // REQUIRED when status is VERIFIED or SUPPLIER_SPEC
  surfaces: string[];  // routes where this claim is rendered, e.g. ['/bikes/project-01']
  reviewedAt: string;  // ISO date — must be reviewed every 180 days
}

export const CLAIMS: Claim[] = [
  {
    id: 'ALK-CLAIM-001',
    text: '5-axis CNC machining & titanium hardware assembly',
    status: 'TARGET',
    surfaces: ['/'],
    reviewedAt: '2026-08-09',
  },
  {
    id: 'ALK-CLAIM-002',
    text: 'linear spectral lighting & shock dyno testing',
    status: 'TARGET',
    surfaces: ['/'],
    reviewedAt: '2026-08-09',
  },
  {
    id: 'ALK-CLAIM-003',
    text: 'Precision carbon fiber layup control & telemetry bench',
    status: 'TARGET',
    surfaces: ['/'],
    reviewedAt: '2026-08-09',
  },
  {
    id: 'ALK-CLAIM-004',
    text: 'Linear spectral lighting',
    status: 'TARGET',
    surfaces: ['/'],
    reviewedAt: '2026-08-09',
  },
  {
    id: 'ALK-CLAIM-005',
    text: 'FACILITY / PERFORMANCE ENGINEERING LAB — LOCATION: R&D WORKSHOP 01',
    status: 'TARGET',
    surfaces: ['/'],
    reviewedAt: '2026-08-09',
  },
  {
    id: 'ALK-CLAIM-006',
    text: 'ALPINE R&D / HAUTE-SAVOIE',
    status: 'TARGET',
    surfaces: ['/'],
    reviewedAt: '2026-08-09',
  },
];

/**
 * Resolve a claim by id.
 * Throws at build time (and at runtime in development) if the id is not registered.
 * Never returns undefined — callers can rely on the return value being present.
 */
export function claim(id: string): Claim {
  const found = CLAIMS.find((c) => c.id === id);
  if (!found) {
    throw new Error(
      `[ALKOTA CLAIMS] Claim "${id}" is not registered in lib/claims.ts. ` +
      `Every factual assertion must be registered before it can be rendered. ` +
      `Add the claim to CLAIMS[] with status, evidence, surfaces and reviewedAt.`
    );
  }
  return found;
}
