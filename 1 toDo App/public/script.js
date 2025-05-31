let todos = [];

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.task;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newTask = prompt("Edit Task: ", todo.task);
      if (newTask?.trim()) updateTask(todo.id, newTask);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      deleteTask(todo.id);
    });
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function fetchTodos() {
  fetch("/api/todos")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        // console.log("Error got ", data);
        return;
      }
      todos = data;
      render();
    });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return;

  fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  }).then(() => {
    input.value = "";
    fetchTodos();
  });
}

function updateTask(id, task) {
  fetch("/api/todos", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, task }),
  }).then(() => {
    fetchTodos();
  });
}

function deleteTask(id) {
  fetch("/api/todos", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  }).then(() => {
    fetchTodos();
  });
}

window.onload = fetchTodos;
