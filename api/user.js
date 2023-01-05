const express = require("express");
const router = express.Router();

router.get("/test/user", (req, res) => {
  res.send("Connected to API user");
});

// CRUD
// user detail
// Ganti status

module.exports = router;