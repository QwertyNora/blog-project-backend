const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      content,
      createdBy: userId,
      post: postId,
    });
    await comment.save();

    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    const populatedComment = await Comment.findById(comment._id).populate(
      "createdBy",
      "firstName lastName"
    );

    res.status(201).json(populatedComment);
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
      "firstName lastName"
    );
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user.admin) {
      console.log(user);
      return res.status(403).json({ message: "Unauthorized" });
    }

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

module.exports = {
  addComment,
  getCommentsByPost,
  deleteComment,
};
