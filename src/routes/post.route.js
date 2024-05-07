const Express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
} = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");

const postRouter = Express.Router();

postRouter.post("/", authMiddleware, createPost);
postRouter.delete("/:postId", authMiddleware, deletePost);
postRouter.get("/", getPosts);

module.exports = postRouter;
