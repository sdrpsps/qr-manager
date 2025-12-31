import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import GitHubLink from "@/components/github-tooltip-link";
import QueryProvider from "@/components/query-provider";

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
  title: "QRManager - 简单易用的动态二维码",
  description:
    "专业的动态二维码生成与管理平台，支持二维码生成、实时更新管理。助力企业高效开展营销活动与用户互动。",
  keywords: "动态二维码,二维码生成器,活码生成,二维码管理,营销工具,QRManager",
  robots: "index, follow",
  openGraph: {
    title: "QRManager - 简单易用的动态二维码",
    description: "专业的动态二维码生成与管理平台，支持二维码生成、实时更新管理",
    type: "website",
    locale: "zh_CN",
    images: ["https://image.dooo.ng/c/2025/06/30/6861f48915974.webp"],
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
        <GitHubLink
          href="https://github.com/sdrpsps/qr-manager"
          className="fixed bottom-8 right-8 z-50 shadow-lg"
        />
        <NuqsAdapter>
          <QueryProvider>
            {children}
            <Toaster richColors />
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
