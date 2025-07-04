import {
  ArrowRightIcon,
  ZapIcon,
  ShieldIcon,
  SmartphoneIcon,
  GlobeIcon,
  CheckCircleIcon,
  PiggyBankIcon,
  SlidersHorizontalIcon,
  ImagePlusIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <ZapIcon className="size-4 mr-2" />
              基于 Cloudflare 构建，免费且高可用
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight">
              QRManager
              <span className="block text-blue-600 dark:text-blue-400">
                简单易用的动态二维码
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              码不变，内容随时变。一个二维码，无限可能。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <ArrowRightIcon className="size-4" />
                  立即开始
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              为什么选择 QRManager？
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              专为现代企业设计的智能二维码解决方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <SmartphoneIcon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  动态内容更新
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  二维码外观保持不变，但扫描后显示的内容可以随时更新。无需重新打印，节省成本和时间。
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <GlobeIcon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Cloudflare 托管
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  基于 Cloudflare 构建，享受免费数据库和存储服务，全球 CDN
                  加速，99.9% 可用性保证。
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <ShieldIcon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  个性化设计
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  丰富的预设风格，支持完全自定义颜色、样式，还可上传专属Logo。让每个二维码都独一无二。
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <ZapIcon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  简单易用
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  直观的用户界面，三步创建动态二维码。无需技术背景，任何人都能轻松上手。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* QR Code Styling Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              让每个二维码都独一无二
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              从预设到自定义，从颜色到Logo，打造专属于您的二维码设计
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Visual mockup */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {/* QR Code mockup 1 */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">👀</span>
                      </div>
                      <p className="text-white text-xs">经典风格</p>
                    </div>

                    {/* QR Code mockup 2 */}
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <p className="text-white text-xs">品牌色彩</p>
                    </div>

                    {/* QR Code mockup 3 */}
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">🏷️</span>
                      </div>
                      <p className="text-white text-xs">专属标识</p>
                    </div>

                    {/* QR Code mockup 4 */}
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                      <p className="text-white text-xs">独特设计</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Features list */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PiggyBankIcon className="size-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      精美预设模板
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      内置多种专业设计的二维码模板，涵盖商务、创意、简约等多种风格，一键应用即可获得完美效果。
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <SlidersHorizontalIcon className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      完全自定义设计
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      自由调整前景色、背景色、边距、圆角等参数，精确控制每个细节，打造完全符合品牌形象的专属二维码。
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ImagePlusIcon className="size-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      专属Logo上传
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      支持上传公司Logo、个人头像或任何标识图片，自动优化显示效果，让二维码成为品牌传播的完美载体。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              应用场景
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              适用于各种文件分享和管理需求
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="size-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    产品说明书
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    产品手册、安装指南、使用说明随时更新版本
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="size-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    会议资料
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    会议议程、演示文稿、会议纪要动态分享
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="size-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    培训材料
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    培训课件、操作手册、学习资料版本管理
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="size-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    营销资料
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    产品目录、宣传册、价格表文件动态更新
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="size-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    活动门票
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    活动详情、时间地点、注意事项动态调整
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="size-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    个人文件
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    简历、作品集、个人资料文件随时更新
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            开始创建您的第一个动态二维码
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            免费注册，立即体验强大的动态二维码管理功能
          </p>
          <Link href="/sign-up">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              <ArrowRightIcon className="size-4" />
              开始使用
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
