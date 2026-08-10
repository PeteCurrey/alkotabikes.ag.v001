"use client";

// ALKOTA Cart Context — Client-side only
// Architectured for future Stripe integration (ENABLE_PAID_RESERVATIONS=false)

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { Product } from "@/content/store/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>; // e.g. { SIZE: "M", COLOUR: "Black" }
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantKey: string } }
  | { type: "UPDATE_QTY"; payload: { productId: string; variantKey: string; quantity: number } }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CLEAR_CART" };

function variantKey(variants: Record<string, string>): string {
  return Object.entries(variants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = variantKey(action.payload.selectedVariants);
      const existingIndex = state.items.findIndex(
        (i) =>
          i.product.id === action.payload.product.id &&
          variantKey(i.selectedVariants) === key
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: updated, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.payload.productId &&
              variantKey(i.selectedVariants) === action.payload.variantKey
            )
        ),
      };
    case "UPDATE_QTY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) =>
              !(
                i.product.id === action.payload.productId &&
                variantKey(i.selectedVariants) === action.payload.variantKey
              )
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId &&
          variantKey(i.selectedVariants) === action.payload.variantKey
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variants: Record<string, string>) => void;
  updateQty: (productId: string, variants: Record<string, string>, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }), []);
  const removeItem = useCallback(
    (productId: string, variants: Record<string, string>) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId, variantKey: variantKey(variants) } }),
    []
  );
  const updateQty = useCallback(
    (productId: string, variants: Record<string, string>, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { productId, variantKey: variantKey(variants), quantity } }),
    []
  );
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + (i.product.prices?.uk?.amountMinor ?? 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQty, openCart, closeCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
