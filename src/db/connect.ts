import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const poolConnection = mysql.createPool({
 host: Deno.env.get('DB_HOST'),
 user: Deno.env.get('DB_USER'),
 password: Deno.env.get('DB_PASSWORD'),
 database: Deno.env.get('DB_DATABASE'),
});

const db = drizzle({ client: poolConnection, casing: 'snake_case' });

async function testConnection(): Promise<boolean> {
 try {
  const connection = await poolConnection.getConnection();
  if (connection) {
   connection.release();
   return true;
  }
  return false;
 } catch (err) {
  console.log(`Error connecting to database: ${err}`);
  return false;
 }
}

async function closeConnection() {
 try {
  await poolConnection.end();
  console.log('Database connection closed successfully');
 } catch (err) {
  console.log(`Error closing database connection: ${err}`);
  throw err;
 }
}

export { db, testConnection, closeConnection };
