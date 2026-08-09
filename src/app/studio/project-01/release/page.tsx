import { Metadata } from "next";
import ReleaseClient from "./ReleaseClient";

export const metadata: Metadata = {
  title: "R00 Release Readiness — Alkota Studio",
  robots: { index: false, follow: false },
};

export default function ReleasePage() {
  return <ReleaseClient />;
}
