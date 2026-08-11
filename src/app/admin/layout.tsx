import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import Logo from "@/components/brand/Logo";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Users, FileText, Database, Shield, LogOut, BarChart3, Mail, Layers, Image as ImageIcon, Activity, LayoutDashboard } from "lucide-react";
import { ADMIN_COOKIE, verifyAdminAuth } from "@/lib/auth/adminAuth";
import { SITE_URL } from "@/lib/env";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminAuth();
  const isLoginPage = (await headers()).get("x-invoke-path")?.includes("/admin/login");

  const vercelUrl = process.env.VERCEL_URL || "";
  const gitCommitSha = (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7);
  const allowIndexing = process.env.ALLOW_INDEXING === "true";
  const siteHost = new URL(SITE_URL).hostname;

  // Render children directly for login page or if session present
  return (
    <div className="min-h-screen bg-alkota-carbon text-alkota-white font-mono antialiased flex flex-col">
      {/* Top Operations Header Bar */}
      <header className="bg-alkota-black border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Link href="/admin/leads" className="flex items-center gap-3">
            <Logo variant="header" />
            <span className="bg-alkota-signal text-alkota-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">
              ADMIN / OPS
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-3 text-xs text-alkota-slate border-l border-white/10 pl-6">
            <TechnicalAnnotation label="SITE_URL" value={siteHost} variant="signal" />
            {gitCommitSha && (
              <TechnicalAnnotation label="SHA" value={gitCommitSha} />
            )}
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-alkota-slate">CRAWL GATE:</span>
              {allowIndexing ? (
                <span className="bg-green-500/20 text-green-400 border border-green-500/40 px-1.5 py-0.5 font-bold uppercase tracking-wider">
                  INDEXING
                </span>
              ) : (
                <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.5 font-bold uppercase tracking-wider">
                  NOINDEX
                </span>
              )}
            </div>
          </div>
        </div>

        {session && (
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-alkota-slate text-[11px] hidden sm:inline">
              ROLE: <strong className="text-alkota-signal">OWNER</strong>
            </span>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="px-3 py-1.5 border border-white/20 hover:border-red-500 text-alkota-snow hover:text-red-400 text-[11px] uppercase transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>EXIT</span>
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        {session && (
          <aside className="w-full md:w-64 bg-alkota-black/90 border-r border-white/10 p-4 space-y-6 flex-shrink-0">
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-alkota-slate uppercase tracking-widest px-3 py-1">
                OPERATIONS CONTROL
              </div>
              <nav className="space-y-1">
                <Link
                  href="/admin"
                  className="flex items-center justify-between px-3 py-2.5 border border-white/10 hover:border-alkota-signal text-alkota-slate hover:text-alkota-signal text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-alkota-signal" />
                    <span>OVERVIEW</span>
                  </div>
                  <span className="text-[10px] bg-alkota-signal/20 text-alkota-signal px-1.5 py-0.5 font-bold">
                    DASHBOARD
                  </span>
                </Link>

                <Link
                  href="/admin/leads"
                  className="flex items-center justify-between px-3 py-2.5 border border-white/10 hover:border-alkota-signal text-alkota-slate hover:text-alkota-signal text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>LEADS & CRM</span>
                  </div>
                  <span className="text-[10px] bg-alkota-signal/20 px-1.5 py-0.5 font-bold">
                    LIVE
                  </span>
                </Link>

                <Link
                  href="/admin/media"
                  className="flex items-center justify-between px-3 py-2.5 border border-white/10 hover:border-alkota-signal text-alkota-slate hover:text-alkota-signal text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>MEDIA LIBRARY</span>
                  </div>
                  <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 font-bold">LIVE</span>
                </Link>

                <Link
                  href="/admin/health"
                  className="flex items-center justify-between px-3 py-2.5 border border-white/10 hover:border-alkota-signal text-alkota-slate hover:text-alkota-signal text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-alkota-signal" />
                    <span>HEALTH & GATE</span>
                  </div>
                  <span className="text-[10px] bg-alkota-signal/20 text-alkota-signal px-1.5 py-0.5 font-bold">LIVE</span>
                </Link>

                <Link
                  href="/admin/content"
                  className="flex items-center justify-between px-3 py-2.5 border border-white/10 hover:border-alkota-signal text-alkota-slate hover:text-alkota-signal text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4" />
                    <span>CONTENT SLOTS</span>
                  </div>
                  <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 font-bold">LIVE</span>
                </Link>

                <div className="px-3 py-2 text-alkota-slate/50 text-xs flex items-center justify-between cursor-not-allowed">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4" />
                    <span>BLOG & DRAFTS</span>
                  </div>
                  <span className="text-[9px] text-alkota-slate/40">PHASE 3</span>
                </div>

                <div className="px-3 py-2 text-alkota-slate/50 text-xs flex items-center justify-between cursor-not-allowed">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4" />
                    <span>NEWSLETTER</span>
                  </div>
                  <span className="text-[9px] text-alkota-slate/40">PHASE 4</span>
                </div>

                <div className="px-3 py-2 text-alkota-slate/50 text-xs flex items-center justify-between cursor-not-allowed">
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4" />
                    <span>COMMERCE</span>
                  </div>
                  <span className="text-[9px] text-alkota-slate/40">PHASE 5</span>
                </div>
              </nav>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 text-[10px] text-alkota-slate">
              <div className="flex items-center justify-between px-3">
                <span>SYSTEM VERSION</span>
                <span className="text-white font-bold">v0.1.0</span>
              </div>
              <div className="flex items-center justify-between px-3">
                <span>GDPR / PECR GATE</span>
                <span className="text-alkota-signal font-bold">ACTIVE</span>
              </div>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
