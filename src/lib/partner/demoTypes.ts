/**
 * ALKOTA PARTNER NETWORK — DEMO FLEET TYPES
 *
 * Demo bike management. No actual demo bikes exist yet.
 * Production planned 2028.
 */

import type { RegionId } from "@/content/project01/commercial";

export type DemoBikeStatus =
  | "PLANNED"
  | "ALLOCATED"
  | "IN_TRANSIT"
  | "AVAILABLE"
  | "BOOKED"
  | "DEMO"
  | "SERVICE"
  | "RETIRED"
  | "SOLD";

export interface DemoUnit {
  id: string;
  demoReference: string;          // APN-DEMO-000001
  bikeModel: "PROJECT_01";
  size: string | null;
  finish: string | null;
  dealerId: string | null;        // null = unallocated
  region: RegionId;
  status: DemoBikeStatus;
  lastServiceDate: string | null;
  nextServiceDue: string | null;
  availableFrom: string | null;
  currentBookingRef: string | null;
  notes: string | null;
  // Mileage: only recorded if genuinely tracked by operations
  // mileage: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface DemoBookingRequest {
  id: string;
  demoUnitId: string;
  dealerId: string;
  customerName: string | null;    // when associated with a lead
  leadRef: string | null;
  requestedDate: string;
  status: "REQUESTED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes: string | null;
  createdAt: string;
}
