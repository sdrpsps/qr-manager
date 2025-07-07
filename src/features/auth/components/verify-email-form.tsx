"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
import { verifyEmailFormSchema } from "../schema";
import { useRouter } from "next/navigation";

interface VerifyEmailFormProps {
  email: string;
}

type FormStatus = {
  type: StatusType;
  message?: string;
};

export function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" });

  const router = useRouter();

  const form = useForm<z.infer<typeof verifyEmailFormSchema>>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const handleResend = async () => {
    await authClient.emailOtp.sendVerificationOtp(
      { email, type: "email-verification" },
      {
        onRequest: () => {
          setFormStatus({ type: "loading" });
        },
        onSuccess: () => {
          setFormStatus({ type: "success", message: "重新发送成功" });
        },
        onError: (error) => {
          setFormStatus({ type: "error", message: error.error.message });
        },
      }
    );
  };

  const onSubmit = async (data: z.infer<typeof verifyEmailFormSchema>) => {
    await authClient.emailOtp.verifyEmail(
      { email, otp: data.otp },
      {
        onRequest: () => {
          setFormStatus({ type: "loading" });
        },
        onSuccess: () => {
          toast.success("邮箱验证成功");
          router.push("/dashboard");
        },
        onError: (error) => {
          setFormStatus({ type: "error", message: error.error.message });
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input id="email" name="email" disabled defaultValue={email} />
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
                <Input placeholder="验证码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StatusMessage type={formStatus.type} message={formStatus.message} />

        <div className="flex justify-between gap-2">
          <Button variant="outline" type="button" onClick={handleResend}>
            重新发送
          </Button>
          <Button type="submit">验证邮箱</Button>
        </div>
      </form>
    </Form>
  );
}
