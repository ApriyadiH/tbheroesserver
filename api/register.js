////////////////////
// This is API for creating a new account
////////////////////

/// STATUS BISA DIBIKIN FALSE SAMPAI SUDAH VERIFIKASI EMAIL

const express = require("express");
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const Users = require("../schemas/user");
const { GSConnect, GPasswordRegex, RFPasswordMatch, RFUserExist, RDefaultImage, RUser, GFFormat, RSCreate } = require("../constants");

const router = express.Router();

router.get("/test/register", (req, res) => {
  res.send(GSConnect);
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(GPasswordRegex)).required(),
  confirmPassword: Joi.ref("password")
});

// 2. Register
router.post("/register", async (req, res) => {
  try {
    const { username, email: emailInitial, password, confirmPassword } = await registerSchema.validateAsync(req.body);

    const email = emailInitial.toLowerCase();

    const userExist = await Users.findOne({ email });

    if (userExist) {
        return res.status(400).json({ message: RFUserExist })
    };

    bcrypt.hash(password, 10, (err, hash) => {
      Users.create({ 
        image: RDefaultImage ,
        username, 
        email,
        password: hash,
        role: RUser,
        canDonate: false
      })
        .then(() => {
          res.status(201).json({ message: RSCreate })
        })
        .catch(err => {
          res.status(400).json({ message: err.message })
        });
    })
  } catch (err) {
    return res.status(400).json({ message: GFFormat });
  }
});


module.exports = router;