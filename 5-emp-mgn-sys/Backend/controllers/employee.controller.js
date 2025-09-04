const express = require("express"),
  routes = express.Router();

const services = require("../services/employee.service");

routes.get("/", async (req, res) => {
  const rows = await services.getAllEmployees();
  //   console.log(rows);
  res.send(rows);
});

routes.get("/:id", async (req, res) => {
  const row = await services.getEmployeeById(req.params.id);
  if (row.length == 0)
    res.status(404).json("no-record-found-in-this-id " + req.params.id);
  else res.send(row);
});

routes.delete("/:id", async (req, res) => {
  const affectedRows = await services.deleteEmployee(req.params.id);
  if (affectedRows == 0) {
    res.status(404).json("no-record-with-this-id: " + req.params.id);
  } else res.send("deleted successfully");
});

routes.post("/", async (req, res) => {
  const data = await services.addOrUpdateEmployee(req.body);
  res.send(data);
});

routes.put("/:id", async (req, res) => {
  const affectedRows = await services.addOrUpdateEmployee(
    req.body,
    req.params.id
  );
  if (affectedRows == 0)
    res.status(404).json("no-record-found-in-this-id: " + req.params.id);
  else res.send("Updated successfully");
});

module.exports = routes;
