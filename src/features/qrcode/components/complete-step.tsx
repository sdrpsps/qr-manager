"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUploadResponse } from "@/features/upload/types";

import { StepProps } from "../types";
import { CheckCircleIcon, Loader2Icon } from "lucide-react";

type CompleteStepProps = Omit<StepProps, "onNext" | "setData">;

export function CompleteStep({ onBack, data }: CompleteStepProps) {
  const [uploading, setUploading] = useState(true);
  const [qrFileKey, setQrFileKey] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload/qrcodes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(
          errorData.message || `Upload failed with status ${response.status}`
        );
      }

      const data = (await response.json()) as FileUploadResponse;
      setQrFileKey(data.data.key);
      toast.success("二维码上传成功！");
    } catch (error) {
      console.error("Upload error:", error);

      let errorMessage = "二维码上传失败，请返回上一步重试";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (data.qrFile) {
      handleUpload(data.qrFile);
    }
  }, [data.qrFile]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        {uploading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2Icon className="size-10 animate-spin" />
            <p className="text-sm text-gray-600">
              您的二维码 &ldquo;{data.name}&rdquo; 正在上传中
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <CheckCircleIcon className="size-10 text-green-500" />
            <h3 className="text-lg font-semibold">生成完成！</h3>
            <a
              href={`/api/file/${qrFileKey}`}
              target="_blank"
              download={`${data.name}.png`}
            >
              <Image
                src={`/api/file/${qrFileKey}`}
                quality={100}
                alt="二维码"
                width={300}
                height={300}
              />
            </a>
            <p className="text-sm text-gray-600">
              您的二维码 &ldquo;{data.name}&rdquo; 已准备就绪，点击图片即可下载
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          上一步
        </Button>

        <Button className="flex-1" disabled={uploading}>
          完成
        </Button>
      </div>
    </div>
  );
}
