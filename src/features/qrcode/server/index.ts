import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, isNull } from "drizzle-orm";
import { Hono } from "hono";
import z from "zod";

import { createDb } from "@/lib/db";
import { qrCodes } from "@/lib/db/schema";
import { sessionMiddleware } from "@/lib/session-middleware";

const db = await createDb();

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const codes = await db.query.qrCodes.findMany({
      columns: {
        styleOptions: false,
        deletedAt: false,
      },
      where: and(
        eq(qrCodes.userId, c.get("user").id),
        isNull(qrCodes.deletedAt)
      ),
      orderBy: [desc(qrCodes.createdAt)],
    });

    return c.json({ message: "查询二维码列表成功", data: codes });
  })
  .post(
    "/",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        name: z.string(),
      })
    ),
    async (c) => {
      const { name } = c.req.valid("json");

      const [qrCode] = await db
        .insert(qrCodes)
        .values({
          userId: c.get("user").id,
          name,
        })
        .returning({ id: qrCodes.id });

      return c.json({ message: "二维码创建成功", data: qrCode });
    }
  )
  .patch(
    "/:id/source-file-key",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        sourceFileKey: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { sourceFileKey } = c.req.valid("json");

      const [qrCode] = await db
        .update(qrCodes)
        .set({ sourceFileKey })
        .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)))
        .returning({ id: qrCodes.id });

      return c.json({ message: "添加文件成功", data: qrCode });
    }
  )
  .patch(
    "/:id/style-options",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        styleOptions: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { styleOptions } = c.req.valid("json");

      const [qrCode] = await db
        .update(qrCodes)
        .set({ styleOptions })
        .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)))
        .returning({ id: qrCodes.id });

      return c.json({ message: "更新样式成功", data: qrCode });
    }
  )
  .patch(
    "/:id/image-key",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        qrImageKey: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { qrImageKey } = c.req.valid("json");

      const [qrCode] = await db
        .update(qrCodes)
        .set({ qrImageKey })
        .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)))
        .returning({ id: qrCodes.id });

      return c.json({ message: "更新二维码图片成功", data: qrCode });
    }
  )
  .patch(
    "/:id/active",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        isActive: z.boolean(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { isActive } = c.req.valid("json");

      const [qrCode] = await db
        .update(qrCodes)
        .set({ isActive })
        .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)))
        .returning({ id: qrCodes.id });

      return c.json({ message: "更新启用状态成功", data: qrCode });
    }
  )
  .delete("/:id", sessionMiddleware, async (c) => {
    const { id } = c.req.param();

    const isExist = await db.query.qrCodes.findFirst({
      where: and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)),
    });

    if (!isExist) {
      return c.json({ message: "二维码不存在" }, 404);
    }

    const [qrCode] = await db
      .update(qrCodes)
      .set({ deletedAt: new Date() })
      .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)))
      .returning({ id: qrCodes.id });

    return c.json({ message: "删除成功", data: qrCode });
  });

export default app;
