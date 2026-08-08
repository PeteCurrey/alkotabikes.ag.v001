import React from "react";
import { Metadata } from "next";
import FitClient from "./FitClient";

export const metadata: Metadata = {
  title: "Rider Fit Engine | Alkota Project 01",
  description:
    "The rider is part of the geometry. Use dimensions, riding style and priorities to create a controlled development fit direction for Project 01.",
};

export default function FitPage() {
  return <FitClient />;
}
