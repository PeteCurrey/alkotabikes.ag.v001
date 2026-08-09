import React from "react";
import Link from "next/link";
import { ArrowRight, FileQuestion, ArrowLeft, ShieldAlert } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export const metadata = {
  title: "404 Route Not Found",
  description: "The requested route does not exist in the Alkota Cycles platform index.",
};

export default function NotFound() {
  return (
    <div className="w-full bg-[#0a0a0a] text-white min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-12 my-auto">
        {/* Header Rail */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <TechnicalAnnotation label="404 ERROR" variant="signal" />
            <span className="font-mono text-xs text-[#647789] tracking-wider uppercase">
              ROUTE_NOT_FOUND // PLATFORM_INDEX_EXCEPTION
            </span>
          </div>
          <span className="font-mono text-xs text-[#647789]">SYS_REF: 404-NULL</span>
        </div>

        {/* Core Notice */}
        <div className="space-y-6">
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
            SPECIFICATION OR ROUTE DOES NOT EXIST
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#9ab0c4] max-w-2xl font-light leading-relaxed">
            The URL path you requested is not indexed within the Alkota Performance Engineering platform. 
            The page may have been moved, renamed during consolidation, or exists outside the public baseline.
          </p>
        </div>

        {/* Quick Navigation Targets */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="font-mono text-xs text-[#647789] uppercase tracking-widest">
            RECOMMENDED DESTINATIONS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/bikes/project-01"
              className="p-5 border border-white/10 bg-white/5 hover:border-alkota-signal transition-colors group space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-xs text-white font-bold uppercase">
                <span>PROJECT 01 PLATFORM</span>
                <ArrowRight className="w-4 h-4 text-alkota-signal group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#647789]">
                Explore the baseline specification and chassis architecture of Project 01.
              </p>
            </Link>

            <Link
              href="/engineering"
              className="p-5 border border-white/10 bg-white/5 hover:border-alkota-signal transition-colors group space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-xs text-white font-bold uppercase">
                <span>ENGINEERING PILLARS</span>
                <ArrowRight className="w-4 h-4 text-alkota-signal group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#647789]">
                Chassis monocoque, low-pivot kinematics, materials, and test methodology.
              </p>
            </Link>

            <Link
              href="/journal"
              className="p-5 border border-white/10 bg-white/5 hover:border-alkota-signal transition-colors group space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-xs text-white font-bold uppercase">
                <span>ENGINEERING JOURNAL</span>
                <ArrowRight className="w-4 h-4 text-alkota-signal group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#647789]">
                Technical dispatches, design archive, and development telemetry records.
              </p>
            </Link>

            <Link
              href="/order"
              className="p-5 border border-alkota-signal/50 bg-alkota-signal/10 hover:border-alkota-signal transition-colors group space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-xs text-white font-bold uppercase">
                <span>REGISTER FOR PROJECT 01</span>
                <ArrowRight className="w-4 h-4 text-alkota-signal group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-[#647789]">
                Join the allocation registry ahead of planned 2028 production.
              </p>
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#647789] hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOMEPAGE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
