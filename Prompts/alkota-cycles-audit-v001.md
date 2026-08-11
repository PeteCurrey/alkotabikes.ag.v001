# ALKOTA CYCLES — BUILD AUDIT
### alkotabikes-ag-v001.vercel.app · audited 9 August 2026

---

## 0. METHOD & SCOPE

Crawled 34 routes plus asset layer. Checked HTTP status, `<title>`, meta description, canonical tags, JSON-LD, H1 count, rendered word count in `<main>`, internal link integrity, image checksums, response headers, `robots.txt`, `sitemap.xml`, and the brand SERP.

**What I could not assess:** GSAP/scroll behaviour, Lenis smoothing, hover and dropdown interaction, real Core Web Vitals under load, visual rendering fidelity, form submission handlers, or anything behind the two portal logins. Everything below is evidenced from server-rendered HTML and live asset responses — no inference dressed up as fact.

---

## 1. GENERAL FEEDBACK

**The core proposition is right and it is rare.**

The strategic decision to sell the *development programme* rather than pretend a finished bike exists is the single best thing about this build. `/order` is the strongest page on the site — "THIS IS NOT A NORMAL CHECKOUT", "YOU ARE NOT BUYING A RENDER. YOU ARE JOINING THE PROCESS THAT TURNS IT INTO A BICYCLE" is genuinely differentiated positioning that no established brand can copy, because they all have stock to move. The seven-stage pipeline with explicit "NOT YET OPEN" states, the pre-production disclosure checkbox, and the separated marketing opt-in are all correct.

The design language is coherent and confident: instrument-panel dark UI, mono microcopy, system numbering (APN-01, ALK-SKETCH-001, R00-P01, SYSTEM 01/16), status readouts in the header rail. It reads like engineering documentation rather than bike marketing, which is exactly the intended effect.

**The core risk is surface area outrunning substance.**

The site is architected at the scale of a company that ships bikes — owner portal, warranty policy, technical service guides, owner manuals, partner portal, store with cart, four editorial streams. Alkota does not ship until 2028. Every one of those surfaces has to be filled with *something*, and where there was nothing real to put in them, placeholder or invented content has gone in: PDFs with fabricated file sizes, a lifetime warranty in two sentences, a workshop photograph presented as alpine field testing.

That is the pattern to break now, because it is the same failure mode as the 123 fabricated testimonials on avorria and the placeholder client names on entirefm. The honesty positioning is the brand's entire differentiator — it cannot survive a visitor noticing that the "ACTIVE TRAIL TESTING" photo is the workshop photo.

**Verdict:** strong foundation, excellent narrative spine, real integrity debt, and a technical SEO layer that is essentially absent. All fixable, none structural.

---

## 2. STRUCTURE & INFORMATION ARCHITECTURE

### Current shape

```
/                       homepage (15+ sections)
/bikes                  195 words — thin tier
  /project-01           flagship product page
    /components/*       component detail pages
/engineering            overview
  /chassis /kinematics /materials /testing      91–98 words each
/racing                 645 words
  /dispatch
/journal                425 words · 3 articles
  /project-01           second journal
/project-01/design-archive     11 artifacts (third editorial stream)
/store                  8 products + /cart
/about /about/story /about/reverse-engineering /about/build-process
/configure              client-only, no SSR
/order                  register + 7-stage pipeline + FAQ
/road-to-2028
/dealers                partner recruitment
/partners               partner portal (stub)
/my-alkota              owner portal (stub)
/support /owners /technical /warranty
/contact /privacy /terms /cookies
```

### Problems

**2.1 — Four parallel editorial streams for three articles.** `/journal`, `/journal/project-01`, `/racing/dispatch`, and `/project-01/design-archive` are four separate content systems. A visitor cannot form a mental model of where to find "the story", and each stream starves the others of updates. Collapse to **one** journal with filter tags (Chassis · Kinematics · Materials · Racing · Design Archive). The design archive can keep its own index route as a gallery, but its entries should surface in the single journal feed.

**2.2 — `/bikes` is a redundant tier.** 195 words standing between the nav and the only product. For a deliberately one-platform brand, an intermediate "platform overview" page contradicts the "ONE MACHINE" message and splits link equity from the page that matters. Redirect `/bikes` → `/bikes/project-01`, or make `/bikes` the canonical product page and drop the child.

**2.3 — `/dealers` vs `/partners` semantic mismatch.** Nav and footer both say "Partner Network" but link to `/dealers`; the portal lives at `/partners`. Two different words for one concept, and the recruitment page — the one you actually want ranking — sits on the URL you have decided *not* to use in your language. Move recruitment to `/partners` and the portal to `/partners/portal`, with a 301 from `/dealers`.

**2.4 — The ownership cluster is built for people who cannot exist.** Five routes (`/my-alkota`, `/support`, `/support/owners`, `/support/technical`, `/support/warranty`) serve owners of a bike that does not enter production for two years. This is where most of the integrity debt has accumulated. Consolidate to a single `/ownership` page describing what ownership *will* include, and rebuild the cluster in 2027.

**2.5 — Homepage is carrying too much.** Fifteen-plus sections including a 16-hotspot keyboard-navigable System Explorer, a configurator preview, a design archive strip, a journal strip, and the roadmap. The System Explorer is the most impressive thing on the site and it is buried at position two on a page most people will not finish. It belongs on `/bikes/project-01` as the centrepiece, with a single compelling entry point from home.

**Recommended structure:** 6 nav items → 5. Bikes · Engineering · Racing · Journal · About, with Store and the Project 01 CTA in the utility rail. ~34 routes → ~26 after collapsing.

---

## 3. UX / UI

### 3.1 — CRITICAL: tablet navigation dead zone

Verified in markup:

```html
<nav class="hidden lg:flex ...">          <!-- visible ≥1024px only -->
<button class="md:hidden ..." aria-label="Toggle Navigation Menu">  <!-- visible <768px only -->
```

**Between 768px and 1023px there is no navigation at all** — the desktop nav is hidden and the hamburger is hidden. That window covers iPad portrait (768), iPad Air portrait (820), iPad Pro 11" portrait (834), and most Android tablets. Those users get a logo, a cart icon and a CTA button, and no way to reach any section.

Fix: change the hamburger to `lg:hidden`.

### 3.2 — CRITICAL: configurator has no server-rendered content

`/configure` returns only `LOADING PROJECT 01 DIGITAL SHOWROOM...` — zero H1, no content, no `<noscript>` fallback. It is linked as a primary CTA from the homepage ("ENTER CONFIGURATOR", "BUILD YOUR SPEC", "DISCOVER PROJECT 01") and from the footer and `/order`.

Consequences: nothing indexable, a guaranteed blank-screen period on slow connections, and total failure if the JS chunk errors. Needs an SSR shell — H1, intro copy, the spec table that already exists on the homepage — with the interactive layer hydrating over it.

### 3.3 — Unbranded 404

`/robots.txt`, `/sitemap.xml` and any mistyped URL return the stock Next.js black-and-white "404: This page could not be found." Brand collapse at the exact moment someone is already lost. Build a branded 404 with the header rail, a short line in Alkota voice, and routes to Project 01 / Engineering / Journal.

### 3.4 — Dead and placeholder UI shipping live

| Location | Issue |
|---|---|
| `/support/owners` | Two PDF downloads listed with sizes ("REV 001 • 4.2 MB", "1.1 MB") — **no anchor tags, no files**. Unclickable dead UI. |
| `/store/*` | Products display "PHOTOGRAPHY ASSET PENDING" placeholders |
| `/project-01/design-archive` | Multiple artifacts show "IMAGE PENDING" |
| Footer | Social links point to bare `https://instagram.com`, `https://youtube.com`, `https://linkedin.com` — no profiles |

The design archive "IMAGE PENDING" state is arguably defensible — it is a development archive and the pending state is honest. The other three are not.

### 3.5 — Accessibility

- No skip-to-content link
- Newsletter email input has placeholder text but no associated `<label>`
- Nav items carry `chevron-down` icons implying dropdowns rendered on hover — hover menus need an explicit tap-to-open path on touch, and keyboard focus handling
- Cart button `aria-label` is present and correct — good
- Colour contrast of `text-alkota-snow/80` and `text-alkota-slate` on dark backgrounds needs checking against WCAG AA; `text-alkota-slate/60` on the system status line almost certainly fails

### 3.6 — Smaller items

- Header uses a full logo ≥768px and a monogram below — but the monogram is the stronger mark at small sizes and the switch point sits inside the nav dead zone
- No visible success/error state for the newsletter form in markup
- `/cart` empty state copy is good ("Nothing here from the workshop yet")

---

## 4. CONTENT AUDIT — INTEGRITY FINDINGS

This is the section that matters most. Every item below is verified, not inferred.

### 4.1 — Duplicate image assets (verified by MD5)

```
e695318e0240   /images/engineering-workshop.png
e695318e0240   /images/project01-alpine-testing.png      ← IDENTICAL FILE

96b62d4539ef   /images/project01-naked-carbon-hero.jpg
96b62d4539ef   /images/project01-naked-carbon.png        ← IDENTICAL FILE
```

The first pair is a content-integrity problem, not just a housekeeping one. The homepage section headed **"REAL TERRAIN VALIDATION / THE FINAL TEST BENCH / ALPINE R&D — HAUTE-SAVOIE / ELEVATION: 2,400M / STATUS: ACTIVE TRAIL TESTING"**, with alt text "ALKOTA Project 01 rider testing prototype on alpine terrain", is illustrated with **the workshop photograph**.

The second pair is a mislabelled duplicate — a JPEG served with a `.png` extension, so Vercel returns `Content-Type: image/png` for JPEG bytes.

### 4.2 — Testing status contradicts itself across pages

| Page | Claim |
|---|---|
| Homepage | "STATUS: ACTIVE TRAIL TESTING" |
| Homepage | "Telemetry collection on high-velocity alpine trails **reveals** real-world impact forces, chassis resonance and mud clearances" |
| Homepage / `04 VALIDATION` | "LAB TEST PROGRAMME: ISO+ FATIGUE PROGRAMME **(PENDING PROTOCOL)**" |
| Homepage / `04 VALIDATION` | "FIELD TELEMETRY: SENSOR INSTRUMENTATION **(DEVELOPMENT TARGET)**" |
| `/dealers` status rail | "01 / CURRENT: ENGINEERING R00 — 02 / **NEXT**: PROTOTYPE R&D" |

Field telemetry cannot simultaneously be actively revealing real-world impact forces and be a development target, while prototype R&D is the *next* phase. Pick one and make every page agree. Given the roadmap, the honest version is future tense: "Alpine field validation is where R00 gets tested. That programme begins at prototype."

### 4.3 — Unevidenced facility claims

The workshop section asserts a specific physical capability set:

- "Precision carbon fiber layup control & telemetry bench"
- "5-axis CNC machining & titanium hardware assembly"
- "Linear spectral lighting & shock dyno testing"
- "Architectural development laboratory"
- "FACILITY / PERFORMANCE ENGINEERING LAB — LOCATION: R&D WORKSHOP 01"

Plus "ALPINE R&D / HAUTE-SAVOIE" as a stated development base, and elsewhere "AL7075-T6 CNC BILLET", "GRADE 5 TITANIUM", "ENDURO MAX DUAL SEALED" hardware specifications.

Each of these needs to be either evidenced (it exists, or a named supplier provides it) or reframed as specification intent. A shock dyno and a 5-axis machining capability are checkable claims that a technically literate buyer — your exact target market — will ask about.

### 4.4 — Phantom documents with fabricated metadata

`/support/owners` lists "PROJECT 01 CHASSIS USER MANUAL (PDF) — REV 001 • 4.2 MB" and "TORQUE SPECIFICATION MATRIX (PDF) — REV 001 • 1.1 MB". Neither file exists and neither is linked. The file sizes are invented detail — the most corrosive kind, because specificity is what makes a claim believable.

### 4.5 — Warranty commitment with no terms

`/support/warranty` is 36 words total and commits to:

> ALKOTA warrants Project 01 carbon frames against manufacturing defects for the **lifetime of the original owner**.

Plus a crash replacement scheme. There are no exclusions, no definition of "original owner", no transfer terms, no claims process, no registration requirement, no governing law, no exclusions for racing use, and no serial-number provenance requirement — for a product that does not exist.

Under UK law a published warranty is a legally enforceable commitment additional to statutory rights. A lifetime carbon frame warranty is one of the largest liabilities a bicycle manufacturer can take on, and it is currently made in two sentences by a pre-production company. This needs legal input before it stays up. The interim honest position: state the *intent* to offer a lifetime original-owner frame warranty and a crash replacement scheme, with full terms published before production sale.

### 4.6 — Specification contradictions

| Claim A | Claim B |
|---|---|
| Homepage spec panel: **"FRAME SIZES: M · L · XL"** | `/order` form offers **S, M, L, XL** |
| Homepage spec panel: **"WHEEL FORMAT: 29 / 29 PRIMARY"** | Journal Dispatch 002: **"WHY MIXED WHEELS: 29 FRONT / 27.5 REAR"** |

The second is more serious — a published editorial piece arguing the engineering case for mixed wheels sits alongside a spec panel saying the bike is 29/29. Either the journal piece explains a considered rejection (in which case say so in the piece), or the spec panel is stale.

### 4.7 — Stale dealer programme dates

`/dealers` shows Stage 01 as **"2024–2025"** and simultaneously **"OPEN NOW"**. Stage 02 is dated "2026–2027". It is August 2026 — Stage 01's window closed eight months ago and Stage 02 is the current period. Shift the whole timeline forward or drop hard dates in favour of phase labels.

### 4.8 — Legal pages are not policies

| Page | Word count |
|---|---|
| `/privacy` | **31** |
| `/terms` | **33** |
| `/cookies` | **21** |
| `/contact` | 43 |

The site collects, via `/order`: first name, last name, email, telephone, country, postcode, **rider height, rider weight**, current bike, riding discipline, terrain preference, purchase intent, and free-text. Via `/dealers`: business name, location, website, contact name, email, technical specialisms.

That is substantial personal data processing with a 31-word privacy notice. UK GDPR requires identified controller, lawful basis per purpose, retention periods, recipients/processors, data subject rights, and the ICO complaint route. Height and weight are body metrics — not special category data, but close enough that purpose limitation should be explicit.

Separately: **no company registration number, registered office, or trading address appears anywhere on the site.** UK companies are required to display these. There is also no email address or phone number — `/contact` is a form only.

### 4.9 — Store is transacting without the commercial layer

Eight products at real prices (Workshop Hoodie £120.00) with "ADD TO CART — PRE-ORDER" and "No payment is taken until dispatch is confirmed." Missing: any visible payment processor, shipping policy, delivery timescales, returns policy, the 14-day cancellation right under the Consumer Contracts Regulations, and VAT treatment.

Decide deliberately: either the store transacts now (Stripe + full policy set + VAT position) or it becomes an explicit waitlist with no cart. The current halfway state carries the obligations of retail without the infrastructure.

### 4.10 — What is genuinely good

Worth protecting in any rewrite: the `/order` commercial philosophy section, the pre-production disclosure acknowledgement, the "R00 ENGINEERING BASELINE" and "(SIMULATION TARGET)" qualifiers on the engineering cards, "PRODUCTION PRICE: TBC — CONTACT" rather than an invented number, the `/dealers` non-contractual disclaimer, and the store's "No lifestyle theatre" framing. These show the discipline is already in the build — it just has not been applied uniformly.

---

## 5. SEO AUDIT

### 5.1 — Blocking issues

| Issue | Evidence | Impact |
|---|---|---|
| **No `robots.txt`** | HTTP 404 | No crawl directives, no sitemap declaration |
| **No `sitemap.xml`** | HTTP 404 | ~34 routes rely entirely on link discovery |
| **Zero canonical tags** | `rel="canonical"` count = 0 on all 34 routes | No duplicate-content protection; trailing-slash, query-param and preview-domain variants all compete |
| **Zero structured data** | `application/ld+json` count = 0 sitewide | No Organization, Product, FAQPage, BreadcrumbList or Article entities. Nothing for AI answer engines to resolve. |
| **Preview domain is indexable** | No `noindex` except `/partners`, `/my-alkota` | The `.vercel.app` staging URL can index and later compete with production, and it exposes pre-production claims |

### 5.2 — Duplicate metadata

**11+ routes inherit the default title and description**, including the flagship product page:

```
/bikes/project-01        ← FLAGSHIP PRODUCT PAGE
/bikes
/engineering
/engineering/chassis
/engineering/kinematics
/engineering/materials
/engineering/testing
/journal
/configure
/support  /support/owners  /support/technical  /support/warranty
/contact  /privacy  /terms  /cookies
```

All return `<title>ALKOTA | Performance Engineering</title>` and the identical homepage description. Pages that *do* have unique metadata (`/racing`, `/order`, `/dealers`, `/about/*`, `/journal/project-01`, `/road-to-2028`, `/store`) show the pattern is understood — it just was not applied. `generateMetadata` per route fixes the whole set.

A `<meta name="keywords">` tag is present and identical sitewide. Obsolete and ignored by search engines, but it is a tell that metadata was templated rather than authored.

### 5.3 — Content depth

The four engineering pillar pages are **91–98 words each**. For a brand whose entire positioning is engineering authority, these are the pages that could rank for high-intent non-brand terms — anti-squat, leverage ratio progression, anti-rise, rearward axle path, high-modulus UD carbon layup, enduro geometry, threaded BSA vs press-fit. That is your whole non-brand opportunity and it is currently 380 words across four URLs.

Target 1,200–2,000 words each with real diagrams. These are also the pages most likely to be cited by AI answer engines, which matters more than rankings for a pre-launch brand with no domain authority.

`/journal` has three dispatches. Cadence matters more than volume — the proposition is "follow the development", so a visible publication rhythm *is* the product.

### 5.4 — Performance

Source assets are heavy:

| Asset | Size |
|---|---|
| `pete-currey-glacier-white-presentation.png` | **2.08 MB** |
| `engineering-workshop.png` | **1.82 MB** |
| `project01-alpine-testing.png` | **1.82 MB** (duplicate) |
| `project01-glacier-white-hero.jpg` | 347 KB |
| `og-image.png` | **1.17 MB** |

`next/image` is doing its job — the hero converts to 57 KB WebP at 3840w — so *served* weight is largely fine. But the source PNGs should be optimised (they are photographs stored as PNG), and the `.png` files that are actually JPEGs should be renamed.

**`og-image.png` at 1.17 MB is a real problem** — it is served raw, not through `next/image`. WhatsApp caps preview images around 300 KB and several platforms downgrade or drop above 1 MB. Re-export as a JPEG under 200 KB.

### 5.5 — Missing security headers

Present: `strict-transport-security` (Vercel default). Absent: `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`. Add via `next.config` headers — cheap, and it is a scored signal on most audit tools your future dealers may run.

### 5.6 — Brand SERP: the "Alkota" problem

This needs a deliberate decision, not a default.

A search for **"Alkota"** returns Alkota Cleaning Systems — a US industrial pressure washer manufacturer trading since 1964 from Alcester, South Dakota, with a worldwide distributor network, plus a long tail of distributor sites (alkota.com, alkotadealer.com, and multiple regional resellers). Add your own Alkota UK pressure washer business to that picture.

The bare brand term is not winnable and probably never will be. Implications:

1. **Optimise for the entity, never the bare word.** Every title, every schema entity, every backlink anchor should be "Alkota Cycles" or "Alkota Performance Engineering" — never "Alkota" alone.
2. **The domain choice carries real weight.** `alkotacycles.com` / `alkotabikes.com` disambiguate in the URL itself, which helps both search and human recognition. A subdomain or path under an existing Alkota property would be actively harmful.
3. **`sameAs` and `Organization` schema** become more important than usual, to establish Alkota Cycles as a distinct entity from Alkota Cleaning Systems in knowledge graphs.
4. **Trademark is worth checking properly.** Bicycles are Nice Class 12; pressure washers are Classes 7/11. Different classes, so likely clear — but "Alkota" is an established mark with international presence, and a low-volume premium bike brand is exactly the kind of thing that attracts opposition. Worth a search before the domain and tooling spend.
5. **Or make the shared name an asset.** There is a genuinely good story available: a family of engineering businesses that build industrial machines, now building a bicycle with the same discipline. That is authentic, it is *true*, and it is far more interesting than pretending the pressure washer company is not there. But it only works if you say it out loud.

---

## 6. DEALER / PARTNER RELATIONS

### What is working

`/dealers` is the second-strongest page on the site. The APN-01 to APN-04 criteria structure is genuinely well thought through — technical competence, customer philosophy, fit capability, brand alignment is the right four-axis model for selective distribution. "This is not a mass-market distribution exercise" and "It will not be sold through general cycle retailers" set the correct expectation. The explicit non-contractual disclaimer is honest and legally sensible. The four-stage partner journey gives a shop owner a mental model of what they are being invited into.

### Gaps

**6.1 — No commercial shape whatsoever.** A specialist shop evaluating a pre-production brand needs at least an indicative answer on: margin band, territory model (exclusive, selective, or open?), minimum stocking obligation, demo bike terms (bought, consigned, or loaned?), training and certification requirements, warranty labour reimbursement, marketing support, and payment terms. None of it appears. You do not need final numbers — you need enough shape that a shop owner can decide whether to spend an hour on a call.

**6.2 — Stage 01 dates are stale** (see 4.7). A dealer programme advertising 2024–2025 as "OPEN NOW" in mid-2026 signals a neglected page, which is the opposite of the impression you need.

**6.3 — The application form does not collect qualifying data.** It asks for business name, city, country, website, contact, email, specialisms and a free-text "Why Alkota?". It does not ask: annual turnover band, years trading, existing premium brand portfolio, number of technicians, suspension service capability (in-house or sent out?), fit system used (Retül, GebioMized, in-house?), workshop photos, trade references, or catchment. Those are the fields that let you actually shortlist rather than just collect.

**6.4 — Selective distribution has competition law implications.** A selective distribution system in the UK needs criteria that are objective, qualitative, uniformly applied and proportionate to the product — otherwise it risks falling outside the Vertical Agreements Block Exemption. Your APN criteria are largely well-drafted for this (they are capability-based, not arbitrary), but "brand alignment" and "premium single-brand presentation capability" are the softer ones. Worth a competition-aware review before the criteria become contractual, and worth documenting *why* each criterion is necessary for correct product support. Not urgent at conversation stage; essential before agreements.

**6.5 — No response commitment.** The form says "We will make contact to progress conversations when the programme is ready in your region." That could mean two weeks or two years. Give an SLA — "we respond to every application within 10 working days, even if the answer is not yet" — because the shops you most want are the busiest ones.

**6.6 — Partner portal is an unscoped stub.** Partner Reference + Email with a "REQUEST PORTAL ACCESS" button and a note that authentication is in development. Nothing behind it. Since no partners exist yet, this is defensible — but it should say what the portal *will* contain (stock allocation, technical bulletins, warranty claims, marketing assets, training records) rather than being an empty door.

**6.7 — No dealer locator, and no data model for one.** Fine to omit now, but design the partner record schema early — geo, specialisms, demo availability, certification level — because retrofitting it after twenty partners are onboarded is painful.

---

## 7. CLIENT RELATIONS & PORTAL INPUT

### What is working

`/order` is the best commercial thinking on the site. Specifically: the 7-stage pipeline with honest state labels ("NOT YET OPEN", "PLANNED"), "No payment is required at this stage", the commitment that "Reservation terms, deposit requirements and refund conditions will be published before any payment is taken", the mandatory pre-production disclosure acknowledgement, and the marketing consent as a *separate, optional* checkbox. That last detail is properly GDPR-compliant and most brands get it wrong.

The 10-question programme FAQ anticipates the right objections.

### Gaps

**7.1 — `/my-alkota` uses an insecure auth model.** Current access is "reference-based": registration reference + email, with a note that passwordless email links come later. If registration references are sequential or predictable (ALK-0001, ALK-0002), the reference is an enumerable identifier and the email is guessable or discoverable — anyone can walk the register and read other people's build preferences, height, weight and contact details.

**This must not go live in its current form.** Passwordless email-link authentication should be the *only* mechanism from day one, not a later milestone. It is a day's work with Supabase Auth and it removes a data breach vector entirely.

**7.2 — The portal promises things it does not have.** The meta description says "Manage your Project 01 registration, saved build, fit reference and development updates." None of those exist behind the login. Either build the minimum viable version (registration record, submitted preferences, position in register, update archive) or reduce the promise.

**7.3 — Body metrics need explicit purpose limitation.** The register collects rider height (required) and weight (optional). Weight being optional is correct. But with a 31-word privacy policy, there is no stated purpose, retention period, or explanation of who sees it. State it inline on the form: "Height and weight help us validate size range and suspension tune targets. Weight is optional and never shared."

**7.4 — No described update cadence.** The entire proposition is "follow the development". A registrant's first question is "how often will I hear from you, and about what?" Answer it on the page: "Roughly monthly. Engineering revisions, prototype milestones, test results — including the ones that did not work."

**7.5 — Newsletter has no visible double opt-in.** For a UK/EU audience, a confirmed opt-in flow is the safe standard and it protects deliverability on a list you will rely on for two years.

**7.6 — `/contact` has no contact details.** 43 words and a form. No email, no phone, no address, no company details. For a brand asking people to trust a two-year development programme, a form-only contact page is a trust deficit. Add a real email address at minimum.

**7.7 — No confirmation of what happens after submission.** No stated confirmation email, no reference number explanation, no next step. The register is the primary conversion on the site and its post-submission experience is undefined.

**7.8 — Consider register transparency, carefully.** Publishing "217 riders on the Project 01 register" would be powerful social proof and entirely on-brand. Only do it when the number is real and genuinely meaningful, and never round up. If it is 12, either say 12 or say nothing.

---

## 8. NEXT BUILD STEPS

Sequenced by dependency and risk, not by effort.

### PHASE 0 — Integrity gate *(do this before writing any other code)*

Port the mechanical integrity approach from the avorria rebuild. Create `lib/claims.ts` as the single source of truth for every factual assertion on the site:

```ts
type ClaimStatus = 'VERIFIED' | 'PLANNED' | 'TARGET' | 'SUPPLIER_SPEC';

interface Claim {
  id: string;              // ALK-CLAIM-001
  text: string;
  status: ClaimStatus;
  evidence?: string;       // required when VERIFIED
  reviewedAt: string;
}
```

Build-time gate: any claim rendered without a registry entry fails the build; any `VERIFIED` claim without an `evidence` field fails the build. Ships empty, populated only as evidence exists.

First pass through the registry resolves: testing status, facility capabilities, alpine R&D location, warranty terms, document metadata, frame sizes, wheel format, dealer stage dates.

Also in Phase 0:
- Delete `project01-alpine-testing.png`; either shoot/source a real field image or remove the section until prototype testing begins
- Rename the mislabelled `project01-naked-carbon.png`
- Write `CLAUDE.md` for this repo encoding the non-negotiables — no fabricated claims, no invented file metadata, no placeholder imagery in production, production curl evidence rather than AG self-reports

### PHASE 1 — Technical SEO foundation *(~1 day)*

- `app/sitemap.ts` and `app/robots.ts`
- `generateMetadata` on all 16+ routes currently inheriting defaults — unique title and description each
- `alternates.canonical` on every route
- JSON-LD: `Organization` (with `sameAs`) sitewide, `Product` on `/bikes/project-01`, `FAQPage` on `/order`, `BreadcrumbList` on nested routes, `Article` on journal entries
- `X-Robots-Tag: noindex` on the `.vercel.app` preview domain via middleware, keyed on hostname
- Security headers in `next.config.ts`
- Re-export `og-image` as JPEG under 200 KB; add per-page OG images for `/bikes/project-01`, `/order`, `/dealers`
- Drop the `keywords` meta tag

### PHASE 2 — Fix the breaks

- **Tablet nav dead zone** — `md:hidden` → `lg:hidden` on the hamburger *(single-character fix, highest impact)*
- **Configurator SSR shell** — H1, intro, static spec table, hydrating interactive layer
- **Branded 404**
- Remove the dead PDF UI from `/support/owners`
- Replace or remove placeholder social links
- Resolve the frame-size and wheel-format contradictions
- Update dealer programme dates
- Skip-to-content link, newsletter label, contrast audit

### PHASE 3 — Legal & commercial layer

- Real privacy policy, cookie policy and terms — controller identity, lawful basis, retention, rights, ICO route
- Company identity block in the footer: registered name, company number, registered office, VAT number if registered
- Real contact details on `/contact`
- Warranty rewritten as stated intent, full terms deferred to production, legal review before publication
- Store decision: full retail infrastructure (Stripe, shipping, returns, 14-day cancellation, VAT) or convert to waitlist
- Cookie consent mechanism if any non-essential cookies are set

### PHASE 4 — Structure & content depth

- Collapse four editorial streams to one journal with tags
- `/bikes` → `/bikes/project-01` consolidation
- `/dealers` → `/partners` with 301
- Ownership cluster → single `/ownership` page
- Move System Explorer to the product page as centrepiece
- Engineering pillar pages to 1,200–2,000 words each with diagrams — this is the single highest-value content investment on the site
- Establish and publish journal cadence
- Source real design archive images

### PHASE 5 — Portals

- Passwordless email-link auth (Supabase Auth) for both portals — **blocking for `/my-alkota` going live**
- Owner portal MVP: registration record, submitted preferences, register position, update archive
- Partner portal: scoped "what this will contain" state, then build against the programme timeline
- Partner application form rebuilt with real qualifying fields
- Confirmation email flows and response SLAs for both

### PHASE 6 — Brand & domain decision

- Trademark search on "Alkota" in Class 12
- Domain acquisition — `alkotacycles.com` / `alkotabikes.com`
- Decide the position on the Alkota Cleaning Systems / Alkota UK name overlap: disambiguate hard, or tell the shared-engineering-lineage story deliberately
- Real social profiles before launch

---

## 9. PRIORITY SUMMARY

**Fix this week**
1. Tablet navigation dead zone *(one character)*
2. Alpine testing image and claim
3. `/my-alkota` auth model — do not launch reference-based
4. Warranty page

**Fix this month**
5. `robots.txt`, `sitemap.xml`, canonicals, JSON-LD
6. 16 routes with duplicate metadata
7. Legal pages and company identity
8. Configurator SSR
9. Claims register + build gate

**Strategic**
10. Engineering pillar content depth
11. Structure consolidation
12. Dealer commercial pack
13. Brand/domain/trademark decision

---

*Audit covers server-rendered output and asset layer only. Animation behaviour, real-device interaction, Core Web Vitals under load, form handlers and authenticated areas were not assessable.*
