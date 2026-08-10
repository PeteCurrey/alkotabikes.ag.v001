"use client";

import React from "react";
import Link from "next/link";
import { X, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/cartContext";
import { formatPrice } from "@/lib/pricing";

// Product visual placeholder — SVG-based engineering grid tile
function ProductThumbnail({ placeholder }: { placeholder: string }) {
  const colorMap: Record<string, string> = {
    "cap": "#1a1d1f",
    "tee-black": "#050607",
    "tee-white": "#eceff1",
    "hoodie": "#282d31",
    "overshirt": "#3d4347",
    "bottle": "#647789",
    "mug": "#0b0d0f",
    "decals": "#282d31",
  };
  const bg = colorMap[placeholder] ?? "#282d31";
  return (
    <div
      className="w-16 h-16 flex-shrink-0 relative overflow-hidden border border-white/10"
      style={{ backgroundColor: bg }}
    >
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-20">
        <defs>
          <pattern id={`g-${placeholder}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M8 0 L0 0 L0 8" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="64" height="64" fill={`url(#g-${placeholder})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[8px] text-white/40 tracking-widest">ALK</span>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-alkota-carbon border-l border-white/10 z-[70] flex flex-col tech-grid-dark">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase mb-0.5">
              ALKOTA SUPPLY
            </div>
            <div className="font-display font-semibold text-alkota-white text-lg tracking-tight">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 font-mono text-xs text-alkota-slate">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-alkota-slate hover:text-alkota-white transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-alkota-graphite" strokeWidth={1} />
              <div className="font-mono text-xs text-alkota-slate tracking-wider uppercase">
                Cart is empty
              </div>
              <Link
                href="/store"
                onClick={closeCart}
                className="font-mono text-xs text-alkota-signal hover:text-alkota-white transition-colors flex items-center gap-1"
              >
                <span>BROWSE ALKOTA SUPPLY</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            state.items.map((item) => {
              const variantStr = Object.entries(item.selectedVariants)
                .map(([k, v]) => `${k}: ${v}`)
                .join(" · ");
              const vKey = Object.entries(item.selectedVariants)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([k, v]) => `${k}:${v}`)
                .join("|");

              return (
                <div
                  key={`${item.product.id}-${vKey}`}
                  className="flex gap-4 pb-4 border-b border-white/10 last:border-b-0"
                >
                  <ProductThumbnail placeholder={item.product.imagePlaceholder} />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase mb-0.5">
                      {item.product.category} · {item.product.id}
                    </div>
                    <div className="font-display text-sm font-semibold text-alkota-white leading-tight">
                      {item.product.name}
                    </div>
                    {variantStr && (
                      <div className="font-mono text-[10px] text-alkota-slate tracking-wide mt-0.5">
                        {variantStr}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty controls */}
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => updateQty(item.product.id, item.selectedVariants, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-alkota-slate hover:text-alkota-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center font-mono text-xs text-alkota-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.product.id, item.selectedVariants, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-alkota-slate hover:text-alkota-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      {/* Price */}
                      <div className="font-mono text-sm text-alkota-white">
                        {item.product.prices.uk ? (
                          formatPrice({
                            ...item.product.prices.uk,
                            amountMinor: item.product.prices.uk.amountMinor * item.quantity,
                          })
                        ) : (
                          <span className="text-alkota-slate text-xs">UNAVAILABLE</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedVariants)}
                    className="self-start text-alkota-slate hover:text-alkota-white transition-colors mt-1"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-4 bg-alkota-black/60">
            <div className="flex items-center justify-between font-mono text-xs text-alkota-slate uppercase tracking-wider">
              <span>Subtotal</span>
              <span className="text-alkota-white font-semibold text-sm">
                {formatPrice({ region: "uk", amountMinor: totalPrice, currency: "GBP", taxIncluded: true, taxRateApplied: 0.20 })}
              </span>
            </div>
            <div className="font-mono text-[10px] text-alkota-slate/70 tracking-wide">
              Shipping calculated at checkout. Pre-order items dispatched on release.
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-alkota-signal text-alkota-white font-mono font-semibold text-xs tracking-wider uppercase hover:bg-alkota-white hover:text-alkota-black transition-colors"
            >
              <span>VIEW FULL CART</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full py-2.5 border border-white/20 text-alkota-slate hover:text-alkota-white hover:border-white/40 font-mono text-xs tracking-wider uppercase transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
