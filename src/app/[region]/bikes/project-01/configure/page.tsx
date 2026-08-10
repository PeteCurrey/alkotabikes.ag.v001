import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/bikes/project-01/configure",
    title: "Configure",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function BikeConfigureRedirect({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  redirect(`/${region}/configure`);
}
