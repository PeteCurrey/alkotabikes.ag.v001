"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import { Project01Component } from "@/content/project01/components";
import { X, ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ComponentTheatreProps {
  component: Project01Component;
  onClose: () => void;
}

export default function ComponentTheatre({
  component,
  onClose,
}: ComponentTheatreProps) {
  const hasOfficialAsset = component.officialImage && component.assetStatus === "AVAILABLE";

  return (
    <div className="fixed inset-0 z-50 bg-alkota-carbon/95 backdrop-blur-xl text-alkota-white overflow-y-auto p-4 sm:p-6 lg:p-12 animate-fadeIn tech-grid-dark">
      <div className="max-w-6xl mx-auto space-y-8 min-h-[90vh] flex flex-col justify-between">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-alkota-signal" />
            <span>RETURN TO SYSTEM EXPLORER</span>
          </button>

          <div className="flex items-center gap-3">
            <TechnicalAnnotation label="COMPONENT THEATRE" value={component.category} variant="signal" />
            <button
              onClick={onClose}
              className="p-2 text-alkota-slate hover:text-white border border-white/10 hover:border-white/40 transition-all"
              aria-label="Close component theatre"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
          {/* Left Column: Official Component Asset Stage */}
          <div className="lg:col-span-6 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
              <span className="text-alkota-signal font-bold uppercase">{component.manufacturer}</span>
              <SpecificationStatus status={component.status} />
            </div>

            {/* Asset Display */}
            <div className="relative w-full h-[320px] sm:h-[400px] bg-black/60 border border-white/10 flex items-center justify-center p-6 overflow-hidden">
              {hasOfficialAsset ? (
                <Image
                  src={component.officialImage!}
                  alt={`${component.manufacturer} ${component.product}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain object-center p-4 hover:scale-105 transition-transform duration-500"
                />
              ) : (
                /* Intentional Placeholder per rule: Never generate fake AI images of real components */
                <div className="text-center space-y-3 p-6 font-mono text-xs text-alkota-slate">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto text-alkota-signal">
                    !
                  </div>
                  <div className="text-alkota-white font-bold uppercase tracking-wider text-sm">
                    COMPONENT ASSET PENDING
                  </div>
                  <p className="text-[11px] max-w-xs mx-auto text-alkota-slate">
                    Official manufacturer photography for {component.manufacturer} {component.product} requested. Placeholder shown per real-component policy.
                  </p>
                </div>
              )}
            </div>

            {/* Component Title & Variant */}
            <div className="space-y-1">
              <h2 className="font-display font-medium text-3xl uppercase text-white tracking-tight">
                {component.manufacturer} <span className="text-alkota-signal">{component.product}</span>
              </h2>
              <p className="font-mono text-xs text-alkota-slate uppercase">
                {component.variant}
              </p>
            </div>

            {/* Technical Specifications List */}
            {component.technicalData.length > 0 && (
              <div className="space-y-2 font-mono text-xs pt-4 border-t border-white/10">
                <span className="text-[10px] text-alkota-signal uppercase tracking-widest block font-bold">
                  MANUFACTURER TECHNICAL DATA
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {component.technicalData.map((td, idx) => (
                    <div key={idx} className="bg-alkota-carbon p-2.5 border border-white/10">
                      <span className="text-alkota-slate text-[9px] block uppercase">{td.label}</span>
                      <span className="text-white font-bold">{td.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Deep Rationale & Integration Story */}
          <div className="lg:col-span-6 space-y-6 font-sans">
            {/* Why This Component */}
            <div className="bg-alkota-black border border-white/10 p-6 space-y-2">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
                WHY THIS COMPONENT
              </span>
              <p className="text-alkota-snow/90 text-sm font-light leading-relaxed">
                {component.whySelected}
              </p>
            </div>

            {/* What It Changes */}
            <div className="bg-alkota-black border border-white/10 p-6 space-y-2">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
                WHAT IT CHANGES
              </span>
              <p className="text-alkota-snow/90 text-sm font-light leading-relaxed">
                {component.description}
              </p>
            </div>

            {/* Project 01 Integration */}
            <div className="bg-alkota-black border border-white/10 p-6 space-y-3 font-mono text-xs">
              <span className="text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
                PROJECT 01 INTEGRATION & COMPATIBILITY
              </span>
              <ul className="space-y-1 text-alkota-snow/80 list-disc list-inside font-light">
                {component.compatibility.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Development Status Notes */}
            <div className="bg-alkota-black border border-white/10 p-6 space-y-3 font-mono text-xs">
              <span className="text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
                DEVELOPMENT PROGRAMME NOTES
              </span>
              <ul className="space-y-1.5 text-alkota-slate font-light">
                {component.developmentNotes.map((dn, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-alkota-signal">•</span>
                    <span>{dn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* External Manufacturer Link */}
            {component.sourceUrl && (
              <a
                href={component.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-white uppercase transition-colors pt-2"
              >
                <span>OFFICIAL MANUFACTURER PRODUCT PAGE</span>
                <ExternalLink className="w-3.5 h-3.5 text-alkota-signal" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6 font-mono text-xs">
          <span className="text-alkota-slate text-[10px] uppercase">
            REAL COMPONENT POLICY · NO ARTIFICIAL GENERATIONS USED
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors"
          >
            CLOSE THEATRE
          </button>
        </div>
      </div>
    </div>
  );
}
