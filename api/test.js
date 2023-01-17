const express = require("express");

const router = express.Router();

// const adminMiddleware = require("../middlewares/adminMiddleware");
// const authMiddleware = require("./middlewares/authMiddleware");

router.get("/test/test", (req, res) => {
  res.send("Connected to API test");
});

module.exports = router;