"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { StepProps } from "../types";

type NameStepProps = Omit<StepProps, 'onBack'>;

export function NameStep({ onNext, data, setData }: NameStepProps) {
  const [isComposing, setIsComposing] = useState(false);
  const [inputValue, setInputValue] = useState(data.name || "");

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

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    const value = e.currentTarget.value;
    setInputValue(value);
    setData({ ...data, name: value });
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
        onClick={onNext} 
        disabled={!data.name?.trim()}
        className="w-full"
      >
        下一步
      </Button>
    </div>
  );
} 