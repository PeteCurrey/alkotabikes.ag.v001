"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
        { label: "Platform Overview", href: "/bikes" },
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
        { label: "Partner Network", href: "/dealers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Engineering Glossary", href: "/glossary" },
        { label: "Safety & Intended Use", href: "/safety" },
        { label: "Project 01 Journal", href: "/journal/project-01" },
        { label: "Field Notes Journal", href: "/journal" },
      ],
    },
    {
      title: "OWNERSHIP",
      links: [
        { label: "My Alkota", href: "/my-alkota" },
        { label: "Support Portal", href: "/support" },
        { label: "Owner Documentation", href: "/support/owners" },
        { label: "Technical Guides", href: "/support/technical" },
        { label: "Warranty Policy", href: "/warranty" },
        { label: "Complaints & Escalation", href: "/complaints" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Legal Centre", href: "/legal" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Returns & Cancellation", href: "/returns" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Accessibility Statement", href: "/accessibility" },
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
                <span>CONFIRMED. YOU ARE SUBSCRIBED TO FIELD NOTES.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
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
                  className="px-6 py-2.5 bg-alkota-white text-alkota-black hover:bg-alkota-signal transition-colors font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="font-mono text-xs tracking-widest text-alkota-slate uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2.5 font-sans text-xs">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-alkota-snow/80 hover:text-alkota-signal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Technical Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-alkota-slate">
          <div>
            © {new Date().getFullYear()} ALKOTA PERFORMANCE ENGINEERING. ALL RIGHTS RESERVED.
          </div>

          <div className="text-[10px] text-alkota-slate/60">
            SYSTEM STATUS: PROJECT / 01 DEVELOPMENT
          </div>
        </div>
      </div>
    </footer>
  );
}
