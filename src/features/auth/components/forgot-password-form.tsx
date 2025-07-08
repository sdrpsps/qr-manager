"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  StatusMessage,
  StatusType,
} from "@/features/auth/components/status-message";
import { authClient, getErrorMessage } from "@/lib/auth-client";

import { forgotPasswordFormSchema } from "../schema";

type FormStatus = {
  type: StatusType;
  message?: string;
};

export const ForgotPasswordForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" });

  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSendOTP = async () => {
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) return;

    setFormStatus({ type: "loading" });

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: form.getValues("email"),
      type: "forget-password",
    });

    if (error) {
      setFormStatus({
        type: "error",
        message: getErrorMessage(error.code, "zh-hans"),
      });
    } else {
      setFormStatus({ type: "success", message: "验证码已发送" });
    }
  };

  const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
    setFormStatus({ type: "loading" });

    const { error } = await authClient.emailOtp.resetPassword({
      email: values.email,
      otp: values.otp,
      password: values.password,
    });

    if (error) {
      setFormStatus({
        type: "error",
        message: getErrorMessage(error.code, "zh-hans"),
      });
    } else {
      toast.success("密码重置成功");
      router.push("/sign-in");
    }
  };

  const handleGithub = async () => {
    setFormStatus({ type: "loading" });

    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });

    if (error) {
      setFormStatus({
        type: "error",
        message: getErrorMessage(error.code, "zh-hans"),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>注册邮箱</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input type="email" placeholder="注册邮箱" {...field} />
                  <Button type="button" onClick={handleSendOTP}>
                    发送验证码
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>验证码</FormLabel>
              <FormControl>
                <Input type="text" placeholder="验证码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>新密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="新密码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="确认密码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StatusMessage type={formStatus.type} message={formStatus.message} />

        <div className="flex justify-between">
          <Link href="/sign-in">
            <Button type="button" variant="ghost">
              记得密码？去登录
            </Button>
          </Link>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={formStatus.type === "loading"}
        >
          修改密码
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              或者
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-full"
          onClick={handleGithub}
        >
          <GithubIcon className="size-4" />
          Github 登录
        </Button>
      </form>
    </Form>
  );
};
