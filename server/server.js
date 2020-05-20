const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const graphqlHTTP = require("express-graphql");
const todos_schema = require("./graphql/todos");
const cors = require("cors");
const app = express();
const isAuth = require("../server/middleware/is-auth");
require("dotenv").config();

// Mongoose collection connection, can be made secure using dotenv and store in an environment variable
mongoose
  .connect(process.env.DB_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => {
    console.log(error.name, error.message);
  });

mongoose.connection.once("open", () => {
  console.log(" 🛰 connected to mongoose ");
});

// cors to let apollo client GrapghQL requests access server side GraphQL schemas and resolvers
var corsOptions = {
  origin: "https://anothertodoapp.netlify.app",
  credentials: true, // <-- REQUIRED backend setting for cookies
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(cookieParser());
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
  console.log(" 🚀 server lauched on launch port ");
});
app.on("listening", function () {
  console.log("ok, server is running fine 🟢");
});
