"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products, categories } from "@/content/store/products";
import type { Product } from "@/content/store/products";
import { useCart } from "@/lib/store/cartContext";

// ─── Product Image Placeholder ───────────────────────────────────────────────
function ProductImage({ placeholder, name }: { placeholder: string; name: string }) {
  const colorMap: Record<string, { bg: string; label: string }> = {
    "cap":        { bg: "#1a1d1f", label: "HEADWEAR" },
    "tee-black":  { bg: "#050607", label: "APPAREL" },
    "tee-white":  { bg: "#eceff1", label: "APPAREL" },
    "hoodie":     { bg: "#282d31", label: "APPAREL" },
    "overshirt":  { bg: "#3d4347", label: "APPAREL" },
    "bottle":     { bg: "#647789", label: "EQUIPMENT" },
    "mug":        { bg: "#0b0d0f", label: "EQUIPMENT" },
    "decals":     { bg: "#1a1d1f", label: "ACC." },
  };
  const { bg, label } = colorMap[placeholder] ?? { bg: "#282d31", label: "ITEM" };
  const isLight = placeholder === "tee-white";

  return (
    <div
      className="aspect-square w-full relative overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Grid overlay */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10">
        <defs>
          <pattern id={`pg-${placeholder}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 L0 24" fill="none" stroke={isLight ? "#000" : "#fff"} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pg-${placeholder})`}/>
      </svg>

      {/* Registration marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-alkota-signal/40" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-alkota-signal/40" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-alkota-signal/40" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-alkota-signal/40" />

      {/* Centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
        <div className={`font-mono text-[10px] tracking-widest uppercase ${isLight ? "text-black/30" : "text-white/30"}`}>
          ALKOTA SUPPLY
        </div>
        <div className={`font-display font-semibold text-sm tracking-tight ${isLight ? "text-black/40" : "text-white/40"}`}>
          {name.split(" ").slice(0, 2).join(" ")}
        </div>
        <div className={`font-mono text-[9px] tracking-widest uppercase mt-1 ${isLight ? "text-black/20" : "text-white/20"}`}>
          {label} / ASSET PENDING
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/store/${product.slug}`} className="group block">
      <div className="relative overflow-hidden border border-alkota-black/10 group-hover:border-alkota-signal/40 transition-colors duration-300">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-alkota-carbon px-2 py-0.5 font-mono text-[9px] text-alkota-signal tracking-widest uppercase">
            {product.badge}
          </div>
        )}
        {product.status === "coming_soon" && (
          <div className="absolute top-3 right-3 z-10 bg-alkota-signal/20 border border-alkota-signal/30 px-2 py-0.5 font-mono text-[9px] text-alkota-signal tracking-widest uppercase">
            PRE-LAUNCH
          </div>
        )}
        <ProductImage placeholder={product.imagePlaceholder} name={product.name} />
      </div>

      <div className="pt-3 space-y-1.5">
        <div className="font-mono text-[10px] text-alkota-slate tracking-widest uppercase">
          {product.category} · {product.id}
        </div>
        <div className="font-display font-semibold text-alkota-black text-sm tracking-tight group-hover:text-alkota-signal transition-colors">
          {product.name}
        </div>
        <div className="font-mono text-xs text-alkota-slate">{product.subtitle}</div>
        <div className="font-mono text-sm font-semibold text-alkota-black">
          {product.price !== null ? `£${product.price.toFixed(2)}` : (
            <span className="text-alkota-slate text-xs tracking-wider">COMING SOON</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Store Client ─────────────────────────────────────────────────────────────
export default function StoreClient() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const allCategories = ["ALL", ...categories];

  const filtered = activeCategory === "ALL"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-alkota-white min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-alkota-carbon tech-grid-dark pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[11px] text-alkota-signal tracking-widest uppercase mb-4">
            ALKOTA SUPPLY / WORKSHOP & PADDOCK
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-alkota-white leading-none mb-6">
            FROM THE<br />
            <span className="text-alkota-signal">WORKSHOP</span><br />
            TO THE MOUNTAIN.
          </h1>
          <p className="font-sans text-base md:text-lg text-alkota-slate max-w-xl leading-relaxed">
            The things we wear, carry and use while building Project 01.{" "}
            No lifestyle theatre. Just good equipment with ALKOTA on it.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-8 bg-alkota-signal/40" />
            <div className="font-mono text-[10px] text-alkota-slate tracking-widest uppercase">
              PRE-LAUNCH CATALOGUE · ITEMS AVAILABLE ON RELEASE
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="border-b border-alkota-black/10 bg-alkota-white sticky top-[48px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                  activeCategory === cat
                    ? "bg-alkota-carbon text-alkota-white"
                    : "text-alkota-slate hover:text-alkota-black hover:bg-alkota-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="font-mono text-xs text-alkota-slate tracking-widest uppercase">
              No products in this category yet.
            </div>
          </div>
        )}
      </section>

      {/* ── Bottom Editorial ── */}
      <section className="bg-alkota-carbon tech-grid-dark py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase mb-3">
              ABOUT ALKOTA SUPPLY
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-alkota-white tracking-tight leading-tight mb-4">
              Equipment from the development programme.
            </h2>
            <p className="font-sans text-alkota-slate leading-relaxed text-sm">
              Alkota Supply is not merchandise. Everything here comes from what we actually need in the workshop, the paddock and on the mountain while building Project 01. Each item is specced for daily use in a working environment.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: "WORKSHOP", text: "Designed for build sessions and long hours in the workshop." },
              { label: "PADDOCK", text: "Tested alongside Project 01 in race-paddock environments." },
              { label: "MOUNTAIN", text: "Built to work in the terrain where Project 01 is developed." },
            ].map(({ label, text }) => (
              <div key={label} className="flex gap-4 pb-4 border-b border-white/10 last:border-b-0">
                <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase w-20 flex-shrink-0 pt-0.5">
                  {label}
                </div>
                <div className="font-sans text-sm text-alkota-slate leading-relaxed">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pre-order CTA strip ── */}
      <section className="bg-alkota-black py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] text-alkota-slate tracking-widest uppercase mb-1">
              PROJECT 01 / PRE-PRODUCTION
            </div>
            <div className="font-display font-semibold text-alkota-white text-xl tracking-tight">
              Interested in Project 01 itself?
            </div>
          </div>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 px-6 py-3 bg-alkota-signal text-alkota-white font-mono font-semibold text-xs tracking-wider uppercase hover:bg-alkota-white hover:text-alkota-black transition-colors flex-shrink-0"
          >
            <span>RESERVE PROJECT 01</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
