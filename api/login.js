////////////////////
// This is API for Login
////////////////////

// Import
const express = require("express");
require("dotenv").config();
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Users = require("../schemas/user");
const { GSConnect, GPasswordRegex, LFAccount, L1Day, LFPassword, GFFormat } = require("../constants");

const router = express.Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(GPasswordRegex)).required(),
});

// Test API connection
router.get("/test/login", (req, res) => {
  res.send(GSConnect);
});

// 1. Login
router.post("/login", async (req, res) => {
  try {
    const { email: emailInitial, password } = await loginSchema.validateAsync(req.body);
    const email = emailInitial.toLowerCase();
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ 
        message: LFAccount
      });
    };

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: L1Day,
      });
      return res.status(200).json({ 
        data: {
          username: user.username,
          email: user.email,
          role: user.role,
          bloodType: user.bloodType,
          location: user.location,
          canDonate: user.canDonate,
          token: token
        }
      });
    } else {
      return res.status(400).json({ 
        message: LFPassword 
      });
    };

  } catch (err) {
    res.status(400).json({ 
      message: GFFormat
    });
  };
});

module.exports = router;