// TODO add api helpers
function registerErrorHandler(error, res, email = "") {
  let errors = {};
  if (error.message.includes("email: Path `email`")) {
    errors.email = "Email is invalid.";
  }
  if (error.message.includes("password: Path `password`")) {
    errors.password = "Password has to contain at least 8 chars.";
  }
  if (error.message.includes("duplicate key error")) {
    errors.email = `An account with email ${email} has already been registered.`;
  }
  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      errors,
    });
    return true; // Indicate that the response has been handled
  }
  return false; // Indicate that no response has been sent
}

function userErrorHandler(error, res) {
  if (error.message.includes("validation failed")) {
    return res.status(400).json({
      message: error.message,
    });
  }
  if (error.message.includes("Cast to ObjectId")) {
    console.log(error.message);
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(500).json({
    message: error.message,
  });
}

module.exports = {
  registerErrorHandler,
  userErrorHandler,
};
