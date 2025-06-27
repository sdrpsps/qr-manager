import { RegisterForm } from "@/features/auth/components/register-form";

export default function SignIn() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">欢迎注册</h1>
        <p className="text-sm text-muted-foreground">请选择以下方式注册</p>
      </div>
      <RegisterForm />
    </div>
  );
}
