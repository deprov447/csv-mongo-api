const { Schema, model } = require("mongoose");

const People = new Schema({
  id: String,
  firstname: String,
  lastname: String,
  email1: String,
  email2: String,
  profession: String,
});

module.exports = model("People", People);
