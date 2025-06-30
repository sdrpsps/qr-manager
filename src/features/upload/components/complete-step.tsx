"use client";

import { Button } from "@/components/ui/button";

import { StepProps } from "../types";

type CompleteStepProps = Omit<StepProps, "onNext" | "setData">;

export function CompleteStep({ onBack, data }: CompleteStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">生成完成！</h3>
        <p className="text-sm text-gray-600 mb-4">
          您的二维码 &ldquo;{data.name}&rdquo; 已准备就绪
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          上一步
        </Button>

        <Button className="flex-1">完成</Button>
      </div>
    </div>
  );
}
