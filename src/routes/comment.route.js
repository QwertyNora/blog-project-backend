const Express = require("express");
const {
  addComment,
  getCommentsByPost,
} = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/auth.middleware");

const commentRouter = Express.Router();

commentRouter.post("/:postId/comments", authMiddleware, addComment);
commentRouter.get("/:postId/comments", getCommentsByPost);

module.exports = commentRouter;
