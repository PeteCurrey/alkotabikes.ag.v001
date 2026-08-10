"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight, CheckCircle2, Lock, Mail, ShieldAlert } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function PortalLoginClient({ region }: { region: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) return;

    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { error: authErr } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/${region}/partners/portal`,
          },
        });
        if (authErr) {
          setError(authErr.message);
          setLoading(false);
          return;
        }
      } else {
        // Dev fallback simulation
        await new Promise((r) => setTimeout(r, 800));
      }

      setLoading(false);
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Failed to transmit magic link.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <TechnicalAnnotation label="SECURITY GATEWAY" value="PARTNER AUTH" variant="signal" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight text-white">
            PARTNER PORTAL
          </h1>
          <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
            Passwordless magic-link authentication for authorised members of the Alkota Partner Network.
          </p>
        </div>

        {sent ? (
          <div className="bg-alkota-black border border-alkota-signal p-8 space-y-4 text-center font-mono text-xs">
            <CheckCircle2 className="w-8 h-8 text-alkota-signal mx-auto" />
            <div className="font-bold text-white uppercase text-sm">MAGIC LINK TRANSMITTED</div>
            <p className="font-sans text-xs text-alkota-slate leading-relaxed font-light">
              We have dispatched a single-use authentication link to <strong>{email}</strong>. Please check your inbox to access the portal.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-alkota-signal underline hover:text-white uppercase font-bold text-[11px]"
            >
              USE A DIFFERENT EMAIL
            </button>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="bg-alkota-black border border-white/15 p-6 sm:p-8 space-y-6 font-mono text-xs">
            <div className="space-y-2">
              <label htmlFor="partner-email" className="text-alkota-slate uppercase tracking-wider block">
                AUTHORISED PARTNER EMAIL *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-alkota-slate absolute left-3.5 top-3.5" />
                <input
                  id="partner-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@yourshop.com"
                  className="w-full bg-alkota-carbon border border-white/20 pl-10 pr-4 py-3 text-white font-mono text-xs focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/40"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2 text-[11px]">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
            >
              {loading ? (
                <span>DISPATCHING LINK...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>TRANSMIT MAGIC LINK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="pt-2 border-t border-white/10 text-center font-sans text-[11px] text-alkota-slate">
              Not yet a partner?{" "}
              <Link href={`/${region}/partners#apply`} className="underline text-white hover:text-alkota-signal">
                Apply for network recruitment
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
