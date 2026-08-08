"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import { Menu, X, ArrowRight, Settings } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isConfigurator = pathname === "/configure";
  const isDarkHeroPage = pathname === "/" || pathname.startsWith("/bikes") || pathname.startsWith("/engineering");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/bikes", label: "BIKES" },
    { href: "/engineering", label: "ENGINEERING" },
    { href: "/configure", label: "CONFIGURE" },
    { href: "/journal", label: "JOURNAL" },
    { href: "/about", label: "ABOUT" },
    { href: "/support", label: "SUPPORT" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isConfigurator
          ? "bg-alkota-carbon/90 backdrop-blur-md border-b border-white/10 text-alkota-white py-3.5 shadow-xl"
          : "bg-transparent text-alkota-black dark:text-alkota-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Desktop Brand Logo (Horizontal Lockup) */}
        <div className="hidden md:block">
          <Logo variant="header" theme={scrolled || isDarkHeroPage ? "light" : "auto"} />
        </div>

        {/* Mobile Monogram (28-34px) */}
        <div className="md:hidden">
          <Logo variant="monogram" theme={scrolled || isDarkHeroPage ? "light" : "auto"} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors relative py-1 ${
                  isActive
                    ? "text-alkota-signal font-semibold"
                    : scrolled || isConfigurator || isDarkHeroPage
                    ? "text-alkota-snow hover:text-white"
                    : "text-alkota-graphite hover:text-alkota-black dark:text-alkota-slate dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-alkota-signal" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Action */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/configure"
            className="group relative inline-flex items-center gap-2 px-4 py-2 border border-alkota-signal text-alkota-signal hover:bg-alkota-signal hover:text-alkota-black transition-all duration-200 font-mono text-xs tracking-wider uppercase font-semibold"
          >
            <Settings className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
            <span>CONFIGURE</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-alkota-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-alkota-signal" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-alkota-carbon text-alkota-white z-40 flex flex-col justify-between p-6 border-t border-white/10 animate-fadeIn">
          <div className="space-y-6 pt-2">
            {/* Top of mobile drawer displays full horizontal logo */}
            <div className="border-b border-white/10 pb-4">
              <Logo variant="header" theme="light" />
            </div>

            <div className="font-mono text-[10px] text-alkota-slate tracking-widest uppercase pb-2">
              NAVIGATION ARCHITECTURE
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-bold text-2xl tracking-tight text-alkota-white hover:text-alkota-signal transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-5 h-5 text-alkota-slate" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 pb-8 border-t border-white/10 pt-6">
            <Link
              href="/configure"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-alkota-signal text-alkota-black font-mono font-bold text-sm tracking-wider uppercase"
            >
              <Settings className="w-4 h-4" />
              <span>LAUNCH CONFIGURATOR</span>
            </Link>
            <div className="font-mono text-[10px] text-alkota-slate text-center uppercase tracking-wider">
              PROJECT / 01 DEVELOPMENT PLATFORM
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
