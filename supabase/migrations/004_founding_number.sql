-- ==============================================================================
-- ALKOTA CYCLES — PRODUCTION DATABASE SCHEMA MIGRATION 004
-- File: supabase/migrations/004_founding_number.sql
-- Domain: Founding Register Sequential Integer Assignment
-- ==============================================================================

CREATE SEQUENCE IF NOT EXISTS seq_founding_number START WITH 1;

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS founding_number INTEGER UNIQUE DEFAULT nextval('seq_founding_number');
