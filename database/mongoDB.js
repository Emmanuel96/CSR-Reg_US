const mongoose = require("mongoose");

const url =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.DATABASE_URL;



console.log("Connecting to mongodb...");
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
