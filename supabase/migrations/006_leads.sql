-- ALKOTA CYCLES — MIGRATION 006: LEADS, CONSENT & CRM SCHEMA
-- Phase 1 — Lead Capture & CRM

CREATE EXTENSION IF NOT EXISTS citext;

-- Rate limit counter table (Postgres fallback for Upstash)
CREATE TABLE IF NOT EXISTS public.rate_limit_counters (
  key         text PRIMARY KEY,
  count       integer NOT NULL DEFAULT 1,
  expires_at  timestamptz NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_expires ON public.rate_limit_counters (expires_at);

-- Main leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                  citext NOT NULL,
  full_name              text,
  phone                  text,
  lead_type              text NOT NULL CHECK (lead_type IN (
                            'newsletter','waitlist','dealer_enquiry','press',
                            'general_contact','warranty','preorder_interest')),
  status                 text NOT NULL DEFAULT 'new' CHECK (status IN (
                            'new','contacted','qualified','customer','unqualified',
                            'unsubscribed','bounced')),
  source_page            text,
  utm_source             text,
  utm_medium             text,
  utm_campaign           text,
  utm_term               text,
  utm_content            text,
  referrer               text,
  locale                 text,
  country_code           text,
  message                text,
  marketing_consent      boolean NOT NULL DEFAULT false,
  consent_text           text,
  consent_at             timestamptz,
  consent_ip_hash        text,
  double_optin_at        timestamptz,
  optin_token            text UNIQUE,
  optin_token_expires_at timestamptz,
  unsubscribed_at        timestamptz,
  metadata               jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),

  UNIQUE (email, lead_type)
);

-- Index for CRM filtering and search
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON public.leads (lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_optin_token ON public.leads (optin_token) WHERE optin_token IS NOT NULL;

-- Append-only lead notes
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  author_id  uuid,
  body       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON public.lead_notes (lead_id);

-- Lead event audit log
CREATE TABLE IF NOT EXISTS public.lead_events (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN (
               'form_submitted','optin_confirmed','email_opened',
               'email_clicked','status_changed','note_added','exported')),
  payload    jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id ON public.lead_events (lead_id);

-- Auto-update updated_at trigger for leads
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_leads_updated_at();

-- RLS POLICIES
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limit_counters ENABLE ROW LEVEL SECURITY;

-- Anon access: ZERO policies on leads, notes, and events.
-- Public submissions are executed via service-role client in captureLead().
