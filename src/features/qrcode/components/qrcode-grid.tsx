"use client";

import {
  DownloadIcon,
  FilePenLineIcon,
  Loader,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useGetQRCodes } from "../api/use-get-qr-codes";
import { useDeleteState } from "../hooks/use-delete-state";

export const QRCodeGrid = () => {
  const [, setDeleteId] = useDeleteState();

  const { data: qrCodes, isLoading } = useGetQRCodes();

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
          {qrCodes?.data.map((qr) => (
            <div
              key={qr.id}
              className="p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700"
            >
              <div className="w-full aspect-square bg-gray-100 dark:bg-gray-600 mb-4">
                <Image
                  src={`/static/${qr.qrImageKey}`}
                  alt={qr.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  {qr.name}
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  // onClick={() => handleEdit(qr)}
                >
                  <FilePenLineIcon />
                  编辑
                </Button>
              </div>

              <div className="flex justify-between mt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/static/${qr.qrImageKey}`}
                    target="_blank"
                    download={qr.name}
                  >
                    <DownloadIcon />
                    下载
                  </Link>
                </Button>
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
          ))}
        </div>
      )}
    </div>
  );
};
