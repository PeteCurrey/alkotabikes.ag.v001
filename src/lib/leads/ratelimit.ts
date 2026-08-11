/**
 * ALKOTA CYCLES — RATE LIMITER FOR LEAD CAPTURE
 * src/lib/leads/ratelimit.ts
 *
 * Enforces rate limits:
 * - Max 5 submissions per IP hash per 10 minutes
 * - Max 3 submissions per email per hour
 *
 * Uses Postgres `rate_limit_counters` table with auto-cleanup as primary/fallback.
 * FAILS CLOSED on limiter error to protect system integrity.
 */

import { supabaseAdmin } from "@/lib/db/supabaseAdmin";

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
}

export async function checkRateLimit(
  ipHash: string,
  email: string
): Promise<RateLimitResult> {
  try {
    const now = new Date();

    // Key 1: IP Hash window (10 minutes = 600,000 ms)
    const ipWindowMs = 10 * 60 * 1000;
    const ipKey = `ip:${ipHash}:${Math.floor(now.getTime() / ipWindowMs)}`;
    const ipMax = 5;

    // Key 2: Email window (1 hour = 3,600,000 ms)
    const emailWindowMs = 60 * 60 * 1000;
    const cleanEmail = email.toLowerCase().trim();
    const emailKey = `email:${cleanEmail}:${Math.floor(now.getTime() / emailWindowMs)}`;
    const emailMax = 3;

    // Cleanup expired counters periodically (non-blocking)
    Promise.resolve(
      supabaseAdmin
        .from("rate_limit_counters")
        .delete()
        .lt("expires_at", now.toISOString())
    ).catch(() => {});

    // Check IP limit
    const ipAllowed = await checkAndUpdateCounter(
      ipKey,
      ipMax,
      new Date(now.getTime() + ipWindowMs)
    );
    if (!ipAllowed) {
      return {
        allowed: false,
        reason: "Too many submissions from this location. Please try again later.",
      };
    }

    // Check Email limit
    const emailAllowed = await checkAndUpdateCounter(
      emailKey,
      emailMax,
      new Date(now.getTime() + emailWindowMs)
    );
    if (!emailAllowed) {
      return {
        allowed: false,
        reason: "Too many submissions for this email address. Please try again in an hour.",
      };
    }

    return { allowed: true };
  } catch (err) {
    console.error("[RATE LIMITER ERROR]", err);
    // FAIL CLOSED on error per requirement
    return {
      allowed: false,
      reason: "Rate limiter check failed. Submission blocked for safety.",
    };
  }
}

async function checkAndUpdateCounter(
  key: string,
  maxCount: number,
  expiresAt: Date
): Promise<boolean> {
  const { data: existing, error: selectErr } = await supabaseAdmin
    .from("rate_limit_counters")
    .select("count")
    .eq("key", key)
    .maybeSingle();

  if (selectErr && selectErr.code !== "PGRST116") {
    throw selectErr;
  }

  const currentCount = existing?.count ?? 0;
  if (currentCount >= maxCount) {
    return false;
  }

  const newCount = currentCount + 1;
  const { error: upsertErr } = await supabaseAdmin
    .from("rate_limit_counters")
    .upsert({
      key,
      count: newCount,
      expires_at: expiresAt.toISOString(),
    });

  if (upsertErr) {
    throw upsertErr;
  }

  return true;
}
