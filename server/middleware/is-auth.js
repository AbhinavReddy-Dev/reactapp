const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    console.log("from not authHeader");
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token == " ") {
    console.log("from not token");
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecret123");
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
