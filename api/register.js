/// STATUS BISA DIBIKIN FALSE SAMPAI SUDAH VERIFIKASI EMAIL

const express = require("express");
const Joi = require("joi");
const bcrypt = require('bcryptjs');

const Users = require("../schemas/users");

const router = express.Router();

router.get("/test/register", (req, res) => {
  res.send("Connected to API register");
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{3,20}$")).required(),
  confirmPassword: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{3,20}$")).required()
});

// 2. Register
router.post('/register', async (req, res) => {
  try {
    const user = await registerSchema.validateAsync(req.body);

    if (user.password !== user.confirmPassword) {
      return res.status(400).send({ message: "Password must match." })
    }

    const existUser = await Users.findOne({ email: user.email });

    if (existUser) {
        return res.status(400).send({ message: "There is already an account with that email. Use another email." })
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      Users.create({ 
        image: "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg",
        username: user.username, 
        email: user.email, 
        password: user.password,
        role: "user",
        status: true
      })
        .then(user => {
          res.status(201).send({ message: "Account created." })
        })
        .catch(err => {
          res.status(400).send({ message: err.message })
        });
    })
  } catch (error) {
    // console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({ message: "Data format is not valid." });
  }
});

// hanya untuk menambahkan akun admin ke db bukan untuk diterapkan ke front-end
router.post('/createAdmin', async (req, res) => {
  try {
    const user = await registerSchema.validateAsync(req.body);

    if (user.password !== user.confirmPassword) {
      return res.status(400).send({ message: "Password must match." })
    }

    const existUser = await Users.findOne({ email: user.email });

    if (existUser) {
      return res.status(400).send({ message: "There is already an account with that email. Use another email." })
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        Users.create({ 
          image: "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg",
          username: user.username, 
          email: user.email, 
          password: user.password,
          role: "admin",
          status: true
        })
          .then(user => {
            res.status(201).send({ message: "Admin Created" })
          })
          .catch(err => {
            res.status(400).send({ message: err.message })
        });
    })

    } catch (error) {
      // console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({ message: "Data format is not valid." });
    }
});

router.post('/createLog', async (req, res) => {
  try {
    const user = await registerSchema.validateAsync(req.body);

    if (user.password !== user.confirmPassword) {
      return res.status(400).send({ message: "Password must match." })
    }

    const existUser = await Users.findOne({ email: user.email });

    if (existUser) {
      return res.status(400).send({ message: "There is already an account with that email. Use another email." })
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        Users.create({ 
          image: "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg",
          username: user.username, 
          email: user.email, 
          password: user.password,
          role: "log",
          status: true
        })
          .then(user => {
            res.status(201).send({ message: "Account created." })
          })
          .catch(err => {
            res.status(400).send({ message: err.message })
        });
    })

    } catch (error) {
      // console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({ message: "Data format is not valid." });
    }
});

module.exports = router;