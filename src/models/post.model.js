const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
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
  "fuck",
];

postSchema.pre("save", function (next) {
  const regex = new RegExp(inappropriateWords.join("|"), "gi");
  this.title = this.title.replace(regex, "***");
  this.content = this.content.replace(regex, "***");
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
