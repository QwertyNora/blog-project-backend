const Post = require("../models/post.model");

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
  const { page = 1, limit = 3 } = req.query; // Default to page 1, limit 3
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by creation date, descending
      .populate("createdBy", "firstName lastName") // Only populate firstName and lastName
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Post.countDocuments(); // Total count of posts
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

module.exports = {
  createPost,
  getPosts,
};
