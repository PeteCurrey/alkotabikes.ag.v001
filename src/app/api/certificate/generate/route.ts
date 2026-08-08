import { NextResponse } from "next/server";
import { createCertificateData, generateCertificateHTML } from "@/lib/certificate/pdfEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { buildRef, fitRef, finish, size } = body;

    const certData = createCertificateData(
      buildRef || "P01-CFG-A8F2E4",
      fitRef || "P01-FIT-7C91D3",
      finish || "CARBON",
      size || "L"
    );

    const html = generateCertificateHTML(certData);

    return NextResponse.json({
      success: true,
      data: certData,
      html,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate certificate." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const buildRef = searchParams.get("buildRef") || "P01-CFG-A8F2E4";
  const fitRef = searchParams.get("fitRef") || "P01-FIT-7C91D3";
  const finish = (searchParams.get("finish") as "GLACIER" | "CARBON") || "CARBON";
  const size = searchParams.get("size") || "L";

  const certData = createCertificateData(buildRef, fitRef, finish, size);
  const html = generateCertificateHTML(certData);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
