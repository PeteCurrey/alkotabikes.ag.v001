import { Metadata } from "next";
import MediaGrid from "./MediaGrid";

export const metadata: Metadata = {
  title: "Media Library — Alkota Cycles Admin",
  robots: { index: false, follow: false },
};

export default function AdminMediaPage() {
  return <MediaGrid />;
}
