# Alkota Cycles — Staging-as-Production Addendum
## Antigravity Prompt Pack v2.1

**Verification domain, effective immediately:** `https://alkotacycles.avorria.com`

This supersedes every `alkotacycles.com` reference in the earlier packs. That domain has no DNS record at all — it does not resolve. Neither does `alkotabikes.com`.

---

## LIVE CHECK — 11 Aug 2026, 19:21 UTC

Run against the staging domain before writing these prompts.

| Route | Result |
|---|---|
| `/` | 302 → `/us` |
| `/us` | 200 |
| `/uk` | 200 |
| `/admin` | 307 → `/admin/login?from=%2Fadmin` |
| `/admin/login` | 200 |
| `/journal` | 302 → `/us/journal` |
| `/store` | 302 → `/us/store` |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |

Auth is working — `/admin` correctly refuses unauthenticated access. That part is genuinely done.

### Finding 1 — Zero Supabase image references. Confirms R2.

Every image on `/us` is served from the repo:

```
/_next/image?url=%2Fimages%2Fproject01-glacier-white-hero.jpg
/_next/image?url=%2Fimages%2Fstory%2Fhaute-savoie-alpine-field-test.jpg
/_next/image?url=%2Fimages%2Fstory%2Flaboratory-stress-fatigue-bench.jpg
/_next/image?url=%2Fimages%2Fstory%2Fframe-development-mould-tooling.jpg
...
```

`grep -c supabase` on the rendered page returns **0**. Eleven content images on the homepage alone, none of them database-backed. The media library isn't empty because of a UI bug — the CMS layer was never connected to anything.

### Finding 2 — A stale cached page served a canonical pointing at a dead domain.

First uncached fetch of `/us` returned:

```html
<link rel="canonical" href="https://alkotabikes.com/us"/>
<link rel="alternate" hrefLang="en-GB" href="https://alkotabikes.com/uk"/>
```

Cache-busted fetches return the correct host. So it's a stale render from a deploy when the site URL variable was `alkotabikes.com` — served from `x-vercel-cache: HIT`, not a live misconfiguration.

It still matters: a page was served, to a real client, declaring its canonical to be a domain with no DNS. That's the EntireFM failure class arriving through a different door. Needs a build assert, not a manual re-check.

### Finding 3 — `robots.txt` is `Disallow: /`. Correct, and it must stay that way.

The entire site is blocked from crawling. That's right for a staging domain and it should not change while you're on it. But it means "treat as live launch" cannot include SEO validation — you're verifying that the *machinery* emits correct output, not that anything is indexed. Needs an explicit, deliberate flip at real launch.

### Finding 4 — One transient 503 on `/`.

```
upstream connect error ... TLS_error: certificate verification error
at depth 0: certificate has expired
```

No `server: Vercel` header on that response — it came from a proxy layer in front. One occurrence in thirteen root requests; twelve subsequent hits were clean 302s. Probably an edge node with a stale cert on the `avorria.com` chain. Not urgent, but if you see intermittent failures, that's the cause and it isn't the app.

---

# R0 — DOMAIN, ENVIRONMENT AND CRAWL GATE

Run this before R1. It's quick and it protects everything downstream.

### PROMPT

```
R0 — DOMAIN CONFIGURATION, CANONICAL INTEGRITY AND CRAWL GATE

CONTEXT

The verification domain is now https://alkotacycles.avorria.com. It is being
treated as the production deployment for the purposes of feature verification.
Neither alkotacycles.com nor alkotabikes.com currently has a DNS record —
do not reference either in code, config, metadata or documentation.

OBSERVED DEFECT

A cached render of /us was served with:
  <link rel="canonical" href="https://alkotabikes.com/us"/>
  <link rel="alternate" hrefLang="en-GB" href="https://alkotabikes.com/uk"/>

Fresh requests return the correct host, so this is a stale artefact from a
deploy under a previous site URL. A page was nonetheless served to a client
declaring its canonical to be a domain that does not resolve. A canonical
pointing at a non-existent host is the single most damaging SEO defect
available, and this portfolio has already lost traffic to a canonical bug
once. Fix it structurally.

REQUIRED WORK

1. SINGLE SOURCE OF TRUTH FOR SITE URL

   - Audit every occurrence of alkotabikes.com and alkotacycles.com in the
     repo — code, env files, metadata exports, JSON-LD, OG tags, email
     templates, sitemap generation, seed data, docs. List every hit with its
     file path before changing anything.
   - Consolidate to one exported constant, `SITE_URL`, resolved once from
     NEXT_PUBLIC_SITE_URL. No other module may construct an absolute URL from
     a literal string.
   - Set NEXT_PUBLIC_SITE_URL=https://alkotacycles.avorria.com in the Vercel
     production environment. Confirm which environments it is set in and
     paste the list.
   - Add a startup assertion: if NEXT_PUBLIC_SITE_URL is unset, or does not
     parse as an absolute https URL, the build fails with a clear message.
     Never fall back to a default domain. A silent fallback is how the wrong
     canonical shipped.

2. CANONICAL HOST BUILD ASSERT

   Write `scripts/check-canonical-host.ts`, run in CI after build:
     - Render or crawl every static route
     - Extract canonical, og:url, every hreflang alternate, and every URL in
       the sitemap
     - FAIL the build if any host does not exactly equal the SITE_URL host
     - FAIL if any two distinct routes emit an identical canonical
     - FAIL if any hreflang alternate is missing its reciprocal
     - Print a table of route → canonical so a mismatch is visible in the log

   This is the guard that makes Finding 2 structurally impossible to repeat.

3. CACHE PURGE ON DOMAIN CHANGE

   Document, in docs/DEPLOYMENT.md, the procedure for changing the site
   domain, including a full cache purge. Then execute it now and confirm no
   route serves a stale host. Verify with cache-busted requests across every
   route in the sitemap and paste the canonical from each.

4. CRAWL GATE

   robots.txt currently returns `Disallow: /`. This is correct for the staging
   domain and MUST remain in force. Make it deliberate rather than incidental:

     - Drive robots output from an env var, ALLOW_INDEXING, default FALSE.
     - When FALSE: Disallow: / AND an X-Robots-Tag: noindex, nofollow response
       header on every route AND a <meta name="robots" content="noindex">.
       Belt and braces — a robots.txt alone does not prevent indexing of a URL
       discovered through a link.
     - When TRUE: normal robots with /admin, /api, /preferences and any
       preview route disallowed.
     - Surface the current indexing state prominently on /admin/health and in
       the admin top bar. I must never be uncertain whether the site is
       crawlable.
     - Keep the sitemap generating regardless, so I can verify its correctness
       before launch.

   Do NOT set ALLOW_INDEXING=true. That is a launch decision and it is mine.

5. ENVIRONMENT BADGE

   The admin currently shows no indication of which environment it is. Add a
   persistent badge in the admin top bar showing the deployment host and the
   short git SHA, read from VERCEL_URL and VERCEL_GIT_COMMIT_SHA. Every
   screenshot I take should be self-identifying.

6. INTERMITTENT 503 — INVESTIGATE AND REPORT

   One request to / returned a 503 with:
     "upstream connect error ... TLS_error ... certificate has expired"
   with no `server: Vercel` header, so it originated from a proxy in front of
   Vercel. Twelve subsequent requests were clean.

   Check whether alkotacycles.avorria.com is proxied — Cloudflare or similar —
   and whether the certificate chain on that layer is valid and current.
   Report what you find. If it is proxied, tell me what the proxy is and
   whether it is in front of Vercel by design. Do not attempt to change DNS.

VERIFICATION — paste raw output
  a. The full list of alkotabikes.com / alkotacycles.com hits found in step 1
  b. curl -s https://alkotacycles.avorria.com/us | grep -E 'canonical|hreflang'
  c. Same for /uk
  d. curl -s https://alkotacycles.avorria.com/sitemap.xml | head -30
  e. curl -sI https://alkotacycles.avorria.com/us | grep -i x-robots-tag
  f. The canonical host check output showing the full route → canonical table
  g. Deliberately break one canonical and paste the CI failure
```

---

# GLOBAL PATCH TO THE EXISTING PACKS

Apply to the main pack, the configurator pack and v2 remediation.

### Find and replace

```
https://alkotacycles.com     ->     https://alkotacycles.avorria.com
<production-domain>          ->     alkotacycles.avorria.com
```

### Locale prefix

Every public route verification must account for locale routing. `/` redirects to `/us`; there is no unprefixed content route. So:

| Old | New |
|---|---|
| `curl .../journal` | `curl .../uk/journal` and `curl .../us/journal` |
| `curl .../store` | `curl .../uk/store` and `curl .../us/store` |
| `curl .../build/[model]` | `curl .../uk/build/[model]` and `curl .../us/build/[model]` |

Both locales must be verified for every public feature. A feature that works on `/us` and 404s on `/uk` is not delivered — and given this is a Chesterfield company, `/uk` breaking is the worse of the two.

Admin routes are not locale-prefixed. `/admin/*` stays as-is.

### Replacement verification protocol

Give AG this at the start of every session, replacing the earlier version:

```
VERIFICATION PROTOCOL — NON-NEGOTIABLE

Verification domain: https://alkotacycles.avorria.com
This domain is treated as production. Vercel preview URLs
(*.vercel.app) are NOT acceptable evidence for any claim.

"Done" means live on the verification domain and proven with pasted raw
output:

  1. git log -1 --oneline
  2. The Vercel deployment ID and its status
  3. curl -sI https://alkotacycles.avorria.com/<route>  — full headers
  4. curl -s  https://alkotacycles.avorria.com/<route> | grep -A3 "<change>"
  5. For public routes: BOTH /uk and /us variants
  6. For schema changes: migration filename plus a query result showing the
     new state
  7. For admin changes: a screenshot taken on alkotacycles.avorria.com with
     the environment badge visible

Cache discipline: append a cache-buster (?cb=<timestamp>) or send
Cache-Control: no-cache on every verification request. A stale cached page
already produced one false reading on this project — a canonical pointing at
a dead domain was served from cache while the live config was correct. Do not
verify against cache.

NOT acceptable as evidence:
  - "The changes are now live" / "This should now work"
  - localhost:3000 output
  - Any *.vercel.app URL
  - Build logs without a deployment
  - A description of what the output would show
  - A summary of the diff

If deployment failed, say so and paste the error.
```

---

# ADDITION TO R2 — IMAGE PROVENANCE

Insert into R2 Step 1, before the audit is produced. This one needs your judgement more than AG's.

### PROMPT INSERT

```
STEP 1b — IMAGE PROVENANCE CLASSIFICATION (MANDATORY)

The current image set includes filenames that make implicit factual claims
about this company's operations:

  /images/story/haute-savoie-alpine-field-test.jpg
  /images/story/laboratory-stress-fatigue-bench.jpg
  /images/story/frame-development-mould-tooling.jpg
  /images/story/component-development-bench.jpg
  /images/story/engineering-design-meeting.jpg
  /images/story/technical-cad-engineering-material.jpg
  /images/project01-glacier-white-hero.jpg
  /images/project01-naked-carbon-hero.jpg

Read together with their on-page context, these assert that Alkota Cycles has
conducted alpine field testing in Haute-Savoie, operates or commissions
laboratory fatigue testing, and holds frame mould tooling. For a
pre-production brand, a photograph is a claim. Stock or generated imagery
presented as the company's own operations is fabricated evidence, and it
carries more weight with a reader than a sentence would.

For EVERY image in the audit, add a provenance column with one of:

  own_alkota       photographed or rendered by or for Alkota Cycles, of
                   Alkota's actual people, product, facilities or activity
  own_generic      owned or licensed, depicts no specific claim
  licensed_stock   third-party stock, licence held
  ai_generated     synthesised
  unknown          provenance cannot be established

Then add a claim column: does the image, in the context of the page it sits
on, assert something about Alkota's operations, testing, tooling, facilities,
personnel or product that would need to be true?

DO NOT GUESS. Where you cannot establish provenance from the repo, git
history, or file metadata, mark it `unknown` and say so. Do not infer
provenance from the filename — the filename is what created the problem.

Flag for my decision, as a distinct section of the audit, every image where
provenance is not own_alkota AND the claim column is yes. I will decide
individually whether each one stays, is recaptioned, or is removed. Do not
remove anything yourself and do not soften any caption without asking.

Carry provenance through into media_assets as a column alongside licence.
Extend the build gate: an asset with provenance in ('unknown','ai_generated',
'licensed_stock') AND claim = true cannot be referenced by a published
content_slot. Fail the build naming the slot.
```

---

## REVISED SEQUENCE

| | Prompt | Notes |
|---|---|---|
| 1 | **R0** domain, canonical, crawl gate | New. Do first — it protects every later verification |
| 2 | R1 admin layout isolation | Small, blocking for review clarity |
| 3 | R3 sidebar honesty | Trivial, bundle with R1 |
| 4 | **R2** media backfill + page CMS, with Step 1b | The main deliverable |
| 5 | R4 blog | Needs R2 |
| 6 | R5 newsletter | Needs R4 |
| 7 | R6 commerce | Needs R2 and your Path A/B decision |

---

## ONE THING TO DECIDE

`x-default` hreflang currently points at `/us`, and `/` redirects to `/us`.

For a Chesterfield-registered company with UK-first legal exposure and a UK trademark position still open, US-as-default is a choice worth making deliberately rather than inheriting from a geo-detection default. It affects which market's legal terms a first-time visitor sees, and if the trademark question resolves differently in the two jurisdictions it may matter more than a UX preference.

Tell AG which you want and it's a small change. Leave it and it stays US.
