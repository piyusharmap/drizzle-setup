import "dotenv/config";

import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";
import { sql } from "drizzle-orm";

async function main() {
	const userData = [
		{
			name: "Jake",
			age: 21,
			email: "random1@example.com",
		},
		// {
		// 	name: 'John',
		// 	age: 27,
		// 	email: 'random2@example.com'
		// },
	];

	for (const user of userData) {
		const sqlQuery = sql`
            INSERT INTO ${UserTable} (name, age, email)
            VALUES (${user.name}, ${user.age}, ${user.email})
			ON CONFLICT (email) DO NOTHING
        `;

		const value = await db.execute(sqlQuery);
		console.log(value);
	}
}

main();
