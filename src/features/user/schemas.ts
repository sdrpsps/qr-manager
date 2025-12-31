import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(1),
  image: z.string().nullable(),
  email: z.string().email(),
});

// 设置密码（OAuth用户首次设置密码，需要OTP验证）
export const setPasswordSchema = z
  .object({
    otp: z.string().min(6, {
      message: "验证码至少6个字符",
    }),
    password: z.string().min(8, {
      message: "密码至少8个字符",
    }),
    confirmPassword: z.string().min(8, {
      message: "确认密码至少8个字符",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不一致",
    path: ["confirmPassword"],
  });

// 修改密码（需要当前密码）
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "当前密码至少8个字符",
    }),
    newPassword: z.string().min(8, {
      message: "新密码至少8个字符",
    }),
    confirmPassword: z.string().min(8, {
      message: "确认密码至少8个字符",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "密码不一致",
    path: ["confirmPassword"],
  });

// 通过OTP重置密码（已登录状态，忘记密码）
export const resetPasswordWithOtpSchema = z
  .object({
    otp: z.string().min(6, {
      message: "验证码至少6个字符",
    }),
    newPassword: z.string().min(8, {
      message: "新密码至少8个字符",
    }),
    confirmPassword: z.string().min(8, {
      message: "确认密码至少8个字符",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "密码不一致",
    path: ["confirmPassword"],
  });
