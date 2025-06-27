import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/nav-bar";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center flex-grow">
      <Navbar user={session.user} />
      <main className="w-full max-w-4xl px-4 space-y-8 py-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
}
