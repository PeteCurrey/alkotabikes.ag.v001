import { Metadata } from "next";
import SlotEditor from "./SlotEditor";

export const metadata: Metadata = {
  title: "Content Slots — Alkota Cycles Admin",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return <SlotEditor />;
}
