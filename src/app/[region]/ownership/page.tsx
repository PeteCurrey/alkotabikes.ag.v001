import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import Link from "next/link";
import { getCompany } from "@/lib/company";
import { buildRegionalPath } from "@/lib/regions";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ShieldCheck, FileText, Wrench, ArrowRight, UserCheck } from "lucide-react";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/ownership",
    title: "Ownership",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function OwnershipPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const company = getCompany(regionCode);

  const breadcrumbs = [
    { name: "Home", path: `/${regionCode}` },
    { name: "Ownership", path: `/${regionCode}/ownership` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="w-full bg-[#0a0a0a] text-white min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 space-y-4">
            <TechnicalAnnotation label="OWNERSHIP PROGRAMME" value={regionCode.toUpperCase()} variant="signal" />
            <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              OWNERSHIP &amp; SUPPORT HUB ({regionCode.toUpperCase()})
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#9ab0c4] max-w-3xl font-light leading-relaxed">
              Every Alkota machine is engineered as a complete long-term ownership system.
              Support, warrantor identity, and technical service infrastructure are managed by <strong>{company.legalEntityName ?? company.tradingName}</strong>.
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
                href={buildRegionalPath("/my-alkota", regionCode)}
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
                <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">REGIONAL WARRANTY POLICY</h2>
                <p className="font-sans text-xs text-[#9ab0c4] leading-relaxed">
                  Review structural chassis warranty coverage, crash replacement terms, and supplier service commitments for the {regionCode.toUpperCase()} market.
                </p>
              </div>
              <Link
                href={buildRegionalPath("/warranty", regionCode)}
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
                href={buildRegionalPath("/partners", regionCode)}
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
                TECHNICAL MANUALS &amp; SERVICE SUPPORT
              </h3>
            </div>
            <p className="font-sans text-xs text-[#9ab0c4] leading-relaxed max-w-3xl">
              Complete chassis user guides, pivot bearing service schedules, and component torque matrices are actively maintained within our engineering database.
              Contact customer support at <a href={`mailto:${company.email.customerService}`} className="underline font-mono text-white">{company.email.customerService}</a>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
