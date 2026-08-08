/**
 * ALKOTA PROJECT 01 — ENGINEERING REVISION LOG
 * 
 * Controlled record of engineering iterations, changes, and kinematic baseline updates.
 */

export interface EngineeringRevision {
  revision: string;
  date: string;
  status: string;
  summary: string;
  changes: string[];
  reason: string;
  journalEntryRef?: string;
}

export const PROJECT_01_REVISIONS: EngineeringRevision[] = [
  {
    revision: "R00",
    date: "2026-01-15",
    status: "DEVELOPMENT_BASELINE",
    summary: "Initial engineering development baseline established around 160mm front / 150mm rear travel and low-pivot four-bar kinematics.",
    changes: [
      "160 mm front travel target confirmed",
      "150 mm rear travel target confirmed",
      "29 / 29 primary wheel architecture established",
      "Large master chassis geometry defined (485 mm reach / 640.7 mm stack)",
      "Full Mount / hangerless derailleur interface integrated",
    ],
    reason: "Established single source of truth for physical prototype tooling and FEA analysis.",
    journalEntryRef: "001-the-design-brief",
  },
];

export function getRevisionLog(): EngineeringRevision[] {
  return PROJECT_01_REVISIONS;
}

export function getCurrentRevision(): EngineeringRevision {
  return PROJECT_01_REVISIONS[0];
}
