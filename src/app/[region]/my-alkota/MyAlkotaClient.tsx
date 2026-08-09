"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Settings,
  FileText,
  Ruler,
  Calendar,
  ChevronRight,
  Lock,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
  Clock,
  AlertCircle,
  BookOpen,
  Wrench,
  LayoutGrid,
  LogOut,
} from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import DevelopmentStatusTicker from "@/components/ui/DevelopmentStatusTicker";

// ─── Authentication state (passwordless / local-first placeholder) ────────────
// This is a pre-production portal. Full authentication (e.g. email magic link)
// will be wired when the platform reaches the appropriate milestone.
// For now: registration-reference driven local session is shown.

interface PortalSession {
  registrationRef: string;
  email: string;
  registeredAt: string;
  preferredFinish: "CARBON" | "GLACIER WHITE";
  preferredSize: string;
  fitReference: string | null;
  buildSaved: boolean;
}

const DEV_MEMBER_BADGE = "PROJECT 01 DEVELOPMENT MEMBER";

const ROADMAP_ITEMS = [
  {
    code: "RM-01",
    label: "ENGINEERING BASELINE R00",
    status: "COMPLETE",
    variant: "signal" as const,
    date: "2025",
  },
  {
    code: "RM-02",
    label: "PROTOTYPE BUILD PROGRAMME",
    status: "IN PROGRESS",
    variant: "signal" as const,
    date: "2025–2026",
  },
  {
    code: "RM-03",
    label: "RACE PROGRAMME VALIDATION",
    status: "PLANNED",
    variant: "slate" as const,
    date: "2027",
  },
  {
    code: "RM-04",
    label: "PRODUCTION SPECIFICATION LOCK",
    status: "PLANNED",
    variant: "slate" as const,
    date: "2027–2028",
  },
  {
    code: "RM-05",
    label: "PRODUCTION RELEASE",
    status: "PLANNED",
    variant: "slate" as const,
    date: "2028",
  },
];

const PORTAL_SECTIONS = [
  {
    id: "build",
    icon: Settings,
    label: "YOUR BUILD",
    href: "/configure",
    description: "Review or update your saved configuration.",
    cta: "OPEN CONFIGURATOR",
    available: true,
  },
  {
    id: "fit",
    icon: Ruler,
    label: "YOUR FIT",
    href: "/fit",
    description: "Your Rider Fit result and size direction.",
    cta: "REVIEW FIT",
    available: true,
  },
  {
    id: "journal",
    icon: BookOpen,
    label: "DEVELOPMENT JOURNAL",
    href: "/journal/project-01",
    description: "Engineering updates, prototype notes and revisions.",
    cta: "READ JOURNAL",
    available: true,
  },
  {
    id: "roadmap",
    icon: Calendar,
    label: "ROAD TO 2028",
    href: "/road-to-2028",
    description: "Full development programme timeline.",
    cta: "SEE ROADMAP",
    available: true,
  },
  {
    id: "docs",
    icon: FileText,
    label: "TECHNICAL DOCUMENTS",
    href: "#",
    description: "Owner documentation and service guides.",
    cta: "COMING WITH PRODUCTION",
    available: false,
  },
  {
    id: "service",
    icon: Wrench,
    label: "SERVICE RECORDS",
    href: "#",
    description: "Service history and warranty tracking.",
    cta: "COMING WITH PRODUCTION",
    available: false,
  },
];

// ─── Auth Gate ────────────────────────────────────────────────────────────────

function AuthGate({ onSignIn }: { onSignIn: (ref: string, email: string) => void }) {
  const [ref, setRef] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"entry" | "check" | "error">("entry");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ref.trim().length >= 4 && email.includes("@")) {
      setStep("check");
      // Simulate async verification
      setTimeout(() => {
        onSignIn(ref.trim().toUpperCase(), email.trim().toLowerCase());
      }, 1200);
    } else {
      setStep("error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-alkota-carbon text-alkota-white pt-20 flex flex-col">
      <DevelopmentStatusTicker />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-md space-y-8">
          {/* Identity */}
          <div className="space-y-4 text-center">
            <TechnicalAnnotation
              label="ALKOTA OWNER PORTAL"
              value="PRE-PRODUCTION"
              variant="signal"
            />
            <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
              YOUR MACHINE.
              <br />
              <span className="text-alkota-signal">YOUR RECORD.</span>
            </h1>
            <p className="font-sans text-sm text-alkota-snow/80 font-light leading-relaxed">
              Enter your Project 01 registration reference and email to access
              your development member portal.
            </p>
          </div>

          {/* Notice */}
          <div className="bg-alkota-black/60 border border-white/10 p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-alkota-signal flex-shrink-0 mt-0.5" />
            <div className="font-mono text-[10px] text-alkota-slate leading-relaxed uppercase">
              <span className="text-alkota-signal font-bold">DEVELOPMENT PORTAL. </span>
              Full authentication (passwordless email link) will be enabled when
              the portal reaches production milestone. Access is currently
              reference-based.
            </div>
          </div>

          {/* Sign-in form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
                REGISTRATION REFERENCE
              </label>
              <input
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="P01-REG-XXXXXX"
                className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/50 focus:outline-none focus:border-alkota-signal transition-colors uppercase"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-alkota-slate/50 focus:outline-none focus:border-alkota-signal transition-colors"
                required
              />
            </div>

            {step === "error" && (
              <p className="font-mono text-[10px] text-red-400 uppercase">
                Please enter a valid registration reference and email.
              </p>
            )}

            <button
              type="submit"
              disabled={step === "check"}
              className="w-full bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider py-3.5 hover:bg-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {step === "check" ? (
                <>
                  <span className="w-3 h-3 border border-alkota-black/40 border-t-alkota-black rounded-full animate-spin" />
                  VERIFYING...
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  ACCESS MY ALKOTA
                </>
              )}
            </button>
          </form>

          {/* Not registered? */}
          <div className="text-center space-y-2 pt-2 border-t border-white/10">
            <p className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
              Not yet registered?
            </p>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal hover:text-white uppercase font-bold transition-colors"
            >
              <span>JOIN THE PROJECT 01 REGISTER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({
  session,
  onSignOut,
}: {
  session: PortalSession;
  onSignOut: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyRef = () => {
    navigator.clipboard.writeText(session.registrationRef).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="w-full min-h-screen bg-alkota-carbon text-alkota-white pt-20">
      <DevelopmentStatusTicker />

      {/* Portal header */}
      <div className="bg-alkota-black border-b border-white/10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="space-y-1">
            <TechnicalAnnotation
              label="MY ALKOTA"
              value={DEV_MEMBER_BADGE}
              variant="signal"
            />
            <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white leading-[0.95]">
              YOUR MACHINE.
              <br />
              <span className="text-alkota-signal">YOUR RECORD.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/configure"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              CONFIGURATOR
            </Link>
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/20 text-alkota-slate font-mono text-xs uppercase tracking-wider hover:text-white hover:border-white/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              SIGN OUT
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Membership card */}
        <div className="bg-alkota-black border border-white/10 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-alkota-signal/10 border border-alkota-signal/30 flex items-center justify-center">
                <User className="w-4 h-4 text-alkota-signal" />
              </div>
              <div>
                <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                  Development Member
                </div>
                <div className="font-mono text-xs text-alkota-snow uppercase font-bold">
                  {session.email}
                </div>
              </div>
            </div>

            {/* Registration reference */}
            <div className="bg-alkota-carbon border border-white/10 p-4 space-y-1">
              <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                Registration Reference
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-alkota-signal font-bold tracking-widest">
                  {session.registrationRef}
                </span>
                <button
                  onClick={copyRef}
                  className="text-alkota-slate hover:text-white transition-colors"
                  aria-label="Copy reference"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-alkota-signal" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Build summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-alkota-carbon border border-white/10 p-3 space-y-1">
                <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                  Preferred Finish
                </div>
                <div className="font-mono text-xs text-white font-bold uppercase">
                  {session.preferredFinish}
                </div>
              </div>
              <div className="bg-alkota-carbon border border-white/10 p-3 space-y-1">
                <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                  Size Direction
                </div>
                <div className="font-mono text-xs text-white font-bold uppercase">
                  {session.preferredSize}
                </div>
              </div>
              <div className="bg-alkota-carbon border border-white/10 p-3 space-y-1">
                <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                  Fit Reference
                </div>
                <div className="font-mono text-xs text-white font-bold uppercase">
                  {session.fitReference ?? "NOT YET CALCULATED"}
                </div>
              </div>
              <div className="bg-alkota-carbon border border-white/10 p-3 space-y-1">
                <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                  Build Saved
                </div>
                <div className="font-mono text-xs text-white font-bold uppercase">
                  {session.buildSaved ? "YES" : "NOT YET CONFIGURED"}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <div className="bg-alkota-signal/5 border border-alkota-signal/30 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-alkota-signal" />
                <span className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
                  Member Status
                </span>
              </div>
              <div className="font-display font-bold text-lg text-white uppercase">
                DEVELOPMENT
                <br />
                REGISTRANT
              </div>
              <div className="font-mono text-[9px] text-alkota-slate leading-relaxed uppercase">
                Priority access when production
                <br />
                reservations open.
              </div>
            </div>
            <div className="bg-alkota-black border border-white/10 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-alkota-slate" />
                <span className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                  Registered
                </span>
              </div>
              <div className="font-mono text-xs text-white font-bold">
                {session.registeredAt}
              </div>
            </div>
          </div>
        </div>

        {/* Portal sections */}
        <div>
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-3 mb-6 font-semibold">
            PORTAL SECTIONS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTAL_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className={`border p-6 space-y-4 transition-all ${
                    section.available
                      ? "border-white/10 hover:border-alkota-signal/40 bg-alkota-black group cursor-pointer"
                      : "border-white/5 bg-alkota-black/30 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      className={`w-5 h-5 ${
                        section.available ? "text-alkota-signal" : "text-alkota-slate"
                      }`}
                    />
                    {!section.available && (
                      <Lock className="w-3.5 h-3.5 text-alkota-slate/50" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                      {section.label}
                    </div>
                    <p className="font-sans text-xs text-alkota-snow/80 font-light leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  {section.available ? (
                    <Link
                      href={section.href}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] text-alkota-signal hover:text-white uppercase font-bold transition-colors"
                    >
                      <span>{section.cta}</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-alkota-slate uppercase">
                      <span>{section.cta}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Development roadmap */}
        <div>
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-3 mb-6 font-semibold">
            PRODUCTION ROADMAP
          </div>
          <div className="space-y-2">
            {ROADMAP_ITEMS.map((item, i) => (
              <div
                key={item.code}
                className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
              >
                <div className="font-mono text-[9px] text-alkota-slate uppercase w-14 flex-shrink-0">
                  {item.code}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-xs text-white uppercase font-semibold">
                    {item.label}
                  </div>
                  <div className="font-mono text-[9px] text-alkota-slate uppercase mt-0.5">
                    {item.date}
                  </div>
                </div>
                <div
                  className={`font-mono text-[9px] uppercase font-bold px-2.5 py-1 border flex-shrink-0 ${
                    item.variant === "signal"
                      ? "border-alkota-signal/40 text-alkota-signal bg-alkota-signal/5"
                      : "border-white/10 text-alkota-slate"
                  }`}
                >
                  {item.status}
                </div>
                {/* Timeline connector */}
                {i < ROADMAP_ITEMS.length - 1 && (
                  <span className="sr-only">↓</span>
                )}
              </div>
            ))}
          </div>
          <Link
            href="/road-to-2028"
            className="inline-flex items-center gap-2 mt-4 font-mono text-xs text-alkota-signal hover:text-white uppercase font-bold transition-colors"
          >
            <span>FULL ROAD TO 2028 PROGRAMME</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* What's coming */}
        <div className="bg-alkota-black border border-white/10 p-6 sm:p-8 space-y-4">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase font-semibold">
            COMING TO THIS PORTAL
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Production reservation",
              "Individual machine record",
              "Owner documentation",
              "Service history",
              "Warranty tracking",
              "Technical bulletins",
              "Component update tracking",
              "Partner network access",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 font-mono text-xs text-alkota-slate uppercase"
              >
                <div className="w-1 h-1 rounded-full bg-alkota-slate flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Portal ──────────────────────────────────────────────────────────────

export default function MyAlkotaClient() {
  const [session, setSession] = useState<PortalSession | null>(null);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("alkota-portal-session");
      if (stored) {
        setSession(JSON.parse(stored) as PortalSession);
      }
    } catch {
      // sessionStorage unavailable — proceed without session
    }
  }, []);

  const handleSignIn = (ref: string, email: string) => {
    const newSession: PortalSession = {
      registrationRef: ref,
      email,
      registeredAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      preferredFinish: "CARBON",
      preferredSize: "L",
      fitReference: null,
      buildSaved: false,
    };
    try {
      sessionStorage.setItem("alkota-portal-session", JSON.stringify(newSession));
    } catch {
      // ignore
    }
    setSession(newSession);
  };

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem("alkota-portal-session");
    } catch {
      // ignore
    }
    setSession(null);
  };

  if (!session) {
    return <AuthGate onSignIn={handleSignIn} />;
  }

  return <Dashboard session={session} onSignOut={handleSignOut} />;
}
