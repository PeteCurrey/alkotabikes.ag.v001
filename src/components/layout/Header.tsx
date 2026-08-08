"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import { Menu, X, ArrowRight, Settings, ShoppingBag } from "lucide-react";
import CartDrawer from "@/components/store/CartDrawer";
import { useCart } from "@/lib/store/cartContext";

import MegaMenuNav from "@/components/layout/MegaMenuNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();

  const isConfigurator = pathname === "/configure";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
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
    { href: "/racing", label: "RACING" },
    { href: "/journal", label: "JOURNAL" },
    { href: "/store", label: "STORE" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isConfigurator
          ? "bg-alkota-carbon/95 backdrop-blur-md border-b border-white/10 text-alkota-white py-2 shadow-2xl"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent text-alkota-white py-2.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Desktop Brand Logo */}
        <div className="hidden md:block">
          <Logo variant="header" theme="light" />
        </div>

        {/* Mobile Monogram */}
        <div className="md:hidden">
          <Logo variant="monogram" theme="light" />
        </div>

        {/* Desktop Navigation with Mega Menu */}
        <MegaMenuNav pathname={pathname} />

        {/* Header Right Action */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative p-1.5 text-alkota-snow hover:text-alkota-white transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-alkota-signal text-alkota-white font-mono text-[9px] flex items-center justify-center rounded-none leading-none font-bold">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {/* Primary CTA: JOIN PROJECT 01 */}
          <Link
            href="/order"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 bg-alkota-signal text-alkota-black hover:bg-white transition-all duration-200 font-mono text-[11px] tracking-wider uppercase font-bold shadow-lg"
          >
            <span>JOIN PROJECT 01</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-alkota-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-alkota-signal" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[48px] bg-alkota-carbon text-alkota-white z-40 flex flex-col justify-between p-6 border-t border-white/10 animate-fadeIn">
          <div className="space-y-6 pt-2">
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
                  className="font-display font-bold text-xl tracking-tight text-alkota-white hover:text-alkota-signal transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-alkota-slate" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 pb-8 border-t border-white/10 pt-6">
            <Link
              href="/configure"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase"
            >
              <Settings className="w-4 h-4" />
              <span>LAUNCH CONFIGURATOR</span>
            </Link>
            <Link
              href="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-alkota-signal text-alkota-signal font-mono font-bold text-xs tracking-wider uppercase"
            >
              <span>RESERVE PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/my-alkota"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2 border border-white/10 text-alkota-slate font-mono text-xs tracking-wider uppercase hover:text-white hover:border-white/30 transition-colors"
            >
              <span>MY ALKOTA</span>
            </Link>
            <div className="font-mono text-[10px] text-alkota-slate text-center uppercase tracking-wider">
              PROJECT / 01 DEVELOPMENT PLATFORM
            </div>
          </div>
        </div>
      )}
      <CartDrawer />
    </header>
  );
}
