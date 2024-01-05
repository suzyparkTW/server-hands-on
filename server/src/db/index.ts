import dotenv from "dotenv";
import pg from "pg"
const { Client } = pg

dotenv.config({ path: '.env.local' });

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env

export const client = new Client({
  user: DB_USER,
  password: DB_PASSWORD,
  host: 'localhost',
  database: DB_NAME,
  port: 5455,
});

await client.connect();