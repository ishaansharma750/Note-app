const { TRUE, FALSE, ERROR } = require("../constant");
const {findUsersWithEmailOrUsername} = require("../repository/userRepository");

const verifyUsernameAndEmailExisits = async (email, username) => {
  const userData = await findUsersWithEmailOrUsername(email, username);
  console.log(userData.data);

  if (userData.err) {
    return ERROR;
  } else if(userData.data) {
    return TRUE;
  } else {
    return FALSE;
  }
};

module.exports = {verifyUsernameAndEmailExisits}