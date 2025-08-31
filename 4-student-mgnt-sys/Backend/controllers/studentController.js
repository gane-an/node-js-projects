const Student = require("../models/studentModel");

exports.getStudents = async (req, res) => {
  const students = await Student.getAllStudents();
  res.json(students);
};

exports.createStudent = async (req, res) => {
  const { name, age, city } = req.body;
  if (!name || !age || !city)
    return res.status(400).json({ error: "All Fields are required" });
  const student = await Student.addStudent({ name, age, city });
  res.status(201).json(student);
};

//Update student

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, city } = req.body;
  const student = await Student.updateStudent(id, { name, age, city });
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  await Student.deleteStudent(id);
  res.json({ message: "Student deleted" });
};
