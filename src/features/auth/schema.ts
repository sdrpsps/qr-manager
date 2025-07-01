import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "邮箱格式不正确",
  }),
  password: z.string().min(8, {
    message: "密码至少8个字符",
  }),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(8, {
      message: "昵称至少8个字符",
    }),
    email: z.string().email({
      message: "邮箱格式不正确",
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

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "新密码至少8个字符",
    }),
    confirmPassword: z.string().min(8, {
      message: "确认密码至少8个字符",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不一致",
    path: ["confirmPassword"],
  });

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "邮箱格式不正确",
  }),
});
