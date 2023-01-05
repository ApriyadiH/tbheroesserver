const express = require("express");
const router = express.Router();

router.get("/test/event", (req, res) => {
  res.send("Connected to API event");
});

// CRUD EVENT
// EVENT DETAILS
// GANTI STATUS APPROVAL

module.exports = router;