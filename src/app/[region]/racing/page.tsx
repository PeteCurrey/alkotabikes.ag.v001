import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import RacingClient from "./RacingClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/racing",
    title: "Racing",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
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
