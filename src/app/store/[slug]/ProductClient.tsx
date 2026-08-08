"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/content/store/products";
import { useCart } from "@/lib/store/cartContext";

// ─── Product Image Placeholder ────────────────────────────────────────────────
function ProductHero({ placeholder, name }: { placeholder: string; name: string }) {
  const colorMap: Record<string, { bg: string }> = {
    "cap":        { bg: "#1a1d1f" },
    "tee-black":  { bg: "#050607" },
    "tee-white":  { bg: "#eceff1" },
    "hoodie":     { bg: "#282d31" },
    "overshirt":  { bg: "#3d4347" },
    "bottle":     { bg: "#647789" },
    "mug":        { bg: "#0b0d0f" },
    "decals":     { bg: "#1a1d1f" },
  };
  const { bg } = colorMap[placeholder] ?? { bg: "#282d31" };
  const isLight = placeholder === "tee-white";

  return (
    <div className="aspect-square w-full relative overflow-hidden" style={{ backgroundColor: bg }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10">
        <defs>
          <pattern id={`ph-${placeholder}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0 L0 0 L0 32" fill="none" stroke={isLight ? "#000" : "#fff"} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ph-${placeholder})`}/>
      </svg>

      {/* Registration marks */}
      <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-alkota-signal/50" />
      <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-alkota-signal/50" />
      <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-alkota-signal/50" />
      <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-alkota-signal/50" />

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 gap-2">
        <div className={`font-mono text-xs tracking-widest uppercase ${isLight ? "text-black/25" : "text-white/25"}`}>
          ALKOTA SUPPLY
        </div>
        <div className={`font-display font-bold text-2xl tracking-tight ${isLight ? "text-black/30" : "text-white/30"}`}>
          {name}
        </div>
        <div className={`font-mono text-[10px] tracking-widest uppercase mt-2 ${isLight ? "text-black/15" : "text-white/15"}`}>
          PHOTOGRAPHY ASSET PENDING
        </div>
      </div>
    </div>
  );
}

// ─── Product Client ───────────────────────────────────────────────────────────
export default function ProductClient({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(
    Object.fromEntries(product.variants.map((v) => [v.label, v.options[0]]))
  );
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({ product, quantity: 1, selectedVariants });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  const isComingSoon = product.status === "coming_soon";

  return (
    <div className="bg-alkota-white min-h-screen pt-[60px]">
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 font-mono text-[10px] text-alkota-slate tracking-widest uppercase">
          <Link href="/store" className="hover:text-alkota-black transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            <span>ALKOTA SUPPLY</span>
          </Link>
          <span>/</span>
          <span className="text-alkota-black">{product.name}</span>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: Product Image */}
          <div className="space-y-4">
            <ProductHero placeholder={product.imagePlaceholder} name={product.name} />
            {/* Product reference */}
            <div className="flex items-center justify-between font-mono text-[10px] text-alkota-slate tracking-widest uppercase px-1">
              <span>{product.id}</span>
              <span>REV / ASSET PENDING</span>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8 lg:pt-4">
            {/* Category + badge */}
            <div className="flex items-center gap-3">
              <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase">
                {product.category}
              </div>
              {product.badge && (
                <div className="bg-alkota-carbon text-alkota-signal font-mono text-[9px] px-2 py-0.5 tracking-widest uppercase">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-alkota-black tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="font-mono text-xs text-alkota-slate mt-1">{product.subtitle}</div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <div className="font-mono text-2xl font-semibold text-alkota-black">
                {product.price !== null
                  ? `£${product.price.toFixed(2)}`
                  : <span className="text-alkota-slate text-sm tracking-wider">PRICE NOT YET CONFIRMED</span>}
              </div>
              {isComingSoon && (
                <div className="font-mono text-[10px] text-alkota-signal border border-alkota-signal/30 px-2 py-0.5 tracking-widest uppercase">
                  PRE-LAUNCH
                </div>
              )}
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-alkota-graphite leading-relaxed border-l-2 border-alkota-signal/30 pl-4">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="space-y-5">
                {product.variants.map((variant) => (
                  <div key={variant.label} className="space-y-2">
                    <div className="font-mono text-[10px] text-alkota-slate tracking-widest uppercase">
                      {variant.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => {
                        const isSelected = selectedVariants[variant.label] === option;
                        return (
                          <button
                            key={option}
                            onClick={() =>
                              setSelectedVariants((prev) => ({ ...prev, [variant.label]: option }))
                            }
                            className={`px-3 py-1.5 font-mono text-xs tracking-wide border transition-colors ${
                              isSelected
                                ? "bg-alkota-carbon text-alkota-white border-alkota-carbon"
                                : "bg-transparent text-alkota-black border-alkota-black/20 hover:border-alkota-black"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full inline-flex items-center justify-center gap-2 py-4 font-mono font-semibold text-xs tracking-wider uppercase transition-all duration-200 ${
                  added
                    ? "bg-alkota-signal text-alkota-white"
                    : "bg-alkota-carbon text-alkota-white hover:bg-alkota-signal"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO CART</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isComingSoon ? "ADD TO CART — PRE-ORDER" : "ADD TO CART"}
                    </span>
                  </>
                )}
              </button>

              {isComingSoon && (
                <div className="font-mono text-[10px] text-alkota-slate/80 tracking-wide text-center leading-relaxed">
                  This item is part of the Alkota Supply pre-launch catalogue.
                  No payment is taken until dispatch is confirmed.
                </div>
              )}
            </div>

            {/* Details */}
            <div className="border-t border-alkota-black/10 pt-6 space-y-3">
              <div className="font-mono text-[10px] text-alkota-slate tracking-widest uppercase mb-3">
                PRODUCT DETAILS
              </div>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[10px] text-alkota-signal mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-sm text-alkota-graphite">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Provenance note */}
            <div className="bg-alkota-carbon/5 border border-alkota-black/8 p-4 space-y-1">
              <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase">
                FROM THE DEVELOPMENT PROGRAMME
              </div>
              <p className="font-sans text-xs text-alkota-slate leading-relaxed">
                Alkota Supply items are designed and used within the Project 01 development programme.
                Specifications are subject to change before final production.
              </p>
            </div>
          </div>
        </div>

        {/* ── Back link ── */}
        <div className="mt-16 pt-8 border-t border-alkota-black/10">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-alkota-black tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALKOTA SUPPLY</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
