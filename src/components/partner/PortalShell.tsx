"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { RegionCode } from "@/lib/regions";
import {
  PARTNER_TERMS_BY_REGION,
  PARTNER_TERMS_CHANGELOG,
  type PartnerTier,
} from "@/config/partnerTerms";
import CatchmentMap from "./CatchmentMap";
import {
  Award,
  Bike,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  HelpCircle,
  Inbox,
  Layers,
  LayoutDashboard,
  ShieldAlert,
  ShoppingBag,
  User,
  Wrench,
} from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function PortalShell({ regionCode }: { regionCode: RegionCode }) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "terms" | "demo" | "leads" | "orders" | "warranty" | "resources" | "certification" | "downloads"
  >("dashboard");

  // Regional Terms single source of truth
  const regionalTerms = PARTNER_TERMS_BY_REGION[regionCode];
  const tier: PartnerTier = "CERTIFIED";
  const activeTerms = regionalTerms ? regionalTerms[tier] : null;

  // Initial partner context profile
  const partnerProfile = {
    businessName: "Apex Performance Cycles",
    partnerRef: "APN-001042",
    tierLabel: activeTerms?.label ?? "Certified Partner",
    catchmentRadiusMiles: activeTerms?.catchmentRadiusMiles ?? 40,
    latitude: 51.4545, // Bristol centroid
    longitude: -2.5879,
    namedContact: {
      name: "Marcus Thorne",
      role: "Lead Commercial Engineer (UK)",
      email: "m.thorne@alkotacycles.com",
    },
    agreementStatus: "RECRUITMENT_SHORTLIST",
    certificationStatus: "PENDING_PDI_TRAINING",
    certificationExpiry: "2027-08-31",
  };

  const TABS = [
    { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard },
    { id: "terms", label: "COMMERCIAL TERMS", icon: FileText },
    { id: "demo", label: "DEMO FLEET", icon: Bike },
    { id: "leads", label: "LEADS", icon: Inbox },
    { id: "orders", label: "ORDERS", icon: ShoppingBag },
    { id: "warranty", label: "WARRANTY", icon: Wrench },
    { id: "resources", label: "RESOURCES", icon: BookOpen },
    { id: "certification", label: "CERTIFICATION", icon: Award },
    { id: "downloads", label: "DOWNLOADS", icon: Download },
  ] as const;

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <TechnicalAnnotation label="PARTNER PORTAL" value={partnerProfile.partnerRef} variant="signal" />
            <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
              {partnerProfile.businessName}
            </h1>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 bg-alkota-signal/10 border border-alkota-signal/40 text-alkota-signal uppercase font-bold">
              {partnerProfile.tierLabel} ({regionCode.toUpperCase()})
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 text-alkota-slate uppercase">
              STATUS: {partnerProfile.agreementStatus}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-white/15 pb-2 scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 font-mono text-xs uppercase font-bold flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? "border-alkota-signal text-alkota-signal bg-white/5"
                    : "border-transparent text-alkota-slate hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT AREA ── */}
        <div className="space-y-8">
          {/* A) DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                {/* Tier & Radius */}
                <div className="p-5 bg-alkota-black border border-white/15 space-y-3">
                  <div className="text-alkota-slate uppercase text-[10px] tracking-wider">ASSIGNED TIER &amp; CATCHMENT</div>
                  <div className="text-xl font-bold text-white">{partnerProfile.tierLabel}</div>
                  <div className="text-alkota-signal">
                    Catchment Radius: {partnerProfile.catchmentRadiusMiles} miles
                  </div>
                </div>

                {/* Alkota Contact */}
                <div className="p-5 bg-alkota-black border border-white/15 space-y-3">
                  <div className="text-alkota-slate uppercase text-[10px] tracking-wider">NAMED ALKOTA CONTACT</div>
                  <div className="text-white font-bold">{partnerProfile.namedContact.name}</div>
                  <div className="text-alkota-slate">{partnerProfile.namedContact.role}</div>
                  <a href={`mailto:${partnerProfile.namedContact.email}`} className="text-alkota-signal hover:underline block pt-1">
                    {partnerProfile.namedContact.email}
                  </a>
                </div>

                {/* Certification Expiry */}
                <div className="p-5 bg-alkota-black border border-white/15 space-y-3">
                  <div className="text-alkota-slate uppercase text-[10px] tracking-wider">CERTIFICATION STATUS</div>
                  <div className="text-amber-400 font-bold">{partnerProfile.certificationStatus}</div>
                  <div className="text-alkota-slate">
                    Recertification Due: {partnerProfile.certificationExpiry}
                  </div>
                </div>
              </div>

              {/* Catchment Map */}
              <div className="space-y-3">
                <div className="font-mono text-xs text-alkota-signal font-bold uppercase tracking-wider">
                  ASSIGNED CATCHMENT MAP
                </div>
                <CatchmentMap
                  latitude={partnerProfile.latitude}
                  longitude={partnerProfile.longitude}
                  radiusMiles={partnerProfile.catchmentRadiusMiles}
                  businessName={partnerProfile.businessName}
                />
              </div>
            </div>
          )}

          {/* B) COMMERCIAL TERMS */}
          {activeTab === "terms" && (
            <div className="space-y-6">
              {activeTerms?.status === "DRAFT" && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3 font-mono text-xs">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-amber-400 uppercase">INDICATIVE NON-CONTRACTUAL TERMS</div>
                    <p className="font-sans text-xs text-amber-200/80 font-light leading-relaxed">
                      These commercial rates derive from {regionCode.toUpperCase()} development draft specifications. They are non-binding until formal execution of an agency agreement.
                    </p>
                  </div>
                </div>
              )}

              {activeTerms ? (
                <div className="bg-alkota-black border border-white/15 p-6 space-y-6 font-mono text-xs">
                  <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl uppercase text-white">
                      COMMERCIAL SCHEDULE — {activeTerms.label} ({regionCode.toUpperCase()})
                    </h3>
                    <span className="px-2.5 py-1 bg-white/10 text-alkota-slate text-[10px] uppercase">
                      STATUS: {activeTerms.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <div className="text-alkota-slate text-[10px] uppercase">AGENCY COMMISSION</div>
                      <div className="text-2xl font-bold text-alkota-signal">{activeTerms.commissionPercent}%</div>
                      <div className="text-[10px] text-alkota-slate">Applied to ex-VAT RRP</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-alkota-slate text-[10px] uppercase">FIT / BUILD / HANDOVER FEE</div>
                      <div className="text-2xl font-bold text-white">
                        £{(activeTerms.fitBuildHandoverFeeMinor / 100).toFixed(2)}
                      </div>
                      <div className="text-[10px] text-alkota-slate">Per unit delivered</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-alkota-slate text-[10px] uppercase">FIRST SERVICE REIMBURSEMENT</div>
                      <div className="text-2xl font-bold text-white">
                        £{(activeTerms.firstServiceReimbursementMinor / 100).toFixed(2)}
                      </div>
                      <div className="text-[10px] text-alkota-slate">Reimbursed on completion</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-alkota-slate text-[10px] uppercase">WORKSHOP PARTS MARGIN</div>
                      <div className="text-2xl font-bold text-white">{activeTerms.partsMarginPercent}%</div>
                      <div className="text-[10px] text-alkota-slate">On spare parts &amp; upgrades</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-alkota-slate text-[10px] uppercase">WARRANTY LABOUR RATE</div>
                      <div className="text-2xl font-bold text-white">
                        £{(activeTerms.warrantyLabourRateMinor / 100).toFixed(2)} / hr
                      </div>
                      <div className="text-[10px] text-alkota-slate">Reimbursed hourly rate</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-alkota-slate text-[10px] uppercase">DEFAULT CATCHMENT RADIUS</div>
                      <div className="text-2xl font-bold text-white">{activeTerms.catchmentRadiusMiles} miles</div>
                      <div className="text-[10px] text-alkota-slate">Exclusive territory ring</div>
                    </div>
                  </div>

                  {/* Version History Table */}
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <div className="text-alkota-slate uppercase text-[10px] font-bold">TERMS VERSION HISTORY</div>
                    <div className="border border-white/10 divide-y divide-white/10">
                      {PARTNER_TERMS_CHANGELOG.map((v) => (
                        <div key={v.version} className="p-3 grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                          <div className="font-bold text-white">v{v.version} ({v.status})</div>
                          <div className="text-alkota-slate">{new Date(v.date).toLocaleDateString("en-GB")}</div>
                          <div className="md:col-span-2 text-alkota-snow/80">
                            {v.changes.join(" ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-alkota-black border border-white/10 text-center font-mono text-xs text-alkota-slate">
                  Commercial terms for region '{regionCode}' are currently unpublished.
                </div>
              )}
            </div>
          )}

          {/* C) DEMO FLEET */}
          {activeTab === "demo" && (
            <div className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-alkota-black border border-white/15 space-y-2">
                  <div className="text-alkota-slate text-[10px] uppercase">DEMO MACHINES ASSIGNED</div>
                  <div className="text-3xl font-bold text-white">0</div>
                  <div className="text-[11px] text-alkota-slate">Awaiting production allocation</div>
                </div>

                <div className="p-5 bg-alkota-black border border-white/15 space-y-2">
                  <div className="text-alkota-slate text-[10px] uppercase">DEMO-TO-ORDER CONVERSION</div>
                  <div className="text-3xl font-bold text-alkota-signal">N/A</div>
                  <div className="text-[11px] text-alkota-slate">Key performance metric</div>
                </div>

                <div className="p-5 bg-alkota-black border border-white/15 space-y-2">
                  <div className="text-alkota-slate text-[10px] uppercase">NEXT FLEET ROTATION</div>
                  <div className="text-xl font-bold text-white">TBC 2028</div>
                  <div className="text-[11px] text-alkota-slate">Pre-production cycle</div>
                </div>
              </div>

              {/* Explicit Empty State */}
              <div className="p-12 bg-alkota-black border border-dashed border-white/20 text-center space-y-3">
                <Bike className="w-10 h-10 text-alkota-slate/50 mx-auto" />
                <div className="text-white font-bold uppercase text-sm">NO DEMO BIKES CURRENTLY ASSIGNED</div>
                <p className="font-sans text-xs text-alkota-slate max-w-md mx-auto font-light leading-relaxed">
                  Assigned development demo machines, active loan agreements, rotation schedules, and customer demo ride logs will appear here once partner fleet allocations open prior to 2028 launch.
                </p>
              </div>
            </div>
          )}

          {/* D) LEADS */}
          {activeTab === "leads" && (
            <div className="p-12 bg-alkota-black border border-dashed border-white/20 text-center space-y-3 font-mono text-xs">
              <Inbox className="w-10 h-10 text-alkota-slate/50 mx-auto" />
              <div className="text-white font-bold uppercase text-sm">NO ACTIVE CATCHMENT LEADS</div>
              <p className="font-sans text-xs text-alkota-slate max-w-md mx-auto font-light leading-relaxed">
                Rider enquiries and test-ride requests originating within your {partnerProfile.catchmentRadiusMiles}-mile catchment radius will be automatically routed here for follow-up and appointment booking.
              </p>
            </div>
          )}

          {/* E) ORDERS */}
          {activeTab === "orders" && (
            <div className="p-12 bg-alkota-black border border-dashed border-white/20 text-center space-y-3 font-mono text-xs">
              <ShoppingBag className="w-10 h-10 text-alkota-slate/50 mx-auto" />
              <div className="text-white font-bold uppercase text-sm">NO ACTIVE PARTNER ORDERS IN PIPELINE</div>
              <p className="font-sans text-xs text-alkota-slate max-w-md mx-auto font-light leading-relaxed">
                Customer builds in progress assigned to your shop for fit, PDI build, and handover will render here with real-time pipeline status tracking.
              </p>
            </div>
          )}

          {/* F) WARRANTY */}
          {activeTab === "warranty" && (
            <div className="space-y-6 font-mono text-xs">
              <div className="p-5 bg-alkota-black border border-white/15 space-y-3">
                <div className="text-alkota-signal font-bold uppercase text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>PUBLISHED WARRANTY SERVICE LEVEL AGREEMENT (SLA)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <div className="text-[10px] text-alkota-slate uppercase">CLAIM EVALUATION</div>
                    <div className="text-white font-bold">Within 24 Hours</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-alkota-slate uppercase">REPLACEMENT PARTS SHIPMENT</div>
                    <div className="text-white font-bold">24-48 Hours Express</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-alkota-slate uppercase">LABOUR REIMBURSEMENT RATE</div>
                    <div className="text-alkota-signal font-bold">
                      £{((activeTerms?.warrantyLabourRateMinor ?? 8500) / 100).toFixed(2)} / hour
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 bg-alkota-black border border-dashed border-white/20 text-center space-y-3">
                <Wrench className="w-10 h-10 text-alkota-slate/50 mx-auto" />
                <div className="text-white font-bold uppercase text-sm">NO WARRANTY CLAIMS FILED</div>
                <p className="font-sans text-xs text-alkota-slate max-w-md mx-auto font-light leading-relaxed">
                  Warranty claim submission tools, replacement part tracking, and labour reimbursement logs will be accessible here once Project 01 bikes enter customer ownership.
                </p>
              </div>
            </div>
          )}

          {/* G) RESOURCES */}
          {activeTab === "resources" && (
            <div className="p-12 bg-alkota-black border border-dashed border-white/20 text-center space-y-3 font-mono text-xs">
              <BookOpen className="w-10 h-10 text-alkota-slate/50 mx-auto" />
              <div className="text-white font-bold uppercase text-sm">TECHNICAL RESOURCES &amp; BULLETINS</div>
              <p className="font-sans text-xs text-alkota-slate max-w-md mx-auto font-light leading-relaxed">
                Controlled engineering drawings, torque specifications, suspension setup guides, marketing assets, and brand imagery guidelines will be published here.
              </p>
            </div>
          )}

          {/* H) CERTIFICATION */}
          {activeTab === "certification" && (
            <div className="p-12 bg-alkota-black border border-dashed border-white/20 text-center space-y-3 font-mono text-xs">
              <Award className="w-10 h-10 text-alkota-slate/50 mx-auto" />
              <div className="text-white font-bold uppercase text-sm">TECHNICAL CERTIFICATION MODULES</div>
              <p className="font-sans text-xs text-alkota-slate max-w-md mx-auto font-light leading-relaxed">
                Mandatory PDI assembly training, carbon inspection protocols, and annual technician recertification modules will appear here once partner onboarding begins.
              </p>
            </div>
          )}

          {/* I) DOWNLOADS */}
          {activeTab === "downloads" && (
            <div className="bg-alkota-black border border-white/15 p-8 space-y-6 font-mono text-xs">
              <div className="space-y-1">
                <div className="text-alkota-signal font-bold uppercase">OFFICIAL PARTNER DOCUMENTATION PACK</div>
                <h3 className="font-display font-bold text-2xl uppercase text-white">
                  DOWNLOAD GENERATED PARTNER PACK
                </h3>
              </div>

              <div className="p-6 bg-alkota-carbon border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="text-white font-bold">
                    Alkota Cycles Partner Commercial Pack (PDF)
                  </div>
                  <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
                    Personalised server-generated PDF pack containing agency proposition, single-source commercial terms table, APN-01..04 selection criteria, demo programme SLAs, and commitments.
                  </p>
                  <div className="text-[10px] text-alkota-slate">
                    Personalised for: <strong>{partnerProfile.businessName}</strong> ({partnerProfile.partnerRef})
                  </div>
                </div>

                <a
                  href={`/api/partners/pack.pdf?partnerId=${partnerProfile.partnerRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors shrink-0 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD PDF PACK</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
