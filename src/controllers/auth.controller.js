const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const { registerErrorHandler } = require("../utils/helpers/apiHelpers");
const {
  generateAccessAndRefreshToken,
  verifyRefreshToken,
  generateAccessToken,
} = require("../utils/token");

async function registerUser(req, res) {
  const _user = req.body;
  try {
    const user = await User.create(_user);
    const userObject = user.toObject(); // Convert Mongoose model instance to plain JavaScript object
    delete userObject.password; // Remove password property for security

    const tokens = generateAccessAndRefreshToken(user);

    res.status(201).json({
      user: {
        username: userObject.username,
        fullName: userObject.fullName,
        email: userObject.email,
        admin: userObject.admin,
      },
      tokens,
    });
  } catch (error) {
    const handled = registerErrorHandler(error, res, _user?.email);
    if (handled) return; // Stop further execution if error is handled
    res.status(500).json({
      message: error.message,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password"); // Ensure to select the admin field if it's not selected by default

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordTheSame = await bcrypt.compare(password, user.password);
    if (!isPasswordTheSame) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokens = generateAccessAndRefreshToken(user);
    res.json({
      tokens,
      user: {
        id: user._id,
        username: user.username,
        admin: user.admin, // Include the admin status
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
};

// // TODO setup auth controllers
// const User = require("../models/user.model");

// async function registerUser(req, res) {
//   const _user = req.body;
//   try {
//     const user = await User.create(_user);
//     res.status(201).send(user);
//   } catch (error) {
//     throw new Error("Error occured: " + error.message + error);
//   }
// }

// module.exports = {
//   registerUser,
// };
