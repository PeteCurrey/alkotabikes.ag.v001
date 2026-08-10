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
          <div className="space-y-10 font-sans text-sm sm:text-base text-[#9ab0c4] leading-relaxed font-light">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">1. MONOCOQUE VS TUBE-TO-TUBE CONSTRUCTION</h2>
              <p>
                Two primary manufacturing paradigms govern carbon fiber chassis production: full monocoque molding and bonded tube-to-tube assembly. 
                In a monocoque architecture, the front triangle (or complete frame) is laid up inside a single continuous aluminum female mold cavity using expandable internal bladders. 
                This eliminates mechanical joints, continuous fibers flow unimpeded around critical stress nodes (such as the headtube junction and bottom bracket core), and structural wall thickness can be continuous without bond gaps or artificial thickness transitions.
              </p>
              <p>
                Conversely, tube-to-tube construction relies on pre-cured carbon tubes bonded together with wrapped joint overwraps. 
                While tube-to-tube allows rapid geometry customization for custom one-off frames without investing in expensive aluminum toolsets, it introduces lap joints that create severe stress concentration points and add parasitic adhesive weight. 
                For aggressive all-mountain chassis applications subject to high impact velocity, full monocoque construction yields vastly superior strength-to-weight ratios and structural reliability under high-cycle fatigue loading.
              </p>
              <p>
                Furthermore, monocoque molding enables variable internal mandrel bladder pressure up to 12 bar during cure. This high compaction ratio consolidates prepreg layers, expelling void pockets and resin-rich zones that otherwise act as crack initiation sites under cyclic stress.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">2. FIBER ORIENTATION &amp; LOAD PATH ALIGNMENT</h2>
              <p>
                Unidirectional (UD) carbon fiber possesses exceptional tensile strength strictly along the direction of its constituent filaments. 
                Consequently, chassis engineering requires mapping complex multi-axis load cases into precise ply orientation schedules across every millimeter of the frame surface. 
                Fibers laid at 0° relative to the tube axis resist axial bending under heavy braking and landing compressions; fibers laid at ±45° provide torsional resistance against twisting moments during out-of-saddle sprinting and hard off-camber cornering; 
                and 90° hoop plies prevent structural crushing under localized rock strike impacts.
              </p>
              <p>
                By layering different ply angles in specific sequences—placing high-modulus 0° fibers along the top of the downtube and bottom of the toptube where tension forces peak—the chassis is optimized for real-world impact vectors without adding unnecessary dead material where stress is minimal.
              </p>
              <p>
                In high-stress transition regions such as the shock mount cradle and main pivot junction, multi-axial plies (0°/45°/-45°/90°) are interleaved to distribute point loads into the surrounding wall structure seamlessly, preventing inter-laminar shear failure under shock bottom-out spikes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">3. TORSIONAL VS LATERAL RIGIDITY &amp; TUNED COMPLIANCE</h2>
              <p>
                A common misconception in mountain bicycle frame design is that maximum stiffness in all planes equals maximum performance. In truth, an infinitely stiff frame deflects violently off off-camber roots and wet rock gardens, resulting in severe rider fatigue, arm pump, and loss of directional control.
              </p>
              <p>
                The primary engineering objective is asymmetric compliance: maximizing torsional rigidity between the headtube and rear axle to keep wheels tracking accurately in deep ruts, 
                while engineering controlled lateral and vertical flex into the seatstays and upper rocker link. Controlled vertical compliance allows the chassis to deform slightly under high lateral impact, keeping the tire contact patch planted on uneven terrain.
              </p>
              <p>
                Achieving this dynamic equilibrium requires separate structural tuning of the top tube and seatstays. Flattened tube profiles with thin wall plies along the vertical plane allow micro-deflection under chassis chatter, acting as an unsprung structural damper that works in harmony with the rear shock absorber.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">4. THREADED BSA INTERFACES &amp; PIVOT BEARING SELECTION</h2>
              <p>
                Press-fit bottom bracket standards (such as BB92 or PF30) rely on tight manufacturing tolerances inside composite shells. Over time, micro-deformations under pedaling torque lead to shell wall wear, creaking, and accelerated bearing looseness. 
                A threaded BSA 73mm bottom bracket interface utilizes a co-molded or bonded aluminum insert with precision threads. This guarantees zero creaking, extends bearing life, and allows straightforward workshop maintenance with standard shop tools.
              </p>
              <p>
                Similarly, suspension pivot architecture demands full-complement (MAX) sealed cartridge bearings with no ball retainers, allowing for 30–40% higher static load capacity compared to standard radial bearings. 
                Dual-sealed pivot hardware with collet-expanding axle pins prevents shaft wear and eliminates lateral pivot slop under heavy G-out compressions.
              </p>
              <p>
                By housing bearings inside precision-machined aluminum caps recessed into carbon pivot bosses, bearing press fits are completely isolated from composite tolerances, ensuring silky rotation and zero frame bore ovalization throughout years of hard riding.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">5. STRUCTURAL ANALYSIS &amp; FEA MESH CONVERGENCE</h2>
              <p>
                Before physical molds are cut, Finite Element Analysis (FEA) models subject digital chassis representations to simulated real-world ISO 4210 load cases alongside extreme over-test impact vectors. 
                Von Mises stress distribution maps identify structural stress concentrations, guiding ply additions and relief cutouts prior to physical prototype layup.
              </p>
              <p>
                Mesh convergence testing ensures that stress predictions around small-radius transitions—such as internal cable routing ports and brake mount posts—reflect realistic strain gradients rather than mathematical artifacts. 
                Simulated drop tests at 1.5x EN safety standards validate total structural energy absorption capacity before physical fatigue rig testing commences.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">6. COMPOSITE IMPACT DYNAMICS &amp; GALVANIC ISOLATION</h2>
              <p>
                Carbon fiber composites excel under fatigue and high-cycle tensile loads but require protection against localized rock strike impacts on the downtube belly. 
                Co-curing outer protective scrim layers containing high-impact woven glass or aramid fibers disperses strike energy across a broader surface area, preventing outer laminate delamination.
              </p>
              <p>
                Furthermore, direct contact between carbon fiber and aluminum hardware creates a galvanic potential difference that induces rapid aluminum corrosion in wet, salty environments. 
                Engineered fiberglass barrier plies (non-conductive 0.1mm glass cloth) are interleaved at all metallic insertion points—such as bottle cage rivnuts, brake mounts, and pivot bearing sleeves—completely isolating carbon fibers from metal hardware.
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
