const { TRUE, ERROR } = require("../constant");
const User = require("../models/User");

const findUsersWithEmailOrUsername = async (email, username) => {
  let userData = {
    data: null,
    err: null,
  };
  try {
    userData.data = await User.findOne({ $or: [{ email, username }] });
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const addUserToDB = async (userObj) => {
  try {
    await userObj.save();
    return TRUE;
  } catch (err) {
    return ERROR;
  }
};

const getUserDataFromUsername = async (username) => {
  const userData = {
    data: null,
    err: null,
  };
  try {
    userData.data = await User.findOne({ username });
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const getUserDataFromEmail = async (email) => {
  const userData = {
    data: null,
    err: null,
  };
  try {
    userData.data = await User.findOne({ email });
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

module.exports = {
  findUsersWithEmailOrUsername,
  addUserToDB,
  getUserDataFromUsername,
  getUserDataFromEmail,
};
