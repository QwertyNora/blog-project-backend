const User = require("../models/user.model");

async function registerUser(req, res) {
  const _user = req.body;
  try {
    const user = await User.create(_user);
    const userObject = user.toObject();
    userObject.fullName = user.fullName;
    res.status(201).send({
      username: userObject.username,
      fullName: userObject.fullName,
      email: userObject.email,
      fullname: userObject.fullName,
    });
  } catch (error) {
    res.status(400).send({ message: "Error occurred: " + error.message });
  }
}

module.exports = {
  registerUser,
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
