const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.userId; // from authMiddleware

  try {
    const comment = new Comment({
      content,
      createdBy: userId,
      post: postId,
    });
    await comment.save();

    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.status(201).json(comment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding comment", error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId }).populate(
      "createdBy",
      "username"
    );
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

module.exports = {
  addComment,
  getCommentsByPost,
};
