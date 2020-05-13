const jwt = require("jsonwebtoken");
const refreshTokes = require("./auth-func");

module.exports = async (req, res, next) => {
  const authHeader = req.get("authorization");
  let cookieToken = req.cookies["login"];

  console.log(authHeader);
  if (!authHeader) {
    console.log("from not authHeader");
    req.isAuth = false;
    return next();
  }
  //
  let decodedToken = authHeader.split(" ")[1];
  if (decodedToken) {
    try {
      decodedToken = jwt.verify(decodedToken, "supersecret123");
      cookieToken = jwt.verify(cookieToken, "supersecret123");
    } catch {
      let { token, refreshToken, id, sessionExpiration } = await refreshTokes(
        cookieToken
      );
      req.authorization = `Bearer ${token}`;
      req.res.cookie("login", refreshToken, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      req.isAuth = true;
      req.userId = id;
      console.log("from 1 !token && cookieToken", req.isAuth, req.userId);
      return next();
    }
  }

  if (!decodedToken || decodedToken == " " || decodedToken == undefined) {
    console.log("from not token");
    if (!decodedToken && cookieToken) {
      cookieToken = jwt.verify(cookieToken, "supersecret123");
      let { token, refreshToken, id, sessionExpiration } = await refreshTokes(
        cookieToken
      );
      req.authorization = `Bearer ${token}`;
      req.res.cookie("login", refreshToken, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      req.isAuth = true;
      req.userId = id;
      console.log("from 1 !token && cookieToken", req.isAuth, req.userId);
      return next();
    }
    req.isAuth = false;
    return next();
  }
  //
  // let decodedToken;
  try {
    cookieToken = jwt.verify(cookieToken, "supersecret123");
    // decodedToken = jwt.verify(token, "supersecret123");
  } catch (err) {
    console.log("from decodedtoken error");
    req.isAuth = false;
    return next();
  }

  //
  if (!decodedToken) {
    console.log("from not decodedtoken");
    req.isAuth = false;
    return next();
  }
  //
  if (!decodedToken && refreshToken) {
    let { token, refreshToken, id, sessionExpiration } = refreshTokes(
      cookieToken
    );
    req.authorization = `Bearer ${token}`;
    req.res.cookie("login", refreshToken, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });
    req.isAuth = true;
    req.userId = id;
    console.log("from 1 !token && cookieToken", req.isAuth, req.userId);
    return next();
  }

  console.log("from is-auth");
  console.log(req.cookies["login"]);
  req.isAuth = true;
  req.userId = decodedToken.userId;
  console.log(req.isAuth, req.userId);

  next();
};
