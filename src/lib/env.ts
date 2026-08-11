/**
 * ALKOTA CYCLES — ENV GUARD
 *
 * Single source of truth for the canonical site URL.
 *
 * NEXT_PUBLIC_SITE_URL MUST be set in Vercel → Settings → Environment Variables
 * for every environment that produces a deployment. It must be an absolute https://
 * URL pointing at the verified deployment domain.
 *
 * Build FAILS (throws) if:
 *   - NEXT_PUBLIC_SITE_URL is unset or empty
 *   - NEXT_PUBLIC_SITE_URL is not an absolute https:// URL
 *   - NEXT_PUBLIC_SITE_URL contains "vercel.app"
 *
 * There is NO fallback. A missing SITE_URL is a deployment configuration error,
 * not a recoverable state. A canonical pointing at the wrong host is the single
 * most damaging SEO defect available.
 */

const raw = process.env.NEXT_PUBLIC_SITE_URL;

const sanitized = (raw || "")
  .trim()
  .replace(/^["']|["']$/g, "")
  .trim()
  .replace(/\/$/, "");

if (!sanitized) {
  throw new Error(
    "[ALKOTA FATAL] NEXT_PUBLIC_SITE_URL is not set. " +
      "Set it in Vercel → Settings → Environment Variables for every environment. " +
      "Example: https://alkotacycles.avorria.com"
  );
}

if (sanitized.includes("vercel.app")) {
  throw new Error(
    `[ALKOTA FATAL] NEXT_PUBLIC_SITE_URL contains "vercel.app" (${sanitized}). ` +
      "Vercel deployment URLs must never appear as canonicals. " +
      "Set NEXT_PUBLIC_SITE_URL to a real domain in Vercel environment variables."
  );
}

if (!sanitized.startsWith("https://")) {
  throw new Error(
    `[ALKOTA FATAL] NEXT_PUBLIC_SITE_URL is not an absolute https:// URL (${sanitized}). ` +
      "Canonical URLs must use https://."
  );
}

/** Canonical site URL — no trailing slash. Derived exclusively from NEXT_PUBLIC_SITE_URL. */
export const SITE_URL: string = sanitized;

/** Alias for SITE_URL — kept for backward compatibility with existing imports. */
export const siteUrl: string = SITE_URL;

export default SITE_URL;
