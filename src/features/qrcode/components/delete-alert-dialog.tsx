"use client";

import { Loader2Icon } from "lucide-react";

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

import { useDeleteQRCode } from "../api/use-delete-qr-code";
import { useDeleteState } from "../hooks/use-delete-state";

export const DeleteAlertDialog = () => {
  const [deleteId, setDeleteId] = useDeleteState();

  const { mutate: handleDeleteQRCode, isPending } = useDeleteQRCode();

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
            onClick={() => handleDeleteQRCode({ param: { id: deleteId } })}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isPending ? <Loader2Icon className="size-4 mr-2" /> : "确认"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
