import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface NextStepProps {
  stepNumber?: string;
  nextTitle: string;
  nextSubtitle: string;
  href: string;
  label?: string;
  ctaText?: string;
}

export default function NextStepBanner({
  stepNumber = "NEXT",
  nextTitle,
  nextSubtitle,
  href,
  label = "CONTINUE THE JOURNEY",
  ctaText = "PROCEED TO NEXT SECTION",
}: NextStepProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <Link
        href={href}
        className="group block bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all duration-300 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="bg-alkota-signal text-alkota-black px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                {stepNumber}
              </span>
              <span className="text-alkota-slate uppercase tracking-widest font-mono text-[11px]">
                {label}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-4xl text-white group-hover:text-alkota-signal transition-colors uppercase tracking-tight">
              {nextTitle}
            </h3>

            <p className="font-sans text-sm sm:text-base text-alkota-slate group-hover:text-alkota-snow/90 transition-colors font-light max-w-2xl">
              {nextSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider group-hover:text-white transition-colors flex-shrink-0 pt-4 md:pt-0">
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5 text-alkota-signal group-hover:translate-x-2 transition-transform" />
          </div>
        </div>

        {/* Subtle background tech grid effect */}
        <div className="absolute right-0 bottom-0 opacity-10 font-mono text-8xl font-bold text-white select-none pointer-events-none -mr-4 -mb-4">
          →
        </div>
      </Link>
    </section>
  );
}
