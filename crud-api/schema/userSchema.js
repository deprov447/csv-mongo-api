const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username not provided"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", userSchema);
