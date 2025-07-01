"use client";

import { FileUpIcon, Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { FileUploadResponse } from "../types";

interface FileUploadProps {
  defaultFileName: string;
  maxSizeMB: number;
  onFileUploadSuccess?: (fileKey: string, fileName: string) => void;
}

export function FileUpload({
  defaultFileName,
  maxSizeMB,
  onFileUploadSuccess,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string>(defaultFileName);

  const handleFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    // 文件大小验证
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error(`文件大小不能超过 ${maxSizeMB}MB`);
      return;
    }

    // 文件类型验证（可选）
    if (file.size === 0) {
      toast.error("文件不能为空");
      return;
    }

    setFileName(file.name);
    setUploading(true);
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload/attachments", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(
          errorData.message || `Upload failed with status ${response.status}`
        );
      }

      const data = (await response.json()) as FileUploadResponse;

      onFileUploadSuccess?.(data.data.key, data.data.fileName);
      toast.success("文件上传成功！");
    } catch (error) {
      console.error("Upload error:", error);

      let errorMessage = "上传失败，请重试";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFile(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
        multiple={false}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <FileUpIcon className="size-12 text-yellow-400" />
        <div className="font-medium text-lg mt-2">
          {uploading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "点击或拖拽上传文件"
          )}
        </div>
        <div className="text-gray-500 text-sm mt-1">
          支持任意格式，最大 {maxSizeMB}MB
        </div>
        {fileName && (
          <div className="text-sm text-blue-500 mt-2">已选择：{fileName}</div>
        )}
      </div>
    </div>
  );
}
