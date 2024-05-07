const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId; // Set by authMiddleware after token verification

  try {
    const post = new Post({
      title,
      content,
      createdBy: userId,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating post", error: error.message });
  }
};

const getPosts = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "firstName lastName")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          model: "User",
          select: "firstName lastName",
        },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Post.countDocuments();
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user.admin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete all comments associated with the post
    await Comment.deleteMany({ post: postId });

    res
      .status(200)
      .json({ message: "Post and associated comments deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
};
