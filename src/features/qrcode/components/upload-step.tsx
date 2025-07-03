"use client";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/features/upload/components/file-upload";

import { useUpdateQRCodeSourceFileKey } from "../api/use-update-qr-code-source-file";
import { StepProps } from "../types";

export function UploadStep({ onNext, onBack, data, setData }: StepProps) {
  const { mutate: updateQRCodeSourceFileKey, isPending } =
    useUpdateQRCodeSourceFileKey();

  const onFileUploadSuccess = (sourceFileKey: string, fileName: string) => {
    setData({ ...data, fileName });

    updateQRCodeSourceFileKey({
      param: { id: data.qrId },
      json: { sourceFileKey },
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        上传您想要生成二维码的内容文件
      </div>
      <FileUpload
        fileName={data.fileName}
        onFileUploadSuccess={onFileUploadSuccess}
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          上一步
        </Button>
        <Button
          onClick={onNext}
          disabled={!data.fileName || isPending}
          className="flex-1"
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            "下一步"
          )}
        </Button>
      </div>
    </div>
  );
}
