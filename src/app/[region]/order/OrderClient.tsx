"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, AlertCircle, ChevronDown, Lock, ShieldCheck, Layers, Settings, HelpCircle } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import DevelopmentStatusTicker from "@/components/ui/DevelopmentStatusTicker";
import RoadTo2028Strip from "@/components/editorial/RoadTo2028Strip";
import PublishingCadence from "@/components/editorial/PublishingCadence";
import { brandAssets } from "@/lib/assets";
import { useRegion } from "@/components/region/RegionProvider";
import { toCanonicalHeightCm, toCanonicalWeightKg } from "@/lib/units";

// Commercial Flag
export const ENABLE_PROJECT01_RESERVATIONS = false;

// ─── 7-Stage Order Journey ───────────────────────────────────────────────────
const JOURNEY_STAGES = [
  {
    number: "01",
    label: "REGISTER",
    headline: "TELL US WHO YOU ARE.",
    copy: "Join the Project 01 development register. Tell us where you ride, what you ride now and what you would want from an Alkota. No payment is required at this stage.",
    status: "OPEN NOW",
    statusVariant: "signal",
  },
  {
    number: "02",
    label: "FOLLOW",
    headline: "WATCH THE MACHINE TAKE SHAPE.",
    copy: "Registered customers receive the meaningful development story: geometry, prototypes, engineering revisions, components, testing, racing, and production milestones. Not marketing noise.",
    status: "IN PROGRAMME",
    statusVariant: "slate",
  },
  {
    number: "03",
    label: "PRIORITY",
    headline: "GET THERE BEFORE THE QUEUE.",
    copy: "When production reservations open, Project 01 Register members will receive priority access before wider public ordering.",
    status: "REGISTERED MEMBERS",
    statusVariant: "slate",
  },
  {
    number: "04",
    label: "RESERVE",
    headline: "SECURE A PRODUCTION POSITION.",
    copy: "Formal reservations will open once Project 01 reaches the appropriate development and validation milestone. Reservation terms, deposit requirements and refund conditions will be published before any payment is taken.",
    status: "NOT YET OPEN",
    statusVariant: "slate",
  },
  {
    number: "05",
    label: "CONFIGURE",
    headline: "MAKE PROJECT 01 YOURS.",
    copy: "Once the production specification is mature enough to lock, customers will confirm the meaningful variables: frame size, finish, component package, cockpit, contact points, and approved options.",
    status: "DEVELOPMENT CONFIGURATOR",
    statusVariant: "slate",
    cta: { label: "PREVIEW CONFIGURATION", href: "/configure" },
  },
  {
    number: "06",
    label: "BUILD LOCK",
    headline: "FREEZE THE MACHINE.",
    copy: "Once final specification, pricing and production timing are agreed, the customer confirms the build. From that point the bicycle enters the production programme.",
    status: "PLANNED",
    statusVariant: "slate",
  },
  {
    number: "07",
    label: "DELIVERY",
    headline: "FROM PROJECT TO YOUR TRAIL.",
    copy: "Project 01 production launch is planned for 2028. Exact production and delivery timing will be confirmed once manufacturing release and allocation scheduling are complete.",
    status: "PLANNED 2028",
    statusVariant: "slate",
  },
];

// ─── FAQ Items ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "WHEN WILL PROJECT 01 LAUNCH?",
    a: "Production launch is planned for 2028, subject to completion of the engineering and validation programme.",
  },
  {
    q: "CAN I ORDER A BIKE TODAY?",
    a: "You can join the Project 01 development register today. Formal production reservations will open later in the programme.",
  },
  {
    q: "DO I HAVE TO PAY NOW?",
    a: "No. Joining the current Project 01 Register does not require payment.",
  },
  {
    q: "IS THE CURRENT SPECIFICATION FINAL?",
    a: "No. Project 01 remains in pre-production development.",
  },
  {
    q: "WHY REGISTER THIS EARLY?",
    a: "Because we want the people most interested in the machine to be part of the journey rather than appearing only when the buy button goes live.",
  },
  {
    q: "WILL REGISTERED CUSTOMERS GET PRIORITY?",
    a: "Registered customers are intended to receive early access to formal production reservation opportunities.",
  },
  {
    q: "CAN I CHOOSE MY SPECIFICATION?",
    a: "The final ordering process is intended to include meaningful configuration. Available options will be confirmed as the production specification is finalised.",
  },
  {
    q: "WHAT IF PROJECT 01 CHANGES?",
    a: "We tell you. Development changes are part of the programme and will be documented through the Project 01 Journal.",
  },
  {
    q: "WHEN WILL PRICING BE ANNOUNCED?",
    a: "Final pricing will be published once the production specification and manufacturing programme are sufficiently mature.",
  },
  {
    q: "WHERE WILL ALKOTA DELIVER?",
    a: "Initial market availability will be confirmed before production reservations open.",
  },
];

export default function OrderClient() {
  const { regionCode } = useRegion();
  const isUS = regionCode === "us";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: isUS ? "United States" : "United Kingdom",
    postcode: "",
    heightCm: "",
    heightFt: "",
    heightIn: "",
    weightKg: "",
    weightLb: "",
    ridingStyle: "All Mountain",
    terrain: "Steep technical",
    currentBike: "",
    currentSize: "",
    yearsRiding: "",
    preferredFinish: "Glacier White",
    expectedSize: "L",
    productInterest: "Complete bike",
    purchaseIntent: "I intend to buy when production opens",
    region: regionCode.toUpperCase(),
    customerNotes: "",
    developmentAcknowledgement: false,
    marketingConsent: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const buildRef = params.get("buildRef");
      const finish = params.get("finish");
      const size = params.get("size");

      if (buildRef || finish || size) {
        setForm((prev) => ({
          ...prev,
          preferredFinish: finish === "GLACIER" ? "Glacier White" : finish === "CARBON" ? "Naked Carbon" : prev.preferredFinish,
          expectedSize: size || prev.expectedSize,
          customerNotes: buildRef ? `Configured with build reference: ${buildRef}` : prev.customerNotes,
        }));
      }
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [foundingNumber, setFoundingNumber] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.firstName || !form.lastName || !form.email || !form.country) {
      setErrorMsg("Please complete all required fields (*).");
      return;
    }

    if (!form.developmentAcknowledgement) {
      setErrorMsg("Please acknowledge the pre-production development statement before submitting.");
      return;
    }

    setLoading(true);

    try {
      // Calculate canonical metric values at boundary
      let canonicalHeight = form.heightCm;
      let canonicalWeight = form.weightKg;

      if (isUS || form.heightFt || form.heightIn) {
        const feet = parseFloat(form.heightFt || "0");
        const inches = parseFloat(form.heightIn || "0");
        if (feet > 0 || inches > 0) {
          canonicalHeight = `${toCanonicalHeightCm({ region: "us", feet, inches })} cm`;
        }
      }
      if (isUS || form.weightLb) {
        const lb = parseFloat(form.weightLb || "0");
        if (lb > 0) {
          canonicalWeight = `${toCanonicalWeightKg({ region: "us", lb })} kg`;
        }
      }

      const payload = {
        ...form,
        heightCm: canonicalHeight || form.heightCm,
        weightKg: canonicalWeight || form.weightKg,
        region: regionCode.toUpperCase(),
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process registration.");
      }

      setSuccessRef(data.reference);
      setFoundingNumber(data.foundingNumber || 42);
      setLoading(false);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark space-y-20">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Glacier White + Naked Carbon Visuals
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TechnicalAnnotation label="PROJECT 01" value="DEVELOPMENT REGISTER" variant="signal" />
            <span className="bg-alkota-signal/10 border border-alkota-signal/40 text-alkota-signal font-mono text-[9px] px-2.5 py-1 uppercase font-bold tracking-widest">
              PRE-PRODUCTION DEVELOPMENT
            </span>
            <span className="bg-white/5 border border-white/15 text-alkota-snow font-mono text-[9px] px-2.5 py-1 uppercase tracking-widest">
              PLANNED PRODUCTION / 2028
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            YOUR BIKE STARTS<br />
            <span className="text-alkota-signal">BEFORE THE BUILD.</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-2xl font-light leading-relaxed">
            Project 01 is still being engineered. Production is planned for 2028. Until then, the Project 01 Register gives prospective owners a way to follow the programme, tell us what they want from the bike and receive priority access when formal production reservations open.
          </p>

          <DevelopmentStatusTicker variant="compact" className="max-w-2xl" />

          <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
            <a
              href="#registration-form"
              className="px-8 py-4 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-all shadow-xl flex items-center gap-2"
            >
              <span>JOIN PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/journal/project-01"
              className="px-6 py-4 border border-white/20 text-alkota-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-all flex items-center gap-2"
            >
              <span>FOLLOW THE DEVELOPMENT</span>
              <ArrowRight className="w-3.5 h-3.5 text-alkota-signal" />
            </Link>
          </div>
        </div>

        {/* Hero Visual Showcase — Glacier White & Naked Carbon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full h-[320px] sm:h-[420px] bg-alkota-black border border-white/10 overflow-hidden group shadow-2xl">
            <Image
              src={brandAssets.project01WhiteHero}
              alt="Project 01 Glacier White Finish"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal border border-white/10 uppercase font-bold">
              FINISH 01 · GLACIER WHITE
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-alkota-slate bg-black/80 px-2.5 py-1 border border-white/10 uppercase">
              R00 ENGINEERING BASELINE
            </div>
          </div>

          <div className="relative w-full h-[320px] sm:h-[420px] bg-alkota-black border border-white/10 overflow-hidden group shadow-2xl">
            <Image
              src={brandAssets.project01CarbonHero}
              alt="Project 01 Naked Carbon Finish"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-snow border border-white/10 uppercase font-bold">
              FINISH 02 · NAKED CARBON
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-alkota-slate bg-black/80 px-2.5 py-1 border border-white/10 uppercase">
              RAW TORAYCA UD LAYUP
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION — THIS IS NOT A NORMAL CHECKOUT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-alkota-black border border-white/10 p-8 sm:p-12 md:p-16 space-y-8 shadow-2xl relative">
          <TechnicalAnnotation label="COMMERCIAL PHILOSOPHY" value="PRE-PRODUCTION DISCLOSURE" variant="signal" />

          <h2 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.95]">
            THIS IS NOT<br />
            <span className="text-alkota-signal">A NORMAL CHECKOUT.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4 font-sans text-base text-alkota-snow/90 font-light leading-relaxed">
              <p>
                A normal bicycle order starts with a finished specification. Project 01 does not.
              </p>
              <p>
                Geometry is being validated. Components remain under review. Prototype development comes next. The race programme is planned for 2027.
              </p>
              <p>
                So rather than pretending every answer already exists, we are opening the door earlier. Register now. Follow the development. When the bike reaches the appropriate stage, registered customers will receive priority access to the production programme.
              </p>
            </div>

            <div className="lg:col-span-5 bg-alkota-carbon border border-alkota-signal/40 p-6 space-y-4 font-mono">
              <span className="text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
                DEVELOPMENT MANIFESTO
              </span>
              <p className="text-lg font-bold text-white uppercase tracking-tight leading-snug">
                YOU ARE NOT BUYING A RENDER.
              </p>
              <p className="text-base text-alkota-signal uppercase tracking-tight font-semibold">
                YOU ARE JOINING THE PROCESS THAT TURNS IT INTO A BICYCLE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7-STAGE SEVEN-CHAPTER ORDER JOURNEY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-white/10 pb-6 space-y-2">
          <TechnicalAnnotation label="ORDER ARCHITECTURE" value="7-STAGE PIPELINE" variant="signal" />
          <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white">
            THE ROUTE FROM RESERVATION TO DELIVERY.
          </h2>
        </div>

        <div className="space-y-6">
          {JOURNEY_STAGES.map((stage) => (
            <div
              key={stage.number}
              className="bg-alkota-black border border-white/10 p-6 md:p-10 space-y-4 hover:border-alkota-signal/50 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-bold text-alkota-signal">
                    {stage.number}
                  </span>
                  <span className="text-xs text-alkota-slate">·</span>
                  <span className="text-xs font-bold text-alkota-white uppercase tracking-widest">
                    {stage.label}
                  </span>
                </div>

                <span className="text-[10px] px-2.5 py-1 border border-white/20 text-alkota-slate uppercase tracking-widest font-mono">
                  {stage.status}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {stage.headline}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-alkota-slate font-light leading-relaxed">
                    {stage.copy}
                  </p>
                </div>

                {stage.cta && (
                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <Link
                      href={stage.cta.href}
                      className="px-5 py-3 border border-alkota-signal text-alkota-signal hover:bg-alkota-signal hover:text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <span>{stage.cta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PROJECT 01 REGISTRATION FORM (Or Success State)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="registration-form" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {successRef ? (
          /* SUCCESS VIEW */
          <div className="bg-alkota-black border border-alkota-signal p-8 sm:p-14 space-y-8 shadow-2xl tech-grid-dark animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-alkota-signal text-alkota-black flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
                  REGISTRATION CONFIRMED
                </span>
                <span className="font-mono text-xs text-alkota-slate uppercase">
                  DEVELOPMENT REGISTER REFERENCE
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display font-bold text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
                WELCOME TO<br />
                <span className="text-alkota-signal">PROJECT 01.</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-alkota-carbon border border-alkota-signal/50 p-5 font-mono text-sm space-y-1">
                  <span className="text-alkota-signal uppercase text-[10px] font-bold tracking-widest block">
                    PERMANENT FOUNDING NUMBER:
                  </span>
                  <span className="text-white font-bold text-3xl tracking-wider block">
                    FOUNDER #{String(foundingNumber ?? 42).padStart(4, "0")}
                  </span>
                  <span className="text-alkota-slate text-[10px] block pt-1">
                    Permanent human-facing sequential founding position.
                  </span>
                </div>

                <div className="bg-alkota-carbon border border-white/10 p-5 font-mono text-sm space-y-1">
                  <span className="text-alkota-slate uppercase text-[10px] block">
                    DEVELOPMENT REGISTER REFERENCE:
                  </span>
                  <span className="text-alkota-signal font-bold text-xl tracking-wider block">
                    {successRef}
                  </span>
                  <span className="text-alkota-slate text-[10px] block pt-1">
                    Non-commercial register record. Holds your priority allocation notification position.
                  </span>
                </div>
              </div>

              <p className="font-sans text-base text-alkota-snow/90 leading-relaxed font-light">
                You are now on the development register. We will keep you informed as the programme moves through engineering, prototype development, racing and production.
              </p>
            </div>

            <PublishingCadence variant="compact" />

            <div className="border-t border-white/10 pt-8 space-y-4">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
                WHAT TO DO NEXT:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <Link
                  href="/journal/project-01"
                  className="p-4 bg-alkota-carbon border border-white/10 hover:border-alkota-signal text-alkota-white font-bold uppercase transition-colors flex items-center justify-between"
                >
                  <span>READ JOURNAL</span>
                  <ArrowRight className="w-4 h-4 text-alkota-signal" />
                </Link>

                <Link
                  href="/road-to-2028"
                  className="p-4 bg-alkota-carbon border border-white/10 hover:border-alkota-signal text-alkota-white font-bold uppercase transition-colors flex items-center justify-between"
                >
                  <span>ROAD TO 2028</span>
                  <ArrowRight className="w-4 h-4 text-alkota-signal" />
                </Link>

                <Link
                  href="/racing"
                  className="p-4 bg-alkota-carbon border border-white/10 hover:border-alkota-signal text-alkota-white font-bold uppercase transition-colors flex items-center justify-between"
                >
                  <span>ALKOTA RACING</span>
                  <ArrowRight className="w-4 h-4 text-alkota-signal" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="bg-alkota-black border border-white/10 p-8 sm:p-12 space-y-10 shadow-2xl tech-grid-dark">
            <div className="border-b border-white/10 pb-6 space-y-2">
              <TechnicalAnnotation label="STEP 01" value="DEVELOPMENT REGISTRATION FORM" variant="signal" />
              <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white">
                JOIN THE PROJECT 01 REGISTER.
              </h2>
              <p className="font-sans text-sm text-alkota-slate font-light">
                Please complete your details below to register your intended build and enter the pre-production queue.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-950/50 border border-red-500/50 text-red-200 font-mono text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12 font-mono">
              {/* SECTION A — ABOUT YOU */}
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-alkota-signal uppercase tracking-widest">
                    SECTION A — ABOUT YOU
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      TELEPHONE (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 7000 000000"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      COUNTRY *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={form.country}
                      onChange={handleChange}
                      placeholder="United Kingdom"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      POSTCODE / ZIP (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={form.postcode}
                      onChange={handleChange}
                      placeholder="Postcode / ZIP"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION B — YOUR RIDING */}
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-alkota-signal uppercase tracking-widest">
                    SECTION B — YOUR RIDING
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  {isUS ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-alkota-slate uppercase tracking-wider block">
                          RIDER HEIGHT (FT / IN) *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            name="heightFt"
                            required
                            placeholder="Ft (e.g. 5)"
                            value={form.heightFt}
                            onChange={handleChange}
                            className="w-1/2 bg-alkota-carbon border border-white/15 px-3 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                          />
                          <input
                            type="number"
                            name="heightIn"
                            required
                            placeholder="In (e.g. 11)"
                            value={form.heightIn}
                            onChange={handleChange}
                            className="w-1/2 bg-alkota-carbon border border-white/15 px-3 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-alkota-slate uppercase tracking-wider block">
                          WEIGHT (LB, OPTIONAL)
                        </label>
                        <input
                          type="number"
                          name="weightLb"
                          value={form.weightLb}
                          onChange={handleChange}
                          placeholder="e.g. 165 lb"
                          className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-alkota-slate uppercase tracking-wider block">
                          RIDER HEIGHT (CM) *
                        </label>
                        <input
                          type="text"
                          name="heightCm"
                          required
                          value={form.heightCm}
                          onChange={handleChange}
                          placeholder="e.g. 182 cm"
                          className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-alkota-slate uppercase tracking-wider block">
                          WEIGHT (KG, OPTIONAL)
                        </label>
                        <input
                          type="text"
                          name="weightKg"
                          value={form.weightKg}
                          onChange={handleChange}
                          placeholder="e.g. 80 kg"
                          className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      PRIMARY RIDING DISCIPLINE *
                    </label>
                    <select
                      name="ridingStyle"
                      value={form.ridingStyle}
                      onChange={handleChange}
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none"
                    >
                      <option value="Trail">Trail</option>
                      <option value="All Mountain">All Mountain</option>
                      <option value="Enduro">Enduro</option>
                      <option value="Bike Park">Bike Park</option>
                      <option value="Natural / Technical">Natural / Technical</option>
                      <option value="Mixed">Mixed</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      TYPICAL TERRAIN *
                    </label>
                    <select
                      name="terrain"
                      value={form.terrain}
                      onChange={handleChange}
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none"
                    >
                      <option value="Steep technical">Steep technical</option>
                      <option value="Fast open">Fast open</option>
                      <option value="Rock">Rock</option>
                      <option value="Roots / woodland">Roots / woodland</option>
                      <option value="Bike park">Bike park</option>
                      <option value="Alpine">Alpine</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      CURRENT BIKE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      name="currentBike"
                      value={form.currentBike}
                      onChange={handleChange}
                      placeholder="Make & model"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      CURRENT FRAME SIZE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      name="currentSize"
                      value={form.currentSize}
                      onChange={handleChange}
                      placeholder="S / M / L / XL"
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C — PROJECT 01 PREFERENCES */}
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-alkota-signal uppercase tracking-widest">
                    SECTION C — PROJECT 01 PREFERENCES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      PREFERRED FINISH *
                    </label>
                    <select
                      name="preferredFinish"
                      value={form.preferredFinish}
                      onChange={handleChange}
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none"
                    >
                      <option value="Glacier White">Glacier White</option>
                      <option value="Naked Carbon">Naked Carbon</option>
                      <option value="Undecided">Undecided</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      EXPECTED FRAME SIZE *
                    </label>
                    <select
                      name="expectedSize"
                      value={form.expectedSize}
                      onChange={handleChange}
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none"
                    >
                      <option value="S">Size S (Small)</option>
                      <option value="M">Size M (Medium)</option>
                      <option value="L">Size L (Large)</option>
                      <option value="XL">Size XL (X-Large)</option>
                      <option value="Unsure">Unsure</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      PRIMARY PRODUCT INTEREST *
                    </label>
                    <select
                      name="productInterest"
                      value={form.productInterest}
                      onChange={handleChange}
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none"
                    >
                      <option value="Complete bike">Complete bike</option>
                      <option value="Frame option if offered">Frame option if offered</option>
                      <option value="Undecided">Undecided</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-alkota-slate uppercase tracking-wider block">
                      PURCHASE INTENT *
                    </label>
                    <select
                      name="purchaseIntent"
                      value={form.purchaseIntent}
                      onChange={handleChange}
                      className="w-full bg-alkota-carbon border border-white/15 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none"
                    >
                      <option value="I intend to buy when production opens">I intend to buy when production opens</option>
                      <option value="Strong interest">Strong interest</option>
                      <option value="Following the development">Following the development</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION D — TELL US MORE */}
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-alkota-signal uppercase tracking-widest">
                    SECTION D — TELL US MORE
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="text-alkota-slate uppercase tracking-wider block">
                    WHAT WOULD MAKE PROJECT 01 THE RIGHT BIKE FOR YOU? (OPTIONAL)
                  </label>
                  <textarea
                    name="customerNotes"
                    rows={4}
                    value={form.customerNotes}
                    onChange={handleChange}
                    placeholder="Tell us what you ride, what your current bike does well and what you would change..."
                    className="w-full bg-alkota-carbon border border-white/15 p-4 text-white focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/50 font-sans"
                  />
                </div>
              </div>

              {/* MANDATORY CONSENT & ACKNOWLEDGEMENTS */}
              <div className="bg-alkota-carbon border border-white/15 p-6 space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="devAck"
                    name="developmentAcknowledgement"
                    checked={form.developmentAcknowledgement}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 bg-black border-white/30 text-alkota-signal focus:ring-0 rounded-none cursor-pointer"
                  />
                  <label htmlFor="devAck" className="text-alkota-snow leading-relaxed font-light cursor-pointer">
                    <strong className="font-bold text-white uppercase font-mono block text-[11px] mb-0.5">
                      PRE-PRODUCTION DISCLOSURE ACKNOWLEDGEMENT *
                    </strong>
                    I understand that Project 01 is currently a pre-production development programme and that specification, pricing, timing and availability may change before production release.
                  </label>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                  <input
                    type="checkbox"
                    id="mktConsent"
                    name="marketingConsent"
                    checked={form.marketingConsent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 bg-black border-white/30 text-alkota-signal focus:ring-0 rounded-none cursor-pointer"
                  />
                  <label htmlFor="mktConsent" className="text-alkota-slate leading-relaxed font-light cursor-pointer">
                    I would like to receive Project 01 development updates, engineering journal entries and production announcements. (Optional)
                  </label>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-alkota-signal text-alkota-black font-mono font-bold text-sm tracking-wider uppercase hover:bg-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>REGISTERING BUILD INTENT...</span>
                ) : (
                  <>
                    <span>JOIN PROJECT 01 REGISTER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ROAD TO 2028 STRIP INTEGRATION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoadTo2028Strip />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SUBSTANTIAL FAQ SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/10 pb-4 space-y-2">
          <TechnicalAnnotation label="FREQUENTLY ASKED QUESTIONS" value="PRE-PRODUCTION PROGRAMME" variant="signal" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
            PROGRAMME FAQ & ANSWERS.
          </h2>
        </div>

        <div className="space-y-4 font-mono">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-alkota-black border border-white/10 overflow-hidden transition-colors hover:border-white/25"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm uppercase text-white hover:text-alkota-signal transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-alkota-signal text-xs">{(i + 1).toString().padStart(2, "0")}</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-alkota-signal transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 font-sans text-sm text-alkota-slate leading-relaxed font-light border-t border-white/10 mt-2 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-alkota-black border border-white/10 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden tech-grid-dark">
          <TechnicalAnnotation label="JOIN THE PROGRAMME" value="PLANNED PRODUCTION 2028" variant="signal" />
          <h2 className="font-display font-bold text-4xl sm:text-6xl uppercase text-white tracking-tight leading-none">
            COME ALONG<br />
            <span className="text-alkota-signal">FOR THE BUILD.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-alkota-slate max-w-2xl mx-auto font-light leading-relaxed">
            The production bike arrives in 2028. The story is already underway.
          </p>
          <div className="pt-2">
            <a
              href="#registration-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-xl"
            >
              <span>JOIN PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
