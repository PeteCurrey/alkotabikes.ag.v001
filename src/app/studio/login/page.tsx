"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, AlertTriangle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") ?? "/studio";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/studio/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirectTo);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Authentication failed");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="studio-password"
          className="font-mono text-[9px] uppercase tracking-widest text-[#647789] block"
        >
          ACCESS KEY
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#647789]" />
          <input
            id="studio-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter studio access key"
            className="w-full bg-[#0f0f0f] border border-white/10 text-white font-mono text-sm pl-10 pr-10 py-3.5 focus:outline-none focus:border-[#1a73e8]/50 placeholder:text-[#647789]/40"
            required
            autoComplete="current-password"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#647789] hover:text-white transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-3 py-2 border border-red-500/30 bg-red-500/5">
          <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
          <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest">
            {error}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full py-3.5 bg-[#1a73e8] text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#1a73e8]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "AUTHENTICATING..." : "ENTER STUDIO"}
      </button>
    </form>
  );
}

export default function StudioLoginPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm space-y-10">
        {/* Wordmark */}
        <div className="text-center space-y-2">
          <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#647789] mb-4">
            AUTHENTICATED ACCESS
          </div>
          <h1 className="font-display font-bold text-4xl text-white uppercase tracking-tight">
            ALKOTA
          </h1>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1a73e8] font-bold">
            STUDIO
          </div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#647789]">
            PRODUCT / CONTENT / DEVELOPMENT CONTROL
          </div>
        </div>

        {/* Login form with Suspense boundary */}
        <Suspense fallback={
          <div className="py-8 font-mono text-[10px] text-[#647789] text-center uppercase tracking-widest">
            LOADING...
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Security notice */}
        <div className="border-t border-white/5 pt-6 space-y-2">
          <p className="font-mono text-[8px] text-[#647789]/60 text-center uppercase tracking-widest">
            This is a restricted access environment.
          </p>
          <p className="font-mono text-[8px] text-[#647789]/40 text-center uppercase tracking-widest">
            Alkota Studio · Phase 01 · Not publicly accessible
          </p>
        </div>
      </div>
    </div>
  );
}
