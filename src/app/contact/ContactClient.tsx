"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, Check } from "lucide-react";

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="COMMUNICATION CHANNEL" value="CONTACT" variant="signal" />
          <h1 className="font-display font-bold text-5xl sm:text-7xl uppercase tracking-tight text-white leading-[0.9]">
            DIRECT LINE TO<br />
            <span className="text-alkota-signal">ENGINEERING.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed max-w-2xl">
            Whether you have technical questions about Project 01 development, want to enquire about retail partnership, or need programme details, communicate directly with the team.
          </p>
        </div>

        {submitted ? (
          <div className="bg-alkota-black border border-alkota-signal p-8 space-y-4">
            <div className="flex items-center gap-3 text-alkota-signal">
              <Check className="w-6 h-6" />
              <span className="font-mono font-bold text-lg uppercase tracking-wider">
                COMMUNICATION RECEIVED
              </span>
            </div>
            <p className="font-sans text-sm text-alkota-snow font-light">
              Thank you for contacting ALKOTA. An engineering team representative will respond shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-alkota-black border border-white/10 p-8 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-xs text-alkota-slate uppercase block">FULL NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white placeholder-white/30 focus:border-alkota-signal focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-alkota-slate uppercase block">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white placeholder-white/30 focus:border-alkota-signal focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs text-alkota-slate uppercase block">ENQUIRY SUBJECT</label>
              <select className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white focus:border-alkota-signal focus:outline-none">
                <option value="technical">Project 01 Technical Enquiry</option>
                <option value="register">Development Register & Pre-Order</option>
                <option value="partner">Retail & Partner Network</option>
                <option value="press">Press & Media</option>
                <option value="other">General Enquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs text-alkota-slate uppercase block">MESSAGE *</label>
              <textarea
                required
                rows={5}
                placeholder="Write your technical or general enquiry..."
                className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 font-mono text-xs text-white placeholder-white/30 focus:border-alkota-signal focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <span>SEND COMMUNICATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
