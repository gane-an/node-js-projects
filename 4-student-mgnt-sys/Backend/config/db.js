const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ganesh00",
  database: "student_db",
});

module.exports = pool.promise();
