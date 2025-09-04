const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ganesh00",
  database: "epmloyee_db",
});

module.exports = db;
