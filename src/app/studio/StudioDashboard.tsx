"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Wrench,
  Cpu,
  BookOpen,
  Archive,
  Image,
  ShoppingBag,
  Building2,
  Flame,
  DollarSign,
} from "lucide-react";
import { PROJECT_01_SPECIFICATION } from "@/content/project01/specification";
import { PROJECT01_COMPONENTS, type Project01Component } from "@/content/project01/components";
import { PROJECT_01_JOURNAL_ENTRIES, type JournalEntry } from "@/content/journal/project01/entries";
import { DESIGN_ARCHIVE, type DesignArtifactRecord } from "@/content/design/archive";
import { products, type Product } from "@/content/store/products";

// ─── Studio stat card ─────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  href,
  status,
}: {
  label: string;
  value: string | number;
  sub?: string;
  href?: string;
  status?: "ok" | "warn" | "neutral";
}) {
  const indicator = {
    ok: <CheckCircle2 className="w-3 h-3 text-green-400" />,
    warn: <AlertTriangle className="w-3 h-3 text-yellow-400" />,
    neutral: <Clock className="w-3 h-3 text-[#647789]" />,
  };

  const content = (
    <div className="bg-[#131313] border border-white/8 p-4 hover:border-white/15 transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-mono text-[8px] uppercase tracking-widest text-[#647789]">
          {label}
        </div>
        {status && indicator[status]}
      </div>
      <div className="font-display font-bold text-2xl text-white leading-none">
        {value}
      </div>
      {sub && (
        <div className="font-mono text-[8px] uppercase tracking-wider text-[#647789] mt-1.5">
          {sub}
        </div>
      )}
      {href && (
        <div className="flex items-center gap-1 mt-3 font-mono text-[8px] text-[#1a73e8] uppercase group-hover:gap-2 transition-all">
          <span>MANAGE</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </div>
      )}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : <div>{content}</div>;
}

// ─── Section link card ────────────────────────────────────────────────────────

function SectionCard({
  icon: Icon,
  label,
  desc,
  href,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 p-4 bg-[#131313] border border-white/8 hover:border-[#1a73e8]/30 hover:bg-[#1a73e8]/5 transition-all group"
    >
      <Icon className="w-4 h-4 text-[#1a73e8] flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-mono text-[10px] text-white font-bold uppercase">
            {label}
          </div>
          {badge && (
            <span className="font-mono text-[7px] px-1.5 py-0.5 bg-[#1a73e8]/15 text-[#1a73e8] uppercase">
              {badge}
            </span>
          )}
        </div>
        <div className="font-mono text-[8px] text-[#647789] mt-0.5 leading-relaxed">
          {desc}
        </div>
      </div>
      <ArrowRight className="w-3 h-3 text-[#647789] group-hover:text-[#1a73e8] flex-shrink-0 mt-0.5 ml-auto transition-colors" />
    </Link>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

export default function StudioDashboard() {
  const spec = PROJECT_01_SPECIFICATION;
  const components = PROJECT01_COMPONENTS;
  const journalEntries = PROJECT_01_JOURNAL_ENTRIES;
  const designArtifacts = DESIGN_ARCHIVE;
  const storeProducts = products;

  // Derived counts
  const missingAssets = components.filter((c: Project01Component) => c.assetStatus === "UNAVAILABLE").length;
  const pendingDecisions = components.filter((c: Project01Component) => c.status === "UNDER_REVIEW").length;
  const publishedJournal = journalEntries.filter((e: JournalEntry) => e.status === "CURRENT" || e.status === "VALIDATED").length;
  const draftJournal = journalEntries.filter((e: JournalEntry) => e.status === "DEVELOPMENT" || e.status === "PLANNED").length;
  const pendingArtifacts = designArtifacts.filter((a: DesignArtifactRecord) => a.status === "PLACEHOLDER").length;
  const launchReadyProducts = storeProducts.filter((p: Product) => p.status === "available").length;
  const pendingProducts = storeProducts.filter((p: Product) => p.status === "coming_soon").length;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* ── Header ── */}
      <div className="space-y-1">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">
          ALKOTA STUDIO
        </div>
        <h1 className="font-display font-bold text-3xl text-white uppercase">
          DASHBOARD
        </h1>
        <div className="font-mono text-[9px] text-[#647789] uppercase tracking-wider">
          PRODUCT / CONTENT / DEVELOPMENT CONTROL
        </div>
      </div>

      {/* ── Programme status ── */}
      <div className="bg-[#0a0a0a] border border-white/8 p-5 space-y-4">
        <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
          CURRENT PROGRAMME
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "PROJECT 01 REVISION", value: spec.currentRevision },
            { label: "DEVELOPMENT PHASE", value: "ENGINEERING" },
            { label: "NEXT PROGRAMME", value: "PROTOTYPE" },
            { label: "RACING", value: "PLANNED 2027" },
            { label: "PRODUCTION", value: "PLANNED 2028" },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="font-mono text-[7px] uppercase tracking-widest text-[#647789]">
                {item.label}
              </div>
              <div className="font-mono text-[10px] text-[#1a73e8] font-bold uppercase">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Operational counts ── */}
      <div>
        <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest mb-3">
          OPERATIONAL COUNTS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <StatCard
            label="COMPONENTS"
            value={components.length}
            sub="in catalogue"
            href="/studio/project-01"
            status="ok"
          />
          <StatCard
            label="MISSING ASSETS"
            value={missingAssets}
            sub="component images"
            href="/studio/media"
            status={missingAssets > 0 ? "warn" : "ok"}
          />
          <StatCard
            label="PENDING DECISIONS"
            value={pendingDecisions}
            sub="under review"
            href="/studio/project-01"
            status={pendingDecisions > 0 ? "warn" : "ok"}
          />
          <StatCard
            label="JOURNAL ENTRIES"
            value={publishedJournal}
            sub="published"
            href="/studio/journal"
            status="ok"
          />
          <StatCard
            label="JOURNAL DRAFTS"
            value={draftJournal}
            sub="in development"
            href="/studio/journal"
            status="neutral"
          />
          <StatCard
            label="DESIGN ARTIFACTS"
            value={designArtifacts.filter(a => a.visibility === "PUBLIC").length}
            sub={`${pendingArtifacts} pending images`}
            href="/studio/design"
            status={pendingArtifacts > 0 ? "warn" : "ok"}
          />
          <StatCard
            label="STORE PRODUCTS"
            value={storeProducts.length}
            sub={`${launchReadyProducts} live, ${pendingProducts} pending`}
            href="/studio/store"
            status="neutral"
          />
          <StatCard
            label="REGISTRATIONS"
            value="—"
            sub="database pending"
            href="/studio/registrations"
            status="neutral"
          />
        </div>
      </div>

      {/* ── Phase 01 data notice ── */}
      <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-mono text-[9px] text-yellow-400 font-bold uppercase tracking-widest">
            PHASE 01 — DATA LAYER
          </div>
          <p className="font-mono text-[8px] text-[#647789] leading-relaxed">
            Studio Phase 01 reads from TypeScript content files. Edits made in Studio are persisted to browser localStorage as overlays.
            Phase 02 will wire Studio to a real database backend (Supabase / Postgres).
            Counts marked &ldquo;—&rdquo; require a live database connection.
          </p>
        </div>
      </div>

      {/* ── Section quick-access ── */}
      <div>
        <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest mb-3">
          STUDIO SECTIONS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <SectionCard
            icon={Cpu}
            label="PROJECT 01"
            desc="Specification, components, geometry, build matrix"
            href="/studio/project-01"
          />
          <SectionCard
            icon={DollarSign}
            label="COMMERCIAL CONTROL"
            desc="Pricing status, regional specs, deposit terms & dealer margin structure"
            href="/studio/commercial"
            badge="C00 BASELINE"
          />
          <SectionCard
            icon={BookOpen}
            label="JOURNAL"
            desc="Development journal entries, drafts, scheduling"
            href="/studio/journal"
          />
          <SectionCard
            icon={Archive}
            label="DESIGN ARCHIVE"
            desc="Upload and manage design artifacts ALK-SKETCH-001–012+"
            href="/studio/design"
          />
          <SectionCard
            icon={Image}
            label="MEDIA LIBRARY"
            desc="Image catalogue, product fidelity, alt text, approvals"
            href="/studio/media"
          />
          <SectionCard
            icon={Users}
            label="REGISTRATIONS"
            desc="Project 01 development registrants, intent, data"
            href="/studio/registrations"
          />
          <SectionCard
            icon={Wrench}
            label="BUILDS + FIT"
            desc="Saved development builds and fit profiles"
            href="/studio/builds"
          />
          <SectionCard
            icon={Building2}
            label="PARTNERS"
            desc="Dealer applications, status, onboarding pipeline"
            href="/studio/partners"
          />
          <SectionCard
            icon={ShoppingBag}
            label="STORE"
            desc="Supply catalogue management, pricing, variants"
            href="/studio/store"
          />
          <SectionCard
            icon={Flame}
            label="RACING"
            desc="Programme status, dispatches, team, calendar"
            href="/studio/racing"
            badge="2027"
          />
        </div>
      </div>
    </div>
  );
}
