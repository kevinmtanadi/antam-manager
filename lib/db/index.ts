import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Ensure globalThis type safety
declare global {
  var postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("SUPABASE_DB_URL is not defined.");
}

// Use a persistent client in development to prevent multiple connections
const postgresSqlClient =
  process.env.NODE_ENV !== "production"
    ? (globalThis.postgresSqlClient ??= postgres(databaseUrl, {
        prepare: false,
      }))
    : postgres(databaseUrl, { prepare: false });

export const db = drizzle(postgresSqlClient);
