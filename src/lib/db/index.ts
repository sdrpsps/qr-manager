import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";

import * as schema from "./schema";

export const createDb = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
});
