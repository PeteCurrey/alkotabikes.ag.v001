"use client";

import React, { useState } from "react";
import {
  PROJECT_01_COMMERCIAL,
  REGIONAL_COMMERCIAL_SPECS,
  COMPONENT_PRICE_DELTAS,
  getInternalDealerCommercials,
  type RegionId,
  type PriceStatus,
  type CommercialStatus,
} from "@/content/project01/commercial";
import { AlertTriangle, Lock, DollarSign, ShieldCheck, History, Globe } from "lucide-react";

type Tab =
  | "PROJECT_01"
  | "REGIONAL_PRICING"
  | "COMPONENT_DELTAS"
  | "RESERVATIONS"
  | "ALLOCATION"
  | "DEALER_COMMERCIALS"
  | "PRICING_HISTORY";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    RESERVATION_PREPARATION: "bg-[#1a73e8]/10 text-[#1a73e8] border-[#1a73e8]/20",
    NOT_PRICED: "bg-white/5 text-white/40 border-white/10",
    INTERNAL_PRICING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    PRICE_REVIEW: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    PRICE_APPROVED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    RESERVATIONS_OPEN: "bg-green-500/10 text-green-400 border-green-500/20",
    INTERNAL: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    NOT_SET: "bg-white/5 text-white/30 border-white/10",
    PUBLISHED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  };
  const cls = colors[status] ?? "bg-white/5 text-white/40 border-white/10";
  return (
    <span className={`font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold ${cls}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function ApprovalModal({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
      <div className="bg-[#131313] border border-[#1a73e8]/40 p-6 max-w-md w-full space-y-4 font-mono text-[9px]">
        <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase text-[10px]">
          <AlertTriangle className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <p className="text-white leading-relaxed">{message}</p>
        <p className="text-[#647789] border-t border-white/8 pt-3 text-[8px] uppercase">
          THIS ACTION WILL BE PERMANENTLY LOGGED IN THE COMMERCIAL AUDIT TRAIL.
        </p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-[#1a73e8] text-white font-bold uppercase tracking-wider hover:bg-[#1a73e8]/90 transition-colors"
          >
            CONFIRM CHANGE
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-white/10 text-[#647789] uppercase tracking-wider hover:text-white transition-colors"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommercialClient() {
  const [activeTab, setActiveTab] = useState<Tab>("PROJECT_01");
  const [modalState, setModalState] = useState<{
    show: boolean;
    title: string;
    message: string;
    action: (() => void) | null;
  }>({
    show: false,
    title: "",
    message: "",
    action: null,
  });

  const com = PROJECT_01_COMMERCIAL;
  const regionalSpecs = Object.values(REGIONAL_COMMERCIAL_SPECS);
  const deltas = COMPONENT_PRICE_DELTAS;
  const dealerComs = getInternalDealerCommercials();

  const triggerApproval = (title: string, message: string, action: () => void) => {
    setModalState({ show: true, title, message, action });
  };

  const handleConfirmModal = () => {
    if (modalState.action) modalState.action();
    setModalState({ show: false, title: "", message: "", action: null });
  };

  return (
    <div className="space-y-6 max-w-6xl font-mono text-[9px]">
      {modalState.show && (
        <ApprovalModal
          title={modalState.title}
          message={modalState.message}
          onConfirm={handleConfirmModal}
          onCancel={() => setModalState({ show: false, title: "", message: "", action: null })}
        />
      )}

      {/* Page Header */}
      <div className="space-y-1">
        <div className="text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">COMMERCIAL CONTROL</h1>
        <div className="text-[8px] text-[#647789] uppercase">
          Single source of truth for pricing, regional availability, deposit terms & dealer margins
        </div>
      </div>

      {/* Commercial Policy Banner */}
      <div className="border border-[#1a73e8]/30 bg-[#1a73e8]/5 p-4 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#1a73e8] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-white font-bold uppercase text-[9px]">
            ENGINEERING VS COMMERCIAL RELEASE SEPARATION
          </div>
          <p className="text-[#647789] leading-relaxed text-[8px]">
            Engineering release and commercial release are distinct states. Public bike pricing defaults to &ldquo;FINAL PRICING TO BE CONFIRMED&rdquo; until explicitly published.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-white/8">
        {[
          { id: "PROJECT_01", label: "PROJECT 01" },
          { id: "REGIONAL_PRICING", label: "REGIONAL PRICING" },
          { id: "COMPONENT_DELTAS", label: "COMPONENT DELTAS" },
          { id: "RESERVATIONS", label: "RESERVATIONS" },
          { id: "ALLOCATION", label: "ALLOCATION" },
          { id: "DEALER_COMMERCIALS", label: "DEALER COMMERCIALS" },
          { id: "PRICING_HISTORY", label: "PRICING HISTORY" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-3 py-2 uppercase tracking-wider transition-colors border-b-2 -mb-px text-[9px] ${
              activeTab === tab.id
                ? "border-[#1a73e8] text-[#1a73e8] font-bold"
                : "border-transparent text-[#647789] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: PROJECT 01 */}
      {activeTab === "PROJECT_01" && (
        <div className="space-y-4">
          <div className="bg-[#131313] border border-white/8 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <div className="text-white font-bold uppercase text-[10px]">
                PROJECT 01 COMMERCIAL BASELINE ({com.commercialRevision})
              </div>
              <button
                onClick={() =>
                  triggerApproval(
                    "THIS CHANGE AFFECTS CUSTOMER COMMERCIAL INFORMATION",
                    "Do you want to stage a commercial status update for Project 01?",
                    () => alert("Status update staged for commercial review")
                  )
                }
                className="text-[8px] text-[#1a73e8] font-bold uppercase hover:underline"
              >
                UPDATE REVISION
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">COMMERCIAL REVISION</div>
                <div className="text-white font-bold text-base">{com.commercialRevision}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">COMMERCIAL STATUS</div>
                <div><StatusBadge status={com.commercialStatus} /></div>
              </div>
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">BASE CURRENCY</div>
                <div className="text-white font-bold">{com.baseCurrency}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">PRICE STATUS</div>
                <div><StatusBadge status={com.priceStatus} /></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-3">
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">PUBLIC BASE PRICE</div>
                <div className="text-yellow-400 font-bold">
                  {com.basePrice ? `£${com.basePrice}` : "FINAL PRICING TO BE CONFIRMED"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">PROPOSED DEPOSIT</div>
                <div className="text-white font-bold">£{com.reservationDeposit} (Refundable)</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">PRODUCTION YEAR</div>
                <div className="text-white font-bold">{com.productionYear}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#647789] text-[8px]">TERMS VERSION</div>
                <div className="text-white font-bold">{com.termsVersion}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: REGIONAL PRICING */}
      {activeTab === "REGIONAL_PRICING" && (
        <div className="bg-[#131313] border border-white/8 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8 text-[#647789]">
                <th className="p-3">REGION</th>
                <th className="p-3">MARKET STATUS</th>
                <th className="p-3">CURRENCY</th>
                <th className="p-3">DISPLAY PRICE</th>
                <th className="p-3">TAX MODE</th>
                <th className="p-3">DELIVERY</th>
                <th className="p-3">RESERVATION</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white">
              {regionalSpecs.map((reg) => (
                <tr key={reg.regionId} className="hover:bg-white/2">
                  <td className="p-3 font-bold text-[#1a73e8]">{reg.name} ({reg.regionId})</td>
                  <td className="p-3"><StatusBadge status={reg.commercialStatus} /></td>
                  <td className="p-3 font-bold">{reg.currency}</td>
                  <td className="p-3 text-yellow-400">
                    {reg.displayPrice !== null ? `${reg.currency} ${reg.displayPrice}` : "FINAL PRICING TBC"}
                  </td>
                  <td className="p-3 text-[#647789]">{reg.taxTreatment}</td>
                  <td className="p-3">{reg.deliveryAvailable ? "AVAILABLE" : "DISABLED"}</td>
                  <td className="p-3">{reg.reservationAvailable ? "ENABLED" : "PAUSED"}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() =>
                        triggerApproval(
                          "THIS CHANGE AFFECTS CUSTOMER COMMERCIAL INFORMATION",
                          `Update regional commercial controls for ${reg.name}?`,
                          () => alert(`Regional spec updated for ${reg.name}`)
                        )
                      }
                      className="text-[8px] text-[#1a73e8] uppercase font-bold hover:underline"
                    >
                      CONFIGURE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: COMPONENT DELTAS */}
      {activeTab === "COMPONENT_DELTAS" && (
        <div className="bg-[#131313] border border-white/8 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8 text-[#647789]">
                <th className="p-3">COMPONENT ID</th>
                <th className="p-3">PRICE DELTA</th>
                <th className="p-3">PRICE STATUS</th>
                <th className="p-3">CURRENCY</th>
                <th className="p-3">REGION</th>
                <th className="p-3">NOTES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white">
              {deltas.map((d) => (
                <tr key={d.componentId} className="hover:bg-white/2">
                  <td className="p-3 font-bold text-[#1a73e8]">{d.componentId}</td>
                  <td className="p-3 font-bold">
                    {d.priceDelta !== null ? `+£${d.priceDelta}` : "DELTA TBC"}
                  </td>
                  <td className="p-3"><StatusBadge status={d.priceDeltaStatus} /></td>
                  <td className="p-3">{d.currency}</td>
                  <td className="p-3">{d.regionId}</td>
                  <td className="p-3 text-[#647789] text-[8px]">{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: RESERVATIONS */}
      {activeTab === "RESERVATIONS" && (
        <div className="bg-[#131313] border border-white/8 p-5 space-y-4">
          <div className="font-bold text-white uppercase text-[10px]">RESERVATION PROGRAMME PARAMETERS</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-[#647789] text-[8px]">RESERVATION MODE</div>
              <div className="text-white font-bold">{com.reservationMode}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#647789] text-[8px]">DEPOSIT AMOUNT</div>
              <div className="text-white font-bold">£{com.reservationDeposit}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#647789] text-[8px]">REFUNDABILITY</div>
              <div className="text-green-400 font-bold">{com.depositRefundability}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#647789] text-[8px]">ALLOCATION METHOD</div>
              <div className="text-white font-bold">{com.allocationMode}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ALLOCATION */}
      {activeTab === "ALLOCATION" && (
        <div className="bg-[#131313] border border-white/8 p-5 space-y-4">
          <div className="font-bold text-white uppercase text-[10px]">PRODUCTION ALLOCATION TIMELINE</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-[#647789] text-[8px]">TARGET PRODUCTION YEAR</div>
              <div className="text-white font-bold text-base">{com.productionYear}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#647789] text-[8px]">ESTIMATED WINDOW</div>
              <div className="text-white font-bold text-base">{com.estimatedProductionWindow}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[#647789] text-[8px]">ALLOCATION RULE</div>
              <div className="text-[#1a73e8] font-bold text-base">DEVELOPMENT REGISTER FIRST</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: DEALER COMMERCIALS (PRIVATE) */}
      {activeTab === "DEALER_COMMERCIALS" && (
        <div className="space-y-4">
          <div className="border border-red-500/30 bg-red-500/5 p-4 flex items-center gap-3">
            <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
            <div>
              <div className="text-red-400 font-bold uppercase text-[9px]">STRICTLY RESTRICTED ACCESS</div>
              <div className="text-[#647789] text-[8px]">
                Dealer costs, wholesale margins, and demo pricing are strictly unexposed to customer public APIs.
              </div>
            </div>
          </div>

          <div className="bg-[#131313] border border-white/8 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/8 text-[#647789]">
                  <th className="p-3">REGION</th>
                  <th className="p-3">CURRENCY</th>
                  <th className="p-3">TARGET MSRP</th>
                  <th className="p-3">DEALER COST</th>
                  <th className="p-3">DEALER MARGIN %</th>
                  <th className="p-3">DEMO PRICE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white">
                {dealerComs.map((d) => (
                  <tr key={d.regionId} className="hover:bg-white/2">
                    <td className="p-3 font-bold text-[#1a73e8]">{d.regionId}</td>
                    <td className="p-3 font-bold">{d.currency}</td>
                    <td className="p-3 text-yellow-400">{d.msrp ? `${d.currency} ${d.msrp}` : "TBC"}</td>
                    <td className="p-3">{d.dealerCost ? `${d.currency} ${d.dealerCost}` : "CONFIDENTIAL TBC"}</td>
                    <td className="p-3">{d.dealerMarginPct ? `${d.dealerMarginPct}%` : "TBC"}</td>
                    <td className="p-3">{d.demoPrice ? `${d.currency} ${d.demoPrice}` : "CONFIDENTIAL TBC"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: PRICING HISTORY */}
      {activeTab === "PRICING_HISTORY" && (
        <div className="bg-[#131313] border border-white/8 p-5 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold uppercase text-[10px]">
            <History className="w-4 h-4 text-[#1a73e8]" />
            <span>COMMERCIAL AUDIT LOG</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8 text-[#647789]">
                <th className="py-2">DATE</th>
                <th className="py-2">USER</th>
                <th className="py-2">REVISION</th>
                <th className="py-2">ENTITY</th>
                <th className="py-2">CHANGE REASON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white">
              <tr>
                <td className="py-2 text-[#647789]">2026-02-01</td>
                <td className="py-2">Pete Currey / OWNER</td>
                <td className="py-2 text-[#1a73e8] font-bold">C00</td>
                <td className="py-2">Project 01 Baseline</td>
                <td className="py-2 text-[#647789] text-[8px]">Established C00 commercial baseline (Reservations Preparation)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
