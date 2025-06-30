import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            QRManager
          </h1>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
            简单易用的动态二维码管理平台
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white dark:text-gray-100 px-8 py-3 text-lg">
              <ArrowRightIcon className="size-4 mr-2" />
              开始使用
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
