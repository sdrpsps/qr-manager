import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";

import {
  sendForgetPasswordEmail,
  sendSignInEmail,
} from "@/features/auth/actions/sendEmail";

import { createDb } from "./db";
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
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        switch (type) {
          case "email-verification":
            await sendSignInEmail({
              to: email,
              subject: "验证您的邮箱地址 - QRManager",
              name: email,
              otp,
            });
            break;
          case "forget-password":
            await sendForgetPasswordEmail({
              to: email,
              subject: "重置您的密码 - QRManager",
              name: email,
              otp,
            });
            break;
          default:
            break;
        }
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET as string,
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
