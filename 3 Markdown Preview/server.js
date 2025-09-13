import http from "http";
import path from "path";
import fs from "fs";
import db from "./database/db.js";

const sendJSON = (res, data, status = 200) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api/notes")) {
    if (req.method === "GET") {
      const [rows] = await db.execute("SELECT * FROM notes");
      return sendJSON(res, rows);
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const data = JSON.parse(body);

      if (req.method === "POST") {
        await db.execute("INSERT INTO notes (name, content) VALUES (?, ?)", [
          data.name,
          data.content,
        ]);
        return sendJSON(res, { message: "Note added" }, 201);
      }

      if (req.method === "PUT") {
        const [result] = await db.execute(
          "UPDATE notes SET name = ?, content = ? WHERE id = ?",
          [data.name, data.content, data.id]
        );
        if (result.affectedRows > 0) {
          return sendJSON(res, { message: "Note Updated" });
        }
        return sendJSON(res, { message: "Note not Found" }, 404);
      }

      if (req.method === "DELETE") {
        const [result] = await db.execute("DELETE FROM notes WHERE id = ?", [
          data.id,
        ]);
        if (result.affectedRows > 0) {
          return sendJSON(res, { message: "Note deleted" });
        }
        return sendJSON(res, { message: "Note not Found" }, 404);
      }
    });

    return;
  }

  // Serve Static files
  let filePath = "./public" + (req.url === "/" ? "/index.html" : req.url);
  let ext = path.extname(filePath);
  const typeMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
    res.writeHead(200, { "Content-Type": typeMap[ext] || "text/plain" });
    res.end(content);
  });
});

server.listen(9090, () =>
  console.log("Server Started at http://localhost:9090 !")
);
