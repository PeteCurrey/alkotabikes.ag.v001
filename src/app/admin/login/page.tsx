"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/leads");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-alkota-carbon text-alkota-white flex items-center justify-center p-4 tech-grid-dark font-mono">
      <div className="w-full max-w-md bg-alkota-black border border-white/15 p-8 space-y-8 shadow-2xl">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <TechnicalAnnotation label="OPERATIONS ENGINE" value="ADMIN AUTHENTICATION" variant="signal" />
          <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-white flex items-center gap-3">
            <Lock className="w-6 h-6 text-alkota-signal" />
            <span>ADMIN SHELL</span>
          </h1>
          <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
            Restricted access management interface for Alkota Cycles operations and CRM data.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 text-xs">
          <div className="space-y-2">
            <label htmlFor="admin-password" className="text-alkota-slate uppercase tracking-wider block">
              ENTER ACCESS KEY *
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-alkota-carbon border border-white/20 px-4 py-3 text-white focus:border-alkota-signal focus:outline-none tracking-widest placeholder:text-alkota-slate/40"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-alkota-signal text-alkota-black hover:bg-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>VERIFYING KEY...</span>
            ) : (
              <>
                <span>AUTHENTICATE</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[10px] text-alkota-slate">
          <span>SECURED BY ALKOTA CORE</span>
          <ShieldCheck className="w-3.5 h-3.5 text-alkota-signal" />
        </div>
      </div>
    </div>
  );
}
