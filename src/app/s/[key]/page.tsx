import { headers as getHeaders } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { getQRCode } from "@/features/qrCode/actions/get-qr-code";
import { recordQrCodeView } from "@/features/qrCode/actions/record-qr-code-view";

interface ShareKeyProps {
  params: Promise<{
    key: string;
  }>;
}

export default async function ShareKeyPage({ params }: ShareKeyProps) {
  const { key } = await params;

  const qrCode = await getQRCode(key);
  if (
    !qrCode ||
    !qrCode.isActive ||
    !qrCode.sourceFileKey ||
    qrCode.deletedAt
  ) {
    return notFound();
  }

  // 提取访问信息
  const headers = await getHeaders();
  const ipAddress =
    headers.get("x-forwarded-for")?.split(",")[0] ||
    headers.get("x-real-ip") ||
    "";
  const userAgent = headers.get("user-agent") || "";
  const referrer = headers.get("referer") || "";

  // 记录浏览
  await recordQrCodeView({
    qrCodeId: qrCode.id,
    ipAddress,
    userAgent,
    referrer,
  });

  // 重定向到目标文件
  const url = `${process.env.NEXT_PUBLIC_BUCKET_ADDRESS}/${qrCode.sourceFileKey}`;

  return redirect(url);
}
