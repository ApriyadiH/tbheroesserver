const express = require("express");
const router = express.Router();

router.get("/test/register", (req, res) => {
  res.send("Connected to API register");
});

// REGISTER AJA

module.exports = router;