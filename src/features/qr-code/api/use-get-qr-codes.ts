import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { requestClient } from "@/lib/request-client";

type ResponseType = InferResponseType<
  (typeof requestClient.api)["qr-code"]["$get"]
>;

export const useGetQRCodes = () => {
  return useQuery<ResponseType>({
    queryKey: ["qr-codes"],
    queryFn: async () => {
      const response = await requestClient.api["qr-code"].$get();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },
  });
};
