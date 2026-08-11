# Alkota Cycles — Admin Remediation & Completion
## Antigravity Prompt Pack v2

**Observed state:** `alkotabikes-ag-v001.vercel.app/admin/media` — media library empty, public header bleeding into admin, Blog / Newsletter / Commerce non-functional placeholders.

Run these in order. R1 is small and blocking. R2 is the big one.

The `GLOBAL CONSTRAINTS` block applies to every prompt here.

---

# R1 — ADMIN LAYOUT ISOLATION

Do this first. It's a 30-minute fix and everything else is harder to review while it's broken.

### PROMPT

```
R1 — ADMIN SHELL ISOLATION: THE PUBLIC HEADER IS RENDERING INSIDE /admin

DEFECT

On /admin/media the public marketing header is rendering inside the admin
interface. Visible in the admin chrome right now: the public ALKOTA logo, the
BIKES / ENGINEERING / RACING / JOURNAL / ABOUT navigation, the US·USD market
selector, a STORE link, a shopping cart icon, and a JOIN PROJECT 01 call to
action — all sitting between the admin logo and the ROLE / EXIT controls.

The admin route group is inheriting the public root layout. There is a
shopping cart on the media library page.

REQUIRED FIX

1. Restructure so the admin has a fully independent shell. Use route groups:

     app/(site)/layout.tsx     -> public chrome: header, footer, GSAP, Lenis,
                                  market selector, cart
     app/(admin)/layout.tsx    -> admin chrome only
     app/layout.tsx            -> <html>, <body>, fonts, and NOTHING ELSE.
                                  No header, no footer, no nav, no cart, no
                                  smooth-scroll provider, no market selector.

   Move every public chrome component out of the root layout and into the
   site group. The root layout must not import a single presentational
   component.

2. Verify the admin layout does not import, transitively or directly:
     - GSAP, ScrollTrigger, or any GSAP plugin
     - Lenis or any smooth-scroll provider
     - the public Header, Footer, Nav, MarketSelector, or Cart components
     - any cart or commerce context provider

   Prove it. Run `npx next build` and paste the route-level bundle sizes for
   an /admin route and a public route. If the admin bundle contains GSAP or
   Lenis, the isolation has not worked and you must find the import chain and
   report it.

3. Add a CI guard at `scripts/check-admin-isolation.ts` that fails the build
   if any module reachable from app/(admin) imports from the banned list.
   Wire it into the build script. This must be structurally impossible to
   reintroduce, not fixed once by hand.

4. The admin shell keeps ONLY: brand mark, ADMIN / OPS badge, environment
   badge, current user, ROLE indicator, sign out. Nothing else in the top bar.

5. Confirm `export const dynamic = "force-dynamic"` is set on the admin
   layout.

VERIFICATION — paste raw output
  a. Screenshot of /admin/media showing no public navigation, no currency
     selector and no cart icon anywhere on the page
  b. next build output showing the /admin route bundle size
  c. The output of the isolation guard passing
  d. Deliberately add a GSAP import to an admin component and paste the guard
     failing, then remove it
```

---

# R2 — MEDIA BACKFILL AND PAGE-FIRST CMS

This is the one you actually asked for. It has three parts: get the real images into the database, restructure the UI so it's page-first, and gate the build so it can never silently regress to zero.

### PROMPT

```
R2 — MEDIA BACKFILL AND PAGE-ORIENTED CMS MANAGEMENT

CURRENT STATE

/admin/media reports "0 assets". The media_assets table and the uploader
exist, but the existing site imagery was never ingested and no content_slot
was ever seeded. The site is still serving hardcoded image paths from the
repo while the admin shows an empty library. The CMS layer is therefore
non-functional despite being labelled LIVE in the sidebar.

Additionally the current UI is a flat asset grid. The required mental model is
PAGE FIRST: select a page, see every image slot on that page, change any of
them. Fix both.

--- STEP 1: AUDIT. DO NOT WRITE CODE YET. ---

Produce `docs/IMAGE_AUDIT.md` listing EVERY image reference in the repo:

  - file path of the component
  - the page route(s) it renders on
  - the literal src or import path
  - the asset's location on disk and its byte size
  - the current alt text, or NONE
  - a proposed page_key and slot_key
  - whether it is content, decorative, or brand furniture (logos, icons)

Include: <img> tags, next/image with literal src, CSS background-image,
imported image modules, SVGs used as components, favicons, OG images, and any
image referenced in metadata exports.

Report the total count. Then STOP and wait for my APPROVED. I need to see the
scope before you migrate anything.

--- STEP 2: BACKFILL (on approval) ---

Write `scripts/backfill-media.ts`, run once, idempotent:

  1. For every content asset in the audit, upload the actual file from the
     repo into the Supabase `media` bucket.
  2. Create the media_assets row: real filename, real mime type, real byte
     size, real dimensions via sharp, generated blur_data_url, sha256 content
     hash.
  3. alt_text: carry over the existing alt text where it exists. Where it does
     not, set the asset to needs_review — DO NOT INVENT ALT TEXT. An
     AI-written description of a product photo of a bike that does not exist
     yet is fabricated content. Leave it empty, flag it, and I will write it.
  4. licence: set to 'unknown' for every backfilled asset and flag for review.
     I will confirm provenance. Do not assume 'owned'.
  5. Skip brand furniture (logos, UI icons) — those stay as code imports. Note
     them in the audit as intentionally excluded and explain why in the doc.
  6. Idempotency: re-running must not duplicate. Match on content hash.
  7. Print a summary table: assets found, uploaded, skipped, failed, with
     reasons for each failure.

--- STEP 3: SLOT REGISTRY AND SEEDING ---

Build `lib/cms/registry.ts` as the typed source of truth, populated from the
audit. Structure:

  export const CMS_REGISTRY = {
    home: {
      label: "Home",
      route: "/",
      slots: {
        hero_image: {
          type: "image",
          label: "Hero background",
          description: "Full-bleed hero. Landscape, min 2400px wide.",
          required: true,
          aspect: "16:9",
        },
        ...
      }
    },
    ...
  } satisfies CmsRegistry;

Cover every page: home, bikes index and each bike page, engineering, racing,
journal index, about, store, and every legal page.

Then seed content_slots from the registry, wiring each slot to the media
asset backfilled in step 2. A slot whose asset could not be resolved is
created with a NULL media_id and flagged — never silently omitted.

--- STEP 4: REPLACE THE HARDCODED REFERENCES ---

Replace every content image in page components with <CmsImage pageKey=""
slotKey="" />. This is the step that makes the admin actually control the
site. If it is not done, everything above is decoration.

Go page by page and confirm visual parity against the current live site. List
each page with a PASS or a description of the difference. Do not batch this
into a single claim of "all pages migrated".

--- STEP 5: PAGE-FIRST ADMIN UI ---

RESTRUCTURE. /admin/media becomes a secondary view. The primary surface is:

  /admin/pages                  — list of every page from the registry, each
                                  showing: page name, route, slot count,
                                  filled count, a completeness bar, a warning
                                  icon if any required slot is empty, and a
                                  "view live" link
  /admin/pages/[pageKey]        — the page editor

The page editor is the thing I will use daily. Requirements:

  - Every slot for that page rendered as a card in the visual order it
    appears on the page, not alphabetically. Use the registry's declared
    order.
  - Each image slot card shows: current image thumbnail, slot label, the
    description text, required badge, current alt text, dimensions, and a
    warning if the asset's aspect ratio is materially different from the
    declared aspect.
  - "Replace image" opens the media library in a modal, filtered and
    searchable, with an inline upload tab so I can upload a new asset without
    leaving the page. Selecting an asset updates the slot immediately.
  - Focal point picker directly on the thumbnail — click to set, and show a
    live preview of how it crops at the declared aspect.
  - Alt text editable inline on the card, saving to the asset.
  - Text and rich-text slots render the correct editor inline in the same
    view. Images and copy for a page are managed in one place.
  - Empty required slots are visually loud — red border, "REQUIRED — NOT SET".
  - A persistent "Preview" button opening the live route in a new tab.
  - Save triggers revalidateTag(`cms:${pageKey}`) so the change is live in
    seconds without a deploy. Show a confirmation with a timestamp.
  - Every change writes to admin_audit_log with a before/after diff of the
    media_id.

  /admin/media remains, as the asset-centric view: full grid, bulk upload,
  bulk tagging, licence management, and a "Used on" panel per asset listing
  every page and slot that references it, with links.

--- STEP 6: BUILD GATE ---

Extend the integrity gate to fail the build on:
  - any required slot with no media_id or no value
  - a content_slot referencing a media_id that does not exist
  - a non-decorative asset with empty alt_text
  - a published asset with licence = 'unknown'
  - ANY remaining hardcoded image reference in a page component

Output must name page_key, slot_key and reason. Run it in CI.

Also add a lightweight runtime check: /admin/health displays the count of
media assets, filled slots, and required-but-empty slots. If the media count
is ever zero while slots expect assets, that is a red alert on the dashboard,
not a silent empty grid.

VERIFICATION — paste raw output for every item
  1. docs/IMAGE_AUDIT.md with the total count
  2. Backfill script summary table
  3. SQL: select count(*) from media_assets;  -> must not be 0
  4. SQL: select page_key, count(*) from content_slots group by page_key;
  5. grep -rn 'src="/' app/ components/ --include=*.tsx   -> expect no hits in
     page components
  6. Change a hero image in /admin/pages/home, then
     curl -s https://<production-domain>/ | grep -o 'supabase[^"]*'
     showing the new asset path in the live HTML
  7. Screenshot of /admin/pages showing completeness across all pages
  8. Screenshot of /admin/pages/home showing populated slots
  9. Deliberately null a required slot and paste the build failure
```

---

# R3 — SIDEBAR HONESTY

Small, but it matters. Right now the sidebar advertises features that don't exist.

### PROMPT

```
R3 — NAVIGATION MUST REFLECT REALITY

Blog & Drafts, Newsletter and Commerce currently appear in the sidebar with
PHASE 3 / PHASE 4 / PHASE 5 labels and are not clickable. A navigation item
that cannot be navigated to is a defect, not a roadmap.

Replace with a single source of truth at `lib/admin/modules.ts`:

  { key, label, href, icon, status: 'live' | 'building' | 'planned',
    requiredRole, description }

Rules:
  - status 'live'      -> normal clickable nav item, no badge
  - status 'building'  -> clickable, routes to a real page that states plainly
                          what is not yet functional and what is
  - status 'planned'   -> NOT rendered in the sidebar at all. Surfaced only on
                          a /admin/roadmap page.
  - Items the current role cannot access are not rendered.

The sidebar must never show a dead target. Either it goes somewhere real or it
is not there.

Remove the "LIVE" badge from Media Library and Content Slots until R2 is
complete and verified. Labelling an empty, non-functional CMS as LIVE is the
exact failure mode that wastes my sessions — I trusted the badge and found an
empty library.

Also: SYSTEM VERSION currently reads v0.1.0. Wire it to the actual deployed
git SHA (short) plus the Vercel environment, read from
VERCEL_GIT_COMMIT_SHA and VERCEL_ENV. A hardcoded version string tells me
nothing about what is actually deployed.
```

---

# R4 — BLOG MODULE (Phase 3 delivery)

The full spec is in the main pack under Phase 3. This is the delivery brief with the sequencing tightened.

### PROMPT

```
R4 — DELIVER THE BLOG MODULE

Implement Phase 3 from the main build pack in full. Reproduced constraints,
because these are the ones that get dropped:

  - AI DRAFTS. HUMANS PUBLISH. No auto-publish path exists, not even behind a
    flag.
  - The claim guard is BLOCKING and runs on every publish attempt, including
    human-written posts. Owner-only override with a typed justification
    written to admin_audit_log.
  - The system prompt must contain the anti-fabrication block verbatim,
    including the [[FACT_NEEDED]] token instruction.
  - Post images come from the media library only. No arbitrary URLs. Every
    in-post image has alt text.
  - post_revisions on every save, append-only, with restore.

BUILD ORDER — deliver and verify each before starting the next:

  1. Schema + RLS + admin list view. Verify: create a draft via the UI, show
     the row.
  2. Tiptap editor with autosave and revisions. Verify: edit, reload, show
     the revision rows.
  3. Media library integration for hero and in-post images. Verify: insert an
     image, show it resolves from Supabase storage on the public page.
  4. Claim guard with unit tests. Verify: paste the test output, then paste
     the block message for a post containing "140mm rear travel" and "£4,299".
  5. AI drafting endpoint. Verify: paste raw model output including any
     [[FACT_NEEDED]] tokens.
  6. Workflow states and publish. Verify: publish a real post, curl the
     production URL, show the JSON-LD.
  7. Public /journal index and post route, RSS, tag archives. Verify: curl
     each.

The journal nav item already exists on the public site. Wire it to the real
route — do not create a second blog route and leave the existing link
pointing elsewhere.

If zero posts are published, /journal renders a genuine empty state. No sample
posts, no lorem, no AI-written filler to make it look populated.
```

---

# R5 — NEWSLETTER MODULE (Phase 4 delivery)

### PROMPT

```
R5 — DELIVER THE NEWSLETTER MODULE

Implement Phase 4 from the main build pack. Non-negotiables restated:

  - The cron DRAFTS and notifies. It never sends. Sending is a deliberate
    human action with a typed SEND confirmation, every time.
  - resolve-recipients.ts is the ONLY path to a recipient list, and it is unit
    tested against every exclusion condition individually and in combination.
    Paste the test output before building the send path.
  - A campaign cannot be sent until a test send has been made for that
    campaign version.
  - Unique constraint on (campaign_id, lead_id) as the database-level
    double-send guard.
  - One-click unsubscribe with a signed token, working with no login and no
    confirmation step, plus List-Unsubscribe and List-Unsubscribe-Post
    headers.
  - Physical sender identity and postal address in every campaign footer,
    read from the settings table. Do not hardcode an address and do not
    invent one — if the setting is empty, block the send and tell me.

BUILD ORDER:
  1. Resend domain verification. Paste the SPF, DKIM and DMARC verification
     output BEFORE writing any send code. Deliverability on a cold domain is
     the whole game.
  2. Schema, suppressions, cron_runs.
  3. resolve-recipients with full unit tests. Paste output.
  4. Webhook handler with signature verification, writing bounces and
     complaints to suppressions.
  5. Campaign editor and preview.
  6. Send path with two-step confirmation and mandatory test send.
  7. Cron handlers with CRON_SECRET auth and overlap protection.

VERIFY: curl the cron endpoint without the secret and paste the 401. Then send
a test to one address, show the campaign_sends row, click unsubscribe, and
show both unsubscribed_at set and the suppression row created.
```

---

# R6 — COMMERCE MODULE (Phase 5, catalogue mode)

Needs a decision from you before AG starts.

### PROMPT

```
R6 — COMMERCE MODULE, CATALOGUE MODE ONLY

DECISION REQUIRED FROM ME BEFORE YOU START: Path A (Shopify Headless) or
Path B (self-hosted Stripe). Ask me and wait. Do not choose.

REGARDLESS OF PATH, THIS PHASE SHIPS WITH CHECKOUT DISABLED.

COMMERCE_LIVE defaults FALSE and is enforced in code against the
commerce_readiness table. It cannot be enabled while any readiness item is
unmet. The readiness items are:

  - Terms of Sale, Privacy Policy, Returns Policy, Shipping Policy and
    Warranty all PUBLISHED, not DRAFT, and version-stamped
  - Checkout captures explicit acceptance of the Terms of Sale with the
    document version stored on the order
  - UK 14-day cooling-off rights stated and the process operable
  - Product compliance data present for every purchasable variant in every
    market it is sold into
  - The outstanding trademark position resolved

Build the readiness checklist as data, owner-toggled, audit-logged, and
displayed on /admin/commerce with each item's live status. The flag check
reads the table — it is not a manual discipline.

WHAT SHIPS NOW

  - Product catalogue management in the admin
  - Product content enrichment wired to the media library from R2
  - The public STORE route rendering as catalogue
  - "Register interest" as the primary action, creating a lead of type
    'preorder_interest' through captureLead()
  - Price display gated separately behind PRICING_VISIBLE, default FALSE

There is currently a cart icon in the site header and a STORE link in the
public nav. With COMMERCE_LIVE false:
  - the cart icon must be removed entirely, not rendered empty
  - STORE routes to the catalogue with no purchase path
  - no add-to-cart control exists anywhere in the DOM

Report to me: the current state of the STORE route and the cart, what they do
today, and whether anything is currently capable of taking a payment. Answer
that question directly and explicitly before building anything.
```

---

## SEQUENCE

| | Prompt | Blocking? | Notes |
|---|---|---|---|
| 1 | R1 layout isolation | Yes | Small. Everything is easier to review after it |
| 2 | R3 sidebar honesty | No | Trivial, do it alongside R1 |
| 3 | R2 media backfill + page CMS | Yes | The main deliverable. Blocks R4 and R6 |
| 4 | R4 blog | No | Needs R2 for hero images |
| 5 | R5 newsletter | No | Needs R4 for the claim guard and source material |
| 6 | R6 commerce | No | Needs R2 for product imagery, and your path decision |

---

## THE PATTERN TO NAME EXPLICITLY

Media Library and Content Slots are badged **LIVE** in that sidebar. The library has zero assets and the slots have nothing wired to them. That badge is the failure mode — not the empty table.

Worth adding to `CLAUDE.md`:

```markdown
## Status labelling

A module is LIVE only when:
  - its schema is migrated on production
  - it holds real data, not an empty table
  - the public site actually consumes it
  - a verification curl against the production domain has been pasted

A module that is built but unpopulated is BUILDING, not LIVE.
An empty state that is indistinguishable from a broken state is a defect.
```
