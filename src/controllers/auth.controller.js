// TODO setup auth controllers
const User = require("../models/user.model");

async function registerUser(req, res) {
  const _user = req.body;
  try {
    const user = await User.create(_user);
    res.status(201).send(user);
  } catch (error) {
    throw new Error("Error occured: " + error.message + error);
  }
}

module.exports = {
  registerUser,
};
