const Express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Blog API is working!" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/posts", commentRouter);
module.exports = app;
