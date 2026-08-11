# Alkota Cycles — Build Configurator
## Antigravity Prompt Pack (Phase 8)

**Depends on:** Phase 0 (auth/RBAC/audit), Phase 2 (media library)
**Integrates with:** Phase 1 (leads), Phase 5 (commerce), Phase 6 (SEO)

Two prompts. 8A is the data model, rules engine and admin. 8B is the public configurator, saved builds and analytics. Do not start 8B until 8A's acceptance gate passes on production.

The `GLOBAL CONSTRAINTS` block from the main pack applies to both.

---

# PHASE 8A — CONFIGURATOR MODEL, RULES ENGINE, ADMIN

### PROMPT

```
PHASE 8A — BUILD CONFIGURATOR: DATA MODEL, RULES ENGINE, ADMIN MANAGEMENT

CONTEXT AND FRAMING

Alkota Cycles is pre-production. The configurator has two jobs, in this order:
  1. Capture demand signal — which specs people actually build is the most
     valuable pre-launch data this business can gather.
  2. Sell bikes, later, once COMMERCE_LIVE is enabled.

Build it as a first-class managed system, not a hardcoded option list. I must
be able to add a fork option, price it, restrict it to two frame sizes and
publish it without a code change or a deploy.

THE FABRICATION TRAP — READ BEFORE MODELLING ANYTHING

A bike configurator wants to display total build weight, frame geometry per
size, and component specifications. You do not have verified values for any of
these. Inventing them would put fabricated engineering data in front of
customers on a product that does not yet exist.

Therefore:
  - Every option's weight_grams is NULLABLE with a required weight_source
    enum ('manufacturer_published','measured','estimated','unknown').
  - Build total weight renders ONLY when every selected option has a
    non-null weight with source in ('manufacturer_published','measured').
    Otherwise the total is hidden entirely — not shown with an asterisk, not
    shown as a range, not shown as "approx". Hidden.
  - Geometry is a separate managed table per frame size with the same
    provenance requirement. If a size has no verified geometry, the geometry
    panel does not render for that size.
  - Never compute a weight by summing estimates. Never interpolate geometry.
  - The claim guard from Phase 3 applies to all configurator display copy.

---

1. SCHEMA

Migration `configurator_core`:

`public.configurator_models`
  id              uuid pk default gen_random_uuid()
  slug            text not null unique
  name            text not null
  subtitle        text
  status          text not null default 'draft'
                  check (status in ('draft','published','archived'))
  description_json jsonb
  hero_media_id   uuid references media_assets(id)
  base_price_minor bigint            -- nullable; null = pricing not public
  currency_defaults jsonb not null default '{"GB":"GBP","US":"USD"}'
  markets         text[] not null default '{GB}'
  sort_position   integer not null default 0
  created_at, updated_at, updated_by

`public.configurator_versions`
  id              uuid pk
  model_id        uuid not null references configurator_models(id)
  version         integer not null
  status          text not null check (status in ('draft','published','superseded'))
  snapshot        jsonb not null    -- frozen full option tree + rules + prices
  published_at    timestamptz
  published_by    uuid references auth.users(id)
  note            text
  unique (model_id, version)

  WHY THIS EXISTS: a build a customer saved or ordered in March must still
  resolve correctly in November after you have repriced and removed options.
  Saved builds and orders reference a version_id, never live tables. Editing
  the live tree never mutates a published snapshot.

`public.option_groups`
  id              uuid pk
  model_id        uuid not null references configurator_models(id) on delete cascade
  key             text not null           -- 'frame_size','fork','drivetrain'
  label           text not null
  help_text       text
  group_type      text not null check (group_type in
                    ('single_select','multi_select','quantity','boolean'))
  is_required     boolean not null default true
  min_select      integer not null default 1
  max_select      integer not null default 1
  step_position   integer not null        -- ordering in the configurator flow
  affects_visual  boolean not null default false
  media_layer     text                    -- layer key for image compositing
  is_active       boolean not null default true
  unique (model_id, key)

`public.options`
  id                uuid pk
  group_id          uuid not null references option_groups(id) on delete cascade
  key               text not null
  label             text not null
  description       text
  sku               text
  manufacturer      text
  manufacturer_part text
  swatch_hex        text                  -- colour options only
  media_id          uuid references media_assets(id)   -- option thumbnail
  layer_media_id    uuid references media_assets(id)   -- visual composite layer
  weight_grams      integer                            -- NULLABLE
  weight_source     text not null default 'unknown'
                    check (weight_source in ('manufacturer_published',
                           'measured','estimated','unknown'))
  lead_time_days    integer
  is_default        boolean not null default false
  is_active         boolean not null default true
  availability      text not null default 'available'
                    check (availability in ('available','low_stock',
                           'made_to_order','discontinued','coming_soon'))
  markets           text[] not null default '{GB,US}'
  sort_position     integer not null default 0
  created_at, updated_at
  unique (group_id, key)

`public.option_prices`
  id            uuid pk
  option_id     uuid not null references options(id) on delete cascade
  currency      text not null check (currency in ('GBP','USD'))
  delta_minor   bigint not null default 0     -- signed; may be negative
  tax_inclusive boolean not null
  valid_from    timestamptz not null default now()
  valid_to      timestamptz
  unique (option_id, currency, valid_from)

  GBP prices are VAT-inclusive. USD prices are tax-exclusive. This is a legal
  difference, not a display preference — carry tax_inclusive through every
  calculation and never convert one currency from another with an FX rate.

`public.frame_geometry`
  id            uuid pk
  model_id      uuid not null references configurator_models(id)
  size_option_id uuid not null references options(id)
  measurements  jsonb not null      -- { reach_mm, stack_mm, ... }
  source        text not null check (source in ('measured','cad','unknown'))
  verified_by   uuid references auth.users(id)
  verified_at   timestamptz
  unique (model_id, size_option_id)

  Renders publicly only when source in ('measured','cad') AND verified_at is
  not null.

`public.rider_fit_bands`
  id, model_id, size_option_id, min_height_cm, max_height_cm,
  min_inseam_cm, max_inseam_cm, source text, verified_at

  Size recommendation is guidance, never an assertion. The UI must always
  state that fit is a starting point and recommend a professional fitting.
  Do not build a recommender that outputs a single size with confidence
  language. Never present it as a safety determination.

2. RULES ENGINE

Migration `configurator_rules`:

`public.configurator_rules`
  id            uuid pk
  model_id      uuid not null references configurator_models(id) on delete cascade
  name          text not null
  rule_type     text not null check (rule_type in (
                  'requires','excludes','restricts_to','auto_select',
                  'sets_default','market_only','min_quantity','max_quantity'))
  trigger       jsonb not null   -- { option_ids: [], groups: [], markets: [] }
  effect        jsonb not null   -- { option_ids: [], group_id, value }
  message       text not null    -- human-readable explanation shown in UI
  priority      integer not null default 100
  is_active     boolean not null default true
  created_by, created_at, updated_at

SEMANTICS — implement exactly:

  requires      Selecting any trigger option makes at least one effect option
                mandatory in its group. If none is currently selected, the
                group becomes invalid and is flagged, NOT auto-filled.
  excludes      Trigger and effect cannot coexist. Selecting one disables the
                other with `message` shown as the reason.
  restricts_to  Trigger narrows a target group to only the effect options.
                All others become unavailable, not hidden — a user must be
                able to see why an option disappeared.
  auto_select   Trigger forces an effect selection. See the locking rule below.
  sets_default  Trigger changes a group's default, but only if the user has
                not explicitly touched that group.
  market_only   Option is selectable only in listed markets.
  min/max_qty   Bounds on a quantity group.

EVALUATION — this is the part that goes wrong if you rush it:

  - Write ONE pure function, `evaluateConfiguration(version, selections,
    market)`, in `lib/configurator/engine.ts`. It has no I/O, no database
    access and no framework imports. The identical function runs on the
    client for instant feedback and on the server as the sole authority.
    Client output is never trusted for pricing or validity.

  - Returns:
      { resolvedSelections, availability: Record<optionId, 'available'|
        'disabled'|'unavailable_in_market'>, violations: Violation[],
        pricing: { subtotalMinor, deltas[], currency, taxInclusive },
        weight: { totalGrams | null, reason }, isValid, isComplete }

  - Iterate to a fixpoint. Deterministic ordering: priority ascending, then
    rule id. Cap at 20 iterations. If no fixpoint is reached, THROW with the
    oscillating rule ids — do not return a partial result and do not silently
    take the last state. A cycling rule set is an authoring bug I need to see.

  - USER LOCK RULE: when a user explicitly selects an option, mark it locked.
    If a later rule would change a locked selection, do NOT silently change
    it. Return a violation describing the conflict and let the user resolve
    it. Silent swapping is the single most common configurator failure and it
    destroys trust in the price shown.

  - Every violation carries the rule's `message`, the rule id and the options
    involved. Never surface "invalid configuration" with no explanation.

  - Unit test the engine exhaustively: each rule type in isolation, rule
    interaction pairs, cycle detection, market filtering, locked-selection
    conflicts, and price calculation with negative deltas and mixed tax
    inclusivity. Paste the test output. The engine is not done until the
    tests are.

3. AUTHORING SAFETY — ADMIN-SIDE VALIDATION

Before a version can be published, run and display a full validation report.
Publishing is BLOCKED on any error:

  ERRORS (block publish)
    - Rule cycle detected
    - A required group has zero selectable options in any enabled market
    - An option is unreachable — no valid configuration can include it
    - A default option is excluded by a rule that fires on another default
      (i.e. the default configuration is itself invalid)
    - An option has no price row for a currency in an enabled market
    - `affects_visual` group has options missing layer_media_id
    - An active option references a deleted media asset
    - Contradictory rules: A requires B and A excludes B

  WARNINGS (allow publish, display prominently)
    - Options with weight_source 'estimated' or 'unknown'
    - Options with no media_id
    - Rules that never fire under any reachable configuration
    - Groups with a single option (should this be a group at all?)
    - Price deltas of zero on a group where all others are non-zero

Build a DRY-RUN SIMULATOR at /admin/configurator/[model]/simulate. It runs the
engine against the draft version, lets me click through selections exactly as
a customer would, and shows the live rule trace: which rules fired, in what
order, and what each one changed. This is the tool that makes complex rule
sets debuggable. Do not skip it.

Also build a COMBINATION COUNTER showing total valid configurations and
flagging if the count is implausibly low (a rule is over-restricting) or if it
drops by more than 40% after a rule edit.

4. ADMIN UI — /admin/configurator

  Model list -> model detail with tabs:

  a) STRUCTURE
     - Option groups as a drag-reorderable list defining the configurator step
       flow. Nested drag-reorderable options within each group.
     - Inline edit for label, price delta per currency, availability, markets.
     - Bulk actions: activate/deactivate, market assignment, price adjustment
       by fixed amount or percentage (percentage adjustments compute in minor
       units and round half-up, never with float arithmetic).
     - Media picker per option, sourced from the Phase 2 library only. No URL
       inputs, no uploads outside the library.

  b) RULES
     - Rule list with type, trigger summary, effect summary, active state.
     - Visual rule builder: pick trigger options from a searchable tree, pick
       rule type, pick effect. Never require me to write JSON by hand.
     - Every rule requires a `message` before it can be saved. A rule that
       disables an option without explaining why is not permitted.
     - Conflict panel showing detected contradictions in real time as I edit.

  c) PRICING
     - Matrix view: options down, currencies across, delta and computed total
       for the cheapest and most expensive valid build per market.
     - Price history per option — all changes audit-logged.
     - Preview of the base build price and the fully-loaded build price.

  d) GEOMETRY & FIT
     - Per-size geometry entry with source and verification. Unverified rows
       are visually flagged and excluded from public rendering.
     - Rider fit bands per size with the same verification requirement.

  e) PRESETS
     `public.configurator_presets` — id, model_id, key, label, description,
     selections jsonb, hero_media_id, sort_position, is_active, badge text
     - Curated starting builds ("Trail", "Enduro", "Factory"). Each preset is
       validated against the engine on save — a preset that produces an
       invalid configuration cannot be saved.

  f) VERSIONS
     - Version list with published state, diff view between any two versions,
       publish action (owner only) that snapshots the full tree, and rollback.
     - Publishing writes to admin_audit_log and revalidates the configurator
       cache tag.

  g) ANALYTICS (populated by Phase 8B)
     - Step funnel with drop-off per group
     - Option selection share within each group
     - Average and median configured price
     - Most and least popular presets
     - Abandoned configuration count and where they stopped
     - Configurations by market

5. RLS AND CACHING

  - Public role: SELECT on published versions only, via a security-definer
    view. Never expose draft trees, cost data or inactive options to anon.
  - Admin access per the standard permission matrix. Only owner may publish a
    version or change prices.
  - Cache published version snapshots with tag `configurator:${modelSlug}`.
    Revalidate on publish. The public configurator reads the snapshot, never
    the live tables — one query, no N+1 across groups and options.

DELIVERABLES
  - Migrations for all tables with RLS policies
  - lib/configurator/engine.ts — pure, tested, zero I/O
  - Full admin UI including the simulator
  - docs/CONFIGURATOR_RULES.md explaining each rule type with a worked example

VERIFICATION — paste raw output
  1. Engine unit test results, full output
  2. Create a deliberate rule cycle and paste the publish-block message
  3. Create an unreachable option and paste the validation error
  4. Publish a version, then curl the production configurator API endpoint and
     show the snapshot
  5. Change a price in admin and show it live on production without a deploy
  6. Screenshot of the simulator showing a rule trace
```

### ACCEPTANCE GATE (8A)

- Author a rule set yourself in the admin, publish it, and confirm the public snapshot matches
- Deliberately create `A requires B` and `A excludes B` — publish must block with both rule ids named
- Set an option's weight source to `estimated` and confirm the build total disappears entirely
- Confirm draft versions are invisible to an unauthenticated request

---

# PHASE 8B — PUBLIC CONFIGURATOR, SAVED BUILDS, DEMAND CAPTURE

### PROMPT

```
PHASE 8B — PUBLIC BUILD CONFIGURATOR AND DEMAND CAPTURE

PREREQUISITE: Phase 8A published version snapshot is live and the engine test
suite passes. Do not begin otherwise.

1. ROUTE AND RENDERING

  /build/[model]                    — configurator
  /build/[model]/[configToken]      — shared / restored build

  - Server Component shell fetches the published snapshot once. The
    interactive surface is a client component receiving the snapshot as props.
    Do NOT fetch per-group or per-option — one payload, then pure client
    evaluation.
  - Selections are encoded in the URL query so state survives refresh, back
    button and sharing. Use a compact encoding, not a full JSON blob.
  - The engine runs client-side for instant feedback. Every price displayed
    and every configuration saved is REVALIDATED SERVER-SIDE before it is
    stored, quoted or added to a cart. A client-computed price is a display
    hint, never a commitment.

2. FLOW AND UX

  - Step-based flow following `step_position`, with a persistent summary rail
    showing current selections and running price.
  - Unavailable options remain VISIBLE and disabled with the rule's `message`
    as the reason. Never hide an option silently — an option that vanishes
    with no explanation reads as a broken site.
  - Locked-selection conflicts surface as an explicit choice: "Selecting X
    requires changing your Y. Change it, or keep Y and pick something else."
    Never auto-resolve.
  - Mobile: the summary rail collapses to a sticky bottom bar showing price
    and a continue action. Steps are swipeable. This will be more than half
    your traffic — build mobile first, not mobile-adapted.
  - Full keyboard operation. Radio groups use proper roving tabindex. Every
    swatch has an accessible name, never colour alone.
  - Respect prefers-reduced-motion throughout.

3. VISUALISATION

  Layered composite: base frame render + one layer per group where
  `affects_visual` is true, ordered by a defined z-index, all assets from the
  Phase 2 media library.

  - Preload the layer set for the current group's options on step entry so
    switching is instant.
  - Use next/image with the blur placeholder. Never a raw <img>.

  IF LAYER ASSETS DO NOT EXIST FOR SOME COMBINATIONS — likely, given
  pre-production status:
    - Render the base image with a clearly worded note that the visual is
      representative and does not reflect all selected options.
    - Do NOT generate, composite from stock, or approximate a render.
    - Do NOT hide the disclosure once assets partially exist. It shows unless
      every visual layer for the current configuration is present.
    - Report to me which combinations lack assets so I can commission them.

  Do not build a 3D viewer in this phase. Layered 2D first, proven, then
  revisit.

4. SAVED BUILDS — THE DEMAND SIGNAL

`public.saved_builds`
  id                uuid pk
  token             text not null unique      -- short, URL-safe, unguessable
  model_id          uuid not null references configurator_models(id)
  version_id        uuid not null references configurator_versions(id)
  selections        jsonb not null
  computed_price_minor bigint
  currency          text
  market            text
  is_valid          boolean not null
  lead_id           uuid references leads(id)
  session_id        text
  utm               jsonb
  status            text not null default 'saved'
                    check (status in ('saved','shared','enquiry_sent',
                           'added_to_cart','ordered','abandoned'))
  view_count        integer not null default 0
  created_at, updated_at

  - version_id is what makes a build restorable. Restoring against a
    superseded version: resolve using the ORIGINAL snapshot, then show a
    clear notice if any option is no longer available, with the specific
    options named. Never silently substitute.
  - Anonymous saving is allowed and encouraged — capturing the configuration
    matters more than capturing the email. Prompt for email AFTER the build
    is saved, as an optional "send this to yourself".
  - Email capture routes through captureLead() with lead_type
    'preorder_interest' and full consent handling. The saved build id goes
    into lead metadata.

`public.configurator_events`
  id, session_id, saved_build_id, model_id, event_type, group_key, option_key,
  step_index, market, payload jsonb, created_at

  Event types: started, step_viewed, option_selected, option_deselected,
  rule_blocked, preset_applied, price_revealed, saved, shared, email_captured,
  enquiry_submitted, added_to_cart, abandoned.

  - Batch events client-side and flush on an interval and on page hide. Never
    block interaction on an analytics write.
  - Record `rule_blocked` events specifically — repeated blocks on the same
    rule mean the rule set is fighting customers, and I want to see that.
  - No PII in the event payload. Session id only.

5. COMMERCE INTEGRATION — GATED

  While COMMERCE_LIVE is false:
    - Primary action is "Register interest in this build" -> saved build +
      lead capture.
    - Price displays only when PRICING_VISIBLE is true. When false, show the
      build summary with no monetary values anywhere, including in the shared
      link and any email.

  When COMMERCE_LIVE is true:
    - Server-side revalidation of the entire configuration and price before
      cart add. Reject with a clear message if the snapshot has changed.
    - Path A (Shopify): the configuration becomes a line item with the full
      selection set as line item properties, priced against the resolved
      total. Store the saved_build token as a property for order lookup.
    - Path B (Stripe): the cart line snapshots the full resolved
      configuration, the version id, and the itemised price breakdown.
    - The order record must contain a complete human-readable spec sheet of
      what was configured. An order that only stores option ids is unusable
      by whoever has to build the bike.

6. SHARING AND SEO

  - Share link at /build/[model]/[token] with a dynamically generated OG image
    showing the composite render and the build name.
  - Shared builds are indexable ONLY if I explicitly enable it per model.
    Default noindex — thousands of near-duplicate configuration URLs is an
    index-bloat problem, and the Phase 6 sitemap must exclude them.
  - Canonical on every configuration URL points to /build/[model].
  - The configurator entry page gets full metadata and Product JSON-LD only
    if real price and availability exist. Otherwise omit Product schema
    entirely rather than emitting invented offer data.

7. ADMIN VIEWS — /admin/configurator/[model]/builds

  - Saved build list: created, market, price, valid state, lead attached,
    status, view count
  - Detail view rendering the full spec sheet plus the composite image
  - Filters by market, price band, date, status, and by specific option
    selected — I need to answer "how many people configured the carbon wheels"
  - Export to CSV, audit-logged
  - Aggregate panel: option selection share per group, price distribution
    histogram, funnel drop-off by step, top 20 complete builds by frequency

  This aggregate view is the actual pre-launch deliverable. Make it good.

8. PERFORMANCE BUDGET

  - Snapshot payload under 150KB gzipped. If it exceeds that, split option
    media metadata into a lazy second fetch.
  - Configurator route interactive within 2.5s on a mid-tier mobile device
    over 4G. Measure and report the real number.
  - No layout shift on option change — reserve the visual area.
  - Engine evaluation under 16ms for a full re-run. Memoise per selection set.

VERIFICATION — paste raw output
  1. curl -s https://alkotacycles.com/build/[model] and show the snapshot
     rendering with real options
  2. Configure a build on production, save it, and paste the saved_builds row
  3. Open the share link in a private window and show it restores exactly
  4. Trigger a rule block and screenshot the message shown to the user
  5. Show configurator_events rows landing for a full session
  6. Show the aggregate analytics panel with real data
  7. With PRICING_VISIBLE=false, curl the page and grep for currency symbols
     — expect zero matches
  8. Lighthouse mobile score for the configurator route
```

### ACCEPTANCE GATE (8B)

- Configure a build on your phone, on production, over mobile data. Save it, share it to yourself, restore it. Any friction here is real friction.
- Supersede the version in admin, then reopen an old share link — it must resolve against the original snapshot and name any unavailable options explicitly.
- With `PRICING_VISIBLE=false`, no price appears anywhere including the OG image and the confirmation email.
- Repeatedly hit a rule block and confirm `rule_blocked` events are recording.

---

## RULE AUTHORING REFERENCE

Give this to whoever maintains the option tree.

| Intent | Rule type | Example |
|---|---|---|
| Coil shock only on the long-travel frame | `restricts_to` | Trigger: frame = Enduro → shock group restricted to coil options |
| Carbon wheels force the higher-rated hub | `requires` | Trigger: wheels = carbon → hub group must include Pro hub |
| Dropper post won't fit the smallest frame | `excludes` | Trigger: size = S → excludes 200mm dropper |
| US market can't have the EU-only light kit | `market_only` | Option: light kit → markets = {GB} |
| Picking the race build presets the cockpit | `sets_default` | Trigger: preset = Race → default bar = 760mm |
| Frame size auto-sets the crank length | `auto_select` | Trigger: size = S → crank = 165mm |

**Authoring discipline:** prefer `restricts_to` over stacking many `excludes`. Ten exclusion rules that could be one restriction rule are ten places for a contradiction to hide, and the simulator's rule trace becomes unreadable.

---

## WHY VERSIONING IS NON-NEGOTIABLE

The failure this prevents: a customer configures a build in month one and saves the link. In month four you drop a fork option and reprice the wheels. Without snapshots, that link either 500s, silently resolves to a different bike, or quotes a price you never offered. With an order attached, that's a contract dispute.

`configurator_versions.snapshot` is the frozen tree. Saved builds and order lines reference the version. The live tables are the editing surface only.

---

## SEQUENCING NOTE

8A can start as soon as Phase 2 (media library) is done — it doesn't need commerce. 8B needs 8A plus Phase 1 (lead capture) for the demand-capture path.

Run the configurator in interest-capture mode for as long as it takes to accumulate meaningful data. Every saved build is a genuine market research record, and unlike a survey, the person configuring wasn't asked to imagine what they'd want — they built it.
