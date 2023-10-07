const express = require("express");
const { createNote, getUserNotes, deleteNote, editNote } = require("../controllers/noteController");
const { isAuth } = require("../middlewares/AuthMiddleware");
const app = express();

app.post("/create-note", isAuth, createNote);
app.get("/get-user-notes", isAuth, getUserNotes);
app.delete("/delete-note/:noteid", isAuth, deleteNote);
app.put("/edit-note", isAuth, editNote);

module.exports = app;
 