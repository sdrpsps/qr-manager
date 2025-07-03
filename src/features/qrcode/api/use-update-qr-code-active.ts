import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { requestClient } from "@/lib/request-client";

type RequestType = InferRequestType<
  (typeof requestClient.api)["qr-code"][":id"]["active"]["$patch"]
>;
type ResponseType = InferResponseType<
  (typeof requestClient.api)["qr-code"][":id"]["active"]["$patch"]
>;

export const useUpdateQRCodeActive = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await requestClient.api["qr-code"][":id"][
        "active"
      ].$patch({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
    },
  });
};
