const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//
// Func to create tokens
//
exports.createTokens = async (user) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 300,
    }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  console.log({
    id: user._id,
    token,
    refreshToken,
  });

  return Promise.all([token, refreshToken]);
};

//
// Func to refresh tokens after expiration
//
exports.refreshTokens = async (refreshToken) => {
  try {
    const decodedToken = jwt.verify(refreshToken, process.env.TOKEN_SECRET);

    console.log("from refreshTokens", decodedToken.userId ? true : false);

    const user = await User.findById(decodedToken.userId);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 300,
      }
    );

    return token;
  } catch (err) {
    console.log(err);

    // return {};
  }
};
