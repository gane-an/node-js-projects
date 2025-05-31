# 📝 Markdown Notes Preview App (Pure Node.js)

A minimalistic note-taking app that supports live **Markdown preview**, built entirely with **core Node.js**, no frameworks.

---

## 📦 Features

* 🧠 Write and preview notes using **Markdown** in real-time
* 💾 Save, update, delete, and view notes
* 💻 Backend powered by core Node.js `http`, `fs`, and `path` modules
* 📄 All notes stored in a local `notes.json` file
* 📥 Download saved notes as `.md` files
* ⚡ No frameworks or databases required

---

## 🗂️ Project Structure
```bash 
Markdown Preview/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── notes.json      # JSON file used to store notes
└── server.js       # Main Node.js server file
```
---


## ✍️ Usage

* Type Markdown in the left `textarea`.
* See the **live preview** on the right.
* Give your note a **name** and click **Save/Update**.
* View saved notes in the **Saved Notes** section.
* Click:

  * **Show** to open a modal view with preview and download
  * **Edit** to update
  * **Delete** to remove a note

---

## 📋 API Endpoints

| Method | Endpoint     | Description          | Request Body Example                             |
| ------ | ------------ | -------------------- | ------------------------------------------------ |
| GET    | `/api/notes` | Fetch all notes      | –                                                |
| POST   | `/api/notes` | Add a new note       | `{ "name": "Note1", "content": "## Markdown" }`  |
| PUT    | `/api/notes` | Update existing note | `{ "id": 123, "name": "New", "content": "..." }` |
| DELETE | `/api/notes` | Delete a note        | `{ "id": 123 }`                                  |

---

## 🛠️ Technologies Used

* HTML, CSS, JavaScript
* [Marked.js](https://marked.js.org/) for Markdown parsing
* Node.js core modules (`http`, `fs`, `path`)

---
## 👨‍💻 Author

**Ganesan**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat\&logo=linkedin)](https://www.linkedin.com/in/gane-an)

---

### <center>🙏 Thank You for Visiting! 😊</center> 

