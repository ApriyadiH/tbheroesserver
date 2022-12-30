const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Tersambung ke api/routes");
});

module.exports = router;