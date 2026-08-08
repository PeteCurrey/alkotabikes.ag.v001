/**
 * GET/PATCH /api/partner/pdi/[allocationId]
 * PDI record management — scoped to authenticated dealer only.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getPDIByAllocationAndDealer,
  createPDIRecord,
  updatePDIRecord,
} from "@/lib/partner/store";
import { createEmptyPDIStages } from "@/lib/partner/pdiTypes";
import type { PDIStageId, PDIStageStatus } from "@/lib/partner/pdiTypes";
import { randomUUID } from "crypto";

function getPartnerSession(req: NextRequest) {
  const cookie = req.cookies.get("alkota-partner-session");
  if (!cookie) return null;
  try {
    return JSON.parse(
      Buffer.from(cookie.value, "base64").toString("utf-8").replace("alkota-partner:", "")
    );
  } catch {
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ allocationId: string }> }
) {
  const { allocationId } = await params;
  const session = getPartnerSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const record = getPDIByAllocationAndDealer(allocationId, session.partnerId);

  // If no PDI record yet, return empty scaffold
  if (!record) {
    return NextResponse.json({
      pdi: null,
      scaffold: {
        allocationId,
        dealerId: session.partnerId,
        stages: createEmptyPDIStages(),
      },
    });
  }

  return NextResponse.json({ pdi: record });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ allocationId: string }> }
) {
  const { allocationId } = await params;
  const session = getPartnerSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const body = await req.json();
  const { stage, status, setupRecord, notes } = body;

  let record = getPDIByAllocationAndDealer(allocationId, session.partnerId);

  if (!record) {
    // Create new PDI record on first update
    const now = new Date().toISOString();
    record = {
      id: randomUUID(),
      allocationId,
      dealerId: session.partnerId,
      technicianId: null,
      stages: createEmptyPDIStages(),
      setupRecord: null,
      startedAt: now,
      completedAt: null,
      handoverSignedAt: null,
      notes: null,
      createdAt: now,
      updatedAt: now,
    };
    createPDIRecord(record);
  }

  const updates: Partial<typeof record> = {};

  if (stage && status) {
    const validStage = stage as PDIStageId;
    const validStatus = status as PDIStageStatus;
    updates.stages = { ...record.stages, [validStage]: validStatus };
  }

  if (setupRecord !== undefined) updates.setupRecord = setupRecord;
  if (notes !== undefined) updates.notes = notes;

  const updated = updatePDIRecord(record.id, updates);
  return NextResponse.json({ pdi: updated });
}
