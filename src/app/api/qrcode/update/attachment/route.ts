import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { qrcodes } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { qrId, attachmentKey } = (await request.json()) as {
    qrId: string;
    attachmentKey: string;
  };

  const db = await createDb();

  const result = await db
    .update(qrcodes)
    .set({ attachmentKey })
    .where(and(eq(qrcodes.id, qrId), eq(qrcodes.userId, session.user.id)))
    .returning();

  if (!result[0]) {
    return NextResponse.json(
      { message: "Failed to update QR code" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "QR code updated successfully",
    data: result[0],
  });
}
