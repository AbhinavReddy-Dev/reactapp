const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const todos_schema = require("./graphql/todos");
const cors = require("cors");
const app = express();
const isAuth = require("../server/middleware/is-auth");

// Mongoose collection connection, can be made secure using dotenv and store in an environment variable
mongoose.connect(
  "mongodb+srv://singularityDev:akshitha123@singularitydev-lekkm.mongodb.net/todoapp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
mongoose.connection.once("open", () => {
  console.log(" 🛰 connected to mongoose ");
});

// cors to let apollo client GrapghQL requests access server side GraphQL schemas and resolvers
app.use(cors());

app.use(isAuth);
// server side start point for query requests
app.use(
  "/graphql",
  graphqlHTTP({
    schema: todos_schema,
    graphiql: true,
  })
);

// Express listening on a port to run server side
const port = 5000;
app.listen(port, () => {
  console.log(" 🚀 server lauched on launch port ", port);
});
