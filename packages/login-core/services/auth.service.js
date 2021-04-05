var mongoose = require("mongoose");
const Cryptr = require("cryptr");
const user = require("../model/user").Users;

async function RegisterNewUser(e, res) {
  try {
    let data = {};
    let duplicateUser = await user.findOne({ email: e.email });
    if (duplicateUser) {
      data.duplicateUser = true;
      return res
        .status(400)
        .json({ ResponseException: { ExceptionMessage: "Duplicate User" } });
    }
    data = await user.create(e);
    return res.status(200).json({ data, message: "User Registered" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({
        ResponseException: {
          ValidationErrors: error.errors,
          ExceptionMessage: error.message,
        },
      });
    }
    return res
      .status(500)
      .json({
        ResponseException: {
          error: error,
          ExceptionMessage: error.message
            ? error.message
            : "Error occured registering new User.",
        },
      });
  }
}

async function Authenticate(e, res) {
  try {
    let existingUser = await user.findOne({ email: e.email });
    if (existingUser) {
      const cryptr = new Cryptr(existingUser.userName);
      const encryptedString = cryptr.encrypt({
        userName: existingUser.userName,
        email: existingUser.email,
        role: existingUser.role,
      });
      return res
        .status(200)
        .json({ data: existingUser, token: encryptedString });
    }
    return res.status(401).json({
      ResponseException: {
        ExceptionMessage: "Invalid Credentials, User not registered!",
      },
    });
  } catch (error) {
    return res
    .status(500)
    .json({
      ResponseException: {
        error: error,
        ExceptionMessage: error.message
          ? error.message
          : "Error occured logging in.",
      },
    });    
  }
}

module.exports = {
  RegisterNewUser,
  Authenticate,
};
