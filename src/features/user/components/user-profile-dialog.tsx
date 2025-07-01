"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/features/auth/components/status-message";
import { FileUploadResponse } from "@/features/upload/types";
import { authClient } from "@/lib/auth-client";

import { useProfileStates } from "../hooks/useProfileStates";
import { userProfileSchema } from "../schemas";
import { UserAvatar } from "./user-avatar";

export function UserProfileDialog() {
  const [profileState, setProfileState] = useProfileStates();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  // 本地预览头像URL
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(
    session?.user.image ?? null
  );
  // 新选择的头像文件
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);

  // 表单初始化
  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: session?.user.name ?? "",
      image: session?.user.image ?? "",
      email: session?.user.email ?? "",
    },
  });

  // 选择头像，仅本地预览，不上传
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  // 保存昵称和头像
  const handleSave = async (values: z.infer<typeof userProfileSchema>) => {
    let avatarUrl = session?.user.image ?? null;

    // 如果有新头像文件，先上传
    if (avatarFile) {
      const formData = new FormData();
      formData.append("file", avatarFile);
      try {
        const res = await fetch("/api/upload/avatars", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("上传失败");
        const data = (await res.json()) as FileUploadResponse;
        avatarUrl = `${process.env.NEXT_PUBLIC_BUCKET_ADDRESS}/${data.data.key}`;
      } catch {
        toast.error("头像上传失败");
        return;
      }
    }

    // 保存昵称和头像
    try {
      await authClient.updateUser({
        image: avatarUrl,
        name: values.name,
      });
      toast.success("保存成功");
      setAvatarFile(null);
      refetch();
    } catch {
      toast.error("保存失败");
    }
  };

  const getAccounts = async () => {
    const { data: accounts } = await authClient.listAccounts();
    setAccounts(accounts?.map((account) => account.provider) ?? []);
  };

  const handleLinkGithub = async () => {
    await authClient.linkSocial({
      provider: "github",
      callbackURL: `/dashboard?profileOpen=true&profileMessage=${encodeURIComponent("Github 关联成功")}`,
    });
  };

  // session 拿到后同步表单和头像
  useEffect(() => {
    if (session) {
      form.reset({
        name: session.user.name ?? "",
        image: session.user.image ?? "",
        email: session.user.email ?? "",
      });
      setImageUrl(session.user.image ?? null);
      setAvatarFile(null);
      getAccounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Dialog
      open={profileState.profileOpen}
      onOpenChange={(open) =>
        setProfileState({ profileOpen: open, profileMessage: "" })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>个人资料</DialogTitle>
          <DialogDescription>您的个人资料，可以随时修改</DialogDescription>
        </DialogHeader>
        {isPending && <StatusMessage type="loading" />}
        {error && <StatusMessage type="error" message={error.message} />}

        {session && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>昵称</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>头像</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                        <UserAvatar
                          size="lg"
                          name={
                            form.getValues("name") || session?.user.name || ""
                          }
                          image={imageUrl || undefined}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>帐号关联</FormLabel>
                <>
                  {profileState.profileMessage && (
                    <StatusMessage
                      type="success"
                      message={profileState.profileMessage}
                    />
                  )}
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleLinkGithub}
                    disabled={accounts.includes("github")}
                  >
                    <GithubIcon className="size-4" />
                    {accounts.includes("github")
                      ? "已关联 Github"
                      : "关联 Github"}
                  </Button>
                </>
              </FormItem>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    取消
                  </Button>
                </DialogClose>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
