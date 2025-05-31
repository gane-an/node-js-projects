import http from "http";
import fs from "fs";
import path from "path";

let todos = [];

const loadTodos = () => {
  if (fs.existsSync("todos.json")) {
    todos = JSON.parse(fs.readFileSync("./todos.json"));
  }
};
const saveTodos = () => {
  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
};
const sendJSON = (res, data, status = 200) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/todos")) {
    if (req.method === "GET") {
      return sendJSON(res, todos);
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const { task } = JSON.parse(body);
          todos.push({ id: Date.now(), task });
          saveTodos();
          sendJSON(res, { message: "Task added" }, 201);
        } catch (err) {
          sendJSON(res, { error: "Invalid Json " }, 400);
        }
      });
      return;
    } else if (req.method === "PUT") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        let { id, task } = JSON.parse(body);
        let todo = todos.find((el) => el.id === id);
        if (todo) {
          todo.task = task;
          saveTodos();
          sendJSON(res, { message: "Task Updated" });
        }
      });

      return;
    } else if (req.method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        let { id } = JSON.parse(body);
        todos = todos.filter((t) => t.id !== id);
        saveTodos();
        sendJSON(res, { message: "Task Deleted" });
      });
      return;
    }
  }

  //   Serve the static files
  let filePath = "./public" + (req.url === "/" ? "/index.html" : req.url);
  const ext = path.extname(filePath);
  const typeMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("404 Page Not Found!");
      // throw err;
      return;
    }
    res.writeHead(200, { "Content-Type": typeMap[ext] || "text/plain" });
    res.end(content);
  });
});

server.listen(9090, () =>
  console.log("Server Starts at http://localhost:9090 !")
);
loadTodos();
