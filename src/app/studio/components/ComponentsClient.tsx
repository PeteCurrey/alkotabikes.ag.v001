"use client";

import React, { useState, useEffect } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import {
  Cpu,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Edit2,
  Power,
  History,
  AlertTriangle,
  Save,
  X,
  Check,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";

interface ComponentItem {
  id: string;
  category: string;
  system_id?: string;
  manufacturer: string;
  product?: string;
  name?: string;
  variant?: string;
  description: string;
  whySelected?: string;
  status: string;
  claim_id?: string;
  is_selectable: boolean;
  active: boolean;
  sort_order: number;
  officialImage?: string | null;
}

interface AuditEntry {
  id: string;
  actor_email: string;
  action: "CREATE" | "EDIT" | "DEACTIVATE";
  entity_id: string;
  old_state: any;
  new_state: any;
  created_at: string;
}

const REGISTERED_CLAIMS = [
  { ref: "APC-001001", title: "Front Travel — 160mm" },
  { ref: "APC-001002", title: "Rear Travel — 150mm" },
  { ref: "APC-001003", title: "Primary Wheel Architecture — 29/29" },
  { ref: "APC-001004", title: "Chassis Material Intent — Full Carbon" },
  { ref: "APC-001005", title: "Suspension Architecture — Low-pivot four-bar" },
  { ref: "APC-001006", title: "Fit Geometry Family — S1–S4" },
  { ref: "APC-001007", title: "Large Master Geometry — R00" },
  { ref: "APC-001008", title: "Kinematic Curves — R00 Simulation" },
  { ref: "APC-001009", title: "Layup Schedule Direction — R00" },
  { ref: "APC-001010", title: "Fit Engine Geometry Outputs" },
];

export default function ComponentsClient() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [systemFilter, setSystemFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState<"CATALOGUE" | "BULK_EDIT" | "AUDIT_TRAIL">("CATALOGUE");

  // Modals & Server Feedback
  const [selectedCompForEdit, setSelectedCompForEdit] = useState<ComponentItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  // Form State for Edit/Create
  const [formData, setFormData] = useState({
    id: "",
    category: "FORK",
    manufacturer: "",
    product: "",
    variant: "",
    description: "",
    whySelected: "",
    status: "BASELINE",
    claim_id: "APC-001001",
    is_selectable: true,
    active: true,
  });

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/studio/components");
      const data = await res.json();
      if (data.success) {
        setComponents(data.components || []);
        setAuditLogs(data.auditLogs || []);
      }
    } catch (err) {
      console.error("Failed to fetch components:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const openCreateModal = () => {
    setFormData({
      id: `comp-${Date.now().toString().slice(-4)}`,
      category: "FORK",
      manufacturer: "",
      product: "",
      variant: "",
      description: "",
      whySelected: "",
      status: "UNDER_REVIEW",
      claim_id: "APC-001001",
      is_selectable: true,
      active: true,
    });
    setIsCreatingNew(true);
    setSelectedCompForEdit(null);
    setServerError(null);
  };

  const openEditModal = (comp: ComponentItem) => {
    setFormData({
      id: comp.id,
      category: comp.category || "FORK",
      manufacturer: comp.manufacturer,
      product: comp.product || comp.name || "",
      variant: comp.variant || "",
      description: comp.description || "",
      whySelected: comp.whySelected || "",
      status: comp.status || "BASELINE",
      claim_id: comp.claim_id || "APC-001001",
      is_selectable: comp.is_selectable,
      active: comp.active,
    });
    setSelectedCompForEdit(comp);
    setIsCreatingNew(false);
    setServerError(null);
  };

  const handleDeactivate = async (comp: ComponentItem) => {
    setServerError(null);
    setServerSuccess(null);
    try {
      const res = await fetch("/api/studio/components", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: comp.id, action: "DEACTIVATE" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Failed to deactivate component");
      } else {
        setServerSuccess(`Component '${comp.id}' deactivated successfully. Historic builds remain intact.`);
        fetchComponents();
      }
    } catch (err: any) {
      setServerError(err.message || "Failed to communicate with server");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setServerSuccess(null);

    const method = isCreatingNew ? "POST" : "PUT";
    const payload = isCreatingNew
      ? formData
      : { id: formData.id, updates: formData };

    try {
      const res = await fetch("/api/studio/components", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Server rejected component save request.");
      } else {
        setServerSuccess(
          isCreatingNew
            ? `Component '${formData.id}' created successfully.`
            : `Component '${formData.id}' updated.`
        );
        setSelectedCompForEdit(null);
        setIsCreatingNew(false);
        fetchComponents();
      }
    } catch (err: any) {
      setServerError(err.message || "Server request failed.");
    }
  };

  const handleBulkUpdate = async (comp: ComponentItem, field: "is_selectable" | "active", value: boolean) => {
    setServerError(null);
    try {
      const res = await fetch("/api/studio/components", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: comp.id, updates: { [field]: value } }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error);
      } else {
        fetchComponents();
      }
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  // Filtered components
  const filteredComponents = components.filter((comp) => {
    const matchesSearch =
      comp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comp.product || comp.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSystem = systemFilter === "ALL" || (comp.category || "").toUpperCase() === systemFilter.toUpperCase();
    const matchesStatus = statusFilter === "ALL" || (statusFilter === "ACTIVE" ? comp.active : !comp.active);
    return matchesSearch && matchesSystem && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-sans text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <TechnicalAnnotation label="STUDIO CMS" value="COMPONENT CATALOGUE" variant="signal" />
          <h1 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-white">
            COMPONENTS & <span className="text-[#1a73e8]">CLAIMS</span>
          </h1>
          <p className="font-mono text-xs text-[#647789] uppercase tracking-wider">
            SINGLE SOURCE MANAGEMENT • CLAIM LINKAGE ENFORCEMENT • DEACTIVATION ONLY
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-[#1a73e8] text-white font-mono text-xs font-bold uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>NEW COMPONENT</span>
          </button>
        </div>
      </div>

      {/* Global Server Notification Banner */}
      {serverError && (
        <div className="p-4 bg-red-950/80 border border-red-500/50 text-red-200 font-mono text-xs space-y-2 flex items-start gap-3 shadow-xl">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-red-400 uppercase tracking-wider">SERVER REJECTION NOTICE</div>
            <div className="leading-relaxed pt-1">{serverError}</div>
          </div>
          <button onClick={() => setServerError(null)} className="text-red-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {serverSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 font-mono text-xs flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{serverSuccess}</span>
          </div>
          <button onClick={() => setServerSuccess(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 font-mono text-xs">
        <button
          onClick={() => setActiveTab("CATALOGUE")}
          className={`py-3 px-6 uppercase font-bold tracking-wider transition-colors ${
            activeTab === "CATALOGUE"
              ? "border-b-2 border-[#1a73e8] text-[#1a73e8] bg-white/5"
              : "text-[#647789] hover:text-white"
          }`}
        >
          CATALOGUE ({components.length})
        </button>
        <button
          onClick={() => setActiveTab("BULK_EDIT")}
          className={`py-3 px-6 uppercase font-bold tracking-wider transition-colors ${
            activeTab === "BULK_EDIT"
              ? "border-b-2 border-[#1a73e8] text-[#1a73e8] bg-white/5"
              : "text-[#647789] hover:text-white"
          }`}
        >
          BULK SELECTABILITY & SORT ORDER
        </button>
        <button
          onClick={() => setActiveTab("AUDIT_TRAIL")}
          className={`py-3 px-6 uppercase font-bold tracking-wider transition-colors ${
            activeTab === "AUDIT_TRAIL"
              ? "border-b-2 border-[#1a73e8] text-[#1a73e8] bg-white/5"
              : "text-[#647789] hover:text-white"
          }`}
        >
          AUDIT TRAIL ({auditLogs.length})
        </button>
      </div>

      {/* VIEW 1: CATALOGUE LIST */}
      {activeTab === "CATALOGUE" && (
        <div className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#647789]" />
              <input
                type="text"
                placeholder="Search component ID, manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#131313] border border-white/15 pl-9 pr-4 py-2.5 text-white placeholder-[#647789] focus:border-[#1a73e8] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#647789]" />
              <select
                value={systemFilter}
                onChange={(e) => setSystemFilter(e.target.value)}
                className="w-full bg-[#131313] border border-white/15 px-3 py-2.5 text-white focus:border-[#1a73e8] focus:outline-none"
              >
                <option value="ALL">ALL SYSTEMS</option>
                <option value="FORK">FORK</option>
                <option value="REAR_SHOCK">REAR SHOCK</option>
                <option value="BRAKES">BRAKES</option>
                <option value="WHEELS">WHEELS</option>
                <option value="TYRES">TYRES</option>
                <option value="DRIVETRAIN">DRIVETRAIN</option>
                <option value="HANDLEBAR">HANDLEBAR</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[#131313] border border-white/15 px-3 py-2.5 text-white focus:border-[#1a73e8] focus:outline-none"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="ACTIVE">ACTIVE ONLY</option>
                <option value="INACTIVE">DEACTIVATED ONLY</option>
              </select>
            </div>
          </div>

          {/* Components Table */}
          <div className="bg-[#131313] border border-white/10 shadow-2xl overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#647789] bg-[#0a0a0a]">
                  <th className="px-4 py-3">SYSTEM</th>
                  <th className="px-4 py-3">COMPONENT / MANUFACTURER</th>
                  <th className="px-4 py-3">ENGINEERING STATUS</th>
                  <th className="px-4 py-3">CLAIM LINKAGE</th>
                  <th className="px-4 py-3 text-center">SELECTABLE</th>
                  <th className="px-4 py-3 text-center">ACTIVE</th>
                  <th className="px-4 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredComponents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[#647789] font-mono">
                      NO COMPONENTS FOUND MATCHING CURRENT FILTER CRITERIA
                    </td>
                  </tr>
                ) : (
                  filteredComponents.map((comp) => (
                    <tr
                      key={comp.id}
                      className={`hover:bg-white/5 transition-colors ${!comp.active ? "opacity-50 bg-black/40" : ""}`}
                    >
                      <td className="px-4 py-4 text-[#1a73e8] font-bold uppercase">
                        {comp.category}
                      </td>
                      <td className="px-4 py-4 space-y-0.5">
                        <div className="text-white font-bold">
                          {comp.manufacturer} {comp.product || comp.name}
                        </div>
                        <div className="text-[#647789] text-[10px]">{comp.variant || comp.id}</div>
                      </td>
                      <td className="px-4 py-4">
                        <SpecificationStatus
                          status={comp.status as any}
                          label={comp.status}
                        />
                      </td>
                      <td className="px-4 py-4">
                        {comp.claim_id ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-500/30 text-[10px] font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{comp.claim_id}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-400 bg-red-950/60 px-2 py-0.5 border border-red-500/30 text-[10px] font-bold">
                            <ShieldAlert className="w-3 h-3" />
                            <span>UNLINKED</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                            comp.is_selectable
                              ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/30"
                              : "border-white/10 text-[#647789]"
                          }`}
                        >
                          {comp.is_selectable ? "YES" : "NO"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                            comp.active
                              ? "border-[#1a73e8]/40 text-[#1a73e8] bg-[#1a73e8]/10"
                              : "border-red-500/40 text-red-400 bg-red-950/30"
                          }`}
                        >
                          {comp.active ? "ACTIVE" : "DEACTIVATED"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(comp)}
                          className="px-2.5 py-1 bg-white/10 text-white hover:bg-[#1a73e8] hover:text-white transition-colors text-[10px] font-bold uppercase"
                        >
                          EDIT
                        </button>
                        {comp.active && (
                          <button
                            onClick={() => handleDeactivate(comp)}
                            title="Deactivate component (hard delete prohibited)"
                            className="px-2.5 py-1 bg-red-950/80 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors text-[10px] font-bold uppercase"
                          >
                            DEACTIVATE
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: BULK EDIT SELECTABILITY & SORT ORDER */}
      {activeTab === "BULK_EDIT" && (
        <div className="space-y-6 bg-[#131313] border border-white/10 p-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#1a73e8] uppercase font-bold tracking-widest">
              MANAGEMENT MATRIX
            </span>
            <h2 className="font-display font-medium text-2xl uppercase">BULK SELECTABILITY & SORTING</h2>
            <p className="font-mono text-xs text-[#647789]">
              Toggle component availability in the live configurator and update display priority.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-t border-white/10 font-mono text-xs">
            {components.map((comp, idx) => (
              <div key={comp.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-1/3">
                  <span className="text-[#647789] text-[10px] font-bold">#{idx + 1}</span>
                  <div>
                    <span className="text-white font-bold block">{comp.manufacturer} {comp.product || comp.name}</span>
                    <span className="text-[#647789] text-[10px] uppercase">{comp.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={comp.is_selectable}
                      onChange={(e) => handleBulkUpdate(comp, "is_selectable", e.target.checked)}
                      className="accent-[#1a73e8]"
                    />
                    <span className="text-xs text-white uppercase">SELECTABLE IN BUILD MATRIX</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={comp.active}
                      onChange={(e) => handleBulkUpdate(comp, "active", e.target.checked)}
                      className="accent-[#1a73e8]"
                    />
                    <span className="text-xs text-white uppercase">ACTIVE</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: AUDIT TRAIL */}
      {activeTab === "AUDIT_TRAIL" && (
        <div className="space-y-6 bg-[#131313] border border-white/10 p-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#1a73e8] uppercase font-bold tracking-widest">
              IMMUTABLE AUDIT LOG
            </span>
            <h2 className="font-display font-medium text-2xl uppercase">COMPONENT AUDIT TRAIL</h2>
            <p className="font-mono text-xs text-[#647789]">
              Full change tracking log recording actor email, timestamp, action type, and state diffs.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {auditLogs.length === 0 ? (
              <div className="p-8 text-center text-[#647789]">NO AUDIT ENTRIES RECORDED IN CURRENT SESSION</div>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} className="p-4 bg-[#0a0a0a] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                          log.action === "CREATE"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                            : log.action === "DEACTIVATE"
                            ? "bg-red-950 text-red-400 border border-red-500/40"
                            : "bg-[#1a73e8]/20 text-[#1a73e8] border border-[#1a73e8]/40"
                        }`}
                      >
                        {log.action}
                      </span>
                      <span className="text-white font-bold">COMPONENT: {log.entity_id}</span>
                    </div>

                    <span className="text-[#647789] text-[10px]">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-[#647789] text-[11px]">
                    <span className="text-white">Actor:</span> {log.actor_email}
                  </div>

                  {log.new_state && (
                    <div className="bg-black/60 p-3 border border-white/5 font-mono text-[10px] text-emerald-300 overflow-x-auto">
                      <span className="text-[#647789] block mb-1">STATE SNAPSHOT:</span>
                      {JSON.stringify(log.new_state, null, 2)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(selectedCompForEdit || isCreatingNew) && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#131313] border border-white/15 max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-display font-medium text-xl uppercase text-white">
                {isCreatingNew ? "CREATE COMPONENT" : `EDIT ${formData.id}`}
              </h3>
              <button
                onClick={() => {
                  setSelectedCompForEdit(null);
                  setIsCreatingNew(false);
                }}
                className="text-[#647789] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#647789] uppercase block">COMPONENT ID *</label>
                  <input
                    type="text"
                    value={formData.id}
                    disabled={!isCreatingNew}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white disabled:opacity-50"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#647789] uppercase block">CATEGORY *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white"
                  >
                    <option value="FORK">FORK</option>
                    <option value="REAR_SHOCK">REAR SHOCK</option>
                    <option value="BRAKES">BRAKES</option>
                    <option value="WHEELS">WHEELS</option>
                    <option value="TYRES">TYRES</option>
                    <option value="DRIVETRAIN">DRIVETRAIN</option>
                    <option value="HANDLEBAR">HANDLEBAR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#647789] uppercase block">MANUFACTURER *</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder="e.g. FOX, Hope Technology, SRAM"
                    className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#647789] uppercase block">PRODUCT / MODEL *</label>
                  <input
                    type="text"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    placeholder="e.g. 38 Factory"
                    className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#647789] uppercase block">VARIANT SPECIFICATION</label>
                <input
                  type="text"
                  value={formData.variant}
                  onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                  placeholder="e.g. 160 mm · GRIP X2 Damper · Kashima Coat"
                  className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#647789] uppercase block">CLAIMS REGISTER LINKAGE *</label>
                <select
                  value={formData.claim_id}
                  onChange={(e) => setFormData({ ...formData, claim_id: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white"
                  required
                >
                  <option value="">-- SELECT REGISTERED CLAIM --</option>
                  {REGISTERED_CLAIMS.map((claim) => (
                    <option key={claim.ref} value={claim.ref}>
                      {claim.ref} — {claim.title}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#647789]">
                  Server rule: Active components MUST link to a valid registered claim.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[#647789] uppercase block">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="accent-[#1a73e8]"
                  />
                  <span className="text-white uppercase font-bold">ACTIVE STATUS</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_selectable}
                    onChange={(e) => setFormData({ ...formData, is_selectable: e.target.checked })}
                    className="accent-[#1a73e8]"
                  />
                  <span className="text-white uppercase font-bold">SELECTABLE IN MATRIX</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCompForEdit(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2.5 border border-white/20 text-white font-bold uppercase hover:bg-white/10"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1a73e8] text-white font-bold uppercase hover:bg-white hover:text-black transition-colors"
                >
                  SAVE COMPONENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
