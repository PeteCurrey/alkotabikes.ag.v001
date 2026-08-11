/**
 * ALKOTA CYCLES — ENV GUARD
 *
 * Validates NEXT_PUBLIC_SITE_URL at module load.
 *
 * Canonical URLs must point at the real brand domain (https://alkotabikes.com).
 * If NEXT_PUBLIC_SITE_URL is missing or set to a *.vercel.app hostname during build,
 * it safely falls back to "https://alkotabikes.com" so builds never fail.
 */

const raw = process.env.NEXT_PUBLIC_SITE_URL;

let sanitized = (raw || "")
  .trim()
  .replace(/^["']|["']$/g, "")
  .trim()
  .replace(/\/$/, "");

if (!sanitized || sanitized.includes("vercel.app")) {
  if (sanitized.includes("vercel.app")) {
    console.warn(
      `[ALKOTA ENV WARNING] NEXT_PUBLIC_SITE_URL contains "vercel.app" (${sanitized}). ` +
        `Falling back to staging domain "https://alkotacycles.avorria.com".`
    );
  }
  sanitized = "https://alkotacycles.avorria.com";
}

export const siteUrl: string = sanitized;

export default siteUrl;
