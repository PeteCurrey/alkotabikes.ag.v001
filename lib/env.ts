/**
 * ALKOTA CYCLES — ENV GUARD
 *
 * Validates NEXT_PUBLIC_SITE_URL at module load.
 * Throws a clear error if missing or if it contains a vercel.app domain.
 * Import this module in layout.tsx or any root-level server component to
 * guarantee it runs on every deployment.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!SITE_URL) {
  throw new Error(
    '[ALKOTA ENV] NEXT_PUBLIC_SITE_URL is not set. ' +
    'Add NEXT_PUBLIC_SITE_URL=https://alkotacycles.com to your environment. ' +
    'See .env.example for all required variables.'
  );
}

if (SITE_URL.includes('vercel.app')) {
  throw new Error(
    '[ALKOTA ENV] NEXT_PUBLIC_SITE_URL contains "vercel.app": ' + SITE_URL + '. ' +
    'Vercel preview URLs must never be used as canonical URLs. ' +
    'Set NEXT_PUBLIC_SITE_URL=https://alkotacycles.com in Vercel environment variables.'
  );
}

// Strip trailing slash for consistent URL construction
export const siteUrl: string = SITE_URL.replace(/\/$/, '');

export default siteUrl;
