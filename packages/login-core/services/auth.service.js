var mongoose = require("mongoose");
const Cryptr = require("cryptr");
const user = require("../model/user").Users;

async function RegisterNewUser(e, res) {
  try {
    let data = {};
    let duplicateUser = await user.findOne({ email: e.email });
    if (duplicateUser) {
      data.duplicateUser = true;
      return res.status(400).json({ data, message: "Duplicate User" });
    }
    data = await user.create(e);
    return res.status(200).json({ data, message: "User Registered" });
  } catch (error) {
    return res.status(500).json(error);
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
      return res.status(200).json({ data: existingUser, token: encryptedString });
    }
    return res.status(400).json({ data: {}, message: 'User not registered!' });
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  RegisterNewUser,
  Authenticate,
};
