import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hooks/use-loading";
import { setPasswordSchema } from "@/features/user/schemas";
import { authClient, getErrorMessage } from "@/lib/auth-client";

interface SetPasswordFormProps {
  userEmail: string;
  onSuccess: () => void;
}

export function SetPasswordForm({ userEmail, onSuccess }: SetPasswordFormProps) {
  const [isSubmitting, { start: startSubmitting, stop: stopSubmitting }] = useLoading();
  const [isSendingOtp, { start: startSendingOtp, stop: stopSendingOtp }] = useLoading();
  const [otpSent, setOtpSent] = useState(false);

  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSendOTP = async () => {
    startSendingOtp();

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: userEmail,
      type: "forget-password",
    });

    if (error) {
      toast.error(getErrorMessage(error.code, "zh-hans"));
    } else {
      toast.success("验证码已发送到您的邮箱");
      setOtpSent(true);
    }

    stopSendingOtp();
  };

  const onSubmit = async (values: z.infer<typeof setPasswordSchema>) => {
    startSubmitting();

    const { error } = await authClient.emailOtp.resetPassword({
      email: userEmail,
      otp: values.otp,
      password: values.password,
    });

    if (error) {
      toast.error(getErrorMessage(error.code, "zh-hans"));
    } else {
      toast.success("密码设置成功");
      form.reset();
      setOtpSent(false);
      onSuccess();
    }

    stopSubmitting();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>验证码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入验证码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={handleSendOTP}
            disabled={isSendingOtp || otpSent}
          >
            {isSendingOtp ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : otpSent ? (
              "已发送"
            ) : (
              "发送验证码"
            )}
          </Button>
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              取消
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              "设置密码"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
