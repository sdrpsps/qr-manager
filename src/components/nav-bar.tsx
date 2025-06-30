import { User } from "better-auth/types";
import Image from "next/image";
import Link from "next/link";

import { UserMenu } from "./user-menu";

interface NavbarProps {
  user: User;
}

export const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent select-none">
          <Link href="/" className="flex items-center">
            <Image
              className="mr-2"
              src="https://image.dooo.ng/c/2025/06/30/6861f48915974.webp"
              alt="QRManager"
              width={30}
              height={30}
            />
            QRManager
          </Link>
        </div>
        <UserMenu user={user} />
      </div>
    </nav>
  );
};
