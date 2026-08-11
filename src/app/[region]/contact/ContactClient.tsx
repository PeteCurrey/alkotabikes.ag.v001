"use client";

import React, { useState } from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, Check, Mail, MapPin, Shield } from "lucide-react";
import { getCompany } from "@/lib/company";
import { useRegion } from "@/components/region/RegionProvider";

import { captureLead } from "@/lib/leads/capture";
import type { LeadType } from "@/lib/leads/capture";

export default function ContactClient() {
  const { regionCode } = useRegion();
  const company = getCompany(regionCode);

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General Enquiry",
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hp, setHp] = useState("");
  const [renderTime, setRenderTime] = useState<number>(0);

  React.useEffect(() => {
    setRenderTime(Date.now());
  }, []);

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
      desc: "Data subject rights, GDPR / CCPA requests, and privacy enquiries.",
      email: company.email.privacy,
      fallback: "privacy@alkotacycles.com",
    },
    {
      label: "WARRANTY & SUPPORT",
      desc: "Technical claims, warranty questions, and component service.",
      email: company.email.warranty,
      fallback: "warranty@alkotacycles.com",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Block */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="COMMUNICATIONS" value={`CONTACT ENGINE / ${regionCode.toUpperCase()}`} variant="signal" />
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            TALK TO<br />
            <span className="text-alkota-signal">ENGINEERING.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-2xl font-light leading-relaxed">
            We operate a direct technical communication model. Whether you have a question about Project 01, want to discuss partner network plans, or need support, your enquiry reaches a team member directly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── LEFT: Contact Form ── */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-widest">
                DIRECT MESSAGE
              </span>
            </div>

            {submitted ? (
              <div className="p-8 bg-alkota-black border border-alkota-signal space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal font-bold uppercase tracking-wider">
                  <Check className="w-4 h-4" />
                  <span>MESSAGE TRANSMITTED</span>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  ENQUIRY RECEIVED
                </h3>
                <p className="font-sans text-xs text-alkota-slate leading-relaxed">
                  Thank you for contacting {company.tradingName}. A team representative will respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", category: "General Enquiry", message: "", consent: false });
                    setError("");
                  }}
                  className="font-mono text-xs text-alkota-signal underline hover:text-white uppercase font-bold"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!form.consent) {
                    setError("You must acknowledge the privacy notice to send a message.");
                    return;
                  }
                  setLoading(true);
                  setError("");

                  let leadType: LeadType = "general_contact";
                  if (form.category === "Partner Network") leadType = "dealer_enquiry";
                  else if (form.category === "Press & Media") leadType = "press";
                  else if (form.category === "Warranty & Support") leadType = "warranty";

                  const consentText = "I agree that Alkota Cycles may process my contact details to respond to this enquiry in accordance with the Privacy Policy.";

                  const res = await captureLead({
                    email: form.email,
                    full_name: form.name,
                    lead_type: leadType,
                    message: form.message,
                    marketing_consent: false, // Contact form is transactional enquiry
                    consent_text: consentText,
                    source_page: "/contact",
                    locale: regionCode === "us" ? "en-US" : "en-GB",
                    _hp: hp,
                    _t: renderTime,
                  });

                  setLoading(false);
                  if (res.success) {
                    setSubmitted(true);
                  } else {
                    setError(res.error || "Failed to submit enquiry. Please try again.");
                  }
                }}
                className="space-y-6 font-mono text-xs"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-alkota-slate uppercase tracking-wider block">
                    YOUR NAME *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="First and last name"
                    className="w-full bg-alkota-black border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-alkota-slate uppercase tracking-wider block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full bg-alkota-black border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-category" className="text-alkota-slate uppercase tracking-wider block">
                    ENQUIRY CATEGORY *
                  </label>
                  <select
                    id="contact-category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-alkota-black border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none"
                  >
                    <option value="General Enquiry">General Enquiry / Project 01</option>
                    <option value="Partner Network">Partner Network / Dealership</option>
                    <option value="Press & Media">Press &amp; Media</option>
                    <option value="Legal">Legal &amp; IP</option>
                    <option value="Privacy">Privacy / Data Rights</option>
                    <option value="Warranty & Support">Warranty & Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-alkota-slate uppercase tracking-wider block">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details about your enquiry..."
                    className="w-full bg-alkota-black border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50 resize-y"
                  />
                </div>

                <div className="p-4 bg-alkota-black border border-white/10 space-y-3 font-sans text-xs">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 accent-alkota-signal cursor-pointer"
                    />
                    <span className="text-alkota-slate leading-relaxed">
                      I agree that Alkota Cycles may process my contact details to respond to this enquiry in accordance with the{" "}
                      <Link href={`/${regionCode}/privacy`} className="underline text-white hover:text-alkota-signal">
                        Privacy Policy
                      </Link>
                      . *
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="text-red-400 font-mono text-xs pt-1">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !form.consent}
                  className="w-full py-4 bg-alkota-white text-alkota-black hover:bg-alkota-signal transition-colors font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {loading ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Contact Channels + Company Identity ── */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-widest">
                DIRECT ENDPOINTS
              </span>
            </div>

            <div className="space-y-4">
              {CONTACT_CHANNELS.map((ch) => (
                <div key={ch.label} className="p-4 bg-alkota-black border border-white/10 space-y-2">
                  <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {ch.label}
                  </div>
                  <p className="font-sans text-xs text-alkota-slate">{ch.desc}</p>
                  <div className="font-mono text-xs text-alkota-signal">
                    <a href={`mailto:${ch.email ?? ch.fallback}`} className="hover:underline flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{ch.email ?? ch.fallback}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Operator Particulars Panel */}
            <div className="p-5 bg-alkota-black border border-white/15 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-alkota-signal text-[10px] tracking-widest uppercase">
                <Shield className="w-3.5 h-3.5" />
                <span>OPERATOR IDENTITY ({regionCode.toUpperCase()})</span>
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
                    {"companyNumber" in company && company.companyNumber && (
                      <div>
                        <span className="text-alkota-slate/50">CO. NUMBER: </span>
                        {company.companyNumber}
                      </div>
                    )}
                    {"registeredIn" in company && company.registeredIn && (
                      <div>
                        <span className="text-alkota-slate/50">REGISTERED IN: </span>
                        {company.registeredIn}
                      </div>
                    )}
                    {"registeredOffice" in company && company.registeredOffice && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-alkota-slate/40" />
                        <span>{company.registeredOffice}</span>
                      </div>
                    )}
                    {"principalPlaceOfBusiness" in company && company.principalPlaceOfBusiness && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-alkota-slate/40" />
                        <span>{company.principalPlaceOfBusiness}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-alkota-slate/40 italic">
                    {company.tradingName} · Legal entity registration pending.
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
