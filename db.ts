import dotenv from "dotenv";
import pg from "pg"
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config()
const Pool = pg.Pool;

export const pool = new Pool({
    connectionString:process.env.CONNECTIONSTRING,
})  

export const db = drizzle(pool)