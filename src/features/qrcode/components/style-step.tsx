/* eslint-disable @next/next/no-img-element */
"use client";

import {
  DownloadIcon,
  EyeIcon,
  ImageIcon,
  Loader2Icon,
  MaximizeIcon,
  PaletteIcon,
  RotateCcwIcon,
  SettingsIcon,
  ShieldIcon,
  XIcon,
} from "lucide-react";
import type { Options } from "qr-code-styling";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  cornerDotStyleMap,
  cornerSquareStyleMap,
  dotsStyleMap,
  errorCorrectionLevelMap,
  presetStyles,
} from "../constants";
import { StepProps } from "../types";
import { QRStyling, QRStylingHandle } from "./qr-styling-wrapper";

export function StyleStep({ onNext, onBack, data, setData }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Options>({
    ...data.styleOptions,
    data: `${window.location.origin}/s/${data.qrId}`,
  });
  const qrStylingRef = useRef<QRStylingHandle | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  // 切换预设样式
  const handlePresetChange = (presetName: string) => {
    const preset = presetStyles[presetName];
    if (!preset) return;

    setOptions((prev) => ({
      ...preset.options,
      data: prev.data,
      image: prev.image,
    }));
  };

  // 更新前景色
  const handleForegroundColorChange = (color: string) => {
    setOptions((prev) => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        color,
      },
    }));
  };

  // 更新背景色
  const handleBackgroundColorChange = (color: string) => {
    setOptions((prev) => ({
      ...prev,
      backgroundOptions: {
        ...prev.backgroundOptions,
        color,
      },
    }));
  };

  // 更新边角方块颜色
  const handleCornerSquareColorChange = (color: string) => {
    setOptions((prev) => ({
      ...prev,
      cornersSquareOptions: {
        ...prev.cornersSquareOptions,
        color,
      },
    }));
  };

  // 更新边角点颜色
  const handleCornerDotColorChange = (color: string) => {
    setOptions((prev) => ({
      ...prev,
      cornersDotOptions: {
        ...prev.cornersDotOptions,
        color,
      },
    }));
  };

  // 切换渐变模式
  const handleGradientToggle = (enabled: boolean) => {
    if (enabled) {
      // 启用渐变，设置默认渐变配置
      setOptions((prev) => ({
        ...prev,
        dotsOptions: {
          ...prev.dotsOptions,
          gradient: {
            type: "linear",
            rotation: 90,
            colorStops: [
              { offset: 0, color: "#F59E42" },
              { offset: 1, color: "#7C3AED" },
            ],
          },
        },
      }));
    } else {
      // 禁用渐变
      setOptions((prev) => ({
        ...prev,
        dotsOptions: {
          ...prev.dotsOptions,
          gradient: undefined,
        },
      }));
    }
  };

  // 更新渐变起始色
  const handleGradientStartColorChange = (color: string) => {
    setOptions((prev) => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        gradient: prev.dotsOptions?.gradient
          ? {
              ...prev.dotsOptions.gradient,
              colorStops: [
                { offset: 0, color },
                ...(prev.dotsOptions.gradient.colorStops?.slice(1) || []),
              ],
            }
          : undefined,
      },
    }));
  };

  // 更新渐变结束色
  const handleGradientEndColorChange = (color: string) => {
    setOptions((prev) => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        gradient: prev.dotsOptions?.gradient
          ? {
              ...prev.dotsOptions.gradient,
              colorStops: [
                ...(prev.dotsOptions.gradient.colorStops?.slice(0, -1) || []),
                { offset: 1, color },
              ],
            }
          : undefined,
      },
    }));
  };

  // 更新渐变角度
  const handleGradientRotationChange = (rotation: number) => {
    setOptions((prev) => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        gradient: prev.dotsOptions?.gradient
          ? {
              ...prev.dotsOptions.gradient,
              rotation,
            }
          : undefined,
      },
    }));
  };

  // 更新容错级别
  const handleErrorCorrectionLevelChange = (level: "L" | "M" | "Q" | "H") => {
    setOptions((prev) => ({
      ...prev,
      qrOptions: {
        ...prev.qrOptions,
        errorCorrectionLevel: level,
      },
    }));
  };

  // 更新Logo边距
  const handleLogoMarginChange = (margin: number) => {
    setOptions((prev) => ({
      ...prev,
      imageOptions: {
        ...prev.imageOptions,
        margin,
      },
    }));
  };

  // 切换Logo背景点隐藏
  const handleHideBackgroundDotsToggle = (hide: boolean) => {
    setOptions((prev) => ({
      ...prev,
      imageOptions: {
        ...prev.imageOptions,
        hideBackgroundDots: hide,
      },
    }));
  };

  // 更新背景圆角
  const handleBackgroundRoundChange = (round: number) => {
    setOptions((prev) => ({
      ...prev,
      backgroundOptions: {
        ...prev.backgroundOptions,
        round,
      },
    }));
  };

  // 更新二维码边距
  const handleMarginChange = (margin: number) => {
    setOptions((prev) => ({
      ...prev,
      margin,
    }));
  };

  // 更新点样式
  const handleDotsStyleChange = (style: keyof typeof dotsStyleMap) => {
    setOptions((prev) => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        type: style,
      },
    }));
  };

  // 更新边角方块样式
  const handleCornerSquareStyleChange = (
    style: keyof typeof cornerSquareStyleMap
  ) => {
    setOptions((prev) => ({
      ...prev,
      cornersSquareOptions: {
        ...prev.cornersSquareOptions,
        type: style,
      },
    }));
  };

  // 更新边角点样式
  const handleCornerDotStyleChange = (
    style: keyof typeof cornerDotStyleMap
  ) => {
    setOptions((prev) => ({
      ...prev,
      cornersDotOptions: {
        ...prev.cornersDotOptions,
        type: style,
      },
    }));
  };

  // 下载二维码
  const handleDownload = () => {
    if (qrStylingRef.current) {
      qrStylingRef.current.download({ name: data.name, extension: "png" });
    }
  };

  // 导出二维码
  const handleExport = async () => {
    if (qrStylingRef.current) {
      const res = await qrStylingRef.current.export("png");
      return res as Blob;
    }
  };

  // 处理Logo上传
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setOptions((prev) => ({
        ...prev,
        image: ev.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // 移除Logo
  const handleRemoveLogo = () => {
    setOptions((prev) => ({ ...prev, image: undefined }));
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  // 下一步
  const handleNext = async () => {
    setLoading(true);
    const blob = await handleExport();

    setData({
      ...data,
      styleOptions: options,
      qrFile: blob
        ? new File([blob], `${data.name}.png`, { type: "image/png" })
        : null,
    });

    try {
      const res = await fetch("/api/qrcode/update/style", {
        method: "POST",
        body: JSON.stringify({
          qrId: data.qrId,
          styleOptions: JSON.stringify(options),
        }),
      });

      if (!res.ok) {
        toast.error("更新二维码失败");
        return;
      }

      onNext();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">定制您的二维码样式</h3>
        <p className="text-sm text-gray-600">选择颜色、样式，并实时预览效果</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 样式设置面板 */}
        <div className="space-y-6">
          <Tabs defaultValue="presets" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="presets">预设样式</TabsTrigger>
              <TabsTrigger value="colors">颜色设置</TabsTrigger>
              <TabsTrigger value="logo">Logo设置</TabsTrigger>
              <TabsTrigger value="advanced">高级设置</TabsTrigger>
            </TabsList>

            <TabsContent value="presets" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(presetStyles).map(([name, preset]) => (
                  <Button
                    key={name}
                    variant="outline"
                    className="h-30 flex flex-col items-center justify-center gap-2"
                    onClick={() => handlePresetChange(name)}
                  >
                    <div
                      className="w-8 h-8 rounded border"
                      style={{
                        backgroundColor:
                          preset.options.backgroundOptions?.color,
                        borderColor: preset.options.dotsOptions?.color,
                      }}
                    />
                    <span className="text-xs capitalize">{preset.name}</span>
                    <span className="text-xs text-gray-500 max-w-[90%] block truncate">
                      {preset.desc}
                    </span>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div className="space-y-6">
                {/* 基础颜色设置 */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <PaletteIcon className="size-4" />
                    基础颜色
                  </h4>

                  <div>
                    <Label htmlFor="foreground-color">
                      前景色（二维码颜色）
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="foreground-color"
                        type="color"
                        value={options.dotsOptions?.color}
                        onChange={(e) =>
                          handleForegroundColorChange(e.target.value)
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={options.dotsOptions?.color}
                        onChange={(e) =>
                          handleForegroundColorChange(e.target.value)
                        }
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="background-color">背景色</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="background-color"
                        type="color"
                        value={options.backgroundOptions?.color}
                        onChange={(e) =>
                          handleBackgroundColorChange(e.target.value)
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={options.backgroundOptions?.color}
                        onChange={(e) =>
                          handleBackgroundColorChange(e.target.value)
                        }
                        placeholder="#FFFFFF"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="corner-square-color">边角方块颜色</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="corner-square-color"
                        type="color"
                        value={options.cornersSquareOptions?.color}
                        onChange={(e) =>
                          handleCornerSquareColorChange(e.target.value)
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={options.cornersSquareOptions?.color}
                        onChange={(e) =>
                          handleCornerSquareColorChange(e.target.value)
                        }
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="corner-dot-color">边角点颜色</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="corner-dot-color"
                        type="color"
                        value={options.cornersDotOptions?.color}
                        onChange={(e) =>
                          handleCornerDotColorChange(e.target.value)
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={options.cornersDotOptions?.color}
                        onChange={(e) =>
                          handleCornerDotColorChange(e.target.value)
                        }
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* 渐变设置 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <PaletteIcon className="size-4" />
                      渐变效果
                    </h4>
                    <Button
                      variant={
                        options.dotsOptions?.gradient ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleGradientToggle(!options.dotsOptions?.gradient)
                      }
                    >
                      {options.dotsOptions?.gradient ? "关闭渐变" : "启用渐变"}
                    </Button>
                  </div>

                  {options.dotsOptions?.gradient && (
                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                      <div>
                        <Label htmlFor="gradient-start-color">渐变起始色</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="gradient-start-color"
                            type="color"
                            value={
                              options.dotsOptions.gradient.colorStops?.[0]
                                ?.color
                            }
                            onChange={(e) =>
                              handleGradientStartColorChange(e.target.value)
                            }
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            type="text"
                            value={
                              options.dotsOptions.gradient.colorStops?.[0]
                                ?.color
                            }
                            onChange={(e) =>
                              handleGradientStartColorChange(e.target.value)
                            }
                            placeholder="#F59E42"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="gradient-end-color">渐变结束色</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="gradient-end-color"
                            type="color"
                            value={
                              options.dotsOptions.gradient.colorStops?.[1]
                                ?.color
                            }
                            onChange={(e) =>
                              handleGradientEndColorChange(e.target.value)
                            }
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            type="text"
                            value={
                              options.dotsOptions.gradient.colorStops?.[1]
                                ?.color
                            }
                            onChange={(e) =>
                              handleGradientEndColorChange(e.target.value)
                            }
                            placeholder="#7C3AED"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="gradient-rotation"
                          className="flex items-center gap-2"
                        >
                          <RotateCcwIcon className="size-4" />
                          渐变角度: {options.dotsOptions.gradient.rotation}°
                        </Label>
                        <Input
                          id="gradient-rotation"
                          type="range"
                          min="0"
                          max="360"
                          value={options.dotsOptions.gradient.rotation}
                          onChange={(e) =>
                            handleGradientRotationChange(Number(e.target.value))
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logo" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <ImageIcon className="size-4" />
                  Logo设置
                </h4>

                {/* Logo设置 */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logo-upload">Logo</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        ref={logoInputRef}
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="flex-1"
                      />
                      {options.image && (
                        <div className="relative w-10 h-10">
                          <img
                            src={options.image}
                            alt="logo预览"
                            className="w-10 h-10 object-contain border rounded"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-white rounded-full border p-0.5 shadow"
                            onClick={handleRemoveLogo}
                            title="移除Logo"
                          >
                            <XIcon className="size-3 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {options.image && (
                    <>
                      <div>
                        <Label
                          htmlFor="logo-margin"
                          className="flex items-center gap-2"
                        >
                          Logo边距: {options.imageOptions?.margin || 0}px
                        </Label>
                        <Input
                          id="logo-margin"
                          type="range"
                          min="0"
                          max="20"
                          step="1"
                          value={options.imageOptions?.margin || 0}
                          onChange={(e) =>
                            handleLogoMarginChange(Number(e.target.value))
                          }
                          className="mt-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0px</span>
                          <span>10px</span>
                          <span>20px</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>隐藏Logo背景点</Label>
                          <p className="text-xs text-gray-500">
                            在Logo区域隐藏二维码点，使Logo更清晰
                          </p>
                        </div>
                        <Button
                          variant={
                            options.imageOptions?.hideBackgroundDots
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            handleHideBackgroundDotsToggle(
                              !options.imageOptions?.hideBackgroundDots
                            )
                          }
                        >
                          {options.imageOptions?.hideBackgroundDots
                            ? "已启用"
                            : "已禁用"}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-6">
                {/* 样式设置 */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <SettingsIcon className="size-4" />
                    样式设置
                  </h4>

                  <div>
                    <Label>点样式</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {(
                        Object.keys(dotsStyleMap) as Array<
                          keyof typeof dotsStyleMap
                        >
                      ).map((style) => (
                        <Button
                          key={style}
                          variant={
                            options.dotsOptions?.type === style
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => handleDotsStyleChange(style)}
                        >
                          {dotsStyleMap[style]}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>边角方块样式</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {(
                        Object.keys(cornerSquareStyleMap) as Array<
                          keyof typeof cornerSquareStyleMap
                        >
                      ).map((style) => (
                        <Button
                          key={style}
                          variant={
                            options.cornersSquareOptions?.type === style
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => handleCornerSquareStyleChange(style)}
                        >
                          {cornerSquareStyleMap[style]}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>边角点样式</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {(
                        Object.keys(cornerDotStyleMap) as Array<
                          keyof typeof cornerDotStyleMap
                        >
                      ).map((style) => (
                        <Button
                          key={style}
                          variant={
                            options.cornersDotOptions?.type === style
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => handleCornerDotStyleChange(style)}
                        >
                          {cornerDotStyleMap[style]}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 边距和圆角设置 */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <MaximizeIcon className="size-4" />
                    边距和圆角
                  </h4>

                  <div>
                    <Label
                      htmlFor="qr-margin"
                      className="flex items-center gap-2"
                    >
                      二维码边距: {options.margin || 0}px
                    </Label>
                    <Input
                      id="qr-margin"
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={options.margin || 0}
                      onChange={(e) =>
                        handleMarginChange(Number(e.target.value))
                      }
                      className="mt-1"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0px</span>
                      <span>25px</span>
                      <span>50px</span>
                      <span>100px</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="background-round"
                        className="flex items-center gap-2"
                      >
                        背景圆角
                      </Label>
                      <p className="text-xs text-gray-500">暗色背景时才明显</p>
                    </div>
                    <Button
                      variant={
                        options.backgroundOptions?.round ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleBackgroundRoundChange(
                          options.backgroundOptions?.round ? 0 : 1
                        )
                      }
                    >
                      {options.backgroundOptions?.round ? "已启用" : "已禁用"}
                    </Button>
                  </div>
                </div>

                {/* 容错设置 */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <ShieldIcon className="size-4" />
                    容错设置
                  </h4>

                  <div>
                    <Label>容错级别</Label>
                    <div className="grid grid-cols-4 gap-2 mt-1">
                      {errorCorrectionLevelMap.map(
                        ({ level, name, desc, color }) => (
                          <Button
                            key={level}
                            variant={
                              options.qrOptions?.errorCorrectionLevel === level
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              handleErrorCorrectionLevelChange(level)
                            }
                            className="flex flex-col items-center gap-1 h-auto py-2"
                          >
                            <span className="text-xs font-medium">{name}</span>
                            <span className={`text-xs px-1 rounded ${color}`}>
                              {desc}
                            </span>
                          </Button>
                        )
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      容错级别越高，二维码越不容易损坏，但数据密度越低
                    </p>
                  </div>
                </div>

                {/* Logo高级设置 */}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 预览面板 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <EyeIcon className="size-4" />
              实时预览
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!data.qrImageKey}
            >
              <DownloadIcon className="size-4 mr-2" />
              下载
            </Button>
          </div>
          <div className="border rounded-lg p-6 bg-gray-50 flex items-center justify-center">
            <QRStyling
              ref={qrStylingRef}
              options={options}
              className="[&>canvas]:w-[300px] [&>canvas]:h-[300px]"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          上一步
        </Button>
        <Button onClick={handleNext} className="flex-1">
          {loading ? <Loader2Icon className="size-4 animate-spin" /> : "下一步"}
        </Button>
      </div>
    </div>
  );
}
