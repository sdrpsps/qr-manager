import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { requestClient } from "@/lib/request-client";

type RequestType = InferRequestType<
  (typeof requestClient.api)["qr-code"][":id"]["$delete"]
>;
type ResponseType = InferResponseType<
  (typeof requestClient.api)["qr-code"][":id"]["$delete"]
>;

export const useDeleteQRCode = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await requestClient.api["qr-code"][":id"].$delete({
        param,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
      toast.success("二维码删除成功");
    },
    onError: () => {
      toast.error("二维码删除失败");
    },
  });
};
