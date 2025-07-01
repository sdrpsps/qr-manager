"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/features/upload/components/file-upload";
import { MaxSizeResponse } from "@/features/upload/types";

import { StepProps } from "../types";

export function UploadStep({ onNext, onBack, data, setData }: StepProps) {
  const [maxSizeMB, setMaxSizeMB] = useState<number>(0);

  const getMaxSizeMB = async () => {
    const response = await fetch("/api/upload/max");
    const data = (await response.json()) as MaxSizeResponse;
    setMaxSizeMB(data.data);
  };

  const handleFileUpload = (fileKey: string, fileName: string) => {
    setData({ ...data, fileKey, fileName });
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
        <Button onClick={onNext} disabled={!data.fileKey} className="flex-1">
          下一步
        </Button>
      </div>
    </div>
  );
}
