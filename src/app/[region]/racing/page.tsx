import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import RacingClient from "./RacingClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const isUS = region === "us";
  const title = isUS
    ? "Alkota Racing US | Development Programme 2027"
    : "Alkota Racing UK | Development Programme 2027";
  const description = isUS
    ? "Alkota Racing US is the planned 2027 US race-development programme for Project 01, taking prototype validation into US competition ahead of 2028 launch."
    : "Alkota Racing UK is the planned 2027 UK & European race-development programme for Project 01, taking prototype validation into competition ahead of 2028 launch.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${region}/racing`,
      languages: {
        "en-GB": `${siteUrl}/uk/racing`,
        "en-US": `${siteUrl}/us/racing`,
        "x-default": `${siteUrl}/us/racing`,
      },
    },
    openGraph: {
      title: `${title} | Alkota Cycles`,
      description,
      images: ["/images/story/mountain-event-paddock-environment.jpg"],
    },
  };
}

export default async function RacingPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const isUS = resolvedParams.region === "us";

  return (
    <>
      <div className="sr-only">
        <h1>{isUS ? "ALKOTA RACING US PROGRAMME 2027" : "ALKOTA RACING UK PROGRAMME 2027"}</h1>
        <p>
          {isUS
            ? "Describing Alkota Racing US division testing and race validation across North American venues."
            : "Describing Alkota Racing UK & European division testing and race validation across UK/EEA venues."}
        </p>
      </div>
      <RacingClient />
    </>
  );
}
