const mongoose = require("mongoose");
const schema = mongoose.Schema;
const user = require("./user");

//Defining mongodb Todo schema
const todoSchema = new schema({
  name: String,
  priority: { type: Number, default: 3 },
  checked: Boolean,
  owner_id: { type: schema.Types.ObjectId, ref: user },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);
