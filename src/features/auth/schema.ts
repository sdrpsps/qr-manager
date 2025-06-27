import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "邮箱格式不正确",
  }),
  password: z.string().min(2, {
    message: "密码至少2个字符",
  }),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "昵称至少2个字符",
    }),
    email: z.string().email({
      message: "邮箱格式不正确",
    }),
    password: z.string().min(2, {
      message: "密码至少2个字符",
    }),
    confirmPassword: z.string().min(2, {
      message: "确认密码至少2个字符",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不一致",
    path: ["confirmPassword"],
  });
