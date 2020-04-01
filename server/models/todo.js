const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema = new schema({
  name: String,
  priority: Number,
  checked: Boolean
});

module.exports = mongoose.model("Todo", todoSchema);
