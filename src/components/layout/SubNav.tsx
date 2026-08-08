"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubNavTab {
  label: string;
  href: string;
  badge?: string;
}

const ABOUT_TABS: SubNavTab[] = [
  { label: "Overview", href: "/about" },
  { label: "Our Story", href: "/about/story" },
  { label: "Reverse Engineering", href: "/about/reverse-engineering" },
  { label: "Build Process", href: "/about/build-process" },
  { label: "Materials", href: "/about/materials" },
  { label: "Testing", href: "/about/testing" },
  { label: "Engineering Philosophy", href: "/about/philosophy" },
];

const ENGINEERING_TABS: SubNavTab[] = [
  { label: "Overview", href: "/engineering" },
  { label: "Project 01", href: "/bikes/project-01" },
  { label: "Chassis", href: "/engineering/chassis" },
  { label: "Kinematics", href: "/engineering/kinematics" },
  { label: "Materials", href: "/engineering/materials" },
  { label: "Testing", href: "/engineering/testing" },
  { label: "Build Process", href: "/about/build-process" },
  { label: "Development Journal", href: "/journal/project-01", badge: "NEW" },
];

export function AboutSubNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-alkota-black/80 border-b border-white/10 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-3 no-scrollbar font-mono text-[11px] uppercase tracking-wider">
          <span className="text-alkota-slate text-[9px] tracking-widest font-bold mr-3 flex-shrink-0">
            SECTION // ABOUT
          </span>
          {ABOUT_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3 py-1.5 flex-shrink-0 transition-all border ${
                  isActive
                    ? "border-alkota-signal bg-alkota-signal/10 text-alkota-signal font-bold"
                    : "border-transparent text-alkota-slate hover:text-white hover:border-white/20"
                }`}
              >
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function EngineeringSubNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-alkota-black/80 border-b border-white/10 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-3 no-scrollbar font-mono text-[11px] uppercase tracking-wider">
          <span className="text-alkota-slate text-[9px] tracking-widest font-bold mr-3 flex-shrink-0">
            SECTION // ENGINEERING
          </span>
          {ENGINEERING_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3 py-1.5 flex-shrink-0 transition-all border flex items-center gap-1.5 ${
                  isActive
                    ? "border-alkota-signal bg-alkota-signal/10 text-alkota-signal font-bold"
                    : "border-transparent text-alkota-slate hover:text-white hover:border-white/20"
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-alkota-signal text-alkota-black font-bold text-[8px] px-1 py-0.2">
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
