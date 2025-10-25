const mongoose = require("mongoose");


const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/database");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
};


module.exports = connectMongo;
