/**
 * ALKOTA PARTNER NETWORK — REFERENCE GENERATORS
 *
 * Consistent reference formatting for all partner-network entities.
 */

let demoCounter = 1;
let leadCounter = 1;
let bulletinCounter = 1;
let docCounter = 1;
let warrantyCounter = 1;
let serviceCounter = 1;

function pad(n: number, digits = 6): string {
  return String(n).padStart(digits, "0");
}

export function generateDemoReference(): string {
  return `APN-DEMO-${pad(demoCounter++)}`;
}

export function generateLeadReference(): string {
  return `APN-LEAD-${pad(leadCounter++)}`;
}

export function generateBulletinReference(): string {
  return `APN-TB-${pad(bulletinCounter++)}`;
}

export function generateDocumentReference(): string {
  return `APN-DOC-${pad(docCounter++)}`;
}

export function generateWarrantyReference(): string {
  return `APN-WC-${pad(warrantyCounter++)}`;
}

export function generateServiceReference(): string {
  return `APN-SVC-${pad(serviceCounter++)}`;
}
