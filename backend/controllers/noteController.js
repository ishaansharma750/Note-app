const Joi = require("joi");
const Note = require("../models/Note");
const { TRUE, ERROR, FALSE } = require("../constant");
const {
  addNoteToDB,
  getUserNotesFromDB,
  deleteNoteFromDB,
  getnoteDataFromDB,
  updateNoteInDB,
} = require("../repository/noteRepository");
const { noteBelongToUser } = require("../utils/noteBelongToUser");

// adding the note into db
const createNote = async (req, res) => {
  console.log(req.locals.username);
  const isValid = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().max(700).required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid data format",
      data: isValid.error,
    });
  }

  const { title, desc } = req.body;

  const noteObj = new Note({
    title,
    desc,
    creationDateTime: Date.now(),
    username: req.locals.username,
    userId: req.locals.userId,
  });

  const response = await addNoteToDB(noteObj);
  console.log(noteObj)

  if (response === ERROR) {
    return res.status(400).send({
      status: 400,
      message: "DB Error: addNoteToDB failed",
    });
  }

  res.status(201).send({
    status: 201,
    message: "Note created successfully",
  });
};

// get all notes of user
const getUserNotes = async (req, res) => {
  const userId = req.locals.userId;
  // const page = Number(req.query.page) || 1;
  // const LIMIT = 10;

  const notesData = await getUserNotesFromDB(userId);

  if (notesData.err) {
    return res.status(400).send({
      status: 400,
      message: "DB error: getUserNotesFromDB failed",
      data: notesData.err,
    });
  }

  res.status(200).send({
    status: 200,
    message: "Fetched user notes successfully",
    data: notesData.data,
  });
};

const deleteNote = async (req, res) => {
  const noteId = req.params.noteid;
  const userId = req.locals.userId;
  const isNoteBelongToUser = await noteBelongToUser(noteId, userId);

  if (isNoteBelongToUser === ERROR) {
    return res.status(400).send({
      status: 400,
      message: "DB Error: getNoteDataFromDB failed",
    });
  } else if (isNoteBelongToUser === FALSE) {
    return res.status(403).send({
      status: 403,
      message:
        "Unauthorized to delete the note. You are not the owner of the Note. ",
    });
  }

  const response = await deleteNoteFromDB(noteId);

  if (response === ERROR) {
    return res.status(400).send({
      status: 400,
      message: "DB Error: deleteNoteFromDB failed",
    });
  } else {
    return res.status(200).send({
      status: 200,
      message: "Note deleted successfully",
    });
  }
};

const editNote = async (req, res) => {
  const { noteId, title, desc } = req.body;
  const userId = req.locals.userId;
  const isNoteBelongToUser = await noteBelongToUser(noteId, userId);

  if (isNoteBelongToUser === ERROR) {
    return res.status(400).send({
      status: 400,
      message: "DB Error: getNoteDataFromDB failed",
    });
  } else if (isNoteBelongToUser === FALSE) {
    return res.status(403).send({
      status: 403,
      message:
        "Unauthorized to edit  the note. You are not the owner of the Note. ",
    });
  }

  const notesData = await getnoteDataFromDB(noteId);
  if (notesData.err) {
    return res.status(400).send({
      status: 400,
      message: "DB error: getUserNotesFromDB failed",
      data: notesData.err,
    });
  }

  const newNoteObj = {
    title,
    desc,
  };
  const response = await updateNoteInDB(newNoteObj, noteId);
  if (response === ERROR) {
    return res.status(400).send({
      status: 400,
      message: "DB Error: updateNoteInDB failed",
    });
  } else {
    return res.status(200).send({
      status: 200,
      message: "Note Updated successfully",
    });
  }
};

module.exports = { createNote, getUserNotes, deleteNote, editNote };
