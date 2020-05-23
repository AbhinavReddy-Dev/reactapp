const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const graphqlHTTP = require("express-graphql");
const todos_schema = require("./graphql/todos");
const cors = require("cors");
const app = express();
const isAuth = require("./middleware/is-auth");
const path = require("path");
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
  // origin: "https://anothertodoapp.netlify.app",
  // origin: "http://localhost:3000",
  credentials: true, // <-- REQUIRED backend setting for cookies
};
app.set("trust proxy", 1);
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

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}
// Express listening on a port to run server side
app.listen(process.env.PORT, () => {
  console.log(" 🚀 server lauched on launch port " + process.env.PORT);
});
app.on("listening", function () {
  console.log("ok, server is running fine 🟢");
});
