"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient, getErrorMessage } from "@/lib/auth-client";

import { useLogoutState } from "../hooks/useLogoutState";

export const LogoutAlertDialog = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [logoutOpen, setLogoutOpen] = useLogoutState();

  const handleLogout = async () => {
    setIsLoading(true);

    const { error } = await authClient.signOut();

    if (error) {
      toast.error(getErrorMessage(error.code, "zh-hans"));
      setIsLoading(false);
    } else {
      toast.success("退出成功");
      router.push("/sign-in");
    }
  };

  return (
    <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>退出登录</AlertDialogTitle>
          <AlertDialogDescription>
            您确定要退出登录吗？退出后需要重新登录才能访问您的账户。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? <Loader2Icon className="size-4 mr-2" /> : "确认"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
