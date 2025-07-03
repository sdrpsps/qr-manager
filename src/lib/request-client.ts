import { hc } from "hono/client";

import type { AppType } from "@/app/api/[[...route]]/route";

export const requestClient = hc<AppType>("/");
