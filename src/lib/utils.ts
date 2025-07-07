import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 生成指定长度的随机字符串（字母+数字）
 * @param {number} length 字符串长度，默认 8
 * @returns {string}
 */
export function randomString(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getFileUrl(key: string | null) {
  return key ? `${process.env.NEXT_PUBLIC_BUCKET_ADDRESS}/${key}` : "";
}
