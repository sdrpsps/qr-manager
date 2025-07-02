import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { qrcodes } from "@/lib/db/schema";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ qrID: string }> }
) {
  const { qrID } = await params;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await createDb();

  const isExist = await db.query.qrcodes.findFirst({
    where: and(eq(qrcodes.id, qrID), eq(qrcodes.userId, session.user.id)),
  });

  if (!isExist) {
    return NextResponse.json({ message: "QR code not found" }, { status: 404 });
  }

  await db
    .update(qrcodes)
    .set({ isDeleted: true, deletedAt: new Date() })
    .where(and(eq(qrcodes.id, qrID), eq(qrcodes.userId, session.user.id)));

  return NextResponse.json({ message: "QR code deleted successfully" });
}
