import { TriangleAlertIcon } from "lucide-react";
import { headers } from "next/headers";

import { getQRCodeWithUserId } from "@/features/qr-code/actions/get-qr-code";
import { QRCodeUpdateProgress } from "@/features/qr-code/components/qr-code-update-progress";
import { auth } from "@/lib/auth";
import { presetStyles } from "@/features/qr-code/constants";

interface UpdateIdProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function UpdateIdPage({ params }: UpdateIdProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id } = await params;

  const qrCode = await getQRCodeWithUserId(id, session!.user.id);

  if (!qrCode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-secondary rounded-md p-4 shadow-md flex flex-col items-center justify-center gap-4">
          <TriangleAlertIcon className="size-10 text-destructive" />
          <h1 className="text-2xl font-bold">二维码不存在</h1>
          <p className="text-sm text-muted-foreground">
            请检查二维码是否存在或已删除
          </p>
        </div>
      </div>
    );
  }

  const step = !qrCode.sourceFileKey ? 2 : 3;

  return (
    <div className="container mx-auto px-4 py-8">
      <QRCodeUpdateProgress
        currentData={{
          name: qrCode.name,
          id: qrCode.id,
          imageKey: qrCode.imageKey,
          sourceFileKey: qrCode.sourceFileKey,
          styleOptions: qrCode.styleOptions
            ? JSON.parse(qrCode.styleOptions)
            : presetStyles.classic.options,
        }}
        step={step}
      />
    </div>
  );
}
