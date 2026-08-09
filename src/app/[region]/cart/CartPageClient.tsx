"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/cartContext";

function ProductThumbnail({ placeholder }: { placeholder: string }) {
  const colorMap: Record<string, string> = {
    "cap": "#1a1d1f", "tee-black": "#050607", "tee-white": "#eceff1",
    "hoodie": "#282d31", "overshirt": "#3d4347", "bottle": "#647789",
    "mug": "#0b0d0f", "decals": "#1a1d1f",
  };
  const bg = colorMap[placeholder] ?? "#282d31";
  const isLight = placeholder === "tee-white";
  return (
    <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden border border-alkota-black/10" style={{ backgroundColor: bg }}>
      <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10">
        <defs>
          <pattern id={`cg-${placeholder}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0 L0 0 L0 10" fill="none" stroke={isLight ? "#000" : "#fff"} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="80" height="80" fill={`url(#cg-${placeholder})`}/>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-mono text-[8px] tracking-widest ${isLight ? "text-black/25" : "text-white/25"}`}>ALK</span>
      </div>
    </div>
  );
}

export default function CartPageClient() {
  const { state, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();

  const formatPrice = (p: number) => `£${p.toFixed(2)}`;

  return (
    <div className="bg-alkota-white min-h-screen pt-[60px]">
      {/* Header bar */}
      <div className="bg-alkota-carbon tech-grid-dark border-b border-white/10 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-alkota-signal tracking-widest uppercase mb-2">
            ALKOTA SUPPLY / CART
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-alkota-white tracking-tight">
            Your Cart
            {totalItems > 0 && (
              <span className="font-mono text-xl text-alkota-slate ml-4">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
            <ShoppingBag className="w-16 h-16 text-alkota-black/10" strokeWidth={1} />
            <div>
              <div className="font-display font-semibold text-xl text-alkota-black mb-2">Your cart is empty.</div>
              <div className="font-mono text-xs text-alkota-slate tracking-widest uppercase">
                Nothing here from the workshop yet.
              </div>
            </div>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-alkota-carbon text-alkota-white font-mono font-semibold text-xs tracking-wider uppercase hover:bg-alkota-signal transition-colors"
            >
              <span>BROWSE ALKOTA SUPPLY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-7 space-y-1">
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-alkota-black/10 font-mono text-[10px] text-alkota-slate tracking-widest uppercase">
                <div className="col-span-7">PRODUCT</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-2 text-right">TOTAL</div>
                <div className="col-span-1" />
              </div>

              {state.items.map((item) => {
                const variantStr = Object.entries(item.selectedVariants)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(" · ");
                return (
                  <div
                    key={`${item.product.id}-${variantStr}`}
                    className="grid grid-cols-12 gap-4 py-5 border-b border-alkota-black/10 items-center"
                  >
                    {/* Product info */}
                    <div className="col-span-7 flex gap-4 items-center">
                      <ProductThumbnail placeholder={item.product.imagePlaceholder} />
                      <div>
                        <div className="font-mono text-[9px] text-alkota-signal tracking-widest uppercase mb-0.5">
                          {item.product.id}
                        </div>
                        <Link
                          href={`/store/${item.product.slug}`}
                          className="font-display font-semibold text-sm text-alkota-black hover:text-alkota-signal transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        {variantStr && (
                          <div className="font-mono text-[10px] text-alkota-slate tracking-wide mt-0.5">{variantStr}</div>
                        )}
                        <div className="font-mono text-xs text-alkota-black/70 mt-1">
                          {item.product.price !== null
                            ? formatPrice(item.product.price)
                            : <span className="text-alkota-slate">COMING SOON</span>}
                        </div>
                      </div>
                    </div>

                    {/* Qty */}
                    <div className="col-span-2 flex items-center justify-center border border-alkota-black/15">
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedVariants, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-alkota-slate hover:text-alkota-black transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs text-alkota-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedVariants, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-alkota-slate hover:text-alkota-black transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 font-mono text-sm text-alkota-black text-right">
                      {item.product.price !== null
                        ? formatPrice(item.product.price * item.quantity)
                        : "—"}
                    </div>

                    {/* Remove */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedVariants)}
                        className="p-1 text-alkota-slate hover:text-alkota-black transition-colors"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 flex items-center justify-between">
                <Link
                  href="/store"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-alkota-slate hover:text-alkota-black tracking-wider uppercase transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>CONTINUE SHOPPING</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="font-mono text-[10px] text-alkota-slate hover:text-alkota-black tracking-wider uppercase transition-colors"
                >
                  CLEAR CART
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="bg-alkota-carbon/5 border border-alkota-black/10 p-6 space-y-5 tech-grid-light">
                <div className="font-mono text-[10px] text-alkota-slate tracking-widest uppercase">
                  ORDER SUMMARY
                </div>

                {state.items.map((item) => {
                  const variantStr = Object.entries(item.selectedVariants)
                    .map(([, v]) => v).join(" · ");
                  return (
                    <div key={`${item.product.id}-${variantStr}`} className="flex justify-between text-xs">
                      <span className="font-sans text-alkota-graphite flex-1 pr-4">
                        {item.product.name}
                        {variantStr && <span className="text-alkota-slate"> · {variantStr}</span>}
                        {" "}<span className="text-alkota-slate">×{item.quantity}</span>
                      </span>
                      <span className="font-mono text-alkota-black flex-shrink-0">
                        {item.product.price !== null ? formatPrice(item.product.price * item.quantity) : "—"}
                      </span>
                    </div>
                  );
                })}

                <div className="border-t border-alkota-black/10 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-alkota-slate uppercase tracking-wider">Subtotal</span>
                    <span className="font-mono text-sm font-semibold text-alkota-black">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-alkota-slate uppercase tracking-wider">Shipping</span>
                    <span className="font-mono text-xs text-alkota-slate">Calculated at checkout</span>
                  </div>
                </div>

                <div className="font-mono text-[10px] text-alkota-slate/80 leading-relaxed">
                  Pre-launch items: no payment is taken until dispatch is confirmed.
                  Early customers receive priority access to future Alkota Supply drops.
                </div>

                {/* Checkout CTA — Stripe integration placeholder */}
                <button
                  disabled
                  className="w-full py-4 bg-alkota-carbon/40 text-alkota-slate font-mono font-semibold text-xs tracking-wider uppercase cursor-not-allowed border border-alkota-black/10"
                  title="Checkout opens at launch"
                >
                  CHECKOUT — COMING AT LAUNCH
                </button>

                <Link
                  href="/store"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 border border-alkota-black/20 text-alkota-graphite font-mono font-semibold text-xs tracking-wider uppercase hover:border-alkota-black hover:text-alkota-black transition-colors"
                >
                  BROWSE MORE
                </Link>

                <div className="font-mono text-[10px] text-alkota-slate/60 text-center tracking-wide">
                  SECURE CHECKOUT · STRIPE INTEGRATION PENDING
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
