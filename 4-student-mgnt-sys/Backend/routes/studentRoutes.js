const express = require("express");
const router = express.Router();

const studentCtrl = require("../controllers/studentController");

router.get("/", studentCtrl.getStudents);
router.post("/", studentCtrl.createStudent);
router.put("/:id", studentCtrl.updateStudent);
router.delete("/:id", studentCtrl.deleteStudent);

module.exports = router;
