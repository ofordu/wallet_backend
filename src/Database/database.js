const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.MONGO_URL;

// connection to the Database
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      URL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log(`successfully connceted to DB ...`.underline.cyan);
      }
    );
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;
