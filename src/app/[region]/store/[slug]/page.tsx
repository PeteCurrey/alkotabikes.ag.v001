import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/content/store/products";
import ProductClient from "./ProductClient";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { STORE_MODE } from "@/lib/featureFlags";
import { getCommerceGateStatus } from "@/lib/legal-status";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; slug?: string }>;
}): Promise<Metadata> {
  const { region, slug } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const pageSlug = slug ?? "";
  const displayTitle = pageSlug ? `Product Not Found — ${pageSlug.replace(/-/g, " ").toUpperCase()}` : "Product Not Found";
  return buildRegionalMetadata({
    region: regionCode,
    path: `/store/${pageSlug}`,
    title: displayTitle,
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  // ── Server-side commerce gate ─────────────────────────────────────────────
  // STORE_MODE=CATALOGUE → cart always blocked regardless of legal gate.
  // STORE_MODE=TRANSACTIONAL → legal gate must also pass.
  const gate = getCommerceGateStatus();
  const cartEnabled =
    STORE_MODE === "TRANSACTIONAL" && gate.permitted;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
    { name: product.name, path: `/store/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ProductClient product={product} cartEnabled={cartEnabled} />
    </>
  );
}
