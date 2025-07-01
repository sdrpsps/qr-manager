"use client";

import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRestPasswordStates } from "@/features/auth/hooks/useRestPasswordStates";
import { authClient } from "@/lib/auth-client";

interface ResetPasswordAlertDialogProps {
  email: string;
}

export const ResetPasswordAlertDialog = ({
  email,
}: ResetPasswordAlertDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordState, setResetPasswordState] = useRestPasswordStates();

  const handleResetPassword = async () => {
    await authClient.requestPasswordReset(
      {
        email,
        redirectTo: "/reset-password",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          toast.success("密码重置邮件已发送，请检查您的邮箱。");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  };

  return (
    <AlertDialog
      open={resetPasswordState.resetPasswordOpen}
      onOpenChange={(open) =>
        setResetPasswordState({ resetPasswordOpen: open })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>修改密码</AlertDialogTitle>
          <AlertDialogDescription>
            您确定要修改密码吗？这会给您发送一封包含修改密码链接的邮件。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleResetPassword}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? <Loader2Icon className="size-4 mr-2" /> : "确认"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
