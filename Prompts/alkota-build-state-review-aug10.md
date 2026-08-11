# ALKOTA CYCLES — BUILD STATE REVIEW
### Repo `alkotabikes.ag.v001` + live `alkotabikes-ag-v001.vercel.app` · 10 August 2026
### UK and US regions verified against production

---

# 1. WHERE YOU ARE

**The deployment gap is closed.** This was the blocking finding last time — the repo had region routing and production didn't. That's resolved:

```
/                      → 302 → /us        ✅
/uk                    → 200              ✅
/us                    → 200              ✅
/uk/bikes/project-01   → 200              ✅
robots.txt             → Disallow: /      ✅ (correct on preview)
X-Robots-Tag           → noindex, nofollow ✅
```

Cookie override works correctly (`alkota-region=uk` → `/uk`), and the caching is right: `Vary: Cookie, x-vercel-ip-country` with `cache-control: no-store`. That's the detail most people get wrong — without it a CDN serves one visitor's regional redirect to another.

One note on geo: I can't verify IP detection from here because Vercel overwrites `x-vercel-ip-country` server-side, so a spoofed header is ignored. The cookie path works, the `Vary` header is correct, and the middleware logic reads correctly — but **test the actual GB→/uk redirect from a UK connection yourself** before launch. It's the one thing I can't confirm remotely.

## What's landed since the last review

| | Status |
|---|---|
| Region routing, both trees | ✅ live |
| Root 302 + cookie override + Vary | ✅ correct |
| robots.txt hostname gate | ✅ correct |
| Title brand doubling | ✅ fixed |
| Sitemap | ✅ 178 URLs, 534 xhtml alternates (exact 3×) |
| Asset weight | ✅ 69MB → **21MB** |
| `CLAUDE.md` constitution drift | ✅ resolved — now describes Three.js/R3F, motion, and permits IntersectionObserver *exclusively* for scroll-spy. One usage, consistent. |
| Root `lib/` vs `src/lib/` duplication | ✅ consolidated |
| `partnerTerms.ts` | ✅ 20% / 17% as specified |
| US company placeholders | ✅ `PLACEHOLDER — ` prefixed, greppable |
| `pricing.ts` architecture | ✅ excellent — rules documented in-file |
| Feature flags | ✅ all conservative (`STORE_MODE=CATALOGUE`, reservations off, portal off) |

**The legal divergence is real, not cosmetic.** I checked this specifically because it's the thing most likely to be faked:

- `/us/returns` states *"Contractual voluntary return policy (no statutory 14-day cancellation right)"* — correct, and correctly framed
- `/us/warranty` carries the Magnuson-Moss "Limited Warranty" designation
- `/us/privacy` has state Attorney General contact, GPC signal support, Do Not Sell/Share
- `/uk/privacy` has ICO, no Attorney General
- `/us/safety` references CPSC 16 CFR 1512; `/uk/safety` references ISO 4210

That's genuinely correct regional legal work.

The partner infrastructure is also far more built out than I expected — `catchment.ts`, `demoTypes.ts`, `leadTypes.ts`, `warrantyTypes.ts`, `trainingModules.ts`, `bulletinTypes.ts`, `pdiTypes.ts`, `documentLibrary.ts`. That's the whole portal spine.

---

# 2. CRITICAL — FIX BEFORE ANY LAUNCH

## 2.1 Canonicals strip the region on 65 of 82 pages

This is the serious one.

```
/uk/order                  → canonical: https://alkotacycles.com/order        ❌
/us/order                  → canonical: https://alkotacycles.com/order        ❌
/uk/bikes/project-01       → canonical: https://alkotacycles.com/bikes/project-01  ❌
/us/bikes/project-01       → canonical: https://alkotacycles.com/bikes/project-01  ❌
/uk/engineering/kinematics → canonical: https://alkotacycles.com/engineering/kinematics ❌
/uk/store, /uk/journal     → same pattern                                     ❌

/uk, /us, /uk/privacy, /us/privacy, /us/partners                              ✅ correct
```

**Both regions canonicalise to a URL that doesn't exist.** Google would consolidate `/uk/order` and `/us/order` onto `/order`, find a 404, and drop both. This is the exact failure I flagged in Phase 7A — worse than pointing one region at the other, because the target is dead.

**Root cause, confirmed in repo:** only 17 of 82 pages use `generateMetadata`. The other 65 use a static `export const metadata` object with a hardcoded path:

```ts
// src/app/[region]/order/page.tsx
export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/order` },   // ← no region, can't have one
  openGraph: { url: `${siteUrl}/order` },          // ← same bug
};
```

A static metadata object **cannot** access route params. It's structurally incapable of building a region-aware canonical. And there is no shared metadata helper anywhere in the repo — every page hand-rolls it, which is why 17 got it right and 65 didn't.

## 2.2 hreflang missing on the same 65 pages

Same root cause, same fix.

```
/uk                    → 3 hreflang tags   ✅
/us/privacy            → 3 hreflang tags   ✅
/uk/order              → 0                 ❌
/uk/bikes/project-01   → 0                 ❌
```

The sitemap alternates are perfect (534 = 178 × 3), but Google needs the page-level annotations to agree. Non-reciprocal or missing hreflang fails silently.

*Not a bug, in case it looks like one:* the tags render as `hrefLang="en-GB"` (camelCase, React prop naming leaking through). HTML attribute names are case-insensitive, so this parses correctly. Worth normalising for tidiness, but it isn't breaking anything.

## 2.3 The US store displays £ prices

`/us/store` renders £45.00, £55.00, £120.00. GBP prices on US region pages.

This directly violates the rule written into `pricing.ts` itself:

> **5. CURRENCY MUST MATCH REGION.** GBP prices only on UK pages; USD prices only on US pages. The `formatPrice` function enforces this at runtime; build-time validation in `scripts/validate-prices.ts` enforces it at build.

**Root cause:** the store bypasses the pricing architecture entirely. `src/content/store/products.ts` has no `currency` or `amountMinor` fields — prices are hardcoded display strings that never pass through `formatPrice()`. Which is a shame, because `formatPrice()` *does* call `assertPriceCurrencyMatchesRegion()` and would have caught this.

## 2.4 `scripts/validate-prices.ts` does not exist

The file referenced in that same comment was never created, and isn't in the `prebuild` chain:

```
"prebuild": "tsx scripts/verify-claims.ts && tsx scripts/verify-assets.ts && tsx scripts/placeholder-report.ts"
```

So the rule is documented, the enforcement is claimed, neither exists, and the violation is live. This is the pattern the whole integrity architecture was built to prevent — worth fixing properly rather than just correcting the prices.

## 2.5 `/faq` and `/glossary` 404 in both regions

Footer links to both. Both 404. Root cause is clean:

```
src/app/[region]/faq/       → FAQClient.tsx only, no page.tsx
src/app/[region]/glossary/  → GlossaryClient.tsx only, no page.tsx
```

The client components were built; the server page that renders them was never created.

---

# 3. MEDIUM

**`og-image.png` is still 1.2MB.** Served raw, not through `next/image`. Should be JPEG under 200KB — several platforms drop previews above ~1MB. 17 files remain over 400KB.

**`/uk/cart` and `/us/cart` return 200 under `STORE_MODE=CATALOGUE`.** "Add to cart" is correctly absent from the store (0 occurrences), so this is likely an empty-state page rather than a live cart — but Phase 3-R specified the cart route should not exist under CATALOGUE. Worth confirming there's no reachable mutation endpoint behind it.

**`legal-status.ts` has zero region awareness.** Phase 7B specified `commerceEnabled` resolving *per region*, so UK documents could be APPROVED while US stay DRAFT. Currently one global status. Not urgent while everything is DRAFT, but it'll bite the moment UK is ready to transact and US isn't.

---

# 4. HOTFIX PROMPT

```
PROJECT: Alkota Cycles — Next.js 15 App Router. Repo alkotabikes.ag.v001

TASK: Five defects verified against the live deployment. Two would deindex the site.

=== TASK 1: CRITICAL — REGION-AWARE METADATA HELPER ===

65 of 82 pages emit a canonical that STRIPS the region prefix, and omit hreflang
entirely. Verified live:

  /uk/order            → canonical https://alkotacycles.com/order      ← does not exist
  /us/order            → canonical https://alkotacycles.com/order      ← same URL
  /uk/bikes/project-01 → canonical https://alkotacycles.com/bikes/project-01
  /uk/engineering/kinematics, /uk/store, /uk/journal → same pattern

Both regions consolidate onto URLs that 404. Google would drop both trees.

ROOT CAUSE: those pages use a static `export const metadata` object with a hardcoded
path (`canonical: \`${siteUrl}/order\``). A static metadata object cannot access route
params, so it is structurally incapable of being region-aware. The 17 pages that use
generateMetadata are correct. There is no shared metadata helper in the repo.

FIX:
  a) Create src/lib/metadata.ts exporting buildRegionalMetadata({ region, path, title,
     description, ogImage? }) returning a Metadata object with:
       - alternates.canonical = `${siteUrl}/${region}${path}`
       - alternates.languages for en-GB, en-US and x-default, absolute URLs, reciprocal
       - openGraph.url matching the canonical
       - openGraph.locale per region
     Source region data from src/lib/regions.ts. No hardcoded region strings.

  b) Convert EVERY page using static `export const metadata` to an async
     generateMetadata that awaits params and calls the helper. All 65.

  c) Migrate the 17 already-correct pages onto the same helper so there is one
     implementation, not two.

  d) Add a build-time check: fail if any page.tsx under src/app/[region]/ exports a
     static `metadata` object rather than generateMetadata. This is the class of bug
     that silently reappears.

Preserve every existing title and description string exactly — they are authored and
correct. This is a plumbing change, not a copy change.

=== TASK 2: CRITICAL — US STORE RENDERS GBP ===

/us/store displays £45.00, £55.00, £120.00 — GBP prices on US region pages.

pricing.ts rule 5 states currency must match region, and formatPrice() already calls
assertPriceCurrencyMatchesRegion(). The store bypasses it: src/content/store/products.ts
holds hardcoded display strings with no currency or amountMinor fields.

FIX:
  a) Restructure store products to carry RegionalPrice entries per the pricing.ts
     RegionalPrice interface — integer minor units, explicit currency, explicit region.
  b) Route ALL store price rendering through formatPrice(). No component may format a
     price itself.
  c) US prices are NOT SET. Do not convert from GBP, do not estimate, do not use a
     placeholder. Ship US prices null. Per pricing.ts rule 3, a product with no price
     for a region is UNAVAILABLE in that region — render the unavailable state on
     /us/store until real USD prices are authored.

Report the list of products needing USD prices so I can set them.

=== TASK 3: CRITICAL — BUILD THE MISSING PRICE VALIDATOR ===

pricing.ts states: "build-time validation in scripts/validate-prices.ts enforces it at
build." That file does not exist and is not in the prebuild chain.

FIX: create scripts/validate-prices.ts and add it to prebuild. It must FAIL the build on:
  - Any RegionalPrice whose currency does not match its region's currency
  - Any non-integer amountMinor
  - Any price literal (£ or $ followed by digits) in a component outside the pricing
    layer — report file and line
  - Any Project 01 price that is non-null (pricing is unset and must stay unset)

Then run it and paste the output.

=== TASK 4: /faq AND /glossary RETURN 404 ===

Both directories contain only their client component — FAQClient.tsx and
GlossaryClient.tsx — with no page.tsx. The footer links to both.

FIX: create the server page.tsx for each, using the new metadata helper from Task 1.
Add both to the sitemap. Verify in both regions.

=== TASK 5: og-image ===

public/og-image.png is 1.2MB, served raw. Re-export as JPEG under 200KB. 17 files
remain over 400KB — report them with sizes after conversion.

=== RULES ===
- Verify against the DEPLOYED URL. Repo state is not evidence.
- Do not change any authored title or description text.
- Do not invent USD prices.
- One metadata implementation, not two.

=== VERIFICATION — RAW CURL AGAINST THE DEPLOYMENT ===
1. for r in /uk /us /uk/order /us/order /uk/bikes/project-01 /us/bikes/project-01 \
        /uk/engineering/kinematics /uk/store /uk/journal /us/partners /uk/faq /us/glossary; do
     echo -n "$r → "; curl -s $URL$r | grep -io '<link rel="canonical" href="[^"]*"'; done
   → every canonical must contain its own region prefix
2. Same loop counting hreflang: curl -s $URL$r | grep -ic 'rel="alternate" hreflang'
   → every route must return 3
3. Reciprocity: fetch /uk/order and /us/order, paste both hreflang blocks, prove each
   declares the other
4. curl -s $URL/us/store | grep -c '£'  → 0
   curl -s $URL/uk/store | grep -c '\$' → 0
5. npm run build showing validate-prices.ts running; then deliberately break a price
   currency and paste the failure
6. curl -s -o /dev/null -w "%{http_code}" $URL/uk/faq $URL/us/faq $URL/uk/glossary $URL/us/glossary
7. Build failure output when a static metadata export is reintroduced
8. curl -s -o /dev/null -w "%{size_download}\n" $URL/og-image.jpg
9. List of store products needing USD prices
```

---

# 5. WHAT'S NEXT

Once the hotfix lands, the build itself is in good shape. The remaining blockers are decisions and external inputs, not code.

**Still gating everything: RRP and landed cost.** The partner earnings calculator, US store pricing, Project 01 pricing and the Foundation Partner conversation all wait on this. It's now the single highest-value thing you could work on, and the one I can help build directly — BOM, tooling amortisation, freight, duty, VAT treatment, agency commission, contribution margin and break-even, modelled per region.

**One solicitor brief covering four items** — agency structure, the ten legal documents, warranty terms, trade mark position. One engagement rather than four. The trade mark has the longest lead time and is the only item carrying criminal rather than civil exposure.

**Founding register decisions** — cap number and the two or three benefits you'll honour. 8D stalls without them.

**The two spec contradictions are still open** — frame sizes (M·L·XL vs S·M·L·XL) and wheel format (29/29 vs the mixed-wheel journal piece). Both block anything touching the spec panel.

**Then the cult layer** — 8D's founding register, the named engineering concept, publishing cadence, Peak District identity, founder story. That's the work that turns a well-engineered site into a brand people follow.

---

## SHORT VERSION

The region build landed and the legal divergence is genuinely correct — better than I expected. Two defects would deindex the site if launched today, and both trace to one missing abstraction: there's no shared metadata helper, so 65 pages hand-rolled a canonical that can't see the region. The US store showing GBP is the same shape of problem — a well-designed pricing architecture that the store simply doesn't use, and a validator that was documented but never written.

All three are plumbing, not design. Nothing here questions the architecture; it's the wiring between good parts.
