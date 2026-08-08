import React from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { FLAGSHIP_PROJECT_01, CANONICAL_FINISHES } from "@/lib/data/project01";
import { brandAssets } from "@/lib/assets";
import { ArrowRight, Settings, ShieldCheck, Layers } from "lucide-react";

const FINISH_IMAGES: Record<string, string> = {
  GLACIER: brandAssets.project01WhiteHero,
  CARBON: brandAssets.project01CarbonHero,
};

export default function BikesLandingPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="FLAGSHIP PLATFORM" value="ONE MACHINE" variant="signal" />
          <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            ONE PLATFORM.<br />
            <span className="text-alkota-signal">PROJECT 01.</span>
          </h1>
          <p className="font-mono text-xs sm:text-sm text-alkota-signal uppercase tracking-wider">
            ALL-MOUNTAIN / ENDURO CHASSIS • DEVELOPMENT REV 001
          </p>
          <p className="font-sans text-base sm:text-lg text-alkota-snow max-w-2xl font-light leading-relaxed">
            ALKOTA does not build dozens of models. We develop one machine—a single, uncompromising full-suspension carbon chassis engineered to excel across alpine terrain.
          </p>
        </div>

        {/* Hero Showcase Card */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                FLAGSHIP CHASSIS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-alkota-white uppercase">
                PROJECT 01
              </h2>
              <p className="font-mono text-xs text-alkota-slate uppercase">
                170MM FRONT / 160MM REAR • MX & 29 COMPATIBLE
              </p>
            </div>

            <div className="flex items-center space-x-4 font-mono text-xs">
              <Link
                href="/bikes/project-01"
                className="px-6 py-3 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center gap-2"
              >
                <span>EXPLORE PROJECT 01</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/configure"
                className="px-6 py-3 border border-white/20 text-alkota-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                <span>CONFIGURE</span>
              </Link>
            </div>
          </div>

          {/* Launch Finishes — two-image editorial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CANONICAL_FINISHES.map((finish) => (
              <div key={finish.id} className="group space-y-0">
                {/* Photo */}
                <div className="relative w-full h-[280px] sm:h-[360px] bg-alkota-carbon border border-white/10 overflow-hidden">
                  <Image
                    src={FINISH_IMAGES[finish.id]}
                    alt={`ALKOTA Project 01 ${finish.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/70 px-2.5 py-1 text-alkota-signal border border-white/10 uppercase">
                    FINISH {finish.code}
                  </div>
                </div>

                {/* Finish Info Panel */}
                <div className="bg-alkota-carbon border border-t-0 border-white/10 p-5 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-alkota-signal font-bold uppercase">{finish.name}</span>
                    <span className="text-alkota-slate uppercase text-[10px]">{finish.subtitle}</span>
                  </div>
                  <p className="text-alkota-snow/80 text-xs leading-relaxed font-light">{finish.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chassis Technical Strip */}
          <div className="border-t border-white/10 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            {[
              { label: "CHASSIS", value: "UD CARBON MONOCOQUE" },
              { label: "REAR TRAVEL", value: "160MM" },
              { label: "FRONT TRAVEL", value: "170MM" },
              { label: "WHEEL FORMAT", value: "MX / 29ER" },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <span className="text-alkota-slate uppercase text-[10px] block">{label}</span>
                <span className="text-alkota-white font-bold uppercase">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Statement Strip */}
        <div className="bg-alkota-black border border-white/10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <TechnicalAnnotation label="PLATFORM PHILOSOPHY" variant="signal" />
            <h2 className="font-display text-3xl sm:text-4xl font-medium uppercase text-alkota-white leading-tight">
              ONE BIKE.<br />
              <span className="text-alkota-slate">EVERY TERRAIN.</span>
            </h2>
            <p className="font-sans text-sm text-alkota-snow font-light leading-relaxed">
              Rather than proliferating model ranges, ALKOTA focuses entirely on making Project 01 the best possible all-mountain enduro platform. One machine. Perfected.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Layers,
                title: "MONOCOQUE CARBON",
                desc: "Full-carbon UD monocoque frame with integrated cable routing and co-molded downtube armor.",
              },
              {
                icon: ShieldCheck,
                title: "VALIDATED ON ALPINE TERRAIN",
                desc: "Prototype development and testing at 2,400m elevation under real race conditions.",
              },
              {
                icon: Settings,
                title: "CONFIGURABLE PLATFORM",
                desc: "Size M, L, XL. MX or full 29er wheel format. Two launch finishes.",
              },
              {
                icon: ArrowRight,
                title: "PRODUCTION DEVELOPMENT",
                desc: "REV 001 engineering specification approved. Production launch in development.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 bg-alkota-carbon border border-white/10 space-y-3 group hover:border-alkota-signal transition-all">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-alkota-signal" />
                  <span className="font-mono text-xs font-bold text-alkota-white uppercase">{title}</span>
                </div>
                <p className="font-sans text-xs text-alkota-slate leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
