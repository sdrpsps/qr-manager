import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts",
} satisfies Config; 