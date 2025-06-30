import { Options } from "qr-code-styling";

// 预设样式
export const presetStyles: Record<
  string,
  { name: string; desc: string; options: Options }
> = {
  classic: {
    name: "经典黑白",
    desc: "极简主义，永不过时，适合任何正式场合。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#222", type: "square" },
      backgroundOptions: { color: "#fff" },
      cornersSquareOptions: { color: "#222", type: "square" },
      cornersDotOptions: { color: "#222", type: "square" },
      imageOptions: { crossOrigin: "anonymous", margin: 0 },
    },
  },
  elegant: {
    name: "优雅紫韵",
    desc: "高贵优雅，适合女性、艺术、时尚品牌。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#7C3AED", type: "classy" },
      backgroundOptions: { color: "#F8FAFC" },
      cornersSquareOptions: { color: "#7C3AED", type: "extra-rounded" },
      cornersDotOptions: { color: "#7C3AED", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 8 },
    },
  },
  modernBlue: {
    name: "科技蓝",
    desc: "现代科技感，适合互联网、IT、创新企业。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#2563EB", type: "rounded" },
      backgroundOptions: { color: "#F0F6FF" },
      cornersSquareOptions: { color: "#2563EB", type: "extra-rounded" },
      cornersDotOptions: { color: "#2563EB", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 6 },
    },
  },
  business: {
    name: "深邃蓝金",
    desc: "沉稳大气，金色点缀体现尊贵质感。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#1E3A8A", type: "square" },
      backgroundOptions: { color: "#F7F7F7" },
      cornersSquareOptions: { color: "#D4AF37", type: "square" },
      cornersDotOptions: { color: "#1E3A8A", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 0 },
    },
  },
  vibrant: {
    name: "活力橙",
    desc: "青春活力，适合餐饮、活动、年轻品牌。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#F59E42", type: "extra-rounded" },
      backgroundOptions: { color: "#FFF7ED" },
      cornersSquareOptions: { color: "#F59E42", type: "extra-rounded" },
      cornersDotOptions: { color: "#F59E42", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 10 },
    },
  },
  dark: {
    name: "暗夜极黑",
    desc: "酷炫暗黑，适合夜间、潮流、电竞场景。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#fff", type: "dots", gradient: undefined },
      backgroundOptions: { color: "#18181B" },
      cornersSquareOptions: { color: "#fff", type: "square" },
      cornersDotOptions: { color: "#fff", type: "square" },
      imageOptions: { crossOrigin: "anonymous", margin: 0 },
    },
  },
  gradient: {
    name: "炫彩渐变",
    desc: "创意渐变，适合高端、创意、设计师品牌。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: {
        color: "#F59E42",
        type: "rounded",
        gradient: {
          type: "linear",
          rotation: 90,
          colorStops: [
            { offset: 0, color: "#F59E42" },
            { offset: 1, color: "#7C3AED" },
          ],
        },
      },
      backgroundOptions: { color: "#fff" },
      cornersSquareOptions: { color: "#7C3AED", type: "extra-rounded" },
      cornersDotOptions: { color: "#F59E42", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 10 },
    },
  },
  green: {
    name: "清新绿意",
    desc: "自然健康，适合环保、健康、农业品牌。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#22C55E", type: "rounded", gradient: undefined },
      backgroundOptions: { color: "#F0FDF4" },
      cornersSquareOptions: { color: "#22C55E", type: "extra-rounded" },
      cornersDotOptions: { color: "#22C55E", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 8 },
    },
  },
  pink: {
    name: "少女粉",
    desc: "甜美可爱，适合美妆、母婴、女性品牌。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#EC4899", type: "classy", gradient: undefined },
      backgroundOptions: { color: "#FFF1F2" },
      cornersSquareOptions: { color: "#EC4899", type: "extra-rounded" },
      cornersDotOptions: { color: "#EC4899", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 8 },
    },
  },
  chinaRed: {
    name: "中国红",
    desc: "热烈喜庆，适合节日、婚礼、国风品牌。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#D7263D", type: "square", gradient: undefined },
      backgroundOptions: { color: "#FFF5F5" },
      cornersSquareOptions: { color: "#D7263D", type: "extra-rounded" },
      cornersDotOptions: { color: "#D7263D", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 8 },
    },
  },
  minimalGray: {
    name: "极简灰",
    desc: "低调极简，适合极简主义、科技、设计师品牌。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#6B7280", type: "dots", gradient: undefined },
      backgroundOptions: { color: "#F3F4F6" },
      cornersSquareOptions: { color: "#6B7280", type: "square" },
      cornersDotOptions: { color: "#6B7280", type: "square" },
      imageOptions: { crossOrigin: "anonymous", margin: 0 },
    },
  },
  flashBlue: {
    name: "电光蓝",
    desc: "专业沉稳中融入电光蓝，确保高识别度。",
    options: {
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      dotsOptions: { color: "#3B82F6", type: "square", gradient: undefined },
      backgroundOptions: { color: "#FFFFFF" },
      cornersSquareOptions: { color: "#1E3A8A", type: "square" },
      cornersDotOptions: { color: "#1E3A8A", type: "dot" },
      imageOptions: { crossOrigin: "anonymous", margin: 0 },
    },
  },
};

// 样式选项中文
export const dotsStyleMap = {
  dots: "圆点",
  rounded: "圆角",
  classy: "优雅",
  square: "方块",
  "extra-rounded": "超圆角",
} as const;

export const cornerSquareStyleMap = {
  dot: "圆点",
  square: "方块",
  "extra-rounded": "超圆角",
} as const;

export const cornerDotStyleMap = {
  dot: "圆点",
  square: "方块",
} as const;

// 容错级别
export const errorCorrectionLevelMap = [
  {
    level: "L" as const,
    name: "低",
    desc: "7%",
    color: "bg-green-100 text-green-800",
  },
  {
    level: "M" as const,
    name: "中",
    desc: "15%",
    color: "bg-blue-100 text-blue-800",
  },
  {
    level: "Q" as const,
    name: "高",
    desc: "25%",
    color: "bg-orange-100 text-orange-800",
  },
  {
    level: "H" as const,
    name: "最高",
    desc: "30%",
    color: "bg-red-100 text-red-800",
  },
];
