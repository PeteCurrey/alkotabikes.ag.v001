import React from "react";
import { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Cart | Alkota Supply",
  description: "Your Alkota Supply cart.",
};

export default function CartPage() {
  return <CartPageClient />;
}
