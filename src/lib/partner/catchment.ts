/**
 * ALKOTA CYCLES — PARTNER CATCHMENT ENGINE
 * src/lib/partner/catchment.ts
 *
 * Catchment radius is stored as a resolved value per partner (from
 * partnerTerms.ts at the time of seeding), not computed at read time.
 *
 * Routing resolution:
 *   1. Find all partners whose catchment circle contains the enquirer's point
 *   2. If exactly one match: route to that partner
 *   3. If multiple: resolve by road distance (Mapbox Directions API if token
 *      is configured; haversine straight-line fallback with method logged)
 *   4. Log every decision to lead_routing_log for dispute resolution
 */

import { createClient } from "@supabase/supabase-js";
import type { PartnerTier } from "@/config/partnerTerms";
import { getPartnerTerms } from "@/config/partnerTerms";
import type { RegionCode } from "@/lib/regions";

// ─── Supabase ────────────────────────────────────────────────────────────────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars not configured");
  }
  return createClient(url, key);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PartnerCatchment {
  id: string;
  partnerId: string;
  latitude: number;
  longitude: number;
  radiusMiles: number;
  tier: PartnerTier;
  createdAt: string;
  updatedAt: string;
}

export type DistanceMethod = "HAVERSINE" | "ROAD_DISTANCE_MAPBOX";

export interface RoutingDecision {
  leadId: string;
  candidatePartnerIds: string[];
  winningPartnerId: string | null;
  distanceMethod: DistanceMethod;
  decisionReason: string;
}

// ─── ROAD_DISTANCE_PROVIDER interface ────────────────────────────────────────
//
// Swap in a real provider by setting NEXT_PUBLIC_MAPBOX_TOKEN.
// Haversine is used as a fallback when no token is configured.

interface RoadDistanceResult {
  partnerId: string;
  distanceMetres: number;
  method: DistanceMethod;
}

async function getRoadDistances(
  origin: { lat: number; lng: number },
  partners: { id: string; lat: number; lng: number }[]
): Promise<RoadDistanceResult[]> {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (mapboxToken && partners.length > 0) {
    try {
      // Mapbox Matrix API: origin → each partner destination
      const coordinates = [
        `${origin.lng},${origin.lat}`,
        ...partners.map((p) => `${p.lng},${p.lat}`),
      ].join(";");

      const res = await fetch(
        `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}` +
          `?sources=0&destinations=${partners.map((_, i) => i + 1).join(";")}&access_token=${mapboxToken}`
      );

      if (res.ok) {
        const data = await res.json();
        const durations: number[] = data.durations?.[0] ?? [];
        return partners.map((p, i) => ({
          partnerId: p.id,
          distanceMetres: durations[i] ?? haversineMetres(origin, p),
          method: "ROAD_DISTANCE_MAPBOX" as DistanceMethod,
        }));
      }
    } catch {
      // Fall through to haversine
    }
  }

  // Haversine fallback
  return partners.map((p) => ({
    partnerId: p.id,
    distanceMetres: haversineMetres(origin, p),
    method: "HAVERSINE" as DistanceMethod,
  }));
}

// ─── Haversine ───────────────────────────────────────────────────────────────

function haversineMetres(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6_371_000; // Earth radius in metres
  const φ1 = (a.lat * Math.PI) / 180;
  const φ2 = (b.lat * Math.PI) / 180;
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function milesToMetres(miles: number): number {
  return miles * 1609.344;
}

// ─── Core routing function ───────────────────────────────────────────────────

/**
 * Resolve the best partner for an enquirer's location.
 * Logs every decision to lead_routing_log.
 */
export async function resolvePartnerForLead(
  leadId: string,
  latitude: number,
  longitude: number
): Promise<RoutingDecision> {
  const supabase = getSupabase();

  // Fetch all active catchments
  const { data: catchments, error } = await supabase
    .from("partner_catchment")
    .select("*");

  if (error || !catchments) {
    const decision: RoutingDecision = {
      leadId,
      candidatePartnerIds: [],
      winningPartnerId: null,
      distanceMethod: "HAVERSINE",
      decisionReason: `Catchment query failed: ${error?.message ?? "no data"}`,
    };
    await logRoutingDecision(decision);
    return decision;
  }

  // Filter to partners whose catchment contains the point
  const origin = { lat: latitude, lng: longitude };
  const candidates = catchments.filter((c) => {
    const dist = haversineMetres(origin, { lat: c.latitude, lng: c.longitude });
    return dist <= milesToMetres(c.radius_miles);
  });

  if (candidates.length === 0) {
    const decision: RoutingDecision = {
      leadId,
      candidatePartnerIds: [],
      winningPartnerId: null,
      distanceMethod: "HAVERSINE",
      decisionReason: "No partner catchment covers enquirer location.",
    };
    await logRoutingDecision(decision);
    return decision;
  }

  if (candidates.length === 1) {
    const decision: RoutingDecision = {
      leadId,
      candidatePartnerIds: [candidates[0].partner_id],
      winningPartnerId: candidates[0].partner_id,
      distanceMethod: "HAVERSINE",
      decisionReason: "Single catchment match — no distance resolution required.",
    };
    await logRoutingDecision(decision);
    return decision;
  }

  // Multiple candidates — resolve by road distance
  const distances = await getRoadDistances(
    origin,
    candidates.map((c) => ({
      id: c.partner_id,
      lat: c.latitude,
      lng: c.longitude,
    }))
  );

  distances.sort((a, b) => a.distanceMetres - b.distanceMetres);
  const winner = distances[0];
  const method = winner.method;

  const decision: RoutingDecision = {
    leadId,
    candidatePartnerIds: candidates.map((c) => c.partner_id),
    winningPartnerId: winner.partnerId,
    distanceMethod: method,
    decisionReason:
      `${candidates.length} overlapping catchments. Nearest by ${method}: ` +
      `partner ${winner.partnerId} at ${Math.round(winner.distanceMetres)}m.`,
  };
  await logRoutingDecision(decision);
  return decision;
}

async function logRoutingDecision(decision: RoutingDecision): Promise<void> {
  try {
    const supabase = getSupabase();
    await supabase.from("lead_routing_log").insert({
      lead_id: decision.leadId,
      candidate_partner_ids: decision.candidatePartnerIds,
      winning_partner_id: decision.winningPartnerId,
      distance_method: decision.distanceMethod,
      decision_reason: decision.decisionReason,
      decided_at: new Date().toISOString(),
    });
  } catch {
    // Never throw from logging
  }
}

// ─── Seed helper ─────────────────────────────────────────────────────────────

/**
 * Seed a partner's catchment from partnerTerms.ts tier defaults.
 * The resolved radius is stored — never computed at read time.
 */
export async function seedPartnerCatchment(
  partnerId: string,
  region: RegionCode,
  tier: PartnerTier,
  latitude: number,
  longitude: number,
  overrideRadiusMiles?: number
): Promise<void> {
  const terms = getPartnerTerms(region, tier);
  if (!terms) {
    throw new Error(
      `No published partner terms for region '${region}' tier '${tier}'`
    );
  }
  const radiusMiles = overrideRadiusMiles ?? terms.catchmentRadiusMiles;

  const supabase = getSupabase();
  await supabase.from("partner_catchment").upsert({
    partner_id: partnerId,
    latitude,
    longitude,
    radius_miles: radiusMiles,
    tier,
    updated_at: new Date().toISOString(),
  });
}
