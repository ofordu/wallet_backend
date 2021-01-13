// Setting up express
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./Database/database");
const colors = require("colors");
const path = require("path");
const errorHandler = require("./middlewares/error");
const walletRouter = require("./routes/walletRouter");
const fileUpload = require("express-fileupload");

// Initializing Express Framework
const app = express();

// Invoke connection to database
connectDB();

// Setting up file upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// integrating cors with our app
app.use(cors());

// integrating morgan with our app
app.use(morgan("dev"));

// integrating body-parser with our app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// initializing our routes with our app
app.use(walletRouter);

// custom error middleware
app.use(errorHandler);

// Setting Port
PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
