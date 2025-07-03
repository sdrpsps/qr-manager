import { NextRequest, NextResponse } from "next/server";

import { createStorage } from "@/lib/storage";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;

  const storage = await createStorage();

  const object = await storage.get(key.join("/"));

  if (object === null) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  return new NextResponse(object.body);
}
