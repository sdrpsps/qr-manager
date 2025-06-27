import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { createDb } from "./db";
import { sendEmail } from "@/features/auth/actions/sendEmail";
import { accounts, sessions, users, verifications } from "./db/schema";

const db = await createDb();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "修改密码 - 动态二维码",
        name: user.name,
        url,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "验证您的邮箱地址 - 动态二维码",
        name: user.name,
        url,
      });
    },
  },
  security: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"],
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
