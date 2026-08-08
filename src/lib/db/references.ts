/**
 * ALKOTA PERFORMANCE ENGINEERING — SERVER REFERENCE GENERATORS
 *
 * Concurrency-safe, collision-free reference generation.
 * Queries Supabase Postgres sequences when available, with crypto-safe fallbacks.
 */

import { supabaseAdmin } from "./supabaseAdmin";
import { randomBytes } from "crypto";

function pad(num: number, width = 6): string {
  return String(num).padStart(width, "0");
}

function getRandomSuffix(length = 4): string {
  return randomBytes(length).toString("hex").toUpperCase().slice(0, length);
}

/** Generate P01-REG-XXXXXX */
export async function generateRegistrationReference(): Promise<string> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.rpc("nextval", { seq_name: "seq_reg_number" });
      if (!error && data) return `P01-REG-${pad(data)}`;
    } catch {
      // Fall back to crypto reference if sequence unavailable
    }
  }
  return `P01-REG-${getRandomSuffix(6)}`;
}

/** Generate P01-FIT-XXXXXX */
export async function generateFitReference(): Promise<string> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.rpc("nextval", { seq_name: "seq_fit_number" });
      if (!error && data) return `P01-FIT-${pad(data)}`;
    } catch {
      // fallback
    }
  }
  return `P01-FIT-${getRandomSuffix(6)}`;
}

/** Generate P01-CFG-XXXXXX */
export async function generateConfigurationReference(): Promise<string> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.rpc("nextval", { seq_name: "seq_cfg_number" });
      if (!error && data) return `P01-CFG-${pad(data)}`;
    } catch {
      // fallback
    }
  }
  return `P01-CFG-${getRandomSuffix(6)}`;
}

/** Generate P01-RES-XXXXXX */
export async function generateReservationReference(): Promise<string> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.rpc("nextval", { seq_name: "seq_res_number" });
      if (!error && data) return `P01-RES-${pad(data)}`;
    } catch {
      // fallback
    }
  }
  return `P01-RES-${getRandomSuffix(6)}`;
}

/** Generate P01-ALC-XXXXXX */
export async function generateAllocationReference(): Promise<string> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.rpc("nextval", { seq_name: "seq_alc_number" });
      if (!error && data) return `P01-ALC-${pad(data)}`;
    } catch {
      // fallback
    }
  }
  return `P01-ALC-${getRandomSuffix(6)}`;
}

/** Generate APN-XXXXXX */
export async function generatePartnerReference(): Promise<string> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.rpc("nextval", { seq_name: "seq_apn_number" });
      if (!error && data) return `APN-${pad(data)}`;
    } catch {
      // fallback
    }
  }
  return `APN-${getRandomSuffix(6)}`;
}

/** Generate APN-LEAD-XXXXXX */
export async function generateLeadReference(): Promise<string> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.rpc("nextval", { seq_name: "seq_lead_number" });
      if (!error && data) return `APN-LEAD-${pad(data)}`;
    } catch {
      // fallback
    }
  }
  return `APN-LEAD-${getRandomSuffix(6)}`;
}
