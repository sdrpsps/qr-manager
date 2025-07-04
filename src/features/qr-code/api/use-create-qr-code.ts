import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { requestClient } from "@/lib/request-client";

type RequestType = InferRequestType<
  (typeof requestClient.api)["qr-code"]["$post"]
>;
type ResponseType = InferResponseType<
  (typeof requestClient.api)["qr-code"]["$post"]
>;

export const useCreateQRCode = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await requestClient.api["qr-code"].$post({
        json,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },
  });
};
