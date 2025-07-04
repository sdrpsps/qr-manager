"use client";

import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useCreateQRCode } from "../api/use-create-qr-code";
import { useUpdateQRCodeName } from "../api/use-update-qr-code-name";
import { StepProps } from "../types";

type NameStepProps = Omit<StepProps, "onBack">;

export function NameStep({ onNext, data, setData }: NameStepProps) {
  const [isComposing, setIsComposing] = useState(false);
  const [inputValue, setInputValue] = useState(data.name || "");

  const { mutate: createQRCode, isPending: isCreatingQRCode } =
    useCreateQRCode();
  const { mutate: updateQRCodeName, isPending: isUpdatingName } =
    useUpdateQRCodeName();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 只在非合成状态下更新父组件数据
    if (!isComposing) {
      setInputValue(value);
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
  };

  const handleNext = async () => {
    if (!inputValue?.trim()) {
      toast.error("请输入二维码名称");
      return;
    }

    if (!data.id) {
      createQRCode(
        { json: { name: inputValue } },
        {
          onSuccess: (response) => {
            setData({ ...data, id: response.data.id, name: inputValue });
            onNext();
          },
        }
      );
    } else {
      updateQRCodeName(
        { param: { id: data.id }, json: { name: inputValue } },
        {
          onSuccess: () => {
            setData({ ...data, name: inputValue });
            onNext();
          },
        }
      );
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
        disabled={!inputValue?.trim() || isCreatingQRCode || isUpdatingName}
        className="w-full"
      >
        {isCreatingQRCode || isUpdatingName ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          "下一步"
        )}
      </Button>
    </div>
  );
}
