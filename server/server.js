const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const todos_schema = require("./graphql/todos");
const cors = require("cors");
const app = express();

mongoose.connect(
  "mongodb+srv://singularityDev:akshitha123@singularitydev-lekkm.mongodb.net/todoapp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log(" 🛰 connected to mongoose ");
});
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: todos_schema,
    graphiql: true
  })
);

const port = 5000;
app.listen(port, () => {
  console.log(" 🚀 server lauched on launch port ", port);
});
