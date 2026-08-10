/**
 * ALKOTA CYCLES — ENV GUARD
 *
 * Validates NEXT_PUBLIC_SITE_URL at module load.
 *
 * Rules (CLAUDE.md §6):
 *   - Throws if NEXT_PUBLIC_SITE_URL is unset or empty.
 *   - Throws if it contains "vercel.app" — canonicals must point at a real domain.
 *   - Strips surrounding quotes, whitespace, and trailing slashes before validation.
 *
 * To fix a failing preview build, set NEXT_PUBLIC_SITE_URL to a real domain
 * (e.g. a staging subdomain) in the Vercel environment variable panel —
 * do NOT use the vercel.app deployment URL.
 */

const raw = process.env.NEXT_PUBLIC_SITE_URL;

if (!raw || raw.trim() === "") {
  throw new Error(
    "[ALKOTA ENV] NEXT_PUBLIC_SITE_URL is not set. " +
      "Set it to https://alkotacycles.com (production) or a staging domain (preview) " +
      "in your Vercel environment variables."
  );
}

const sanitized = raw
  .trim()
  .replace(/^["']|["']$/g, "")
  .trim()
  .replace(/\/$/, "");

if (sanitized.includes("vercel.app")) {
  throw new Error(
    "[ALKOTA ENV] NEXT_PUBLIC_SITE_URL must not contain \"vercel.app\": " +
      sanitized +
      ". Canonical URLs must point at a real domain, not a Vercel preview hostname. " +
      "Set NEXT_PUBLIC_SITE_URL to https://alkotacycles.com or a staging domain."
  );
}

export const siteUrl: string = sanitized;

export default siteUrl;
