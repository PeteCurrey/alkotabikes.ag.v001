# ALKOTA CYCLES — ANTIGRAVITY IMPLEMENTATION PROMPTS
### Remediation programme derived from audit v001 · production domain: `alkotacycles.com`

---

## HOW TO USE THIS DOCUMENT

Seven phases. Each phase is a **single self-contained prompt** — paste the whole block into Antigravity, including the RULES and VERIFICATION sections.

**Do not run phases in parallel.** Phase 0 establishes the integrity gate that every later phase is checked against. Phase 1 depends on Phase 0's claims registry existing. Phase 4 depends on Phase 1's canonical/sitemap work being correct before URLs move.

**Do not accept a phase as complete without the curl evidence.** AG will report success it has not achieved. Every phase below ends with a VERIFICATION block specifying exact commands whose raw output must be pasted back. Self-reported tables, summaries, and "✅ implemented" checklists are not evidence.

---

# PHASE 0 — REPO CONSTITUTION & INTEGRITY GATE

> **Run first. Nothing else proceeds until this passes.**

```
PROJECT: Alkota Cycles (alkotacycles.com) — Next.js 15 App Router, Tailwind, Vercel.

TASK: Establish the repo constitution and a build-time content integrity gate. Do not
change any page design, layout, or styling in this phase. This is infrastructure only.

CONTEXT
An audit found fabricated and contradictory content shipping live: a duplicate image
presented as alpine field testing, PDF downloads listed with invented file sizes,
contradictory testing-status claims across pages, and contradictory frame-size and
wheel-format specifications. The purpose of this phase is to make that class of error
impossible to ship again.

=== TASK 1: CLAUDE.md ===

Create CLAUDE.md at repo root. This is the permanent constitution for this repo and
must be read at the start of every future session. Contents:

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

=== TASK 2: CLAIMS REGISTRY ===

Create lib/claims.ts:

  export type ClaimStatus =
    | 'VERIFIED'       // true today, evidence required
    | 'PLANNED'        // committed future intent, not yet true
    | 'TARGET'         // design target, may not be achieved
    | 'SUPPLIER_SPEC'; // manufacturer specification, source required

  export interface Claim {
    id: string;              // ALK-CLAIM-001
    text: string;            // the exact assertion
    status: ClaimStatus;
    evidence?: string;       // REQUIRED when VERIFIED or SUPPLIER_SPEC
    surfaces: string[];      // routes where rendered
    reviewedAt: string;      // ISO date
  }

  export const CLAIMS: Claim[] = [];   // SHIPS EMPTY

Export a helper `claim(id: string): Claim` that throws at build time if the id is
not in the registry.

=== TASK 3: BUILD GATE ===

Create scripts/verify-claims.ts, wired into the build as a prebuild step in
package.json. It must FAIL THE BUILD (exit 1) on any of:

  a) A Claim with status VERIFIED or SUPPLIER_SPEC and no non-empty `evidence`.
  b) Duplicate claim ids.
  c) A claim with reviewedAt older than 180 days (staleness warning → error).
  d) Any file under app/ or components/ containing a literal string matching these
     forbidden patterns outside of lib/claims.ts:
       - /\b\d+(\.\d+)?\s?MB\b/         (invented file sizes)
       - /ELEVATION:\s*[\d,]+\s?M/i     (unverified elevation claims)
       - /STATUS:\s*ACTIVE/i            (active-status assertions)
       - /LIFETIME/i within app/support/ (warranty commitments)
     Report file path and line number for each hit.

Also create scripts/verify-assets.ts, run in the same prebuild step. It must:
  - Compute a hash of every file in public/images/**
  - FAIL THE BUILD if two files in public/images share an identical hash
  - FAIL THE BUILD if any file's extension does not match its magic bytes
    (e.g. a JPEG named .png)
  - Print a table of every image with its byte size, and WARN on any source asset
    over 800KB

=== TASK 4: RESOLVE KNOWN ASSET DEFECTS ===

Two confirmed defects, both verified by MD5:

  4a) public/images/engineering-workshop.png and
      public/images/project01-alpine-testing.png are BYTE-IDENTICAL.
      The homepage "REAL TERRAIN VALIDATION / THE FINAL TEST BENCH" section is
      illustrated with the workshop photograph.
      ACTION: delete project01-alpine-testing.png. Replace the homepage section's
      image with an explicit awaiting-asset state consistent with the design archive
      pattern. Do NOT substitute another existing image.

  4b) public/images/project01-naked-carbon-hero.jpg and
      public/images/project01-naked-carbon.png are BYTE-IDENTICAL, and the .png is
      actually JPEG data with a mismatched extension.
      ACTION: delete the .png, update all references to point at the .jpg.

Do not touch any other imagery in this phase.

=== TASK 5: ENV GUARD ===

Create lib/env.ts. Validate NEXT_PUBLIC_SITE_URL at module load. Throw a clear error
if missing or if it contains "vercel.app". Export it typed. Add to .env.example:

  NEXT_PUBLIC_SITE_URL=https://alkotacycles.com

=== RULES ===
- No design, layout, copy or styling changes in this phase.
- CLAIMS array ships EMPTY. Do not pre-populate it with guesses.
- Do not "fix" the contradictory copy yet — Phase 2 handles that. This phase only
  builds the machinery that catches it.

=== VERIFICATION — PASTE RAW OUTPUT, NOT A SUMMARY ===
1. `cat CLAUDE.md | head -40`
2. `cat lib/claims.ts`
3. `npm run build 2>&1 | tail -40`  — must show the claims and asset verifiers running
4. Deliberately break it: add a Claim with status VERIFIED and no evidence, run
   `npm run build`, paste the failure output, then remove it.
5. `md5sum public/images/*.png public/images/*.jpg | sort` — prove no duplicates remain
6. `ls -la public/images/ | grep -i naked-carbon` — prove the mislabelled .png is gone
```

---

# PHASE 1 — TECHNICAL SEO FOUNDATION

> **Depends on Phase 0. This is the single highest-value phase for search.**

```
PROJECT: Alkota Cycles — Next.js 15 App Router. Production domain: https://alkotacycles.com

TASK: Build the technical SEO layer. It is currently absent: no robots.txt, no
sitemap.xml, zero canonical tags across all 34 routes, zero structured data anywhere,
and 16+ routes inheriting the default title.

=== TASK 1: ROBOTS ===

Create app/robots.ts using the MetadataRoute.Robots API.

CRITICAL — environment-aware behaviour:
  - When process.env.VERCEL_ENV === 'production': allow all, declare the sitemap,
    disallow /partners/portal, /my-alkota, /cart, /api.
  - When VERCEL_ENV is anything else (preview, development): return a
    disallow-everything ruleset. The .vercel.app preview must never be crawlable —
    it currently is, which risks the staging URL indexing and competing with
    alkotacycles.com, and exposes pre-production claims.

Sitemap URL must derive from NEXT_PUBLIC_SITE_URL via lib/env.ts. Never hardcode.

=== TASK 2: MIDDLEWARE NOINDEX BACKSTOP ===

Create/extend middleware.ts. If the request hostname is not alkotacycles.com or
www.alkotacycles.com, set the response header:

  X-Robots-Tag: noindex, nofollow

This is a belt-and-braces backstop to robots.ts, because robots.txt is advisory and
the preview domain is already live.

=== TASK 3: SITEMAP ===

Create app/sitemap.ts. Enumerate every public route. Exclude: /partners/portal,
/my-alkota, /cart, and anything noindexed.

Routes must be derived programmatically from the content sources where they are
data-driven (journal entries, design archive artifacts, store products, component
detail pages) — do not hand-maintain a hardcoded list that will drift.

Set changeFrequency and priority sensibly: /bikes/project-01 and /order highest,
legal pages lowest. lastModified must come from real content dates where available.
If a real date is unavailable, omit lastModified — do not synthesise one.

=== TASK 4: PER-ROUTE METADATA ===

These routes currently return the DEFAULT homepage title
("ALKOTA | Performance Engineering") and the identical default description. Every one
needs unique, authored metadata via generateMetadata or an exported metadata object:

  /bikes                          ← thin tier, still needs unique meta
  /bikes/project-01               ← FLAGSHIP PRODUCT PAGE, highest priority
  /bikes/project-01/components/*  ← all component detail pages
  /engineering
  /engineering/chassis
  /engineering/kinematics
  /engineering/materials
  /engineering/testing
  /journal
  /configure
  /support
  /support/owners
  /support/technical
  /support/warranty
  /contact
  /privacy
  /terms
  /cookies

Requirements:
  - Title: unique, under 60 chars, format "<Page> | Alkota Cycles". Note the brand
    string is "Alkota Cycles" or "Alkota Performance Engineering" — NEVER bare
    "Alkota", which collides with an unrelated established industrial manufacturer.
  - Description: unique, 140–158 chars, describing that page specifically.
  - Descriptions must not make claims outside lib/claims.ts.

Also add `alternates: { canonical: ... }` to EVERY route including ones that already
have metadata. Canonical must be the absolute alkotacycles.com URL built from
NEXT_PUBLIC_SITE_URL. Zero routes currently have a canonical tag.

Remove the `keywords` meta tag entirely — it is identical sitewide, ignored by search
engines, and signals templated metadata.

=== TASK 5: STRUCTURED DATA ===

No JSON-LD exists anywhere. Add typed, component-based JSON-LD (not raw string
templates). Create components/schema/ with:

  a) Organization — in root layout. Include name "Alkota Cycles", legalName,
     url, logo, description, and `sameAs` array.
     IMPORTANT: sameAs must contain only REAL profile URLs. The footer currently links
     to bare https://instagram.com / youtube.com / linkedin.com which are placeholders.
     If real profiles do not exist, omit sameAs entirely rather than including
     placeholder URLs.
     Do NOT include address, telephone, or founding date unless supplied as real data.

  b) Product — on /bikes/project-01. Include name, description, brand, image,
     and material/additionalProperty for the R00 baseline specs.
     CRITICAL: do NOT emit an `offers` block. Price is TBC and production is 2028.
     Emitting offers with a fabricated price or availability would be a structured
     data violation and a fabricated claim. Use `releaseDate` if and only if a real
     confirmed date exists — currently it does not, so omit.

  c) FAQPage — on /order, built from the existing 10-question programme FAQ.
     Questions and answers must match the visible page content exactly.

  d) BreadcrumbList — on all nested routes.

  e) Article — on journal entries and racing dispatches. datePublished must be real.
     If real publication dates do not exist in the content source, do not emit
     Article schema at all rather than inventing dates.

=== TASK 6: OPEN GRAPH ===

  - public/og-image.png is currently 1.17MB served raw. Re-export as JPEG under
    200KB. Several platforms drop or downgrade previews above ~1MB.
  - Create distinct OG images for /bikes/project-01, /order, /partners (dealers),
    and /engineering. If source imagery is not available for a route, fall back to
    the default — do not generate a placeholder graphic with invented text.
  - All og:url values must be absolute alkotacycles.com URLs.
  - Set metadataBase in root layout from NEXT_PUBLIC_SITE_URL.

=== TASK 7: SECURITY HEADERS ===

Add to next.config.ts headers(): Content-Security-Policy (report-only initially),
X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin,
Permissions-Policy (deny camera/microphone/geolocation), X-Frame-Options: SAMEORIGIN.
HSTS is already present via Vercel — do not duplicate it.

=== RULES ===
- Every URL derives from NEXT_PUBLIC_SITE_URL. Zero hardcoded domains, zero
  vercel.app references in any emitted markup or schema.
- No metadata description may assert anything not in lib/claims.ts.
- No structured data may contain a price, date, rating, review, or availability
  that has not been supplied as real.

=== VERIFICATION — PASTE RAW CURL OUTPUT ===
Against the deployed preview:

1. `curl -s $URL/robots.txt` — must return disallow-all on preview
2. `curl -s $URL/sitemap.xml | head -60` and `curl -s $URL/sitemap.xml | grep -c "<url>"`
3. `curl -sI $URL/ | grep -i x-robots-tag` — must show noindex on preview
4. For EACH of the 18 routes listed in Task 4, run and paste:
   `curl -s $URL/<route> | grep -o '<title>[^<]*</title>'`
   Every one must be unique. Paste all 18.
5. `for r in / /bikes/project-01 /engineering/chassis /order /partners; do echo "$r"; curl -s $URL$r | grep -o 'rel="canonical"[^>]*'; done`
6. `curl -s $URL/bikes/project-01 | grep -o 'application/ld+json'` — must return a hit
7. `curl -s $URL/bikes/project-01 | python3 -c "import sys,re,json; [print(json.dumps(json.loads(m),indent=2)) for m in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', sys.stdin.read(), re.S)]"`
   — paste the parsed schema. Confirm NO offers block.
8. `curl -s -o /dev/null -w "%{size_download} %{content_type}\n" $URL/og-image.jpg`
9. `curl -sI $URL/ | grep -iE "content-security|x-content-type|referrer-policy|permissions-policy"`
10. `curl -s $URL/ | grep -c "vercel.app"` — must return 0
```

---

# PHASE 2 — FIX THE BREAKS

> **Functional defects and content contradictions. Depends on Phase 0's registry.**

```
PROJECT: Alkota Cycles — Next.js 15 App Router.

TASK: Fix confirmed functional defects and resolve content contradictions.

=== TASK 1: CRITICAL — TABLET NAVIGATION DEAD ZONE ===

In the header component, the desktop nav is `hidden lg:flex` (visible ≥1024px) and
the mobile hamburger is `md:hidden` (visible <768px). Between 768px and 1023px there
is NO NAVIGATION AT ALL — no links and no menu button. This covers iPad portrait
(768), iPad Air portrait (820), iPad Pro 11" portrait (834) and most Android tablets.

FIX: change the hamburger from `md:hidden` to `lg:hidden`.

Then audit every other responsive breakpoint pair in the header for the same class of
gap — the cart button and CTA are `hidden md:flex`, the logo is `hidden md:block`,
the monogram is `md:hidden`. Confirm each breakpoint boundary has exactly one variant
visible at every viewport width. Test at 375, 640, 768, 820, 1024, 1280, 1536.

=== TASK 2: CRITICAL — CONFIGURATOR HAS NO SERVER-RENDERED CONTENT ===

/configure returns only "LOADING PROJECT 01 DIGITAL SHOWROOM..." — zero H1, no
content, no noscript fallback. It is a primary CTA from the homepage, footer and
/order.

FIX: build a server-rendered shell that hydrates:
  - Real <h1>
  - Intro copy explaining what the configurator is and its pre-production status
  - The static R00 specification table (reuse the data already on the homepage
    spec panel — single source it, do not duplicate the literals)
  - The two finish options with real imagery
  - A <noscript> block with the same content and a link to /order

The interactive layer hydrates over this. The page must be fully readable and useful
with JavaScript disabled.

=== TASK 3: BRANDED 404 ===

app/not-found.tsx currently falls through to the stock unstyled Next.js 404.
Build a branded 404: header rail, Alkota voice, and routes to /bikes/project-01,
/engineering, /journal, /order. Also add app/error.tsx for runtime errors.

=== TASK 4: REMOVE DEAD AND PLACEHOLDER UI ===

  4a) /support/owners lists two PDF downloads — "PROJECT 01 CHASSIS USER MANUAL (PDF)
      REV 001 • 4.2 MB" and "TORQUE SPECIFICATION MATRIX (PDF) REV 001 • 1.1 MB".
      Neither file exists, neither has an anchor tag, and the file sizes are invented.
      ACTION: remove both entirely. Replace with an honest statement that owner
      documentation will be published ahead of first delivery.

  4b) Footer social links point to bare https://instagram.com, https://youtube.com,
      https://linkedin.com — no profiles.
      ACTION: remove the social block entirely until real profile URLs are supplied.
      Do not link to placeholder destinations.

  4c) /store product pages display "PHOTOGRAPHY ASSET PENDING".
      ACTION: keep the pending state (it is honest) but restyle it as a deliberate
      designed state consistent with the design archive treatment, not a broken
      image slot.

=== TASK 5: RESOLVE CONTENT CONTRADICTIONS ===

Each of these is a verified contradiction between two live pages. Resolve by making
the pre-production status consistent, and register the resolved claim in lib/claims.ts.

  5a) TESTING STATUS — the homepage asserts "STATUS: ACTIVE TRAIL TESTING" and states
      that alpine telemetry collection "reveals real-world impact forces, chassis
      resonance and mud clearances". The same page's VALIDATION card states lab
      testing is "(PENDING PROTOCOL)" and field telemetry is "(DEVELOPMENT TARGET)".
      The programme rail states prototype R&D is "NEXT", not current.
      RESOLUTION: field testing has NOT commenced. Rewrite the section in future
      tense — this is where R00 will be validated, beginning at prototype phase.
      Change the status readout from ACTIVE to the correct programme state.

  5b) FRAME SIZES — homepage spec panel says "FRAME SIZES: M · L · XL". The /order
      register form offers S, M, L, XL, Unsure.
      RESOLUTION: single-source the size range from one constant. Ask which is
      correct before choosing — do not guess. If unresolved, use the /order set and
      flag it.

  5c) WHEEL FORMAT — homepage spec panel says "WHEEL FORMAT: 29 / 29 PRIMARY".
      Journal Dispatch 002 is titled "WHY MIXED WHEELS: 29 FRONT / 27.5 REAR" and
      argues the engineering case for MX.
      RESOLUTION: these cannot both stand unexplained. Single-source the wheel
      format constant. Flag for a decision — this needs an owner answer, not an
      implementation guess.

  5d) DEALER PROGRAMME DATES — /dealers Stage 01 shows "2024–2025" and simultaneously
      "OPEN NOW". Current date is August 2026. Stage 02 shows "2026–2027".
      RESOLUTION: replace hard year ranges with phase labels (CURRENT / NEXT /
      PLANNED) tied to the same programme-state constant used by the status rail,
      so the timeline cannot drift again.

  5e) FACILITY CLAIMS — the workshop section asserts "5-axis CNC machining & titanium
      hardware assembly", "shock dyno testing", "precision carbon fiber layup control
      & telemetry bench", "linear spectral lighting", "FACILITY / PERFORMANCE
      ENGINEERING LAB — LOCATION: R&D WORKSHOP 01", and "ALPINE R&D / HAUTE-SAVOIE".
      ACTION: extract every one of these into lib/claims.ts as individual claims with
      status left UNSET, and render them behind the claim() helper so the build FAILS
      until each is explicitly categorised as VERIFIED (with evidence) or reframed as
      PLANNED/TARGET. Do not silently downgrade them yourself — surface them for a
      decision.

=== TASK 6: ACCESSIBILITY ===
  - Skip-to-content link as first focusable element in root layout
  - <label> (visually hidden is fine) on the newsletter email input
  - Nav dropdown chevrons imply hover menus — ensure keyboard operability
    (Enter/Space to open, Escape to close, focus trap) and an explicit tap-to-open
    path on touch devices
  - Audit colour contrast against WCAG AA for text-alkota-snow/80, text-alkota-slate,
    and text-alkota-slate/60 on dark backgrounds. Report every failing pair with its
    measured ratio before changing anything.
  - Newsletter and all forms need visible success and error states

=== RULES ===
- Do not invent replacement content for anything removed. Removal plus an honest
  statement beats a plausible substitute.
- 5b and 5c require an owner decision. Implement the single-sourcing mechanism,
  surface the conflict, and stop — do not pick an answer.

=== VERIFICATION ===
1. Screenshots of the header at 375, 768, 820, 1023, 1024, 1280 — nav must be
   reachable at every width
2. `curl -s $URL/configure | grep -o '<h1[^>]*>.*</h1>'` — must return a real H1
3. `curl -s $URL/configure | wc -w` — server-rendered word count, must be substantial
4. `curl -s $URL/nonexistent-page-test | grep -o '<title>[^<]*</title>'` — branded
5. `curl -s $URL/support/owners | grep -iE "MB|PDF"` — must return nothing
6. `curl -s $URL/ | grep -iE "instagram.com|youtube.com|linkedin.com"` — must return nothing
7. `curl -s $URL/ | grep -i "ACTIVE TRAIL TESTING"` — must return nothing
8. `grep -rn "29 / 29\|27.5\|FRAME SIZES" app/ components/ lib/` — prove single-sourced
9. `npm run build` output showing the claims gate failing on unset facility claims
```

---

# PHASE 3 — LEGAL & COMMERCIAL LAYER

> **Contains blockers requiring real data from the owner. AG must fail the build rather than invent.**

```
PROJECT: Alkota Cycles — Next.js 15 App Router.

TASK: Build the legal and commercial compliance layer.

CONTEXT
/privacy is 31 words. /terms is 33 words. /cookies is 21 words. These are not
policies. The site collects, via /order: name, email, telephone, country, postcode,
rider height, rider weight, current bike, riding discipline, terrain preference,
purchase intent and free text. Via the partner form: business name, location,
website, contact name, email, specialisms. No company registration details appear
anywhere on the site. /contact is a form with no email, phone or address.

=== CRITICAL CONSTRAINT: THE UNSUPPLIED-DATA RULE ===

The following values are NOT KNOWN and must NOT be invented under any circumstance:
  - Registered company name and company number
  - Registered office address
  - VAT registration number and VAT status
  - Trading address
  - Contact email addresses and telephone numbers
  - Data protection contact
  - ICO registration number
  - Data retention periods
  - Named third-party processors

Create lib/company.ts exporting a typed COMPANY object with every field above set to
null. lib/env.ts-style validation must throw at build time if any field required by a
rendered component is still null. This means the legal pages CANNOT BUILD until real
values are supplied. That is the intended behaviour. Do not add fallbacks, defaults,
placeholder strings, "TBC", or example values.

=== TASK 1: PRIVACY POLICY ===

Build a structured UK GDPR privacy notice at /privacy, driven by lib/company.ts and a
lib/data-processing.ts registry that enumerates each processing activity:

  interface ProcessingActivity {
    id: string;
    purpose: string;
    dataCategories: string[];
    lawfulBasis: 'consent' | 'contract' | 'legitimate_interests' | 'legal_obligation';
    legitimateInterestsAssessment?: string;  // required if lawfulBasis is LI
    retentionPeriod: string | null;          // null blocks build
    recipients: string[];
    internationalTransfers: boolean;
  }

Enumerate at minimum: Project 01 register, partner applications, newsletter,
store orders, contact form, analytics (if any).

Required sections: controller identity, each processing activity with its lawful
basis, retention, recipients and processors, international transfers, the full set of
data subject rights, how to exercise them, right to withdraw consent, right to
complain to the ICO with the ICO's contact route, and cookies cross-reference.

SPECIFIC: rider height and weight require an explicit stated purpose. Add inline
microcopy at the /order form field: explain that height and weight inform size range
and suspension tune validation, that weight is optional, and that neither is shared.

=== TASK 2: COOKIE POLICY & CONSENT ===

Audit what cookies and storage the site actually sets — including the configurator's
build state persistence, any analytics, and Vercel infrastructure cookies. Build
/cookies from a real inventory: name, purpose, category, duration, first/third party.

If any non-essential cookie is set, implement a consent mechanism that blocks it
until consent, with genuine reject-all parity. If only strictly necessary cookies are
set, state that plainly and do not implement a banner.

Report the actual cookie inventory you find before writing the page.

=== TASK 3: TERMS ===

Build /terms covering: website terms of use, IP ownership, the pre-production nature
of all published specifications, the register's non-contractual status, acceptable
use, limitation of liability, governing law and jurisdiction (England & Wales),
and how changes are notified.

Store terms are separate — see Task 5.

=== TASK 4: WARRANTY — REWRITE ===

/support/warranty currently commits, in 36 words with no terms, to warranting Project
01 carbon frames "against manufacturing defects for the lifetime of the original
owner", plus a crash replacement scheme. There are no exclusions, no definition of
original owner, no transfer terms, no claims process, no registration requirement, no
racing-use exclusion and no governing law — for a product two years from production.

A published warranty is legally enforceable in addition to statutory rights.

ACTION: rewrite as clearly-labelled INTENT, not commitment. State that Alkota intends
to offer a lifetime original-owner frame warranty and a crash replacement scheme, and
that full terms, exclusions and the claims process will be published before any
production sale. Add a prominent note that this page does not constitute a warranty
and that statutory rights are unaffected. Register as status PLANNED in lib/claims.ts.

Flag clearly in your output that this page needs legal review before launch.

=== TASK 5: STORE — DECISION GATE ===

/store lists 8 products at real prices (Workshop Hoodie £120.00) with "ADD TO CART —
PRE-ORDER" and "No payment is taken until dispatch is confirmed". There is no visible
payment processor, no shipping policy, no delivery timescales, no returns policy, no
14-day cancellation right under the Consumer Contracts Regulations, and no VAT
statement.

Implement a single feature flag STORE_MODE: 'WAITLIST' | 'TRANSACTIONAL' in config.

  WAITLIST mode (default until instructed otherwise):
    - Remove cart and add-to-cart entirely
    - Replace with a register-interest capture per product
    - Prices displayed as indicative with an explicit statement
    - No commercial obligations triggered

  TRANSACTIONAL mode requires ALL of the following, and the build must fail if any
  are missing: Stripe integration, shipping policy page, returns and cancellation
  policy including the 14-day right, delivery timescales, VAT position, and store
  terms of sale.

Build WAITLIST fully. Scaffold TRANSACTIONAL behind the failing gate.

=== TASK 6: COMPANY IDENTITY ===

Add a company identity block to the footer, rendered from lib/company.ts: registered
name, company number, registered office, VAT number if registered. Build fails if null.

Rebuild /contact with real contact routes — email at minimum — alongside the form,
plus expected response times. Currently 43 words and a form with no contact details.

=== RULES ===
- Never invent a company number, address, VAT number, email, retention period or
  processor name. Build failure is the correct outcome.
- Do not copy policy text from another site. Generate structure and standard clauses;
  flag every point that needs legal input.
- Output a checklist of every value the owner must supply before this phase can ship.

=== VERIFICATION ===
1. `npm run build 2>&1 | tail -30` — must FAIL with a clear list of missing company fields
2. `cat lib/company.ts` and `cat lib/data-processing.ts`
3. With dummy values injected locally: word counts for /privacy, /terms, /cookies
4. `curl -s $URL/support/warranty | grep -ic "lifetime"` and paste the surrounding
   copy showing it is framed as intent
5. Actual cookie inventory: `curl -sI $URL/ | grep -i set-cookie` plus a report of
   client-side storage used
6. Confirm STORE_MODE=WAITLIST removes all cart routes: `curl -s -o /dev/null -w "%{http_code}" $URL/cart`
7. The owner-supplied-values checklist
```

---

# PHASE 4 — STRUCTURE & CONTENT DEPTH

> **URL changes. Do not run before Phase 1 canonicals and sitemap are verified correct.**

```
PROJECT: Alkota Cycles — Next.js 15 App Router.

TASK: Consolidate information architecture and build content depth.

=== TASK 1: URL CONSOLIDATION WITH 301s ===

  1a) /dealers → /partners
      The nav and footer both say "Partner Network" but link to /dealers, while the
      portal sits at /partners. Two words for one concept, and the recruitment page
      that should rank is on the URL you have chosen not to use.
      NEW STRUCTURE:
        /partners          → partner recruitment (currently /dealers)
        /partners/portal   → partner login (currently /partners)
      301 from /dealers → /partners. Update every internal link and the sitemap.

  1b) /bikes → /bikes/project-01
      /bikes is a 195-word intermediate tier for a deliberately one-platform brand,
      splitting link equity from the page that matters and contradicting the
      "ONE MACHINE" message.
      301 /bikes → /bikes/project-01. Update nav to point directly at the product.

  1c) Ownership cluster consolidation
      /my-alkota, /support, /support/owners, /support/technical, /support/warranty
      are five routes serving owners who cannot exist until 2028.
      Collapse to a single /ownership page describing what ownership will include.
      301 /support/* → /ownership. Keep /support/warranty as its own route (it has
      distinct legal content from Phase 3). Keep /my-alkota — Phase 5 rebuilds it.

  All redirects in next.config.ts as permanent: true. Verify none chain.

=== TASK 2: UNIFY EDITORIAL STREAMS ===

Four parallel content systems exist for three articles: /journal, /journal/project-01,
/racing/dispatch, /project-01/design-archive.

Consolidate to ONE journal at /journal with a tag taxonomy: Chassis, Kinematics,
Materials, Racing, Design Archive, Programme. Every entry gets tags and appears in one
chronological feed with tag filtering.

Keep /project-01/design-archive as a dedicated gallery index (it has a distinct
browsing model), but its entries must also surface in the unified /journal feed.
301 /journal/project-01 and /racing/dispatch to /journal with the relevant tag
pre-applied.

=== TASK 3: ENGINEERING PILLAR PAGES — HIGHEST VALUE CONTENT WORK ===

Current word counts in <main>: /engineering/chassis, /kinematics (98), /materials
(91), /testing — approximately 380 words across four URLs. For a brand whose entire
positioning is engineering authority, these are the only pages that can rank for
high-intent non-brand terms and the most likely to be cited by AI answer engines.

Expand each to 1,200–2,000 words. Target concepts:
  - Chassis: monocoque vs tube-to-tube, fibre orientation and load paths, torsional
    vs lateral stiffness, tuned compliance, threaded BSA vs press-fit, pivot hardware
    and bearing selection, serviceability as a design constraint
  - Kinematics: leverage ratio and progression, anti-squat and pedal feedback,
    anti-rise and brake behaviour, axle path and rearward travel, coil vs air
    implications, why a travel number is a poor proxy for behaviour
  - Materials: high-modulus UD carbon, resin systems, layup schedules, AL7075-T6,
    forged vs billet, Grade 5 titanium in threaded interfaces, impact armour
  - Testing: FEA and its limits, ISO 4210 and beyond-standard fatigue protocols,
    telemetry instrumentation, field validation methodology

CRITICAL CONSTRAINTS:
  - Explain principles, not Alkota achievements. Every sentence about what Alkota
    HAS DONE must be registered in lib/claims.ts. Sentences about how bicycle
    engineering WORKS are general knowledge and need no claim.
  - Where an Alkota decision is described, frame it as a design decision at R00
    baseline, not a validated outcome.
  - No performance figures, test results, or comparative claims of any kind.
  - Diagrams: build as inline SVG components, not images. Where a diagram requires
    real Alkota geometry or kinematics data that has not been supplied, build the
    generic explanatory diagram instead and do not label it as Project 01 data.

=== TASK 4: HOMEPAGE REBALANCE ===

The homepage carries 15+ sections including the 16-hotspot System Explorer — the most
impressive component on the site, currently buried at position two on a page most
visitors will not finish.

  - Move the System Explorer to /bikes/project-01 as the page centrepiece
  - Replace on the homepage with a single compelling entry point
  - Reduce the homepage to: hero, philosophy, engineering pillars, System Explorer
    entry point, story, journal, roadmap, CTA
  - Preserve all GSAP ScrollTrigger scrub behaviour — do not substitute
    IntersectionObserver

=== TASK 5: NAVIGATION ===

Six items to five: Bikes · Engineering · Racing · Journal · About.
Store moves to the utility rail alongside the Project 01 CTA.

=== RULES ===
- Every removed URL gets a 301. Zero 404s from previously live routes.
- Update sitemap.ts and all canonicals to match the new structure in the same commit.
- No new factual claims without registry entries.

=== VERIFICATION ===
1. For each: `curl -s -o /dev/null -w "%{http_code} → %{redirect_url}\n" -L $URL/dealers /bikes /support/owners /journal/project-01 /racing/dispatch`
   — all 301, none chained
2. `curl -s $URL/sitemap.xml | grep -cE "dealers|/bikes<"` — must be 0
3. Word counts: `for r in /engineering/chassis /engineering/kinematics /engineering/materials /engineering/testing; do echo -n "$r "; curl -s $URL$r | python3 -c "import sys,re;from html.parser import HTMLParser" ; done`
   — paste real <main> word counts, each ≥1200
4. `curl -s $URL/bikes/project-01 | grep -c "SYSTEM 01"` — System Explorer present
5. `npm run build` — claims gate passing
6. Screenshots of /engineering/* showing diagrams render
```

---

# PHASE 5 — PORTALS & AUTHENTICATION

> **Contains a security blocker. `/my-alkota` must not go live in its current form.**

```
PROJECT: Alkota Cycles — Next.js 15 App Router + Supabase.

TASK: Build real authentication and scope both portals honestly.

=== TASK 1: CRITICAL SECURITY — REPLACE REFERENCE-BASED ACCESS ===

/my-alkota currently authenticates on "registration reference + email" with no
verification, noting that passwordless links are a later milestone.

This is an enumerable-identifier auth model. If registration references are sequential
or predictable (ALK-0001, ALK-0002…), an attacker can walk the register and read other
people's names, contact details, postcode, height, weight, riding data and stated
purchase intent. This must not ship.

FIX — Supabase Auth passwordless email link (magic link) as the ONLY mechanism for
both /my-alkota and /partners/portal:
  - Remove the reference+email form entirely
  - Email-only entry, magic link sent to the registered address
  - Rate limit link requests per address and per IP
  - Link expiry and single-use enforcement
  - Row Level Security on every table so a session can only ever read its own record
  - Registration references become non-sequential (ULID or similar), and are display
    identifiers only, never an auth factor
  - Route protection in middleware, not client-side conditional rendering
  - Identical response whether or not an email exists in the register — do not leak
    membership

Write and run RLS policy tests proving a session cannot read another user's row.

=== TASK 2: OWNER PORTAL MVP ===

/my-alkota's meta description promises "saved build, fit reference and development
updates". None exist. Build the minimum that makes the promise true:

  - Registration record: submitted date, reference, confirmed preferences
  - Editable preferences (finish, size, discipline, terrain) with an audit trail
  - Position in register, only if the number is real and you are instructed to show it
  - Development update archive — the same content as the email programme
  - Data controls: export my data, delete my registration, manage marketing consent
    (this is a UK GDPR requirement, not a nice-to-have)

Do not display anything that is not real. If there is no build to save yet, say so.

=== TASK 3: PARTNER PORTAL ===

/partners/portal is an unscoped empty door. Since no partners exist yet, build an
honest pre-access state that states what the portal will contain at full partner
status: stock allocation, technical bulletins, warranty claims, marketing assets,
training and certification records, demo machine scheduling.

Same magic-link auth. Access gated on a partner record existing with status ACTIVE.

=== TASK 4: PARTNER APPLICATION FORM — REBUILD ===

The current form collects business name, city, country, website, contact, email,
specialisms and free text. None of that lets you actually shortlist. Add:

  - Years trading, annual turnover band
  - Number of qualified technicians
  - Suspension service: in-house full service / basic / sent out
  - Carbon repair and inspection capability
  - Fit system used (Retül, GebioMized, in-house, none)
  - Existing premium brand portfolio
  - Demo fleet operated (yes/no, scale)
  - Workshop photographs (upload, Supabase storage, size and type validated)
  - Trade references
  - Catchment description

Add a stated response SLA — commit to responding to every application within a fixed
window even when the answer is "not yet". The shops worth having are the busiest ones.

=== TASK 5: TRANSACTIONAL EMAIL ===

Via Resend:
  - Register confirmation with reference and clear next steps
  - Partner application acknowledgement with the SLA restated
  - Magic link emails for both portals
  - Newsletter double opt-in confirmation — required for UK/EU and protects
    deliverability on a list you will depend on for two years
  - Every marketing email: one-click unsubscribe and physical company identity

All templates in Alkota voice, plain and technical. No stock marketing language.

=== TASK 6: POST-SUBMISSION EXPERIENCE ===

The register is the site's primary conversion and its post-submission state is
undefined. Build: a real confirmation page explaining what happens next, the stated
update cadence, the reference and what it is for, and a route into the portal.

Add the cadence commitment to /order itself — a registrant's first question is
"how often will I hear from you and about what". Answer it on the page.

=== RULES ===
- Reference-based auth must be fully removed, not merely deprecated.
- RLS on every table. No table readable without a policy.
- No fabricated register counts, partner counts, or activity feeds.
- Body metric fields (height, weight) carry the Phase 3 purpose microcopy.

=== VERIFICATION ===
1. Paste RLS policies for every table and the passing test output proving
   cross-user reads are denied
2. `curl -s $URL/my-alkota | grep -i "reference"` — the reference input must be gone
3. `curl -s -o /dev/null -w "%{http_code}" $URL/my-alkota/dashboard` without a
   session — must be 401/redirect, not 200
4. Demonstrate identical responses for a registered vs unregistered email at the
   magic-link request endpoint (paste both raw responses)
5. Rate limit proof: 10 rapid link requests, paste the responses
6. Full magic-link round trip: request → email received → link → session → dashboard
7. Export-my-data and delete-my-registration both working, with output
8. Newsletter double opt-in round trip
```

---

# PHASE 6 — LAUNCH READINESS

```
PROJECT: Alkota Cycles — production launch on https://alkotacycles.com

TASK: Domain migration and launch verification. Run only after Phases 0–5 verified.

=== TASK 1: DOMAIN ===

  - Configure alkotacycles.com in Vercel; www → apex 301 (or apex → www, pick one
    and enforce it globally — never both resolving 200)
  - NEXT_PUBLIC_SITE_URL=https://alkotacycles.com in production env only
  - Confirm HSTS, and that no vercel.app URL appears in any rendered output,
    schema, sitemap, canonical, OG tag or email template
  - Preview and development deployments must remain noindex + disallow-all
  - Register the domain in Google Search Console and Bing Webmaster Tools;
    submit the sitemap

=== TASK 2: BRAND ENTITY DISAMBIGUATION ===

"Alkota" as a search term is dominated by Alkota Cleaning Systems, an unrelated US
industrial pressure washer manufacturer trading since 1964 with a worldwide
distributor network. The bare term is not winnable.

  - Audit every <title>, H1, schema name and OG title: the brand string is
    "Alkota Cycles" or "Alkota Performance Engineering". Zero instances of bare
    "Alkota" as a standalone brand reference in metadata.
  - Organization schema: name "Alkota Cycles", with sameAs populated only when real
    social profiles exist
  - Grep the entire repo for bare-brand metadata violations and report every hit

=== TASK 3: ANALYTICS & MONITORING ===

  - Privacy-respecting analytics consistent with the Phase 3 cookie position
  - Conversion events: register submission, partner application, newsletter opt-in
  - Vercel Speed Insights for real-world Core Web Vitals
  - Uptime monitoring on /, /bikes/project-01, /order, /partners
  - Error tracking

=== TASK 4: FULL PRE-LAUNCH SWEEP ===

Produce a single report covering every route:
  - HTTP status, title, description, canonical, H1 count, schema types present
  - Full internal link crawl — zero 404s, zero redirect chains
  - Every image: byte size, format, alt text present and meaningful
  - Lighthouse on /, /bikes/project-01, /engineering/chassis, /order (mobile + desktop)
  - Rendering at 375, 768, 820, 1024, 1440
  - Keyboard-only navigation of every interactive component
  - Screen reader pass on the header, System Explorer and register form
  - JavaScript-disabled pass on every page — confirm the configurator is readable
  - Claims registry: every claim, its status, and its evidence

=== VERIFICATION ===
1. `curl -sI https://alkotacycles.com` and `curl -sI https://www.alkotacycles.com`
   — one canonical host, the other 301
2. `curl -s https://alkotacycles.com/robots.txt` — production ruleset with sitemap
3. `curl -s https://alkotacycles.com/sitemap.xml | grep -c "<url>"`
4. `grep -rn "vercel.app" app/ components/ lib/ public/ next.config.ts` — zero hits
5. `curl -sI https://<preview>.vercel.app | grep -i x-robots-tag` — still noindex
6. The full sweep report from Task 4
7. `npm run build` — claims and asset gates passing, printed
```

---

## SEQUENCING NOTES

**Phase 0 and Phase 1 can be treated as one working session** — Phase 0 is mostly
infrastructure and Phase 1 is mostly mechanical. Together they resolve the four
highest-severity findings except the tablet nav bug.

**If you want the fastest risk reduction**, pull these four items forward into a
single hotfix ahead of Phase 0: the hamburger breakpoint (`md:hidden` → `lg:hidden`),
deleting the duplicated alpine testing image, taking `/my-alkota` offline until Phase
5, and reframing the warranty page. Those are the four things I would not leave live
for another week.

**Phase 3 will stall.** It is designed to. The build failing for want of a company
number is the correct outcome — it just means that phase needs your input before AG
can finish it. Worth gathering the company details, cookie decisions and store mode
answer before starting it.

**Two decisions AG cannot make for you**, both surfaced in Phase 2: the frame size
range (M·L·XL or S·M·L·XL) and the wheel format (29/29 or MX). The wheel one matters
more — you have a published journal piece arguing the engineering case for mixed
wheels sitting next to a spec panel that says 29/29.
