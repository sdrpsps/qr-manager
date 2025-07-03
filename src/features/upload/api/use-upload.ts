import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { requestClient } from "@/lib/request-client";

type RequestType = InferRequestType<
  (typeof requestClient.api)["upload"][":type"]["$post"]
>;
type ResponseType = InferResponseType<
  (typeof requestClient.api)["upload"][":type"]["$post"],
  200
>;

export const useUpload = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, form }) => {
      const response = await requestClient.api["upload"][":type"].$post({
        param,
        form,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },
  });
};
