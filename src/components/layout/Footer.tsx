"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { ArrowRight, Check } from "lucide-react";

import { useRegion } from "@/components/region/RegionProvider";
import { buildRegionalPath } from "@/lib/regions";
import RegionSwitcher from "@/components/region/RegionSwitcher";
import { company } from "@/lib/company";
import { openCookieSettings } from "@/components/legal/CookieConsentManager";

import { captureLead } from "@/lib/leads/capture";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hp, setHp] = useState("");
  const [renderTime, setRenderTime] = useState<number>(0);

  React.useEffect(() => {
    setRenderTime(Date.now());
  }, []);

  const { regionCode } = useRegion();
  const isUS = regionCode === "us";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const navGroups = [
    {
      title: "BIKES",
      links: [
        { label: "Project 01", href: "/bikes/project-01" },
        { label: "Configurator", href: "/configure" },
        { label: "How to Order", href: "/order" },
      ],
    },
    {
      title: "ENGINEERING",
      links: [
        { label: "Overview", href: "/engineering" },
        { label: "Chassis", href: "/engineering/chassis" },
        { label: "Kinematics", href: "/engineering/kinematics" },
        { label: "Materials", href: "/engineering/materials" },
        { label: "Testing", href: "/engineering/testing" },
      ],
    },
    {
      title: "STORE",
      links: [
        { label: "Alkota Supply", href: "/store" },
        { label: "Cart", href: "/cart" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "Road to 2028", href: "/road-to-2028" },
        { label: "Philosophy & Origin", href: "/about" },
        { label: "Mission & Values", href: "/mission" },
        { label: "Alkota Racing 2027", href: "/racing" },
        { label: "Work With Us", href: "/work-with-us" },
        { label: "Ambassadors", href: "/ambassadors" },
        { label: "Partner Network", href: "/partners" },
        { label: "Dealer Portal", href: "/partners/portal" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Engineering Glossary", href: "/glossary" },
        { label: "Safety & Intended Use", href: "/safety" },
        { label: "Development Journal", href: "/journal" },
      ],
    },
    {
      title: "OWNERSHIP",
      links: [
        { label: "My Alkota", href: "/my-alkota" },
        { label: "Ownership Portal", href: "/ownership" },
        { label: "Warranty Policy", href: "/warranty" },
        { label: "Complaints & Escalation", href: "/complaints" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Legal Centre", href: "/legal" },
        { label: "Terms of Service", href: "/terms" },
        { label: isUS ? "US Privacy Notice" : "Privacy Policy", href: "/privacy" },
        { label: isUS ? "Cookie Notice & Opt-Out" : "Cookie Policy", href: "/cookies" },
        { label: "Returns & Cancellation", href: "/returns" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Accessibility Statement", href: "/accessibility" },
        ...(isUS
          ? [
              {
                label: "Your Privacy Choices",
                href: "/cookies",
                isButton: true,
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <footer className="bg-alkota-carbon text-alkota-snow border-t border-white/10 tech-grid-dark pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header & Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="footer" />
            <p className="text-alkota-slate text-sm max-w-md leading-relaxed font-sans mt-4">
              ALKOTA exists to build high-performance mountain bicycles shaped by precision engineering, physical testing and an obsession with detail.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="font-mono text-xs text-alkota-signal tracking-widest uppercase">
              FIELD NOTES NEWSLETTER
            </div>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-alkota-white">
              Engineering, testing and stories from the trail.
            </h3>
            {subscribed ? (
              <div className="inline-flex items-center gap-2 p-3 bg-alkota-signal/10 border border-alkota-signal text-alkota-signal text-xs font-mono">
                <Check className="w-4 h-4" />
                <span>CONFIRMED. CHECK YOUR INBOX TO VERIFY YOUR SUBSCRIPTION.</span>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!consent) {
                    setError("Marketing consent is required to subscribe.");
                    return;
                  }
                  setLoading(true);
                  setError("");
                  const consentText = "I agree to receive Field Notes engineering updates and stories from Alkota Cycles.";
                  const res = await captureLead({
                    email,
                    lead_type: "newsletter",
                    marketing_consent: consent,
                    consent_text: consentText,
                    source_page: typeof window !== "undefined" ? window.location.pathname : "/footer",
                    _hp: hp,
                    _t: renderTime,
                  });
                  setLoading(false);
                  if (res.success) {
                    setSubscribed(true);
                    setEmail("");
                  } else {
                    setError(res.error || "Subscription failed. Please try again.");
                  }
                }}
                className="space-y-3 max-w-md"
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
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email Address for Field Notes Newsletter
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-alkota-black border border-white/20 text-alkota-white px-4 py-2.5 text-xs font-mono focus:border-alkota-signal focus:outline-none flex-1 placeholder:text-alkota-slate"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-alkota-white text-alkota-black hover:bg-alkota-signal transition-colors font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{loading ? "SUBSCRIBING..." : "SUBSCRIBE"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mandatory Unticked Marketing Consent Checkbox */}
                <div className="flex items-start gap-2 pt-1 text-[11px] font-sans text-alkota-slate">
                  <input
                    id="footer-newsletter-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 bg-black border-white/30 text-alkota-signal rounded-none cursor-pointer"
                  />
                  <label htmlFor="footer-newsletter-consent" className="cursor-pointer leading-tight">
                    I agree to receive Field Notes engineering updates and stories from Alkota Cycles. (Optional)
                  </label>
                </div>

                {error && (
                  <div className="text-red-400 font-mono text-[11px] pt-1">
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Navigation Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="font-mono text-xs tracking-widest text-alkota-slate uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2.5 font-sans text-xs">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {"isButton" in link && link.isButton ? (
                      <button
                        type="button"
                        onClick={openCookieSettings}
                        className="text-alkota-signal font-mono uppercase text-[11px] hover:underline"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={buildRegionalPath(link.href, regionCode)}
                        className="text-alkota-snow/80 hover:text-alkota-signal transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Technical Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col gap-3 font-mono text-[11px] text-alkota-slate">
          {/* Legal entity identity line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-center sm:text-left">
              {company.legalEntityName ? (
                <span>
                  {company.legalEntityName} trading as {company.tradingName}
                  {"companyNumber" in company && company.companyNumber ? (
                    <>
                      {" "}·{" "}Co. No. {company.companyNumber}
                    </>
                  ) : null}
                  {"registeredIn" in company && company.registeredIn ? (
                    <>
                      {" "}·{" "}Registered in {company.registeredIn}
                    </>
                  ) : null}
                </span>
              ) : (
                <span className="text-alkota-slate/50">
                  {company.tradingName} · LEGAL ENTITY REGISTRATION PENDING
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              {isUS && (
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-alkota-signal hover:underline text-[10px] uppercase font-bold"
                >
                  Your Privacy Choices
                </button>
              )}
              <RegionSwitcher variant="subnav" />
            </div>
          </div>
          {/* Copyright + system status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-alkota-slate/60">
            <div>
              © {new Date().getFullYear()} {company.legalEntityName ?? company.tradingName}. ALL RIGHTS RESERVED.
            </div>
            <div>
              SYSTEM STATUS: PROJECT / 01 DEVELOPMENT
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
