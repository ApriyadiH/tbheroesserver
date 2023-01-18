////////////////////
// APRI : 
// This is API for simple CRUD feature for each schemas
// this will bypass some part which will be dangerous
// Like "Users" use password encryption.
// Or "Chats" roomId use combined userId from 2 user.
// But the important part is looking through 
// database quickly without login directly to mongoDB
////////////////////

// Import Library
const express = require("express");
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Import Schemas
const Chats = require("../schemas/chat");
const Donors = require("../schemas/donor");
const Events = require("../schemas/event");
const Requests = require("../schemas/request");
const Users = require("../schemas/user");
const { GPasswordRegex } = require("../constants");

// Test connection
router.get("/schemas", (req, res) => {
  res.send("Connected to API tester schema");
});

// authMiddleware Tester
router.get("/schemas/authmiddleware", authMiddleware, (req, res) => {
  res.send("Connected to API tester schema with auth");
});
// adminMiddleware Tester
router.get("/schemas/adminmiddleware", adminMiddleware, (req, res) => {
  res.send("Connected to API tester schema with admin");
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(GPasswordRegex)).required(),
  confirmPassword: Joi.ref("password")
});

// Create Admin for database not for front-end
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
          canDonate: true
        })
          .then(user => {
            res.status(201).send({ message: "Admin Created" })
          })
          .catch(err => {
            res.status(400).send({ message: err.message })
        });
    })

    } catch (error) {
      return res.status(400).send({ message: "Data format is not valid." });
    }
});

//   /$$$$$$  /$$                   /$$             
//  /$$__  $$| $$                  | $$             
// | $$  \__/| $$$$$$$   /$$$$$$  /$$$$$$   /$$$$$$$
// | $$      | $$__  $$ |____  $$|_  $$_/  /$$_____/
// | $$      | $$  \ $$  /$$$$$$$  | $$   |  $$$$$$ 
// | $$    $$| $$  | $$ /$$__  $$  | $$ /$$\____  $$
// |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$//$$$$$$$/
//  \______/ |__/  |__/ \_______/   \___/ |_______/ 
// Create
router.post("/schemas/chats", async (req, res) => {
  const { roomId, userId, chat } = req.body;
  const createChat = await Chats.create({
    roomId,
    userId,
    chat,
    time: Date.now() 
  });

  res.json({
    message: "Chat created",
    data_baru: createChat });
});

// Read
router.get("/schemas/chats", async (req, res) => {
  const fetchChats = await Chats.find();

  const results = fetchChats.map((content) => {
		return content;
  });

  res.json({
    data: results,
  });
});

// Read Specific
router.get("/schemas/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const chatSpecific = await Chats.findOne({ _id: chatId});

  res.json({
    data: chatSpecific,
  });
});

// Update
router.patch("/schemas/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const { roomId, userId, chat } = req.body;
  await Chats.updateOne({ _id: chatId }, { $set: { roomId, userId, chat } });
  
  res.json({
    message: "Chat updated",
  });
});

// Delete
router.delete("/schemas/chats/:chatId", async (req, res) => {
  const { chatId } = req.params;

  await Chats.deleteOne({ _id: chatId });
  res.json({
    message: "Chat deleted",
  });
})

//  /$$$$$$$                                                   
// | $$__  $$                                                  
// | $$  \ $$  /$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$
// | $$  | $$ /$$__  $$| $$__  $$ /$$__  $$ /$$__  $$ /$$_____/
// | $$  | $$| $$  \ $$| $$  \ $$| $$  \ $$| $$  \__/|  $$$$$$ 
// | $$  | $$| $$  | $$| $$  | $$| $$  | $$| $$       \____  $$
// | $$$$$$$/|  $$$$$$/| $$  | $$|  $$$$$$/| $$       /$$$$$$$/
// |_______/  \______/ |__/  |__/ \______/ |__/      |_______/ 
// Create
router.post("/schemas/donors", async (req, res) => {
  const { requestId, userId, comment, status } = req.body;
  const createDonor = await Donors.create({
    requestId, 
    userId, 
    endDate: Date.now(),
    comment, 
    status
  });

  res.json({
    message: "Donor created",
    data_baru: createDonor });
});

// Read
router.get("/schemas/donors", async (req, res) => {
  const fetchDonors = await Donors.find();

  const results = fetchDonors.map((content) => {
		return content;
  });

  res.json({
    data: results,
  });
});

// Read Specific
router.get("/schemas/donors/:donorId", async (req, res) => {
  const { donorId } = req.params;
  const donorSpecific = await Donors.findOne({ _id:  donorId });

  res.json({
    data: donorSpecific,
  });
});

// Update
router.patch("/schemas/donors/:donorId", async (req, res) => {
  const { donorId } = req.params;
  const { requestId, userId, comment, status } = req.body;
  await Donors.updateOne({ _id: donorId }, { $set: { requestId, userId, comment, status } });
  
  res.json({
    message: "Donor updated",
  });
});

// Delete
router.delete("/schemas/donors/:donorId", async (req, res) => {
  const { donorId } = req.params;

  await Donors.deleteOne({ _id: donorId });
  res.json({
    message: "Donor deleted",
  });
})

//  /$$$$$$$$                              /$$             
// | $$_____/                             | $$             
// | $$    /$$    /$$ /$$$$$$  /$$$$$$$  /$$$$$$   /$$$$$$$
// | $$$$$|  $$  /$$//$$__  $$| $$__  $$|_  $$_/  /$$_____/
// | $$__/ \  $$/$$/| $$$$$$$$| $$  \ $$  | $$   |  $$$$$$ 
// | $$     \  $$$/ | $$_____/| $$  | $$  | $$ /$$\____  $$
// | $$$$$$$$\  $/  |  $$$$$$$| $$  | $$  |  $$$$//$$$$$$$/
// |________/ \_/    \_______/|__/  |__/   \___/ |_______/
// Create
router.post("/schemas/events", async (req, res) => {
  const { userId, name, location, status } = req.body;
  const createEvent = await Events.create({
    userId, 
    name, 
    date : Date.now(), 
    location, 
    status
  });

  res.json({
    message: "Event created",
    data_baru: createEvent });
});

// Read
router.get("/schemas/events", async (req, res) => {
  const fetchEvents = await Events.find();

  const results = fetchEvents.map((content) => {
		return content;
  });

  res.json({
    data: results,
  });
});

// Read Specific
router.get("/schemas/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const EventSpecific = await Events.findOne({ _id:  eventId });

  res.json({
    data: EventSpecific,
  });
});

// Update
router.patch("/schemas/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { name, date, location, status } = req.body;
  await Events.updateOne({ _id: eventId }, { $set: { name, date, location, status } });
  
  res.json({
    message: "Event updated",
  });
});

// Delete
router.delete("/schemas/events/:eventId", async (req, res) => {
  const { eventId } = req.params;

  await Events.deleteOne({ _id: eventId });
  res.json({
    message: "Event deleted",
  });
})


//  /$$$$$$$                                                      /$$             
// | $$__  $$                                                    | $$             
// | $$  \ $$  /$$$$$$   /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$$ /$$$$$$   /$$$$$$$
// | $$$$$$$/ /$$__  $$ /$$__  $$| $$  | $$ /$$__  $$ /$$_____/|_  $$_/  /$$_____/
// | $$__  $$| $$$$$$$$| $$  \ $$| $$  | $$| $$$$$$$$|  $$$$$$   | $$   |  $$$$$$ 
// | $$  \ $$| $$_____/| $$  | $$| $$  | $$| $$_____/ \____  $$  | $$ /$$\____  $$
// | $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$/|  $$$$$$$ /$$$$$$$/  |  $$$$//$$$$$$$/
// |__/  |__/ \_______/ \____  $$ \______/  \_______/|_______/    \___/ |_______/ 
//                           | $$                                                 
//                           | $$                                                 
//                           |__/ 
// Create
router.post("/schemas/requests", async (req, res) => {
  const { userId, location, bloodType, quantity } = req.body;
  const createRequest = await Requests.create({
    userId, 
    location, 
    bloodType,
    quantity,
    status: true
  });

  res.json({
    message: "Request created",
    data_baru: createRequest });
});

// Read
router.get("/schemas/requests", async (req, res) => {
  const fetchRequests = await Requests.find();

  const results = fetchRequests.map((content) => {
		return content;
  });

  res.json({
    data: results,
  });
});

// Read Specific
router.get("/schemas/requests/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const RequestSpecific = await Requests.findOne({ _id:  requestId });

  res.json({
    data: RequestSpecific,
  });
});

// Update
router.patch("/schemas/requests/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { userId, location, bloodType, quantity, status } = req.body;
  await Requests.updateOne({ _id: requestId }, { $set: { userId, location, bloodType, quantity, status } });
  
  res.json({
    message: "Request updated",
  });
});

// Delete
router.delete("/schemas/requests/:requestId", async (req, res) => {
  const { requestId } = req.params;

  await Requests.deleteOne({ _id: requestId });
  res.json({
    message: "Request deleted",
  });
})

//  /$$   /$$                                        
// | $$  | $$                                        
// | $$  | $$  /$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$$
// | $$  | $$ /$$_____/ /$$__  $$ /$$__  $$ /$$_____/
// | $$  | $$|  $$$$$$ | $$$$$$$$| $$  \__/|  $$$$$$ 
// | $$  | $$ \____  $$| $$_____/| $$       \____  $$
// |  $$$$$$/ /$$$$$$$/|  $$$$$$$| $$       /$$$$$$$/
//  \______/ |_______/  \_______/|__/      |_______/ 
// Create
router.post("/schemas/users", async (req, res) => {
  const { username, email, password, role, bloodType, location, status } = req.body;
  const createUser = await Users.create({
    username,
    email,
    password,
    role,
    bloodType,
    location,
    status
  });

  res.json({
    message: "User created",
    data_baru: createUser });
});

// Read
router.get("/schemas/users", async (req, res) => {
  const fetchUsers = await Users.find();

  const results = fetchUsers.map((content) => {
		return content;
  });

  res.json({
    data: results,
  });
});

// Read Specific
router.get("/schemas/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const userSpecific = await Users.findOne({ _id:  userId });

  res.json({
    data: userSpecific,
  });
});

// Update
router.patch("/schemas/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, role, bloodType, location, status } = req.body;
  await Users.updateOne({ _id: userId }, { $set: { username, email, password, role, bloodType, location, status } });
  
  res.json({
    message: "User updated",
  });
});

// Delete
router.delete("/schemas/users/:userId", async (req, res) => {
  const { userId } = req.params;

  await Users.deleteOne({ _id: userId });
  res.json({
    message: "User deleted",
  });
})

module.exports = router;