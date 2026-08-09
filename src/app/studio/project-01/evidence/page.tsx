import { Metadata } from "next";
import EvidenceClient from "./EvidenceClient";

export const metadata: Metadata = {
  title: "Engineering Evidence — Alkota Studio",
  robots: { index: false, follow: false },
};

export default function EvidencePage() {
  return <EvidenceClient />;
}
