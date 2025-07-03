import { eq } from "drizzle-orm";

import { createDb } from "@/lib/db";
import { qrCodes } from "@/lib/db/schema";

export const getQRCode = async (key: string) => {
  const db = await createDb();

  const qrCode = await db.query.qrCodes.findFirst({
    where: eq(qrCodes.id, key),
  });

  return qrCode;
};
