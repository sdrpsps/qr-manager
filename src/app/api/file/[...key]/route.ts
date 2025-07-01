import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;

  const { env } = await getCloudflareContext({ async: true });

  if (!env.R2) {
    return NextResponse.json(
      { message: "Storage service not available" },
      { status: 500 }
    );
  }

  const object = await env.R2.get(key.join("/"));

  if (object === null) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  return new NextResponse(object.body);
}
