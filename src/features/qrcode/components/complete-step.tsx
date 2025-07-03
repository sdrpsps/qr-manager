"use client";

import { CheckCircleIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

import { useUpdateQRCodeActive } from "../api/use-update-qr-code-active";
import { StepProps } from "../types";

type CompleteStepProps = Omit<StepProps, "onNext" | "setData">;

export function CompleteStep({ onBack, data }: CompleteStepProps) {
  const { mutate: updateQRCodeActive, isPending: isUpdatingQRCodeActive } =
    useUpdateQRCodeActive();

  const handleComplete = () => {
    updateQRCodeActive({
      param: { id: data.qrId },
      json: { isActive: true },
    });
  };

  useEffect(() => {
    handleComplete();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          {isUpdatingQRCodeActive ? (
            <Loader2Icon className="size-10 animate-spin" />
          ) : (
            <CheckCircleIcon className="size-10 text-green-500" />
          )}
          <h3 className="text-lg font-semibold">
            {isUpdatingQRCodeActive ? "启用中..." : "创建完成！"}
          </h3>
          <a
            href={`/static/${data.qrImageKey}`}
            target="_blank"
            download={`${data.qrName}.png`}
          >
            <Image
              src={`/static/${data.qrImageKey}`}
              quality={100}
              alt="二维码"
              width={300}
              height={300}
            />
          </a>
          <p className="text-sm text-gray-600">
            您的二维码 &ldquo;{data.qrName}&rdquo; 已准备就绪，点击图片即可下载
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          上一步
        </Button>

        <Button className="flex-1" disabled={isUpdatingQRCodeActive} asChild>
          <Link href="/dashboard">完成</Link>
        </Button>
      </div>
    </div>
  );
}
