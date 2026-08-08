import React from "react";
import { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Partner Portal | Alkota Partner Network",
  description:
    "Alkota Partner Network partner portal. Access reserved for confirmed Alkota Partner Network members.",
  robots: { index: false, follow: false },
};

export default function PartnersPage() {
  return <PartnersClient />;
}
