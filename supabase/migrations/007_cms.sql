-- ALKOTA CYCLES — MIGRATION 007: CMS MEDIA & CONTENT SLOTS SCHEMA
-- Phase 2 — CMS: Database-Driven Media and Page Content

-- 1. MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.media_assets (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path   text NOT NULL UNIQUE,
  filename       text NOT NULL,
  mime_type      text NOT NULL,
  bytes          bigint NOT NULL,
  width          integer,
  height         integer,
  blur_data_url  text,
  alt_text       text,
  is_decorative  boolean NOT NULL DEFAULT false,
  caption        text,
  credit         text,
  licence        text NOT NULL DEFAULT 'owned'
                   CHECK (licence IN ('owned','licensed','cc-by','unknown')),
  licence_expiry date,
  focal_x        numeric NOT NULL DEFAULT 0.5 CHECK (focal_x >= 0 AND focal_x <= 1),
  focal_y        numeric NOT NULL DEFAULT 0.5 CHECK (focal_y >= 0 AND focal_y <= 1),
  tags           text[] NOT NULL DEFAULT '{}',
  content_hash   text,
  uploaded_by    uuid,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),

  -- Alt text constraint: decorative OR meaningful alt text (minimum 5 chars)
  CONSTRAINT alt_text_required CHECK (
    is_decorative = true OR (alt_text IS NOT NULL AND length(trim(alt_text)) >= 5)
  )
);

CREATE INDEX IF NOT EXISTS idx_media_assets_content_hash ON public.media_assets (content_hash) WHERE content_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_media_assets_licence ON public.media_assets (licence);

-- 2. CONTENT SLOTS TABLE
CREATE TABLE IF NOT EXISTS public.content_slots (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key    text NOT NULL,
  slot_key    text NOT NULL,
  slot_type   text NOT NULL CHECK (slot_type IN ('image','image_set','text','rich_text','link','video')),
  value_text  text,
  value_json  jsonb,
  media_id    uuid REFERENCES public.media_assets(id) ON DELETE RESTRICT,
  media_ids   uuid[],
  locale      text NOT NULL DEFAULT 'en-GB',
  is_required boolean NOT NULL DEFAULT true,
  updated_by  uuid,
  updated_at  timestamptz NOT NULL DEFAULT now(),

  UNIQUE (page_key, slot_key, locale)
);

CREATE INDEX IF NOT EXISTS idx_content_slots_page_slot ON public.content_slots (page_key, slot_key);
CREATE INDEX IF NOT EXISTS idx_content_slots_media_id ON public.content_slots (media_id) WHERE media_id IS NOT NULL;

-- 3. AUTO-UPDATE TRIGGERS
CREATE OR REPLACE FUNCTION public.update_cms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_media_assets_updated_at ON public.media_assets;
CREATE TRIGGER trg_media_assets_updated_at
  BEFORE UPDATE ON public.media_assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_updated_at();

DROP TRIGGER IF EXISTS trg_content_slots_updated_at ON public.content_slots;
CREATE TRIGGER trg_content_slots_updated_at
  BEFORE UPDATE ON public.content_slots
  FOR EACH ROW
  EXECUTE FUNCTION public.update_cms_updated_at();

-- 4. RLS POLICIES (Mandatory per Constitution)
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_slots ENABLE ROW LEVEL SECURITY;

-- Anon READ on media_assets: SELECT allowed for non-unknown licences
DROP POLICY IF EXISTS "Anon SELECT allowed media assets" ON public.media_assets;
CREATE POLICY "Anon SELECT allowed media assets"
  ON public.media_assets
  FOR SELECT
  TO public
  USING (licence != 'unknown');

-- Anon READ on content_slots: SELECT allowed for page rendering
DROP POLICY IF EXISTS "Anon SELECT content slots" ON public.content_slots;
CREATE POLICY "Anon SELECT content slots"
  ON public.content_slots
  FOR SELECT
  TO public
  USING (true);
