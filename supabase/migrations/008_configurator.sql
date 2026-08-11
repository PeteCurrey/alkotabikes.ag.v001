-- ==============================================================================
-- ALKOTA CYCLES — MIGRATION 008: CONFIGURATOR CORE & RULES ENGINE SCHEMA
-- Phase 8A — Build Configurator Data Model, Rules Engine & Snapshot Storage
-- ==============================================================================

-- 1. CONFIGURATOR MODELS
CREATE TABLE IF NOT EXISTS public.configurator_models (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text NOT NULL UNIQUE,
  name              text NOT NULL,
  subtitle          text,
  status            text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  description_json  jsonb,
  hero_media_id     uuid REFERENCES public.media_assets(id),
  base_price_minor  bigint,
  currency_defaults jsonb NOT NULL DEFAULT '{"GB":"GBP","US":"USD"}'::jsonb,
  markets           text[] NOT NULL DEFAULT '{GB}',
  sort_position     integer NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  updated_by        uuid
);

-- 2. CONFIGURATOR VERSIONS (Snapshotted tree)
CREATE TABLE IF NOT EXISTS public.configurator_versions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id     uuid NOT NULL REFERENCES public.configurator_models(id) ON DELETE CASCADE,
  version      integer NOT NULL,
  status       text NOT NULL CHECK (status IN ('draft','published','superseded')),
  snapshot     jsonb NOT NULL,
  published_at timestamptz,
  published_by uuid,
  note         text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_id, version)
);

-- 3. OPTION GROUPS
CREATE TABLE IF NOT EXISTS public.option_groups (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id       uuid NOT NULL REFERENCES public.configurator_models(id) ON DELETE CASCADE,
  key            text NOT NULL,
  label          text NOT NULL,
  help_text      text,
  group_type     text NOT NULL CHECK (group_type IN ('single_select','multi_select','quantity','boolean')),
  is_required    boolean NOT NULL DEFAULT true,
  min_select     integer NOT NULL DEFAULT 1,
  max_select     integer NOT NULL DEFAULT 1,
  step_position  integer NOT NULL DEFAULT 0,
  affects_visual boolean NOT NULL DEFAULT false,
  media_layer    text,
  is_active      boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_id, key)
);

-- 4. OPTIONS
CREATE TABLE IF NOT EXISTS public.options (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id          uuid NOT NULL REFERENCES public.option_groups(id) ON DELETE CASCADE,
  key               text NOT NULL,
  label             text NOT NULL,
  description       text,
  sku               text,
  manufacturer      text,
  manufacturer_part text,
  swatch_hex        text,
  media_id          uuid REFERENCES public.media_assets(id),
  layer_media_id    uuid REFERENCES public.media_assets(id),
  weight_grams      integer,
  weight_source     text NOT NULL DEFAULT 'unknown' CHECK (weight_source IN ('manufacturer_published','measured','estimated','unknown')),
  lead_time_days    integer,
  is_default        boolean NOT NULL DEFAULT false,
  is_active         boolean NOT NULL DEFAULT true,
  availability      text NOT NULL DEFAULT 'available' CHECK (availability IN ('available','low_stock','made_to_order','discontinued','coming_soon')),
  markets           text[] NOT NULL DEFAULT '{GB,US}',
  sort_position     integer NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (group_id, key)
);

-- 5. OPTION PRICES
CREATE TABLE IF NOT EXISTS public.option_prices (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  option_id     uuid NOT NULL REFERENCES public.options(id) ON DELETE CASCADE,
  currency      text NOT NULL CHECK (currency IN ('GBP','USD')),
  delta_minor   bigint NOT NULL DEFAULT 0,
  tax_inclusive boolean NOT NULL DEFAULT true,
  valid_from    timestamptz NOT NULL DEFAULT now(),
  valid_to      timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (option_id, currency, valid_from)
);

-- 6. FRAME GEOMETRY
CREATE TABLE IF NOT EXISTS public.frame_geometry (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id       uuid NOT NULL REFERENCES public.configurator_models(id) ON DELETE CASCADE,
  size_option_id uuid NOT NULL REFERENCES public.options(id) ON DELETE CASCADE,
  measurements   jsonb NOT NULL,
  source         text NOT NULL CHECK (source IN ('measured','cad','unknown')),
  verified_by    uuid,
  verified_at    timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_id, size_option_id)
);

-- 7. RIDER FIT BANDS
CREATE TABLE IF NOT EXISTS public.rider_fit_bands (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id       uuid NOT NULL REFERENCES public.configurator_models(id) ON DELETE CASCADE,
  size_option_id uuid NOT NULL REFERENCES public.options(id) ON DELETE CASCADE,
  min_height_cm  integer NOT NULL,
  max_height_cm  integer NOT NULL,
  min_inseam_cm  integer,
  max_inseam_cm  integer,
  source         text,
  verified_at    timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_id, size_option_id)
);

-- 8. CONFIGURATOR RULES
CREATE TABLE IF NOT EXISTS public.configurator_rules (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id   uuid NOT NULL REFERENCES public.configurator_models(id) ON DELETE CASCADE,
  name       text NOT NULL,
  rule_type  text NOT NULL CHECK (rule_type IN ('requires','excludes','restricts_to','auto_select','sets_default','market_only','min_quantity','max_quantity')),
  trigger    jsonb NOT NULL,
  effect     jsonb NOT NULL,
  message    text NOT NULL,
  priority   integer NOT NULL DEFAULT 100,
  is_active  boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 9. CONFIGURATOR PRESETS
CREATE TABLE IF NOT EXISTS public.configurator_presets (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id      uuid NOT NULL REFERENCES public.configurator_models(id) ON DELETE CASCADE,
  key           text NOT NULL,
  label         text NOT NULL,
  description   text,
  selections    jsonb NOT NULL,
  hero_media_id uuid REFERENCES public.media_assets(id),
  sort_position integer NOT NULL DEFAULT 0,
  is_active     boolean NOT NULL DEFAULT true,
  badge         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_id, key)
);

-- 10. INDEXES
CREATE INDEX IF NOT EXISTS idx_configurator_versions_model ON public.configurator_versions(model_id, status);
CREATE INDEX IF NOT EXISTS idx_option_groups_model ON public.option_groups(model_id, step_position);
CREATE INDEX IF NOT EXISTS idx_options_group ON public.options(group_id, sort_position);
CREATE INDEX IF NOT EXISTS idx_option_prices_option ON public.option_prices(option_id, currency);
CREATE INDEX IF NOT EXISTS idx_configurator_rules_model ON public.configurator_rules(model_id, priority);
CREATE INDEX IF NOT EXISTS idx_configurator_presets_model ON public.configurator_presets(model_id, sort_position);

-- 11. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.configurator_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configurator_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.option_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.option_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.frame_geometry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rider_fit_bands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configurator_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configurator_presets ENABLE ROW LEVEL SECURITY;

-- Anon READ on published models
DROP POLICY IF EXISTS "Anon SELECT published models" ON public.configurator_models;
CREATE POLICY "Anon SELECT published models"
  ON public.configurator_models FOR SELECT TO public
  USING (status = 'published');

-- Anon READ on published versions
DROP POLICY IF EXISTS "Anon SELECT published versions" ON public.configurator_versions;
CREATE POLICY "Anon SELECT published versions"
  ON public.configurator_versions FOR SELECT TO public
  USING (status = 'published');

-- Public SELECT on active groups, options, prices, presets
DROP POLICY IF EXISTS "Public SELECT active option groups" ON public.option_groups;
CREATE POLICY "Public SELECT active option groups"
  ON public.option_groups FOR SELECT TO public USING (is_active = true);

DROP POLICY IF EXISTS "Public SELECT active options" ON public.options;
CREATE POLICY "Public SELECT active options"
  ON public.options FOR SELECT TO public USING (is_active = true);

DROP POLICY IF EXISTS "Public SELECT option prices" ON public.option_prices;
CREATE POLICY "Public SELECT option prices"
  ON public.option_prices FOR SELECT TO public USING (valid_to IS NULL OR valid_to > now());

DROP POLICY IF EXISTS "Public SELECT active rules" ON public.configurator_rules;
CREATE POLICY "Public SELECT active rules"
  ON public.configurator_rules FOR SELECT TO public USING (is_active = true);

DROP POLICY IF EXISTS "Public SELECT active presets" ON public.configurator_presets;
CREATE POLICY "Public SELECT active presets"
  ON public.configurator_presets FOR SELECT TO public USING (is_active = true);

DROP POLICY IF EXISTS "Public SELECT verified geometry" ON public.frame_geometry;
CREATE POLICY "Public SELECT verified geometry"
  ON public.frame_geometry FOR SELECT TO public USING (source IN ('measured','cad') AND verified_at IS NOT NULL);

DROP POLICY IF EXISTS "Public SELECT verified fit bands" ON public.rider_fit_bands;
CREATE POLICY "Public SELECT verified fit bands"
  ON public.rider_fit_bands FOR SELECT TO public USING (verified_at IS NOT NULL);
