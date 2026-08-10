"use client";

import React, { useState, useEffect } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import {
  GitBranch,
  Check,
  X,
  Sliders,
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  Save,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface MatrixItem {
  systemId: string;
  systemName: string;
  isConfigurable: boolean;
  defaultComponentId: string;
  selectableComponentIds: string[];
  status: string;
  statusText: string;
  notes?: string;
}

interface CompatibilityRule {
  id: string;
  condition: string;
  constraint: string;
  active: boolean;
}

export default function BuildMatrixClient() {
  const [matrix, setMatrix] = useState<MatrixItem[]>([]);
  const [rules, setRules] = useState<CompatibilityRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // New rule creation modal/form
  const [newCondition, setNewCondition] = useState("");
  const [newConstraint, setNewConstraint] = useState("");

  const fetchMatrix = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/studio/build-matrix");
      const data = await res.json();
      if (data.success) {
        setMatrix(data.matrix || []);
        setRules(data.compatibilityRules || []);
      }
    } catch (err) {
      console.error("Failed to fetch build matrix:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatrix();
  }, []);

  const handleToggleSystemConfigurable = (systemId: string) => {
    setMatrix((prev) =>
      prev.map((item) =>
        item.systemId === systemId ? { ...item, isConfigurable: !item.isConfigurable } : item
      )
    );
  };

  const handleSelectableComponentToggle = (systemId: string, componentId: string) => {
    setMatrix((prev) =>
      prev.map((item) => {
        if (item.systemId !== systemId) return item;
        const exists = item.selectableComponentIds.includes(componentId);
        const updatedSelectables = exists
          ? item.selectableComponentIds.filter((id) => id !== componentId)
          : [...item.selectableComponentIds, componentId];

        return {
          ...item,
          selectableComponentIds: updatedSelectables,
        };
      })
    );
  };

  const handleAddRule = () => {
    if (!newCondition || !newConstraint) return;
    const rule: CompatibilityRule = {
      id: `rule-${Date.now().toString().slice(-4)}`,
      condition: newCondition,
      constraint: newConstraint,
      active: true,
    };
    setRules((prev) => [...prev, rule]);
    setNewCondition("");
    setNewConstraint("");
  };

  const handleRemoveRule = (ruleId: string) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
  };

  const handleSaveMatrix = async () => {
    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/studio/build-matrix", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rules }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg("Build Matrix rules updated. Active configurator sessions updated.");
      }
    } catch (err: any) {
      setStatusMsg("Failed to save matrix updates.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-sans text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <TechnicalAnnotation label="STUDIO CMS" value="BUILD MATRIX RULES" variant="signal" />
          <h1 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-white">
            BUILD MATRIX & <span className="text-[#1a73e8]">COMPATIBILITY</span>
          </h1>
          <p className="font-mono text-xs text-[#647789] uppercase tracking-wider">
            SYSTEM CONFIGURABILITY • RULE CONSTRAINTS • IMMUTABLE BUILD GUARANTEE
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveMatrix}
            disabled={saving}
            className="px-6 py-2.5 bg-[#1a73e8] text-white font-mono text-xs font-bold uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "SAVING..." : "SAVE MATRIX RULES"}</span>
          </button>
        </div>
      </div>

      {/* Immutability Banner */}
      <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 font-mono text-xs flex items-start gap-3 shadow-xl">
        <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-emerald-400 uppercase tracking-wider">
            IMMUTABILITY GUARANTEE ACTIVE
          </div>
          <p className="text-[#a0c5df] font-light leading-relaxed">
            Changing the build matrix updates active customer configurator choices going forward.
            Historic saved builds stored in the database are <strong className="text-white">immutable snapshots</strong> and will <strong className="text-white">never be altered retroactively</strong>.
          </p>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-[#1a73e8]/20 border border-[#1a73e8] text-white font-mono text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#1a73e8]" />
            <span>{statusMsg}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="text-[#647789] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Section 1: System Configurability Matrix */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[#1a73e8] uppercase font-bold tracking-widest">
            SYSTEM CONTROL
          </span>
          <h2 className="font-display font-medium text-2xl uppercase">CONFIGURABLE SYSTEMS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matrix.map((item) => (
            <div
              key={item.systemId}
              className={`p-5 bg-[#131313] border space-y-4 transition-all ${
                item.isConfigurable ? "border-[#1a73e8]/50" : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] text-[#647789] uppercase font-bold block">
                    SYSTEM ID: {item.systemId}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white uppercase">{item.systemName}</h3>
                </div>

                <button
                  onClick={() => handleToggleSystemConfigurable(item.systemId)}
                  className={`px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    item.isConfigurable
                      ? "border-emerald-500/50 bg-emerald-950/60 text-emerald-400"
                      : "border-white/15 bg-white/5 text-[#647789]"
                  }`}
                >
                  {item.isConfigurable ? "CONFIGURABLE" : "FIXED SPEC"}
                </button>
              </div>

              <div className="font-mono text-xs space-y-2">
                <div className="flex justify-between text-[#647789] text-[11px]">
                  <span>DEFAULT COMPONENT:</span>
                  <span className="text-white font-bold">{item.defaultComponentId}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#647789] text-[10px] uppercase block font-bold">
                    SELECTABLE OPTIONS ({item.selectableComponentIds.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.selectableComponentIds.map((cid) => (
                      <span
                        key={cid}
                        className="px-2 py-0.5 bg-black/60 border border-white/15 text-[10px] text-[#1a73e8] font-bold"
                      >
                        {cid}
                      </span>
                    ))}
                  </div>
                </div>

                {item.notes && (
                  <p className="text-[10px] text-[#647789] italic pt-1 font-sans">{item.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Compatibility Rules Engine */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[#1a73e8] uppercase font-bold tracking-widest">
            RULES ENGINE
          </span>
          <h2 className="font-display font-medium text-2xl uppercase">COMPATIBILITY CONSTRAINTS</h2>
          <p className="font-mono text-xs text-[#647789]">
            Define platform logic constraints (e.g. Wheel platform constraints on tyre choice or dropper size).
          </p>
        </div>

        {/* Existing Rules List */}
        <div className="space-y-3 font-mono text-xs">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 bg-[#131313] border border-white/10 flex items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#1a73e8]/20 text-[#1a73e8] font-bold text-[10px] uppercase">
                    IF {rule.condition}
                  </span>
                  <span className="text-white font-bold text-xs">→ CONSTRAINT: {rule.constraint}</span>
                </div>
              </div>

              <button
                onClick={() => handleRemoveRule(rule.id)}
                className="text-[#647789] hover:text-red-400 p-2"
                title="Remove rule"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Rule Form */}
        <div className="p-5 bg-[#131313] border border-white/15 space-y-4 font-mono text-xs">
          <span className="text-[#1a73e8] font-bold uppercase text-[10px]">ADD COMPATIBILITY RULE</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[#647789] text-[10px] uppercase block">CONDITION (IF)</label>
              <input
                type="text"
                placeholder="e.g. wheelFormat === 'MX'"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white focus:border-[#1a73e8] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#647789] text-[10px] uppercase block">CONSTRAINT (THEN)</label>
              <input
                type="text"
                placeholder="e.g. Constrain rear tyre to 27.5 inch casing"
                value={newConstraint}
                onChange={(e) => setNewConstraint(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/15 p-2.5 text-white focus:border-[#1a73e8] focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleAddRule}
            className="px-4 py-2 bg-white/10 text-white font-bold uppercase hover:bg-[#1a73e8] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD RULE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
