-- ALKOTA CYCLES — MIGRATION 010: MEDIA ASSETS PROVENANCE & CLAIM COLUMNS
-- Adds provenance and claim columns to public.media_assets to support image provenance auditing and CMS build gating.

ALTER TABLE public.media_assets
ADD COLUMN IF NOT EXISTS provenance text NOT NULL DEFAULT 'unknown'
CHECK (provenance IN ('own_alkota', 'own_generic', 'licensed_stock', 'ai_generated', 'unknown')),
ADD COLUMN IF NOT EXISTS claim boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_media_assets_provenance ON public.media_assets (provenance);
CREATE INDEX IF NOT EXISTS idx_media_assets_claim ON public.media_assets (claim);
