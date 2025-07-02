"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { QRCode } from "@/lib/db/schema";

import { StepProps } from "../types";
import { Loader2Icon } from "lucide-react";

type NameStepProps = Omit<StepProps, "onBack">;

export function NameStep({ onNext, data, setData }: NameStepProps) {
  const [isComposing, setIsComposing] = useState(false);
  const [inputValue, setInputValue] = useState(data.name || "");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 只在非合成状态下更新父组件数据
    if (!isComposing) {
      setData({ ...data, name: value });
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    const value = e.currentTarget.value;
    setInputValue(value);
    setData({ ...data, name: value });
  };

  const handleNext = async () => {
    if (!data.name?.trim()) {
      toast.error("请输入二维码名称");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/qrcode/create", {
        method: "POST",
        body: JSON.stringify({ name: data.name }),
      });

      if (!res.ok) {
        toast.error("创建二维码失败");
        return;
      }

      const response = (await res.json()) as {
        message: string;
        data: QRCode;
      };

      setData({
        ...data,
        qrId: response.data.id,
      });

      onNext();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="qr-name" className="block text-sm font-medium mb-2">
          给您的二维码起个名字
        </label>
        <input
          id="qr-name"
          type="text"
          placeholder="例如：我的个人名片二维码"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={handleInputChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </div>
      <Button
        onClick={handleNext}
        disabled={!data.name?.trim() || loading}
        className="w-full"
      >
        {loading ? <Loader2Icon className="size-4 animate-spin" /> : "下一步"}
      </Button>
    </div>
  );
}
