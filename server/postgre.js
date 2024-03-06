import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let conString = process.env.CONNECTION_STRING;
export const db = new pg.Client({
  connectionString: conString,
});
