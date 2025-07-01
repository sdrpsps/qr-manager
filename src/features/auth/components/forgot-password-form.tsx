"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { authClient } from "@/lib/auth-client";

import { forgotPasswordFormSchema } from "../schema";
type FormStatus = {
  type: StatusType;
  message?: string;
};

export const ForgotPasswordForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" });

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
    await authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onRequest: () => {
          setFormStatus({ type: "loading" });
        },
        onSuccess: () => {
          setFormStatus({
            type: "success",
            message: "密码重置邮件已发送，请检查您的邮箱。",
          });
        },
        onError: (ctx) => {
          setFormStatus({
            type: "error",
            message: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input type="email" placeholder="邮箱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StatusMessage type={formStatus.type} message={formStatus.message} />

        <div className="flex justify-between">
          <Link href="/sign-in">
            <Button type="button" variant="ghost">
              有账号？去登录
            </Button>
          </Link>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={formStatus.type === "loading"}
        >
          发送重置密码邮件
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
