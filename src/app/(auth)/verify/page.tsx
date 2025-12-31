import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";

interface VerifyPageProps {
  searchParams: Promise<{
    email: string;
  }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { email } = await searchParams;

  return (
    <div className="flex w-full flex-col justify-center space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">验证邮箱</h1>
        <p className="text-sm text-muted-foreground">
          我们已向你的邮箱发送了验证码
        </p>
        <p className="text-xs text-muted-foreground">
          验证邮箱有助于防止滥用，为所有用户提供更好的服务
        </p>
      </div>
      <VerifyEmailForm email={email} />
    </div>
  );
}
