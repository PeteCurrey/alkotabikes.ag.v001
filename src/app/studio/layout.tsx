import React from "react";
import type { Metadata } from "next";
import StudioShell from "./StudioShell";

export const metadata: Metadata = {
  title: "Alkota Studio",
  description: "Alkota Studio — Product, Content & Development Control",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudioShell>{children}</StudioShell>;
}
