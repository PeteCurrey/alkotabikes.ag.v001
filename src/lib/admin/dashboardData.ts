/**
 * ALKOTA CYCLES — ADMIN DASHBOARD DATA LAYER
 * src/lib/admin/dashboardData.ts
 *
 * All dashboard queries. Every function returns a typed Result object.
 * Failed queries return { ok: false, error: string } — never throw to the page.
 * All queries use supabaseAdmin (service role) and run server-side only.
 */

import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { CMS_REGISTRY } from "@/lib/cms/registry";
import sitemap from "@/app/sitemap";

// ── Types ──────────────────────────────────────────────────────────────────

export type QueryResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export interface LeadStats {
  total: number;
  new24h: number;
  new7d: number;
  new30d: number;
  doubleOptInCount: number;
  doubleOptInRate: number; // 0–100
  byType: Record<string, number>;
  topSourcePages: { page: string; count: number }[];
  topUtmSources: { source: string; count: number }[];
  hasSparklineData: boolean; // true if >= 14 days of data
  // dailyCounts: { date: string; count: number }[] — only populated when hasSparklineData
  dailyCounts: { date: string; count: number }[];
}

export interface ContentMediaStats {
  mediaCount: number;
  totalSlots: number;
  requiredSlots: number;
  filledRequiredSlots: number;
  missingAltText: number;
  unknownLicence: number;
  unknownProvenance: number;
  worstPages: { pageKey: string; label: string; filled: number; total: number }[];
  cmsConnected: boolean;
}

export interface AttentionItem {
  id: string;
  severity: "critical" | "warning" | "info";
  count: number;
  description: string;
  href: string;
}

export interface SystemStatus {
  gitSha: string;
  deployTime: string | null;
  environment: string;
  allowIndexing: boolean;
  indexingEnvVar: string;
  siteUrl: string;
  dbStatus: "healthy" | "unavailable";
  dbLatencyMs: number | null;
  storageStatus: "healthy" | "unavailable" | "not_configured";
  totalStorageAssets: number;
  integrations: {
    name: string;
    status: "healthy" | "unavailable" | "not_configured";
    note?: string;
  }[];
}

export interface RecentActivity {
  id: string;
  actor: string;
  action: string;
  subject: string;
  createdAt: string;
}

export interface NewsletterStats {
  marketableCount: number;
  suppressionCount: number;
  lastCampaignDate: string | null;
  isBuilding: boolean;
}

export interface CommerceStats {
  commerceLive: boolean;
  pricingVisible: boolean;
  storeMode: string;
  registeredInterest: number;
}

export interface SeoStats {
  allowIndexing: boolean;
  canonicalHost: string;
  sitemapRouteCount: number;
}

// ── Leads ──────────────────────────────────────────────────────────────────

export async function fetchLeadStats(): Promise<QueryResult<LeadStats>> {
  try {
    const now = new Date();
    const d24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const d7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const d30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const d14d = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();

    const [
      totalRes,
      new24hRes,
      new7dRes,
      new30dRes,
      doubleOptInRes,
      byTypeRes,
      topPagesRes,
      topUtmRes,
      sparklineRes,
    ] = await Promise.all([
      supabaseAdmin.from("leads").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).gte("created_at", d24h),
      supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).gte("created_at", d7d),
      supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).gte("created_at", d30d),
      supabaseAdmin.from("leads").select("*", { count: "exact", head: true }).not("double_optin_at", "is", null),
      supabaseAdmin.from("leads").select("lead_type"),
      supabaseAdmin.from("leads").select("source_page").not("source_page", "is", null),
      supabaseAdmin.from("leads").select("utm_source").not("utm_source", "is", null),
      supabaseAdmin.from("leads").select("created_at").gte("created_at", d14d).order("created_at", { ascending: true }),
    ]);

    if (totalRes.error) throw new Error(totalRes.error.message);

    const total = totalRes.count || 0;
    const new24h = new24hRes.count || 0;
    const new7d = new7dRes.count || 0;
    const new30d = new30dRes.count || 0;
    const doubleOptInCount = doubleOptInRes.count || 0;
    const doubleOptInRate =
      total > 0 ? Math.round((doubleOptInCount / total) * 100) : 0;

    // Count by type
    const byType: Record<string, number> = {};
    for (const row of byTypeRes.data || []) {
      const t = row.lead_type as string;
      byType[t] = (byType[t] || 0) + 1;
    }

    // Top source pages
    const pageMap: Record<string, number> = {};
    for (const row of topPagesRes.data || []) {
      if (row.source_page) pageMap[row.source_page] = (pageMap[row.source_page] || 0) + 1;
    }
    const topSourcePages = Object.entries(pageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([page, count]) => ({ page, count }));

    // Top UTM sources
    const utmMap: Record<string, number> = {};
    for (const row of topUtmRes.data || []) {
      if (row.utm_source) utmMap[row.utm_source] = (utmMap[row.utm_source] || 0) + 1;
    }
    const topUtmSources = Object.entries(utmMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([source, count]) => ({ source, count }));

    // Sparkline: collapse raw timestamps into daily buckets
    const sparkRows = sparklineRes.data || [];
    const dailyMap: Record<string, number> = {};
    for (const row of sparkRows) {
      const day = (row.created_at as string).slice(0, 10);
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    }
    const dailyCounts = Object.entries(dailyMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }));

    const hasSparklineData = dailyCounts.length >= 14;

    return {
      ok: true,
      data: {
        total,
        new24h,
        new7d,
        new30d,
        doubleOptInCount,
        doubleOptInRate,
        byType,
        topSourcePages,
        topUtmSources,
        hasSparklineData,
        dailyCounts,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── Content & Media ────────────────────────────────────────────────────────

export async function fetchContentMediaStats(): Promise<QueryResult<ContentMediaStats>> {
  try {
    const [mediaRes, missingAltRes, unknownLicRes, unknownProvRes, slotsRes] = await Promise.all([
      supabaseAdmin.from("media_assets").select("*", { count: "exact", head: true }),
      supabaseAdmin
        .from("media_assets")
        .select("*", { count: "exact", head: true })
        .eq("is_decorative", false)
        .is("alt_text", null),
      supabaseAdmin
        .from("media_assets")
        .select("*", { count: "exact", head: true })
        .eq("licence", "unknown"),
      supabaseAdmin
        .from("media_assets")
        .select("*", { count: "exact", head: true })
        .eq("provenance", "unknown"),
      supabaseAdmin
        .from("content_slots")
        .select("page_key, slot_key, media_id, value_text, is_required"),
    ]);

    if (mediaRes.error) throw new Error(mediaRes.error.message);

    const mediaCount = mediaRes.count || 0;

    // Compute slot stats from registry vs DB
    const totalRequiredSlots = CMS_REGISTRY.reduce(
      (acc, p) => acc + p.slots.filter((s) => s.required).length,
      0
    );
    const totalSlots = CMS_REGISTRY.reduce((acc, p) => acc + p.slots.length, 0);

    const filledSlotKeys = new Set<string>();
    for (const row of slotsRes.data || []) {
      if (row.media_id || row.value_text) {
        filledSlotKeys.add(`${row.page_key}|${row.slot_key}`);
      }
    }

    let filledRequiredSlots = 0;
    for (const page of CMS_REGISTRY) {
      for (const slot of page.slots) {
        if (slot.required && filledSlotKeys.has(`${page.pageKey}|${slot.slotKey}`)) {
          filledRequiredSlots++;
        }
      }
    }

    // Per-page completeness for worst-5 list
    const pageStats: { pageKey: string; label: string; filled: number; total: number }[] = [];
    for (const page of CMS_REGISTRY) {
      const total = page.slots.filter((s) => s.required).length;
      const filled = page.slots.filter(
        (s) => s.required && filledSlotKeys.has(`${page.pageKey}|${s.slotKey}`)
      ).length;
      pageStats.push({ pageKey: page.pageKey, label: page.label, filled, total });
    }
    pageStats.sort((a, b) => a.filled / Math.max(a.total, 1) - b.filled / Math.max(b.total, 1));
    const worstPages = pageStats.slice(0, 5);

    return {
      ok: true,
      data: {
        mediaCount,
        totalSlots,
        requiredSlots: totalRequiredSlots,
        filledRequiredSlots,
        missingAltText: missingAltRes.count || 0,
        unknownLicence: unknownLicRes.count || 0,
        unknownProvenance: unknownProvRes.count || 0,
        worstPages,
        cmsConnected: mediaCount > 0,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── Attention Bar ──────────────────────────────────────────────────────────

export async function fetchAttentionItems(): Promise<QueryResult<AttentionItem[]>> {
  try {
    const items: AttentionItem[] = [];

    // 1. Media assets with unknown licence
    const { count: unknownLicCount } = await supabaseAdmin
      .from("media_assets")
      .select("*", { count: "exact", head: true })
      .eq("licence", "unknown");
    if ((unknownLicCount || 0) > 0) {
      items.push({
        id: "unknown_licence",
        severity: "critical",
        count: unknownLicCount!,
        description: `${unknownLicCount} media asset(s) have licence 'unknown' — must be resolved before production`,
        href: "/admin/media",
      });
    }

    // 2. Media assets with unknown provenance
    const { count: unknownProvCount } = await supabaseAdmin
      .from("media_assets")
      .select("*", { count: "exact", head: true })
      .eq("provenance", "unknown");
    if ((unknownProvCount || 0) > 0) {
      items.push({
        id: "unknown_provenance",
        severity: "critical",
        count: unknownProvCount!,
        description: `${unknownProvCount} media asset(s) have unverified provenance`,
        href: "/admin/media",
      });
    }

    // 3. Media assets missing alt text (non-decorative)
    const { count: missingAlt } = await supabaseAdmin
      .from("media_assets")
      .select("*", { count: "exact", head: true })
      .eq("is_decorative", false)
      .is("alt_text", null);
    if ((missingAlt || 0) > 0) {
      items.push({
        id: "missing_alt_text",
        severity: "warning",
        count: missingAlt!,
        description: `${missingAlt} media asset(s) missing alt text (accessibility & SEO)`,
        href: "/admin/media",
      });
    }

    // 4. Leads with consent but no double opt-in
    const d72h = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
    const { count: pendingOptIn } = await supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("marketing_consent", true)
      .is("double_optin_at", null)
      .lt("created_at", d72h); // older than 72h and still not confirmed
    if ((pendingOptIn || 0) > 0) {
      items.push({
        id: "pending_optin",
        severity: "warning",
        count: pendingOptIn!,
        description: `${pendingOptIn} lead(s) have marketing consent but no double opt-in confirmation (>72h)`,
        href: "/admin/leads",
      });
    }

    return { ok: true, data: items };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── System Status ──────────────────────────────────────────────────────────

export async function fetchSystemStatus(): Promise<QueryResult<SystemStatus>> {
  try {
    const gitSha = (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7) || "local";
    const environment = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
    const allowIndexing = process.env.ALLOW_INDEXING === "true";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "(not set)";
    const deployTime = process.env.VERCEL_GIT_COMMIT_MESSAGE
      ? null // we don't have a deploy timestamp in standard Vercel vars
      : null;

    // DB latency check
    let dbStatus: "healthy" | "unavailable" = "unavailable";
    let dbLatencyMs: number | null = null;
    try {
      const t0 = Date.now();
      const { error } = await supabaseAdmin
        .from("leads")
        .select("id", { count: "exact", head: true });
      if (!error) {
        dbLatencyMs = Date.now() - t0;
        dbStatus = "healthy";
      }
    } catch {}

    // Storage check
    let storageStatus: "healthy" | "unavailable" | "not_configured" = "not_configured";
    let totalStorageAssets = 0;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
      try {
        const { data: buckets, error: buckErr } = await supabaseAdmin.storage.listBuckets();
        if (!buckErr && buckets) {
          storageStatus = "healthy";
          // Count objects across all public buckets (best-effort)
          for (const bucket of buckets) {
            const { data: files } = await supabaseAdmin.storage.from(bucket.name).list("", { limit: 1, offset: 0 });
            if (files) totalStorageAssets += 1; // we just check connectivity, not full count
          }
        } else {
          storageStatus = "unavailable";
        }
      } catch {
        storageStatus = "unavailable";
      }
    }

    // Integration health checks
    const integrations: SystemStatus["integrations"] = [];

    // Supabase
    integrations.push({
      name: "Supabase",
      status: dbStatus,
      note: dbLatencyMs !== null ? `${dbLatencyMs}ms` : undefined,
    });

    // Resend
    if (!process.env.RESEND_API_KEY) {
      integrations.push({ name: "Resend", status: "not_configured" });
    } else {
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from: "check@example.com", to: "check@example.com", subject: "ping", text: "ping" }),
        });
        // Resend returns 422 for validation errors but 401/403 for auth failures
        integrations.push({
          name: "Resend",
          status: r.status === 401 || r.status === 403 ? "unavailable" : "healthy",
          note: `HTTP ${r.status}`,
        });
      } catch {
        integrations.push({ name: "Resend", status: "unavailable" });
      }
    }

    // Anthropic
    if (!process.env.ANTHROPIC_API_KEY) {
      integrations.push({ name: "Anthropic", status: "not_configured" });
    } else {
      integrations.push({ name: "Anthropic", status: "healthy", note: "key present" });
    }

    // Turnstile
    if (!process.env.TURNSTILE_SECRET_KEY) {
      integrations.push({ name: "Turnstile (CF)", status: "not_configured" });
    } else {
      integrations.push({ name: "Turnstile (CF)", status: "healthy", note: "key present" });
    }

    // Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      integrations.push({ name: "Stripe", status: "not_configured" });
    } else {
      integrations.push({ name: "Stripe", status: "healthy", note: "key present" });
    }

    return {
      ok: true,
      data: {
        gitSha,
        deployTime,
        environment,
        allowIndexing,
        indexingEnvVar: "ALLOW_INDEXING",
        siteUrl,
        dbStatus,
        dbLatencyMs,
        storageStatus,
        totalStorageAssets,
        integrations,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── Recent Activity ────────────────────────────────────────────────────────

export async function fetchRecentActivity(): Promise<QueryResult<RecentActivity[]>> {
  try {
    const { data, error } = await supabaseAdmin
      .from("audit_logs")
      .select("id, actor_email, actor_role, action, entity_type, entity_id, created_at")
      .order("created_at", { ascending: false })
      .limit(15);

    if (error) throw new Error(error.message);

    const items: RecentActivity[] = (data || []).map((row: Record<string, unknown>) => ({
      id: String(row.id || ""),
      actor: String(row.actor_email || row.actor_role || "system"),
      action: String(row.action || ""),
      subject: `${row.entity_type} / ${row.entity_id}`,
      createdAt: String(row.created_at || ""),
    }));

    return { ok: true, data: items };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── Newsletter ─────────────────────────────────────────────────────────────

export async function fetchNewsletterStats(): Promise<QueryResult<NewsletterStats>> {
  try {
    // Marketable = marketing_consent=true AND double_optin confirmed AND not unsubscribed
    const { count: marketableCount, error } = await supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("marketing_consent", true)
      .not("double_optin_at", "is", null)
      .is("unsubscribed_at", null);

    if (error) throw new Error(error.message);

    // Suppressed = unsubscribed
    const { count: suppressionCount } = await supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .not("unsubscribed_at", "is", null);

    return {
      ok: true,
      data: {
        marketableCount: marketableCount || 0,
        suppressionCount: suppressionCount || 0,
        lastCampaignDate: null, // No campaigns table yet
        isBuilding: true,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── Commerce ───────────────────────────────────────────────────────────────

export async function fetchCommerceStats(): Promise<QueryResult<CommerceStats>> {
  try {
    const commerceLive = process.env.COMMERCE_LIVE === "true";
    const pricingVisible = process.env.PRICING_VISIBLE === "true";
    const storeMode = process.env.STORE_MODE || "CATALOGUE";

    // Count registered interest (leads with lead_type=preorder_interest or waitlist)
    const { count: registeredInterest } = await supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .in("lead_type", ["preorder_interest", "waitlist"]);

    return {
      ok: true,
      data: {
        commerceLive,
        pricingVisible,
        storeMode,
        registeredInterest: registeredInterest || 0,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── SEO ────────────────────────────────────────────────────────────────────

export function fetchSeoStats(): QueryResult<SeoStats> {
  // Synchronous — reads from env and config only, no DB call needed
  try {
    const allowIndexing = process.env.ALLOW_INDEXING === "true";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    let canonicalHost = "(not set)";
    try {
      canonicalHost = new URL(siteUrl).hostname;
    } catch {}

    // Count exact registered routes generated by sitemap engine
    const sitemapRouteCount = sitemap().length;

    return {
      ok: true,
      data: {
        allowIndexing,
        canonicalHost,
        sitemapRouteCount,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
