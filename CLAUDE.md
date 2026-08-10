# ALKOTA CYCLES — REPO CONSTITUTION

## NON-NEGOTIABLES
1. No fabricated claims. Every factual assertion rendered to a user must exist in
   either `src/lib/editorial-claims.ts` (editorial/marketing) or `src/lib/claims/` (engineering)
   with a valid status. No exceptions for "placeholder" or "example" copy.
2. No invented metadata. Never state a file size, page count, revision number,
   elevation, date, measurement, quantity, or price that has not been supplied as
   real. If unknown, omit the field entirely — do not estimate.
3. No placeholder imagery in production paths. No "IMAGE PENDING" or "ASSET PENDING"
   states outside the design archive, which uses them deliberately.
4. No duplicate assets serving different semantic purposes. One image, one meaning.
5. No hardcoded fallback data. If a data source is unavailable, render an explicit
   unavailable state — never synthesise plausible-looking substitute content.
6. Environment variables use Next.js conventions (`NEXT_PUBLIC_` prefix for client
   exposure). Vite conventions (`VITE_`) fail silently in Next.js and are forbidden.
   Any required env var missing at build time must throw (in `src/lib/env.ts`), never default.
7. Verification is by production curl against the deployed URL, never repo state alone.
   Repo completion is NOT deployment completion until verified live.

## PRE-PRODUCTION STATUS
Project 01 is a pre-production development programme. Planned production 2028.
Present tense may only describe things that are currently true. Anything planned,
targeted, or intended must be explicitly future-tense or carry a status qualifier.
Current programme state: R00 engineering baseline. Prototype R&D is NEXT, not current.
Field telemetry and lab fatigue testing have NOT commenced.

## STACK & ANIMATION
- Next.js 15 App Router · Tailwind CSS · Vercel · Supabase (auth/database)
- 3D & Interactive: Three.js, `@react-three/fiber`, `@react-three/drei` (hotspot viewer, configurator).
- UI Animation: Motion (`motion` package) for UI micro-interactions and transitions.
- Scroll & Spy: Browser native smooth scrolling. `IntersectionObserver` is permitted EXCLUSIVELY
  for scroll-spy navigation components (e.g. `ProcessNav.tsx`); it is prohibited for scroll-triggered animation.
- Type tokens: `font-display`, `font-sans`, `font-mono` as configured in `tailwind.config.ts`.
- Colour tokens: `alkota-black`, `alkota-carbon`, `alkota-white`, `alkota-snow`, `alkota-slate`,
  `alkota-signal`. Do not introduce new colours without instruction.

## CLAIMS ARCHITECTURE (TWO-TIER)
1. **Editorial & Marketing Claims** (`src/lib/editorial-claims.ts`): Governs copy assertions rendered
   in marketing and editorial sections. Uses `claim(id)` helper which throws if unregistered.
2. **Engineering Claims** (`src/lib/claims/`): Governs formal engineering specs, test evidence,
   and release readiness gates (`ENGINEERING_CLAIMS` registry).

## LEGAL STATUS GATE & COMMERCE GATING
- `lib/legal-status.ts`: Governs document approval states (`DRAFT` | `UNDER_REVIEW` | `APPROVED`).
- `lib/featureFlags.ts`: `STORE_MODE = 'CATALOGUE'`.
- Commerce Gating: All store and product pages enforce browse-only catalogue mode until all legal
  documents pass approval and `STORE_MODE` is explicitly activated.

## REGIONAL ARCHITECTURE
- All public pages reside under `src/app/[region]/` (`uk` | `us`).
- No region may be hardcoded in component logic. Use `getCompany(region)` for regional identity
  and discriminated union guards (`"companyNumber" in company`) for region-specific company fields.

## DOMAIN & ENVIRONMENT
- Production: `https://alkotacycles.com`
- All canonical URLs, sitemap entries, OG URLs, and structured data derive from `NEXT_PUBLIC_SITE_URL` (in `src/lib/env.ts`).
- Never hardcode a `vercel.app` domain anywhere. `NEXT_PUBLIC_SITE_URL` throws if set to `vercel.app`.

## ROUTE INVENTORY
- **Public Regional Routes** (`src/app/[region]/`): `about` (including `build-process`, `materials`, `philosophy`, `reverse-engineering`, `story`, `testing`), `accessibility`, `ambassadors`, `bikes` (including `project-01`, `project-01/configure`, `project-01/components/[slug]`), `cart`, `complaints`, `configure`, `contact`, `cookies`, `dealers` (301 to `partners`), `demo`, `engineering` (including `chassis`, `kinematics`, `materials`, `testing`), `engineering-philosophy`, `fit`, `journal` (including `[slug]`, `project-01`, `project-01/[slug]`), `legal` (including `notice`, `reservations`), `mission`, `my-alkota`, `order`, `ownership`, `partners` (including `portal`, `portal/login`), `privacy`, `project-01` (including `design-archive`, `design-archive/[artifact]`), `racing` (including `2027`, `dispatch`, `dispatch/[slug]`), `returns`, `road-to-2028`, `safety`, `shipping`, `store` (including `[slug]`), `support` (including `owners`, `technical`, `warranty`), `terms`, `warranty`, `work-with-us`.
- **Studio Admin Routes** (`src/app/studio/`): `/studio` (dashboard), `builds`, `commercial`, `content`, `design`, `design-system` (NOINDEX), `journal`, `login`, `media`, `owners`, `partners`, `production`, `project-01`, `project-01/evidence`, `project-01/release`, `racing`, `registrations`, `reservations`, `settings`, `store`.

