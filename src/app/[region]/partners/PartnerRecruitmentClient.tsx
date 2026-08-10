"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Wrench,
  Ruler,
  ShieldCheck,
  Users,
  AlertCircle,
  Lock,
  Download,
} from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import DevelopmentStatusTicker from "@/components/ui/DevelopmentStatusTicker";
import EarningsCalculator from "@/components/partner/EarningsCalculator";
import ApplicationForm from "@/components/partner/ApplicationForm";

const PARTNER_CRITERIA = [
  {
    code: "APN-01",
    heading: "TECHNICAL COMPETENCE",
    icon: Wrench,
    lines: [
      "Suspension setup and service",
      "Geometry and contact point fitting",
      "Carbon frame and component knowledge",
      "Drivetrain and brake specification",
    ],
  },
  {
    code: "APN-02",
    heading: "CUSTOMER PHILOSOPHY",
    icon: Users,
    lines: [
      "Relationship over transaction",
      "Long-term ownership support",
      "Advice that matches the rider",
      "Problem solving, not problem passing",
    ],
  },
  {
    code: "APN-03",
    heading: "FIT CAPABILITY",
    icon: Ruler,
    lines: [
      "Structured rider assessment process",
      "Reach, stack and stack-to-reach analysis",
      "Contact point optimisation",
      "Pre-delivery and post-delivery fit",
    ],
  },
  {
    code: "APN-04",
    heading: "BRAND ALIGNMENT",
    icon: ShieldCheck,
    lines: [
      "Engineering-led retail environment",
      "Premium single-brand presentation capability",
      "Customer education as part of the sale",
      "Willing to represent a development programme",
    ],
  },
];

const PARTNER_PROGRAMME = [
  {
    phase: "01",
    label: "EARLY CONVERSATION",
    description:
      "Alkota contacts shortlisted specialists for initial conversations about the product, the programme, and mutual fit.",
    status: "CURRENT PHASE",
    statusVariant: "signal",
    timing: "CURRENT",
  },
  {
    phase: "02",
    label: "PARTNER SELECTION",
    description:
      "A small initial group of partners are selected for the development phase — supporting registrants through build and fit.",
    status: "DEVELOPMENT PHASE",
    statusVariant: "slate",
    timing: "NEXT",
  },
  {
    phase: "03",
    label: "DEMO MACHINE ACCESS",
    description:
      "Partners receive a pre-production development machine for ride programme, fit sessions and customer introduction.",
    status: "PLANNED",
    statusVariant: "slate",
    timing: "PLANNED",
  },
  {
    phase: "04",
    label: "FULL PARTNER STATUS",
    description:
      "Full Alkota Partner status. Stock allocation, certification, marketing support, and access to the partner portal.",
    status: "PRODUCTION LAUNCH",
    statusVariant: "slate",
    timing: "2028 TARGET",
  },
];

export default function PartnerRecruitmentClient() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-20">
      <DevelopmentStatusTicker />

      {/* ── Hero ── */}
      <section className="w-full bg-alkota-black min-h-[50vh] flex flex-col justify-end px-4 sm:px-6 lg:px-8 pt-20 pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <TechnicalAnnotation
            label="ALKOTA PARTNER NETWORK"
            value="RECRUITMENT OPEN"
            variant="signal"
          />
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.9]">
            THE RIGHT BIKE
            <br />
            <span className="text-alkota-signal">NEEDS THE</span>
            <br />
            RIGHT SHOP.
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/80 font-light leading-relaxed max-w-2xl">
            Project 01 is being engineered around the complete ownership
            experience. That includes what happens long after somebody leaves
            the website.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/api/partners/pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-alkota-white text-alkota-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-alkota-signal transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD PARTNER PACK (PDF)</span>
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:border-alkota-signal transition-colors"
            >
              <span>APPLY NOW</span>
              <ArrowRight className="w-4 h-4 text-alkota-signal" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Context & Agency Model ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        <div className="max-w-3xl space-y-5">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-3 font-semibold">
            THE AGENCY MODEL &amp; PROPOSITION
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white tracking-tight">
            ZERO STOCK RISK. UNIFORM PRICING.
          </h2>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed">
            Alkota operates a genuine <strong>Agency Model</strong> — not traditional wholesale distribution. Alkota retains ownership of the bicycle until it is handed over to the rider.
          </p>
          <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed">
            As an Alkota Partner, you never buy inventory, take floorplan risk, or discount stock at season-end. You introduce riders through your demo fleet, perform fit and handover, and service the bike — receiving commission plus fixed fit, build, and service fees. Full commission applies to every sale in your catchment, regardless of whether the order originates in your shop or online.
          </p>
          <div className="bg-alkota-black border border-white/10 p-5 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-alkota-signal flex-shrink-0 mt-0.5" />
            <p className="font-mono text-[10px] text-alkota-slate leading-relaxed uppercase">
              <span className="text-alkota-signal font-bold">PRE-PRODUCTION PROGRAMME. </span>
              Conversations at this stage are early exploration. No contractual agreements will be formed until production specifications are locked.
            </p>
          </div>
        </div>
      </section>

      {/* ── EARNINGS CALCULATOR ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <EarningsCalculator />
      </section>

      {/* ── Who we want ── */}
      <section className="bg-alkota-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
          <div className="space-y-2">
            <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase font-semibold">
              WHAT WE ARE LOOKING FOR
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
              THE SELECTION CRITERIA.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PARTNER_CRITERIA.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.code}
                  className="bg-alkota-carbon border border-white/10 p-6 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-alkota-signal" />
                    <div>
                      <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                        {item.code}
                      </div>
                      <div className="font-mono text-xs text-white font-bold uppercase">
                        {item.heading}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {item.lines.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-alkota-signal flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-alkota-snow/80 font-light leading-relaxed">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Partner programme ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="space-y-2">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase font-semibold">
            HOW IT WORKS
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
            THE PARTNER JOURNEY.
          </h2>
        </div>
        <div className="space-y-3">
          {PARTNER_PROGRAMME.map((phase) => (
            <div
              key={phase.phase}
              className="flex gap-6 py-6 border-b border-white/10 last:border-0 items-start"
            >
              <div className="font-display font-bold text-3xl sm:text-4xl text-alkota-signal leading-none flex-shrink-0 w-12 text-center">
                {phase.phase}
              </div>
              <div className="flex-1 space-y-1">
                <div className="font-mono text-xs text-white font-bold uppercase">
                  {phase.label}
                </div>
                <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed">
                  {phase.description}
                </p>
                <div className="font-mono text-[9px] text-alkota-slate uppercase">
                  {phase.timing}
                </div>
              </div>
              <div
                className={`font-mono text-[9px] uppercase font-bold px-2.5 py-1 border flex-shrink-0 ${
                  phase.statusVariant === "signal"
                    ? "border-alkota-signal/40 text-alkota-signal bg-alkota-signal/5"
                    : "border-white/10 text-alkota-slate"
                }`}
              >
                {phase.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Application ── */}
      <section
        id="apply"
        className="bg-alkota-black border-y border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
          <div className="space-y-3">
            <TechnicalAnnotation
              label="PARTNER APPLICATION"
              value="QUALIFYING ENTRY"
              variant="signal"
            />
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
              APPLY TO BECOME
              <br />
              <span className="text-alkota-signal">AN ALKOTA PARTNER.</span>
            </h2>
            <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed max-w-xl">
              If you operate a specialist technical shop and the Alkota approach resonates, tell us about your business, technical capabilities, and catchment area.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>

      {/* ── Partner portal CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/10 p-6 sm:p-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-alkota-slate" />
              <span className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
                EXISTING PARTNERS
              </span>
            </div>
            <div className="font-display font-bold text-xl uppercase text-white">
              PARTNER PORTAL
            </div>
            <p className="font-sans text-xs text-alkota-snow/60 font-light">
              Access reserved for confirmed Alkota Partner Network members.
            </p>
          </div>
          <Link
            href="/partners/portal"
            className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-alkota-slate font-mono font-bold text-xs uppercase tracking-wider hover:border-alkota-signal/40 hover:text-alkota-signal transition-colors flex-shrink-0"
          >
            <Lock className="w-3.5 h-3.5" />
            PARTNER LOGIN
          </Link>
        </div>
      </section>
    </div>
  );
}
