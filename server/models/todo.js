const mongoose = require("mongoose");
const schema = mongoose.Schema;
const user = require("./user");

//Defining mongodb Todo schema
const todoSchema = new schema({
  name: String,
  priority: Number,
  checked: Boolean,
  owner_id: { type: schema.Types.ObjectId, ref: user },
});

module.exports = mongoose.model("Todo", todoSchema);
