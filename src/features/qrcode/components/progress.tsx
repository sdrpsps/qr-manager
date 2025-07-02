"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { presetStyles } from "../constants";
import { QRCodeData, StepProps } from "../types";
import { CompleteStep } from "./complete-step";
import { NameStep } from "./name-step";
import { StyleStep } from "./style-step";
import { UploadStep } from "./upload-step";

// 步骤类型定义
type Step = {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<StepProps>;
};

// 主进度组件
export function QRCodeProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<QRCodeData>({
    name: "",
    qrId: "",
    qrFile: null,
    fileKey: "",
    fileName: "",
    styleOptions: presetStyles.classic.options,
  });

  const steps: Step[] = [
    {
      id: 1,
      title: "命名",
      description: "给二维码起个名字",
      component: NameStep,
    },
    {
      id: 2,
      title: "上传",
      description: "上传文件内容",
      component: UploadStep,
    },
    {
      id: 3,
      title: "样式",
      description: "定制二维码样式",
      component: StyleStep,
    },
    {
      id: 4,
      title: "完成",
      description: "上传二维码",
      component: CompleteStep,
    },
  ];

  const currentStepData = steps.find((step) => step.id === currentStep);
  // 进度从0开始，每完成一个步骤增加33.33%
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  // 计算进度条宽度，考虑步骤间距
  const getProgressWidth = () => {
    if (progress === 0) return "1.2rem";
    if (progress === 100) return "100%";
    return `calc(${progress}%)`;
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // 只允许跳转到已完成的步骤或当前步骤
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="relative mb-4">
            <Button
              className="absolute top-0 left-0"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href="/dashboard">
                <ArrowLeftIcon className="size-4" />
              </Link>
            </Button>
            <h2 className="text-2xl font-bold text-center">
              创建二维码 {data.name ? `- ${data.name}` : ""}
            </h2>
          </CardTitle>

          {/* 进度条和步骤指示器 */}
          <div className="space-y-4">
            {/* 步骤指示器 */}
            <div className="flex justify-between relative">
              {/* 进度条背景 */}
              <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 rounded-full border border-gray-300"></div>

              {/* 进度条填充 */}
              <div
                className="absolute top-4 left-4 h-1 bg-blue-600 rounded-full transition-all duration-300 border border-blue-600"
                style={{ width: getProgressWidth() }}
              ></div>

              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer relative z-10 ${
                    step.id <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-all duration-300 ${
                      step.id <= currentStep
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="text-xs text-center">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-gray-500">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* 当前步骤组件 */}
          {currentStepData && (
            <currentStepData.component
              onNext={handleNext}
              onBack={handleBack}
              data={data}
              setData={setData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
