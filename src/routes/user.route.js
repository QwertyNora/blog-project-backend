const Express = require("express");
const { getUsers, getUser } = require("../controllers/user.controller");

const userRouter = Express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

module.exports = userRouter;
