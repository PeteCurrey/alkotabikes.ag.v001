"use client";

import React, { useState } from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, Check, Mail, MapPin, Shield } from "lucide-react";
import { company } from "@/lib/company";

// ── Contact channels sourced from lib/company.ts ──────────────────────────────
const CONTACT_CHANNELS = [
  {
    label: "GENERAL ENQUIRIES",
    desc: "Project 01 development questions, programme details, and general correspondence.",
    email: company.email.customerService,
    fallback: "support@alkotacycles.com",
  },
  {
    label: "RETAIL & PARTNER NETWORK",
    desc: "Stockist applications, authorised demo centres, and partner programme enquiries.",
    email: company.email.customerService,
    fallback: "support@alkotacycles.com",
  },
  {
    label: "PRESS & MEDIA",
    desc: "Editorial requests, imagery licensing, and accredited media access.",
    email: company.email.customerService,
    fallback: "press@alkotacycles.com",
  },
  {
    label: "LEGAL",
    desc: "IP, contracts, and formal legal correspondence.",
    email: company.email.legal,
    fallback: "legal@alkotacycles.com",
  },
  {
    label: "PRIVACY",
    desc: "Data subject rights, GDPR requests, and privacy enquiries.",
    email: company.email.privacy,
    fallback: "privacy@alkotacycles.com",
  },
  {
    label: "WARRANTY & SUPPORT",
    desc: "Technical support and warranty claims once Project 01 is in owners' hands.",
    email: company.email.warranty,
    fallback: "warranty@alkotacycles.com",
  },
] as const;

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark min-h-screen">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── Header ── */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="COMMUNICATION CHANNEL" value="CONTACT" variant="signal" />
          <h1 className="font-display font-bold text-5xl sm:text-7xl uppercase tracking-tight text-white leading-[0.9]">
            DIRECT LINE TO<br />
            <span className="text-alkota-signal">ENGINEERING.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed max-w-2xl">
            Whether you have technical questions about Project 01, want to enquire about retail partnership, or need programme details — communicate directly with the team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── LEFT: Contact Form ── */}
          <div className="lg:col-span-3 space-y-8">

            {submitted ? (
              <div className="bg-alkota-black border border-alkota-signal p-8 space-y-4">
                <div className="flex items-center gap-3 text-alkota-signal">
                  <Check className="w-6 h-6" />
                  <span className="font-mono font-bold text-lg uppercase tracking-wider">
                    COMMUNICATION RECEIVED
                  </span>
                </div>
                <p className="font-sans text-sm text-alkota-snow font-light">
                  Thank you for contacting {company.tradingName}. A team representative will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-alkota-black border border-white/10 p-8 sm:p-10 space-y-6">
                <div className="font-mono text-xs text-alkota-slate tracking-widest uppercase mb-2">
                  DIRECT ENQUIRY FORM
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="font-mono text-xs text-alkota-slate uppercase block">FULL NAME *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white placeholder-white/30 focus:border-alkota-signal focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="font-mono text-xs text-alkota-slate uppercase block">EMAIL ADDRESS *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white placeholder-white/30 focus:border-alkota-signal focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="font-mono text-xs text-alkota-slate uppercase block">ENQUIRY TYPE</label>
                  <select
                    id="contact-subject"
                    className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white focus:border-alkota-signal focus:outline-none"
                  >
                    <option value="technical">Project 01 Technical Enquiry</option>
                    <option value="register">Development Register &amp; Programme</option>
                    <option value="partner">Retail &amp; Partner Network</option>
                    <option value="press">Press &amp; Media</option>
                    <option value="legal">Legal &amp; IP</option>
                    <option value="other">General Enquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-mono text-xs text-alkota-slate uppercase block">MESSAGE *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Write your enquiry..."
                    className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white placeholder-white/30 focus:border-alkota-signal focus:outline-none"
                  />
                </div>

                <p className="font-mono text-[10px] text-alkota-slate/60 leading-relaxed">
                  By submitting this form you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-alkota-slate">Privacy Policy</Link>.
                  We use your information to respond to your enquiry only.
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  <span>SEND ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Contact channels + company identity ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact Channels */}
            <div className="space-y-4">
              <div className="font-mono text-xs text-alkota-slate tracking-widest uppercase border-b border-white/10 pb-3">
                CONTACT CHANNELS
              </div>
              <div className="space-y-4">
                {CONTACT_CHANNELS.map((ch) => (
                  <div key={ch.label} className="space-y-1">
                    <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase">{ch.label}</div>
                    <div className="font-sans text-xs text-alkota-snow/60 leading-relaxed">{ch.desc}</div>
                    <a
                      href={`mailto:${ch.email ?? ch.fallback}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-alkota-snow/80 hover:text-alkota-signal transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{ch.email ?? ch.fallback}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Identity Block */}
            <div className="bg-alkota-black border border-white/10 p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-alkota-signal text-[10px] tracking-widest uppercase">
                <Shield className="w-3.5 h-3.5" />
                <span>OPERATOR IDENTITY</span>
              </div>

              <div className="space-y-2 text-alkota-slate/80">
                {company.legalEntityName ? (
                  <>
                    <div>
                      <span className="text-alkota-slate/50">TRADING NAME: </span>
                      {company.tradingName}
                    </div>
                    <div>
                      <span className="text-alkota-slate/50">LEGAL ENTITY: </span>
                      {company.legalEntityName}
                    </div>
                    {company.companyNumber && (
                      <div>
                        <span className="text-alkota-slate/50">CO. NUMBER: </span>
                        {company.companyNumber}
                      </div>
                    )}
                    {company.registeredIn && (
                      <div>
                        <span className="text-alkota-slate/50">REGISTERED IN: </span>
                        {company.registeredIn}
                      </div>
                    )}
                    {company.registeredOffice && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-alkota-slate/40" />
                        <span>{company.registeredOffice}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-alkota-slate/40 italic">
                    {company.tradingName} · Legal entity registration pending.
                    Company particulars will be published prior to commercial trading.
                  </div>
                )}
                <div>
                  <span className="text-alkota-slate/50">WEBSITE: </span>
                  {company.websiteUrl}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] text-alkota-slate/40">
                Full legal notice at{" "}
                <Link href="/legal" className="underline hover:text-alkota-slate transition-colors">
                  alkotacycles.com/legal
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
