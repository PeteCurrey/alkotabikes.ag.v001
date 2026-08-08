"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <TechnicalAnnotation label="DIRECT CONTACT" value="ENGINEERING INQUIRIES" variant="signal" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            CONNECT WITH<br />
            <span className="text-alkota-slate">ENGINEERING.</span>
          </h1>
          <p className="font-sans text-base text-alkota-snow font-light leading-relaxed">
            For technical inquiries, OEM partner communications, or field demo inquiries.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-alkota-black border border-alkota-signal text-alkota-signal font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold uppercase text-sm">
              <Check className="w-5 h-5" />
              <span>INQUIRY TRANSMITTED</span>
            </div>
            <p className="text-alkota-snow">Your message has been received by ALKOTA Performance Engineering. We will review and respond.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-alkota-slate uppercase">FULL NAME *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-alkota-black border border-white/20 p-3 text-alkota-white focus:border-alkota-signal focus:outline-none"
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-alkota-slate uppercase">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  className="w-full bg-alkota-black border border-white/20 p-3 text-alkota-white focus:border-alkota-signal focus:outline-none"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-alkota-slate uppercase">INQUIRY CATEGORY</label>
              <select className="w-full bg-alkota-black border border-white/20 p-3 text-alkota-white focus:border-alkota-signal focus:outline-none">
                <option>PROJECT 01 TECHNICAL INQUIRY</option>
                <option>PERFORMANCE CENTER & DEALER PARTNERSHIP</option>
                <option>MEDIA & ENGINEERING DISPATCHES</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-alkota-slate uppercase">MESSAGE *</label>
              <textarea
                rows={5}
                required
                className="w-full bg-alkota-black border border-white/20 p-3 text-alkota-white focus:border-alkota-signal focus:outline-none"
                placeholder="Write message..."
              />
            </div>

            <button
              type="submit"
              className="px-8 py-4 bg-alkota-signal text-alkota-black hover:bg-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <span>SUBMIT INQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
