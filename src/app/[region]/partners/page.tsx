import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import PartnerRecruitmentClient from "./PartnerRecruitmentClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/partners",
    title: "Partners",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;

  return (
    <>
      {/* SSR Shell for Search Engine Indexing */}
      <div className="sr-only">
        <h2>ALKOTA PARTNER NETWORK CRITERIA ({regionCode.toUpperCase()})</h2>
        <ul>
          <li>APN-01: TECHNICAL COMPETENCE</li>
          <li>APN-02: CUSTOMER PHILOSOPHY</li>
          <li>APN-03: FIT CAPABILITY</li>
          <li>APN-04: BRAND ALIGNMENT</li>
        </ul>
      </div>
      <PartnerRecruitmentClient />
    </>
  );
}
