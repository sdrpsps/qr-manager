"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { authClient } from "@/lib/auth-client";

import { loginFormSchema } from "../schema";
import { StatusMessage, StatusType } from "./status-message";

type FormStatus = {
  type: StatusType;
  message?: string;
};

export const LoginForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" });
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setFormStatus({ type: "loading" });
        },
        onSuccess: () => {
          router.push("/dashboard");
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
                <Input placeholder="邮箱" {...field} />
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
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="密码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StatusMessage type={formStatus.type} message={formStatus.message} />

        <div className="flex justify-between">
          <Link href="/sign-up">
            <Button type="button" variant="ghost">
              没有账号？去注册
            </Button>
          </Link>
          <Link href="/forgot-password">
            <Button type="button" variant="ghost">
              忘记密码？
            </Button>
          </Link>
        </div>
        <Button type="submit" className="w-full">
          登录
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
