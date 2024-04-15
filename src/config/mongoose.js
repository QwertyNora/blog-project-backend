const mongoose = require("mongoose");

const databaseURI = process.env.MONGODB_URI;

// Connect to the database
function connectToDatabase() {
  mongoose
    .connect(databaseURI)
    .then(() => {
      console.log("CONNECTED TO DB: ", databaseURI);
    })
    .catch((error) => {
      console.error("ERROR CONNECTING TO DB: ", databaseURI, error);
    });
}

// Mongoose connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log("Error on db connection:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected.");
});

// Close the Mongoose connection on application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log(
    "Mongoose connection is disconnected due to application termination"
  );
  process.exit(0);
});

module.exports = { connectToDatabase };
