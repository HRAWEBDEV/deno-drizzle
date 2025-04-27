import {
 int,
 mysqlTable,
 varchar,
 serial,
 boolean,
 date,
 timestamp,
} from 'drizzle-orm/mysql-core';

const usersTable = mysqlTable('users', {
 id: serial().primaryKey(),
 name: varchar({ length: 255 }).notNull(),
 email: varchar({ length: 255 }).notNull().unique(),
 age: int().notNull(),
 isMarried: boolean().default(false),
 birthDate: date(),
 createdAt: timestamp().defaultNow(),
 updatedAt: timestamp()
  .defaultNow()
  .$onUpdate(() => new Date()),
});

export { usersTable };
