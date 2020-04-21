const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Defining mongodb Todo schema
const userSchema = new schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  verified: Boolean,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
