const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const mongodbURl = process.env.MONGO_URI




const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURl, {
     
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};


module.exports = connectDB;
