const db = require("../config/db");

async function getAllStudents() {
  const [rows] = await db.query("SELECT * FROM students");
  // console.log(rows);
  return rows;
}

// Add a student
async function addStudent({ name, age, city }) {
  const [result] = await db.query(
    "INSERT INTO students (name,age,city) VALUES (?,?,?)",
    [name, age, city]
  );
  return { id: result.insertId, name, age, city };
}

// Update student
async function updateStudent(id, { name, age, city }) {
  await db.query("UPDATE students SET name=?,age=?,city=? WHERE id=?", [
    name,
    age,
    city,
    id,
  ]);
  return { id, name, age, city };
}

// Delete the student
async function deleteStudent(id) {
  await db.query("DELETE FROM students WHERE id=?", [id]);
  return true;
}

module.exports = { addStudent, deleteStudent, getAllStudents, updateStudent };
