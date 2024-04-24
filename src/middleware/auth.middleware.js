const { verifyAccessToken } = require("../utils/token");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization") || "";
  const accessToken = token.split(" ")?.[1] || "";

  if (!accessToken) {
    return res.status(401).json({ message: "User not authorized!" });
  }

  try {
    const verifiedToken = verifyAccessToken(accessToken);
    req.userId = verifiedToken.userId;
    return next();
  } catch (error) {
    res.status(401).json({
      message: "User not authorized",
    });
  }
}

module.exports = authMiddleware;
