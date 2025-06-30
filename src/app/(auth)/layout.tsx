import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[38.2%_61.8%]">
      {/* 左侧装饰区域 - 只在大屏幕显示，占 38.2% */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-purple-600 to-orange-500" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center">
            <Image
              className="mr-2"
              src="https://image.dooo.ng/c/2025/06/30/6861f48915974.webp"
              alt="QRManager"
              width={30}
              height={30}
            />
            QRManager
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">简单易用的动态二维码</p>
            <p className="text-sm opacity-80">专业的动态二维码生成与管理平台</p>
          </blockquote>
        </div>
      </div>

      {/* 右侧表单区域 - 占 61.8% */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm min-w-[280px] sm:min-w-[320px]">
          {children}
        </div>
      </div>
    </div>
  );
}
