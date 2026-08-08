"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { BikeConfiguration, FinishOption, FrameSize, WheelFormat } from "@/lib/configurator/types";
import { DEFAULT_CONFIG, FORK_OPTIONS, SHOCK_OPTIONS, DRIVETRAIN_OPTIONS, BRAKE_OPTIONS, WHEELSET_OPTIONS, TYRE_OPTIONS, COCKPIT_OPTIONS, DROPPER_OPTIONS } from "@/lib/configurator/configurationData";
import { generateBuildId } from "@/lib/configurator/buildIdGenerator";
import { CameraAnglePreset } from "@/components/three/CameraRig";
import { Check, Settings, ChevronRight, Info, Shield, Layers } from "lucide-react";

// Client-only dynamic import for 3D R3F Canvas to prevent SSR prerender errors
const ConfiguratorCanvas = dynamic(
  () => import("@/components/three/ConfiguratorCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] bg-alkota-carbon text-alkota-white flex flex-col items-center justify-center font-mono text-xs text-alkota-signal border border-white/10 tech-grid-dark space-y-2">
        <div className="w-4 h-4 rounded-full border-2 border-alkota-signal border-t-transparent animate-spin" />
        <span>INITIALIZING 3D ENGINE...</span>
      </div>
    ),
  }
);

export default function ConfiguratorPage() {
  const [config, setConfig] = useState<BikeConfiguration>(DEFAULT_CONFIG);
  const [activeStep, setActiveStep] = useState(0);
  const [cameraPreset, setCameraPreset] = useState<CameraAnglePreset>("SIDE");

  const buildId = generateBuildId(config);

  const steps = [
    { id: 0, label: "01 PLATFORM", name: "CHASSIS PLATFORM" },
    { id: 1, label: "02 SIZE", name: "FRAME SIZE" },
    { id: 2, label: "03 WHEEL FORMAT", name: "WHEEL FORMAT" },
    { id: 3, label: "04 FINISH", name: "FINISH TREATMENT" },
    { id: 4, label: "05 SUSPENSION", name: "SUSPENSION HARDWARE" },
    { id: 5, label: "06 DRIVETRAIN", name: "DRIVETRAIN SPEC" },
    { id: 6, label: "07 BRAKES", name: "BRAKE SYSTEM" },
    { id: 7, label: "08 WHEELS", name: "WHEELSET" },
    { id: 8, label: "09 TYRES", name: "TYRES" },
    { id: 9, label: "10 COCKPIT", name: "COCKPIT" },
    { id: 10, label: "11 DROPPER", name: "DROPPER POST" },
    { id: 11, label: "12 DETAILS", name: "HARDWARE DETAILS" },
    { id: 12, label: "13 SUMMARY", name: "BUILD SPEC SUMMARY" },
  ];

  const updateConfig = (key: keyof BikeConfiguration, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-alkota-carbon text-alkota-white pt-20 flex flex-col justify-between">
      {/* Top Application Bar */}
      <div className="bg-alkota-black border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between font-mono text-xs z-30">
        <div className="flex items-center space-x-3">
          <TechnicalAnnotation label="CONFIGURATOR" value="PROJECT 01" variant="signal" />
          <span className="text-alkota-slate hidden md:inline">
            BUILD ID: <strong className="text-alkota-white font-bold">{buildId}</strong>
          </span>
        </div>

        {/* Step Indicator Scroll */}
        <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`px-2 py-1 text-[10px] uppercase transition-colors whitespace-nowrap ${
                activeStep === step.id
                  ? "bg-alkota-signal text-alkota-black font-bold"
                  : "text-alkota-slate hover:text-white"
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-alkota-slate text-[11px] hidden sm:inline">STATUS: DEVELOPMENT SPEC</span>
        </div>
      </div>

      {/* Main Viewport & Control Panel Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        {/* Left/Center 3D Viewport Column */}
        <div className="lg:col-span-8 h-[50vh] lg:h-[calc(100vh-140px)] relative border-b lg:border-b-0 lg:border-r border-white/10">
          <ConfiguratorCanvas
            finish={config.finish}
            wheelFormat={config.wheelFormat}
            cameraPreset={cameraPreset}
            onCameraPresetChange={setCameraPreset}
            onFinishChange={(f) => updateConfig("finish", f)}
          />
        </div>

        {/* Right Configuration Controls Sidebar */}
        <div className="lg:col-span-4 bg-alkota-carbon p-6 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-140px)] border-t lg:border-t-0 border-white/10 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-[10px] text-alkota-signal uppercase">
                  STEP {activeStep + 1} OF 13
                </div>
                <h2 className="font-display text-xl font-bold text-alkota-white uppercase">
                  {steps[activeStep].name}
                </h2>
              </div>

              <div className="flex space-x-1 font-mono text-xs">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-2.5 py-1 border border-white/10 text-alkota-slate disabled:opacity-30 hover:text-white"
                >
                  PREV
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="px-2.5 py-1 bg-alkota-white text-alkota-black font-bold disabled:opacity-30 hover:bg-alkota-signal"
                >
                  NEXT
                </button>
              </div>
            </div>

            {/* STEP 01 — PLATFORM */}
            {activeStep === 0 && (
              <div className="space-y-4 font-sans text-xs">
                <div className="p-4 bg-alkota-black border border-alkota-signal space-y-2">
                  <div className="font-mono text-xs font-bold text-alkota-signal uppercase">
                    PROJECT 01 FLAGSHIP PLATFORM
                  </div>
                  <p className="text-alkota-slate leading-relaxed">
                    170mm Front / 160mm Rear Enduro Chassis. Engineered monocoque carbon frame designed for high-velocity alpine terrain.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 02 — FRAME SIZE */}
            {activeStep === 1 && (
              <div className="space-y-3 font-mono text-xs">
                {(["M", "L", "XL"] as FrameSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateConfig("frameSize", size)}
                    className={`w-full p-4 border text-left flex items-center justify-between transition-all ${
                      config.frameSize === size
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <span>SIZE {size}</span>
                    <span>{size === "M" ? "Reach 460mm" : size === "L" ? "Reach 485mm" : "Reach 510mm"}</span>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 03 — WHEEL FORMAT */}
            {activeStep === 2 && (
              <div className="space-y-3 font-mono text-xs">
                {[
                  { id: "MX-29-275", label: "MX FORMAT (29 Front / 27.5 Rear)", desc: "Maximum agility and cornering clearance." },
                  { id: "29-29", label: "29ER FORMAT (29 Front / 29 Rear)", desc: "Maximum rollover momentum and speed retention." },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => updateConfig("wheelFormat", fmt.id as WheelFormat)}
                    className={`w-full p-4 border text-left space-y-1 transition-all ${
                      config.wheelFormat === fmt.id
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div className="text-alkota-white font-bold">{fmt.label}</div>
                    <div className="font-sans text-[11px] text-alkota-slate">{fmt.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 04 — FINISH TREATMENT */}
            {activeStep === 3 && (
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                {(["GLACIER", "GRAPHITE", "CARBON", "LAB"] as FinishOption[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => updateConfig("finish", f)}
                    className={`p-4 border text-left space-y-2 transition-all ${
                      config.finish === f
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div className="text-[10px] text-alkota-slate uppercase">{f}</div>
                    <div className="text-alkota-white font-bold">{f} FINISH</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 05 — SUSPENSION */}
            {activeStep === 4 && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-2">
                  <div className="text-alkota-slate uppercase text-[10px]">FRONT FORK:</div>
                  {FORK_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => updateConfig("fork", f)}
                      className={`w-full p-3 border text-left space-y-1 ${
                        config.fork.id === f.id
                          ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white"
                          : "border-white/10 text-alkota-slate"
                      }`}
                    >
                      <div className="font-bold text-alkota-white">{f.name}</div>
                      <div className="font-sans text-[11px] text-alkota-slate">{f.description}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-alkota-slate uppercase text-[10px]">REAR SHOCK:</div>
                  {SHOCK_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => updateConfig("shock", s)}
                      className={`w-full p-3 border text-left space-y-1 ${
                        config.shock.id === s.id
                          ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white"
                          : "border-white/10 text-alkota-slate"
                      }`}
                    >
                      <div className="font-bold text-alkota-white">{s.name}</div>
                      <div className="font-sans text-[11px] text-alkota-slate">{s.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 06 — DRIVETRAIN */}
            {activeStep === 5 && (
              <div className="space-y-3 font-mono text-xs">
                {DRIVETRAIN_OPTIONS.map((dt) => (
                  <button
                    key={dt.id}
                    onClick={() => updateConfig("drivetrain", dt)}
                    className={`w-full p-4 border text-left space-y-1 ${
                      config.drivetrain.id === dt.id
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate"
                    }`}
                  >
                    <div className="text-alkota-white font-bold">{dt.name}</div>
                    <div className="font-sans text-[11px] text-alkota-slate">{dt.description}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 07 — BRAKES */}
            {activeStep === 6 && (
              <div className="space-y-3 font-mono text-xs">
                {BRAKE_OPTIONS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => updateConfig("brakes", b)}
                    className={`w-full p-4 border text-left space-y-1 ${
                      config.brakes.id === b.id
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate"
                    }`}
                  >
                    <div className="text-alkota-white font-bold">{b.name}</div>
                    <div className="font-sans text-[11px] text-alkota-slate">{b.description}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 08 — WHEELS */}
            {activeStep === 7 && (
              <div className="space-y-3 font-mono text-xs">
                {WHEELSET_OPTIONS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => updateConfig("wheelset", w)}
                    className={`w-full p-4 border text-left space-y-1 ${
                      config.wheelset.id === w.id
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate"
                    }`}
                  >
                    <div className="text-alkota-white font-bold">{w.name}</div>
                    <div className="font-sans text-[11px] text-alkota-slate">{w.description}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 09 — TYRES */}
            {activeStep === 8 && (
              <div className="space-y-3 font-mono text-xs">
                {TYRE_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateConfig("frontTyre", t)}
                    className={`w-full p-4 border text-left space-y-1 ${
                      config.frontTyre.id === t.id
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate"
                    }`}
                  >
                    <div className="text-alkota-white font-bold">{t.name}</div>
                    <div className="font-sans text-[11px] text-alkota-slate">{t.description}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 10 — COCKPIT */}
            {activeStep === 9 && (
              <div className="space-y-3 font-mono text-xs">
                {COCKPIT_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateConfig("cockpit", c)}
                    className={`w-full p-4 border text-left space-y-1 ${
                      config.cockpit.id === c.id
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate"
                    }`}
                  >
                    <div className="text-alkota-white font-bold">{c.name}</div>
                    <div className="font-sans text-[11px] text-alkota-slate">{c.description}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 11 — DROPPER */}
            {activeStep === 10 && (
              <div className="space-y-3 font-mono text-xs">
                {DROPPER_OPTIONS.map((dp) => (
                  <button
                    key={dp.id}
                    onClick={() => updateConfig("dropper", dp)}
                    className={`w-full p-4 border text-left space-y-1 ${
                      config.dropper.id === dp.id
                        ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-bold"
                        : "border-white/10 text-alkota-slate"
                    }`}
                  >
                    <div className="text-alkota-white font-bold">{dp.name}</div>
                    <div className="font-sans text-[11px] text-alkota-slate">{dp.description}</div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 12 — DETAILS */}
            {activeStep === 11 && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 bg-alkota-black border border-white/10 space-y-2">
                  <div className="font-bold text-alkota-signal uppercase">HARDWARE & PROTECTION</div>
                  <p className="font-sans text-xs text-alkota-slate leading-relaxed">
                    Grade 5 Titanium pivot bolts, integrated Downtube Polyurethane armor, and silent internal cable guides included by default.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 13 — SUMMARY */}
            {activeStep === 12 && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-alkota-black border border-alkota-signal space-y-3">
                  <div className="text-alkota-signal font-bold uppercase">COMPLETE BUILD SPECIFICATION</div>
                  <div className="space-y-1 text-alkota-slate">
                    <div>BUILD ID: <strong className="text-alkota-white">{buildId}</strong></div>
                    <div>SIZE: <strong className="text-alkota-white">{config.frameSize}</strong></div>
                    <div>WHEELS: <strong className="text-alkota-white">{config.wheelFormat}</strong></div>
                    <div>FINISH: <strong className="text-alkota-white">{config.finish}</strong></div>
                    <div>EST. WEIGHT: <strong className="text-alkota-signal">— KG</strong></div>
                    <div>EST. PRICE: <strong className="text-alkota-signal">£—</strong></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Live Summary Bar */}
          <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
            <div className="flex justify-between text-alkota-slate">
              <span>BUILD ID:</span>
              <span className="font-bold text-alkota-signal">{buildId}</span>
            </div>
            <div className="flex justify-between text-alkota-slate">
              <span>ESTIMATED WEIGHT:</span>
              <span className="font-bold text-alkota-white">— KG</span>
            </div>
            <div className="flex justify-between text-alkota-slate">
              <span>ESTIMATED PRICE:</span>
              <span className="font-bold text-alkota-white">£—</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
