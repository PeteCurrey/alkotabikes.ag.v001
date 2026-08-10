import { NextResponse } from "next/server";
import { saveBuild, getBuildByReference, attachBuildToRegistration } from "@/lib/db/services";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      frameSize,
      wheelFormat,
      finish,
      selections,
      fitInputs,
      email,
      sessionToken,
      region,
      registrationReference,
    } = body;

    if (!frameSize || !wheelFormat || !finish) {
      return NextResponse.json(
        { error: "frameSize, wheelFormat, and finish are required parameters." },
        { status: 400 }
      );
    }

    const result = await saveBuild({
      frameSize,
      wheelFormat,
      finish,
      selections: selections || {},
      fitInputs: fitInputs || {},
      email,
      sessionToken,
      region: region || "uk",
      registrationReference,
      source: "CONFIGURATOR_API",
    });

    if (registrationReference && result.success && result.buildReference) {
      await attachBuildToRegistration(result.buildReference, registrationReference);
    }

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (err: any) {
    console.error("API POST /api/builds error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");

    if (!ref) {
      return NextResponse.json({ error: "Query parameter 'ref' is required." }, { status: 400 });
    }

    const build = await getBuildByReference(ref);
    if (!build) {
      return NextResponse.json({ error: "Build reference not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, build }, { status: 200 });
  } catch (err: any) {
    console.error("API GET /api/builds error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
