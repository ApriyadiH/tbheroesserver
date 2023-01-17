const express = require("express");

const router = express.Router();

// const adminMiddleware = require("../middlewares/adminMiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");

router.get("/test/test", (req, res) => {
  res.send("Connected to API test");
});

// // authMiddleware Tester
// router.get("/schemas/authmiddleware", authMiddleware, (req, res) => {
//   res.send("Connected to API tester schema with auth");
// });
// // adminMiddleware Tester
// router.get("/schemas/adminmiddleware", adminMiddleware, (req, res) => {
//   res.send("Connected to API tester schema with admin");
// });

module.exports = router;