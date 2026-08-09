import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = `${product.name} | Alkota Cycles`;

  return {
    title,
    description: product.description,
    alternates: {
      canonical: `${siteUrl}/store/${slug}`,
    },
    openGraph: {
      title,
      description: product.description,
      url: `${siteUrl}/store/${slug}`,
    },
  };
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
