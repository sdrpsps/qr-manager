"use client";

import {
  CircleAlertIcon,
  CopyIcon,
  DownloadIcon,
  EyeIcon,
  FilePenLineIcon,
  Loader,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getFileUrl } from "@/lib/utils";

import { useDuplicateQRCode } from "../api/use-duplicate-qr-code";
import { useGetQRCodes } from "../api/use-get-qr-codes";
import { useUpdateQRCodeActive } from "../api/use-update-qr-code-active";
import { useDeleteState } from "../hooks/use-delete-state";

export const QRCodeGrid = () => {
  const [, setDeleteId] = useDeleteState();

  const { data: qrCodes, isLoading } = useGetQRCodes();

  const { mutate: updateQRCodeActive } = useUpdateQRCodeActive();
  const { mutate: duplicateQRCode, isPending: isDuplicating } =
    useDuplicateQRCode();

  const handleUpdateQRCodeActive = (id: string, isActive: boolean) => {
    updateQRCodeActive(
      {
        param: { id },
        json: { isActive },
      },
      {
        onSuccess: () => {
          toast.success(`${isActive ? "启用" : "禁用"}成功`);
        },
      }
    );
  };

  const handleDuplicateQRCode = (id: string) => {
    duplicateQRCode(
      { param: { id } },
      {
        onSuccess: () => {
          toast.success("复制成功");
        },
      }
    );
  };

  return (
    <div className="flex flex-col p-6 border-2 border-dashed rounded-lg dark:border-gray-600 dark:bg-gray-800">
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader className="size-6 animate-spin" />
        </div>
      )}

      {!isLoading && qrCodes?.data.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-center text-gray-500 dark:text-gray-400">
            暂无二维码
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qrCodes?.data.map((qr) => {
            const isAccessible = qr.sourceFileKey && qr.imageKey;

            return (
              <div
                key={qr.id}
                className="p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="w-full aspect-square bg-gray-100 dark:bg-gray-600 mb-4 rounded-lg overflow-hidden">
                  {isAccessible ? (
                    <Image
                      src={getFileUrl(qr.imageKey)}
                      alt={qr.name}
                      width={256}
                      height={256}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center gap-2 text-gray-500 dark:text-gray-400">
                      <CircleAlertIcon className="size-10" />
                      <p className="text-sm">创建未完成</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 justify-between items-center gap-4">
                  <p className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {qr.name}
                  </p>

                  <div className="flex justify-end items-center space-x-2">
                    <Badge variant="secondary">
                      <EyeIcon />
                      {qr.viewCount}
                    </Badge>
                    <Label htmlFor="active-mode">启用</Label>
                    <Switch
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                      id="active-mode"
                      disabled={!isAccessible}
                      checked={qr.isActive}
                      onCheckedChange={(checked) => {
                        handleUpdateQRCodeActive(qr.id, checked);
                      }}
                    />
                  </div>

                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/update/${qr.id}`}>
                      <FilePenLineIcon />
                      编辑
                    </Link>
                  </Button>

                  {isAccessible && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isDuplicating}
                      onClick={() => handleDuplicateQRCode(qr.id)}
                    >
                      <CopyIcon />
                      复制
                    </Button>
                  )}

                  {isAccessible && (
                    <Button size="sm" asChild>
                      <Link
                        href={getFileUrl(qr.imageKey)}
                        target="_blank"
                        download={qr.name}
                      >
                        <DownloadIcon />
                        下载
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(qr.id)}
                  >
                    <Trash2Icon />
                    删除
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
