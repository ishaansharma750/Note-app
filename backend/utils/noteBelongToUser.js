const { ERROR, TRUE, FALSE } = require("../constant");
const { getnoteDataFromDB } = require("../repository/noteRepository");

const noteBelongToUser = async (noteid, userId) => {
  const noteData = await getnoteDataFromDB(noteid);

  if (noteData.data === null && noteData.err == null) {
    return ERROR;
  }

  if (noteData.err) {
    return ERROR;
  } else if (noteData.data.userId == userId) {
    return TRUE;
  } else {
    return FALSE;
  }
};

module.exports = { noteBelongToUser };
