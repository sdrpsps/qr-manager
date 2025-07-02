import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

export const createStorage = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.R2) {
    throw new Error("Storage service not available");
  }

  return env.R2;
});
