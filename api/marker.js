const express = require("express");
const router = express.Router();

router.get("/test/marker", (req, res) => {
  res.send("Connected to API marker");
});

// Fetch Marker

module.exports = router;