import React from "react";
import { Metadata } from "next";
import DesignArchiveClient from "./DesignArchiveClient";

export const metadata: Metadata = {
  title: "Project 01 Design Archive | Alkota",
  description:
    "Explore the sketches, geometry studies, suspension development, carbon work and engineering artifacts behind Alkota Project 01. The drawings behind the machine.",
  openGraph: {
    title: "Project 01 Design Archive | Alkota",
    description:
      "Explore the sketches, geometry studies, suspension development, carbon work and engineering artifacts behind Alkota Project 01.",
  },
};

export default function DesignArchivePage() {
  return <DesignArchiveClient />;
}
