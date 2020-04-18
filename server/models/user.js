const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Defining mongodb Todo schema
const userSchema = new schema({
  name: String,
  email: String,
  phone: Number,
  verified: Boolean,
});

module.exports = mongoose.model("User", userSchema);
