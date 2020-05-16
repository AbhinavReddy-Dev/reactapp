const jwt = require("jsonwebtoken");
const User = require("../models/user");

//
// Func to create tokens
//
exports.createTokens = async (user) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    "supersecret123",
    {
      expiresIn: 300,
    }
  );
  const refreshToken = jwt.sign({ userId: user._id }, "supersecret123", {
    expiresIn: "7d",
  });
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
    const decodedToken = jwt.verify(refreshToken, "supersecret123");

    console.log("from refreshTokens", decodedToken.userId);

    const user = await User.findById(decodedToken.userId);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "supersecret123",
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
