import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { emailVerifiedMiddleware, sessionMiddleware } from "@/lib/middleware";
import { createStorage } from "@/lib/storage";
import { randomString } from "@/lib/utils";
import z from "zod";

const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_MB) * 1024 * 1024;

const storage = await createStorage();

const uploadFile = async (file: File, key: string) => {
  return await storage.put(key, file, {
    httpMetadata: {
      contentType: file.type,
      contentDisposition: `inline; filename="${file.name}"`,
    },
  });
};

const app = new Hono().post(
  "/:type",
  sessionMiddleware,
  emailVerifiedMiddleware,
  zValidator(
    "param",
    z.object({
      type: z.enum(["qr-code", "file", "avatar"]),
    })
  ),
  zValidator(
    "form",
    z.object({
      file: z.instanceof(File),
    })
  ),
  async (c) => {
    const { type } = c.req.valid("param");

    const body = await c.req.parseBody();
    const file = body.file as File;

    if (!file) {
      return c.json({ message: "文件不存在" }, 400);
    }

    if (file.size > MAX_FILE_SIZE) {
      return c.json(
        { message: `文件大小超过限制，${MAX_FILE_SIZE / 1024 / 1024}MB` },
        400
      );
    }

    const key = `${c.get("user").id}/${type}/${randomString()}.${file.type.split("/")[1]}`;
    const { size } = await uploadFile(file, key);

    return c.json({
      message: "文件上传成功",
      data: { key, size },
    });
  }
);

export default app;
