import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full flex-col justify-center space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">忘记密码</h1>
        <p className="text-sm text-muted-foreground">
          请填写以下信息以重置密码
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
