import React from "react";

interface TechnicalAnnotationProps {
  label: string;
  value?: string;
  variant?: "signal" | "slate" | "subtle" | "dark";
  className?: string;
}

export default function TechnicalAnnotation({
  label,
  value,
  variant = "subtle",
  className = "",
}: TechnicalAnnotationProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "signal":
        return "border-alkota-signal/40 bg-alkota-signal/10 text-alkota-signal";
      case "slate":
        return "border-alkota-slate/40 bg-alkota-slate/10 text-alkota-slate";
      case "dark":
        return "border-white/10 bg-alkota-carbon text-alkota-snow";
      case "subtle":
      default:
        return "border-black/10 bg-black/5 text-alkota-graphite dark:border-white/10 dark:bg-white/5 dark:text-alkota-slate";
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase backdrop-blur-sm ${getVariantStyles()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      <span>{label}</span>
      {value && (
        <>
          <span className="opacity-40">/</span>
          <span className="font-semibold text-alkota-black dark:text-alkota-white">
            {value}
          </span>
        </>
      )}
    </div>
  );
}
