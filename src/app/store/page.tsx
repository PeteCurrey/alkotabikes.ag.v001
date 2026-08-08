import React from "react";
import { Metadata } from "next";
import StoreClient from "./StoreClient";

export const metadata: Metadata = {
  title: "Alkota Supply | Workshop & Paddock Equipment",
  description:
    "Alkota Supply — the things we wear, carry and use while building Project 01. Workshop apparel, equipment and accessories from the Alkota development programme.",
  openGraph: {
    title: "Alkota Supply | Workshop & Paddock Equipment",
    description:
      "Alkota Supply — the things we wear, carry and use while building Project 01.",
  },
};

export default function StorePage() {
  return <StoreClient />;
}
