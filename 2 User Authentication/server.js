import http from "http";
import path from "path";
import fs from "fs";
import url from "url";
import crypto from "crypto";

let users = [];

const loadUsers = () => {
  if (fs.existsSync("./users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
  }
};

const saveUsers = () => {
  if (fs.existsSync("./users.json")) {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
  }
};

const sendJSON = (res, data, statusCode = 200) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.path === "/api/signup" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      if (users.find((u) => u.username === username)) {
        sendJSON(res, { message: "User already exists" }, 400);
      } else {
        const hashed = hashPassword(password);
        users.push({ username, password: hashed });
        saveUsers();
        sendJSON(
          res,
          { message: "Registered Successfully", status: "ok" },
          201
        );
      }
    });

    return;
  }
  if (parsedUrl.path === "/api/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      const user = users.find((user) => user.username === username);
      if (user && user.password === hashPassword(password)) {
        sendJSON(res, { message: "Logged in Successfully", status: "ok" });
      } else {
        sendJSON(res, { message: "Invalid Credentials" }, 401);
      }
    });
    return;
  }

  // Static file serve
  const filepath = "./public" + (req.url === "/" ? "/index.html" : req.url);
  const ext = path.extname(filepath);
  const typeMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };
  fs.readFile(filepath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Page Not Found");
      return;
    }
    res.writeHead(200, { "Content-Type": typeMap[ext] || "text/plain" });
    res.end(content);
  });
});

server.listen(9090, () =>
  console.log("Server Started in http://localhost:9090 !")
);
loadUsers();
