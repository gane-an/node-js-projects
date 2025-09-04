const db = require("../config/db");

module.exports.getAllEmployees = async () => {
  const [employees] = await db.query("SELECT * FROM employees");
  //   console.log(employees);
  return employees;
};

module.exports.getEmployeeById = async (id) => {
  const [[employee]] = await db.query("SELECT * FROM employees where id = ?", [
    id,
  ]);
  //   console.log(employee);
  return employee;
};

module.exports.deleteEmployee = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM employees WHERE id=?",
    [id]
  );
  return affectedRows;
};

module.exports.addOrUpdateEmployee = async (dataBody, id = 0) => {
  //   console.log(dataBody);

  if (id == 0) {
    const [data] = await db.query(
      "INSERT INTO employees (name,employee_code,salary) values (?,?,?)",
      [dataBody.name, dataBody.employee_code, dataBody.salary]
    );
    return { id: data.insertId, ...dataBody };
  } else {
    const [{ affectedRows }] = await db.query(
      "UPDATE employees SET name=?,employee_code=?,salary=? WHERE id=?",
      [dataBody.name, dataBody.employee_code, dataBody.salary, id]
    );
    return affectedRows;
  }
};
