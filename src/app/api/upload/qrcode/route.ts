import { NextRequest, NextResponse } from "next/server";

import { FileUploadResponse } from "@/features/upload/types";
import { auth } from "@/lib/auth";
import { createStorage } from "@/lib/storage";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ qrCodeId: string }> }
) {
  const { qrCodeId } = await params;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // 文件大小验证
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    // 文件类型验证（可选）
    if (file.size === 0) {
      return NextResponse.json(
        { message: "File cannot be empty" },
        { status: 400 }
      );
    }

    const storage = await createStorage();
    const key = `qrcodes/${session.user.id}/${qrCodeId}`;

    await storage.put(key, file, {
      httpMetadata: {
        contentType: file.type,
        contentDisposition: `inline; filename="${qrCodeId}"`,
      },
    });

    return NextResponse.json<FileUploadResponse>(
      {
        message: "File uploaded successfully",
        data: {
          key,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);

    // 处理不同类型的错误
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
