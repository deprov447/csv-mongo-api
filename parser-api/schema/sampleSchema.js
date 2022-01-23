const { Schema, model } = require("mongoose");

const People = new Schema({
  firstname: String,
  lastname: String,
  email1: String,
  email2: String,
  profession: String,
});

module.exports = model("People", People);
