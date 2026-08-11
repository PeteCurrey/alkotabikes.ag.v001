# ALKOTA CYCLES — PHASE 7: UK / US MULTI-REGION ARCHITECTURE
### Locale routing · region-specific legal · dual-currency commerce · international SEO

---

# PART A — DECISIONS TO MAKE FIRST

These three shape everything downstream. I've recommended each, with the alternative noted.

## A1 — URL structure

**Recommendation: locale subdirectories on one domain.**

```
alkotacycles.com/uk/bikes/project-01
alkotacycles.com/us/bikes/project-01
alkotacycles.com/            → 302 to detected locale, declares hreflang x-default
```

Why not the alternatives:
- **Separate ccTLDs** (`alkotacycles.co.uk` + `.com`) — strongest geo-signal, but splits domain authority across two properties. For a brand with zero backlinks today, that's halving nothing twice. Also doubles hosting, SSL, GSC properties and legal surface.
- **Subdomains** (`uk.alkotacycles.com`) — Google treats them as broadly the same as subdirectories now, but they're harder to configure and offer no advantage here.
- **No prefix on one region** (root = US, `/uk/` for UK) — common, but asymmetric. It bakes a hierarchy into your URLs that you'll resent when the smaller market grows, and it makes the hreflang set harder to reason about.

> ⚠️ **This is your third URL migration.** You've already done `/dealers`→`/partners`, `/bikes`→`/bikes/project-01`, `/support/*`→`/ownership`. Every existing 301 must be rewritten to point at its final locale-prefixed destination — **not chained through the old target**. `/dealers` → `/uk/partners` directly, never `/dealers` → `/partners` → `/uk/partners`. Chained redirects leak authority and Google gives up after a few hops.

## A2 — Detection behaviour

**Recommendation: detect, route once, always overridable, never trap.**

- Detection via Vercel's `x-vercel-ip-country` header in middleware. Never a client-side GeoIP library — it's slow, blockable, and fires after paint.
- Root `/` issues a **302** (not 301 — the target varies by visitor, so it must not be cached as permanent) to the detected locale.
- A `alkota-region` cookie, once set by an explicit user choice, **always wins over geo**. Someone in New York researching the UK programme stays in `/uk/` for the rest of their visit.
- Every locale-prefixed URL is directly reachable and never redirects. Only bare `/` routes.
- Visitors from outside UK/US: default to `/us/` (larger addressable market, ships internationally) but show the switcher prominently.

**Do not** hard-redirect based on IP with no escape. Google crawls predominantly from US IPs — if `/uk/` bounced them to `/us/`, your UK pages would never be indexed.

## A3 — Which entity contracts with whom

This is a commercial decision with legal consequences, and it needs to be explicit in the terms:

- Does **Alkota US** sell to US customers as principal, or does **Alkota UK** sell and merely ship from a US warehouse?
- Which entity is the **data controller** for a US visitor's registration?
- Which entity is the **warrantor** on a US-sold bike?

Get this right early — the whole legal layer keys off it. My assumption in the prompts below: **each regional entity is the contracting party, seller, controller and warrantor for its own region.** That's the cleanest structure and the one that isolates liability. Tell AG if it's different.

---

# PART B — WHAT MUST DIFFER BY REGION

| Layer | UK | US |
|---|---|---|
| **Contracting entity** | UK company | US company |
| **Data protection** | UK GDPR + DPA 2018 | State privacy laws (see C4) |
| **Cookie consent** | PECR — **opt-in** before non-essential | **Opt-out** model + Global Privacy Control signal |
| **Regulator route** | ICO | State Attorney General |
| **Cancellation rights** | **14-day statutory** (Consumer Contracts Regs 2013) | **No general equivalent** — contractual policy only |
| **Consumer law** | Consumer Rights Act 2015 | State UDAP + FTC Act |
| **Warranty framing** | "Commercial warranty additional to statutory rights" | **Magnuson-Moss**: must be designated "Full" or "Limited", pre-sale availability rule |
| **Pricing display** | **VAT-inclusive** (Price Marking Order 2004) | **Tax-exclusive**, sales tax at checkout by ZIP |
| **Governing law** | England & Wales | A named US state |
| **Dispute resolution** | Courts | Arbitration + class waiver is standard US practice — and would likely be unfair/unenforceable in UK |
| **Company disclosures** | Companies Act 2006 + E-Commerce Regs 2002 | State registration; no direct equivalent |
| **Email marketing** | PECR — **opt-in**, no postal address required | **CAN-SPAM** — opt-out permitted, **physical postal address mandatory in every email** |
| **Product safety std** | BS EN ISO 4210 | **CPSC 16 CFR 1512** — see C3 |
| **Accessibility** | Equality Act 2010 | **ADA** — materially higher litigation risk |
| **Units** | cm / kg | ft-in / lb |

---

# PART C — FIVE THINGS THAT WILL BITE

## C1 — Never FX-convert prices at runtime

The instinct is one price list plus a live exchange rate. Don't.

- UK consumer prices must be shown **inclusive of VAT**. US prices are shown **exclusive of sales tax**, which is then calculated at checkout against ~13,000 destination-based jurisdictions.
- So £120 inc-VAT is not "$X at today's rate". The underlying net prices differ, the tax treatment differs, and the psychological price points differ (£45 → $49, not $56.83).
- A floating rate means prices change without you deciding, and a cached page can contradict checkout.

**Every product carries an explicit price per region.** A missing regional price means the product is not available in that region — never a converted fallback. Same for Project 01 when pricing releases: two independently-set MSRPs, not one converted.

## C2 — US sales tax is a nexus problem, not a rate problem

Economic nexus thresholds vary by state (commonly $100k in sales or a transaction count). You likely have none initially — but you accrue it silently as sales grow, per state. Use Stripe Tax or similar from day one so registration obligations surface automatically rather than being discovered in arrears.

## C3 — The bikes themselves are not interchangeable

**CPSC 16 CFR 1512** governs bicycles sold in the US and mandates specifics that EN ISO 4210 does not — notably a full reflector set (front, rear, pedal and side reflectors) fitted as sold, plus braking performance and protrusion requirements.

A Project 01 built to UK/EU spec is **not automatically legal to sell in the US.** This affects:
- The `/safety` page, which must be region-specific
- The spec panel and configurator (US builds ship with reflectors)
- Actual production planning and BOM

Worth raising with whoever's engineering the bike now, not in 2028. Also flag: US import duty on bicycles and frames is a real cost line — get the HTS classification checked before US pricing is set.

## C4 — You are probably below most US privacy-law thresholds, and should build as though you won't be

Twenty US states have comprehensive privacy laws in effect in 2026, with Indiana, Kentucky and Rhode Island joining on 1 January. But nearly all carry applicability thresholds — commonly around 100,000 consumers, or 25,000 plus majority revenue from selling data. <cite index="18-1">Rhode Island's threshold of 35,000 consumers is the lowest of any state</cite>, and <cite index="18-1">California is the only state granting a private right of action, limited to data breaches</cite>.

A pre-production bike brand is almost certainly a covered business under **none** of them today.

**So build proportionately.** Honour the core rights voluntarily — <cite index="18-1">access, deletion, correction, portability, opt-out and non-discrimination appear in almost every state law</cite>, and they're already in your UK privacy policy. Make the architecture support them. Do **not** build twenty state-specific notices for laws that don't apply.

What you *should* do now, because it's cheap and hard to retrofit: honour the **Global Privacy Control** browser signal, keep a data-subject-request workflow that works regardless of jurisdiction, and hold the threshold analysis as a dated, reviewable record so you know when you cross a line. Note that cure periods are expiring across several states, so the grace-period buffer businesses relied on is disappearing.

## C5 — The fit engine needs unit awareness

`/order` collects rider height and weight. A US rider thinks in feet, inches and pounds. Storing "5'11"" as a string breaks your sizing logic; storing 180 and assuming cm breaks the rider.

**Store canonical metric internally, display and input in the region's units, and always label the unit at the input.** This is a data-integrity issue, not a cosmetic one.

---

# PART D — AG PROMPTS

Four sub-phases. Run in order — 7A moves every URL, so nothing else can be built until it's settled.

## PHASE 7A — LOCALE ROUTING

```
PROJECT: Alkota Cycles (alkotacycles.com) — Next.js 15 App Router, Tailwind, Vercel, Supabase.

TASK: Introduce UK/US multi-region routing. Routing and detection only — regional
legal content and pricing are Phases 7B and 7C. Do not change page designs.

=== TASK 1: LOCALE STRUCTURE ===

Two regions: 'uk' and 'us'. Locale subdirectories on one domain.

  /uk/<route>     UK region, en-GB, GBP
  /us/<route>     US region, en-US, USD
  /               302 to detected locale (302, NOT 301 — target varies per visitor)

Create lib/regions.ts as the single source of truth:

  export type RegionCode = 'uk' | 'us';

  export interface Region {
    code: RegionCode;
    hreflang: 'en-GB' | 'en-US';
    label: string;              // "United Kingdom"
    shortLabel: string;         // "UK"
    currency: 'GBP' | 'USD';
    currencySymbol: '£' | '$';
    pricesIncludeTax: boolean;  // true UK, false US
    taxLabel: string;           // "inc. VAT" | "excl. tax"
    measurementSystem: 'metric' | 'imperial';
    dateFormat: string;
  }

Restructure app/ to app/[region]/ with generateStaticParams over both regions.
Non-regional routes (sitemap, robots, API, og images) stay outside.

=== TASK 2: DETECTION IN MIDDLEWARE ===

Resolution order, first match wins:
  1. Explicit locale prefix in the URL → use it, never redirect
  2. `alkota-region` cookie → redirect bare / to that region
  3. `x-vercel-ip-country` header: GB → uk, US → us
  4. Fallback → us

Rules:
  - ONLY the bare path `/` redirects. A locale-prefixed URL is always served as
    requested, regardless of the visitor's IP or cookie. A US visitor opening
    /uk/bikes/project-01 gets the UK page.
  - Root redirect is 302 and must send `Vary: Cookie` plus a no-cache directive so
    a CDN never serves one visitor's regional redirect to another.
  - Do NOT user-agent sniff for bots. Both locale trees are fully crawlable, in the
    sitemap, and cross-linked by hreflang — that is sufficient for discovery.

=== TASK 3: REGION SWITCHER IN HEADER ===

A switcher in the header showing the current region as flag + short label + currency:
  🇬🇧 UK · GBP     🇺🇸 US · USD

Behaviour:
  - Switching navigates to the SAME page in the other region, not to that region's
    homepage. /uk/engineering/kinematics → /us/engineering/kinematics.
  - If the equivalent page does not exist in the target region, go to that region's
    nearest parent and explain why on arrival.
  - Sets the `alkota-region` cookie on explicit choice. This cookie is
    STRICTLY NECESSARY (it delivers functionality the user explicitly requested),
    so it is exempt from consent. Add it to the Phase 3-R technology inventory with
    that classification and its justification.
  - Must be reachable at every breakpoint — verify it does not fall into a gap like
    the earlier nav dead zone. It must work inside the mega menu and the pinned
    horizontal sub-menus on section pages.

Also add a first-visit suggestion banner: if geo suggests a region different from the
one being viewed, offer a switch. Dismissible, remembered, never auto-redirects, never
re-asks after a choice.

=== TASK 4: REDIRECT MAP — NO CHAINS ===

Existing redirects must be rewritten to point at final locale-prefixed destinations
directly. Do not chain through the old intermediate target.

  /dealers        → /uk/partners   (region-detected; NOT /dealers → /partners → /uk/partners)
  /bikes          → /<region>/bikes/project-01
  /support        → /<region>/ownership
  /support/*      → /<region>/ownership
  /journal/project-01, /racing/dispatch → /<region>/journal?tag=...
  Every previously live unprefixed route → its locale-prefixed equivalent

Produce a complete before/after redirect table. Every legacy URL must reach its final
destination in exactly ONE hop.

=== TASK 5: HREFLANG ===

On every regional page, reciprocal annotations:
  <link rel="alternate" hreflang="en-GB" href="https://alkotacycles.com/uk/<path>" />
  <link rel="alternate" hreflang="en-US" href="https://alkotacycles.com/us/<path>" />
  <link rel="alternate" hreflang="x-default" href="https://alkotacycles.com/<path>" />

Rules:
  - Reciprocal. If A declares B, B must declare A. Non-reciprocal annotations are
    ignored by Google.
  - Absolute URLs only.
  - Canonical on each regional page is SELF-REFERENTIAL to its own regional URL.
    Never canonicalise /us/ to /uk/ — that would deindex one region entirely.
  - Sitemap lists both regional versions with xhtml:link alternates.
  - Where a page exists in only one region, emit no hreflang pair for it.

=== TASK 6: REGION-AWARE CONTENT SCAFFOLD ===

Content model must support region-specific values without duplicating shared content.
Add optional per-region overrides for: legal documents, pricing, contact details,
shipping, partner network, safety content, measurement units.

Where no override exists, fall back to shared content — EXCEPT for pricing and legal
documents, where a missing regional value must surface as unavailable, never as a
silent fallback to the other region's value.

=== RULES ===
- No hardcoded region anywhere. All region data flows from lib/regions.ts.
- Root redirect 302, never 301.
- Locale-prefixed URLs never redirect.
- Preserve all homepage sections, the mega menu and the pinned horizontal sub-menus.
- Preserve GSAP ScrollTrigger scrub behaviour. No IntersectionObserver.

=== VERIFICATION ===
1. curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" $URL/          → 302
2. curl -H "x-vercel-ip-country: GB" and "x-vercel-ip-country: US" against / — paste both
3. curl -s -o /dev/null -w "%{http_code}" $URL/uk/bikes/project-01 and /us/... → both 200
4. Prove no chains — for each legacy URL paste the full -L redirect trace showing ONE hop:
   for r in /dealers /bikes /support /support/owners /journal/project-01; do
     curl -sIL $URL$r | grep -iE "^HTTP|^location"; done
5. curl -s $URL/uk/engineering/kinematics | grep -o 'hreflang="[^"]*" href="[^"]*"'
   — must show all three, absolute
6. Canonical self-reference on both: curl -s $URL/us/order | grep -o 'rel="canonical"[^>]*'
7. curl -s $URL/sitemap.xml | grep -c "xhtml:link"
8. Screenshots of the switcher at 375, 768, 1024, 1440 — including inside the mega
   menu and a pinned sub-menu page
9. Switch from /uk/engineering/materials — confirm arrival at /us/engineering/materials
```

## PHASE 7B — REGIONAL LEGAL LAYER

```
PROJECT: Alkota Cycles — multi-region legal layer. Depends on Phase 7A and Phase 3-R.

TASK: Make the legal layer region-aware across two operating entities.

CONTEXT
Ten legal documents exist and are well drafted for UK law. Do NOT rewrite them —
they become the UK regional set. This phase adds the US set and the entity model.

Two operating entities are planned. ASSUMPTION unless told otherwise: each regional
entity is the contracting seller, data controller and warrantor for its own region.

=== TASK 1: MULTI-ENTITY COMPANY MODEL ===

Refactor lib/company.ts from a single object to a per-region record. UK fields as
already specified. US entity adds: entityType, stateOfIncorporation, registeredAgent,
principalPlaceOfBusiness, EIN (store presence only, never render), stateTaxRegistrations[].

USE CLEARLY-MARKED PLACEHOLDERS, not nulls, for entity names and addresses in this
phase — the owner will supply real values later. Every placeholder must:
  - Use the exact literal prefix "PLACEHOLDER — " so it is greppable
  - Be listed in a generated report at build time
  - FAIL the production build on the alkotacycles.com hostname
  - Build normally on preview

Do NOT invent plausible company names, numbers, addresses or agents. "PLACEHOLDER —
US Entity Legal Name" is correct. "Alkota Cycles LLC, Delaware" is not — a plausible
invented value will survive review; an obvious placeholder will not.

=== TASK 2: REGIONAL LEGAL DOCUMENT MODEL ===

Extend LEGAL_DOCUMENTS from Phase 3-R with a region dimension. Each document has an
independent status per region — UK terms may be APPROVED while US terms are DRAFT,
and commerceEnabled must resolve PER REGION accordingly.

The existing ten documents become the UK set. Build the US set:

  US PRIVACY NOTICE — differs structurally, not cosmetically:
    - Controller: US entity
    - Regulator route: state Attorney General, NOT the ICO
    - Categories of personal information in CCPA terms
    - Rights: access, deletion, correction, portability, opt-out, non-discrimination
    - "Do Not Sell or Share My Personal Information" mechanism
      (Alkota does not sell data — state that plainly and provide the link anyway)
    - Honour the Global Privacy Control browser signal
    - Notice of Financial Incentive if any discount is offered for data
    - Shine the Light (California Civil Code §1798.83)
    - No ICO references. No UK GDPR lawful-basis framing — US law does not use it.

    PROPORTIONALITY: applicability thresholds mean Alkota is likely a covered business
    under none of the ~20 state comprehensive privacy laws currently in effect. Do NOT
    build twenty state-specific notices. Build one US notice honouring the common core
    rights, plus lib/us-privacy-thresholds.ts recording each state's threshold, a
    dated assessment, and a review date. Architecture supports compliance; the notice
    stays proportionate.

  US TERMS OF SALE:
    - Governing law: PLACEHOLDER — US state
    - Arbitration and class action waiver: draft as a clearly-marked optional block,
      flagged for counsel. This is standard US practice and would be unfair and
      likely unenforceable under UK law — it must NEVER render in the UK set.
    - NO 14-day statutory cancellation. The UK Consumer Contracts Regulations right
      has no general US equivalent. Any US returns window is a contractual policy
      offered voluntarily — it must be described as such and never as a statutory right.

  US WARRANTY:
    - Magnuson-Moss Warranty Act: a written warranty on a consumer product over $15
      must be conspicuously designated "FULL" or "LIMITED". Add a required
      mmwaDesignation field; build fails if unset in the US set.
    - Pre-sale availability: warranty text must be readable before purchase.
    - Keep the correct pre-production framing already used in the UK version —
      terms TO BE CONFIRMED BEFORE PRODUCTION RELEASE.

  US RETURNS, SHIPPING, LEGAL NOTICE, COOKIE POLICY, ACCESSIBILITY, COMPLAINTS,
  SAFETY: regional variants. Accessibility statement must reference the ADA and
  WCAG 2.2 AA for the US set.

=== TASK 3: CONSENT MODEL DIVERGES ===

  UK — PECR: opt-in. No non-essential storage before active consent. Already built.
  US — opt-out permitted, BUT:
    - Honour Global Privacy Control (navigator.globalPrivacyControl) as a valid
      opt-out signal. Several states require this and it is cheap to implement.
    - Provide a persistent "Your Privacy Choices" footer link in the US region.
    - Do not present the UK opt-in banner to US visitors, or vice versa.

The `alkota-region` cookie is strictly necessary in both regions.

=== TASK 4: EMAIL COMPLIANCE DIVERGES ===

  UK — PECR: opt-in required, existing double opt-in stands.
  US — CAN-SPAM: opt-out lawful, BUT every commercial email must carry a valid
  PHYSICAL POSTAL ADDRESS and a functioning unsubscribe honoured within 10 business
  days.

Email templates must resolve sender identity, postal address and consent model from
the recipient's region. A US recipient must never receive an email lacking the postal
address. Build fails if a US template renders without one.

=== TASK 5: SAFETY & PRODUCT COMPLIANCE PAGE ===

/safety must be region-specific. US bicycles are regulated under CPSC 16 CFR 1512,
which mandates requirements EN ISO 4210 does not — including a full reflector set
fitted as sold, plus braking and protrusion requirements.

Create lib/product-compliance.ts recording, per region, the applicable standard and
its status. Ships with status UNVERIFIED. Render /safety from it. Do not assert
compliance with any standard — state which standard applies and that validation is
part of the development programme.

Flag prominently in your output that this has PHYSICAL PRODUCT implications for the
US market, not just content implications.

=== RULES ===
- Do not rewrite the UK documents.
- Placeholders use the literal "PLACEHOLDER — " prefix. Never invent plausible values.
- No UK statutory right may render in the US set, and no US arbitration clause in the UK set.
- No ICO reference in US documents. No state AG reference in UK documents.
- commerceEnabled resolves per region.

=== VERIFICATION ===
1. cat lib/company.ts lib/regions.ts lib/us-privacy-thresholds.ts lib/product-compliance.ts
2. grep -rn "PLACEHOLDER — " lib/ | wc -l  and the generated placeholder report
3. Production-hostname build → paste failure listing every placeholder
4. curl -s $URL/us/privacy | grep -ci "ICO\|Information Commissioner" → 0
5. curl -s $URL/uk/privacy | grep -ci "attorney general" → 0
6. curl -s $URL/uk/returns | grep -ci "14 day\|14-day" → >0
   curl -s $URL/us/returns | grep -ci "statutory right of cancellation" → 0
7. curl -s $URL/us/warranty | grep -oiE "\bFULL\b|\bLIMITED\b" — MMWA designation present
8. curl -s $URL/us/ | grep -ci "your privacy choices" → >0
9. GPC test: request with Sec-GPC: 1 — paste the response and resulting consent state
10. Rendered US email template showing the physical postal address block
11. curl -s $URL/us/safety | grep -ci "1512\|CPSC" → >0
```

## PHASE 7C — DUAL-CURRENCY COMMERCE

```
PROJECT: Alkota Cycles — regional pricing and commerce. Depends on 7A and 7B.

TASK: Region-correct pricing across merchandise and Project 01.

=== TASK 1: NO RUNTIME CURRENCY CONVERSION — EVER ===

Prices are NOT converted at runtime. No FX API, no exchange rate, no multiplier.
Every product carries an explicitly authored price per region.

  interface RegionalPrice {
    region: RegionCode;
    amountMinor: number;        // integer minor units. NEVER floats.
    currency: 'GBP' | 'USD';
    taxIncluded: boolean;       // true UK, false US
    taxRateApplied: number | null;
  }

Reasons, so this is not "simplified" later:
  - UK consumer prices must display INCLUSIVE of VAT (Price Marking Order 2004)
  - US prices display EXCLUSIVE of sales tax, which varies by destination ZIP
  - Price points are commercial decisions, not arithmetic (£45 → $49, not $56.83)
  - A floating rate changes prices without anyone deciding, and a cached page can
    contradict checkout

A product with no price for a region is NOT AVAILABLE in that region. Render it as
unavailable. NEVER fall back to the other region's price or a converted value.
Build fails if any product renders a price whose currency does not match its region.

=== TASK 2: PRICE DISPLAY ===

  UK:  £120.00  inc. VAT
  US:  $149.00  excl. tax — tax calculated at checkout

Tax label from lib/regions.ts, never hardcoded. Currency formatting via Intl.NumberFormat
with the region's locale. Correct symbol placement and separators for both.

=== TASK 3: PROJECT 01 PRICING MODEL ===

Pricing is TBC. Build the model now so nothing has to be retrofitted under launch pressure.

  - Two independently authored MSRPs, one per region. Not one converted figure.
  - Both ship null. Rendering a null price shows the existing "PRODUCTION PRICE: TBC"
    treatment — never a placeholder number, never a range, never "from".
  - Register both in lib/claims.ts when set.
  - US price must account for import duty and landed cost. Add a costNotes field
    (internal only, never rendered) recording HTS classification and duty assumptions.
    Do NOT estimate a duty rate — leave it null and flag that it needs checking.

=== TASK 4: SALES TAX ===

  UK: VAT-inclusive display, VAT breakdown at checkout, VAT number from lib/company.ts.
  US: destination-based sales tax at checkout via Stripe Tax. Economic nexus thresholds
      vary by state and accrue silently as sales grow — configure so registration
      obligations surface automatically rather than being discovered in arrears.

Both remain gated behind commerceEnabled per region (Phase 3-R Task 1). STORE_MODE
stays CATALOGUE until that region's legal set is APPROVED.

=== TASK 5: SHIPPING ===

Region-specific shipping model: origin, destinations served, carriers, timescales,
thresholds, and — for cross-border — who bears duty (DDP vs DAP). If UK ships to US
customers before US fulfilment exists, the duty position must be explicit at checkout,
not discovered on delivery.

=== TASK 6: MEASUREMENT UNITS — DATA INTEGRITY ===

The /order fit fields collect rider height and weight.

  UK: cm / kg
  US: ft-in / lb

CRITICAL: store canonical METRIC internally regardless of input region. Convert at the
boundary. Always label the unit at the input. A height stored without its unit is a
corrupt record and will silently break sizing logic.

Apply the same unit awareness to any geometry table, spec panel and the configurator.

=== RULES ===
- Zero runtime FX conversion. No exchange rate anywhere in the codebase.
- Integer minor units only. No floating-point currency arithmetic.
- Missing regional price = unavailable, never a fallback.
- Project 01 prices ship null.
- Commerce stays gated per region.

=== VERIFICATION ===
1. grep -rniE "exchangerate|fx|convertCurrency|USD_PER_GBP" app/ lib/ → zero hits
2. curl -s $URL/uk/store | grep -oE "£[0-9,]+\.[0-9]{2}[^<]*" | head
   curl -s $URL/us/store | grep -oE "\$[0-9,]+\.[0-9]{2}[^<]*" | head
   — correct symbols and tax labels, no cross-contamination
3. curl -s $URL/uk/store | grep -c "\$" → 0    curl -s $URL/us/store | grep -c "£" → 0
4. Add a product with a UK price only — screenshot it as unavailable in /us/store
5. Deliberately mismatch a price currency to its region; paste the build failure
6. curl -s $URL/uk/bikes/project-01 | grep -i "price" and same for /us/ → TBC treatment
7. Submit the /us/order form with height 5'11" and weight 165lb — paste the stored
   record showing canonical metric
8. Confirm /uk/cart and /us/cart both absent under CATALOGUE mode
```

## PHASE 7D — INTERNATIONAL SEO & REGIONAL CONTENT

```
PROJECT: Alkota Cycles — international SEO and regional content. Depends on 7A–7C.

TASK: Complete international search configuration and region-specific content.

=== TASK 1: SITEMAP & ROBOTS ===

Single sitemap index referencing both regional sitemaps. Each URL carries xhtml:link
alternates for both regions plus x-default. robots.txt production ruleset covers both
trees and disallows both regions' portals and carts.

Confirm the hostname-based check from the earlier hotfix still holds — the preview
must serve Disallow: / regardless of VERCEL_ENV.

=== TASK 2: STRUCTURED DATA PER REGION ===

  - Organization: correct regional entity, its address, its contact points.
    areaServed set per region. Both entities linked via parentOrganization if
    a group structure exists.
  - Product: when Project 01 pricing releases, offers.priceCurrency must match the
    region. Until then, still no offers block.
  - LocalBusiness only if a real physical location exists per region — omit otherwise.

=== TASK 3: REGIONAL METADATA ===

Every page's title and description authored per region where it differs materially.
Shared where it doesn't — do not spin near-duplicate copy for its own sake.

Regional OG images where the content differs (pricing, partner network).
og:locale set per region.

Retain the fix from the earlier hotfix: brand appears ONCE in each title. Verify no
region has reintroduced "| Alkota Cycles | Alkota Cycles".

=== TASK 4: REGION-SPECIFIC CONTENT ===

  - PARTNER NETWORK: UK and US programmes are separate. Separate application forms,
    criteria and pipelines. A US shop must never land in the UK pipeline. Keep the
    restored APN-01..04 criteria structure for both.
  - CONTACT: regional entity, addresses, emails, phone, response times, time zone.
  - RACING: state clearly which region's programme is described.
  - JOURNAL: shared editorial by default. Ensure the SSR fix from the earlier hotfix
    holds in BOTH regions — verify server-rendered word count in each.
  - OWNERSHIP: regional warrantor and support routes.

=== TASK 5: SEARCH CONSOLE ===

Both regional trees submitted as properties or clearly-defined path prefixes.
Set geographic targeting per directory where supported. Monitor the International
Targeting report for hreflang errors — non-reciprocal annotations are the usual cause
and they fail silently.

=== VERIFICATION ===
1. curl -s $URL/sitemap.xml — index referencing both regional sitemaps
2. curl -s $URL/sitemap-uk.xml | grep -c "xhtml:link"
3. Reciprocity audit: for 10 routes, fetch both regional versions and prove each
   declares the other. Paste all 20 hreflang blocks.
4. curl -s $URL/us/ | grep -o '"@type":"Organization"' -A20 → US entity
5. for r in /uk/journal /us/journal; do echo -n "$r "; curl -s $URL$r | wc -w; done
   → both >400, proving the SSR fix holds in both regions
6. Titles across both regions — no doubled brand
7. curl -s $URL/uk/partners | grep -c "APN-0" and /us/partners → 4 each
8. Full crawl of both trees: zero 404s, zero redirect chains, zero cross-region
   canonical leakage
```

---

# PART E — PLACEHOLDER VALUES TO SUPPLY LATER

Everything below ships as `PLACEHOLDER — …` and fails the production build until filled:

**UK entity** — legal name · company number · registered office · trading address · VAT number and status · ICO registration

**US entity** — legal name · entity type · state of incorporation · registered agent and address · principal place of business · EIN · state tax registrations

**Both** — general/legal/privacy/partner emails · telephone · response times

**Decisions** — governing-law state for US terms · whether to include the arbitration and class-action waiver · MMWA Full vs Limited designation · which entity contracts with whom (Part A3) · US returns window (contractual, since no statutory right applies)

**Needs external input** — HTS classification and duty rate for bikes and frames into the US · CPSC 16 CFR 1512 conformity plan · US trade mark position for ALKOTA CYCLES in Class 12, given the Alkota Cleaning Systems collision is a US company

---

## SEQUENCING

7A first and alone — it moves every URL, and the redirect-chain risk is the real hazard given this is the third migration. Verify the one-hop requirement properly before building anything on top.

7B and 7C can run in either order once 7A is verified. 7C is the more mechanical of the two; 7B will stall on placeholders and legal decisions.

7D last, because hreflang and structured data must describe a settled URL and pricing structure.

**One thing worth acting on outside the website:** C3. If Project 01 is being engineered to EN ISO 4210 only, US sale requires CPSC 16 CFR 1512 conformity, and that includes a reflector set fitted as sold. That's a BOM and homologation question for 2027, not a content question for 2026 — but it's much cheaper to design in now than to retrofit.
