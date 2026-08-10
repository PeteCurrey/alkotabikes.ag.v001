import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { STORE_MODE } from "@/lib/featureFlags";
import CartPageClient from "./CartPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/cart",
    title: "Cart | Alkota Supply",
    description: "Your Alkota Supply cart.",
  });
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  if (STORE_MODE !== "TRANSACTIONAL") {
    redirect(`/${regionCode}/store`);
  }
  return <CartPageClient />;
}
