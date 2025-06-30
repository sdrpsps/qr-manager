"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepProps } from "../types";

type CompleteStepProps = Omit<StepProps, "onNext" | "setData">;

export function CompleteStep({ onBack, data }: CompleteStepProps) {
  const [generating, setGenerating] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const generateQRCode = async () => {
    setGenerating(true);
    try {
    } catch (error) {
      console.error("生成二维码失败:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">生成完成！</h3>
        <p className="text-sm text-gray-600 mb-4">
          您的二维码 &ldquo;{data.name}&rdquo; 已成功生成
        </p>
      </div>

      {!qrCodeUrl ? (
        <div className="text-center">
          <Button
            onClick={generateQRCode}
            disabled={generating}
            className="w-full"
          >
            {generating ? "生成中..." : "生成二维码"}
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img
              src={qrCodeUrl}
              alt="生成的二维码"
              className="w-48 h-48 mx-auto"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(qrCodeUrl)}>
              下载二维码
            </Button>
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(qrCodeUrl)}
            >
              复制链接
            </Button>
          </div>
        </div>
      )}

      <Button variant="outline" onClick={onBack} className="w-full">
        重新生成
      </Button>
    </div>
  );
}
