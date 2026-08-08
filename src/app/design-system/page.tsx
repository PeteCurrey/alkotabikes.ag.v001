"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import Logo from "@/components/brand/Logo";
import { ArrowRight, Settings, Check, Layers, Cpu, Eye, Box } from "lucide-react";

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const colors = [
    { name: "--alkota-white", hex: "#F4F6F7", class: "bg-alkota-white text-alkota-black" },
    { name: "--alkota-snow", hex: "#ECEFF1", class: "bg-alkota-snow text-alkota-black" },
    { name: "--alkota-slate", hex: "#737C84", class: "bg-alkota-slate text-white" },
    { name: "--alkota-graphite", hex: "#282D31", class: "bg-alkota-graphite text-white" },
    { name: "--alkota-carbon", hex: "#0B0D0F", class: "bg-alkota-carbon text-white" },
    { name: "--alkota-black", hex: "#050607", class: "bg-alkota-black text-white" },
    { name: "--alkota-ice", hex: "#A8C6D8", class: "bg-alkota-ice text-alkota-black" },
    { name: "--alkota-signal", hex: "#647789", class: "bg-alkota-signal text-alkota-black" },
  ];

  return (
    <div
      className={`w-full min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-alkota-carbon text-alkota-white tech-grid-dark" : "bg-alkota-white text-alkota-black tech-grid-light"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-current pb-8">
          <div className="space-y-3">
            <TechnicalAnnotation label="DEV SHOWCASE" value="DESIGN SYSTEM" variant="signal" />
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight">
              ALKOTA DESIGN SYSTEM
            </h1>
            <p className="font-mono text-xs opacity-70">
              DEVELOPMENT COMPONENT LIBRARY & DESIGN TOKENS SHOWCASE
            </p>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 border border-current font-mono text-xs uppercase font-bold self-start sm:self-auto"
          >
            TOGGLE PREVIEW THEME: {theme.toUpperCase()}
          </button>
        </div>

        {/* 1. BRAND LOGO VARIANTS */}
        <div className="space-y-6">
          <h2 className="font-mono text-xs text-alkota-signal uppercase tracking-wider">
            01 BRAND LOGO ARCHITECTURE
          </h2>
          <div className="p-8 border border-current space-y-8 bg-current/5">
            <div>
              <div className="font-mono text-[10px] opacity-60 mb-2">HEADER VARIANT</div>
              <Logo variant="header" />
            </div>
            <div>
              <div className="font-mono text-[10px] opacity-60 mb-2">FOOTER VARIANT</div>
              <Logo variant="footer" />
            </div>
            <div>
              <div className="font-mono text-[10px] opacity-60 mb-2">HERO DISPLAY VARIANT</div>
              <Logo variant="hero" />
            </div>
          </div>
        </div>

        {/* 2. COLOR SWATCHES */}
        <div className="space-y-6">
          <h2 className="font-mono text-xs text-alkota-signal uppercase tracking-wider">
            02 COLOR TOKENS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div key={c.name} className={`p-4 border border-current font-mono text-xs ${c.class}`}>
                <div className="font-bold">{c.name}</div>
                <div className="opacity-70 text-[10px]">{c.hex}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. TYPOGRAPHY HIERARCHY */}
        <div className="space-y-6">
          <h2 className="font-mono text-xs text-alkota-signal uppercase tracking-wider">
            03 TYPOGRAPHY SYSTEM
          </h2>
          <div className="p-8 border border-current space-y-6 bg-current/5 font-sans">
            <div>
              <div className="font-mono text-[10px] opacity-60">DISPLAY (SPACE GROTESK) — H1 72PX</div>
              <div className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight">
                PERFORMANCE IS ENGINEERED.
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] opacity-60">HEADLINE — H2 36PX</div>
              <div className="font-display font-bold text-3xl uppercase tracking-tight">
                ONE MACHINE. NO DISTRACTIONS.
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] opacity-60">BODY (INTER) — 16PX</div>
              <p className="font-sans text-base max-w-2xl font-light leading-relaxed">
                ALKOTA begins with one flagship platform. One chassis developed to climb efficiently, descend with conviction and adapt to the way its rider chooses to build it.
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] opacity-60">TECHNICAL / DATA (IBM PLEX MONO) — 12PX</div>
              <div className="font-mono text-xs text-alkota-signal">
                PROJECT / 01 • CHASSIS / REV 001 • STATUS / DEVELOPMENT
              </div>
            </div>
          </div>
        </div>

        {/* 4. BUTTONS & INTERACTION STATES */}
        <div className="space-y-6">
          <h2 className="font-mono text-xs text-alkota-signal uppercase tracking-wider">
            04 BUTTON & ACTION STATES
          </h2>
          <div className="flex flex-wrap gap-4 p-8 border border-current bg-current/5">
            <button className="px-6 py-3 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>PRIMARY SIGNAL CTA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="px-6 py-3 bg-alkota-white text-alkota-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>SECONDARY WHITE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="px-6 py-3 border border-current text-current font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-alkota-signal" />
              <span>OUTLINE CONFIGURATOR</span>
            </button>
          </div>
        </div>

        {/* 5. TECHNICAL ANNOTATIONS & LABELS */}
        <div className="space-y-6">
          <h2 className="font-mono text-xs text-alkota-signal uppercase tracking-wider">
            05 TECHNICAL ANNOTATIONS
          </h2>
          <div className="flex flex-wrap gap-3 p-8 border border-current bg-current/5">
            <TechnicalAnnotation label="PROJECT / 01" value="REV 001" variant="signal" />
            <TechnicalAnnotation label="MATERIAL" value="UD CARBON" variant="dark" />
            <TechnicalAnnotation label="STATUS" value="DEVELOPMENT" variant="slate" />
            <TechnicalAnnotation label="DEMONSTRATION DATA" variant="subtle" />
          </div>
        </div>
      </div>
    </div>
  );
}
