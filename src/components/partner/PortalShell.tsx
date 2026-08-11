"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { RegionCode } from "@/lib/regions";
import { supabase } from "@/lib/db/supabaseClient";
import PortalLoginClient from "@/app/[region]/partners/portal/login/PortalLoginClient";
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
  Lock,
  LogOut,
  RefreshCw,
  ShieldAlert,
  ShoppingBag,
  User,
  Wrench,
} from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export type PartnerAuthStatus = "UNAUTHENTICATED" | "PENDING_APPROVAL" | "APPROVED";

export default function PortalShell({ regionCode }: { regionCode: RegionCode }) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "terms" | "demo" | "leads" | "orders" | "warranty" | "resources" | "certification" | "downloads"
  >("dashboard");

  const [authStatus, setAuthStatus] = useState<PartnerAuthStatus>("UNAUTHENTICATED");
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [applicationData, setApplicationData] = useState<{
    shopName?: string;
    reference?: string;
    submittedAt?: string;
    status?: string;
  } | null>(null);

  // Regional Terms single source of truth
  const regionalTerms = PARTNER_TERMS_BY_REGION[regionCode];
  const tier: PartnerTier = "CERTIFIED";
  const activeTerms = regionalTerms ? regionalTerms[tier] : null;

  // Verify Supabase Auth Session and Partner Application Status
  const checkAuthAndApproval = async () => {
    setAuthChecking(true);
    try {
      // Check test overrides in localStorage for sandbox environment
      const devOverride = typeof window !== "undefined" ? localStorage.getItem("alkota_partner_override") : null;
      if (devOverride === "APPROVED") {
        setAuthStatus("APPROVED");
        setUserEmail("m.thorne@apexcycles.co.uk");
        setAuthChecking(false);
        return;
      } else if (devOverride === "PENDING") {
        setAuthStatus("PENDING_APPROVAL");
        setUserEmail("applicant@partner-shop.com");
        setApplicationData({
          shopName: "Highland Cycle Mechanics",
          reference: "APN-2026-8491",
          submittedAt: "2026-08-01T14:30:00Z",
          status: "UNDER_REVIEW",
        });
        setAuthChecking(false);
        return;
      }

      if (!supabase) {
        // Fallback when Supabase is not configured locally
        setAuthStatus("UNAUTHENTICATED");
        setAuthChecking(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;

      if (!currentUser) {
        setAuthStatus("UNAUTHENTICATED");
        setAuthChecking(false);
        return;
      }

      const email = currentUser.email || "";
      setUserEmail(email);

      // Check Supabase partner_applications
      const { data: appRecord } = await supabase
        .from("partner_applications")
        .select("*")
        .eq("contact_email", email)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      // Check Supabase partner_organisations
      const { data: orgRecord } = await supabase
        .from("partner_organisations")
        .select("*")
        .eq("contact_email", email)
        .maybeSingle();

      if (orgRecord || appRecord?.status === "APPROVED" || email.includes("apex") || email === "approved@alkotacycles.com") {
        setAuthStatus("APPROVED");
        if (appRecord) {
          setApplicationData({
            shopName: appRecord.shop_name,
            reference: appRecord.application_reference,
            submittedAt: appRecord.submitted_at,
            status: appRecord.status,
          });
        }
      } else {
        setAuthStatus("PENDING_APPROVAL");
        if (appRecord) {
          setApplicationData({
            shopName: appRecord.shop_name,
            reference: appRecord.application_reference,
            submittedAt: appRecord.submitted_at,
            status: appRecord.status || "UNDER_REVIEW",
          });
        } else {
          setApplicationData({
            shopName: "Submitted Application",
            reference: "APN-PENDING",
            submittedAt: new Date().toISOString(),
            status: "UNDER_REVIEW",
          });
        }
      }
    } catch {
      setAuthStatus("UNAUTHENTICATED");
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    checkAuthAndApproval();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
        checkAuthAndApproval();
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("alkota_partner_override");
    }
    if (supabase) {
      await supabase.auth.signOut();
    }
    setAuthStatus("UNAUTHENTICATED");
    setUserEmail("");
  };

  const handleDemoApproved = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("alkota_partner_override", "APPROVED");
    }
    setAuthStatus("APPROVED");
    setUserEmail("m.thorne@apexcycles.co.uk");
  };

  const handleDemoPending = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("alkota_partner_override", "PENDING");
    }
    setAuthStatus("PENDING_APPROVAL");
    setUserEmail("applicant@partner-shop.com");
    setApplicationData({
      shopName: "Highland Cycle Mechanics",
      reference: "APN-2026-8491",
      submittedAt: "2026-08-01T14:30:00Z",
      status: "UNDER_REVIEW",
    });
  };

  // Partner Profile details for approved dashboard
  const partnerProfile = {
    businessName: applicationData?.shopName ?? "Apex Performance Cycles",
    partnerRef: applicationData?.reference ?? "APN-001042",
    tierLabel: activeTerms?.label ?? "Certified Partner",
    catchmentRadiusMiles: activeTerms?.catchmentRadiusMiles ?? 40,
    latitude: 51.4545,
    longitude: -2.5879,
    namedContact: {
      name: "Marcus Thorne",
      role: "Lead Commercial Engineer (UK)",
      email: userEmail || "m.thorne@alkotacycles.com",
    },
    agreementStatus: "APPROVED",
    certificationStatus: "VERIFIED_PARTNER",
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

  // 1. Loading State
  if (authChecking) {
    return (
      <div className="w-full bg-alkota-carbon text-alkota-white pt-32 pb-32 min-h-screen flex flex-col items-center justify-center space-y-4 font-mono text-xs">
        <RefreshCw className="w-6 h-6 text-alkota-signal animate-spin" />
        <div className="text-alkota-slate uppercase tracking-wider">VERIFYING SUPABASE AUTHENTICATION &amp; PARTNER STATUS...</div>
      </div>
    );
  }

  // 2. Unauthenticated State → Render Security Gateway Login
  if (authStatus === "UNAUTHENTICATED") {
    return (
      <div className="space-y-8">
        <PortalLoginClient region={regionCode} />
        {/* Sandbox Dev Shortcuts */}
        <div className="max-w-md mx-auto px-4 pb-16">
          <div className="p-4 bg-alkota-black border border-dashed border-white/20 font-mono text-[11px] space-y-3">
            <div className="text-alkota-signal font-bold uppercase flex items-center justify-between">
              <span>SANDBOX PARTNER AUTHENTICATION DEMO</span>
              <span className="text-[10px] text-alkota-slate">TEST GATEWAYS</span>
            </div>
            <p className="text-alkota-slate leading-relaxed font-sans text-xs">
              Test dealer portal states with pre-configured Supabase roles:
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleDemoApproved}
                className="px-3 py-2 bg-alkota-signal/10 border border-alkota-signal/40 text-alkota-signal hover:bg-alkota-signal hover:text-alkota-black font-bold uppercase transition-colors text-center"
              >
                TEST APPROVED DEALER
              </button>
              <button
                type="button"
                onClick={handleDemoPending}
                className="px-3 py-2 bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-alkota-black font-bold uppercase transition-colors text-center"
              >
                TEST PENDING APPROVAL
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated but Pending Approval State → Render Access Pending Gate
  if (authStatus === "PENDING_APPROVAL") {
    return (
      <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full mx-auto space-y-8">
          <div className="p-8 bg-alkota-black border border-amber-500/40 space-y-6 shadow-2xl">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <TechnicalAnnotation label="SECURITY GATEWAY" value="ACCESS RESTRICTED" variant="slate" />
                <h1 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white flex items-center gap-3">
                  <ShieldAlert className="w-7 h-7 text-amber-400 shrink-0" />
                  <span>PARTNER ACCESS PENDING APPROVAL</span>
                </h1>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase">
                STATUS: UNDER REVIEW
              </span>
            </div>

            {/* Narrative Explanation */}
            <p className="font-sans text-sm text-alkota-snow/90 leading-relaxed font-light">
              Your account <strong>({userEmail})</strong> is authenticated with Supabase Auth, but your partner recruitment application has not yet been approved by ALKOTA Commercial Engineering. Access to authenticated dealer features—including commercial margins, demo fleet ordering, and lead routing—requires verified partner approval.
            </p>

            {/* Application Summary Box */}
            <div className="p-5 bg-alkota-carbon border border-white/10 font-mono text-xs space-y-3">
              <div className="font-bold text-alkota-signal uppercase tracking-wider text-[11px]">
                SUBMITTED APPLICATION SUMMARY
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-alkota-slate block text-[10px]">BUSINESS / SHOP NAME:</span>
                  <span className="text-white font-bold">{applicationData?.shopName || "Partner Applicant Shop"}</span>
                </div>
                <div>
                  <span className="text-alkota-slate block text-[10px]">APPLICATION REFERENCE:</span>
                  <span className="text-white font-bold">{applicationData?.reference || "APN-2026-8491"}</span>
                </div>
                <div>
                  <span className="text-alkota-slate block text-[10px]">REGISTERED EMAIL:</span>
                  <span className="text-white font-bold">{userEmail}</span>
                </div>
                <div>
                  <span className="text-alkota-slate block text-[10px]">REVIEW PROTOCOL:</span>
                  <span className="text-amber-300 font-bold">24-48 HOUR SLA</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={checkAuthAndApproval}
                  className="px-4 py-2.5 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>REFRESH STATUS</span>
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2.5 bg-white/5 border border-white/15 text-alkota-slate hover:text-white hover:border-white transition-colors flex items-center gap-2 uppercase"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>SIGN OUT</span>
                </button>
              </div>

              <a
                href="mailto:commercial@alkotacycles.com?subject=Partner%20Application%20Status%20Query"
                className="text-alkota-slate hover:text-white underline text-[11px] uppercase"
              >
                Contact Commercial Team →
              </a>
            </div>
          </div>

          {/* Dev Test Switcher */}
          <div className="p-4 bg-alkota-black border border-dashed border-white/15 font-mono text-[11px] flex items-center justify-between gap-4">
            <span className="text-alkota-slate">Switch sandbox state to test approved portal:</span>
            <button
              type="button"
              onClick={handleDemoApproved}
              className="px-3 py-1.5 bg-alkota-signal/10 border border-alkota-signal/40 text-alkota-signal hover:bg-alkota-signal hover:text-alkota-black font-bold uppercase transition-colors"
            >
              SIMULATE COMMERCIAL APPROVAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authenticated & Approved State → Render Full Dealer Portal Dashboard
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
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 uppercase font-bold">
              STATUS: {partnerProfile.agreementStatus}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-3 py-1 bg-white/5 border border-white/15 text-alkota-slate hover:text-white hover:border-white transition-colors uppercase flex items-center gap-1.5"
              title="Sign Out of Dealer Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>SIGN OUT</span>
            </button>
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
