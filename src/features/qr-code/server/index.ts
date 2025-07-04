import { zValidator } from "@hono/zod-validator";
import { and, count, desc, eq, isNull } from "drizzle-orm";
import { Hono } from "hono";
import z from "zod";

import { createDb } from "@/lib/db";
import { qrCodes, qrCodeViews } from "@/lib/db/schema";
import { sessionMiddleware } from "@/lib/session-middleware";

const db = await createDb();

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const codes = await db
      .select({
        id: qrCodes.id,
        name: qrCodes.name,
        sourceFileKey: qrCodes.sourceFileKey,
        imageKey: qrCodes.imageKey,
        isActive: qrCodes.isActive,
        viewCount: count(qrCodeViews.id).as("viewCount"),
        createdAt: qrCodes.createdAt,
        updatedAt: qrCodes.updatedAt,
      })
      .from(qrCodes)
      .leftJoin(qrCodeViews, eq(qrCodes.id, qrCodeViews.qrCodeId))
      .where(
        and(eq(qrCodes.userId, c.get("user").id), isNull(qrCodes.deletedAt))
      )
      .groupBy(qrCodes.id)
      .orderBy(desc(qrCodes.createdAt));

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
    "/:id/name",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        name: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { name } = c.req.valid("json");

      const [qrCode] = await db
        .update(qrCodes)
        .set({ name })
        .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)))
        .returning({ id: qrCodes.id });

      return c.json({ message: "更新名称成功", data: qrCode });
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
        imageKey: z.string(),
      })
    ),
    async (c) => {
      const { id } = c.req.param();
      const { imageKey } = c.req.valid("json");

      const [qrCode] = await db
        .update(qrCodes)
        .set({ imageKey })
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
  .post("/:id/duplicate", sessionMiddleware, async (c) => {
    const { id } = c.req.param();

    const qrCode = await db.query.qrCodes.findFirst({
      where: and(eq(qrCodes.id, id), eq(qrCodes.userId, c.get("user").id)),
    });

    if (!qrCode) {
      return c.json({ message: "二维码不存在" }, 404);
    }

    const [newQRCode] = await db
      .insert(qrCodes)
      .values({
        userId: c.get("user").id,
        name: `${qrCode.name} - 副本`,
        sourceFileKey: qrCode.sourceFileKey,
        imageKey: qrCode.imageKey,
        styleOptions: qrCode.styleOptions,
        isActive: qrCode.isActive,
      })
      .returning({ id: qrCodes.id });

    return c.json({ message: "复制成功", data: newQRCode });
  })
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
