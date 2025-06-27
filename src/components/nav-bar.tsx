import { User } from "better-auth";
import Link from "next/link";

import { LogoutButton } from "@/features/auth/components/logout-button";

import { UserMenu } from "./user-menu";

interface NavbarProps {
  user: User;
}

export const Navbar = async ({ user }: NavbarProps) => {
  return (
    <nav className="flex justify-between items-center p-4 border-b bg-background w-full">
      <div className="text-2xl font-bold text-blue-500 dark:text-blue-200 select-none">
        <Link href="/">动态二维码生成工具</Link>
      </div>
      <div className="flex items-center gap-4">
        <UserMenu user={user} />
        <LogoutButton />
      </div>
    </nav>
  );
};
