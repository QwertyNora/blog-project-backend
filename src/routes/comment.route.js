const Express = require("express");
const {
  addComment,
  getCommentsByPost,
  deleteComment,
} = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/auth.middleware");

const commentRouter = Express.Router();

commentRouter.post("/:postId/comments", authMiddleware, addComment);
commentRouter.get("/:postId/comments", getCommentsByPost);
commentRouter.delete(
  "/:postId/comments/:commentId",
  authMiddleware,
  deleteComment
);

module.exports = commentRouter;
