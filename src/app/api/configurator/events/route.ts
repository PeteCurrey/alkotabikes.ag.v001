import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const events = Array.isArray(body) ? body : [body];

    if (events.length === 0) {
      return NextResponse.json({ success: true, count: 0 });
    }

    const rows = events.map((evt) => ({
      session_id: evt.sessionId || null,
      saved_build_id: evt.savedBuildId || null,
      model_id: evt.modelId || null,
      event_type: evt.eventType,
      group_key: evt.groupKey || null,
      option_key: evt.optionKey || null,
      step_index: typeof evt.stepIndex === "number" ? evt.stepIndex : null,
      market: evt.market || "GB",
      payload: evt.payload || null,
    }));

    const { error } = await supabaseAdmin.from("configurator_events").insert(rows);

    if (error) {
      console.warn("Failed to insert configurator events:", error.message);
    }

    return NextResponse.json({ success: true, count: rows.length });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
