import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Chassis Engineering & Monocoque Architecture",
  description:
    "An exhaustive technical analysis of mountain bike chassis design: monocoque vs tube-to-tube construction, fiber orientation, load paths, torsional vs lateral stiffness, BSA threaded interfaces, and pivot bearing selection.",
  alternates: {
    canonical: `${siteUrl}/engineering/chassis`,
  },
  openGraph: {
    title: "Chassis Engineering & Monocoque Architecture",
    description:
      "An exhaustive technical analysis of mountain bike chassis design: monocoque vs tube-to-tube construction, fiber orientation, load paths, torsional vs lateral stiffness, BSA threaded interfaces, and pivot bearing selection.",
    url: `${siteUrl}/engineering/chassis`,
  },
};

export default function ChassisEngineeringPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Engineering", path: "/engineering" },
    { name: "Chassis Architecture", path: "/engineering/chassis" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="w-full bg-[#0a0a0a] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 space-y-4">
            <TechnicalAnnotation label="ENGINEERING PILLAR 01" value="CHASSIS ARCHITECTURE" variant="signal" />
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              CHASSIS ARCHITECTURE &amp; LOAD PATHS
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#9ab0c4] font-light leading-relaxed">
              In high-performance mountain bicycle design, the frame is not merely a skeleton to join components. 
              It is a dynamic structural shell that must simultaneously withstand immense torsional forces during cornering, absorb micro-vibrations, and maintain precise alignment under high G-load compression.
            </p>
          </div>

          {/* Inline SVG Diagram 1: Chassis Load Path & Compliance Spectrum */}
          <div className="p-6 border border-white/15 bg-[#131313] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-[#647789]">
              <span className="text-alkota-signal font-bold uppercase">DIAGRAM 1.1 // CHASSIS STIFFNESS &amp; LOAD VECTOR DISTRIBUTION</span>
              <span>GENERIC STRUCTURAL MODEL</span>
            </div>

            <div className="w-full overflow-hidden bg-black/60 p-4 border border-white/10">
              <svg viewBox="0 0 800 350" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Background grid */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Frame Geometry Skeleton Line */}
                <path d="M 150 260 L 320 260 L 450 140 L 680 140 L 320 260 L 370 70 L 680 140 L 450 140 L 370 70 L 150 260" 
                      fill="none" stroke="#647789" strokeWidth="2" strokeDasharray="4 4"/>

                {/* Torsional Rigidity Vector Headtube */}
                <circle cx="680" cy="140" r="16" fill="none" stroke="#eef4f8" strokeWidth="2"/>
                <path d="M 680 110 L 680 170 M 650 140 L 710 140" stroke="#eef4f8" strokeWidth="1.5"/>
                <text x="680" y="95" fill="#eef4f8" fontSize="11" fontFamily="monospace" textAnchor="middle">HEADTUBE NODE (HIGH TORSIONAL RIGIDITY)</text>

                {/* Vertical Compliance Vector Seatstays */}
                <path d="M 150 260 Q 300 200 450 140" fill="none" stroke="#c8f902" strokeWidth="3"/>
                <text x="280" y="180" fill="#c8f902" fontSize="11" fontFamily="monospace">TUNED VERTICAL COMPLIANCE ZONE</text>

                {/* BB Shell High Transfer Rigidity */}
                <circle cx="320" cy="260" r="22" fill="rgba(200,249,2,0.15)" stroke="#c8f902" strokeWidth="2"/>
                <text x="320" y="300" fill="#c8f902" fontSize="11" fontFamily="monospace" textAnchor="middle">BSA 73MM BB NODE (MAX LATERAL STIFFNESS)</text>

                {/* Forces Vectors */}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#c8f902"/>
                  </marker>
                </defs>
                <line x1="680" y1="140" x2="740" y2="200" stroke="#c8f902" strokeWidth="2.5" markerEnd="url(#arrow)"/>
                <line x1="150" y1="260" x2="90" y2="260" stroke="#c8f902" strokeWidth="2.5" markerEnd="url(#arrow)"/>
                <text x="740" y="220" fill="#c8f902" fontSize="10" fontFamily="monospace">FORK IMPACT FORCE VECTOR</text>
              </svg>
            </div>
            <p className="font-mono text-[11px] text-[#647789] leading-relaxed">
              Figure 1.1 — Structural node isolation. High torsional stiffness is prioritized at the headtube and bottom bracket junction to maintain line precision, while vertical compliance is engineered into the upper stay architecture.
            </p>
          </div>

          {/* Deep Content Body */}
          <div className="space-y-8 font-sans text-sm sm:text-base text-[#9ab0c4] leading-relaxed font-light">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">1. MONOCOQUE VS TUBE-TO-TUBE CONSTRUCTION</h2>
              <p>
                Two primary manufacturing paradigms govern carbon fiber chassis production: full monocoque molding and bonded tube-to-tube assembly. 
                In a monocoque architecture, the front triangle (or complete frame) is laid up inside a single continuous aluminum female mold cavity using expandable internal bladders. 
                This eliminates mechanical joints, continuous fibers flow unimpeded around critical stress nodes (such as the headtube junction and bottom bracket core), and structural wall thickness can be continuous without bond gaps.
              </p>
              <p>
                Conversely, tube-to-tube construction relies on pre-cured carbon tubes bonded together with wrapped joint overwraps. 
                While tube-to-tube allows rapid geometry customization for custom one-off frames, it introduces lap joints that create stress concentrations and add parasitic adhesive weight. 
                For aggressive all-mountain chassis applications, full monocoque construction yields superior strength-to-weight ratios and structural reliability under fatigue loading.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">2. FIBER ORIENTATION &amp; LOAD PATH ALIGNMENT</h2>
              <p>
                Unidirectional (UD) carbon fiber possesses exceptional tensile strength strictly along the direction of its fibers. 
                Consequently, chassis engineering requires mapping complex multi-axis load cases into precise ply orientation schedules. 
                Fibers laid at 0° relative to the tube axis resist axial bending; fibers laid at ±45° provide torsional resistance against twisting moments during out-of-saddle sprinting and hard cornering; 
                and 90° hoop plies prevent structural crushing under localized impact loads.
              </p>
              <p>
                By layering different ply angles in specific sequences—placing high-tensile 0° fibers along the top of the downtube and bottom of the toptube—the chassis is optimized for real-world impact vectors without adding unnecessary material where stress is minimal.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">3. TORSIONAL VS LATERAL RIGIDITY &amp; TUNED COMPLIANCE</h2>
              <p>
                A common misconception in bicycle design is that maximum stiffness in all planes equals maximum performance. In truth, an infinitely stiff frame deflects violently off off-camber roots and rocks, resulting in rider fatigue and loss of traction.
              </p>
              <p>
                The engineering objective is asymmetric compliance: maximizing torsional rigidity between the headtube and rear axle to keep wheels tracking accurately in deep ruts, 
                while engineering controlled lateral and vertical flex into the seatstays. Controlled vertical compliance allows the chassis to deform slightly under lateral impact, keeping the tire patch planted on uneven terrain.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">4. THREADED BSA INTERFACES &amp; PIVOT BEARING SELECTION</h2>
              <p>
                Press-fit bottom bracket standards (such as BB92 or PF30) rely on tight manufacturing tolerances inside carbon shells. Over time, micro-deformations under pedaling torque lead to creaking and bearing looseness. 
                A threaded BSA 73mm bottom bracket interface utilizes a co-molded or bonded aluminum insert with precision threads. This guarantees zero creaking, extends bearing life, and allows straightforward workshop maintenance with standard tools.
              </p>
              <p>
                Similarly, suspension pivot architecture demands full-complement (MAX) sealed cartridge bearings with no ball retainers, allowing for 30–40% higher static load capacity compared to standard radial bearings. 
                Dual-sealed pivot hardware with collet-expanding axle pins prevents shaft wear and eliminates lateral pivot slop under heavy G-out compressions.
              </p>
            </section>
          </div>

          {/* Related pillars */}
          <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/engineering" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">↑ ALL PILLARS</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Engineering Index</p>
            </a>
            <a href="/engineering/kinematics" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">PILLAR 02 →</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Suspension Kinematics</p>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
