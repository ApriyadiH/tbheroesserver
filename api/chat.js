////////////////////
// APRI : 
// This is API for chat box
// User need to login to access this feature
////////////////////

// Import library
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();

const Chats = require("../schemas/chats");

router.get("/test/chat", authMiddleware, (req, res) => {
  res.send("Connected to API chat");
});

// 26. fetch messages list
router.get("/chat", async (req,res) => {
  const {userId1, userId2} = req.body;
  let roomId
  if (userId1 > userId2){
    roomId = userId2 + "+" + userId1;
  } else if (userId1 < userId2){
    roomId = userId1 + "+" + userId2;
  }

  const fetchChats = await Chats.find( {roomId : roomId} );

  const results = fetchChats.map((content) => {
    return content;
  });

  res.json({
    data: results,
  });
});

// 27. send a message
router.post("/chat", async (req, res) => {
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

module.exports = router;