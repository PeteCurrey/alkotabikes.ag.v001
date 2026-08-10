import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { PartnerPackDocument } from "@/components/partner/pdf/PartnerPackDocument";
import type { RegionCode } from "@/lib/regions";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const regionParam = searchParams.get("region") ?? "uk";
    const region: RegionCode = regionParam === "us" ? "us" : "uk";

    const partnerId = searchParams.get("partnerId");
    const rrpParam = searchParams.get("rrp");

    let userSuppliedRRP: number | undefined = undefined;
    if (rrpParam) {
      const parsed = parseInt(rrpParam, 10);
      if (!isNaN(parsed) && parsed > 0) {
        userSuppliedRRP = parsed;
      }
    }

    let partnerName: string | undefined = undefined;
    let partnerRef: string | undefined = undefined;
    let partnerTier: string | undefined = undefined;

    if (partnerId) {
      // Personalised variant parameters
      partnerName = "Apex Performance Cycles";
      partnerRef = partnerId;
      partnerTier = "Certified Partner";
    }

    const pdfDocumentElement = React.createElement(PartnerPackDocument, {
      region,
      partnerName,
      partnerTier,
      partnerRef,
      userSuppliedRRP,
    });

    const pdfBuffer = await renderToBuffer(pdfDocumentElement as any);

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="alkota-partner-pack-${region}.pdf"`,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error: any) {
    console.error("PDF Pack Generation Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate PDF Partner Pack." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
