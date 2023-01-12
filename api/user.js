// MAKE SURE USER DOESN'T UPDATE OLD EMAIL TO AN EXISTING EMAIL

const express = require("express");

const router = express.Router();

const Users = require("../schemas/users");

router.get("/test/user", (req, res) => {
  res.send("Connected to API user");
});

// 4. add user information
router.patch("/user/add/:userId", async (req, res) => {
  const { userId } = req.params;
  const { bloodType, location, image } = req.body;
  await Users.updateOne({ _id: userId }, { $set: { bloodType, location, image } });
  
  res.json({
    message: "User updated",
  });
});


// 5. get user list
router.get("/user", async (req, res) => {
  const results = await Users.find(null, "username email role location bloodType status image");

  res.json({
    data: results
  });
});

// 6. user detail
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const userSpecific = await Users.findOne({ _id:  userId }, "username email role location bloodType status image");

  res.json({
    data: userSpecific,
  });
});

// 7. edit user information
router.patch("/user/:userId", async (req, res) => {
//   /$$$$$$  /$$$$$$$$ /$$   /$$
//  /$$__  $$| $$_____/| $$  /$$/
// | $$  \__/| $$      | $$ /$$/ 
// | $$      | $$$$$   | $$$$$/  
// | $$      | $$__/   | $$  $$  
// | $$    $$| $$      | $$\  $$ 
// |  $$$$$$/| $$$$$$$$| $$ \  $$
//  \______/ |________/|__/  \__/
  const { userId } = req.params;
  const { image, username, email, password, bloodType, location, status } = req.body;
  await Users.updateOne({ _id: userId }, { $set: { image, username, email, password, bloodType, location, status } });
  
  res.json({
    message: "information updated",
  });
});

// 8. change user status to inactive 
router.patch("/user/inactive/:userId", async (req, res) => {
  const { userId } = req.params;
  await Users.updateOne({ _id: userId }, { $set: { status: false } });
  
  res.json({
    message: "information updated",
  });
});

// 9. change user status to active 
router.patch("/user/active/:userId", async (req, res) => {
  const { userId } = req.params;
  await Users.updateOne({ _id: userId }, { $set: { status: true } });
  
  res.json({
    message: "information updated",
  });
});

// 10. delete user account
router.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  await Users.deleteOne({ _id: userId });
  res.json({
    message: "Account deleted",
  });
})

module.exports = router;