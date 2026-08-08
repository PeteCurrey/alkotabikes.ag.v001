/**
 * ALKOTA PARTNER NETWORK — IN-MEMORY STORE
 *
 * Development store for all partner entities.
 * Compatible with Supabase schema — production would swap these for DB calls.
 *
 * SECURITY PRINCIPLE:
 * All dealer-scoped queries enforce dealerId at the function level.
 * No function returns data outside the caller's dealerId scope.
 */

import type { PartnerOrganisation, PartnerApplication, PartnerStaffMember } from "./types";
import type { CustomerLead } from "./leadTypes";
import type { DemoUnit } from "./demoTypes";
import type { PDIRecord } from "./pdiTypes";
import type { WarrantyClaim, ServiceRecord } from "./warrantyTypes";

// ─── Stores ───────────────────────────────────────────────────────────────────

const partnersStore: PartnerOrganisation[] = [];
const applicationsStore: PartnerApplication[] = [];
const staffStore: PartnerStaffMember[] = [];
const leadsStore: CustomerLead[] = [];
const demoStore: DemoUnit[] = [];
const pdiStore: PDIRecord[] = [];
const warrantyStore: WarrantyClaim[] = [];
const serviceStore: ServiceRecord[] = [];

// ─── Partner Organisation ─────────────────────────────────────────────────────

export function getAllPartners(): PartnerOrganisation[] {
  return [...partnersStore];
}

export function getPartnerById(id: string): PartnerOrganisation | null {
  return partnersStore.find((p) => p.id === id) ?? null;
}

export function getPartnerByReference(ref: string): PartnerOrganisation | null {
  return partnersStore.find((p) => p.partnerReference === ref) ?? null;
}

export function getPartnerByEmailAndRef(
  email: string,
  ref: string
): PartnerOrganisation | null {
  return (
    partnersStore.find(
      (p) =>
        p.contactEmail.toLowerCase() === email.toLowerCase() &&
        p.partnerReference.toUpperCase() === ref.toUpperCase()
    ) ?? null
  );
}

export function createPartner(partner: PartnerOrganisation): void {
  partnersStore.push(partner);
}

export function updatePartner(
  id: string,
  updates: Partial<PartnerOrganisation>
): PartnerOrganisation | null {
  const idx = partnersStore.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  partnersStore[idx] = { ...partnersStore[idx], ...updates, updatedAt: new Date().toISOString() };
  return partnersStore[idx];
}

// ─── Applications ─────────────────────────────────────────────────────────────

export function getAllApplications(): PartnerApplication[] {
  return [...applicationsStore];
}

export function getApplicationById(id: string): PartnerApplication | null {
  return applicationsStore.find((a) => a.id === id) ?? null;
}

export function createApplication(app: PartnerApplication): void {
  applicationsStore.push(app);
}

export function updateApplication(
  id: string,
  updates: Partial<PartnerApplication>
): PartnerApplication | null {
  const idx = applicationsStore.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  applicationsStore[idx] = { ...applicationsStore[idx], ...updates };
  return applicationsStore[idx];
}

// ─── Staff ────────────────────────────────────────────────────────────────────

export function getStaffByPartnerId(partnerId: string): PartnerStaffMember[] {
  return staffStore.filter((s) => s.partnerId === partnerId);
}

// ─── Customer Leads ───────────────────────────────────────────────────────────

export function getAllLeads(): CustomerLead[] {
  return [...leadsStore];
}

/** DEALER-SCOPED: only returns leads assigned to this dealer */
export function getLeadsByDealerId(dealerId: string): CustomerLead[] {
  return leadsStore.filter((l) => l.assignedDealerId === dealerId);
}

export function getLeadById(id: string): CustomerLead | null {
  return leadsStore.find((l) => l.id === id) ?? null;
}

export function createLead(lead: CustomerLead): void {
  leadsStore.push(lead);
}

export function updateLead(
  id: string,
  updates: Partial<CustomerLead>
): CustomerLead | null {
  const idx = leadsStore.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leadsStore[idx] = { ...leadsStore[idx], ...updates, updatedAt: new Date().toISOString() };
  return leadsStore[idx];
}

// ─── Demo Fleet ───────────────────────────────────────────────────────────────

export function getAllDemoUnits(): DemoUnit[] {
  return [...demoStore];
}

/** DEALER-SCOPED: only returns demo units allocated to this dealer */
export function getDemoUnitsByDealerId(dealerId: string): DemoUnit[] {
  return demoStore.filter((d) => d.dealerId === dealerId);
}

export function createDemoUnit(unit: DemoUnit): void {
  demoStore.push(unit);
}

export function updateDemoUnit(
  id: string,
  updates: Partial<DemoUnit>
): DemoUnit | null {
  const idx = demoStore.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  demoStore[idx] = { ...demoStore[idx], ...updates, updatedAt: new Date().toISOString() };
  return demoStore[idx];
}

// ─── PDI Records ──────────────────────────────────────────────────────────────

/** DEALER-SCOPED: only returns PDI for this dealer's allocation */
export function getPDIByAllocationAndDealer(
  allocationId: string,
  dealerId: string
): PDIRecord | null {
  return pdiStore.find((p) => p.allocationId === allocationId && p.dealerId === dealerId) ?? null;
}

export function createPDIRecord(record: PDIRecord): void {
  pdiStore.push(record);
}

export function updatePDIRecord(
  id: string,
  updates: Partial<PDIRecord>
): PDIRecord | null {
  const idx = pdiStore.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  pdiStore[idx] = { ...pdiStore[idx], ...updates, updatedAt: new Date().toISOString() };
  return pdiStore[idx];
}

// ─── Warranty Claims ──────────────────────────────────────────────────────────

/** DEALER-SCOPED */
export function getWarrantyClaimsByDealerId(dealerId: string): WarrantyClaim[] {
  return warrantyStore.filter((w) => w.dealerId === dealerId);
}

export function getAllWarrantyClaims(): WarrantyClaim[] {
  return [...warrantyStore];
}

export function createWarrantyClaim(claim: WarrantyClaim): void {
  warrantyStore.push(claim);
}

// ─── Service Records ──────────────────────────────────────────────────────────

/** DEALER-SCOPED */
export function getServiceRecordsByDealerId(dealerId: string): ServiceRecord[] {
  return serviceStore.filter((s) => s.dealerId === dealerId);
}

export function createServiceRecord(record: ServiceRecord): void {
  serviceStore.push(record);
}
