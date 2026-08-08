-- ==============================================================================
-- ALKOTA CYCLES — DATABASE SCHEMA MIGRATION SCRIPT FOR SUPABASE
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_reference TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    country TEXT NOT NULL,
    riding_discipline TEXT,
    frame_intent TEXT,
    saved_build_reference TEXT,
    consent_marketing BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'REGISTERED',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECT 01 RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.project01_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_reference TEXT UNIQUE NOT NULL,
    registration_reference TEXT REFERENCES public.registrations(registration_reference),
    customer_id UUID,
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
    status TEXT DEFAULT 'DRAFT', -- DRAFT, INVITED, RESERVED, EXPIRED, CANCELLED
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECT 01 ALLOCATIONS TABLE
CREATE TABLE IF NOT EXISTS public.project01_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    allocation_reference TEXT UNIQUE NOT NULL,
    reservation_id UUID REFERENCES public.project01_reservations(id),
    customer_id UUID,
    region TEXT NOT NULL,
    channel TEXT DEFAULT 'DIRECT', -- DIRECT, DEALER
    dealer_id UUID,
    production_batch TEXT,
    production_sequence INT,
    allocation_status TEXT DEFAULT 'PROVISIONAL',
    configuration_reference TEXT,
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

-- 4. PARTNER ORGANISATIONS TABLE
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
    account_status TEXT DEFAULT 'APPLIED', -- APPLIED, UNDER_REVIEW, APPROVED, ACTIVE, SUSPENDED
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

-- 5. CUSTOMER LEADS TABLE (DEALER LEADS)
CREATE TABLE IF NOT EXISTS public.customer_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_reference TEXT UNIQUE NOT NULL,
    customer_id UUID,
    customer_name TEXT, -- Gated behind consent_given
    customer_email TEXT, -- Gated behind consent_given
    customer_phone TEXT, -- Gated behind consent_given
    customer_location TEXT,
    bike_interest TEXT,
    preferred_finish TEXT,
    size_direction TEXT,
    saved_build_ref TEXT,
    purchase_stage TEXT,
    registration_reference TEXT,
    assigned_dealer_id UUID REFERENCES public.partner_organisations(id),
    assigned_at TIMESTAMPTZ,
    status TEXT DEFAULT 'NEW', -- NEW, ACCEPTED, CONTACTED, APPOINTMENT, DEMO, RESERVATION, CONVERTED, LOST
    consent_given BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMPTZ,
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DEMO FLEET TABLE
CREATE TABLE IF NOT EXISTS public.demo_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_reference TEXT UNIQUE NOT NULL,
    bike_model TEXT DEFAULT 'PROJECT_01',
    size TEXT,
    finish TEXT,
    dealer_id UUID REFERENCES public.partner_organisations(id),
    region TEXT NOT NULL,
    status TEXT DEFAULT 'PLANNED', -- PLANNED, ALLOCATED, IN_TRANSIT, AVAILABLE, BOOKED, DEMO, SERVICE, RETIRED, SOLD
    last_service_date TIMESTAMPTZ,
    next_service_due TIMESTAMPTZ,
    available_from TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PDI RECORDS TABLE
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

-- 8. WARRANTY CLAIMS TABLE
CREATE TABLE IF NOT EXISTS public.warranty_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_reference TEXT UNIQUE NOT NULL,
    customer_id UUID,
    bike_serial TEXT,
    allocation_id UUID REFERENCES public.project01_allocations(id),
    dealer_id UUID REFERENCES public.partner_organisations(id),
    issue_category TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    photos TEXT[] DEFAULT '{}',
    diagnostic_steps TEXT,
    dealer_recommendation TEXT,
    status TEXT DEFAULT 'SUBMITTED', -- SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, PARTS_ORDERED, IN_REPAIR, RESOLVED
    alkota_response TEXT,
    alkota_reviewed_by TEXT,
    alkota_reviewed_at TIMESTAMPTZ,
    parts_required TEXT,
    internal_notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SERVICE RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.service_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_reference TEXT UNIQUE NOT NULL,
    customer_id UUID,
    bike_serial TEXT,
    allocation_id UUID REFERENCES public.project01_allocations(id),
    dealer_id UUID REFERENCES public.partner_organisations(id),
    service_type TEXT NOT NULL, -- ROUTINE, WARRANTY, CRASH_DAMAGE, UPGRADE, SETUP
    description TEXT NOT NULL,
    parts_used TEXT,
    technician_notes TEXT,
    serviced_at TIMESTAMPTZ DEFAULT NOW(),
    next_service_due TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project01_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project01_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdi_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranty_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_records ENABLE ROW LEVEL SECURITY;

-- SERVICE ROLE FULL ACCESS POLICY FOR SERVER API ROUTES
CREATE POLICY "Service Role Full Access Registrations" ON public.registrations USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access Reservations" ON public.project01_reservations USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access Allocations" ON public.project01_allocations USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access Partners" ON public.partner_organisations USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access Leads" ON public.customer_leads USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access Demo Units" ON public.demo_units USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access PDI" ON public.pdi_records USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access Warranty" ON public.warranty_claims USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Access Service" ON public.service_records USING (true) WITH CHECK (true);
