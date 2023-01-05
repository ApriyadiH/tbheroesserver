const express = require("express");
const router = express.Router();

router.get("/test/request", (req, res) => {
  res.send("Connected to API request");
});

// CRUD REQUEST
// DETAIL REQUEST

module.exports = router;