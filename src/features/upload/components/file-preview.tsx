import { cn } from "@/lib/utils";
import { useState } from "react";

interface FilePreviewProps {
  src: string;
  alt?: string;
  className?: string;
}

const imageTypes = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"];
const videoTypes = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
const audioTypes = ["mp3", "wav", "ogg", "flac", "aac", "m4a"];

const FilePreview = ({ src, alt = "", className = "" }: FilePreviewProps) => {
  const [error, setError] = useState(false);
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() ?? "";

  if (imageTypes.includes(ext)) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn("w-full rounded", className)}
          onError={() => setError(true)}
        />
        {error && <div className="text-red-500 text-sm mt-2">图片加载失败</div>}
      </>
    );
  }

  if (videoTypes.includes(ext)) {
    return (
      <>
        <video
          src={src}
          controls
          className={cn("w-full rounded", className)}
          aria-label={alt}
          onError={() => setError(true)}
        />
        {error && <div className="text-red-500 text-sm mt-2">视频加载失败</div>}
      </>
    );
  }

  if (audioTypes.includes(ext)) {
    return (
      <>
        <audio
          src={src}
          controls
          className={cn("w-full rounded", className)}
          aria-label={alt}
          onError={() => setError(true)}
        />
        {error && <div className="text-red-500 text-sm mt-2">音频加载失败</div>}
      </>
    );
  }

  // 兜底
  return <p className="text-gray-500 my-2">暂不支持预览该类型文件</p>;
};

export default FilePreview;
