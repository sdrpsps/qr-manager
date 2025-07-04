import { and, eq } from "drizzle-orm";

import { createDb } from "@/lib/db";
import { qrCodes } from "@/lib/db/schema";

export const getQRCode = async (id: string) => {
  const db = await createDb();

  const qrCode = await db.query.qrCodes.findFirst({
    columns: {
      id: true,
      sourceFileKey: true,
      imageKey: true,
      isActive: true,
      deletedAt: true,
    },
    where: eq(qrCodes.id, id),
  });

  return qrCode;
};

export const getQRCodeWithUserId = async (id: string, userId: string) => {
  const db = await createDb();

  const qrCode = await db.query.qrCodes.findFirst({
    columns: {
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    },
    where: and(eq(qrCodes.id, id), eq(qrCodes.userId, userId)),
  });

  return qrCode;
};
