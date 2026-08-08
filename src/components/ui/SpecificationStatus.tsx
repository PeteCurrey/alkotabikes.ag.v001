import React from "react";
import { EngineeringStatus } from "@/content/project01/specification";

interface SpecificationStatusProps {
  status: EngineeringStatus | string;
  label?: string;
  variant?: "badge" | "inline" | "panel";
  className?: string;
}

export default function SpecificationStatus({
  status,
  label,
  variant = "badge",
  className = "",
}: SpecificationStatusProps) {
  const normalizedStatus = typeof status === "string" ? status.toUpperCase() : status;

  const getStatusText = () => {
    if (label) return label;
    switch (normalizedStatus) {
      case "DEVELOPMENT_BASELINE":
        return "DEVELOPMENT BASELINE";
      case "UNDER_REVIEW":
        return "UNDER ENGINEERING REVIEW";
      case "APPROVED_FOR_PROTOTYPE":
        return "APPROVED FOR PROTOTYPE";
      case "VALIDATION_PENDING":
        return "VALIDATION PENDING";
      case "VALIDATED":
        return "VALIDATED";
      case "PRODUCTION_RELEASED":
        return "PRODUCTION RELEASED";
      case "OPTION":
        return "CONFIGURABLE OPTION";
      case "SUPERSEDED":
        return "SUPERSEDED";
      default:
        return normalizedStatus;
    }
  };

  const getStyles = () => {
    switch (normalizedStatus) {
      case "PRODUCTION_RELEASED":
      case "VALIDATED":
        return "border-emerald-500/40 text-emerald-400 bg-emerald-500/10";
      case "DEVELOPMENT_BASELINE":
      case "APPROVED_FOR_PROTOTYPE":
        return "border-alkota-signal/40 text-alkota-signal bg-alkota-signal/10";
      case "UNDER_REVIEW":
      case "VALIDATION_PENDING":
        return "border-amber-500/40 text-amber-400 bg-amber-500/10";
      case "SUPERSEDED":
        return "border-white/10 text-alkota-slate bg-white/5 line-through";
      default:
        return "border-white/20 text-alkota-snow bg-white/5";
    }
  };

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${normalizedStatus === "DEVELOPMENT_BASELINE" ? "bg-alkota-signal animate-pulse" : "bg-white/40"}`} />
        <span className="text-alkota-snow/80">{getStatusText()}</span>
      </span>
    );
  }

  if (variant === "panel") {
    return (
      <div className={`p-3 border font-mono text-[10px] uppercase space-y-1 ${getStyles()} ${className}`}>
        <span className="text-alkota-slate block text-[8px] tracking-widest font-semibold">ENGINEERING STATUS</span>
        <span className="font-bold tracking-wider block">{getStatusText()}</span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border font-mono text-[9px] font-bold uppercase tracking-widest ${getStyles()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{getStatusText()}</span>
    </span>
  );
}
