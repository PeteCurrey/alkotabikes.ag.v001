"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Building2,
  Wrench,
  FileText,
  BarChart3,
  Package,
  Users,
  Mail,
} from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

// ─── Partner Portal Sections (locked until production milestone) ───────────────

const PORTAL_SECTIONS = [
  {
    id: "specification",
    icon: FileText,
    label: "PRODUCT SPECIFICATION",
    desc: "Current controlled specification and development status by system.",
    available: false,
  },
  {
    id: "allocation",
    icon: Package,
    label: "ALLOCATION & INVENTORY",
    desc: "Regional stock allocation, lead times and delivery windows.",
    available: false,
  },
  {
    id: "customers",
    icon: Users,
    label: "CUSTOMER REGISTRATIONS",
    desc: "Development registrants in your region who listed a preferred partner.",
    available: false,
  },
  {
    id: "fit",
    icon: Wrench,
    label: "FIT & SETUP RESOURCES",
    desc: "Partner-level geometry documentation, fit protocol and setup notes.",
    available: false,
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "SALES & SERVICE RECORD",
    desc: "Transaction history, service records and warranty data for your region.",
    available: false,
  },
  {
    id: "comms",
    icon: Mail,
    label: "PARTNER COMMUNICATIONS",
    desc: "Programme updates, launch timelines and partner-only briefings.",
    available: false,
  },
];

// ─── Sign-in form ─────────────────────────────────────────────────────────────

function PartnerSignIn() {
  const [email, setEmail] = useState("");
  const [partnerRef, setPartnerRef] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && partnerRef) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-alkota-black border border-alkota-signal/30 p-8 space-y-4 text-center max-w-md mx-auto">
        <ShieldCheck className="w-8 h-8 text-alkota-signal mx-auto" />
        <div className="font-display font-bold text-xl uppercase text-white">
          ACCESS REQUEST NOTED.
        </div>
        <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed">
          The partner portal is not yet live. When your access is activated, you
          will receive an email with a secure sign-in link.
        </p>
        <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-wider">
          PARTNER REF: {partnerRef.toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-1.5">
        <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
          PARTNER REFERENCE
        </label>
        <input
          type="text"
          value={partnerRef}
          onChange={(e) => setPartnerRef(e.target.value)}
          className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors uppercase"
          placeholder="APN-XXXXXX"
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/40 focus:outline-none focus:border-alkota-signal transition-colors"
          placeholder="partner@yourshop.com"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider py-3.5 hover:bg-white transition-colors"
      >
        <Lock className="w-3.5 h-3.5" />
        REQUEST ACCESS
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnersClient() {
  return (
    <div className="w-full min-h-screen bg-alkota-carbon text-alkota-white pt-20 flex flex-col">
      {/* Header */}
      <div className="bg-alkota-black border-b border-white/10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <TechnicalAnnotation
            label="ALKOTA PARTNER NETWORK"
            value="PARTNER PORTAL"
            variant="signal"
          />
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.9]">
            PARTNER
            <br />
            <span className="text-alkota-signal">ACCESS.</span>
          </h1>
          <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed max-w-xl">
            Restricted to confirmed members of the Alkota Partner Network.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        {/* Development notice */}
        <div className="bg-alkota-black border border-white/10 p-6 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-alkota-signal flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-alkota-signal uppercase font-bold tracking-widest">
              PORTAL IN DEVELOPMENT
            </div>
            <p className="font-sans text-sm text-alkota-snow/80 font-light leading-relaxed">
              The Alkota Partner Portal is being built ahead of the production
              launch phase. If you have been accepted into the Partner Network,
              you will be notified when portal access is activated with a secure
              email link.
            </p>
            <p className="font-sans text-xs text-alkota-slate font-light">
              Full authentication uses passwordless email links for security.
              No passwords are stored.
            </p>
          </div>
        </div>

        {/* Sign-in section */}
        <div className="space-y-6">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-3 font-semibold">
            PARTNER SIGN IN
          </div>
          <PartnerSignIn />
        </div>

        {/* Portal sections preview */}
        <div className="space-y-6">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-3 font-semibold">
            WHAT THIS PORTAL WILL CONTAIN
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTAL_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="border border-white/5 bg-alkota-black/40 p-6 space-y-3 opacity-60"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="w-5 h-5 text-alkota-slate" />
                    <Lock className="w-3.5 h-3.5 text-alkota-slate/40" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest font-bold">
                      {section.label}
                    </div>
                    <p className="font-sans text-xs text-alkota-slate/80 font-light leading-relaxed">
                      {section.desc}
                    </p>
                  </div>
                  <div className="font-mono text-[9px] text-alkota-slate/50 uppercase">
                    AVAILABLE AT LAUNCH
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA — not a partner yet */}
        <div className="border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-alkota-signal" />
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                NOT YET A PARTNER?
              </span>
            </div>
            <div className="font-display font-bold text-xl uppercase text-white">
              APPLY TO THE NETWORK.
            </div>
            <p className="font-sans text-xs text-alkota-snow/60 font-light">
              Specialist technical retailers can apply for early conversations.
            </p>
          </div>
          <Link
            href="/dealers#apply"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex-shrink-0"
          >
            <span>APPLY NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
