/**
 * ALKOTA CYCLES — ENV GUARD
 *
 * Validates NEXT_PUBLIC_SITE_URL at module load.
 * Robustly strips any quotes, whitespace, and trailing slashes.
 */

const rawEnv = process.env.NEXT_PUBLIC_SITE_URL || "https://alkotacycles.com";
const sanitizedUrl = rawEnv
  .trim()
  .replace(/^["']|["']$/g, "")
  .trim()
  .replace(/\/$/, "");

if (sanitizedUrl.includes("vercel.app")) {
  console.warn(
    '[ALKOTA ENV WARNING] NEXT_PUBLIC_SITE_URL contains "vercel.app": ' + sanitizedUrl + '. ' +
    'Set NEXT_PUBLIC_SITE_URL=https://alkotacycles.com in Vercel environment variables.'
  );
}

export const siteUrl: string = sanitizedUrl || "https://alkotacycles.com";

export default siteUrl;

