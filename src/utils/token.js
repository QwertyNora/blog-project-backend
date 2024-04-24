const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const accesstoken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return accesstoken;
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "28d",
    }
  );
  return refreshToken;
}

function generateAccessAndRefreshToken(user) {
  return {
    access: generateAccessToken(user),
    refresh: generateRefreshToken(user),
  };
}

function verifyAccessToken(token) {
  const verifiedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return verifiedToken;
}

function verifyRefreshToken(token) {
  const verifiedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  return verifiedToken;
}

module.exports = {
  generateAccessToken,
  generateAccessAndRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
