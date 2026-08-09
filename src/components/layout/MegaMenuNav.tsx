"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ShoppingBag, Settings, Layers, ShieldCheck, Flame, BookOpen, Wrench } from "lucide-react";
import { brandAssets } from "@/lib/assets";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { useRegion } from "@/components/region/RegionProvider";
import { buildRegionalPath } from "@/lib/regions";

interface CategoryMenu {
  id: string;
  label: string;
  href: string;
  badge?: string;
  featured: {
    title: string;
    subtitle: string;
    image: string;
    linkText: string;
    linkHref: string;
    statusLabel?: string;
  };
  sections: {
    heading: string;
    links: {
      label: string;
      href: string;
      desc?: string;
      badge?: string;
    }[];
  }[];
}

const MEGA_MENUS: CategoryMenu[] = [
  {
    id: "bikes",
    label: "BIKES",
    href: "/bikes/project-01",
    featured: {
      title: "PROJECT 01",
      subtitle: "160mm / 150mm All-Mountain Chassis · Development Baseline R00",
      image: brandAssets.project01WhiteHero,
      linkText: "EXPLORE PROJECT 01",
      linkHref: "/bikes/project-01",
      statusLabel: "PRE-PRODUCTION",
    },
    sections: [
      {
        heading: "PLATFORM ARCHITECTURE",
        links: [
          { label: "Project 01 Overview", href: "/bikes/project-01", desc: "Flagship 160/150mm carbon all-mountain chassis" },
        ],
      },
      {
        heading: "PRE-ORDER & CUSTOMISATION",
        links: [
          { label: "Reserve Project 01", href: "/order", desc: "Join the register for priority allocation", badge: "2028 LAUNCH" },
          { label: "Development Configurator", href: "/configure", desc: "Preview build options & specifications" },
          { label: "Fit Engine", href: "/fit", desc: "Rider dimensions to size direction" },
        ],
      },
      {
        heading: "DESIGN HISTORY",
        links: [
          { label: "Design Archive", href: "/project-01/design-archive", desc: "The drawings behind the machine" },
          { label: "Development Journal", href: "/journal", desc: "Engineering decisions & programme updates" },
        ],
      },
    ],
  },
  {
    id: "engineering",
    label: "ENGINEERING",
    href: "/engineering",
    featured: {
      title: "THE ENGINEERING METHOD",
      subtitle: "Finite-element analysis, kinematics calibration & physical lab validation.",
      image: ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src,
      linkText: "LAB & FIELD VALIDATION",
      linkHref: "/engineering/testing",
      statusLabel: "R00 BASELINE",
    },
    sections: [
      {
        heading: "CHASSIS & KINEMATICS",
        links: [
          { label: "Chassis Engineering", href: "/engineering/chassis", desc: "Structural carbon layup & frame stiffness balance" },
          { label: "Kinematics Analysis", href: "/engineering/kinematics", desc: "Low-pivot Horst-style four-bar suspension curve" },
        ],
      },
      {
        heading: "MATERIALS & TESTING",
        links: [
          { label: "Materials & Carbon", href: "/engineering/materials", desc: "Torayca UD carbon fiber architecture" },
          { label: "Lab & Field Testing", href: "/engineering/testing", desc: "Hydraulic bench fatigue & mountain telemetry" },
        ],
      },
    ],
  },
  {
    id: "racing",
    label: "RACING",
    href: "/racing",
    badge: "2027",
    featured: {
      title: "ALKOTA RACING 2027",
      subtitle: "Taking prototype validation from bench testing into international competition.",
      image: ALKOTA_STORY_MEDIA.paddockEnvironment.src,
      linkText: "2027 PROGRAMME ROADMAP",
      linkHref: "/racing",
      statusLabel: "PLANNED 2027",
    },
    sections: [
      {
        heading: "DEVELOPMENT PROGRAMME",
        links: [
          { label: "Racing Programme 2027", href: "/racing", desc: "Competition validation ahead of 2028 launch" },
          { label: "2027 Programme Detail", href: "/racing/2027", desc: "The planned race-development architecture" },
        ],
      },
      {
        heading: "ROAD TO PRODUCTION",
        links: [
          { label: "Road to 2028", href: "/road-to-2028", desc: "Engineer It. Race It. Build It." },
        ],
      },
    ],
  },
  {
    id: "journal",
    label: "JOURNAL",
    href: "/journal",
    featured: {
      title: "PROJECT 01 JOURNAL",
      subtitle: "The chronological engineering record of Project 01 becoming real.",
      image: ALKOTA_STORY_MEDIA.peteWorkshopLab.src,
      linkText: "READ DEVELOPMENT JOURNAL",
      linkHref: "/journal",
      statusLabel: "CHRONOLOGICAL RECORD",
    },
    sections: [
      {
        heading: "DEVELOPMENT ARCHIVE",
        links: [
          { label: "Development Journal", href: "/journal", desc: "Engineering notes, drawings & founder dispatches", badge: "FEATURED" },
        ],
      },
      {
        heading: "ROADMAP",
        links: [
          { label: "Road to 2028", href: "/road-to-2028", desc: "Three-stage development timeline" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "ABOUT",
    href: "/about",
    featured: {
      title: "THE ALKOTA STORY",
      subtitle: "Founded by Pete Currey to build high-performance mountain bicycles with purpose.",
      image: ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src,
      linkText: "PHILOSOPHY & ORIGIN",
      linkHref: "/about",
      statusLabel: "BARNOLDSWICK, UK",
    },
    sections: [
      {
        heading: "BRAND & PROCESS",
        links: [
          { label: "Philosophy & Origin", href: "/about", desc: "Why Alkota exists and our engineering ethos" },
          { label: "Reverse Engineering", href: "/about/reverse-engineering", desc: "Designing from ride goals backwards" },
          { label: "Build Process", href: "/about/build-process", desc: "From sketch to physical prototype" },
        ],
      },
      {
        heading: "OWNERSHIP & SUPPORT",
        links: [
          { label: "My Alkota", href: "/my-alkota", desc: "Development member portal", badge: "MEMBERS" },
          { label: "Ownership Portal", href: "/ownership", desc: "Pre-production documentation & setup guides" },
          { label: "Partner Network", href: "/partners", desc: "Specialist partner recruitment programme" },
          { label: "Contact Founder", href: "/contact", desc: "Get in touch directly with Pete Currey" },
        ],
      },
    ],
  },
];

export default function MegaMenuNav({ pathname }: { pathname: string }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { regionCode } = useRegion();

  return (
    <nav className="hidden lg:flex items-center space-x-7 relative" onMouseLeave={() => setActiveMenu(null)}>
      {MEGA_MENUS.map((menu) => {
        const regionalHref = buildRegionalPath(menu.href, regionCode);
        const isActive = pathname === regionalHref || (menu.href !== "/" && pathname.startsWith(regionalHref));
        const isOpen = activeMenu === menu.id;

        return (
          <div
            key={menu.id}
            className="relative py-3"
            onMouseEnter={() => setActiveMenu(menu.id)}
          >
            <Link
              href={regionalHref}
              className={`font-mono text-[11px] tracking-widest uppercase transition-colors inline-flex items-center gap-1 relative py-0.5 ${
                isActive || isOpen
                  ? "text-alkota-signal font-bold"
                  : "text-alkota-snow hover:text-white"
              }`}
            >
              <span>{menu.label}</span>
              {menu.badge && (
                <span className="bg-alkota-signal/20 border border-alkota-signal/40 text-alkota-signal text-[8px] px-1 py-0.2 font-mono">
                  {menu.badge}
                </span>
              )}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180 text-alkota-signal" : "opacity-60"}`} />
              
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-alkota-signal" />
              )}
            </Link>

            {/* Mega Dropdown */}
            {isOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-alkota-carbon border border-white/10 p-6 shadow-2xl z-50 text-alkota-white animate-fadeIn tech-grid-dark rounded-none">
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Link Sections */}
                  <div className="col-span-7 space-y-6">
                    {menu.sections.map((section, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="font-mono text-[9px] text-alkota-signal tracking-widest uppercase border-b border-white/10 pb-1 font-semibold flex items-center justify-between">
                          <span>{section.heading}</span>
                        </div>
                        <div className="space-y-2">
                          {section.links.map((link) => (
                            <Link
                              key={link.label}
                              href={buildRegionalPath(link.href, regionCode)}
                              onClick={() => setActiveMenu(null)}
                              className="group block p-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-display font-medium text-sm text-alkota-white group-hover:text-alkota-signal transition-colors">
                                  {link.label}
                                </span>
                                {link.badge && (
                                  <span className="font-mono text-[8px] text-alkota-black bg-alkota-signal font-bold px-1.5 py-0.5 uppercase">
                                    {link.badge}
                                  </span>
                                )}
                              </div>
                              {link.desc && (
                                <p className="font-sans text-xs text-alkota-slate group-hover:text-alkota-snow/80 transition-colors mt-0.5 font-light">
                                  {link.desc}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Featured Card with Relevant Visual */}
                  <div className="col-span-5 border-l border-white/10 pl-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      {menu.featured.statusLabel && (
                        <div className="font-mono text-[9px] text-alkota-signal tracking-widest uppercase bg-alkota-signal/10 border border-alkota-signal/30 px-2 py-0.5 w-fit font-bold">
                          {menu.featured.statusLabel}
                        </div>
                      )}

                      <div className="relative w-full h-[140px] bg-alkota-black border border-white/10 overflow-hidden group">
                        <Image
                          src={menu.featured.image}
                          alt={menu.featured.title}
                          fill
                          sizes="280px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="font-display font-bold text-xs text-white uppercase tracking-tight block">
                            {menu.featured.title}
                          </span>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-alkota-slate leading-relaxed font-light">
                        {menu.featured.subtitle}
                      </p>
                    </div>

                    <Link
                      href={buildRegionalPath(menu.featured.linkHref, regionCode)}
                      onClick={() => setActiveMenu(null)}
                      className="mt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-alkota-signal hover:text-white flex items-center justify-between border-t border-white/10 pt-3 group"
                    >
                      <span>{menu.featured.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-alkota-signal" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
