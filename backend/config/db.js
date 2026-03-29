const mongoose = require("mongoose");

const uri =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

module.exports = mongoose;
