// Initiate the server and connect to the database
require("dotenv").config();
const app = require("./app");
const { connectToDatabase } = require("./config/mongoose");
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectToDatabase();
});
