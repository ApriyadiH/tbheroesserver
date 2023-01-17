// Import library
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import file lain
const router = require("./api/");
const library = require("./lib/");

// Connecting to schemas
const connect = require("./schemas");
connect();

// Declare Variable
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connection tester
app.get("/", (req, res) => {
  res.send("Welcome to The Blood Heroes Server");
});


const adminMiddleware = require("./middlewares/adminMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");

// authMiddleware Tester
app.get("/schemas/authmiddleware", authMiddleware, (res) => {
  res.send("Connected to API tester schema with auth");
});

// // adminMiddleware Tester
app.get("/schemas/adminmiddleware", adminMiddleware, (req, res) => {
  res.send("Connected to API tester schema with admin");
});

// Connecting to API
app.use("/", router);

// Connecting to library
app.use("/", library);

app.listen(port, () => {
  console.log("Server running on",port);
});
