import React from "react";
import { Metadata } from "next";
import RacingClient from "./RacingClient";

export const metadata: Metadata = {
  title: "Alkota Racing | Development Programme 2027",
  description:
    "Alkota Racing is the planned 2027 race-development programme for Project 01, taking prototype validation from engineering and trail testing into competition ahead of the 2028 production launch.",
  openGraph: {
    title: "Alkota Racing | Development Programme 2027",
    description:
      "Alkota Racing is the planned 2027 race-development programme for Project 01, taking prototype validation from engineering and trail testing into competition ahead of the 2028 production launch.",
    images: ["/images/story/mountain-event-paddock-environment.png"],
  },
};

export default function RacingPage() {
  return <RacingClient />;
}
