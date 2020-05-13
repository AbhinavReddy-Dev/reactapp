const jwt = require("jsonwebtoken");
// import _ from 'lodash';
// import bcrypt from "bcrypt";
const User = require("../models/user");

//
// Func to create tokens
//
module.exports = createTokens = async (user) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    "supersecret123",
    {
      expiresIn: 60 * 15,
    }
  );
  const refreshToken = jwt.sign({ userId: user._id }, "supersecret123", {
    expiresIn: new Date(Date.now() + 86400000),
  });
  console.log({
    id: user._id,
    token,
    refreshToken,
    sessionExpiration: 60 * 15,
  });

  return Promise.all([createToken, createRefreshToken]);
};

//
// Func to refresh tokens after expiration
//
module.exports = refreshTokens = async (refreshToken) => {
  try {
    const { userId } = jwt.verify(refreshToken, "supersecret123");

    const user = await User.findOne({ userId });

    const [newToken, newRefreshToken] = await createTokens(user);
    return {
      token: newToken,
      refreshToken: newRefreshToken,
      id: user._id,
      sessionExpiration: 60 * 15,
    };
  } catch (err) {
    return {};
  }
};
