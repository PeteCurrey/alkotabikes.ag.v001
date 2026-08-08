"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  BookOpen,
  Archive,
  Image,
  Users,
  Wrench,
  Flame,
  Building2,
  ShoppingBag,
  DollarSign,
  UserCheck,
  Globe,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "DASHBOARD", href: "/studio", icon: LayoutDashboard },
  { label: "PROJECT 01", href: "/studio/project-01", icon: Cpu },
  { label: "COMMERCIAL", href: "/studio/commercial", icon: DollarSign, badge: "C00" },
  { label: "JOURNAL", href: "/studio/journal", icon: BookOpen },
  { label: "DESIGN ARCHIVE", href: "/studio/design", icon: Archive },
  { label: "MEDIA", href: "/studio/media", icon: Image },
  { label: "REGISTRATIONS", href: "/studio/registrations", icon: Users },
  { label: "BUILDS + FIT", href: "/studio/builds", icon: Wrench },
  { label: "RACING", href: "/studio/racing", icon: Flame },
  { label: "PARTNERS", href: "/studio/partners", icon: Building2 },
  { label: "STORE", href: "/studio/store", icon: ShoppingBag },
  { label: "OWNERS", href: "/studio/owners", icon: UserCheck },
  { label: "SITE CONTENT", href: "/studio/content", icon: Globe },
  { label: "SETTINGS", href: "/studio/settings", icon: Settings },
];

export default function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/studio/auth", { method: "GET" });
    } catch {
      // ignore
    }
    router.push("/studio/login");
  };

  const Sidebar = (
    <aside
      className={`bg-[#0a0a0a] border-r border-white/8 flex flex-col h-full w-56 flex-shrink-0`}
    >
      {/* Studio wordmark */}
      <div className="px-4 py-5 border-b border-white/8 flex-shrink-0">
        <div className="font-mono text-[8px] uppercase tracking-[0.35em] text-[#647789] mb-1">
          ALKOTA
        </div>
        <div className="font-display font-bold text-lg text-white uppercase tracking-tight leading-none">
          STUDIO
        </div>
        <div className="font-mono text-[7px] uppercase tracking-[0.25em] text-[#1a73e8] mt-0.5">
          PHASE 01
        </div>
      </div>

      {/* Programme status mini */}
      <div className="px-4 py-3 border-b border-white/8 flex-shrink-0">
        <div className="font-mono text-[7px] uppercase tracking-widest text-[#647789] mb-1">CURRENT PROGRAMME</div>
        <div className="font-mono text-[9px] text-white font-bold">PROJECT 01 / R00</div>
        <div className="font-mono text-[7px] uppercase tracking-widest text-[#647789] mt-0.5">PRE-PRODUCTION DEVELOPMENT</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/studio"
              ? pathname === "/studio"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors group ${
                isActive
                  ? "bg-[#1a73e8]/10 text-[#1a73e8] border-r-2 border-[#1a73e8]"
                  : "text-[#647789] hover:text-white hover:bg-white/3"
              }`}
            >
              <item.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#1a73e8]" : "text-[#647789] group-hover:text-white"}`} />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto font-mono text-[7px] px-1.5 py-0.5 bg-[#1a73e8]/20 text-[#1a73e8] uppercase">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/8 p-4 flex-shrink-0 space-y-3">
        <div className="space-y-1">
          <div className="font-mono text-[8px] uppercase tracking-widest text-[#647789]">SIGNED IN AS</div>
          <div className="font-mono text-[9px] text-white font-bold">PETE CURREY</div>
          <div className="font-mono text-[7px] uppercase tracking-widest text-[#1a73e8]">OWNER</div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#647789] hover:text-white transition-colors"
          >
            <Globe className="w-3 h-3" />
            VIEW SITE
          </Link>
          <span className="text-[#647789]/30">·</span>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#647789] hover:text-red-400 transition-colors disabled:opacity-40"
          >
            <LogOut className="w-3 h-3" />
            {signingOut ? "..." : "SIGN OUT"}
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col h-screen sticky top-0">
        {Sidebar}
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 h-full flex flex-col">
            {Sidebar}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-40 bg-[#0a0a0a] border-b border-white/8 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-[#647789] hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-mono text-[10px] text-[#1a73e8] font-bold uppercase tracking-wider">
            ALKOTA STUDIO
          </div>
          <div className="w-8" />
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
