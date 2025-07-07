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
          你必须先验证你的邮箱，才能继续使用 QRManager
        </p>
      </div>
      <VerifyEmailForm email={email} />
    </div>
  );
}
