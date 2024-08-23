import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  dialect: "sqlite",
  schema: "./src/lib/server/db/schema.ts",
  dbCredentials: {
    url: process.env.SQLITE_DB_PATH || "./src/lib/server/db/data.sqlite",
  },
  out: "./src/lib/server/db/migrations",
  verbose: true,
} satisfies Config;
