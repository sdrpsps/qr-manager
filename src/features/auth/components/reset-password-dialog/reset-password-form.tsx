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
import { resetPasswordWithOtpSchema } from "@/features/user/schemas";
import { authClient, getErrorMessage } from "@/lib/auth-client";

interface ResetPasswordFormProps {
  userEmail: string;
  onSuccess: () => void;
  onBackToChange: () => void;
}

export function ResetPasswordForm({
  userEmail,
  onSuccess,
  onBackToChange,
}: ResetPasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordWithOtpSchema>>({
    resolver: zodResolver(resetPasswordWithOtpSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSendOTP = async () => {
    setIsSendingOtp(true);

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

    setIsSendingOtp(false);
  };

  const onSubmit = async (values: z.infer<typeof resetPasswordWithOtpSchema>) => {
    setIsSubmitting(true);

    const { error } = await authClient.emailOtp.resetPassword({
      email: userEmail,
      otp: values.otp,
      password: values.newPassword,
    });

    if (error) {
      toast.error(getErrorMessage(error.code, "zh-hans"));
    } else {
      toast.success("密码重置成功");
      form.reset();
      setOtpSent(false);
      onSuccess();
    }

    setIsSubmitting(false);
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
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>新密码</FormLabel>
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

        <Button
          type="button"
          variant="link"
          className="px-0 text-sm"
          onClick={onBackToChange}
        >
          记得密码？返回修改密码
        </Button>

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
              "重置密码"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
