-- ==============================================================================
-- ALKOTA CYCLES — PRODUCTION DATABASE SCHEMA MIGRATION 005
-- File: supabase/migrations/005_configurator_backend.sql
-- Domain: Configurator Backend — Components Catalogue, Options Matrix & Saved Builds
-- ==============================================================================
-- Run AFTER 001_initial_production_schema.sql, 002, 003, 004
-- ==============================================================================

-- Conflict Resolution Policy:
-- components.ts is the versioned source of truth for component specs during pre-production.
-- Database components table is the operational copy. Seed updates overwrite DB on conflict
-- until the studio editor goes live.

-- ------------------------------------------------------------------------------
-- 1. COMPONENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.components (
  id                  TEXT PRIMARY KEY,
  system_id           TEXT NOT NULL,
  name                TEXT NOT NULL,
  manufacturer        TEXT NOT NULL,
  model               TEXT NOT NULL,
  description         TEXT NOT NULL,
  engineering_status  TEXT NOT NULL DEFAULT 'BASELINE',
  weight_grams        INTEGER,
  claim_id            TEXT,
  is_selectable       BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order          INTEGER NOT NULL DEFAULT 0,
  image_ref           TEXT,
  active              BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_components_system_id ON public.components(system_id);
CREATE INDEX IF NOT EXISTS idx_components_active ON public.components(active, is_selectable);

-- ------------------------------------------------------------------------------
-- 2. COMPONENT OPTIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.component_options (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_id           TEXT NOT NULL,
  component_id        TEXT NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  is_default          BOOLEAN NOT NULL DEFAULT FALSE,
  availability_status TEXT NOT NULL DEFAULT 'AVAILABLE',
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(system_id, component_id)
);

CREATE INDEX IF NOT EXISTS idx_component_options_system ON public.component_options(system_id);

-- ------------------------------------------------------------------------------
-- 3. SAVED BUILDS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_builds (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  build_reference        TEXT UNIQUE NOT NULL,
  session_token          TEXT,
  region                 TEXT NOT NULL DEFAULT 'uk',
  frame_size             TEXT NOT NULL,
  wheel_format           TEXT NOT NULL,
  finish                 TEXT NOT NULL,
  selections             JSONB NOT NULL DEFAULT '{}'::jsonb,
  fit_inputs             JSONB DEFAULT '{}'::jsonb,
  email                  TEXT,
  registration_reference TEXT REFERENCES public.registrations(registration_reference) ON DELETE SET NULL,
  source                 TEXT DEFAULT 'CONFIGURATOR',
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_builds_reference ON public.saved_builds(build_reference);
CREATE INDEX IF NOT EXISTS idx_saved_builds_email ON public.saved_builds(email);

-- ------------------------------------------------------------------------------
-- 4. BUILD EVENTS TABLE (APPEND-ONLY)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.build_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  build_id    UUID NOT NULL REFERENCES public.saved_builds(id) ON DELETE CASCADE,
  event_type  TEXT NOT NULL,
  payload     JSONB DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_build_events_build_id ON public.build_events(build_id);

-- ------------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_events ENABLE ROW LEVEL SECURITY;

-- Components RLS Policies
CREATE POLICY "Public Read Active Components"
  ON public.components FOR SELECT
  USING (active = true);

CREATE POLICY "Admin Full Access Components"
  ON public.components FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.auth_user_id = auth.uid()
      AND profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_ENGINEERING', 'ALKOTA_EDITOR', 'ALKOTA_OWNER')
    )
  );

CREATE POLICY "Service Role Full Access Components"
  ON public.components FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Component Options RLS Policies
CREATE POLICY "Public Read Component Options"
  ON public.component_options FOR SELECT
  USING (true);

CREATE POLICY "Admin Full Access Component Options"
  ON public.component_options FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.auth_user_id = auth.uid()
      AND profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_ENGINEERING', 'ALKOTA_EDITOR', 'ALKOTA_OWNER')
    )
  );

CREATE POLICY "Service Role Full Access Component Options"
  ON public.component_options FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Saved Builds RLS Policies
CREATE POLICY "Public Create Saved Build"
  ON public.saved_builds FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Owner or Studio Read Saved Build"
  ON public.saved_builds FOR SELECT
  USING (
    (session_token IS NOT NULL AND session_token = current_setting('request.headers', true)::json ->> 'x-session-token')
    OR (email IS NOT NULL AND auth.jwt() ->> 'email' = email)
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.auth_user_id = auth.uid()
      AND profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_EDITOR', 'ALKOTA_ENGINEERING', 'ALKOTA_COMMERCIAL', 'ALKOTA_OWNER')
    )
  );

CREATE POLICY "Service Role Full Access Saved Builds"
  ON public.saved_builds FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Build Events RLS Policies
CREATE POLICY "Public Create Build Event"
  ON public.build_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Owner or Studio Read Build Events"
  ON public.build_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.saved_builds
      WHERE saved_builds.id = build_events.build_id
      AND (
        (saved_builds.session_token IS NOT NULL AND saved_builds.session_token = current_setting('request.headers', true)::json ->> 'x-session-token')
        OR (saved_builds.email IS NOT NULL AND auth.jwt() ->> 'email' = saved_builds.email)
        OR EXISTS (
          SELECT 1 FROM public.profiles
          WHERE profiles.auth_user_id = auth.uid()
          AND profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_EDITOR', 'ALKOTA_ENGINEERING', 'ALKOTA_COMMERCIAL', 'ALKOTA_OWNER')
        )
      )
    )
  );

CREATE POLICY "Service Role Full Access Build Events"
  ON public.build_events FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
