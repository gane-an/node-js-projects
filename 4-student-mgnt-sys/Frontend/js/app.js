const API = "http://localhost:3000/api/students";

async function fetchStudents() {
  renderStudents(sampleStudents);
  const res = await fetch(API);
  const data = await res.json();
  renderStudents(data);
}

var sampleStudents = [
  { name: "Ganesan", city: "Salem", age: 20 },
  {
    name: "Start the server",
    city: "",
    age: 0,
  },
];

function renderStudents(students) {
  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";
  students.forEach((s, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${s.name}</td>
        <td>${s.age}</td>
        <td>${s.city}</td>
        <td><button class="edit-btn" onclick="editStudent(${
          s.id
        })">Edit</button></td>
        <td><button class="delete-btn" onclick="deleteStudent(${
          s.id
        })">Delete</button></td>
        `;
    tbody.appendChild(tr);
  });
}

async function deleteStudent(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  fetchStudents();
}

function editStudent(id) {
  location.href = `edit.html?id=${id}`;
}

fetchStudents();
