const apiUrl = "/api/employees";

const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");
const cancelEditBtn = document.getElementById("cancelEdit");
const formTitle = document.getElementById("formTitle");

let editMode = false;

async function fetchEmployees() {
  const res = await fetch(apiUrl);
  const employees = await res.json();
  renderTable(employees);
}

function renderTable(employees) {
  employeeTable.innerHTML = "";
  employees.forEach((emp, i) => {
    const row = `
        <tr>
                <td>${i + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.employee_code}</td>
                <td>${emp.salary}</td>
                <td class="center-el">
                    <button class="action-btn edit-btn" onclick="editEmployee(${
                      emp.id
                    },'${emp.name}','${emp.employee_code}',${
      emp.salary
    })">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteEmployee(${
                      emp.id
                    })">Delete</button>
                </td>
            </tr>
        `;
    employeeTable.innerHTML += row;
  });
}

employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const empData = {
    name: document.getElementById("name").value,
    employee_code: document.getElementById("employee_code").value,
    salary: document.getElementById("salary").value,
  };
  if (!editMode) {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empData),
    });
  } else {
    const id = document.getElementById("employeeId").value;
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empData),
    });
    editMode = false;
    formTitle.textContent = "Add Employee";
    cancelEditBtn.classList.add("hidden");
  }

  employeeForm.reset();
  fetchEmployees();
});

function editEmployee(id, name, code, salary) {
  document.getElementById("employeeId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("employee_code").value = code;
  document.getElementById("salary").value = salary;
  editMode = true;
  formTitle.textContent = "Edit Employee";
  cancelEditBtn.classList.remove("hidden");
}

cancelEditBtn.addEventListener("click", () => {
  employeeForm.reset();
  editMode = false;
  formTitle.textContent = "Add Employee";
  cancelEditBtn.classList.add("hidden");
});

// Delete Employee
async function deleteEmployee(id) {
  if (confirm("Are you sure want to delete this employee?")) {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    fetchEmployees();
  }
}

fetchEmployees();
