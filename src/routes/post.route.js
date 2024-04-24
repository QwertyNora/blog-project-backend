const Express = require("express");
const { createPost, getPosts } = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");

const postRouter = Express.Router();

postRouter.post("/", authMiddleware, createPost);
postRouter.get("/", getPosts);

module.exports = postRouter;
