const express = require("express");
const router = express.Router();

router.get("/test/donor", (req, res) => {
  res.send("Connected to API donor");
});

// TAMBAH DONOR
// DAPAT LIST
// TAMBAH REVIEW

module.exports = router;