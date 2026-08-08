-- ==============================================================================
-- ALKOTA CYCLES — PRODUCTION DATABASE SCHEMA MIGRATION 001
-- File: supabase/migrations/001_initial_production_schema.sql
-- Domain: Complete Production Platform Schema & Security Policies
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. EXTENSIONS & SEQUENCES FOR CONCURRENCY-SAFE REFERENCES
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SEQUENCE IF NOT EXISTS seq_reg_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_fit_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_cfg_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_res_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_alc_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_apn_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_lead_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_demo_number START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_proto_number START WITH 1;

-- ------------------------------------------------------------------------------
-- 1. UNIFIED USER PROFILES & ROLES
-- ------------------------------------------------------------------------------
CREATE TYPE public.alkota_user_role AS ENUM (
  'CUSTOMER',
  'OWNER',
  'PARTNER_USER',
  'PARTNER_ADMIN',
  'ALKOTA_EDITOR',
  'ALKOTA_ENGINEERING',
  'ALKOTA_COMMERCIAL',
  'ALKOTA_SUPPORT',
  'ALKOTA_ADMIN',
  'ALKOTA_OWNER'
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  country TEXT,
  role public.alkota_user_role DEFAULT 'CUSTOMER',
  partner_id UUID,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ
);

-- ------------------------------------------------------------------------------
-- 2. CONSENT LEDGER (APPEND-ONLY PRIVACY AUDIT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consent_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id),
  email TEXT NOT NULL,
  consent_type TEXT NOT NULL, -- PROJECT01_DEVELOPMENT_EMAILS, RACING_UPDATES, STORE_MARKETING, PARTNER_CONTACT_PERMISSION
  state BOOLEAN NOT NULL,
  source TEXT NOT NULL,       -- registration_form, portal_settings, fit_engine
  terms_version TEXT DEFAULT 'v1.0',
  privacy_version TEXT DEFAULT 'v1.0',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. IMMUTABLE AUDIT LOG
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,
  actor_email TEXT,
  actor_role TEXT,
  entity_type TEXT NOT NULL,   -- specification, commercial, reservation, allocation, partner
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,        -- CREATE, UPDATE, DELETE, STATUS_CHANGE, BUILD_LOCK
  old_state JSONB,
  new_state JSONB,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. PROJECT 01 CONTROLLED SPECIFICATIONS (WITH EVIDENCE PROVENANCE)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project01_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project TEXT DEFAULT 'PROJECT_01',
  category TEXT NOT NULL,
  parameter TEXT NOT NULL,
  value TEXT NOT NULL,
  unit TEXT,
  engineering_revision TEXT DEFAULT 'R00',
  status TEXT DEFAULT 'DEVELOPMENT_BASELINE', -- DEVELOPMENT_BASELINE, VALIDATED, LOCKED, PRODUCTION_RELEASED
  evidence_reference TEXT,     -- Document/Dyno reference for evidence
  source_document TEXT,        -- File path / CAD / FEA report
  validation_note TEXT,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. PROJECT 01 COMPONENTS & MANUFACTURER PROVENANCE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project01_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  system_number TEXT NOT NULL,
  system_name TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  variant TEXT NOT NULL,
  status TEXT DEFAULT 'selected',
  summary TEXT,
  engineering_rationale TEXT,
  manufacturer TEXT NOT NULL,
  manufacturer_source TEXT,
  source_last_verified TIMESTAMPTZ,
  dark_image_key TEXT,
  alpine_image_key TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. REGISTRATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_reference TEXT UNIQUE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  riding_discipline TEXT,
  frame_intent TEXT,
  saved_build_reference TEXT,
  consent_marketing BOOLEAN DEFAULT FALSE,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'REGISTERED',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. FIT PROFILES (IMMUTABLE FIT SNAPSHOTS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fit_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fit_reference TEXT UNIQUE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id),
  engineering_revision TEXT DEFAULT 'R00',
  height_cm NUMERIC(5,2) NOT NULL,
  inset_leg_cm NUMERIC(5,2) NOT NULL,
  arm_length_cm NUMERIC(5,2),
  riding_style TEXT NOT NULL,
  recommended_size TEXT NOT NULL,
  calculated_stack_mm NUMERIC(6,1),
  calculated_reach_mm NUMERIC(6,1),
  saddle_height_mm NUMERIC(6,1),
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. SAVED CONFIGURATIONS (IMMUTABLE BUILD SNAPSHOTS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  configuration_reference TEXT UNIQUE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id),
  engineering_revision TEXT DEFAULT 'R00',
  commercial_revision TEXT DEFAULT 'C00',
  finish_colorway TEXT NOT NULL,
  frame_size TEXT NOT NULL,
  component_selections JSONB NOT NULL,
  price_snapshot JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. PROJECT 01 RESERVATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project01_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_reference TEXT UNIQUE NOT NULL,
  registration_reference TEXT REFERENCES public.registrations(registration_reference),
  profile_id UUID REFERENCES public.profiles(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  region TEXT NOT NULL,
  currency TEXT NOT NULL,
  deposit_amount NUMERIC(10, 2) NOT NULL,
  deposit_status TEXT DEFAULT 'PENDING', -- PENDING, HELD, COMPLETED, REFUNDED
  stripe_payment_intent_id TEXT,
  invited_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  reserved_at TIMESTAMPTZ,
  status TEXT DEFAULT 'DRAFT',           -- DRAFT, INVITED, RESERVED, EXPIRED, CANCELLED
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. PROJECT 01 ALLOCATIONS & PRODUCTION TRACKER
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.project01_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  allocation_reference TEXT UNIQUE NOT NULL,
  reservation_id UUID REFERENCES public.project01_reservations(id),
  profile_id UUID REFERENCES public.profiles(id),
  region TEXT NOT NULL,
  channel TEXT DEFAULT 'DIRECT',
  dealer_id UUID,
  production_batch TEXT,
  production_sequence INT,
  allocation_status TEXT DEFAULT 'PROVISIONAL',
  configuration_reference TEXT REFERENCES public.saved_configurations(configuration_reference),
  engineering_revision TEXT DEFAULT 'R00',
  production_revision TEXT,
  commercial_revision TEXT DEFAULT 'C00',
  build_lock_deadline TIMESTAMPTZ,
  build_locked_at TIMESTAMPTZ,
  estimated_window_start TIMESTAMPTZ,
  estimated_window_end TIMESTAMPTZ,
  frame_reference TEXT,
  bike_serial TEXT,
  production_order_reference TEXT,
  delivery_route TEXT DEFAULT 'DIRECT',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. PHYSICAL BICYCLES (OWNER DIGITAL TWIN ROOT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bikes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_serial TEXT UNIQUE NOT NULL,
  model TEXT DEFAULT 'PROJECT_01',
  production_revision TEXT NOT NULL,
  size TEXT NOT NULL,
  finish TEXT NOT NULL,
  owner_profile_id UUID REFERENCES public.profiles(id),
  dealer_id UUID,
  allocation_reference TEXT REFERENCES public.project01_allocations(allocation_reference),
  original_build_reference TEXT,
  build_date TIMESTAMPTZ,
  delivery_date TIMESTAMPTZ,
  status TEXT DEFAULT 'DELIVERED',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. PARTNER ORGANISATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partner_organisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_reference TEXT UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  website TEXT,
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  specialisms TEXT,
  types TEXT[] DEFAULT '{}',
  account_status TEXT DEFAULT 'APPLIED',
  dealer_tier TEXT DEFAULT 'TBC',
  territory TEXT,
  currency TEXT DEFAULT 'GBP',
  dealer_cost_profile TEXT,
  demo_programme BOOLEAN DEFAULT FALSE,
  allocation_eligibility BOOLEAN DEFAULT FALSE,
  lead_eligibility BOOLEAN DEFAULT FALSE,
  service_authorised BOOLEAN DEFAULT FALSE,
  warranty_authorised BOOLEAN DEFAULT FALSE,
  payment_terms TEXT,
  tax_reference TEXT,
  internal_notes TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  activated_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 13. CUSTOMER LEADS (WITH CONSENT GATED PII)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customer_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_reference TEXT UNIQUE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  customer_location TEXT,
  bike_interest TEXT,
  preferred_finish TEXT,
  size_direction TEXT,
  saved_build_ref TEXT,
  purchase_stage TEXT,
  assigned_dealer_id UUID REFERENCES public.partner_organisations(id),
  assigned_at TIMESTAMPTZ,
  status TEXT DEFAULT 'NEW',
  consent_given BOOLEAN DEFAULT FALSE,
  consent_timestamp TIMESTAMPTZ,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 14. DEMO FLEET
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.demo_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  demo_reference TEXT UNIQUE NOT NULL,
  bike_model TEXT DEFAULT 'PROJECT_01',
  size TEXT,
  finish TEXT,
  dealer_id UUID REFERENCES public.partner_organisations(id),
  region TEXT NOT NULL,
  status TEXT DEFAULT 'PLANNED',
  last_service_date TIMESTAMPTZ,
  next_service_due TIMESTAMPTZ,
  available_from TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 15. PDI & SERVICE & WARRANTY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pdi_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  allocation_id UUID REFERENCES public.project01_allocations(id),
  dealer_id UUID REFERENCES public.partner_organisations(id),
  technician_id UUID,
  stages JSONB DEFAULT '{}'::jsonb,
  setup_record JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  handover_signed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.service_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_reference TEXT UNIQUE NOT NULL,
  bike_serial TEXT REFERENCES public.bikes(bike_serial),
  profile_id UUID REFERENCES public.profiles(id),
  dealer_id UUID REFERENCES public.partner_organisations(id),
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  parts_used TEXT,
  technician_notes TEXT,
  serviced_at TIMESTAMPTZ DEFAULT NOW(),
  next_service_due TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.warranty_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_reference TEXT UNIQUE NOT NULL,
  bike_serial TEXT REFERENCES public.bikes(bike_serial),
  profile_id UUID REFERENCES public.profiles(id),
  dealer_id UUID REFERENCES public.partner_organisations(id),
  issue_category TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  diagnostic_steps TEXT,
  dealer_recommendation TEXT,
  status TEXT DEFAULT 'SUBMITTED',
  alkota_response TEXT,
  alkota_reviewed_by TEXT,
  alkota_reviewed_at TIMESTAMPTZ,
  parts_required TEXT,
  internal_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 16. ROW LEVEL SECURITY POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project01_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project01_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fit_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project01_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project01_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdi_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranty_claims ENABLE ROW LEVEL SECURITY;

-- Service Role Full Admin Access Policies
CREATE POLICY "Admin Full Access Profiles" ON public.profiles USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Consent" ON public.consent_events USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Audit" ON public.audit_logs USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Specs" ON public.project01_specifications USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Components" ON public.project01_components USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Registrations" ON public.registrations USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Fit" ON public.fit_profiles USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Configurations" ON public.saved_configurations USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Reservations" ON public.project01_reservations USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Allocations" ON public.project01_allocations USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Bikes" ON public.bikes USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Partners" ON public.partner_organisations USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Leads" ON public.customer_leads USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Demo" ON public.demo_units USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access PDI" ON public.pdi_records USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Service" ON public.service_records USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Warranty" ON public.warranty_claims USING (true) WITH CHECK (true);
