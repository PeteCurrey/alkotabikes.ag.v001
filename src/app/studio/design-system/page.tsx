import React from "react";
import { Metadata } from "next";
import DesignSystemClient from "./DesignSystemClient";

export const metadata: Metadata = {
  title: "Design System Showcase | Alkota Studio",
  description: "Internal design system reference and component showcase.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  return <DesignSystemClient />;
}
