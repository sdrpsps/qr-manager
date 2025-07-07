import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

export const createStorage = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.NEXT_INC_CACHE_R2_BUCKET) {
    throw new Error("Storage service not available");
  }

  return env.NEXT_INC_CACHE_R2_BUCKET;
});
