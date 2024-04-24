const User = require("../models/user.model");
const { userErrorHandler } = require("../utils/helpers/apiHelpers");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    userErrorHandler(error, res);
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Cast to ObjectId");
    }
    res.json(user);
  } catch (error) {
    authorErrorHandler(error, res);
  }
}

module.exports = { getUsers, getUser };
