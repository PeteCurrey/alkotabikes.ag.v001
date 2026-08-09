"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Send,
  Wrench,
  Ruler,
  ShieldCheck,
  Users,
  MapPin,
  AlertCircle,
  ChevronDown,
  Lock,
} from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import DevelopmentStatusTicker from "@/components/ui/DevelopmentStatusTicker";

// ─── WHO WE WANT ─────────────────────────────────────────────────────────────

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

// ─── Application form ─────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "sent" | "error";

const COUNTRIES = [
  "United Kingdom",
  "France",
  "Germany",
  "Switzerland",
  "Austria",
  "Italy",
  "Spain",
  "Belgium",
  "Netherlands",
  "Norway",
  "Sweden",
  "United States",
  "Canada",
  "Australia",
  "New Zealand",
  "Other",
];

function ApplicationForm() {
  const [form, setForm] = useState({
    shopName: "",
    location: "",
    country: "",
    website: "",
    contactName: "",
    contactEmail: "",
    specialisms: "",
    whyAlkota: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [openCountry, setOpenCountry] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.shopName || !form.contactEmail || !form.country) {
      setFormState("error");
      return;
    }
    setFormState("submitting");
    // Simulate async partner enquiry submission
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("sent");
  };

  if (formState === "sent") {
    return (
      <div className="bg-alkota-black border border-alkota-signal/30 p-8 sm:p-12 space-y-4 text-center">
        <CheckCircle2 className="w-8 h-8 text-alkota-signal mx-auto" />
        <div className="font-display font-bold text-2xl sm:text-3xl uppercase text-white leading-tight">
          APPLICATION RECEIVED.
        </div>
        <p className="font-sans text-sm text-alkota-snow/80 font-light max-w-md mx-auto leading-relaxed">
          Thank you for your interest in the Alkota Partner Network. We will
          review your application and be in touch when conversations are open in
          your region.
        </p>
        <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider pt-2">
          Reference: APN-{Date.now().toString(36).toUpperCase().slice(-6)}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Shop name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            SHOP / BUSINESS NAME *
          </label>
          <input
            name="shopName"
            type="text"
            value={form.shopName}
            onChange={handleChange}
            className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors"
            placeholder="Your shop name"
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            CITY / TOWN *
          </label>
          <input
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors"
            placeholder="City / Town"
            required
          />
        </div>

        {/* Country */}
        <div className="space-y-1.5 relative">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            COUNTRY *
          </label>
          <button
            type="button"
            onClick={() => setOpenCountry(!openCountry)}
            className="w-full bg-alkota-black border border-white/20 text-left font-mono text-sm px-4 py-3 flex items-center justify-between focus:outline-none focus:border-alkota-signal transition-colors"
          >
            <span className={form.country ? "text-white" : "text-alkota-slate/40"}>
              {form.country || "Select country"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-alkota-slate transition-transform ${openCountry ? "rotate-180" : ""}`}
            />
          </button>
          {openCountry && (
            <div className="absolute top-full left-0 right-0 z-50 bg-alkota-black border border-white/20 max-h-48 overflow-y-auto shadow-xl">
              {COUNTRIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, country: c }));
                    setOpenCountry(false);
                  }}
                  className="w-full text-left font-mono text-xs text-alkota-snow px-4 py-2.5 hover:bg-alkota-signal/10 hover:text-white transition-colors uppercase"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Website */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            WEBSITE
          </label>
          <input
            name="website"
            type="url"
            value={form.website}
            onChange={handleChange}
            className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors"
            placeholder="https://yourshop.com"
          />
        </div>

        {/* Contact name */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            CONTACT NAME *
          </label>
          <input
            name="contactName"
            type="text"
            value={form.contactName}
            onChange={handleChange}
            className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors"
            placeholder="Name"
            required
          />
        </div>

        {/* Contact email */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            EMAIL ADDRESS *
          </label>
          <input
            name="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={handleChange}
            className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors"
            placeholder="you@yourshop.com"
            required
          />
        </div>

        {/* Specialisms */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            YOUR TECHNICAL SPECIALISMS
          </label>
          <input
            name="specialisms"
            type="text"
            value={form.specialisms}
            onChange={handleChange}
            className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors"
            placeholder="e.g. suspension, fitting, carbon, enduro / trail, custom builds"
          />
        </div>

        {/* Why Alkota */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
            WHY ALKOTA? (OPTIONAL)
          </label>
          <textarea
            name="whyAlkota"
            value={form.whyAlkota}
            onChange={handleChange}
            rows={4}
            className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors resize-none"
            placeholder="Tell us what resonates about the project and how you think a partnership would work."
          />
        </div>
      </div>

      {formState === "error" && (
        <div className="flex items-center gap-2 font-mono text-[10px] text-red-400 uppercase">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          Please complete all required fields.
        </div>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="inline-flex items-center gap-2 px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-60"
      >
        {formState === "submitting" ? (
          <>
            <span className="w-3.5 h-3.5 border border-alkota-black/30 border-t-alkota-black rounded-full animate-spin" />
            SENDING APPLICATION...
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            APPLY TO BECOME AN ALKOTA PARTNER
          </>
        )}
      </button>

      <p className="font-mono text-[9px] text-alkota-slate uppercase leading-relaxed">
        Submitting this form does not create a contractual obligation for either
        party. We will make contact to progress conversations when the programme
        is ready in your region.
      </p>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DealersClient() {
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
          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs font-bold">
            {["Setup.", "Fit.", "Suspension.", "Service.", "Advice.", "Problems solved properly."].map(
              (item) => (
                <span
                  key={item}
                  className="text-alkota-signal border border-alkota-signal/30 px-3 py-1.5 uppercase"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Context ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-6">
        <div className="max-w-3xl space-y-5">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-3 font-semibold">
            THE PROGRAMME
          </div>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed">
            Ahead of planned production in 2028, Alkota is beginning conversations
            with specialist partners who understand that side of the bicycle.
          </p>
          <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed">
            This is not a mass-market distribution exercise. Project 01 will be a
            low-volume, high-specification machine. It will not be sold through
            general cycle retailers. Every partner will be selected on
            demonstrable technical capability, customer philosophy, and geographic
            fit.
          </p>
          <div className="bg-alkota-black border border-white/10 p-5 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-alkota-signal flex-shrink-0 mt-0.5" />
            <p className="font-mono text-[10px] text-alkota-slate leading-relaxed uppercase">
              <span className="text-alkota-signal font-bold">PRE-PRODUCTION PROGRAMME. </span>
              We are not operating a current dealer network. Conversations at this
              stage are early exploration only. No contractual agreements will be
              formed until production specification is locked.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who we want ── */}
      <section className="bg-alkota-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
          <div className="space-y-2">
            <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase font-semibold">
              WHAT WE ARE LOOKING FOR
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
              THE CRITERIA.
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
          {PARTNER_PROGRAMME.map((phase, i) => (
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
              value="EARLY CONVERSATIONS"
              variant="signal"
            />
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
              APPLY TO BECOME
              <br />
              <span className="text-alkota-signal">AN ALKOTA PARTNER.</span>
            </h2>
            <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed max-w-xl">
              If you operate a specialist technical shop and the Alkota approach
              resonates, tell us about yourself. Conversations are open now — no
              contractual commitment is expected at this stage.
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

        {/* Cross-links */}
        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
          <Link
            href="/bikes/project-01"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-alkota-slate hover:text-alkota-signal uppercase transition-colors"
          >
            <span>PROJECT 01</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/road-to-2028"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-alkota-slate hover:text-alkota-signal uppercase transition-colors"
          >
            <span>ROAD TO 2028</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/order"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-alkota-signal hover:text-white uppercase font-bold transition-colors"
          >
            <span>JOIN THE REGISTER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
