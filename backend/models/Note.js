const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  textBody: {
    type: String,
    require: true,
  },
  creationDateTime: {
    type: Date,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    require: true,
    default: false,
  },
  deletionDateTime: {
    type: Date,
    require: false,
  },
});

module.exports = mongoose.model("notes", NoteSchema);
