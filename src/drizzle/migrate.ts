import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(sql);

async function main() {
	await migrate(db, { migrationsFolder: "./src/drizzle/migrations" });

	await sql.end();
}

main();
