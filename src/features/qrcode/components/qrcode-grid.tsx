"use client";

import {
  DownloadIcon,
  FilePenLineIcon,
  Loader,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { QRCode } from "@/lib/db/schema";
import { useDeleteState } from "../hooks/useDeleteState";

export const QRCodeGrid = () => {
  const [loading, setLoading] = useState(false);
  const [qrcodes, setQrcodes] = useState<QRCode[]>([]);
  const [, setDeleteId] = useDeleteState();

  const handleGetQRCodes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/qrcode/list");
      const data = (await response.json()) as {
        message: string;
        data: QRCode[];
      };
      setQrcodes(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetQRCodes();
  }, []);

  return (
    <div className="flex flex-col p-6 border-2 border-dashed rounded-lg space-y-4 dark:border-gray-600 dark:bg-gray-800">
      {loading && (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      )}
      {qrcodes.length === 0 ? (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          暂无二维码
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qrcodes.map((qr) => (
            <div
              key={qr.id}
              className="p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700"
            >
              <div className="w-full aspect-square bg-gray-100 dark:bg-gray-600 mb-4">
                <Image
                  src={`/file/${qr.qrImageKey}`}
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
                    href={`/file/${qr.qrImageKey}`}
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
