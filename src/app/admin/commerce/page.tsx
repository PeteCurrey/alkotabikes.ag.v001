import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { fetchCommerceStats } from "@/lib/admin/dashboardData";
import { ShoppingBag, Lock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCommercePage() {
  await verifyAdminAuth();
  const result = await fetchCommerceStats();
  const stats = result.ok ? result.data : { commerceLive: false, pricingVisible: false, storeMode: "CATALOGUE", registeredInterest: 0 };

  const blockingRequirements = [
    { title: "Legal Terms & Conditions", status: "PENDING SIGN-OFF", desc: "US & UK terms require legal sign-off before transactional checkout" },
    { title: "Stripe Payment Gateway", status: "SANDBOX READY", desc: "PROJECT01_PAID_RESERVATIONS_ENABLED flag set to false" },
    { title: "ISO 4210 Certification", status: "DOCUMENTED", desc: "Pre-production chassis structural compliance docs" },
    { title: "Final Commercial Pricing", status: "CATALOGUE ONLY", desc: "Prices rendered with development baseline disclosures" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TechnicalAnnotation label="MODULE STATUS" value="BUILDING (PHASE 2)" variant="signal" />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-3">
            <span>COMMERCE & STORE CONTROL</span>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-mono px-2 py-0.5 border border-amber-500/40">
              BUILDING
            </span>
          </h1>
          <p className="font-mono text-xs text-alkota-slate mt-1">
            Store operating mode, commercial feature flags, and transaction readiness checklist.
          </p>
        </div>
      </div>

      {/* Module Overview Card */}
      <div className="bg-alkota-black/80 border border-white/10 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              STORE OPERATING MODE
            </span>
            <span className="font-mono text-xl font-bold text-white uppercase flex items-center gap-2">
              <span>{stats.storeMode}</span>
              <Lock className="w-4 h-4 text-amber-400" />
            </span>
          </div>

          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              COMMERCE_LIVE FLAG
            </span>
            <span className={`font-mono text-xl font-bold uppercase ${stats.commerceLive ? "text-emerald-400" : "text-amber-400"}`}>
              {stats.commerceLive ? "ENABLED" : "DISABLED"}
            </span>
          </div>

          <div className="bg-white/5 p-4 border border-white/10">
            <span className="font-mono text-[10px] text-alkota-slate uppercase block mb-1">
              REGISTERED PRE-ORDER INTEREST
            </span>
            <span className="font-mono text-xl font-bold text-alkota-signal">
              {stats.registeredInterest} LEADS
            </span>
          </div>
        </div>

        {/* Readiness Checklist */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between font-mono text-xs text-alkota-slate uppercase font-bold">
            <span>TRANSACTIONAL READINESS BLOCKERS</span>
            <span className="text-amber-400">0/4 PASSED FOR PRODUCTION RELEASE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blockingRequirements.map((req, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white uppercase">{req.title}</span>
                  <span className="bg-amber-500/20 text-amber-400 text-[9px] font-mono font-bold px-1.5 py-0.5 border border-amber-500/30">
                    {req.status}
                  </span>
                </div>
                <p className="font-mono text-xs text-alkota-slate leading-relaxed">
                  {req.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
