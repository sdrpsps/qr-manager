import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { MaxSizeResponse } from "@/features/qrcode/types";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json<MaxSizeResponse>(
    {
      message: "success",
      data: Number(process.env.MAX_FILE_MB || 100),
    },
    { status: 200 }
  );
}
