"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, AlertOctagon } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception for telemetry tracking
    console.error("[ALKOTA RUNTIME EXCEPTION]", error);
  }, [error]);

  return (
    <div className="w-full bg-[#0a0a0a] text-white min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-12 my-auto">
        {/* Header Rail */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <TechnicalAnnotation label="500 RUNTIME EXCEPTION" variant="signal" />
            <span className="font-mono text-xs text-[#647789] tracking-wider uppercase">
              APPLICATION_EXECUTION_ERROR
            </span>
          </div>
          {error.digest && (
            <span className="font-mono text-xs text-[#647789]">DIGEST: {error.digest}</span>
          )}
        </div>

        {/* Core Error Notice */}
        <div className="space-y-6">
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
            UNEXPECTED SYSTEM EXCEPTION
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#9ab0c4] max-w-2xl font-light leading-relaxed">
            An unhandled runtime error occurred during page rendering. The exception has been logged for engineering review.
          </p>
          {error.message && (
            <div className="p-4 bg-red-950/30 border border-red-500/30 font-mono text-xs text-red-400">
              {error.message}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-alkota-signal text-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>RETRY RENDERING</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-xs font-bold uppercase hover:border-white transition-colors"
          >
            <span>RETURN TO HOMEPAGE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
