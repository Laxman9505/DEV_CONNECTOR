const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//connect db
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("mongo db connected");
  } catch (error) {
    console.error(error.message);
    //exit the process
    process.exit(1);
  }
};

module.exports = connectDB;
