import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "notes_app",
});

export default db;
