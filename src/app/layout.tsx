import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "动态二维码生成工具 - 轻松管理您的二维码",
  description:
    "专业的动态二维码生成与管理平台，支持二维码生成、实时更新管理。助力企业高效开展营销活动与用户互动。",
  keywords: "动态二维码,二维码生成器,活码生成,二维码管理,营销工具",
  robots: "index, follow",
  openGraph: {
    title: "动态二维码生成工具 - 轻松管理您的二维码",
    description: "专业的动态二维码生成与管理平台，支持二维码生成、实时更新管理",
    type: "website",
    locale: "zh_CN",
    images: ["https://y.gtimg.cn/music/photo_new/T053M000004Amlfr4OcARI.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
