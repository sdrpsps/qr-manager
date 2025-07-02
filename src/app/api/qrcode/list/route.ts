import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createDb } from "@/lib/db";
import { qrcodes } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await createDb();

  const list = await db.query.qrcodes.findMany({
    columns: {
      styleOptions: false,
      isDeleted: false,
      deletedAt: false,
    },
    where: and(
      eq(qrcodes.userId, session.user.id),
      eq(qrcodes.isDeleted, false)
    ),
    orderBy: [desc(qrcodes.createdAt)],
  });

  return NextResponse.json({ message: "success", data: list });
}
