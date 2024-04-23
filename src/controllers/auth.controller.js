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

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    }).select(["+password"]);

    if (!user) {
      throw new Error("Credentials missing");
    }

    const isPasswordTheSame = await bcrypt.compare(password, user.password);
    if (!isPasswordTheSame) {
      throw new Error("Credentials missing, password is incorrect");
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
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
