const express = require("express");
const router = express.Router();

router.get("/test/chat", (req, res) => {
  res.send("Connected to API chat");
});

// FETCH CHAT
// POST CHAT

module.exports = router;