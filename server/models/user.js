const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Todo = require("./todo");
//Defining mongodb Todo schema
const userSchema = new schema({
  name: String,
  email: String,
  phone: Number,
  verified: Boolean,
  todos: [Todo],
});

module.exports = mongoose.model("User", userSchema);
