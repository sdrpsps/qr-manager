"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepProps } from "../types";

// 二维码样式选项
const QR_STYLES = [
  { id: "classic", name: "经典样式", description: "黑白相间的传统二维码" },
  { id: "colorful", name: "彩色样式", description: "带有颜色的现代二维码" },
  { id: "rounded", name: "圆角样式", description: "圆角设计的柔和二维码" },
  { id: "gradient", name: "渐变样式", description: "渐变色彩的时尚二维码" },
];

export function StyleStep({ onNext, onBack, data, setData }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        选择您喜欢的二维码样式
      </div>
      <div className="grid grid-cols-2 gap-3">
        {QR_STYLES.map((style) => (
          <Card
            key={style.id}
            className={`cursor-pointer transition-all ${
              data.style === style.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:shadow-md"
            }`}
            onClick={() => setData({ ...data, style: style.id })}
          >
            <CardContent className="p-4">
              <div className="text-sm font-medium">{style.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {style.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          上一步
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!data.style}
          className="flex-1"
        >
          生成二维码
        </Button>
      </div>
    </div>
  );
} 