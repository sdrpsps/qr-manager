"use client";

import { FileUpIcon, Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { useUpload } from "../api/use-upload";

interface FileUploadProps {
  fileName: string;
  onFileUploadSuccess?: (qrImageKey: string, fileName: string) => void;
}

const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_MB) * 1024 * 1024;

export function FileUpload({ fileName, onFileUploadSuccess }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const { mutate: uploadFile, isPending: isUploading } = useUpload();

  const handleFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    // 文件大小验证
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`文件大小不能超过 ${MAX_FILE_SIZE}MB`);
      return;
    }

    // 文件类型验证（可选）
    if (file.size === 0) {
      toast.error("文件不能为空");
      return;
    }

    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    uploadFile(
      {
        param: { type: "file" },
        form: { file },
      },
      {
        onSuccess: (response) => {
          onFileUploadSuccess?.(response.data.key, file.name);
          toast.success("文件上传成功！");
        },
        onError: () => {
          toast.error("文件上传失败！");
        },
      }
    );
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
          {isUploading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "点击或拖拽上传文件"
          )}
        </div>
        <div className="text-gray-500 text-sm mt-1">
          支持任意格式，最大 {MAX_FILE_SIZE / 1024 / 1024}MB
        </div>
        {fileName && (
          <div className="text-sm text-blue-500 mt-2">已选择：{fileName}</div>
        )}
      </div>
    </div>
  );
}
