const express = require("express"),
  app = express(),
  bodyPrs = require("body-parser"),
  cors = require("cors");
const path = require("path");

const db = require("./config/db"),
  employeeRoutes = require("./controllers/employee.controller");

const errHndle = require("./error/employee.errorhandler");
// middleware
app.use(cors());
app.use(bodyPrs.json());
app.use("/api/employees", employeeRoutes);
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(errHndle);

db.query("SELECT 1")
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => console.log("Server started at port 3000"));
  })
  .catch((err) => console.log("Error to connect DB " + err));
