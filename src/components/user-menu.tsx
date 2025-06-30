"use client";

import { User as BetterAuthUser } from "better-auth/types";
import { ChevronDownIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/features/auth/components/logout-button";

import { UserAvatar } from "./user-avatar";

interface UserMenuProps {
  user: BetterAuthUser;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-auto p-0 hover:bg-transparent focus:bg-transparent"
        >
          <div className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition-colors">
            <UserAvatar name={user.name} image={user.image} size="md" />
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-gray-900">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
            <ChevronDownIcon
              className={`size-4 text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => {}}>
          <UserIcon className="size-4 mr-2" />
          <span>个人资料</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => {}}>
          <SettingsIcon className="size-4 mr-2" />
          <span>设置</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
