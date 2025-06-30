import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/nav-bar";
import { auth } from "@/lib/auth";
import { QRCodeProgress } from "@/features/upload/components/progress";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Navbar user={session.user} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4">欢迎使用 QRManager</h2>
              <p className="text-gray-600 dark:text-gray-400">
                这里是您的动态二维码管理仪表板。您可以在这里创建、管理和跟踪您的二维码。
              </p>
            </div>

            <QRCodeProgress />
            {/* 这里可以添加更多的 dashboard 内容，比如：
            - 二维码统计
            - 最近创建的二维码
            - 快速操作按钮
            - 等等
            */}
          </div>
        </div>
      </main>
    </>
  );
}
