import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function SignIn() {
  return (
    <div className="flex w-full flex-col justify-center space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">修改密码</h1>
        <p className="text-sm text-muted-foreground">请填写以下信息修改密码</p>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
