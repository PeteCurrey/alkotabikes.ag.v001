import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Engineering",
  description:
    "Get in touch with Alkota Cycles engineering and customer support. Enquire about Project 01 development, technical specifications, or partner network.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Engineering",
    description:
      "Get in touch with Alkota Cycles engineering and customer support. Enquire about Project 01 development, technical specifications, or partner network.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
