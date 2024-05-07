const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const inappropriateWords = [
  "banan",
  "fan",
  "helvete",
  "skit",
  "jävlar",
  "satan",
];

commentSchema.pre("save", function (next) {
  const regex = new RegExp(inappropriateWords.join("|"), "gi");
  this.content = this.content.replace(regex, "***");
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
