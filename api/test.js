const express = require("express");

const router = express.Router();

router.get("/test/test", (req, res) => {
  res.send("Connected to API test");
});