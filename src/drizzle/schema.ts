import {
	boolean,
	index,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["ADMIN", "USER"]);

export const UserTable = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: varchar("name", { length: 255 }).notNull(),
		age: integer("age").notNull(),
		email: varchar("email", { length: 255 }).notNull().unique(),
		userRole: UserRole("userRole").default("USER").notNull(),
		createdAt: timestamp("createdAt").defaultNow().notNull(),
	},
	(table) => ({
		emailIndex: index("emailIndex").on(table.email),
	})
);

export const EmailPreferenceTable = pgTable("emailPreferences", {
	id: uuid("id").primaryKey().defaultRandom(),
	notifications: boolean("notifications").default(true).notNull(),
	user: uuid("user")
		.notNull()
		.references(() => UserTable.id, { onDelete: "cascade" }),
});

export const PostTable = pgTable("posts", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: varchar("title", { length: 255 }).notNull(),
	reactions: integer("reactions").notNull().default(0),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull(),
	author: uuid("author")
		.notNull()
		.references(() => UserTable.id),
});

export const CategoryTable = pgTable("categories", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 128 }).notNull(),
});

export const PostCategoryTable = pgTable(
	"posts_to_categories",
	{
		postId: uuid("postId")
			.notNull()
			.references(() => PostTable.id, { onDelete: "cascade" }),
		categoryId: serial("categoryId")
			.notNull()
			.references(() => CategoryTable.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.postId, table.categoryId] }),
	})
);
