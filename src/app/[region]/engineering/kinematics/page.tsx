import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import KinematicChart from "@/components/engineering/KinematicChart";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/engineering/kinematics",
    title: "Suspension Kinematics — Leverage Ratio, Anti-Squat & Axle Path",
    description: "A technical deep-dive into mountain bike suspension kinematics: leverage ratio and progression, anti-squat geometry, pedal kickback, rearward axle trajectory, and the engineering decisions that separate behaviour from travel numbers.",
  });
}

export default function KinematicsEngineeringPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Engineering", path: "/engineering" },
    { name: "Suspension Kinematics", path: "/engineering/kinematics" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="w-full bg-[#0a0a0a] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 space-y-4">
            <TechnicalAnnotation label="ENGINEERING PILLAR 02" value="SUSPENSION KINEMATICS" variant="signal" />
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              CONTROL THROUGH<br />
              <span className="text-[#647789]">MOTION.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#9ab0c4] font-light leading-relaxed">
              Travel is a dimension, not a specification. The dynamic behaviour of any rear suspension system is entirely determined by its kinematic geometry —
              the instantaneous mechanical advantage between wheel and shock, the chassis force balance under pedalling, and the trajectory the wheel traces
              through its travel arc. Understanding these relationships is the prerequisite to designing suspension that performs, rather than merely moves.
            </p>
          </div>

          {/* Diagram 2.1 — Four-Bar Linkage Geometry */}
          <div className="p-6 border border-white/15 bg-[#131313] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-[#647789]">
              <span className="text-alkota-signal font-bold uppercase">DIAGRAM 2.1 // LOW-PIVOT FOUR-BAR LINKAGE — FORCE VECTOR GEOMETRY</span>
              <span>GENERIC STRUCTURAL MODEL</span>
            </div>
            <div className="w-full overflow-hidden bg-black/60 p-4 border border-white/10">
              <svg viewBox="0 0 800 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Background grid */}
                <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid2)" />

                {/* Main pivot (BB area - low pivot) */}
                <circle cx="310" cy="280" r="10" fill="rgba(200,249,2,0.2)" stroke="#c8f902" strokeWidth="2"/>
                <text x="310" y="308" fill="#c8f902" fontSize="10" fontFamily="monospace" textAnchor="middle">MAIN PIVOT (LOW)</text>

                {/* Rocker / Idler */}
                <circle cx="440" cy="200" r="8" fill="rgba(255,255,255,0.1)" stroke="#eef4f8" strokeWidth="2"/>
                <text x="440" y="186" fill="#eef4f8" fontSize="10" fontFamily="monospace" textAnchor="middle">ROCKER PIVOT</text>

                {/* Upper link pivot */}
                <circle cx="380" cy="170" r="8" fill="rgba(255,255,255,0.1)" stroke="#eef4f8" strokeWidth="2"/>

                {/* Rear axle */}
                <circle cx="620" cy="300" r="16" fill="none" stroke="#9ab0c4" strokeWidth="2"/>
                <circle cx="620" cy="300" r="5" fill="#9ab0c4"/>
                <text x="620" y="333" fill="#9ab0c4" fontSize="10" fontFamily="monospace" textAnchor="middle">REAR AXLE</text>

                {/* Chainstay link */}
                <line x1="310" y1="280" x2="620" y2="300" stroke="#647789" strokeWidth="2.5" strokeDasharray="6 3"/>
                <text x="465" y="305" fill="#647789" fontSize="10" fontFamily="monospace" textAnchor="middle">CHAINSTAY</text>

                {/* Upper link */}
                <line x1="380" y1="170" x2="620" y2="300" stroke="#647789" strokeWidth="2.5" strokeDasharray="6 3"/>

                {/* Rocker shock connection */}
                <line x1="440" y1="200" x2="380" y2="170" stroke="#eef4f8" strokeWidth="2"/>
                <line x1="440" y1="200" x2="500" y2="160" stroke="#c8f902" strokeWidth="3" strokeDasharray="4 2"/>
                <text x="520" y="152" fill="#c8f902" fontSize="10" fontFamily="monospace">SHOCK STROKE</text>

                {/* Axle path arc */}
                <path d="M 620 300 Q 640 260 655 215 Q 665 175 660 140" fill="none" stroke="#c8f902" strokeWidth="2.5" strokeDasharray="8 4"/>
                <text x="672" y="220" fill="#c8f902" fontSize="10" fontFamily="monospace">REARWARD</text>
                <text x="672" y="232" fill="#c8f902" fontSize="10" fontFamily="monospace">AXLE PATH</text>

                {/* Anti-squat vector */}
                <defs>
                  <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#c8f902"/>
                  </marker>
                </defs>
                <line x1="310" y1="280" x2="160" y2="220" stroke="#c8f902" strokeWidth="2" markerEnd="url(#arrow2)"/>
                <text x="135" y="212" fill="#c8f902" fontSize="10" fontFamily="monospace" textAnchor="end">ANTI-SQUAT</text>
                <text x="135" y="224" fill="#c8f902" fontSize="10" fontFamily="monospace" textAnchor="end">FORCE VECTOR</text>

                {/* IC instantaneous centre */}
                <circle cx="130" cy="195" r="6" fill="rgba(200,249,2,0.3)" stroke="#c8f902" strokeWidth="1.5" strokeDasharray="3 2"/>
                <text x="100" y="183" fill="#c8f902" fontSize="9" fontFamily="monospace" textAnchor="middle">IC</text>
              </svg>
            </div>
            <p className="font-mono text-[11px] text-[#647789] leading-relaxed">
              Figure 2.1 — Low-pivot four-bar linkage schematic. The instantaneous centre (IC) position relative to the chain line defines anti-squat percentage.
              A rearward axle trajectory minimises pedal kickback; a forward trajectory maximises compliance under braking. The engineering trade-off between the two is resolved by the IC arc.
            </p>
          </div>

          {/* Deep Content Body */}
          <div className="space-y-8 font-sans text-sm sm:text-base text-[#9ab0c4] leading-relaxed font-light">

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">1. LEVERAGE RATIO & MECHANICAL ADVANTAGE</h2>
              <p>
                Leverage ratio (LR) describes the mechanical advantage between rear wheel vertical displacement and shock shaft compression at any given point in the travel arc.
                If the wheel moves 10 mm vertically and the shock shaft compresses 5 mm, the instantaneous leverage ratio at that point is 2.0:1.
                This ratio is never constant across a suspension system — it varies continuously from sag position to full compression, and the shape of that variation
                is called the <em>progression curve</em>.
              </p>
              <p>
                A linear leverage ratio produces identical shock sensitivity across the travel range — preferred for air-spring systems using external volume spacers as the primary
                progression mechanism. A progressively declining leverage ratio (ratio falls from sag through bottom-out) produces a rising spring rate through the travel — the chassis
                provides increasing resistance as it approaches full compression, preventing harsh bottom-outs without requiring excessive air pressure at sag.
                For coil-spring systems, a well-engineered progressive linkage geometry can provide equivalent progressivity without the need for dual-rate spring hardware.
              </p>
              <p>
                The magnitude of the ratio itself determines overall shock sensitivity: a high leverage ratio (3.0+) requires a short-stroke shock and produces large suspension movement
                from small input forces — compliant and active in character. A low ratio (1.5–2.0) requires a longer-stroke shock, produces a planted, direct feel, and
                is more tolerant of suspension friction.
              </p>
            </section>

            {/* Diagram 2.2 — Leverage curve chart (interactive, client) */}
            <div className="space-y-4">
              <div className="p-4 border border-white/10 bg-[#131313]">
                <p className="font-mono text-[11px] text-[#647789] mb-4 uppercase">SIMULATION OUTPUT 2.2 — LEVERAGE RATIO CURVE (DEVELOPMENT TARGET)</p>
                <KinematicChart type="leverage" />
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">2. ANTI-SQUAT GEOMETRY</h2>
              <p>
                Under pedalling, chain tension creates a forward and upward force through the drivetrain. Without kinematic compensation, this force compresses the rear suspension —
                a phenomenon known as pedal-induced squat. Anti-squat (AS) geometry quantifies how well the linkage uses drivetrain forces to resist suspension compression under power.
              </p>
              <p>
                Anti-squat percentage is calculated by determining the instantaneous centre (IC) of the rear suspension linkage and measuring the geometric relationship between the
                IC, the chain force vector (from the chainring to the rear sprocket), and the centre of gravity height. At 100% anti-squat, drivetrain forces exactly neutralise
                suspension compression — the chassis remains level under full pedalling load. Below 100%, the chassis squats; above 100%, it jacks (rises).
              </p>
              <p>
                Real-world target: 85–105% anti-squat at sag, declining gracefully through the travel arc. A system that maintains 100% anti-squat at all points in travel would
                transmit road texture directly into the drivetrain — traction-destroying under rough terrain. The ideal is a system that provides pedalling support at sag
                while retaining compliance at the extremes of travel.
              </p>
            </section>

            {/* Anti-squat chart */}
            <div className="space-y-4">
              <div className="p-4 border border-white/10 bg-[#131313]">
                <p className="font-mono text-[11px] text-[#647789] mb-4 uppercase">SIMULATION OUTPUT 2.3 — ANTI-SQUAT CURVE (DEVELOPMENT TARGET)</p>
                <KinematicChart type="antiSquat" />
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">3. REARWARD AXLE PATH & PEDAL KICKBACK</h2>
              <p>
                The axle path describes the arc traced by the rear axle centre as the suspension travels from fully extended to fully compressed.
                A rearward-sweeping path (axle moves back as the suspension compresses) reduces pedal kickback: because the chain length between chainring and cassette increases
                as the axle retreats, the effective chainstay extension compensates for shock-induced crank rotation.
              </p>
              <p>
                Pedal kickback — the backward rotation of the cranks caused by suspension compression without rider input — interrupts pedalling cadence on rough terrain.
                Systems with primarily forward or vertical axle paths exhibit significant kickback, forcing the rider to either absorb the pedal feedback or weight the cranks
                heavily. A rearward path reduces but does not eliminate kickback; an idler pulley in the lower link can neutralise chain force variation almost entirely,
                at a small weight and mechanical complexity penalty.
              </p>
            </section>

            {/* Axle path chart */}
            <div className="space-y-4">
              <div className="p-4 border border-white/10 bg-[#131313]">
                <p className="font-mono text-[11px] text-[#647789] mb-4 uppercase">SIMULATION OUTPUT 2.4 — REAR AXLE PATH (DEVELOPMENT TARGET)</p>
                <KinematicChart type="axlePath" />
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">4. WHY TRAVEL ≠ BEHAVIOUR</h2>
              <p>
                Two chassis with identical nominal travel figures can produce entirely different on-trail behaviour. A 150 mm rear travel system with a progressive leverage curve,
                high initial anti-squat, and a rearward axle path will absorb trail chop efficiently under power and resist bottom-outs under large impacts —
                behaviour associated with longer-travel all-mountain platforms.
              </p>
              <p>
                Conversely, a system with 160 mm travel, linear leverage, low anti-squat, and a forward axle path will feel active and compliant but pump and dive under hard pedalling —
                behaviour typically associated with trail bias designs oriented toward gravity riding.
              </p>
              <p>
                Suspension travel is an output boundary, not a performance characteristic. What determines performance is the kinematic architecture within that boundary —
                and that architecture is a product of deliberate engineering decisions made before a prototype is ever built.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">5. SIMULATION TO PHYSICAL VALIDATION</h2>
              <p>
                Kinematic modelling begins with a multi-body simulation: the four-bar linkage geometry is defined parametrically, with pivot positions as independent variables.
                The simulation outputs leverage curves, anti-squat curves at multiple chainring–sprocket combinations, axle path XY coordinates, and pedal kickback angles
                across the travel range.
              </p>
              <p>
                These simulation outputs drive the design. When prototype hardware is available, physical measurements — high-speed video analysis, strain gauging, and
                telemetry instrumentation at the shock shaft — validate or refute the model predictions. Discrepancies trigger revision of both the hardware and the simulation model.
                A claim is not a specification until both the model and the hardware agree.
              </p>
            </section>
          </div>

          {/* Related pillars */}
          <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/engineering/chassis" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">← PILLAR 01</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Chassis Architecture</p>
            </a>
            <a href="/engineering/materials" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">PILLAR 03 →</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Materials & Structures</p>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
