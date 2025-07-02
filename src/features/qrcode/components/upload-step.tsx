"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/features/upload/components/file-upload";
import { MaxSizeResponse } from "@/features/upload/types";

import { StepProps } from "../types";

export function UploadStep({ onNext, onBack, data, setData }: StepProps) {
  const [maxSizeMB, setMaxSizeMB] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getMaxSizeMB = async () => {
    const response = await fetch("/api/upload/max");
    const data = (await response.json()) as MaxSizeResponse;
    setMaxSizeMB(data.data);
  };

  const handleFileUpload = (qrImageKey: string, fileName: string) => {
    setData({ ...data, qrImageKey, fileName });
  };

  const handleNext = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/qrcode/update/attachment", {
        method: "POST",
        body: JSON.stringify({ qrId: data.qrId, attachmentKey: data.qrImageKey }),
      });

      if (!res.ok) {
        toast.error("更新二维码失败");
        return;
      }

      onNext();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMaxSizeMB();
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        上传您想要生成二维码的内容文件
      </div>
      <FileUpload
        defaultFileName={data.fileName}
        maxSizeMB={maxSizeMB}
        onFileUploadSuccess={handleFileUpload}
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          上一步
        </Button>
        <Button
          onClick={handleNext}
          disabled={!data.qrImageKey || loading}
          className="flex-1"
        >
          {loading ? <Loader2Icon className="size-4 animate-spin" /> : "下一步"}
        </Button>
      </div>
    </div>
  );
}
