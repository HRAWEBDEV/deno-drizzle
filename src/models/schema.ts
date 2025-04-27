import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

const usersTable = mysqlTable('users', {
 id: int('id').primaryKey().autoincrement(),
 name: varchar({ length: 255 }).notNull(),
 email: varchar({ length: 255 }).notNull().unique(),
 age: int().notNull(),
});

export { usersTable };
