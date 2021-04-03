const mongoose = require("mongoose");
const validator = require("validator");

var UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: { validator: validator.isEmail, message: "Invalid email" },
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Employee", "Client"],
      default: "Client",
    },
  },
  {
    collection: "user",
  }
).index({ id: 1 });

const Users = mongoose.model("user", UserSchema);

module.exports = { Users };
