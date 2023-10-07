const { TRUE, ERROR } = require("../constant");
const Note = require("../models/Note");

const addNoteToDB = async (noteObj) => {
  try {
    await noteObj.save();
    return TRUE;
  } catch (err) {
    return ERROR;
  }
};

const getUserNotesFromDB = async (userId) => {
  let notesData = {
    data: null,
    err: null,
  };
  try {
    notesData.data = await Note.find({ userId }).sort({ creationTime: -1 });
    return notesData;
  } catch (err) {
    notesData.err = err;
    return notesData;
  }
};

const getnoteDataFromDB = async (noteId) => {
  let noteData = {
    data: null,
    err: null,
  };
  try {
    noteData.data = await Note.findOne({ _id: noteId });
    return noteData;
  } catch (err) {
    noteData.err = err;
    return noteData;
  }
};

const deleteNoteFromDB = async (noteId) => {
  try {
    await Note.findByIdAndDelete(noteId);
    return TRUE;
  } catch (err) {
    return ERROR;
  }
};

const updateNoteInDB = async (newNoteObj, noteId) => {
  try {
    await Note.findByIdAndUpdate({ _id: noteId }, newNoteObj);
    return TRUE;
  } catch (err) {
    return ERROR;
  }
};
module.exports = {
  addNoteToDB,
  getUserNotesFromDB,
  getnoteDataFromDB,
  deleteNoteFromDB,
  updateNoteInDB,
};
