-- ==============================================================================
-- ALKOTA CYCLES — PRODUCTION DATABASE SCHEMA MIGRATION 003
-- File: supabase/migrations/003_partner_commercial_layer.sql
-- Domain: Partner Commercial Layer, Applications, Catchments & Lead Routing
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PARTNER APPLICATIONS (QUALIFYING RECRUITMENT FIELDS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_reference TEXT UNIQUE NOT NULL, -- APN-XXXXXX
  shop_name TEXT NOT NULL,
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  website TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  years_trading INTEGER NOT NULL,
  turnover_band TEXT NOT NULL,                -- '<500k', '500k-2m', '2m+', 'PREFER_NOT_TO_SAY'
  technician_count INTEGER NOT NULL,
  suspension_capability TEXT NOT NULL,        -- 'FULL_IN_HOUSE', 'BASIC_ONLY', 'SENT_OUT'
  carbon_capability TEXT NOT NULL,            -- 'IN_HOUSE', 'TRAINING_REQUIRED', 'NONE'
  fit_system TEXT,
  brand_portfolio TEXT,
  demo_fleet_operated BOOLEAN DEFAULT FALSE,
  demo_fleet_details TEXT,
  workshop_photo_urls TEXT[] DEFAULT '{}',
  trade_references TEXT,
  catchment_description TEXT,
  why_alkota TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'NEW',                  -- 'NEW', 'UNDER_REVIEW', 'SHORTLISTED', 'APPROVED', 'REJECTED'
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.profiles(id),
  internal_notes TEXT
);

-- ------------------------------------------------------------------------------
-- 2. PARTNER CATCHMENTS (RADIUS & GEOGRAPHIC CENTROID)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partner_catchment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partner_organisations(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius_miles NUMERIC(6,2) NOT NULL,         -- Resolved from tier at seeding; stored, not computed
  tier TEXT NOT NULL,                          -- 'FOUNDATION', 'CERTIFIED'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. LEAD ROUTING AUDIT LOG (IMMUTABLE DISPUTE RESOLUTION)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lead_routing_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.customer_leads(id) ON DELETE SET NULL,
  candidate_partner_ids UUID[] DEFAULT '{}',
  winning_partner_id UUID REFERENCES public.partner_organisations(id) ON DELETE SET NULL,
  distance_method TEXT NOT NULL,               -- 'HAVERSINE', 'ROAD_DISTANCE_MAPBOX'
  decision_reason TEXT NOT NULL,
  decided_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY & POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_catchment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_routing_log ENABLE ROW LEVEL SECURITY;

-- Applications: Anyone can submit (INSERT), Admins can view/manage
CREATE POLICY "Public Application Submission" ON public.partner_applications 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin Full Access Partner Applications" ON public.partner_applications 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.auth_user_id = auth.uid() 
      AND profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_COMMERCIAL', 'ALKOTA_OWNER')
    )
  );

-- Catchment: Public read (for store/dealer locator), Partner/Admin write
CREATE POLICY "Public Catchment Read" ON public.partner_catchment 
  FOR SELECT USING (true);

CREATE POLICY "Admin & Partner Catchment Management" ON public.partner_catchment 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.auth_user_id = auth.uid() 
      AND (
        profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_COMMERCIAL', 'ALKOTA_OWNER')
        OR profiles.partner_id = partner_catchment.partner_id
      )
    )
  );

-- Routing Log: Admin read/write
CREATE POLICY "Admin Full Access Routing Log" ON public.lead_routing_log 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.auth_user_id = auth.uid() 
      AND profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_COMMERCIAL', 'ALKOTA_OWNER')
    )
  );
