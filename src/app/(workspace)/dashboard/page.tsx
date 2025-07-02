import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DeleteAlertDialog } from "@/features/qrcode/components/delete-alert-dialog";
import { QRCodeGrid } from "@/features/qrcode/components/qrcode-grid";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">欢迎使用 QRManager</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              这里是您的动态二维码管理仪表板。您可以在这里管理和跟踪您的二维码。
            </p>
            <Button asChild>
              <Link href="/create">
                <PlusIcon className="size-4" />
                创建二维码
              </Link>
            </Button>
          </div>
        </div>

        {/* 这里可以添加更多的 dashboard 内容，比如：
            - 二维码统计
            - 最近创建的二维码
            - 快速操作按钮
            - 等等
            */}
        <QRCodeGrid />
        <DeleteAlertDialog />
      </div>
    </div>
  );
}
