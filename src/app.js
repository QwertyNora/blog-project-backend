const Express = require("express");
const cors = require("cors");
//TODO add routers EX: const userRouter = require("./routers/user.route.js");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Blog API is working!" });
});

module.exports = app;
