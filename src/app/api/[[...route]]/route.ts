import { Hono } from "hono";
import { handle } from "hono/vercel";

import qrCodeRoute from "@/features/qr-code/server";
import uploadRoute from "@/features/upload/server";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/qr-code", qrCodeRoute)
  .route("/upload", uploadRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
