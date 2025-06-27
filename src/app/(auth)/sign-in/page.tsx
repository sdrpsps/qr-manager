import { LoginForm } from "@/features/auth/components/login-form";

export default function SignIn() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">欢迎回来</h1>
        <p className="text-sm text-muted-foreground">请选择以下方式登录</p>
      </div>
      <LoginForm />
    </div>
  );
}
