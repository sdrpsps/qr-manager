"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { resetPasswordFormSchema } from "../schema";
import { useRestPasswordStates } from "../hooks/useRestPasswordStates";
import { useRouter } from "next/navigation";

type FormStatus = {
  type: StatusType;
  message?: string;
};

export const ResetPasswordForm = () => {
  const router = useRouter();

  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" });
  const [resetPasswordState] = useRestPasswordStates();

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    await authClient.resetPassword(
      {
        newPassword: values.password,
        token: resetPasswordState.token,
      },
      {
        onRequest: () => {
          setFormStatus({ type: "loading" });
        },
        onSuccess: () => {
          setFormStatus({
            type: "success",
            message: "密码修改成功",
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
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

        <Button
          className="w-full"
          type="submit"
          disabled={formStatus.type === "loading"}
        >
          修改密码
        </Button>
      </form>
    </Form>
  );
};
