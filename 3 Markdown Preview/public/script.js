let notes = [];
let editingNoteId = null;

function render() {
  const list = document.getElementById("noteList");
  list.innerHTML = "";
  if (notes.length === 0) {
    const emtyMsg = document.createElement("li");
    emtyMsg.textContent = "No saved notes yet.";
    list.appendChild(emtyMsg);
    return;
  }
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note.name + " ";

    const showBtn = document.createElement("button");
    showBtn.textContent = "Show";
    showBtn.addEventListener("click", () => {
      showNoteModal(note);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editingNoteId = note.id;
      document.getElementById("noteNameInput").value = note.name;
      document.getElementById("noteInput").value = note.content;
      document.getElementById("preview").innerHTML = marked.parse(note.content);
      document.getElementById("noteInput").focus();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteNote(note.id);
    });

    li.appendChild(showBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function deleteNote(noteId) {
  fetch("/api/notes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: noteId }),
  }).then(() => {
    editingNoteId = null;
    clearInputs();
    fetchNotes();
  });
}

function fetchNotes() {
  fetch("/api/notes")
    .then((res) => res.json())
    .then((data) => {
      notes = data;
      render();
    });
}

function addOrUpdateNote() {
  const name = document.getElementById("noteNameInput").value.trim();
  const content = document.getElementById("noteInput").value.trim();
  if (!name || !content) return;
  const payload = {
    name,
    content,
  };
  if (editingNoteId !== null) {
    payload.id = editingNoteId;
    fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      editingNoteId = null;
      clearInputs();
      fetchNotes();
    });
  } else {
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      clearInputs();
      fetchNotes();
    });
  }
}

function clearInputs() {
  document.getElementById("noteNameInput").value = "";
  document.getElementById("noteInput").value = "";
  document.getElementById("preview").innerHTML = "";
}

// Modal Show
let currentModalNote = null;
function showNoteModal(note) {
  currentModalNote = note;
  document.getElementById("modalNoteName").textContent = note.name;
  document.getElementById("modalNoteContent").innerHTML = marked.parse(
    note.content
  );
  document.getElementById("showModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
  currentNote = null;
}

function downloadNote() {
  if (!currentModalNote) return;
  const blob = new Blob([currentModalNote.content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentModalNote.name || "note"}.md`;
  a.click();
  closeModal("showModal");
  URL.revokeObjectURL(url);
}

window.onload = fetchNotes;

document.getElementById("noteInput").addEventListener("input", () => {
  const markdown = document.getElementById("noteInput").value;
  document.getElementById("preview").innerHTML = marked.parse(markdown);
});
