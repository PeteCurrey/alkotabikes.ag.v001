import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteUrl } from "@/lib/env";
import ConfiguratorClient from "./ConfiguratorClient";
import { PROJECT_01_SPECIFICATION } from "@/content/project01/specification";

export const metadata: Metadata = {
  title: "Project 01 Digital Showroom & Configurator",
  description:
    "Configure your Project 01 build specification with Alkota Cycles. Explore finish options, component packages, and fit geometry for the R00 development baseline.",
  alternates: {
    canonical: `${siteUrl}/configure`,
  },
  openGraph: {
    title: "Project 01 Digital Showroom & Configurator",
    description:
      "Configure your Project 01 build specification with Alkota Cycles. Explore finish options, component packages, and fit geometry for the R00 development baseline.",
    url: `${siteUrl}/configure`,
  },
};

export default function ConfigurePage() {
  const spec = PROJECT_01_SPECIFICATION;

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen">
      {/* Server-Rendered Content Shell for SEO & Accessibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 border-b border-white/10 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/15 text-alkota-signal font-mono text-[10px] tracking-wider uppercase">
            <span>R00 DEVELOPMENT BASELINE</span>
            <span className="text-white/40">•</span>
            <span>PRE-PRODUCTION</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none">
            PROJECT 01 DIGITAL SHOWROOM &amp; CONFIGURATOR
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#9ab0c4] max-w-3xl leading-relaxed">
            Configure your intended Project 01 specification. Every machine is engineered around a unified, 
            full-carbon chassis platform with 160mm front and 150mm rear travel targets. Select finish profiles, 
            explore integrated system components, and calculate your chassis fit prior to planned 2028 production.
          </p>
        </div>

        {/* Static R00 Baseline Specification Table */}
        <div className="space-y-3">
          <h2 className="font-mono text-xs text-white/70 uppercase tracking-widest border-b border-white/10 pb-2">
            R00 PLATFORM SPECIFICATION BASELINE
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase">
                  <th className="py-2 pr-4 font-normal">PARAMETER</th>
                  <th className="py-2 px-4 font-normal">SPECIFICATION VALUE</th>
                  <th className="py-2 px-4 font-normal">STATUS</th>
                  <th className="py-2 pl-4 font-normal">ENGINEERING NOTES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-2.5 pr-4 text-white font-semibold">Front Travel</td>
                  <td className="py-2.5 px-4 text-alkota-signal">{spec.frontTravel.value}</td>
                  <td className="py-2.5 px-4 text-white/60">{spec.frontTravel.statusText}</td>
                  <td className="py-2.5 pl-4 text-white/50 text-[11px]">{spec.frontTravel.notes}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-white font-semibold">Rear Travel</td>
                  <td className="py-2.5 px-4 text-alkota-signal">{spec.rearTravel.value}</td>
                  <td className="py-2.5 px-4 text-white/60">{spec.rearTravel.statusText}</td>
                  <td className="py-2.5 pl-4 text-white/50 text-[11px]">{spec.rearTravel.notes}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-white font-semibold">Primary Wheel Format</td>
                  <td className="py-2.5 px-4 text-alkota-signal">{spec.primaryWheelFormat.value}</td>
                  <td className="py-2.5 px-4 text-white/60">{spec.primaryWheelFormat.statusText}</td>
                  <td className="py-2.5 pl-4 text-white/50 text-[11px]">{spec.primaryWheelFormat.notes}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-white font-semibold">Chassis Construction</td>
                  <td className="py-2.5 px-4 text-alkota-signal">{spec.frameMaterialIntent.value}</td>
                  <td className="py-2.5 px-4 text-white/60">{spec.frameMaterialIntent.statusText}</td>
                  <td className="py-2.5 pl-4 text-white/50 text-[11px]">{spec.frameMaterialIntent.notes}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-white font-semibold">Kinematics Architecture</td>
                  <td className="py-2.5 px-4 text-alkota-signal">{spec.suspensionArchitecture.value}</td>
                  <td className="py-2.5 px-4 text-white/60">{spec.suspensionArchitecture.statusText}</td>
                  <td className="py-2.5 pl-4 text-white/50 text-[11px]">{spec.suspensionArchitecture.notes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Finish Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="relative aspect-[16/9] w-full bg-black/60 overflow-hidden border border-white/10">
              <Image
                src="/images/project01-glacier-white-hero.jpg"
                alt="Project 01 Glacier White Finish"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white uppercase">FINISH PROFILE 01 — GLACIER WHITE</div>
              <p className="font-sans text-xs text-[#9ab0c4] mt-1">
                Pure alpine satin white coat with raw matte carbon fiber accents on stress-loaded structural nodes.
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="relative aspect-[16/9] w-full bg-black/60 overflow-hidden border border-white/10">
              <Image
                src="/images/project01-naked-carbon-hero.jpg"
                alt="Project 01 Naked Carbon Finish"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white uppercase">FINISH PROFILE 02 — NAKED CARBON</div>
              <p className="font-sans text-xs text-[#9ab0c4] mt-1">
                Exposed UD carbon fiber layup under clear protective armor coating. Zero added cosmetic paint weight.
              </p>
            </div>
          </div>
        </div>

        {/* NoScript Fallback Block */}
        <noscript>
          <div className="mt-8 p-6 bg-red-950/40 border border-red-500/30 space-y-4">
            <h3 className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">
              JAVASCRIPT REQUIRED FOR INTERACTIVE BUILDER
            </h3>
            <p className="font-sans text-xs text-white/80 leading-relaxed">
              You are viewing the static R00 platform specification shell. To interactively customize finish profiles, 
              explore 3D component systems, and save your fit parameters, please enable JavaScript in your browser.
            </p>
            <div>
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-4 py-2 bg-alkota-signal text-black font-mono text-xs font-bold uppercase"
              >
                <span>PROCEED TO PROJECT 01 REGISTRATION</span>
              </Link>
            </div>
          </div>
        </noscript>
      </section>

      {/* Interactive Configurator Layer */}
      <ConfiguratorClient />
    </main>
  );
}
