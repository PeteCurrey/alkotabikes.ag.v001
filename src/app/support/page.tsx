import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, BookOpen, ShieldCheck, Wrench, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Support | Alkota Cycles",
  description:
    "Technical support and documentation hub by Alkota Cycles. Access user manuals, torque specifications, warranty policies, and service resources.",
  alternates: {
    canonical: `${siteUrl}/support`,
  },
  openGraph: {
    title: "Technical Support | Alkota Cycles",
    description:
      "Technical support and documentation hub by Alkota Cycles. Access user manuals, torque specifications, warranty policies, and service resources.",
    url: `${siteUrl}/support`,
  },
};

export default function SupportHubPage() {
  const sections = [
    {
      title: "DEVELOPMENT DOCUMENTATION",
      status: "COMING DURING PROGRAMME",
      desc: "Pre-production chassis setup notes, torque specifications, and structural baseline documentation.",
      icon: BookOpen,
    },
    {
      title: "TECHNICAL GUIDES",
      status: "PRE-PRODUCTION",
      desc: "Kinematics tuning parameters, cable routing guides, and pivot bearing maintenance procedures under development.",
      icon: Wrench,
    },
    {
      title: "WARRANTY POLICY",
      status: "PUBLISHED BEFORE PRODUCTION ORDERS",
      desc: "Chassis coverage and crash replacement terms will be published prior to formal production reservations.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16 min-h-screen tech-grid-dark">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="SUPPORT PORTAL" value="PRE-PRODUCTION DOCUMENTATION" variant="signal" />
          <h1 className="font-display font-bold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            PROJECT SUPPORT.
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-2xl font-light leading-relaxed">
            As Project 01 progresses toward production, setup guidance, technical documentation, service information and ownership resources will be published here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="p-8 bg-alkota-black border border-white/10 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Icon className="w-8 h-8 text-alkota-signal" />
                    <Lock className="w-4 h-4 text-alkota-slate" />
                  </div>
                  
                  <span className="font-mono text-[9px] text-alkota-signal border border-alkota-signal/40 px-2 py-0.5 uppercase tracking-widest font-bold block w-fit">
                    {sec.status}
                  </span>

                  <h2 className="font-display text-xl font-bold text-alkota-white uppercase tracking-tight">
                    {sec.title}
                  </h2>

                  <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                  <span>PRE-PRODUCTION STATUS</span>
                  <span className="text-alkota-signal uppercase font-bold">PLANNED 2028</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Development Register Callout */}
        <div className="bg-alkota-black border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
              FOLLOW DEVELOPMENT
            </span>
            <h3 className="font-display font-semibold text-xl text-white uppercase tracking-tight">
              LOOKING FOR PROJECT 01 SPECIFICATIONS?
            </h3>
            <p className="font-sans text-xs text-alkota-slate font-light">
              Read the engineering journal, follow the road to 2028, or join the register.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/journal/project-01"
              className="px-5 py-3 border border-white/20 text-alkota-snow font-mono font-bold text-[10px] tracking-wider uppercase hover:border-alkota-signal hover:text-alkota-signal transition-all flex items-center gap-2"
            >
              <span>DEVELOPMENT JOURNAL</span>
            </Link>
            <Link
              href="/road-to-2028"
              className="px-5 py-3 border border-white/20 text-alkota-snow font-mono font-bold text-[10px] tracking-wider uppercase hover:border-alkota-signal hover:text-alkota-signal transition-all flex items-center gap-2"
            >
              <span>ROAD TO 2028</span>
            </Link>
            <Link
              href="/order"
              className="px-6 py-3.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all flex items-center gap-2 flex-shrink-0"
            >
              <span>JOIN PROJECT 01 REGISTER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
