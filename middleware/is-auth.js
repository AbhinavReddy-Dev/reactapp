const jwt = require("jsonwebtoken");
const { refreshTokens } = require("./auth-func");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  var authtoken = authHeader.split(" ");

  if (authtoken.length < 2) {
    console.log("no Authheader token");
  }
  authtoken = authtoken[1];

  console.log("Authheader token", authHeader ? true : false);

  // Checking cookie to generate new token for the clientside js memory variable everytime a new request is made to make it feel like the user is logged in

  console.log("cookie token", req.cookies["login"] ? true : false);
  console.log(req.path);
  if (req.cookies["login"]) {
    var cookieToken = req.cookies["login"];
    var token = await refreshTokens(cookieToken);
    console.log("new token because of cookies");
    res.set("Access-Control-Expose-Headers", "x-token");
    res.set("x-token", token);
    cookieToken = jwt.verify(cookieToken, process.env.TOKEN_SECRET);
    req.isAuth = true;
    req.userId = cookieToken.userId;
    return next();
  }
  if (req.cookies["login"] == undefined || req.cookies["login"] === " ") {
    req.isAuth = false;
    return next();
  }
  //
  if (!authHeader) {
    console.log("from not authHeader");
    req.isAuth = false;
    return next();
  }
  if (!authtoken || authtoken == " ") {
    console.log("from not token");
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(authtoken, "supersecret123");
  } catch (err) {
    console.log("from decodedtoken error");
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    console.log("from not decodedtoken");
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
