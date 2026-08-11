# ALKOTA CYCLES — LEGAL & COMMERCIAL LAYER
## Audit of live build + revised Phase 3 prompt
### alkotabikes-ag-v001.vercel.app · re-audited 9 August 2026

---

# PART A — WHAT AG BUILT

Credit first, because the delta is large. Phases 0–2 and 4–6 have substantially landed:

- **Canonicals on every route** (was zero), **JSON-LD on every route** (was zero, now 2–6 blocks per page), sitemap and robots both serving
- **Metadata is authored** on most routes — `/engineering/kinematics` now reads "Suspension Kinematics — Leverage Ratio, Anti-Squat…"
- **Engineering pillar pages hit target**: kinematics 1,029 words, materials 1,056, testing 1,234 (were 91–98)
- **Configurator now server-renders** — 231 words and a real H1 (was a loading spinner)
- **Redirects in place**: `/bikes`→`/bikes/project-01`, `/support/*`→`/ownership`, `/journal/project-01` and `/racing/dispatch`→`/journal`
- **The alpine testing fabrication is gone**, and `ACTIVE TRAIL TESTING` no longer appears

And the legal centre is genuinely well-built. Far beyond what I asked for:

| Document | Words | Assessment |
|---|---|---|
| `/terms` | 853 | Strong. Defined terms, Build Lock, Development Register explicitly non-contractual, statutory rights preserved |
| `/warranty` | 610 | **Correctly fixed.** "TO BE CONFIRMED BEFORE PRODUCTION RELEASE", commercial-vs-statutory distinction, third-party component handling |
| `/privacy` | 598 | 26 sections. Retention periods stated (enquiries 24m, registrations 36m, financial 6y), ICO complaint route, international transfers, full rights set, explicit "do not submit medical data" warning on fit fields |
| `/cookies` | 517 | Four-tier categorisation, analytics off until active consent, explicit no-dark-patterns commitment, equal prominence for reject |
| `/legal` | 309 | Operator particulars, IP, pre-production status, renders disclaimer |
| `/returns` | 414 | New — didn't exist |
| `/shipping` | 238 | New — didn't exist |
| `/complaints`, `/accessibility`, `/safety` | 266 / 362 / 641 | All new |

Every document carries a version ID (`ALK-DOC-PRIVACY-001`), effective date, and a DRAFT status banner. `CookieConsentProvider` is wired into the root layout. That is a better legal architecture than most funded startups ship.

**So the revised Phase 3 is not a rebuild. It is a completion, enforcement and de-risking pass.**

---

# PART B — LEGAL LAYER: GAPS

## B1 — CRITICAL: the DRAFT banner is a soft gate with no teeth

Every legal document says:

> LEGAL CONFIGURATION INCOMPLETE — PRE-PRODUCTION DRAFT … It must pass legal review and be approved **before live commercial transactions**.

Meanwhile `/store/workshop-hoodie` still renders **"ADD TO CART — PRE-ORDER"** at £120.00, and `/cart` is live.

The document states the condition and nothing enforces it. The original Phase 3 prompt specified a build-failure gate on null company fields; AG routed around it by shipping honest-looking placeholder strings instead. That is a reasonable engineering instinct — the site had to stay deployable — but the result is that incomplete legal terms and an active commercial funnel coexist.

**The fix is not a harder build gate. It is a runtime gate on commercial capability**, which I've specified in the revised prompt below.

## B2 — CRITICAL: trade mark representation

`/legal` §08 states:

> ALKOTA, ALKOTA CYCLES, and PROJECT 01 are **registered or pending** brand identifiers.

Under **s.95 Trade Marks Act 1994** it is a criminal offence to falsely represent a mark as registered. "Registered or pending" is ambiguous drafting that asserts registration without committing to it — the worst of both positions.

This matters more than usual here because "Alkota" collides with **Alkota Cleaning Systems**, a US industrial manufacturer trading since 1964 with an international distributor network. If no UK Class 12 registration exists, this line must go.

**Action: verify the actual filing position, then state it precisely — or remove the section and use plain ™ (which requires no registration).**

## B3 — Dangling document references

Three legal documents reference documents that do not exist:

| Source | Reference | Status |
|---|---|---|
| `/terms` §01 | "the separate **Project 01 Reservation Terms** shown to you before any reservation payment is taken" | Does not exist |
| `/warranty` §01, §02 | "Where stated in the applicable **Warranty Schedule**" / "Your My Alkota record will display the warranty schedule applicable to your individual Bike" | Does not exist |
| `/legal` §07 | "Press downloads are for accredited media evaluation subject to **press terms**" | Does not exist |

Each is a promise embedded in a legal document. Either create the document, or remove the reference.

## B4 — Controller identity is legally defective

`/privacy` §01 names the controller as **"Alkota Cycles (Legal Entity Pending)"**. UK GDPR Art. 13 requires the controller's *identity and contact details*. A placeholder is not an identity, so the notice does not currently satisfy Art. 13.

Also absent: registered address, ICO registration number, named processors (the policy lists processor *categories* — "hosting providers, payment processors, transactional email services, logistics partners" — which is acceptable practice but weaker than naming them), and any statement on whether a DPO or UK representative is appointed.

## B5 — No company identity anywhere on the site

Grep across the live site returns **zero** hits for "Company No", "Registered in England", "registered office", "VAT", "Companies House".

Two separate obligations are unmet:
- **Companies Act 2006 / Trading Disclosures Regulations 2015** — registered name, company number, place of registration and registered office address must appear on the website
- **E-Commerce Regulations 2002 reg. 6** — name, geographic address, and an email address enabling rapid direct contact

## B6 — `/contact` still has no contact details

61 words and a form. No email, no telephone, no address, no response-time indication. `privacy@alkotacycles.com` and `legal@alkotacycles.com` appear inside the legal documents but nowhere a customer would look. E-Commerce Regs reg. 6 requires an email address to be "easily, directly and permanently accessible".

## B7 — Metadata and duplication defects on legal routes

- **`/cookies` inherits the default homepage title** — "Performance Mountain Bikes | Alkota Cycles". Same on `/faq` and `/glossary`.
- **`/warranty` and `/support/warranty` both return 200** with identical content. `/support/*` redirects to `/ownership` for the other three children but warranty was left as a live duplicate.
- **Title template appends the brand twice sitewide** — `<title>About | Alkota Cycles | Alkota Cycles</title>`. Affects nearly every route including all legal pages.

## B8 — Cookie consent needs behavioural proof

`CookieConsentProvider` is present in the layout and no `Set-Cookie` header fires on the homepage, which is a good sign. But the policy makes specific, testable commitments — analytics off until active acceptance, reject and accept at equal prominence, no re-asking after a choice, withdrawal as easy as granting. None of that is verified. It needs a behavioural test, not a code review.

---

# PART C — COMMERCIAL LAYER: GAPS

## C1 — CRITICAL: partner recruitment page has been destroyed

This is the most serious commercial regression in the build.

`/partners` is now **41 words** — a portal login form only. The recruitment page that previously existed (APN-01 to APN-04 criteria, the four-stage partner journey, the application form, the non-contractual disclaimer — roughly 800 words, and the second-strongest page on the site) **no longer exists at any URL**.

Worse, it now loops:

```
/partners  →  "Not yet a partner? Apply here"  →  /dealers#apply
/dealers   →  308  →  /partners
```

A dealer clicking "Apply here" is returned to the login page they came from. **There is no way for any shop to apply to the partner network.** The dealer pipeline is dead.

My Phase 4 prompt said to move recruitment to `/partners` and the portal to `/partners/portal`. AG moved the portal to `/partners` and dropped the recruitment content. `/partners/portal` returns 404.

## C2 — Store operates a commercial funnel on draft terms

- Real prices live: £45, £55, £120
- **"ADD TO CART — PRE-ORDER"** active on product pages
- `/cart` live
- No payment processor
- No `STORE_MODE` flag — the decision gate I specified was not implemented
- `/returns` and `/shipping` now exist (good) but are not surfaced at the point of sale
- No VAT statement
- No terms-of-sale acceptance step
- Product cards mix states: "PRE-LAUNCH", "COMING 2027", "COMING SOON" — some with prices, some without

The catalogue framing is honest ("PRE-LAUNCH CATALOGUE · ITEMS AVAILABLE ON RELEASE"), but a live add-to-cart with real prices on unapproved draft terms is the exact scenario the DRAFT banner says must not happen.

## C3 — `/journal` no longer server-renders

`/journal` returns **3 words**: "LOADING JOURNAL FEED..."

Phase 4's unified tag-filtered feed reintroduced the exact client-only rendering pattern that Phase 2 fixed on `/configure`. The journal is the delivery mechanism for the "follow the development" proposition and the home of the engineering content — and it is currently invisible to crawlers and to anyone with slow JS.

## C4 — `robots.txt` is serving the production ruleset on the preview domain

```
User-Agent: *
Allow: /
Sitemap: https://alkotacycles.com/sitemap.xml
```

The Phase 1 spec was disallow-all when not production. The check was written against `VERCEL_ENV`, but **Vercel sets `VERCEL_ENV=production` for the production branch deployment even on a `.vercel.app` domain**. The condition must key on *hostname*, not environment.

Consequence: the preview is fully crawlable, and it is advertising a sitemap on a domain that isn't live yet.

## C5 — Contact form is the only route to the business

No email, no phone, no partner enquiry route now that the application form is gone, no response SLA.

---

# PART D — HOTFIX BEFORE PHASE 3

Three of these are outside the legal/commercial scope but block or distort it. Do them first — they're small.

```
HOTFIX — run before Phase 3-R.

1. PARTNER RECRUITMENT RESTORATION (blocking, commercial)
   The partner recruitment page has been deleted and /partners is now the portal.
   Restore from git history the page previously at /dealers — APN-01..04 criteria,
   four-stage partner journey, application form, non-contractual disclaimer.
   Correct structure:
     /partners          → RECRUITMENT (restored content) + #apply anchor
     /partners/portal   → portal login (currently at /partners, currently 404 at /portal)
     /dealers           → 301 to /partners  (already in place, keep)
   Fix the "Apply here" link to /partners#apply — it currently points at /dealers#apply
   which 308s back to /partners, creating a loop with no application route.
   Verify: curl -s $URL/partners | grep -c "APN-0"   → must be 4
           curl -s -o /dev/null -w "%{http_code}" $URL/partners/portal  → 200

2. JOURNAL SSR (blocking, SEO)
   /journal server-renders only "LOADING JOURNAL FEED...". Apply the same fix used on
   /configure: server-render the full entry list and tag set, hydrate the filter
   interaction over it. Filtering is a client enhancement, not a prerequisite for
   content existing. Tag filters must also work as real hrefs (/journal?tag=chassis)
   so each filtered view is crawlable and linkable.
   Verify: curl -s $URL/journal | wc -w  → must be >400

3. ROBOTS HOSTNAME CHECK (SEO)
   app/robots.ts keys on VERCEL_ENV, but Vercel sets VERCEL_ENV=production for the
   production deployment even on a .vercel.app domain, so the preview is serving
   Allow: / and advertising the alkotacycles.com sitemap.
   Change the condition to test the request hostname against alkotacycles.com.
   Verify: curl -s $URL/robots.txt  → must be Disallow: /

4. TITLE TEMPLATE (SEO)
   Titles render the brand twice: "About | Alkota Cycles | Alkota Cycles".
   The layout title.template and the per-page titles are both appending it. Remove
   the brand from per-page title strings and let the template add it once.
   Also: /cookies, /faq and /glossary still inherit the default homepage title —
   give each authored metadata.
   Verify: for r in / /about /cookies /faq /glossary /privacy /terms /warranty; do
             curl -s $URL$r | grep -o '<title>[^<]*</title>'; done
           → no title contains "Alkota Cycles" twice

5. WARRANTY DUPLICATE
   /warranty and /support/warranty both return 200 with identical content.
   301 /support/warranty → /warranty. Confirm the canonical on /warranty is self-
   referential and that only /warranty appears in the sitemap.
```

---

# PART E — REVISED PHASE 3-R PROMPT

**What changed from the original, and why:**

| Original Phase 3 | Revised Phase 3-R | Reason |
|---|---|---|
| Build fails on null company fields | **Two-tier gate**: commercial capability disabled at runtime while DRAFT; build fails only on the production hostname | AG routed around the build gate with DRAFT banners because the site had to stay deployable. Gating *capability* rather than *deployment* enforces the real requirement — no contracts on unapproved terms — while keeping preview shippable. |
| Write privacy/cookies/terms from scratch | Complete and correct what exists | The documents are already strong. Rewriting would lose good work. |
| — | **Trade mark representation** section | New finding: s.95 TMA 1994 exposure on `/legal` §08. |
| — | **Dangling document references** section | New finding: three legal docs reference documents that don't exist. |
| — | **Cookie consent behavioural testing** | The provider exists; the policy's specific commitments are now testable and must be tested. |
| `STORE_MODE` flag | `STORE_MODE` **bound to `LEGAL_STATUS`** | Prevents the store re-enabling independently of legal approval. |

```
PROJECT: Alkota Cycles (alkotacycles.com) — Next.js 15 App Router, Tailwind, Vercel, Supabase.

TASK: Complete, enforce and de-risk the legal and commercial layer.

CONTEXT — READ BEFORE STARTING
A comprehensive legal centre already exists at /legal, /privacy, /terms, /cookies,
/warranty, /returns, /shipping, /complaints, /accessibility, /safety. It is good work.
DO NOT REWRITE THESE DOCUMENTS. This phase completes them, adds the missing company
identity layer, and — most importantly — makes the DRAFT status actually enforce
something.

Every legal document currently states it "must pass legal review and be approved
before live commercial transactions." Meanwhile /store/workshop-hoodie renders
"ADD TO CART — PRE-ORDER" at £120.00 and /cart is live. The stated condition is not
enforced by anything. That is the central problem this phase solves.

=== TASK 1: THE LEGAL STATUS GATE (CORE OF THIS PHASE) ===

Create lib/legal-status.ts:

  export type LegalStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED';

  export interface LegalDocument {
    id: string;              // ALK-DOC-PRIVACY-001
    route: string;
    version: string;
    status: LegalStatus;
    approvedBy: string | null;   // required when APPROVED
    approvedAt: string | null;   // required when APPROVED
  }

  export const LEGAL_DOCUMENTS: LegalDocument[] = [ /* all 10 documents */ ];

  // True only when every document required for commerce is APPROVED
  export const commerceEnabled: boolean = ...

TIER 1 — RUNTIME CAPABILITY GATE (this is the important one)

While commerceEnabled === false, the following must be structurally impossible,
enforced server-side — not hidden with CSS, not disabled with a client-side prop:

  - Add-to-cart: the action must not exist. Remove the button and return 404/redirect
    from any cart mutation route.
  - Checkout and payment routes: must not exist.
  - Any form that would create a contractual obligation or take payment.

Permitted while DRAFT: the Project 01 Register (explicitly non-contractual per
/terms §01), newsletter signup, contact form, partner application.

The gate must be evaluated server-side in the route handler or server component.
A client-side conditional is not acceptable — it can be bypassed.

TIER 2 — PRODUCTION BUILD GATE

Build fails ONLY when the deploy target hostname is alkotacycles.com AND any
required company identity field is null, OR any document required for the enabled
feature set is not APPROVED.

Preview and development deploys build normally with DRAFT documents. This is
deliberate — the site must stay deployable while legal work completes.

IMPORTANT: do not resolve this gate by adding placeholder strings, "TBC" values,
"Pending" text, or example data. If a value is unknown the field stays null and the
production build fails. That is the correct outcome.

=== TASK 2: COMPANY IDENTITY ===

Create lib/company.ts with every field null:

  legalName, companyNumber, placeOfRegistration, registeredOffice{...},
  tradingAddress{...}, vatNumber, vatRegistered (boolean), icoRegistrationNumber,
  generalEmail, legalEmail, privacyEmail, partnerEmail, telephone,
  dpoAppointed (boolean), dpoContact

Render a company identity block in the footer: registered name, company number,
place of registration, registered office. Required by the Companies Act 2006 and
the Trading Disclosures Regulations 2015. Add VAT number when vatRegistered is true.

Replace "Alkota Cycles (Legal Entity Pending)" in /privacy §01, /legal §01 and
/warranty §01 with values sourced from lib/company.ts. A UK GDPR Art. 13 notice must
identify the actual controller — a placeholder does not satisfy it.

Output a single checklist of every value the owner must supply.

=== TASK 3: TRADE MARK REPRESENTATION — LEGAL RISK ===

/legal §08 currently reads:
  "ALKOTA, ALKOTA CYCLES, and PROJECT 01 are registered or pending brand identifiers."

Under s.95 Trade Marks Act 1994 it is a criminal offence to falsely represent a mark
as registered. "Registered or pending" asserts registration without committing to it.

Note also that "Alkota" collides with Alkota Cleaning Systems, an unrelated US
industrial manufacturer trading since 1964 with an international distributor network.

ACTION: add a trademarks field to lib/company.ts:

  trademarks: { mark: string; status: 'REGISTERED'|'PENDING'|'UNREGISTERED';
                jurisdiction: string; class: number; number: string|null }[]

Ship it EMPTY. Rewrite /legal §08 to render from this registry. When the registry is
empty, the section must state only that the marks are used as unregistered trade
marks — the ™ symbol requires no registration and carries no false-representation
risk. Never render "registered" for an entry whose status is not REGISTERED with a
real registration number.

=== TASK 4: DANGLING DOCUMENT REFERENCES ===

Three legal documents reference documents that do not exist:

  a) /terms §01 — "the separate Project 01 Reservation Terms shown to you before any
     reservation payment is taken"
  b) /warranty §01 and §02 — "the applicable Warranty Schedule" / "Your My Alkota
     record will display the warranty schedule applicable to your individual Bike"
  c) /legal §07 — "Press downloads are for accredited media evaluation subject to
     press terms"

For each: either create the document, or remove the reference. Do not leave a legal
document promising a document that does not exist.

RECOMMENDATION — Project 01 Reservation Terms should be CREATED, because reservations
are the next commercial milestone and /order already commits that "Reservation terms,
deposit requirements and refund conditions will be published before any payment is
taken." Draft it with deposit amount, refundability, cancellation rights, price-change
handling, allocation and delivery-timing caveats as null-valued fields that fail the
production gate. Status DRAFT.

Warranty Schedule and press terms should be REMOVED as references until they exist.

=== TASK 5: PRIVACY POLICY COMPLETION ===

The document is strong — 26 sections, retention periods stated, ICO route present,
rights covered. Do not rewrite it. Complete these gaps:

  - Controller identity from lib/company.ts (Task 2)
  - ICO registration number, or an explicit statement if registration is not required
  - DPO / UK representative position stated either way
  - Named processors: the policy lists categories only. Create lib/processors.ts
    listing each actual processor (hosting, email, auth, storage, analytics if any)
    with name, purpose, and country. Render from it. Ships empty; the production gate
    fails on an empty processor list.
  - "Rectification" does not appear — §17 lists "Correction". Use the statutory term
    with the plain-English gloss.

Add inline microcopy at the /order form fit fields explaining that height and weight
inform size range and suspension tune validation, that weight is optional, and that
neither is shared. The policy already warns against submitting medical data — mirror
that at the point of collection, which is where it actually protects anyone.

=== TASK 6: COOKIE CONSENT — BEHAVIOURAL VERIFICATION ===

CookieConsentProvider exists in the root layout. /cookies makes specific, testable
commitments. Verify each behaviourally and fix any that fail:

  - No analytics, functional or marketing storage before active consent
  - Reject and Accept at genuinely equal visual prominence (equal size, weight,
    contrast, position — measure it, don't assert it)
  - Choice persisted; no re-asking after a decision
  - Withdrawal via Cookie Settings in the footer, as easy as granting
  - Declining does not restrict access to editorial content

Also produce a real technology inventory — every cookie and every localStorage /
sessionStorage key the site actually sets, including configurator build state,
consent state, cart state and auth. Render /cookies §technology register from that
inventory rather than from prose. If the inventory and the policy disagree, the
inventory is correct and the policy must change.

=== TASK 7: STORE MODE — BOUND TO LEGAL STATUS ===

Implement STORE_MODE: 'CATALOGUE' | 'TRANSACTIONAL'.

  TRANSACTIONAL requires ALL of: commerceEnabled === true (Task 1), Stripe
  integration, /returns, /shipping, terms-of-sale acceptance at checkout, VAT
  position resolved, and 14-day cancellation rights surfaced at point of sale.
  Build fails if TRANSACTIONAL is set without all of them.

  CATALOGUE (default now): remove add-to-cart and /cart entirely. Replace with
  register-interest capture per product. Keep prices — they are honest indicative
  pricing — but label them explicitly as indicative pre-launch pricing.

Normalise the product state labels. Products currently mix "PRE-LAUNCH", "COMING
2027" and "COMING SOON", some with prices and some without. Define one state enum and
apply it consistently.

=== TASK 8: CONTACT ===

/contact is 61 words and a form — no email, no telephone, no address, no response
time. E-Commerce Regulations 2002 reg. 6 requires an email address that is "easily,
directly and permanently accessible".

Rebuild from lib/company.ts: general, legal, privacy and partner email addresses;
telephone if supplied; trading address; stated response times per enquiry type.
Keep the form alongside — it is not a substitute.

Add a partner enquiry route that reaches the restored partner application.

=== TASK 9: LEGAL CENTRE INDEX ===

/legal is currently the Legal Notice document. The footer labels it "Legal Centre"
and every document has a "RETURN TO LEGAL CENTRE" link — so the mental model is
already there and the destination is wrong.

Create /legal as a proper index listing all documents with id, version, status and
effective date, rendered from LEGAL_DOCUMENTS. Move the Legal Notice content to
/legal/notice. 301 as needed. Keep "RETURN TO LEGAL CENTRE" pointing at /legal.

=== RULES ===
- Do not rewrite the existing legal documents. Complete and correct them.
- Never invent a company number, VAT number, address, registration number, processor
  name, trade mark number or approval signature. Null is correct; build failure on
  production is correct.
- Do not resolve a gate by adding placeholder or "pending" text. That is what
  happened last time and it is why this phase exists.
- Tier 1 capability gating must be server-side.
- No legal document may reference a document that does not exist.

=== VERIFICATION — RAW OUTPUT, NOT SUMMARIES ===
1.  cat lib/legal-status.ts lib/company.ts lib/processors.ts
2.  Prove Tier 1: curl -s $URL/store/workshop-hoodie | grep -ic "add to cart" → 0
    curl -s -o /dev/null -w "%{http_code}" $URL/cart → 404 or redirect
    POST directly to any cart mutation endpoint — paste the rejection
3.  Prove Tier 2: set hostname to alkotacycles.com, run build, paste the failure
    listing every missing field
4.  Prove preview still builds: npm run build with DRAFT documents → success
5.  curl -s $URL/ | grep -iE "company no|registered office|registered in england"
6.  curl -s $URL/legal/notice | grep -i -A3 "trade mark" → must not claim registration
7.  grep -rn "Legal Entity Pending" app/ components/ lib/ → zero hits
8.  grep -rn "Reservation Terms\|Warranty Schedule\|press terms" app/ → every
    remaining reference must resolve to a real route; paste each target's HTTP code
9.  Cookie test: fresh session, list every cookie and storage key set BEFORE any
    consent interaction. Screenshot the banner showing reject/accept parity.
10. curl -s $URL/contact | grep -oE "[a-z]+@alkotacycles\.com"
11. curl -s $URL/legal | grep -c "ALK-DOC-" → must list all documents
12. The owner-supplied-values checklist
```

---

# PART F — VALUES YOU NEED TO SUPPLY

Phase 3-R will stall on the production gate until these exist. Worth gathering before you start it:

**Entity** — registered legal name · company number · place of registration · registered office · trading address · VAT number and registration status · ICO registration number (or confirmation none needed) · whether a DPO is appointed

**Contact** — general, legal, privacy and partner email addresses · telephone · stated response times

**Trade marks** — actual filing position for ALKOTA CYCLES and PROJECT 01, with jurisdiction, class and number. Given the Alkota Cleaning Systems collision, this is worth resolving properly rather than answering from memory.

**Processors** — the real list: Vercel, Supabase, Resend, and anything else touching personal data, with country of processing

**Decisions** — store mode now (my recommendation: CATALOGUE until reservations open) · whether to draft Project 01 Reservation Terms now or defer · who signs off `APPROVED` on each legal document

---

## PRIORITY ORDER

1. **Hotfix Part D** — partner recruitment is the urgent one. No shop can currently apply to your dealer network, and the "Apply here" link loops back on itself.
2. **Phase 3-R Task 1** — the capability gate. Until it exists, you have an active commercial funnel running on documents that say they must not be used commercially.
3. **Phase 3-R Task 3** — the trade mark line, which is the only item here carrying criminal rather than civil exposure.
4. Everything else in Phase 3-R, which will pause pending Part F.
