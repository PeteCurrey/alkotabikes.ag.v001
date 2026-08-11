# Alkota Cycles — `/admin` Build Programme
## Antigravity Prompt Pack

**Target repo:** alkotacycles.com
**Stack:** Next.js 15 App Router · Supabase (Postgres + Auth + Storage + RLS) · Tailwind · Vercel · GSAP ScrollTrigger · Lenis
**Sequence:** Phases are dependency-ordered. Do not start a phase until the previous phase's Acceptance Gate has passed against production.

---

## HOW TO USE THIS PACK

Each phase contains:

- **PROMPT** — paste verbatim into AG. Do not summarise it.
- **ACCEPTANCE GATE** — you run these yourself. AG does not mark its own homework.

**Rules that apply to every prompt in this pack.** Append this block to each prompt you paste, or better, add it to `CLAUDE.md` once and reference it:

```
GLOBAL CONSTRAINTS — ALKOTA CYCLES ADMIN

1. NO FABRICATION. Do not invent product specifications, weights, geometry
   figures, prices, launch dates, materials, test results, awards, review
   quotes, customer names, testimonials, staff names, addresses, or
   certifications. If a value is unknown, the field stays NULL and the UI
   renders an explicit empty state. Never a placeholder that reads as real.

2. NO PLACEHOLDER IMAGERY IN PRODUCTION. No stock bikes, no Unsplash, no
   AI-generated product photography, no competitor imagery. If an image slot
   has no asset, render the defined empty state.

3. NOT DONE UNTIL DEPLOYED. A task is complete only when the change is live on
   the production domain and you have pasted the raw `curl` output proving it.
   Local dev output, build logs, and "should now work" are not evidence.

4. MONEY IS INTEGER MINOR UNITS. Every monetary value is a BIGINT of minor
   units plus an ISO-4217 currency code. Floats and Postgres `money` are
   banned. No exceptions, including in JSON payloads and analytics.

5. RLS ON EVERY TABLE. Every new table ships with RLS enabled and explicit
   policies in the same migration that creates it. A table with RLS enabled
   and no policies is a bug, not a safe default.

6. SERVER-SIDE VALIDATION ALWAYS. Every mutation validates with Zod on the
   server. Client validation is UX only and is never the enforcement point.

7. NO SECRETS IN CLIENT CODE. The Supabase service role key, Anthropic API
   key, Stripe secret key, Resend key and Shopify Admin token are server-only.
   Any import of them into a `"use client"` module is a build failure.

8. MIGRATIONS ARE FILES. All schema changes are committed SQL migrations in
   `supabase/migrations/`. Never mutate schema through the Supabase dashboard.

9. REPORT HONESTLY. If you did not complete something, say so plainly and list
   what remains. Do not describe intent as completion.
```

---

# PHASE 0 — ADMIN FOUNDATION

Nothing else works without this. Auth, roles, audit, shell.

### PROMPT

```
PHASE 0 — ADMIN FOUNDATION: AUTH, RBAC, AUDIT LOG, SHELL

Before writing any code, produce a written inventory and wait for my approval:

  A. Every route currently in the app (App Router segment tree, including
     route groups, dynamic segments and any existing API handlers).
  B. Every existing Supabase table, with columns, types, and current RLS state
     (enabled/disabled, and the policies attached).
  C. Every form currently on the public site, with its current submit target.
  D. Every hardcoded image reference in the codebase, with file path and the
     page/component it renders in.
  E. Every environment variable currently referenced in the codebase.

Output this as `docs/PRE_ADMIN_INVENTORY.md`. Do not proceed to
implementation until I have replied APPROVED.

--- ON APPROVAL, IMPLEMENT ---

1. AUTHENTICATION

Use Supabase Auth with the @supabase/ssr package (createServerClient /
createBrowserClient). Do not use the deprecated auth-helpers package.

Create three Supabase clients in `lib/supabase/`:
  - `server.ts`   — cookie-bound server client for Server Components
  - `client.ts`   — browser client
  - `admin.ts`    — service-role client, with a top-of-file `import "server-only"`

Sign-in method: email + password, with email confirmation required. Do not
build a public sign-up route. Admin users are provisioned by me via an
invite-only flow. Build a `/admin/login` page and nothing else public.

2. ROLE MODEL

Migration: create `public.admin_users`

  id            uuid primary key references auth.users(id) on delete cascade
  email         text not null
  full_name     text
  role          text not null check (role in ('owner','editor','viewer'))
  is_active     boolean not null default true
  last_seen_at  timestamptz
  created_at    timestamptz not null default now()

Permission matrix, enforced server-side:
  owner   — full read/write, including user management, commerce settings,
            destructive actions, and publishing
  editor  — create/edit/publish content, media, blog, newsletter drafts;
            read commerce; cannot change settings, cannot delete, cannot
            manage users, cannot send a newsletter campaign
  viewer  — read-only across all modules

Write `lib/auth/permissions.ts` exporting a single `can(user, action, subject)`
function. Every server action and route handler calls it. Do not scatter
inline role string comparisons through the codebase — a permission check that
is not routed through `can()` is a defect.

3. ROUTE PROTECTION — DEFENCE IN DEPTH

Layer 1: `middleware.ts` matching `/admin/:path*`, excluding `/admin/login`.
         Refreshes the Supabase session and redirects unauthenticated
         requests to `/admin/login?next=<encoded-path>`.

Layer 2: `app/admin/layout.tsx` re-verifies the session server-side, loads the
         admin_users row, and hard-redirects if the row is missing or
         is_active is false. Middleware alone is NOT sufficient protection —
         treat it as a UX redirect, not a security boundary.

Layer 3: Every server action independently re-checks auth + permission. Assume
         it can be invoked directly.

Add `export const dynamic = "force-dynamic"` to the admin layout so no admin
route is ever statically rendered or cached at the edge.

4. AUDIT LOG

Migration: create `public.admin_audit_log`

  id           bigint generated always as identity primary key
  actor_id     uuid references auth.users(id)
  actor_email  text not null
  action       text not null   -- 'create' | 'update' | 'delete' | 'publish' |
                               -- 'unpublish' | 'send' | 'login' | 'export' |
                               -- 'settings_change'
  subject_type text not null   -- 'post' | 'lead' | 'media' | 'campaign' | ...
  subject_id   text
  diff         jsonb           -- { before: {...}, after: {...} }
  ip_hash      text            -- sha256(ip + IP_HASH_SALT), never raw IP
  user_agent   text
  created_at   timestamptz not null default now()

RLS: owners and editors may SELECT. NOBODY may UPDATE or DELETE — enforce with
policies AND a BEFORE UPDATE OR DELETE trigger that raises an exception. The
log is append-only at the database level, not by convention.

Write `lib/audit/log.ts` with a `recordAudit()` helper. Every mutating server
action calls it. Build `/admin/audit` with filters on actor, action,
subject_type and date range.

5. ADMIN SHELL

Build `app/admin/layout.tsx`:
  - Persistent left sidebar, collapsible, sections: Overview, Leads, Content,
    Media, Blog, Newsletter, Commerce, SEO, Settings
  - Nav items are filtered by permission — a viewer never sees Settings
  - Top bar: current user, role badge, environment badge (only renders when
    NEXT_PUBLIC_VERCEL_ENV !== "production"), sign out
  - Command palette on Cmd+K for cross-module navigation and search

DESIGN CONSTRAINT — READ CAREFULLY:
The admin is a work surface, not a brand experience. Do NOT import GSAP,
ScrollTrigger, or Lenis anywhere under /admin. No scroll-jacking, no scrub
animation, no page transitions, no reveal-on-scroll. Density and speed are the
requirements. Transitions are limited to sub-150ms state changes on
interactive elements. Reuse the brand's colour tokens and type scale so it
feels related, then stop there.

Use React Server Components by default. Reach for "use client" only where
interaction genuinely requires it.

6. ERROR + LOADING STATES

Every admin route segment ships `loading.tsx` and `error.tsx`. No route
renders a blank screen or an unstyled Next.js error boundary.

DELIVERABLES
  - docs/PRE_ADMIN_INVENTORY.md (approved before implementation)
  - Migrations for admin_users and admin_audit_log with RLS policies
  - Working /admin/login and protected shell
  - docs/ADMIN_RBAC.md documenting the permission matrix

VERIFICATION — paste raw output for all four:
  1. curl -sI https://alkotacycles.com/admin           -> expect 307/302 to login
  2. curl -sI https://alkotacycles.com/admin/leads     -> expect 307/302 to login
  3. curl -s  https://alkotacycles.com/admin/login | head -50
  4. Screenshot of the shell, authenticated, on the production domain
```

### ACCEPTANCE GATE

- `/admin` and every child route redirect when logged out, on **production**, not localhost
- Attempt an admin server action with a viewer account — must be refused server-side
- `UPDATE admin_audit_log SET action='x'` in the SQL editor must **error**
- No GSAP or Lenis import resolves anywhere under `app/admin`

---

# PHASE 1 — LEAD CAPTURE & MINI-CRM

### PROMPT

```
PHASE 1 — LEAD CAPTURE AND CRM

CONTEXT: Alkota Cycles is pre-production with a 2028 launch target. The lead
list IS the asset right now. It must be clean, consented, deduplicated and
exportable, and it must comply with UK GDPR and PECR from the first record —
retrofitting consent onto an existing list is not possible.

1. SCHEMA

Migration: `public.leads`

  id                uuid primary key default gen_random_uuid()
  email             citext not null
  full_name         text
  phone             text
  lead_type         text not null check (lead_type in (
                      'newsletter','waitlist','dealer_enquiry','press',
                      'general_contact','warranty','preorder_interest'))
  status            text not null default 'new' check (status in (
                      'new','contacted','qualified','customer','unqualified',
                      'unsubscribed','bounced'))
  source_page       text          -- pathname of the originating page
  utm_source        text
  utm_medium        text
  utm_campaign      text
  utm_term          text
  utm_content       text
  referrer          text
  locale            text          -- 'en-GB' | 'en-US'
  country_code      text          -- from Vercel geo header
  message           text
  marketing_consent boolean not null default false
  consent_text      text          -- VERBATIM copy of the checkbox label shown
  consent_at        timestamptz
  consent_ip_hash   text
  double_optin_at   timestamptz
  optin_token       text
  unsubscribed_at   timestamptz
  metadata          jsonb not null default '{}'::jsonb
  created_at        timestamptz not null default now()
  updated_at        timestamptz not null default now()

  unique (email, lead_type)

`public.lead_notes` — id, lead_id (fk cascade), author_id, body, created_at.
Notes are append-only. No edit, no delete.

`public.lead_events` — id, lead_id, event_type, payload jsonb, created_at.
Records form_submitted, optin_confirmed, email_opened, email_clicked,
status_changed, note_added.

Enable citext: `create extension if not exists citext;`

RLS:
  - anon: NO direct access. Zero policies for anon. Inserts happen only
    through a server action using the service-role client after validation.
  - authenticated admins: select/insert/update per the permission matrix.
    Only owner may delete.

2. CONSENT — THIS IS A LEGAL REQUIREMENT, NOT A FEATURE

  - Marketing consent is a separate, UNTICKED checkbox. Never bundled with
    "I agree to the terms". Never pre-ticked. Never implied by submission.
  - Store the verbatim consent wording shown at the time, in `consent_text`.
    If the wording later changes, historical records must still prove what
    that person actually agreed to.
  - Newsletter and waitlist require DOUBLE OPT-IN. The record is not
    marketable until `double_optin_at` is set. Send a confirmation email with
    a single-use token, 48-hour expiry.
  - A transactional enquiry reply (dealer, warranty, press) does not require
    marketing consent. Marketing email to that person does.
  - Store `sha256(ip + IP_HASH_SALT)`. Never store a raw IP address anywhere
    in this schema.

3. FORM PIPELINE

Build `lib/leads/capture.ts` — one server action, `captureLead()`, handling
every form type. All public forms route through it.

Order of operations:
  1. Honeypot field check (visually hidden input, non-obvious name, never
     `honeypot`). Populated -> return generic success, insert nothing.
  2. Time-to-submit check. Under 2 seconds from render -> treat as bot.
  3. Cloudflare Turnstile server-side verification.
  4. Rate limit: 5 submissions per IP hash per 10 minutes, and 3 per email
     address per hour. Use Upstash Redis if available, otherwise a Postgres
     counter table with a cleanup job. Fail CLOSED on limiter error.
  5. Zod validation with strict email format.
  6. UPSERT on (email, lead_type). A resubmission updates the record and
     appends a lead_event — it never creates a duplicate and never silently
     overwrites an existing consent timestamp with a weaker one.
  7. Insert lead_event.
  8. Fire notification email to the ops address.
  9. Return a typed result. On failure, return a real error — do not swallow
     it and show success.

Capture UTM parameters on landing into a first-party cookie (30-day expiry,
SameSite=Lax, not HttpOnly since the client sets it) and read them at submit.
A lead that converts three pages after landing must still carry its source.

4. FRONT-END WIRING — DO NOT SKIP THIS SECTION

From the Phase 0 inventory, take EVERY existing form on the public site and
rewire it to captureLead(). Then confirm in writing, form by form, that:
  - it posts to the server action
  - it shows a real pending state (useFormStatus)
  - it shows a real error state with a human message
  - it shows a success state
  - it does not clear user input on error
  - it is keyboard-navigable and screen-reader labelled
  - the consent checkbox is present, unticked, and its label text matches
    what gets written to consent_text

List each form path and its status. If a form cannot be rewired for any
reason, say so explicitly rather than leaving it silently pointing at the old
target.

5. ADMIN UI — /admin/leads

  - Table: email, name, type, status, source, locale, consent state, created.
    Server-side pagination (50/page), sortable, URL-state filters so a
    filtered view is shareable.
  - Search across email, name, message.
  - Filters: type, status, consent state, date range, UTM source, locale.
  - Detail drawer: full record, timeline of lead_events, notes thread,
    status control.
  - Bulk: status change, tag, CSV export of the current filtered selection.
  - CSV export writes an audit log entry every time. Exporting a marketing
    list is a data event and must be traceable.
  - Dashboard strip: leads today / 7d / 30d, by type, by source, opt-in
    confirmation rate, top 5 converting pages.

6. DATA SUBJECT RIGHTS

Build `/admin/leads/[id]` actions for:
  - Export single record as JSON (subject access request)
  - Erase — hard delete of lead + notes + events, with the deletion itself
    recorded in admin_audit_log with the email HASHED, not in plaintext
Owner role only.

VERIFICATION
  - curl -X POST the newsletter form endpoint on production and paste the
    response
  - Show the resulting row in Supabase, with consent_text populated
  - Submit the same email twice; show that exactly one row exists
  - Trip the rate limiter and paste the response
  - Show the confirmation email and the double_optin_at timestamp being set
```

### ACCEPTANCE GATE

- Submit each live form yourself. Every one lands with correct `source_page` and UTM data.
- A record with `marketing_consent = false` must be impossible to include in a campaign send in Phase 4.
- No raw IP anywhere in the database.

---

# PHASE 2 — CMS & MEDIA LIBRARY

This is the phase that kills the hardcoded-image problem for good.

### PROMPT

```
PHASE 2 — CMS: DATABASE-DRIVEN MEDIA AND PAGE CONTENT

GOAL: No image path and no marketing copy is hardcoded in a component. Every
image on every main page is a database record managed from /admin/media, and
every editable content region is a database record managed from /admin/content.

1. MEDIA SCHEMA

Migration: `public.media_assets`

  id             uuid primary key default gen_random_uuid()
  storage_path   text not null unique
  filename       text not null
  mime_type      text not null
  bytes          bigint not null
  width          integer
  height         integer
  blur_data_url  text          -- base64 LQIP, generated on upload
  alt_text       text          -- see the alt text rule below
  is_decorative  boolean not null default false
  caption        text
  credit         text          -- photographer / rights holder
  licence        text          -- 'owned' | 'licensed' | 'cc-by' | 'unknown'
  licence_expiry date
  focal_x        numeric not null default 0.5   -- 0..1
  focal_y        numeric not null default 0.5
  tags           text[] not null default '{}'
  uploaded_by    uuid references auth.users(id)
  created_at     timestamptz not null default now()
  updated_at     timestamptz not null default now()

ALT TEXT RULE: enforce with a CHECK constraint —
  check (is_decorative = true or (alt_text is not null and length(trim(alt_text)) >= 5))
An asset is either explicitly decorative or it has meaningful alt text. There
is no third state. This is an accessibility requirement and a database
constraint, not a nice-to-have.

LICENCE RULE: `licence = 'unknown'` blocks publishing. See the integrity gate
below. Given the brand's exposure profile, an unlicensed image in production
is a real liability, not a tidiness issue.

2. STORAGE

Supabase Storage bucket `media`, private. Public delivery goes through a
Next.js route handler or signed URLs — never a permanently public bucket.

On upload:
  - Accept jpeg, png, webp, avif, svg. Reject everything else server-side by
    sniffing magic bytes, not by trusting the file extension or the
    client-declared MIME type.
  - SVG: sanitise with DOMPurify server-side before storage. An unsanitised
    SVG is a stored-XSS vector.
  - Max 25MB.
  - Extract dimensions with sharp, generate the blur placeholder, strip EXIF
    (GPS data in a product photo is a real leak), and store.
  - Compute a sha256 content hash and warn on duplicate upload.

3. CONTENT SLOT SYSTEM

Migration: `public.content_slots`

  id            uuid primary key default gen_random_uuid()
  page_key      text not null      -- 'home' | 'technology' | 'about' | ...
  slot_key      text not null      -- 'hero_image' | 'hero_heading' | ...
  slot_type     text not null check (slot_type in
                  ('image','image_set','text','rich_text','link','video'))
  value_text    text
  value_json    jsonb
  media_id      uuid references media_assets(id) on delete restrict
  media_ids     uuid[]
  locale        text not null default 'en-GB'
  is_required   boolean not null default true
  updated_by    uuid references auth.users(id)
  updated_at    timestamptz not null default now()

  unique (page_key, slot_key, locale)

Note `on delete restrict` — deleting a media asset that is in use must fail
loudly with a message naming the pages that use it. It must never silently
blank a live page.

Define the slot registry in code at `lib/cms/registry.ts` as a typed object:
every page, every slot, its type, whether it is required, and a human
description shown in the admin. The registry is the source of truth; the
database holds values. This gives compile-time safety and means the admin UI
generates itself from the registry rather than being hand-maintained.

Populate the registry from the Phase 0 hardcoded-image inventory. Every image
you found becomes a slot.

4. RUNTIME

Build `components/cms/CmsImage.tsx`:
  - Server Component, takes pageKey + slotKey
  - Resolves the media asset, renders next/image with the blur placeholder,
    correct sizes, alt text, and object-position from the focal point
  - If the slot is empty: in development, render a visible labelled outline
    naming the missing slot. In production, render the defined empty state.
    NEVER a broken image, never a grey box with "image", never a stock photo.

Build `components/cms/CmsText.tsx` on the same pattern.

Caching: tag content queries with `cms:${pageKey}`. On save in the admin, call
`revalidateTag()`. An editor changing a hero image must see it live within
seconds without a redeploy. Confirm this works on production and show me.

5. MIGRATE THE EXISTING PAGES

Go through every page from the inventory and replace hardcoded <img>,
next/image with literal src, and hardcoded marketing copy with CmsImage /
CmsText. Upload the existing real assets into the media library, seed the
slots, and confirm visual parity page by page.

Do NOT do this partially. A half-migrated page — some slots dynamic, some
still hardcoded — is worse than either state, because it looks managed but
isn't. If any asset cannot be migrated, list it and explain why.

6. EXTEND THE INTEGRITY GATE

The build already fails on fabricated content. Extend the same gate to fail
the build when:
  - a slot marked is_required has no value
  - a content_slot references a media_id that does not exist
  - a published media asset has licence = 'unknown'
  - a non-decorative asset has empty alt_text (belt and braces alongside the
    CHECK constraint)
  - any `<img>` tag or literal image path remains in a page component

Output a clear failure listing page_key, slot_key and reason. The gate must
run in CI, not only locally.

7. ADMIN UI

  - /admin/media — grid, drag-drop multi-upload with progress, search by
    filename/alt/tag, filter by tag and licence, bulk tag, inline alt text
    editing, focal point picker on the image itself, and a "used on" panel
    listing every slot referencing the asset. Deleting a used asset is
    blocked with a message naming those slots.
  - /admin/content — one page per page_key, slots rendered from the registry
    with the correct editor per type, live preview link, and a completeness
    indicator showing how many required slots are filled.

VERIFICATION
  - grep the repo for remaining hardcoded image paths in page components and
    paste the output (expect empty)
  - Change a hero image in the admin, then curl the production page and show
    the new asset path in the HTML
  - Attempt to upload an image with no alt text and paste the error
  - Attempt to delete an in-use asset and paste the error
```

### ACCEPTANCE GATE

- `grep -rn 'src="/' app/ components/ --include=*.tsx` returns nothing in page components
- Changing an image in admin updates production without a deploy
- Build fails when you deliberately null a required slot

---

# PHASE 3 — BLOG WITH GOVERNED AI DRAFTING

### PROMPT

```
PHASE 3 — BLOG AND AI-ASSISTED DRAFTING

CRITICAL FRAMING: Alkota Cycles has no shipping product. An AI model writing
about this brand has no ground truth and will confabulate geometry numbers,
weights, materials, prices, ride characteristics and launch dates. Published
confabulation about an unreleased bicycle is a consumer-protection problem, a
competitor-ammunition problem and a brand-credibility problem all at once.

Therefore: AI DRAFTS. HUMANS PUBLISH. There is no auto-publish path. Do not
build one, do not add it behind a flag, do not add it "for later".

1. SCHEMA

`public.posts`
  id, slug (unique), title, excerpt, body_json (Tiptap JSON), body_html
  (rendered, cached), status ('draft','in_review','scheduled','published',
  'archived'), hero_media_id, author_id, ai_generated boolean,
  ai_model text, ai_prompt_id uuid, reviewed_by uuid, reviewed_at,
  published_at, scheduled_for, locale, reading_minutes int,
  seo_title, seo_description, og_media_id, canonical_url,
  noindex boolean default false, created_at, updated_at

`public.post_revisions` — full snapshot on every save, with author and
timestamp. Append-only. Restore-to-revision from the admin.
`public.post_tags` / `public.tags` — many-to-many.
`public.ai_prompts` — reusable, versioned generation prompts.

2. EDITOR

Tiptap, storing JSON as the source of truth and rendering HTML on save.
Nodes: heading 2-4, paragraph, bold, italic, link, bullet/ordered list,
blockquote, code, horizontal rule, and a custom Image node that selects from
the Phase 2 media library. No arbitrary URL images — every image in a post is
a managed asset with alt text.

Autosave every 20 seconds to a draft revision. Warn on unsaved navigation.

3. AI DRAFTING — SERVER SIDE ONLY

Route handler `app/api/admin/ai/draft/route.ts`. Anthropic API key is
server-only. Rate limit per user. Log every generation to ai_prompts with the
model, input, output and token counts.

The system prompt for every generation must contain, verbatim:

  You are drafting editorial content for Alkota Cycles, a pre-production
  mountain bike brand. You have NO factual knowledge of this brand's products.

  You must NEVER state or imply: product specifications, frame geometry,
  weights, materials, componentry, prices, availability dates, launch dates,
  performance figures, test results, awards, certifications, rider names,
  team affiliations, sponsorships, retail partners, or comparisons with named
  competitor products.

  Where the brief requires a fact you do not have, insert the literal token
  [[FACT_NEEDED: short description of what is required]] and continue.
  Do not guess. Do not approximate. Do not hedge with "approximately" — use
  the token.

  You may write about: general mountain biking technique, trail culture,
  maintenance principles, terrain and destinations, industry-wide technology
  concepts explained generically, and rider experience — none of it attributed
  to an Alkota product.

4. CLAIM GUARD — MANDATORY, BLOCKING

Build `lib/content/claim-guard.ts`. It runs on EVERY publish attempt, whether
the content was AI-generated or human-written, and it BLOCKS publishing.

Block on:
  - any remaining [[FACT_NEEDED]] token
  - numeric patterns adjacent to spec keywords: kg, lbs, mm, degrees, °, Nm,
    travel, reach, stack, chainstay, head angle, seat angle, wheelbase
  - currency amounts (£, $, €, GBP, USD) — pricing is not editorial content
  - superlatives: fastest, lightest, strongest, best, unbeatable, world-class,
    industry-leading, revolutionary, first-ever, only
  - unqualified date claims about availability, shipping, or launch
  - named competitor brands
  - certification and standards claims: ISO, EN, CE, UKCA, CPSC, ASTM,
    tested to, certified, approved
  - testimonial-shaped constructions and quotation marks around rider praise

Each hit shows the offending text, the line, the rule that fired, and requires
an explicit owner-role override with a typed justification that is written to
admin_audit_log. Editors cannot override. Never make the guard a soft warning.

5. WORKFLOW

draft -> in_review -> scheduled/published -> archived

  - Editors move to in_review. Only owner publishes.
  - Publishing writes an audit entry, revalidates the blog tags and the
    sitemap, and pings a Slack/email notification if configured.
  - Scheduled posts publish via the Phase 4 cron runner, and pass the claim
    guard at publish time, not only at schedule time.

6. FRONT END

  - /journal (or the existing blog route from the inventory — do not invent a
    new one) — paginated index, real published posts only
  - /journal/[slug] — post view with Article JSON-LD, OG tags, canonical
  - Tag archives, RSS feed at /journal/rss.xml
  - Related posts by shared tag, no fabricated relevance scoring
  - Reading time computed from actual word count
  - If zero posts are published, the index renders a genuine empty state. It
    does not render sample posts.

VERIFICATION
  - Generate a draft, show the raw AI output including any [[FACT_NEEDED]]
  - Attempt to publish content containing "the 140mm rear travel" and paste
    the block message
  - Publish a real post and curl the production URL showing the content and
    the JSON-LD
  - curl the sitemap showing the new post URL
```

### ACCEPTANCE GATE

- Try to publish a post containing `£4,299` and a fake head angle. Both must block.
- An editor account must not be able to override the guard.

---

# PHASE 4 — NEWSLETTER & CRON

### PROMPT

```
PHASE 4 — NEWSLETTER SYSTEM AND SCHEDULED JOBS

CRITICAL: The cron generates DRAFTS and notifies me. It does not send. An
unsupervised AI newsletter to a real subscriber list will eventually send
something wrong to everyone at once, and there is no recall. Sending is a
deliberate human action, every time, without exception.

1. SCHEMA

`public.newsletter_campaigns`
  id, subject, preheader, body_json, body_html, status
  ('draft','in_review','approved','sending','sent','failed','cancelled'),
  segment_json, ai_generated, generated_by_cron boolean, approved_by,
  approved_at, scheduled_for, sent_at, provider_broadcast_id,
  recipient_count, created_at, updated_at

`public.campaign_sends` — campaign_id, lead_id, email, provider_message_id,
status ('queued','sent','delivered','opened','clicked','bounced',
'complained','failed'), error, sent_at. Unique on (campaign_id, lead_id) —
this is the double-send guard.

`public.email_suppressions` — email (unique), reason ('unsubscribed',
'hard_bounce','complaint','manual'), created_at. Checked before EVERY send.
An address here is never emailed again for marketing, regardless of segment.

`public.cron_runs` — job_name, started_at, finished_at, status, result jsonb,
error. Every scheduled execution is logged whether it succeeds or fails.

2. PROVIDER

Resend, with a verified sending domain. Set up SPF, DKIM and DMARC before the
first send and paste the DNS verification output. Deliverability on a cold
domain is the whole game — a campaign that lands in spam is worse than no
campaign, because it burns the domain reputation you need in 2028.

Configure the webhook endpoint for delivery, open, click, bounce and complaint
events. Verify the webhook signature — an unsigned webhook endpoint that
writes to your suppression list is an open door. Hard bounces and complaints
write to email_suppressions automatically.

3. RECIPIENT RESOLUTION — THE SAFETY-CRITICAL FUNCTION

Write `lib/newsletter/resolve-recipients.ts`. It is the ONLY path to a
recipient list. Requirements:

  - marketing_consent = true, AND
  - double_optin_at IS NOT NULL, AND
  - unsubscribed_at IS NULL, AND
  - email NOT IN email_suppressions, AND
  - lead status NOT IN ('unsubscribed','bounced')

Unit test this function with fixtures covering each exclusion individually and
in combination. If any test fails, the send path must not exist. Paste the
test output.

4. CRON — MONDAY, WEDNESDAY, FRIDAY

`vercel.json`:
  { "crons": [
      { "path": "/api/cron/newsletter-draft", "schedule": "0 6 * * 1,3,5" },
      { "path": "/api/cron/publish-scheduled", "schedule": "*/15 * * * *" },
      { "path": "/api/cron/maintenance", "schedule": "0 3 * * *" }
  ]}

Note: Vercel crons run in UTC. 06:00 UTC is 07:00 BST / 06:00 GMT. Do not
try to compensate for DST in the cron expression — handle any time-sensitive
logic inside the handler.

Every cron handler must:
  - Verify the `Authorization: Bearer ${CRON_SECRET}` header and return 401
    otherwise. A public cron endpoint is a public trigger for anyone.
  - Take an advisory lock or check cron_runs for an in-flight run of the same
    job. Overlapping runs must be impossible.
  - Be idempotent. A retried invocation must not duplicate work.
  - Write to cron_runs on both success and failure.
  - Never exceed the function timeout. Long work is queued, not inlined.

`/api/cron/newsletter-draft` behaviour:
  1. Gather real source material: posts published since the last campaign, new
     media assets, and content_slot changes. If there is genuinely nothing
     new, LOG THAT AND EXIT. Do not generate a campaign about nothing. An
     empty week is not a crisis; a fabricated newsletter is.
  2. Call the Anthropic API with the same anti-fabrication system prompt from
     Phase 3, plus: the newsletter may only reference content that exists in
     the supplied source material, and must link to real published URLs.
  3. Run the claim guard. Guard failures are recorded on the draft and shown
     in the admin — they do not block draft creation, they block approval.
  4. Create the campaign with status 'draft' and generated_by_cron = true.
  5. Email me a notification with a direct link to review it.

5. SENDING — HUMAN GATED

  - Send requires owner role.
  - Two-step confirmation: the modal displays the resolved recipient count,
    the segment definition, the subject line, and requires typing SEND to
    confirm.
  - Claim guard must be clear, or an owner override with justification.
  - Mandatory test send to a nominated address before the live send is
    enabled. The UI blocks the live send until a test has been sent for that
    campaign version.
  - Batch through the provider, write campaign_sends rows, retry transient
    failures with backoff, mark the campaign 'failed' with detail if the batch
    aborts.
  - Guard against double-send at the database level with the unique
    constraint, not only in application logic.

6. SUBSCRIBER-FACING REQUIREMENTS

  - One-click unsubscribe link in every email, using a signed token. It must
    work in a single click with no login and no confirmation step —
    List-Unsubscribe-Post requires it and it is UK law in practice.
  - Set `List-Unsubscribe` and `List-Unsubscribe-Post` headers.
  - Preference centre at /preferences/[token] — frequency and topic controls.
  - Physical sender identity and postal address in the footer of every
    campaign. This is a legal requirement, not a convention.
  - Plain-text alternative generated for every HTML campaign.

7. ADMIN UI — /admin/newsletter

  - Campaign list with status, recipient count, and open/click rates
  - Editor with live desktop/mobile preview and the resolved recipient count
    displayed prominently before any send action
  - Per-campaign analytics: sent, delivered, opened, clicked, bounced,
    complained, unsubscribed
  - Suppression list view with manual add/remove (owner only)
  - Cron run history with the result payload of every execution

VERIFICATION
  - Paste the SPF/DKIM/DMARC verification output
  - Paste the resolve-recipients unit test output
  - curl the cron endpoint WITHOUT the secret and show the 401
  - Show a cron-generated draft with its cron_runs record
  - Send a test campaign to one address, then show the campaign_sends rows and
    the webhook events landing
  - Click the unsubscribe link and show unsubscribed_at set and the
    suppression row created
```

### ACCEPTANCE GATE

- Unsubscribe yourself from a test address and confirm the next send excludes you
- The cron endpoint without `CRON_SECRET` returns 401 on production
- No campaign can be sent without a prior test send

---

# PHASE 5 — ECOMMERCE

Read this section before choosing. It's the one with real consequences.

### PATH A — SHOPIFY HEADLESS (recommended)

Shopify runs commerce. Your admin runs merchandising and content. You get PCI scope reduction, tax calculation, fraud screening, carrier rates, refunds, chargebacks and a fulfilment app ecosystem you cannot rebuild. You keep total control of the storefront.

### PROMPT

```
PHASE 5A — SHOPIFY HEADLESS COMMERCE

ARCHITECTURE: Shopify is the system of record for products, inventory, orders,
payments, tax and fulfilment. Next.js is the storefront. The Supabase layer
holds only storefront-specific enrichment that Shopify cannot express well.

1. INTEGRATION

  - Storefront API (public token) for catalogue, cart and checkout from the
    storefront.
  - Admin API (private token, server-only) for admin dashboard reads and
    merchandising writes.
  - Use Shopify's hosted checkout. Do NOT build a custom checkout. A custom
    checkout puts you in PCI scope and inherits every fraud and tax edge case
    Shopify already solved.

2. SUPABASE ENRICHMENT LAYER

`public.product_content` — shopify_product_id (unique), hero_media_id,
gallery_media_ids uuid[], long_form_json, spec_table_json, faq_json,
seo_title, seo_description, badges text[], is_featured, sort_weight,
compliance_notes, updated_at

Marketing copy and imagery live in your media library with alt text and
licence tracking. Shopify holds price, inventory, SKU and variants.

3. MULTI-REGION UK / US

  - Shopify Markets for GB and US: currency, pricing, tax and duty per market.
  - Storefront requests pass the correct @inContext country directive.
  - Locale routing from the existing multi-region plan drives market
    selection. Never guess a market from IP alone — respect an explicit user
    choice and persist it in a cookie.
  - Prices render in the market's currency with correct formatting. Never
    convert client-side with a hardcoded rate.
  - US orders: CPSC requirements apply to the physical product. Add
    compliance fields to product_content and surface required
    notices at PDP and checkout for US market visitors. Flag to me any
    requirement you cannot satisfy from data available — do not paper over it.

4. ADMIN UI — /admin/commerce

  - Product list synced from Shopify with your enrichment status alongside
  - Enrichment editor per product
  - Order list, read-only mirror, deep-linking to Shopify admin for
    fulfilment actions
  - Inventory levels with low-stock highlighting
  - Collections and merchandising order
  - Discount code list (read from Shopify)
  - Revenue summary by market and period, all money in minor units

5. THE HARD GATE — READ THIS

Checkout is disabled behind the feature flag COMMERCE_LIVE, default FALSE.
When the flag is off:
  - Product pages render as catalogue with a "register interest" action that
    creates a lead of type 'preorder_interest'
  - No add-to-cart, no checkout link, no price display unless I explicitly
    enable PRICING_VISIBLE separately

The flag may only be turned on when ALL of the following are true, and the
admin UI must display this checklist with each item's live status:
  - Terms of Sale, Privacy Policy, Returns Policy, Shipping Policy and
    Warranty are PUBLISHED, not DRAFT, and version-stamped
  - Checkout captures explicit acceptance of the Terms of Sale, storing the
    document version accepted
  - UK consumer cancellation rights (14-day cooling off) are stated and the
    process is operable
  - Product compliance data is present for every purchasable variant in every
    market it is sold into
  - The outstanding trademark position is resolved

Build the checklist as data in `public.commerce_readiness`, with each item
owner-toggled and audit-logged. Wire the COMMERCE_LIVE flag so it CANNOT be
enabled while any item is unmet — enforce in code, not by policy.

VERIFICATION
  - curl a product page with COMMERCE_LIVE=false and show no checkout path
  - Show the readiness checklist blocking flag activation
  - Place a test order in Shopify test mode and show it in /admin/commerce
```

### PATH B — OWN THE STACK ON STRIPE

Only if you're committed to it. Here's what it actually costs.

### PROMPT

```
PHASE 5B — SELF-HOSTED COMMERCE ON STRIPE

SCOPE WARNING: Deliver this in the stated order. Each stage must be complete
and tested before the next begins. Do not build breadth before depth — a
half-built order state machine that takes real money is the worst possible
outcome.

STAGE 1 — CATALOGUE
  products: id, slug, title, subtitle, description_json, status, product_type,
    brand_line, is_active, hero_media_id, gallery_media_ids, seo fields,
    created_at, updated_at
  product_variants: id, product_id, sku (unique), title, option_values jsonb,
    barcode, weight_grams, dimensions_mm jsonb, is_active, position
  variant_prices: id, variant_id, currency ('GBP'|'USD'), amount_minor bigint,
    compare_at_minor bigint, tax_inclusive boolean, valid_from, valid_to
    -- UK prices are VAT-inclusive, US prices are tax-exclusive. This is not
    -- a display preference, it is a legal difference. Model it explicitly.
  inventory_levels: variant_id, location_id, on_hand int, reserved int,
    reorder_point int
  collections + collection_products

STAGE 2 — CART
  carts: id, token, lead_id, currency, market, status, expires_at
  cart_items: cart_id, variant_id, quantity, unit_amount_minor,
    price_snapshot_json
  Prices are SNAPSHOTTED at add-to-cart and revalidated at checkout. If the
  price changed, tell the customer explicitly — never silently charge a
  different amount than displayed.
  Inventory is RESERVED at checkout initiation with a 15-minute TTL, released
  by the maintenance cron. Overselling a pre-production bicycle is a refund
  and a reputation event.

STAGE 3 — CHECKOUT AND PAYMENT
  Stripe Payment Intents, server-side amount calculation ONLY. Never trust a
  client-supplied amount, ever, under any framing.
  Stripe Tax for UK VAT and US sales tax nexus. Do not hand-roll tax.
  3DS/SCA handled by Stripe Elements.
  Webhook handler with signature verification and an idempotency table on
  stripe_event_id (unique) — Stripe retries, and double-fulfilment is real.
  Order created only on payment_intent.succeeded, never on client redirect.

STAGE 4 — ORDERS
  orders: id, order_number (sequential, gapless, per-market prefix),
    lead_id, email, status, financial_status, fulfilment_status, currency,
    subtotal_minor, discount_minor, shipping_minor, tax_minor, total_minor,
    billing_address jsonb, shipping_address jsonb, stripe_payment_intent_id,
    market, terms_version_accepted, placed_at
  order_items with full snapshot of product title, variant, SKU and price at
    time of order. Never join to live product data for a historical order —
    a renamed product must not rewrite history.
  order_events: append-only state transitions.
  Order status is a state machine with explicit legal transitions. Illegal
  transitions raise, they do not silently no-op.

STAGE 5 — FULFILMENT, SHIPPING, RETURNS
  shipping_zones, shipping_rates (weight and price banded, per market)
  fulfilments with tracking number and carrier
  returns / refunds with partial refund support through Stripe
  UK 14-day cooling-off period tracked per order with the deadline computed
  from delivery, not from order placement

STAGE 6 — DISCOUNTS
  discount_codes: code, type, value_minor or percentage, min_spend_minor,
    usage_limit, per_customer_limit, starts_at, ends_at, applies_to
  discount_redemptions with a unique constraint preventing over-redemption
  under concurrency. Test this with parallel requests, not sequentially.

STAGE 7 — ADMIN
  Full CRUD across all of the above, order detail with timeline, refund
  actions (owner only), inventory adjustments with reason codes and audit,
  abandoned cart list, revenue reporting by market and period.

APPLY THE SAME COMMERCE_LIVE READINESS GATE FROM PATH A. It is not optional
in this path either.

VERIFICATION per stage: paste production curl output and the relevant database
rows. Do not advance stages without it.
```

---

# PHASE 6 — SEO CONTROL

Includes an explicit guard for the canonical inheritance bug that took out EntireFM's traffic.

### PROMPT

```
PHASE 6 — SEO MANAGEMENT

1. CANONICAL SAFETY — HIGHEST PRIORITY

A canonical inheritance bug previously caused a traffic collapse on another
property in this portfolio. Do not repeat it.

  - Every route defines its canonical URL EXPLICITLY. No route inherits a
    canonical from a parent layout, a shared metadata object, or a default.
  - Write a build-time check that asserts every page route resolves a
    canonical, that the canonical is self-referential unless deliberately
    overridden in the database, and that no two distinct routes emit the same
    canonical. Fail the build on violation and name the offending routes.
  - Add a runtime check in the admin: a crawl report listing every route, its
    emitted canonical, and a flag on any mismatch.

2. SCHEMA

`public.seo_overrides` — route_pattern (unique), locale, title,
description, og_media_id, canonical_url, noindex, nofollow, priority,
changefreq, structured_data jsonb, updated_by, updated_at

`public.redirects` — from_path (unique), to_path, status_code (301|302|307|308),
is_active, hit_count, last_hit_at, note, created_by, created_at

`public.not_found_log` — path, referrer, hit_count, first_seen, last_seen,
resolved boolean

3. REDIRECTS

Implement in middleware, reading from a cached redirect map (revalidated on
change). Requirements:
  - Loop detection: reject on save if A->B->A. Do not discover this in
    production.
  - Chain detection: warn on A->B->C and offer to flatten to A->C.
  - Self-redirect rejected.
  - Increment hit_count asynchronously — never block the response on a write.

4. SITEMAP AND ROBOTS

  - Dynamic sitemap generated from the database: published posts, active
    products, CMS pages. Never a static file that drifts.
  - Split into a sitemap index if it exceeds 5,000 URLs.
  - lastmod from real updated_at values, not build time.
  - Exclude noindex routes, unpublished content, and every /admin route.
  - robots.txt disallowing /admin, /api, /preferences and any preview route.

5. HREFLANG — UK / US

Bidirectional and self-referencing hreflang on every localised route, plus
x-default. Every alternate must return 200 — an hreflang pointing at a 404 or
a redirect is worse than no hreflang. Add a build check asserting reciprocity.

6. STRUCTURED DATA

Organization and WebSite on the root. BreadcrumbList on nested routes.
Article on posts. Product + Offer ONLY where real price and availability
exist — never emit Product schema with invented price or availability, that is
a manual-action risk with Google as well as a truthfulness problem.
Validate all emitted JSON-LD in CI against schema.org types.

7. OG IMAGE GENERATION

Dynamic OG images via @vercel/og using real content and real brand assets.
Cache by content hash.

8. ADMIN UI — /admin/seo

  - Route inventory: path, title, description, canonical, index status,
    word count, missing-field warnings
  - Redirect manager with import/export
  - 404 report sorted by frequency, with one-click redirect creation
  - Sitemap preview
  - Metadata bulk editor
  - Core Web Vitals panel if the Vercel Analytics API is available; if not,
    say so and omit it rather than displaying fabricated numbers

VERIFICATION
  - curl -s https://alkotacycles.com/sitemap.xml | head -40
  - curl -s https://alkotacycles.com/robots.txt
  - curl -sI a redirect and show the Location header and status
  - Paste the canonical uniqueness check output
  - Paste hreflang reciprocity check output
```

---

# PHASE 7 — DASHBOARD, SETTINGS & OPERATIONS

### PROMPT

```
PHASE 7 — OVERVIEW DASHBOARD AND OPERATIONS

1. /admin — OVERVIEW

Every figure comes from a real query. If a data source is unavailable, render
"no data" — never a plausible number, never a demo value, never a sparkline
with generated points.

  - Leads: today, 7d, 30d, with sparkline and % change
  - Lead source breakdown, top converting pages
  - Newsletter: subscriber count, opt-in confirmation rate, last campaign
    performance, next scheduled cron run
  - Content: posts by status, drafts awaiting review, scheduled queue
  - Media: total assets, assets missing alt text, unlicensed assets
  - Commerce: readiness checklist status, revenue by market (or catalogue
    interest count while pre-launch)
  - System health: last cron run per job, failed jobs, recent errors
  - Attention panel: required CMS slots unfilled, redirect loops, 404 spikes,
    posts blocked by the claim guard, expiring image licences

2. /admin/settings — owner only

  - Site identity: brand name, legal entity, registered address, company
    number, VAT number. These feed the email footer and legal pages — they
    must be real and entered by me, never defaulted.
  - Notification recipients per event type
  - Feature flags with audit logging on every change:
      COMMERCE_LIVE, PRICING_VISIBLE, NEWSLETTER_ENABLED,
      AI_DRAFTING_ENABLED, US_MARKET_ENABLED
  - Integration status panel: Supabase, Resend, Anthropic, Stripe/Shopify,
    Turnstile — each showing a real live connectivity check, not a hardcoded
    green tick
  - Admin user management: invite, role change, deactivate. Deactivate, never
    delete — audit trail integrity depends on the actor row surviving.

3. LEGAL DOCUMENT REGISTER

The site previously had DRAFT legal documents live and referenced. Build
`public.legal_documents`:
  key, title, version, body_json, status ('draft'|'published'),
  effective_from, published_at, published_by

  - Public legal routes render ONLY published documents. A draft document
    returns 404 on the public site, not a draft banner.
  - Build a link integrity check in CI: every internal reference to a legal
    document must resolve to a published document. Dangling references fail
    the build. This is the same class of defect found in the earlier audit —
    make it structurally impossible to reintroduce.
  - Version history retained; superseded versions remain retrievable for
    orders that accepted them.

4. OPERATIONAL HARDENING

  - Security headers via next.config: CSP (with the specific allowances the
    site actually needs — no unsafe-inline in production), HSTS,
    X-Content-Type-Options, Referrer-Policy, Permissions-Policy
  - Rate limiting on every public POST endpoint
  - Structured error logging with Sentry or the Vercel equivalent
  - Nightly maintenance cron: expire stale carts, release inventory
    reservations, prune expired opt-in tokens, refresh materialised stats,
    log the result
  - A weekly database backup export to storage, with a documented and TESTED
    restore procedure. An untested backup is not a backup.
  - /admin/health showing real integration status and last-checked timestamps

5. ACCESSIBILITY AND PERFORMANCE

  - Admin passes axe with zero critical violations
  - Full keyboard operability, visible focus states, correct ARIA on all
    custom controls
  - All tables paginate server-side. No route loads an unbounded result set.
  - Admin bundle stays under 200KB gzipped for the initial route

VERIFICATION
  - Screenshot the overview with real production data
  - Show a feature flag change appearing in admin_audit_log
  - curl a draft legal document URL and show the 404
  - Paste the axe results
  - Paste the successful backup and restore test output
```

---

# STANDING VERIFICATION PROTOCOL

Give AG this at the start of every session. It addresses the recurring failure mode where work is reported complete but never reaches production.

```
VERIFICATION PROTOCOL — NON-NEGOTIABLE

"Done" means live on https://alkotacycles.com and proven with pasted raw
output. Specifically:

  1. `git log -1 --oneline` showing the commit
  2. Vercel deployment URL and status
  3. `curl -sI https://alkotacycles.com/<route>` with full headers
  4. `curl -s https://alkotacycles.com/<route> | grep -A3 "<the change>"`
  5. For database changes: the migration filename and the query result showing
     the new state
  6. For admin changes: a screenshot taken on the production domain

NOT acceptable as evidence:
  - "The changes are now live"
  - "This should now work"
  - localhost:3000 output
  - Build logs without a deployment
  - A description of what the output would show
  - A summary of the diff

If deployment failed, say so and paste the error. A blocked deploy honestly
reported is useful. A blocked deploy reported as success costs a session.
```

---

# CLAUDE.md ADDITIONS

Append to the repo constitution:

```markdown
## Admin Dashboard Constitution

### Absolute prohibitions
- No auto-publishing of AI-generated content. AI drafts, humans publish.
- No auto-sending of newsletters. Cron drafts, an owner sends.
- No fabricated data anywhere: specs, prices, dates, metrics, testimonials,
  certifications, dashboard figures, or placeholder imagery.
- No floats for money. Integer minor units plus ISO currency code.
- No table without RLS policies in the creating migration.
- No raw IP addresses stored. Hash with a salt.
- No GSAP, ScrollTrigger or Lenis under /admin.
- No secrets in client bundles.
- No schema changes outside committed migrations.

### Blocking gates
- Claim guard blocks publish. Owner override only, with logged justification.
- COMMERCE_LIVE cannot be enabled while any readiness item is unmet.
- Build fails on: missing required CMS slots, dangling media references,
  unlicensed published assets, missing alt text, duplicate canonicals,
  non-reciprocal hreflang, dangling legal document references.
- Draft legal documents 404 on the public site.

### Roles
owner — everything, including publish, send, refund, settings, users
editor — content create/edit/publish-request, media, drafts; no send, no
         settings, no delete, no guard override
viewer — read only

### Definition of done
Live on production, verified with pasted curl output, audit-logged where the
action is mutating.
```

---

# SEQUENCING

| Phase | Depends on | Notes |
|---|---|---|
| 0 Foundation | — | Blocks everything |
| 1 Leads | 0 | Highest immediate value pre-launch |
| 2 CMS/Media | 0 | Blocks Blog hero images and Commerce imagery |
| 3 Blog + AI | 0, 2 | Claim guard is reused by Phase 4 |
| 4 Newsletter | 0, 1, 3 | Needs consented list and the claim guard |
| 5 Commerce | 0, 2 | Gated on trademark + published legal docs |
| 6 SEO | 0, 2, 3 | Do before any traffic push |
| 7 Ops | all | Continuous |

Phases 1 and 2 can run in parallel after 0. Phase 5 should not start until the trademark position is resolved — building it isn't the risk, switching it on is, and the readiness gate is what enforces that.
