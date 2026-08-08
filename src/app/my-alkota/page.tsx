import React from "react";
import { Metadata } from "next";
import MyAlkotaClient from "./MyAlkotaClient";

export const metadata: Metadata = {
  title: "My Alkota | Owner Portal",
  description:
    "Your Alkota development membership. Manage your Project 01 registration, saved build, fit reference and development updates.",
  robots: { index: false, follow: false },
};

export default function MyAlkotaPage() {
  return <MyAlkotaClient />;
}
