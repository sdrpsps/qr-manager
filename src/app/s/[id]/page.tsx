import { headers as getHeaders } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { getQRCode } from "@/features/qr-code/actions/get-qr-code";
import { recordQrCodeView } from "@/features/qr-code/actions/record-qr-code-view";

interface ShareIdProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShareIdPage({ params }: ShareIdProps) {
  const { id } = await params;

  const qrCode = await getQRCode(id);
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
