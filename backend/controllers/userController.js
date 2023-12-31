const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { ERROR, TRUE } = require("../constant");
const {
  verifyUsernameAndEmailExisits,
} = require("../utils/verifyEmailUsername");
const User = require("../models/User");
const {
  getUserDataFromEmail,
  getUserDataFromUsername,
  addUserToDB,
} = require("../repository/userRepository");

const SALT = Number(process.env.BCRYPT_SALTS);

const registerUser = async (req, res) => {
  const isValid = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Input",
      data: isValid.error,
    });
  }

  const isUserExisiting = await verifyUsernameAndEmailExisits(
    req.body.email,
    req.body.username
  );

  if (isUserExisiting === TRUE) {
    return res.status(400).send({
      status: 400,
      message: "Email or Username already exists.",
    });
  } else if (isUserExisiting === ERROR) {
    return res.status(400).send({
      status: 400,
      message: "Err: verifyUsernameAndEmailExisits failed",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, SALT);

  const userObj = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const response = await addUserToDB(userObj);

  if (response === ERROR) {
    res.status(400).send({
      status: 400,
      message: "DB Error: Failed to add new user",
    });
  } else if (response === TRUE) {
    res.status(201).send({
      status: 201,
      message: "User added successfully",
    });
  }
};

const loginUser = async (req, res) => {
  const { loginId, password } = req.body;

  const isEmail = Joi.object({
    loginId: Joi.string().email().required(),
  }).validate({ loginId });

  let userData;

  if (isEmail.error) {
    userData = await getUserDataFromUsername(loginId);
    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "DB error: getUserDataFromUsername failed",
        data: userData.err,
      });
    }
  } else {
    userData = await getUserDataFromEmail(loginId);
    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "DB error: getUserDataFromEmail failed",
        data: userData.err,
      });
    }
  }

  if (!userData.data) {
    return res.status(400).send({
      status: 400,
      message: "No user found! Please register",
    });
  }
  
  const isPasswordMatching = await bcrypt.compare(
    password,
    userData.data.password
  );

  if (!isPasswordMatching) {
    return res.status(400).send({
      status: 400,
      message: "Incorrect Password",
    });
  }

  const payload = {
    username: userData.data.username,
    name: userData.data.name,
    email: userData.data.email,
    userId: userData.data._id,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET);

  res.status(200).send({
    status: 200,
    message: "Logged in successfully",
    data: {
      token,
    },
  });
};

module.exports = { registerUser, loginUser };
