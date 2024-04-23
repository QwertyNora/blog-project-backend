//TODO add auth route
const Express = require("express");
const { registerUser } = require("../controllers/auth.controller");

const authRouter = Express.Router();

authRouter.post("/register", registerUser);

module.exports = authRouter;
