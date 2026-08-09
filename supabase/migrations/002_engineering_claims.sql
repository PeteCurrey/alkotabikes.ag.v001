-- ==============================================================================
-- ALKOTA CYCLES — PRODUCTION DATABASE SCHEMA MIGRATION 002
-- File: supabase/migrations/002_engineering_claims.sql
-- Domain: Engineering Claims, Evidence Provenance & Release Control
-- ==============================================================================
-- Run AFTER 001_initial_production_schema.sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. SEQUENCE FOR CLAIM REFERENCES: APC-XXXXXX
-- ------------------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS seq_claim_number START WITH 1001;

-- ------------------------------------------------------------------------------
-- 1. ENUMERATIONS
-- ------------------------------------------------------------------------------
CREATE TYPE public.claim_type AS ENUM (
  'TARGET',
  'DESIGN_INTENT',
  'CALCULATED',
  'SIMULATED',
  'MEASURED',
  'TESTED',
  'VALIDATED',
  'PRODUCTION_SPECIFICATION'
);

CREATE TYPE public.claim_status AS ENUM (
  'DRAFT',
  'ENGINEERING_REVIEW',
  'EVIDENCE_REQUIRED',
  'APPROVED_DEVELOPMENT',
  'VALIDATION_PENDING',
  'VALIDATED',
  'PRODUCTION_RELEASED',
  'SUPERSEDED'
);

CREATE TYPE public.claim_source_type AS ENUM (
  'ENGINEERING_DRAWING',
  'CAD_MODEL',
  'CALCULATION',
  'SIMULATION',
  'BENCH_TEST',
  'LAB_TEST',
  'RIDE_TEST',
  'SUPPLIER_DOCUMENT',
  'COMPONENT_MANUFACTURER',
  'CONTROLLED_SPECIFICATION',
  'OTHER'
);

-- ------------------------------------------------------------------------------
-- 2. ENGINEERING CLAIMS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.engineering_claims (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_reference       TEXT UNIQUE NOT NULL,           -- APC-XXXXXX
  project               TEXT NOT NULL DEFAULT 'PROJECT_01',
  system                TEXT NOT NULL,                  -- GEOMETRY, KINEMATICS, MATERIALS, FIT, SUSPENSION, DRIVETRAIN, COMPONENTS
  title                 TEXT NOT NULL,
  value                 TEXT NOT NULL,
  unit                  TEXT,

  -- Classification
  claim_type            public.claim_type NOT NULL,
  status                public.claim_status NOT NULL DEFAULT 'EVIDENCE_REQUIRED',
  engineering_revision  TEXT NOT NULL DEFAULT 'R00',

  -- Evidence provenance
  source_type           public.claim_source_type,
  source_reference      TEXT,                           -- Drawing number, file path, test report ID
  source_document       TEXT,                           -- Storage bucket path or URL
  evidence_summary      TEXT,
  evidence_file         TEXT,                           -- Supabase Storage key

  -- Validation
  validation_method     TEXT,
  validated_by          TEXT,
  validated_at          TIMESTAMPTZ,

  -- Approval
  approved_by           TEXT,
  approved_at           TIMESTAMPTZ,

  -- Public language
  public_wording        TEXT,                           -- Approved text the website may render
  internal_wording      TEXT,                           -- Internal engineering description
  public_visibility     BOOLEAN NOT NULL DEFAULT FALSE, -- Gate: false = never shown publicly

  -- Lineage
  supersedes            TEXT REFERENCES public.engineering_claims(claim_reference),
  superseded_by         TEXT,

  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by system, status, revision
CREATE INDEX IF NOT EXISTS idx_claims_system       ON public.engineering_claims(system);
CREATE INDEX IF NOT EXISTS idx_claims_status       ON public.engineering_claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_project_rev  ON public.engineering_claims(project, engineering_revision);
CREATE INDEX IF NOT EXISTS idx_claims_visibility   ON public.engineering_claims(public_visibility, status);

-- ------------------------------------------------------------------------------
-- 3. AUDIT TRIGGER — every mutation writes to audit_logs
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.fn_audit_claim_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    -- Only log if meaningful fields changed
    IF (OLD.value        IS DISTINCT FROM NEW.value        OR
        OLD.status       IS DISTINCT FROM NEW.status       OR
        OLD.evidence_summary IS DISTINCT FROM NEW.evidence_summary OR
        OLD.public_wording   IS DISTINCT FROM NEW.public_wording   OR
        OLD.approved_by  IS DISTINCT FROM NEW.approved_by) THEN
      INSERT INTO public.audit_logs (
        actor_role, entity_type, entity_id, action, old_state, new_state
      ) VALUES (
        'SYSTEM',
        'engineering_claim',
        NEW.claim_reference,
        'UPDATE',
        jsonb_build_object(
          'value',          OLD.value,
          'status',         OLD.status,
          'evidence_summary', OLD.evidence_summary,
          'public_wording', OLD.public_wording,
          'approved_by',    OLD.approved_by
        ),
        jsonb_build_object(
          'value',          NEW.value,
          'status',         NEW.status,
          'evidence_summary', NEW.evidence_summary,
          'public_wording', NEW.public_wording,
          'approved_by',    NEW.approved_by
        )
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_audit_claim_change
  AFTER UPDATE ON public.engineering_claims
  FOR EACH ROW EXECUTE FUNCTION public.fn_audit_claim_change();

-- Updated_at auto-refresh
CREATE OR REPLACE FUNCTION public.fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_claims_updated_at
  BEFORE UPDATE ON public.engineering_claims
  FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- ------------------------------------------------------------------------------
ALTER TABLE public.engineering_claims ENABLE ROW LEVEL SECURITY;

-- Service role has full access (used by server-side API only)
CREATE POLICY "Admin Full Access Claims"
  ON public.engineering_claims USING (true) WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. SEED — 10 R00 CLAIMS (all EVIDENCE_REQUIRED per audit)
-- ------------------------------------------------------------------------------
INSERT INTO public.engineering_claims (
  claim_reference, project, system, title, value, unit,
  claim_type, status, engineering_revision,
  internal_wording, public_wording, public_visibility
) VALUES
  ('APC-001001', 'PROJECT_01', 'SUSPENSION', '160 mm Front Travel',    '160', 'mm',
   'TARGET',         'EVIDENCE_REQUIRED', 'R00',
   'Targeted front travel based on geometry and terrain requirement study. No physical prototype data yet.',
   'Development Target', FALSE),

  ('APC-001002', 'PROJECT_01', 'SUSPENSION', '150 mm Rear Travel',     '150', 'mm',
   'TARGET',         'EVIDENCE_REQUIRED', 'R00',
   'Targeted rear travel, calibrated for low-pivot four-bar family. No physical prototype data yet.',
   'Development Target', FALSE),

  ('APC-001003', 'PROJECT_01', 'GEOMETRY',   '29/29 Dual Wheel Platform', '29/29', 'inch',
   'DESIGN_INTENT',  'EVIDENCE_REQUIRED', 'R00',
   'Primary wheel architecture. MX option (29F/27.5R) under secondary study. Not physically validated.',
   'Engineering Direction', FALSE),

  ('APC-001004', 'PROJECT_01', 'MATERIALS',  'Full Carbon Chassis Intent', 'Full Carbon', NULL,
   'DESIGN_INTENT',  'EVIDENCE_REQUIRED', 'R00',
   'Chassis material intent. High-modulus UD carbon monocoque direction. No FEA or coupon data filed.',
   'Engineering Direction', FALSE),

  ('APC-001005', 'PROJECT_01', 'KINEMATICS', 'Low-Pivot Four-Bar Linkage Architecture', 'Low-pivot four-bar / Horst-style', NULL,
   'DESIGN_INTENT',  'EVIDENCE_REQUIRED', 'R00',
   'Preferred suspension architecture family. Hard points subject to physical validation.',
   'Engineering Direction', FALSE),

  ('APC-001006', 'PROJECT_01', 'FIT',        'S1–S4 Fit Geometry Family', 'S1 / S2 / S3 / S4', NULL,
   'DESIGN_INTENT',  'EVIDENCE_REQUIRED', 'R00',
   'Four-size fit family. Geometry to be derived from Large master after physical prototype validation.',
   'Engineering Direction', FALSE),

  ('APC-001007', 'PROJECT_01', 'GEOMETRY',   'Large Master Geometry — R00', '485 / 640.7 / 63.8 / 78.1', 'mm/mm/deg/deg',
   'CALCULATED',     'EVIDENCE_REQUIRED', 'R00',
   'R00 Large master geometry calculated from design brief. Reach 485mm, Stack 640.7mm, HA 63.8°, ESA 78.1°. CAD values exist, source drawing not formally filed.',
   'Engineering Baseline', FALSE),

  ('APC-001008', 'PROJECT_01', 'KINEMATICS', 'Kinematic Curves — Leverage / Anti-Squat / Axle Path', 'R00 Simulation', NULL,
   'SIMULATED',      'EVIDENCE_REQUIRED', 'R00',
   'Kinematic curves derived from suspension simulation model in codebase. Simulation source not formally filed as evidence.',
   'Simulation Baseline', FALSE),

  ('APC-001009', 'PROJECT_01', 'MATERIALS',  'Layup Schedule R00', 'R00 Direction', NULL,
   'DESIGN_INTENT',  'EVIDENCE_REQUIRED', 'R00',
   'Carbon layup schedule direction. No FEA coupon or structural analysis filed. To be developed alongside physical prototype.',
   'Engineering Direction', FALSE),

  ('APC-001010', 'PROJECT_01', 'FIT',        'Fit Engine Geometry Outputs', 'Algorithm R00', NULL,
   'CALCULATED',     'EVIDENCE_REQUIRED', 'R00',
   'Fit algorithm in fitModel.ts generates stack/reach/saddle outputs from rider measurements. Not approved by engineering lead.',
   'Engineering Baseline', FALSE)

ON CONFLICT (claim_reference) DO NOTHING;
