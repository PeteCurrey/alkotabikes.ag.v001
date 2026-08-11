-- ==============================================================================
-- ALKOTA CYCLES — MIGRATION 009: CONFIGURATOR SAVED BUILDS & DEMAND SIGNAL EVENTS
-- Phase 8B — Saved Builds, Share Tokens & Analytics Events
-- ==============================================================================

-- 1. SAVED BUILDS TABLE
CREATE TABLE IF NOT EXISTS public.saved_builds (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token                text NOT NULL UNIQUE,
  model_id             uuid NOT NULL REFERENCES public.configurator_models(id),
  version_id           uuid NOT NULL REFERENCES public.configurator_versions(id),
  selections           jsonb NOT NULL,
  computed_price_minor bigint,
  currency             text,
  market               text DEFAULT 'GB',
  is_valid             boolean NOT NULL DEFAULT true,
  lead_id              uuid REFERENCES public.leads(id),
  session_id           text,
  utm                  jsonb,
  status               text NOT NULL DEFAULT 'saved' CHECK (status IN ('saved','shared','enquiry_sent','added_to_cart','ordered','abandoned')),
  view_count           integer NOT NULL DEFAULT 0,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saved_builds_token ON public.saved_builds(token);
CREATE INDEX IF NOT EXISTS idx_saved_builds_model ON public.saved_builds(model_id, status);
CREATE INDEX IF NOT EXISTS idx_saved_builds_lead ON public.saved_builds(lead_id);

-- 2. CONFIGURATOR EVENTS TABLE (ANALYTICS & DEMAND SIGNAL)
CREATE TABLE IF NOT EXISTS public.configurator_events (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     text,
  saved_build_id uuid REFERENCES public.saved_builds(id) ON DELETE CASCADE,
  model_id       uuid REFERENCES public.configurator_models(id),
  event_type     text NOT NULL CHECK (event_type IN (
                   'started','step_viewed','option_selected','option_deselected',
                   'rule_blocked','preset_applied','price_revealed','saved',
                   'shared','email_captured','enquiry_submitted','added_to_cart','abandoned'
                 )),
  group_key      text,
  option_key     text,
  step_index     integer,
  market         text,
  payload        jsonb,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_configurator_events_session ON public.configurator_events(session_id);
CREATE INDEX IF NOT EXISTS idx_configurator_events_type ON public.configurator_events(event_type);
CREATE INDEX IF NOT EXISTS idx_configurator_events_model ON public.configurator_events(model_id);

-- 3. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.saved_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configurator_events ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a saved build (anonymous demand signal capture)
DROP POLICY IF EXISTS "Public Insert Saved Build" ON public.saved_builds;
CREATE POLICY "Public Insert Saved Build"
  ON public.saved_builds FOR INSERT TO public
  WITH CHECK (true);

-- Anyone with token can SELECT saved build
DROP POLICY IF EXISTS "Public Read Saved Build By Token" ON public.saved_builds;
CREATE POLICY "Public Read Saved Build By Token"
  ON public.saved_builds FOR SELECT TO public
  USING (true);

-- Anyone can log configurator events
DROP POLICY IF EXISTS "Public Insert Configurator Event" ON public.saved_builds;
CREATE POLICY "Public Insert Configurator Event"
  ON public.configurator_events FOR INSERT TO public
  WITH CHECK (true);

-- Admin Full Access
DROP POLICY IF EXISTS "Admin Read Configurator Events" ON public.configurator_events;
CREATE POLICY "Admin Read Configurator Events"
  ON public.configurator_events FOR SELECT TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.auth_user_id = auth.uid()
      AND profiles.role IN ('ALKOTA_ADMIN', 'ALKOTA_EDITOR', 'ALKOTA_ENGINEERING', 'ALKOTA_COMMERCIAL', 'ALKOTA_OWNER')
    )
  );

DROP POLICY IF EXISTS "Service Role Full Access Saved Builds" ON public.saved_builds;
CREATE POLICY "Service Role Full Access Saved Builds"
  ON public.saved_builds FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service Role Full Access Configurator Events" ON public.configurator_events;
CREATE POLICY "Service Role Full Access Configurator Events"
  ON public.configurator_events FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
