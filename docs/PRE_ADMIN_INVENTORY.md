# PRE_ADMIN_INVENTORY.md
## ALKOTA Cycles — Pre-Admin Foundation Inventory
**Generated:** 2026-08-11  
**Status:** AWAITING APPROVAL before any implementation

---

## A. App Router Segment Tree

### Public Routes: `app/[region]/`

The `[region]` dynamic segment resolves to `uk` or `us` (detected by middleware from cookie or Vercel IP header; defaults to `us`).

| Route | Segment path | Notes |
|---|---|---|
| Home | `[region]/page.tsx` | |
| About | `[region]/about/` | |
| About — Build Process | `[region]/about/build-process/` | |
| About — Materials | `[region]/about/materials/` | |
| Accessibility | `[region]/accessibility/` | |
| Ambassadors | `[region]/ambassadors/` | |
| Bikes (index) | `[region]/bikes/page.tsx` | Lists available models |
| Project 01 | `[region]/bikes/project-01/` | |
| Project 01 — Components | `[region]/bikes/project-01/components/` | |
| Project 01 — Configure (redirect) | `[region]/bikes/project-01/configure/` | |
| Cart | `[region]/cart/` | |
| Complaints | `[region]/complaints/` | |
| Configurator | `[region]/configure/` | Interactive bike configurator |
| Contact | `[region]/contact/` | Contains a form (see Section C) |
| Cookies | `[region]/cookies/` | |
| Dealers (legacy) | redirected to `/partners` by middleware | |
| Demo | `[region]/demo/` | |
| Engineering (overview) | `[region]/engineering/` | |
| Engineering — Chassis | `[region]/engineering/chassis/` | |
| Engineering — Kinematics | `[region]/engineering/kinematics/` | |
| Engineering — Materials | `[region]/engineering/materials/` | |
| Engineering — Testing | `[region]/engineering/testing/` | |
| Engineering Philosophy | `[region]/engineering-philosophy/` | |
| FAQ | `[region]/faq/` | |
| Fit Engine | `[region]/fit/` | Contains a form (see Section C) |
| Glossary | `[region]/glossary/` | |
| Journal (index) | `[region]/journal/` | |
| Journal — Article | `[region]/journal/[slug]/` | Dynamic |
| Journal — Project 01 | `[region]/journal/project-01/` | |
| Legal (hub) | `[region]/legal/` | |
| Legal — Notice | `[region]/legal/notice/` | |
| Legal — Reservations | `[region]/legal/reservations/` | |
| Mission | `[region]/mission/` | |
| My Alkota (owner portal) | `[region]/my-alkota/` | Contains a form (see Section C) |
| Order / Register | `[region]/order/` | Contains main registration form (see Section C) |
| Ownership | `[region]/ownership/` | |
| Partners (public page) | `[region]/partners/` | Contains a form (see Section C) |
| Partner Portal | `[region]/partners/portal/` | |
| Partner Portal — Login | `[region]/partners/portal/login/` | Contains a form (see Section C) |
| Privacy | `[region]/privacy/` | |
| Project 01 (editorial) | `[region]/project-01/` | |
| Racing | `[region]/racing/` | Contains a form (see Section C) |
| Returns | `[region]/returns/` | |
| Road to 2028 | `[region]/road-to-2028/` | |
| Safety | `[region]/safety/` | |
| Shipping | `[region]/shipping/` | |
| Store (index) | `[region]/store/` | |
| Store — Product | `[region]/store/[slug]/` | Dynamic |
| Support (legacy) | redirected by middleware | |
| Terms | `[region]/terms/` | |
| Warranty | `[region]/warranty/` | |
| Work With Us | `[region]/work-with-us/` | |

**Root layout:** `app/layout.tsx`  
**Region layout:** `app/[region]/layout.tsx`  
**Global error:** `app/error.tsx`  
**404:** `app/not-found.tsx`  
**Robots:** `app/robots.ts`  
**Sitemap:** `app/sitemap.ts`

---

### API Handlers: `app/api/`

| Handler | Method(s) | Path |
|---|---|---|
| Register (public form submission) | POST | `/api/register` |
| Certificate Generate | GET | `/api/certificate/generate` |
| OG Image — Build | GET | `/api/og/build` |
| Partners Pack PDF | GET | `/api/partners/pack.pdf` |
| Partner Auth | POST | `/api/partner/auth` |
| Partner Leads (list) | GET | `/api/partner/leads` |
| Partner Lead (by id) | GET, PATCH | `/api/partner/leads/[id]` |
| Partner Lead — Accept | POST | `/api/partner/leads/[id]/accept` |
| Partner Lead — Update | POST | `/api/partner/leads/[id]/update` |
| Partner Documents | GET | `/api/partner/documents` |
| Partner Demo | GET | `/api/partner/demo` |
| Partner PDI (by allocation) | GET, POST | `/api/partner/pdi/[allocationId]` |
| Partner Profile | GET, POST | `/api/partner/profile` |
| Partner Service | GET, POST | `/api/partner/service` |
| Studio Auth | POST (sign in), GET (sign out) | `/api/studio/auth` |
| Studio Build Matrix | GET, POST, PUT | `/api/studio/build-matrix` |
| Studio Builds | GET, POST, PUT | `/api/studio/builds` |
| Studio Components | GET, POST, PUT | `/api/studio/components` |
| Studio Partner Invite | POST | `/api/studio/partner/invite` |
| Studio Partner Lead Assign | POST | `/api/studio/partner/lead/assign` |

---

### Existing Studio (`/studio`): `app/studio/`

> **Note:** `/studio` is an existing internal tool, separate from the new `/admin` being built. It uses a simple shared-password cookie (`alkota-studio-session`), **not** Supabase Auth. The new `/admin` will be a separate segment with proper Supabase Auth + RBAC. These must not be conflated.

| Route | Path |
|---|---|
| Studio dashboard | `/studio` |
| Studio Login | `/studio/login` |
| Studio — Build Matrix | `/studio/build-matrix/` |
| Studio — Builds | `/studio/builds/` |
| Studio — Commercial | `/studio/commercial/` |
| Studio — Components | `/studio/components/` |
| Studio — Content | `/studio/content/` |
| Studio — Design | `/studio/design/` |
| Studio — Design System | `/studio/design-system/` |
| Studio — Journal | `/studio/journal/` |
| Studio — Media | `/studio/media/` |
| Studio — Owners | `/studio/owners/` |
| Studio — Partners | `/studio/partners/` |
| Studio — Production | `/studio/production/` |
| Studio — Project 01 | `/studio/project-01/` |
| Studio — Racing | `/studio/racing/` |
| Studio — Registrations | `/studio/registrations/` |
| Studio — Reservations | `/studio/reservations/` |
| Studio — Settings | `/studio/settings/` |
| Studio — Store | `/studio/store/` |

**Studio layout:** `app/studio/layout.tsx` — wraps all `/studio/*` in `StudioShell`  
**Studio shell:** `app/studio/StudioShell.tsx` — persistent sidebar, reads role from cookie header  
**Studio auth:** `app/api/studio/auth/route.ts` — password comparison, sets HTTP-only cookie

**Middleware (`src/middleware.ts`):** Currently handles `/studio/*` with cookie-based auth, and `/[region]/*` for locale routing. The matcher pattern does **not** include an `/admin` bypass — the new admin middleware will need to be added without breaking existing logic.

---

## B. Supabase Tables

> **Global policy defect (Migration 001):** All 17 policies in migration 001 are `USING (true) WITH CHECK (true)` with no role restriction — any user reaching these tables via the anon key has full read/write. These are currently mitigated only because all API routes use the service role key. They are not correct long-term and should be addressed as a separate, scoped migration.

### Migration 001

#### `public.profiles`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | `gen_random_uuid()` |
| auth_user_id | UUID FK → `auth.users(id)` ON DELETE CASCADE | |
| email | TEXT UNIQUE NOT NULL | |
| first_name | TEXT | |
| last_name | TEXT | |
| phone | TEXT | |
| country | TEXT | |
| role | `public.alkota_user_role` ENUM | CUSTOMER, OWNER, PARTNER_USER, PARTNER_ADMIN, ALKOTA_EDITOR, ALKOTA_ENGINEERING, ALKOTA_COMMERCIAL, ALKOTA_SUPPORT, ALKOTA_ADMIN, ALKOTA_OWNER |
| partner_id | UUID | No FK constraint |
| avatar_url | TEXT | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ DEFAULT NOW() | |
| archived_at | TIMESTAMPTZ | |

**RLS:** ENABLED. Policy `"Admin Full Access Profiles"` — `USING (true) WITH CHECK (true)`. No role restriction.

---

#### `public.consent_events`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| profile_id | UUID FK → profiles(id) | |
| email | TEXT NOT NULL | |
| consent_type | TEXT NOT NULL | |
| state | BOOLEAN NOT NULL | |
| source | TEXT NOT NULL | |
| terms_version | TEXT DEFAULT 'v1.0' | |
| privacy_version | TEXT DEFAULT 'v1.0' | |
| ip_address | TEXT | Raw IP — not hashed |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

**RLS:** ENABLED. Policy `"Admin Full Access Consent"` — `USING (true)`.

---

#### `public.audit_logs`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| actor_id | UUID | No FK |
| actor_email | TEXT | |
| actor_role | TEXT | |
| entity_type | TEXT NOT NULL | |
| entity_id | TEXT NOT NULL | |
| action | TEXT NOT NULL | |
| old_state | JSONB | |
| new_state | JSONB | |
| reason | TEXT | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

**RLS:** ENABLED. Policy `"Admin Full Access Audit"` — `USING (true)`. No append-only enforcement; UPDATE/DELETE are not blocked.

> **Note:** This existing `audit_logs` table is separate from the new `admin_audit_log` table being created in Phase 0.

---

#### `public.project01_specifications`
| Column | Type |
|---|---|
| id | UUID PK |
| project | TEXT DEFAULT 'PROJECT_01' |
| category | TEXT NOT NULL |
| parameter | TEXT NOT NULL |
| value | TEXT NOT NULL |
| unit | TEXT |
| engineering_revision | TEXT DEFAULT 'R00' |
| status | TEXT DEFAULT 'DEVELOPMENT_BASELINE' |
| evidence_reference | TEXT |
| source_document | TEXT |
| validation_note | TEXT |
| approved_by | TEXT |
| approved_at | TIMESTAMPTZ |
| published | BOOLEAN DEFAULT TRUE |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Specs"` — `USING (true)`.

---

#### `public.project01_components`
| Column | Type |
|---|---|
| id | UUID PK |
| slug | TEXT UNIQUE NOT NULL |
| system_number | TEXT NOT NULL |
| system_name | TEXT NOT NULL |
| category | TEXT NOT NULL |
| brand | TEXT NOT NULL |
| model | TEXT NOT NULL |
| variant | TEXT NOT NULL |
| status | TEXT DEFAULT 'selected' |
| summary | TEXT |
| engineering_rationale | TEXT |
| manufacturer | TEXT NOT NULL |
| manufacturer_source | TEXT |
| source_last_verified | TIMESTAMPTZ |
| dark_image_key | TEXT |
| alpine_image_key | TEXT |
| display_order | INT DEFAULT 0 |
| created_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Components"` — `USING (true)`.

---

#### `public.registrations`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| registration_reference | TEXT UNIQUE NOT NULL | |
| profile_id | UUID FK → profiles(id) | |
| full_name | TEXT NOT NULL | |
| email | TEXT NOT NULL | |
| country | TEXT NOT NULL | |
| riding_discipline | TEXT | |
| frame_intent | TEXT | |
| saved_build_reference | TEXT | |
| consent_marketing | BOOLEAN DEFAULT FALSE | |
| utm_source | TEXT | |
| utm_medium | TEXT | |
| utm_campaign | TEXT | |
| status | TEXT DEFAULT 'REGISTERED' | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ DEFAULT NOW() | |
| founding_number | INTEGER UNIQUE | Added by migration 004; auto-assigned from `seq_founding_number` |

**RLS:** ENABLED. Policy `"Admin Full Access Registrations"` — `USING (true)`.

---

#### `public.fit_profiles`
| Column | Type |
|---|---|
| id | UUID PK |
| fit_reference | TEXT UNIQUE NOT NULL |
| profile_id | UUID FK → profiles(id) |
| engineering_revision | TEXT DEFAULT 'R00' |
| height_cm | NUMERIC(5,2) NOT NULL |
| inset_leg_cm | NUMERIC(5,2) NOT NULL |
| arm_length_cm | NUMERIC(5,2) |
| riding_style | TEXT NOT NULL |
| recommended_size | TEXT NOT NULL |
| calculated_stack_mm | NUMERIC(6,1) |
| calculated_reach_mm | NUMERIC(6,1) |
| saddle_height_mm | NUMERIC(6,1) |
| input_data | JSONB NOT NULL |
| result_data | JSONB NOT NULL |
| created_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Fit"` — `USING (true)`.

---

#### `public.saved_configurations`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| configuration_reference | TEXT UNIQUE NOT NULL | |
| profile_id | UUID FK → profiles(id) | |
| engineering_revision | TEXT DEFAULT 'R00' | |
| commercial_revision | TEXT DEFAULT 'C00' | |
| finish_colorway | TEXT NOT NULL | |
| frame_size | TEXT NOT NULL | |
| component_selections | JSONB NOT NULL | |
| price_snapshot | JSONB NOT NULL | Monetary format unspecified — may violate integer-minor-units rule |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

**RLS:** ENABLED. Policy `"Admin Full Access Configurations"` — `USING (true)`.

---

#### `public.project01_reservations`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| reservation_reference | TEXT UNIQUE NOT NULL | |
| registration_reference | TEXT FK → registrations | |
| profile_id | UUID FK → profiles(id) | |
| full_name | TEXT NOT NULL | |
| email | TEXT NOT NULL | |
| phone | TEXT | |
| region | TEXT NOT NULL | |
| currency | TEXT NOT NULL | |
| deposit_amount | NUMERIC(10,2) NOT NULL | **Violates constraint #4** — should be BIGINT minor units |
| deposit_status | TEXT DEFAULT 'PENDING' | |
| stripe_payment_intent_id | TEXT | |
| invited_at | TIMESTAMPTZ | |
| expires_at | TIMESTAMPTZ | |
| reserved_at | TIMESTAMPTZ | |
| status | TEXT DEFAULT 'DRAFT' | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ DEFAULT NOW() | |

**RLS:** ENABLED. Policy `"Admin Full Access Reservations"` — `USING (true)`.

---

#### `public.project01_allocations`
| Column | Type |
|---|---|
| id | UUID PK |
| allocation_reference | TEXT UNIQUE NOT NULL |
| reservation_id | UUID FK → project01_reservations(id) |
| profile_id | UUID FK → profiles(id) |
| region | TEXT NOT NULL |
| channel | TEXT DEFAULT 'DIRECT' |
| dealer_id | UUID (no FK) |
| production_batch | TEXT |
| production_sequence | INT |
| allocation_status | TEXT DEFAULT 'PROVISIONAL' |
| configuration_reference | TEXT FK → saved_configurations |
| engineering_revision | TEXT DEFAULT 'R00' |
| production_revision | TEXT |
| commercial_revision | TEXT DEFAULT 'C00' |
| build_lock_deadline | TIMESTAMPTZ |
| build_locked_at | TIMESTAMPTZ |
| estimated_window_start | TIMESTAMPTZ |
| estimated_window_end | TIMESTAMPTZ |
| frame_reference | TEXT |
| bike_serial | TEXT |
| production_order_reference | TEXT |
| delivery_route | TEXT DEFAULT 'DIRECT' |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Allocations"` — `USING (true)`.

---

#### `public.bikes`
| Column | Type |
|---|---|
| id | UUID PK |
| bike_serial | TEXT UNIQUE NOT NULL |
| model | TEXT DEFAULT 'PROJECT_01' |
| production_revision | TEXT NOT NULL |
| size | TEXT NOT NULL |
| finish | TEXT NOT NULL |
| owner_profile_id | UUID FK → profiles(id) |
| dealer_id | UUID (no FK) |
| allocation_reference | TEXT FK → project01_allocations |
| original_build_reference | TEXT |
| build_date | TIMESTAMPTZ |
| delivery_date | TIMESTAMPTZ |
| status | TEXT DEFAULT 'DELIVERED' |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Bikes"` — `USING (true)`.

---

#### `public.partner_organisations`
| Column | Type |
|---|---|
| id | UUID PK |
| partner_reference | TEXT UNIQUE NOT NULL |
| business_name | TEXT NOT NULL |
| contact_name | TEXT NOT NULL |
| contact_email | TEXT NOT NULL |
| website | TEXT |
| location | TEXT NOT NULL |
| country | TEXT NOT NULL |
| region | TEXT NOT NULL |
| specialisms | TEXT |
| types | TEXT[] DEFAULT '{}' |
| account_status | TEXT DEFAULT 'APPLIED' |
| dealer_tier | TEXT DEFAULT 'TBC' |
| territory | TEXT |
| currency | TEXT DEFAULT 'GBP' |
| dealer_cost_profile | TEXT |
| demo_programme | BOOLEAN DEFAULT FALSE |
| allocation_eligibility | BOOLEAN DEFAULT FALSE |
| lead_eligibility | BOOLEAN DEFAULT FALSE |
| service_authorised | BOOLEAN DEFAULT FALSE |
| warranty_authorised | BOOLEAN DEFAULT FALSE |
| payment_terms | TEXT |
| tax_reference | TEXT |
| internal_notes | TEXT |
| applied_at | TIMESTAMPTZ DEFAULT NOW() |
| approved_at | TIMESTAMPTZ |
| activated_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Partners"` — `USING (true)`.

---

#### `public.customer_leads`
| Column | Type |
|---|---|
| id | UUID PK |
| lead_reference | TEXT UNIQUE NOT NULL |
| profile_id | UUID FK → profiles(id) |
| customer_name | TEXT |
| customer_email | TEXT |
| customer_phone | TEXT |
| customer_location | TEXT |
| bike_interest | TEXT |
| preferred_finish | TEXT |
| size_direction | TEXT |
| saved_build_ref | TEXT |
| purchase_stage | TEXT |
| assigned_dealer_id | UUID FK → partner_organisations(id) |
| assigned_at | TIMESTAMPTZ |
| status | TEXT DEFAULT 'NEW' |
| consent_given | BOOLEAN DEFAULT FALSE |
| consent_timestamp | TIMESTAMPTZ |
| internal_notes | TEXT |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Leads"` — `USING (true)`.

---

#### `public.demo_units`
| Column | Type |
|---|---|
| id | UUID PK |
| demo_reference | TEXT UNIQUE NOT NULL |
| bike_model | TEXT DEFAULT 'PROJECT_01' |
| size | TEXT |
| finish | TEXT |
| dealer_id | UUID FK → partner_organisations(id) |
| region | TEXT NOT NULL |
| status | TEXT DEFAULT 'PLANNED' |
| last_service_date | TIMESTAMPTZ |
| next_service_due | TIMESTAMPTZ |
| available_from | TIMESTAMPTZ |
| notes | TEXT |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Demo"` — `USING (true)`.

---

#### `public.pdi_records`
| Column | Type |
|---|---|
| id | UUID PK |
| allocation_id | UUID FK → project01_allocations(id) |
| dealer_id | UUID FK → partner_organisations(id) |
| technician_id | UUID (no FK) |
| stages | JSONB DEFAULT '{}' |
| setup_record | JSONB DEFAULT '{}' |
| started_at | TIMESTAMPTZ |
| completed_at | TIMESTAMPTZ |
| handover_signed_at | TIMESTAMPTZ |
| notes | TEXT |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access PDI"` — `USING (true)`.

---

#### `public.service_records`
| Column | Type |
|---|---|
| id | UUID PK |
| service_reference | TEXT UNIQUE NOT NULL |
| bike_serial | TEXT FK → bikes(bike_serial) |
| profile_id | UUID FK → profiles(id) |
| dealer_id | UUID FK → partner_organisations(id) |
| service_type | TEXT NOT NULL |
| description | TEXT NOT NULL |
| parts_used | TEXT |
| technician_notes | TEXT |
| serviced_at | TIMESTAMPTZ DEFAULT NOW() |
| next_service_due | TIMESTAMPTZ |
| created_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Service"` — `USING (true)`.

---

#### `public.warranty_claims`
| Column | Type |
|---|---|
| id | UUID PK |
| claim_reference | TEXT UNIQUE NOT NULL |
| bike_serial | TEXT FK → bikes(bike_serial) |
| profile_id | UUID FK → profiles(id) |
| dealer_id | UUID FK → partner_organisations(id) |
| issue_category | TEXT NOT NULL |
| issue_description | TEXT NOT NULL |
| photos | TEXT[] DEFAULT '{}' |
| diagnostic_steps | TEXT |
| dealer_recommendation | TEXT |
| status | TEXT DEFAULT 'SUBMITTED' |
| alkota_response | TEXT |
| alkota_reviewed_by | TEXT |
| alkota_reviewed_at | TIMESTAMPTZ |
| parts_required | TEXT |
| internal_notes | TEXT |
| submitted_at | TIMESTAMPTZ DEFAULT NOW() |
| resolved_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Warranty"` — `USING (true)`.

---

### Migration 002

#### `public.engineering_claims`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| claim_reference | TEXT UNIQUE NOT NULL | Format: APC-XXXXXX |
| project | TEXT NOT NULL DEFAULT 'PROJECT_01' | |
| system | TEXT NOT NULL | |
| title | TEXT NOT NULL | |
| value | TEXT NOT NULL | |
| unit | TEXT | |
| claim_type | `public.claim_type` ENUM | TARGET, DESIGN_INTENT, CALCULATED, SIMULATED, MEASURED, TESTED, VALIDATED, PRODUCTION_SPECIFICATION |
| status | `public.claim_status` ENUM | DRAFT, ENGINEERING_REVIEW, EVIDENCE_REQUIRED, APPROVED_DEVELOPMENT, VALIDATION_PENDING, VALIDATED, PRODUCTION_RELEASED, SUPERSEDED |
| engineering_revision | TEXT NOT NULL DEFAULT 'R00' | |
| source_type | `public.claim_source_type` ENUM | 11 variants |
| source_reference | TEXT | |
| source_document | TEXT | |
| evidence_summary | TEXT | |
| evidence_file | TEXT | |
| validation_method | TEXT | |
| validated_by | TEXT | |
| validated_at | TIMESTAMPTZ | |
| approved_by | TEXT | |
| approved_at | TIMESTAMPTZ | |
| public_wording | TEXT | |
| internal_wording | TEXT | |
| public_visibility | BOOLEAN NOT NULL DEFAULT FALSE | |
| supersedes | TEXT FK → engineering_claims(claim_reference) | |
| superseded_by | TEXT | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ DEFAULT NOW() | |

**RLS:** ENABLED. Policy `"Admin Full Access Claims"` — `USING (true) WITH CHECK (true)`.  
**Triggers:** `trg_audit_claim_change` (writes to `audit_logs` on update), `trg_claims_updated_at` (auto-updates `updated_at`).

---

### Migration 003

#### `public.partner_applications`
| Column | Type |
|---|---|
| id | UUID PK |
| application_reference | TEXT UNIQUE NOT NULL |
| shop_name | TEXT NOT NULL |
| location | TEXT NOT NULL |
| country | TEXT NOT NULL |
| website | TEXT |
| contact_name | TEXT NOT NULL |
| contact_email | TEXT NOT NULL |
| years_trading | INTEGER NOT NULL |
| turnover_band | TEXT NOT NULL |
| technician_count | INTEGER NOT NULL |
| suspension_capability | TEXT NOT NULL |
| carbon_capability | TEXT NOT NULL |
| fit_system | TEXT |
| brand_portfolio | TEXT |
| demo_fleet_operated | BOOLEAN DEFAULT FALSE |
| demo_fleet_details | TEXT |
| workshop_photo_urls | TEXT[] DEFAULT '{}' |
| trade_references | TEXT |
| catchment_description | TEXT |
| why_alkota | TEXT |
| submitted_at | TIMESTAMPTZ DEFAULT NOW() |
| status | TEXT DEFAULT 'NEW' |
| reviewed_at | TIMESTAMPTZ |
| reviewed_by | UUID FK → profiles(id) |
| internal_notes | TEXT |

**RLS:** ENABLED.  
- `"Public Application Submission"`: FOR INSERT WITH CHECK (true)  
- `"Admin Full Access Partner Applications"`: FOR ALL — checks `profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_COMMERCIAL', 'ALKOTA_OWNER')`

---

#### `public.partner_catchment`
| Column | Type |
|---|---|
| id | UUID PK |
| partner_id | UUID FK → partner_organisations(id) ON DELETE CASCADE |
| latitude | DOUBLE PRECISION NOT NULL |
| longitude | DOUBLE PRECISION NOT NULL |
| radius_miles | NUMERIC(6,2) NOT NULL |
| tier | TEXT NOT NULL |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED.  
- `"Public Catchment Read"`: FOR SELECT USING (true)  
- `"Admin & Partner Catchment Management"`: FOR ALL — admin roles or own partner_id

---

#### `public.lead_routing_log`
| Column | Type |
|---|---|
| id | UUID PK |
| lead_id | UUID FK → customer_leads(id) ON DELETE SET NULL |
| candidate_partner_ids | UUID[] DEFAULT '{}' |
| winning_partner_id | UUID FK → partner_organisations(id) ON DELETE SET NULL |
| distance_method | TEXT NOT NULL |
| decision_reason | TEXT NOT NULL |
| decided_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Policy `"Admin Full Access Routing Log"`: FOR ALL — checks `profiles.role`. No append-only enforcement.

---

### Migration 005

#### `public.components`
| Column | Type | Notes |
|---|---|---|
| id | TEXT PK | Not UUID |
| system_id | TEXT NOT NULL | |
| name | TEXT NOT NULL | |
| manufacturer | TEXT NOT NULL | |
| model | TEXT NOT NULL | |
| description | TEXT NOT NULL | |
| engineering_status | TEXT NOT NULL DEFAULT 'BASELINE' | |
| weight_grams | INTEGER | |
| claim_id | TEXT | No FK |
| is_selectable | BOOLEAN NOT NULL DEFAULT TRUE | |
| sort_order | INTEGER NOT NULL DEFAULT 0 | |
| image_ref | TEXT | |
| active | BOOLEAN NOT NULL DEFAULT TRUE | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ DEFAULT NOW() | |

**RLS:** ENABLED.  
- `"Public Read Active Components"`: FOR SELECT USING (active = true)  
- `"Admin Full Access Components"`: FOR ALL — role check (ALKOTA_ADMIN, ALKOTA_ENGINEERING, ALKOTA_EDITOR, ALKOTA_OWNER)  
- `"Service Role Full Access Components"`: FOR ALL — `auth.jwt() ->> 'role' = 'service_role'`

> **Naming collision:** Migration 001 creates `project01_components` with a policy also named `"Admin Full Access Components"`. Migration 005 creates a separate `components` table with the same policy name. No conflict in Postgres (different tables), but confusing.

---

#### `public.component_options`
| Column | Type |
|---|---|
| id | UUID PK |
| system_id | TEXT NOT NULL |
| component_id | TEXT FK → components(id) ON DELETE CASCADE |
| is_default | BOOLEAN NOT NULL DEFAULT FALSE |
| availability_status | TEXT NOT NULL DEFAULT 'AVAILABLE' |
| created_at | TIMESTAMPTZ DEFAULT NOW() |
| updated_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Three policies: public SELECT, admin role ALL, service_role ALL.

---

#### `public.saved_builds`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| build_reference | TEXT UNIQUE NOT NULL | |
| session_token | TEXT | |
| region | TEXT NOT NULL DEFAULT 'uk' | |
| frame_size | TEXT NOT NULL | |
| wheel_format | TEXT NOT NULL | |
| finish | TEXT NOT NULL | |
| selections | JSONB NOT NULL DEFAULT '{}' | |
| fit_inputs | JSONB DEFAULT '{}' | |
| email | TEXT | |
| registration_reference | TEXT FK → registrations ON DELETE SET NULL | |
| source | TEXT DEFAULT 'CONFIGURATOR' | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

**RLS:** ENABLED. Three policies: public INSERT, owner/session SELECT, service_role ALL.

---

#### `public.build_events`
| Column | Type |
|---|---|
| id | UUID PK |
| build_id | UUID FK → saved_builds(id) ON DELETE CASCADE |
| event_type | TEXT NOT NULL |
| payload | JSONB DEFAULT '{}' |
| created_at | TIMESTAMPTZ DEFAULT NOW() |

**RLS:** ENABLED. Three policies: public INSERT, owner/session SELECT, service_role ALL.

---

### Tables created by Phase 0 (new — not yet in DB)

| Table | Migration file |
|---|---|
| `public.admin_users` | `006_admin_foundation.sql` |
| `public.admin_audit_log` | `006_admin_foundation.sql` |

---

## C. Public-Site Forms

| # | Form | File | Submit target | Status |
|---|---|---|---|---|
| 1 | **Registration / Order** — Full customer registration (name, email, country, rider profile, consents) | `src/app/[region]/order/OrderClient.tsx` | `POST /api/register` → writes to `public.registrations` via Supabase admin client | ✅ Live |
| 2 | **Contact** — Name, email, category, message, consent checkbox | `src/app/[region]/contact/ContactClient.tsx` | **No backend** — `handleSubmit` is a 600ms `setTimeout` simulation. Message not stored or sent. | ⚠️ Stub only |
| 3 | **Footer newsletter** — Email address only | `src/components/layout/Footer.tsx` | **No backend** — `handleSubscribe` sets local `subscribed=true` state only. | ⚠️ Stub only |
| 4 | **Racing page subscribe** — Email address only | `src/app/[region]/racing/RacingClient.tsx` | **No backend** — `handleSubscribe` sets local `emailSubmitted=true` state only. | ⚠️ Stub only |
| 5 | **My Alkota auth gate** — Registration reference + email | `src/app/[region]/my-alkota/MyAlkotaClient.tsx` | **No backend** — `handleSubmit` simulates a lookup then calls `onSignIn()` regardless of reference validity. | ⚠️ Stub only |
| 6 | **Partners page sign-in** — Partner reference + email | `src/app/[region]/partners/PartnersClient.tsx` | **No backend** — `handleSignIn` creates a hardcoded mock session in `sessionStorage`. No server call. | ⚠️ Stub only |
| 7 | **Partner Portal Login** — Email (magic link) | `src/app/[region]/partners/portal/login/PortalLoginClient.tsx` | Calls `supabase.auth.signInWithOtp()` via browser anon-key client. Dev simulation fallback if env vars absent. | ✅ Partially live |
| 8 | **Partner Application** — Full shop/business application with photo upload | `src/components/partner/ApplicationForm.tsx` | Writes to `public.partner_applications` + uploads to `partner-workshop-photos` Storage bucket via anon-key client. No server-side Zod validation. | ✅ Live (no server validation — violates constraint #6) |
| 9 | **Studio login** — Password | `src/app/studio/login/page.tsx` | `POST /api/studio/auth` — compares against `STUDIO_PASSWORD` env var, sets HTTP-only cookie `alkota-studio-session`. | ✅ Live (shared password, not Supabase Auth) |
| 10 | **Studio components editor** — Create/edit component record | `src/app/studio/components/ComponentsClient.tsx` | `POST/PUT /api/studio/components` — studio-cookie-gated. | ✅ Live (studio auth only) |

---

## D. Hardcoded Image References

All images are served from `public/`. No external stock imagery URLs found.

### Via `lib/assets.ts` — `brandAssets` registry

| Asset key | `src` path | Rendered in |
|---|---|---|
| `logoPrimaryLight` | `/brand/alkota-logo-light.png` | `components/brand/Logo.tsx` |
| `logoMarkLight` | `/brand/alkota-monogram-light.png` | `components/brand/Logo.tsx` |
| `project01WhiteHero` | `/images/project01-glacier-white-hero.jpg` | `[region]/bikes/page.tsx`, `bikes/project-01/Project01PageClient.tsx`, `order/OrderClient.tsx`, `road-to-2028/RoadTo2028Client.tsx`, `sections/HeroFullBleed.tsx`, `sections/ConfiguratorPreviewSection.tsx`, `sections/HotspotViewer.tsx`, `three/ModelFallback.tsx`, `layout/MegaMenuNav.tsx` |
| `project01CarbonHero` | `/images/project01-naked-carbon-hero.jpg` | `bikes/project-01/Project01PageClient.tsx`, `order/OrderClient.tsx`, `sections/ConfiguratorPreviewSection.tsx`, `sections/HotspotViewer.tsx`, `three/ModelFallback.tsx` |
| `project01DevelopmentSheet` | `/images/project01-development-sheet.jpg` | `sections/ProductPhilosophy.tsx` |
| `engineeringWorkshop` | `/images/engineering-workshop.jpg` | `sections/WorkshopFeature.tsx` |

### Via `lib/assets.ts` — `componentAssets` registry

| Asset key | `src` path | Rendered in |
|---|---|---|
| `hopeEvoAngleDark` | `/images/components/hope-evo-v6ti-angle-dark.jpg` | `components/engineering/ExplodedViewPlaceholder.tsx` |
| `hopeTr4SilverAlpine` | `/images/components/hope-tr4-silver-alpine.jpg` | `components/engineering/ExplodedViewPlaceholder.tsx` |
| `hopeEvoDark` | `/images/components/hope-evo-v6ti-dark.jpg` | `components/engineering/ExplodedViewPlaceholder.tsx` |

### Via `content/media/alkotaStoryMedia.ts` — `ALKOTA_STORY_MEDIA` registry

24 story media assets, all at `/images/story/<filename>.jpg` or `/images/racing/<filename>.jpg`. Consumed extensively in `about/`, `about/build-process/`, `about/materials/`, `racing/`, `road-to-2028/` pages.

| Asset key | `src` path |
|---|---|
| `racingHeroAction` | `/images/racing/alkota-racing-hero-action.jpg` |
| `peteFounderPortrait` | `/images/story/pete-currey-founder-portrait.jpg` |
| `peteWorkshopLab` | `/images/story/pete-currey-workshop-laboratory.jpg` |
| `peteGlacierWhite` | `/images/story/pete-currey-glacier-white-presentation.jpg` |
| `peteNakedCarbon` | `/images/story/pete-currey-naked-carbon-inspection.jpg` |
| `peteAlpineArchitectural` | `/images/story/pete-currey-alpine-architectural.jpg` |
| `peteRidingHistory` | `/images/story/pete-currey-riding-history-origin.jpg` |
| `paddockEnvironment` | `/images/story/mountain-event-paddock-environment.jpg` |
| `tradeShowPresentation` | `/images/story/trade-show-paddock-presentation.jpg` |
| `founderRiderDialogue` | `/images/story/founder-rider-dialogue-session.jpg` |
| `engineeringDesignMeeting` | `/images/story/engineering-design-meeting.jpg` |
| `chassisEngineeringReview` | `/images/story/chassis-engineering-review.jpg` |
| `carbonLayupDevelopment` | `/images/story/carbon-fiber-layup-development.jpg` |
| `componentDevelopmentBench` | `/images/story/component-development-bench.jpg` |
| `workshopChassisAssembly` | `/images/story/workshop-chassis-assembly.jpg` |
| `standaloneWhiteBike` | `/images/story/standalone-white-bike-presentation.jpg` |
| `standaloneBlackBike` | `/images/story/standalone-black-bike-presentation.jpg` |
| `technicalCadMaterial` | `/images/story/technical-cad-engineering-material.jpg` |
| `frameDevelopmentMould` | `/images/story/frame-development-mould-tooling.jpg` |
| `reverseEngineeringTelemetry` | `/images/story/reverse-engineering-telemetry.jpg` |
| `kinematicDynamicsAnalysis` | `/images/story/kinematic-dynamics-analysis.jpg` |
| `prototypeBuildValidation` | `/images/story/prototype-build-validation.jpg` |
| `completeMachineIntegration` | `/images/story/complete-machine-integration.jpg` |
| `hauteSavoieAlpineTest` | `/images/story/haute-savoie-alpine-field-test.jpg` |
| `laboratoryStressFatigue` | `/images/story/laboratory-stress-fatigue-bench.jpg` |
| `alpineTrailTestingAction` | `/images/story/alpine-trail-testing-action.jpg` |

### Direct `src=` hardcodes (not via any registry)

| `src` value | File | Component |
|---|---|---|
| `/images/project01-glacier-white-hero.jpg` | `src/app/[region]/configure/page.tsx:137` | Configure page — Glacier White finish picker |
| `/images/project01-naked-carbon-hero.jpg` | `src/app/[region]/configure/page.tsx:155` | Configure page — Naked Carbon finish picker |

---

## E. Environment Variables

### Currently referenced in codebase

| Variable | Exposure | Used in | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Public** | `src/lib/env.ts` | Required; throws on missing or `vercel.app` value |
| `NEXT_PUBLIC_SUPABASE_URL` | **Public** | `lib/db/supabaseAdmin.ts`, `lib/db/supabaseClient.ts`, `lib/db/services.ts`, `lib/partner/catchment.ts`, `components/partner/ApplicationForm.tsx`, `partners/portal/login/PortalLoginClient.tsx` | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Public** | `lib/db/supabaseClient.ts`, `lib/db/supabaseAdmin.ts` (fallback), `components/partner/ApplicationForm.tsx`, `partners/portal/login/PortalLoginClient.tsx` | |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only** | `lib/db/supabaseAdmin.ts`, `lib/partner/catchment.ts` | |
| `ALKOTA_STUDIO_SECRET` | **Server-only** | Declared in `.env.example`; no grep match in source — may be intended for future use | |
| `STUDIO_PASSWORD` | **Server-only** | `app/api/studio/auth/route.ts` | Shared password for `/studio` access |
| `NEXT_PUBLIC_STUDIO_DEV_PASSWORD` | **Public** ⚠️ | `app/api/studio/auth/route.ts:41` | Used as password fallback — a secret exposed as a public env var |
| `NEXT_PUBLIC_BASE_URL` | **Public** | `app/api/studio/auth/route.ts:68` | Used in sign-out redirect; undocumented in `.env.example` |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | **Public** | `lib/partner/catchment.ts` | Optional; for road-distance calculations |
| `VERCEL_URL` | Vercel-injected | `src/config/partnerTerms.ts` | Auto-set by Vercel; server-side only |
| `VERCEL_PROJECT_PRODUCTION_URL` | Vercel-injected | `src/config/partnerTerms.ts` | Auto-set by Vercel |
| `VERCEL_ENV` | Vercel-injected | `src/config/partnerTerms.ts` | `production` / `preview` / `development` |
| `STRICT_PLACEHOLDERS` | **Server-only** | `src/config/partnerTerms.ts` | Undocumented in `.env.example` |

### New variables Phase 0 will add

| Variable | Exposure | Purpose |
|---|---|---|
| `IP_HASH_SALT` | **Server-only** | sha256(ip + salt) for admin_audit_log; raw IP never stored |
| `NEXT_PUBLIC_VERCEL_ENV` | **Public** | Vercel auto-injects `VERCEL_ENV` but it's server-only; must be forwarded as `NEXT_PUBLIC_VERCEL_ENV` for client-side environment badge in admin shell |

---

## Pre-existing Defects (for awareness — not Phase 0 blocking, but inventory-complete)

| # | Defect | Location | Severity |
|---|---|---|---|
| 1 | `NEXT_PUBLIC_STUDIO_DEV_PASSWORD` is a public env var used as a password | `api/studio/auth/route.ts:41` | High |
| 2 | `supabaseAdmin.ts` silently falls back to anon key if service role key absent — no throw | `lib/db/supabaseAdmin.ts:4` | High |
| 3 | `consent_events.ip_address` stores raw IP — not hashed | Migration 001 | Medium |
| 4 | `project01_reservations.deposit_amount` is `NUMERIC(10,2)` — violates constraint #4 | Migration 001 | Medium |
| 5 | All 17 Migration 001 RLS policies are `USING (true)` — no role restriction | Migration 001 | Medium (mitigated by service-role-only server access) |
| 6 | `ApplicationForm.tsx` writes to DB via anon key from client component with no server-side Zod validation — violates constraint #6 | `components/partner/ApplicationForm.tsx` | Medium |
| 7 | Partner Portal Login instantiates `createClient()` inline in a client component with env reads | `partners/portal/login/PortalLoginClient.tsx` | Low |

---

*End of PRE_ADMIN_INVENTORY.md.*  
*Do not proceed to implementation until you have replied APPROVED.*
