import http from "http";
import path from "path";
import fs from "fs";

let notes = [];

const loadNotes = () => {
  if (fs.existsSync("./notes.json")) {
    notes = JSON.parse(fs.readFileSync("notes.json"));
  }
};

const saveNotes = () => {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
};

const sendJSON = (res, data, status = 200) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/notes")) {
    if (req.method === "GET") {
      return sendJSON(res, notes);
    }
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const data = JSON.parse(body);
      if (req.method === "POST") {
        const note = {
          id: Date.now(),
          name: data.name,
          content: data.content,
        };
        notes.push(note);
        saveNotes();
        return sendJSON(res, { message: "Note added" }, 201);
      }
      if (req.method === "PUT") {
        const note = notes.find((n) => n.id === data.id);
        if (note) {
          note.name = data.name;
          note.content = data.content;
          saveNotes();
          return sendJSON(res, { message: "Note Updated" });
        }
        return sendJSON(res, { message: "Note not Founded" }, 404);
      }
      if (req.method === "DELETE") {
        notes = notes.filter((note) => note.id !== data.id);
        saveNotes();
        return sendJSON(res, { message: "Note deleted" });
      }
      return;
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
  console.log("Server Started in http://localhost:9090 !")
);
loadNotes();
