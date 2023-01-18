////////////////////
// This is API for:
// 1. User CRUD
// 2. Add user information
// 3. Change canDonate status
// Some are accessible for guest, some need login
// Admin will manage users
////////////////////

// MAKE SURE USER DOESN'T UPDATE OLD EMAIL TO AN EXISTING EMAIL

// import
const express = require("express");
const Joi = require("joi");
const authMiddleware = require("../middlewares/authMiddleware");
const Users = require("../schemas/user");
const { GSConnect, USUpdate, GFUpdate, UDContent, GFFind, USDelete, GFDelete, GPasswordRegex, RFPasswordMatch, RFUserExist } = require("../constants");

const editUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(GPasswordRegex)).required(),
  confirmPassword: Joi.ref("password")
})


const router = express.Router();

// Test API connection
router.get("/test/user", (req, res) => {
  res.send(GSConnect);
});

// 4. add user information
router.patch("/user/add/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { bloodType, location, image, canDonate } = req.body;

  try {
    await Users.updateOne({ _id: userId }, { $set: { bloodType, location, image, canDonate } });
    
    res.status(200).json({
      message: USUpdate,
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate,
    });
  };
});


// 5. get user list
router.get("/user", async (req, res) => {

  try {
    const results = await Users.find(null, UDContent);

    res.status(200).json({
      data: results
    });
  } catch (err) {
    res.status(400).json({
      message: GFFind
    });
  };
});

// 6. user detail
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userSpecific = await Users.findOne({ _id:  userId }, UDContent);
  
    res.status(200).json({
      data: userSpecific
    });
  } catch (err) {
    res.status(400).json({
      data: GFFind
    });
  };
});

// 7. edit user information
router.patch("/user/:userId", authMiddleware, async (req, res) => {
//    /$$$$$$  /$$$$$$$$ /$$   /$$
//   /$$__  $$| $$_____/| $$  /$$/
//  | $$  \__/| $$      | $$ /$$/ 
//  | $$      | $$$$$   | $$$$$/  
//  | $$      | $$__/   | $$  $$  
//  | $$    $$| $$      | $$\  $$ 
//  |  $$$$$$/| $$$$$$$$| $$ \  $$
//   \______/ |________/|__/  \__/
// Harus dipecah jadi edit password, edit username/email, edit image, bloodtype, location, can Donate
  const { userId } = req.params;
  try {
    const { image, bloodType, location } = req.body;
    const { username, email: emailInitial, password, confirmPassword } = await editUserSchema.validateAsync(req.body);

    const email = emailInitial.toLowerCase();

    // Check if user use unregistered email.
    const userExist = await Users.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: RFUserExist })
    };

    bcrypt.hash(password, 10, (err, hash) => {
      Users.updateOne({ _id: userId }, { $set: { image, username, email, password: hash, bloodType, location } })
        .then(() => {
          res.status(201).json({ message: USUpdate })
        })
        .catch(err => {
          res.status(400).json({ message: err.message })
        });
    })
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 8. change user status to can't donate
router.patch("/user/inactive/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  
  try{
    await Users.updateOne({ _id: userId }, { $set: { canDonate: false } });
    
    res.status(200).json({
      message: USUpdate
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 9. change user status to can donate
router.patch("/user/active/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try{
    await Users.updateOne({ _id: userId }, { $set: { canDonate: true } });
    
    res.status(200).json({
      message: USUpdate
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 10. delete user account
router.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await Users.deleteOne({ _id: userId });

    res.status(200).json({
      message: USDelete
    });
  } catch (err) {
    res.status(400).json({
      message: GFDelete
    });
  }
})

module.exports = router;