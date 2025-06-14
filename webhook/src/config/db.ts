import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.MYSQL_PASSWORD);

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || "debuz",
});

export default pool; 