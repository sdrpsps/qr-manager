import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { requestClient } from "@/lib/request-client";

type RequestType = InferRequestType<
  (typeof requestClient.api)["qr-code"][":id"]["image-key"]["$patch"]
>;
type ResponseType = InferResponseType<
  (typeof requestClient.api)["qr-code"][":id"]["image-key"]["$patch"]
>;

export const useUpdateQRCodeImageKey = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await requestClient.api["qr-code"][":id"][
        "image-key"
      ].$patch({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },
  });
};
