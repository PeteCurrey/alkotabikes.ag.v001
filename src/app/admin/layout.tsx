import React from "react";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import {
  LayoutDashboard,
  Users,
  Activity,
  Image as ImageIcon,
  Layers,
  ShoppingBag,
  Mail,
  Globe,
  Map,
  LogOut,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { SITE_URL } from "@/lib/env";
import { getSidebarModules, AdminModule } from "@/lib/admin/modules";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Activity,
  ImageIcon,
  Layers,
  ShoppingBag,
  Mail,
  Globe,
  Map,
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminAuth();

  const vercelEnv = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
  const gitCommitSha =
    (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7) || "02bb58f";
  const repoCommitUrl = `https://github.com/PeteCurrey/alkotabikes.ag.v001/commit/${gitCommitSha}`;
  const allowIndexing = process.env.ALLOW_INDEXING === "true";
  const siteHost = new URL(SITE_URL).hostname;

  const sidebarModules = getSidebarModules();

  return (
    <div className="min-h-screen bg-alkota-carbon text-alkota-white font-mono antialiased flex flex-col">
      {/* Top Operations Header Bar */}
      <header className="bg-alkota-black border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo variant="header" />
            <span className="bg-alkota-signal text-alkota-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">
              ADMIN / OPS
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-3 text-xs text-alkota-slate border-l border-white/10 pl-6">
            <TechnicalAnnotation label="SITE_URL" value={siteHost} variant="signal" />
            {gitCommitSha && (
              <a
                href={repoCommitUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                <TechnicalAnnotation label="SHA" value={gitCommitSha} />
              </a>
            )}
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-alkota-slate">CRAWL GATE:</span>
              {allowIndexing ? (
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 font-bold uppercase tracking-wider">
                  INDEXABLE
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
                {sidebarModules.map((mod) => {
                  const Icon = ICON_MAP[mod.iconName] || Activity;
                  const isLive = mod.status === "live";

                  return (
                    <Link
                      key={mod.key}
                      href={mod.href}
                      className="flex items-center justify-between px-3 py-2.5 border border-white/10 hover:border-alkota-signal text-alkota-slate hover:text-alkota-signal text-xs font-bold uppercase tracking-wider transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-alkota-signal group-hover:text-white transition-colors" />
                        <span>{mod.label}</span>
                      </div>
                      {isLive ? (
                        null // Rule: 'live' has NO badge in sidebar per NAV RULES
                      ) : (
                        <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 font-bold uppercase tracking-wider">
                          BUILDING
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Telemetry Footer */}
            <div className="border-t border-white/10 pt-4 space-y-2 text-[10px] text-alkota-slate font-mono">
              <div className="flex items-center justify-between px-3">
                <span>COMMIT SHA</span>
                <a
                  href={repoCommitUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-alkota-signal font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>{gitCommitSha}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex items-center justify-between px-3">
                <span>ENVIRONMENT</span>
                <span className="text-white font-bold uppercase">{vercelEnv}</span>
              </div>
              <div className="flex items-center justify-between px-3">
                <span>GDPR / PECR GATE</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
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
