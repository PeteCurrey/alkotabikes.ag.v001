import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ShieldCheck, FileText, Wrench, ArrowRight, UserCheck, HelpCircle } from "lucide-react";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Ownership & Support Hub",
  description:
    "The official Alkota Cycles ownership hub. Discover what ownership will include, access technical documentation, warranty policies, and service network plans ahead of 2028 delivery.",
  alternates: {
    canonical: `${siteUrl}/ownership`,
  },
  openGraph: {
    title: "Ownership & Support Hub",
    description:
      "The official Alkota Cycles ownership hub. Discover what ownership will include, access technical documentation, warranty policies, and service network plans ahead of 2028 delivery.",
    url: `${siteUrl}/ownership`,
  },
};

export default function OwnershipPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Ownership", path: "/ownership" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="w-full bg-[#0a0a0a] text-white min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 space-y-4">
            <TechnicalAnnotation label="OWNERSHIP PROGRAMME" value="PRE-PRODUCTION" variant="signal" />
            <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              OWNERSHIP &amp; SUPPORT HUB
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#9ab0c4] max-w-3xl font-light leading-relaxed">
              Every Alkota machine is engineered as a complete long-term ownership system. 
              Discover what ownership includes, review technical policies, and track customer support infrastructure ahead of 2028 production deliveries.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-white/10 bg-white/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-2.5 w-fit bg-alkota-signal/10 border border-alkota-signal text-alkota-signal">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">MY ALKOTA PORTAL</h2>
                <p className="font-sans text-xs text-[#9ab0c4] leading-relaxed">
                  Personal customer dashboard for tracking your allocation position, saved build configuration, fit metrics, and direct development updates.
                </p>
              </div>
              <Link
                href="/my-alkota"
                className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal hover:text-white font-bold uppercase transition-colors"
              >
                <span>ACCESS MY ALKOTA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 border border-white/10 bg-white/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-2.5 w-fit bg-alkota-signal/10 border border-alkota-signal text-alkota-signal">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">WARRANTY POLICY</h2>
                <p className="font-sans text-xs text-[#9ab0c4] leading-relaxed">
                  Review official structural chassis warranty coverage, crash replacement terms, and component supplier service commitments.
                </p>
              </div>
              <Link
                href="/warranty"
                className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal hover:text-white font-bold uppercase transition-colors"
              >
                <span>VIEW WARRANTY POLICY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 border border-white/10 bg-white/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-2.5 w-fit bg-alkota-signal/10 border border-alkota-signal text-alkota-signal">
                  <Wrench className="w-5 h-5" />
                </div>
                <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">PARTNER NETWORK</h2>
                <p className="font-sans text-xs text-[#9ab0c4] leading-relaxed">
                  Specialist retail and service partners undergoing programme authorization for chassis assembly, custom fit, and routine servicing.
                </p>
              </div>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal hover:text-white font-bold uppercase transition-colors"
              >
                <span>EXPLORE PARTNER NETWORK</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pre-Delivery Technical Notice */}
          <div className="p-8 border border-white/10 bg-[#131313] space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-alkota-signal" />
              <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                TECHNICAL MANUALS &amp; TORQUE SPECIFICATIONS
              </h3>
            </div>
            <p className="font-sans text-xs text-[#9ab0c4] leading-relaxed max-w-3xl">
              Complete chassis user guides, pivot bearing service schedules, and component torque matrices are actively maintained within our engineering database. 
              Official downloadable PDFs will be published ahead of first delivery. Confirmed reservation holders will be provided direct digital access.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
