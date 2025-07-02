"use client";

import { Loader2Icon } from "lucide-react";
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
import { useDeleteState } from "../hooks/useDeleteState";

export const DeleteAlertDialog = () => {
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useDeleteState();

  const handleDeleteQRCode = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/qrcode/delete/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("二维码删除失败");
      }
      toast.success("二维码删除成功");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      open={!!deleteId}
      onOpenChange={(open) => setDeleteId(open ? deleteId : "")}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>删除二维码</AlertDialogTitle>
          <AlertDialogDescription>
            您确定要删除该二维码吗？删除后将无法恢复。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteQRCode}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {loading ? <Loader2Icon className="size-4 mr-2" /> : "确认"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
