import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/nav-bar";
import { LogoutAlertDialog } from "@/features/auth/components/logout-alert-dialog";
import { ResetPasswordAlertDialog } from "@/features/auth/components/reset-password-alert-dialog";
import { UserProfileDialog } from "@/features/user/components/user-profile-dialog";
import { auth } from "@/lib/auth";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <>
      <Navbar user={session.user} />
      <UserProfileDialog />
      <ResetPasswordAlertDialog email={session.user.email} />
      <LogoutAlertDialog />
      <main className="flex-1">{children}</main>
    </>
  );
}
