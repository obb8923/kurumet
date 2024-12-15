import { QueryError, QueryResult } from "mysql2";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err: QueryError | null) => {
  if (err) {
    console.error("!Error connecting to the database:", err);
    return;
  }
  console.log("!Connected to the database");
});

export default connection;
