const express = require("express");
const router = express.Router();

router.get("/test/login", (req, res) => {
  res.send("Connected to API login");
});

// LOGIN AJA

module.exports = router;