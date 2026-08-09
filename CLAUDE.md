# ALKOTA CYCLES — REPO CONSTITUTION

## NON-NEGOTIABLES
1. No fabricated claims. Every factual assertion rendered to a user must exist in
   lib/claims.ts with a status. No exceptions for "placeholder" or "example" copy.
2. No invented metadata. Never state a file size, page count, revision number,
   elevation, date, measurement, quantity, or price that has not been supplied as
   real. If unknown, omit the field entirely — do not estimate.
3. No placeholder imagery in production paths. No "IMAGE PENDING" or "ASSET PENDING"
   states outside the design archive, which uses them deliberately.
4. No duplicate assets serving different semantic purposes. One image, one meaning.
5. No hardcoded fallback data. If a data source is unavailable, render an explicit
   unavailable state — never synthesise plausible-looking substitute content.
6. Environment variables use Next.js conventions (NEXT_PUBLIC_ prefix for client
   exposure). Vite conventions (VITE_) fail silently in Next.js and are forbidden.
   Any required env var missing at build time must throw, never default.
7. Verification is by production curl output, never self-report.

## PRE-PRODUCTION STATUS
Project 01 is a pre-production development programme. Planned production 2028.
Present tense may only describe things that are currently true. Anything planned,
targeted, or intended must be explicitly future-tense or carry a status qualifier.
Current programme state: R00 engineering baseline. Prototype R&D is NEXT, not current.
Field telemetry and lab fatigue testing have NOT commenced.

## STACK
Next.js 15 App Router · Tailwind · Vercel · Supabase (auth/data)
Animation: GSAP ScrollTrigger with scrub. Never IntersectionObserver.
Smooth scroll: Lenis.
Type tokens: font-display / font-sans / font-mono as already configured.
Colour tokens: alkota-black, alkota-carbon, alkota-white, alkota-snow, alkota-slate,
alkota-signal. Do not introduce new colours without instruction.

## DOMAIN
Production: https://alkotacycles.com
All canonical URLs, sitemap entries, OG URLs and structured data derive from
NEXT_PUBLIC_SITE_URL. Never hardcode a vercel.app domain anywhere.
