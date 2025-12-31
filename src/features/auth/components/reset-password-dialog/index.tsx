"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRestPasswordStates } from "@/features/auth/hooks/useRestPasswordStates";
import { authClient } from "@/lib/auth-client";

import { ChangePasswordForm } from "./change-password-form";
import { ResetPasswordForm } from "./reset-password-form";
import { SetPasswordForm } from "./set-password-form";

type PasswordMode = "set" | "change" | "reset";

export const ResetPasswordDialog = () => {
  const [resetPasswordState, setResetPasswordState] = useRestPasswordStates();
  const [mode, setMode] = useState<PasswordMode>("change");
  const [isCheckingAccount, setIsCheckingAccount] = useState(true);
  const { data: session } = authClient.useSession();

  // 检测用户是否有凭证账户
  useEffect(() => {
    const checkCredentialAccount = async () => {
      setIsCheckingAccount(true);
      const { data: accounts } = await authClient.listAccounts();
      const hasCredential = accounts?.some(
        (account) => account.providerId === "credential"
      );

      // 如果没有凭证账户，默认模式为"设置密码"
      if (!hasCredential) {
        setMode("set");
      } else {
        setMode("change");
      }
      setIsCheckingAccount(false);
    };

    if (resetPasswordState.resetPasswordOpen) {
      checkCredentialAccount();
    }
  }, [resetPasswordState.resetPasswordOpen]);

  const handleSuccess = () => {
    setResetPasswordState({ resetPasswordOpen: false });
  };

  const handleSwitchToReset = () => {
    setMode("reset");
  };

  const handleSwitchToChange = () => {
    setMode("change");
  };

  return (
    <Dialog
      open={resetPasswordState.resetPasswordOpen}
      onOpenChange={(open) =>
        setResetPasswordState({ resetPasswordOpen: open })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "set" && "设置密码"}
            {mode === "change" && "修改密码"}
            {mode === "reset" && "重置密码"}
          </DialogTitle>
          <DialogDescription>
            {mode === "set" && "为您的账户设置密码，以便使用邮箱密码登录"}
            {mode === "change" && "修改您的登录密码"}
            {mode === "reset" && "通过邮箱验证码重置您的密码"}
          </DialogDescription>
        </DialogHeader>

        {/* 检测账户类型中 */}
        {isCheckingAccount && (
          <div className="flex items-center justify-center py-8">
            <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">
              正在检测账户类型...
            </span>
          </div>
        )}

        {/* 设置密码表单 */}
        {!isCheckingAccount && mode === "set" && session?.user.email && (
          <SetPasswordForm
            userEmail={session.user.email}
            onSuccess={handleSuccess}
          />
        )}

        {/* 修改密码表单 */}
        {!isCheckingAccount && mode === "change" && (
          <ChangePasswordForm
            onSuccess={handleSuccess}
            onForgotPassword={handleSwitchToReset}
          />
        )}

        {/* 重置密码表单 */}
        {!isCheckingAccount && mode === "reset" && session?.user.email && (
          <ResetPasswordForm
            userEmail={session.user.email}
            onSuccess={handleSuccess}
            onBackToChange={handleSwitchToChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
