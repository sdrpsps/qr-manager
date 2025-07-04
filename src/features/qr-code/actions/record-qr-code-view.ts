import { createDb } from "@/lib/db";
import { qrCodeViews } from "@/lib/db/schema";

export interface RecordQrCodeViewParams {
  qrCodeId: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  metadata?: string;
}

export const recordQrCodeView = async (params: RecordQrCodeViewParams) => {
  const db = await createDb();

  await db.insert(qrCodeViews).values({
    qrCodeId: params.qrCodeId,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    referrer: params.referrer,
    metadata: params.metadata,
  });
};
