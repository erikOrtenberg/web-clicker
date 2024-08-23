import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/better-sqlite3";

dotenv.config();

console.log("path: ",process.env.SQLITE_DB_PATH)

const client = new Database(process.env.SQLITE_DB_PATH);
const db = drizzle(client);

export { client, db };
