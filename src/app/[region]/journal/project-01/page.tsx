import React from "react";
import { Metadata } from "next";
import JournalHubClient from "./JournalHubClient";

export const metadata: Metadata = {
  title: "Project 01 Development Journal | Alkota",
  description:
    "You're early. That's the point. The chronological engineering and founder record of Alkota Project 01 becoming real ahead of the planned 2028 production launch.",
  openGraph: {
    title: "Project 01 Development Journal | Alkota",
    description:
      "You're early. That's the point. The chronological engineering and founder record of Alkota Project 01.",
  },
};

export default function JournalHubPage() {
  return <JournalHubClient />;
}
