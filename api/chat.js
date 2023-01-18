////////////////////
// This is API for:
// 1. fetching past chat
// 2. storing chat
// User need to login to access this feature
////////////////////

// Import
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Chats = require("../schemas/chat");
const { GSConnect, GFFind, CSCreate, CFCreate, } = require("../constants");

const router = express.Router();

// Test API connection
router.get("/test/chat", (req, res) => {
  res.send(GSConnect);
});

// 26. fetch messages list
router.get("/chat", authMiddleware, async (req,res) => {
  const {userId1, userId2} = req.body;

  // Create RoomId based on 2 userId
  let roomId;
  if (userId1 > userId2){
    roomId = userId2 + "+" + userId1;
  } else if (userId1 < userId2){
    roomId = userId1 + "+" + userId2;
  };

  try {
    const results = await Chats.find( {roomId} );

    res.status(200).json({
      data: results
    });
  } catch (err) {
    res.status(400).send({
      message: GFFind
    });
  };
});

// 27. send a message
router.post("/chat", authMiddleware, async (req, res) => {
  const { roomId, userId, chat } = req.body;

  try {
    await Chats.create({
      roomId,
      userId,
      chat,
      time: Date.now() 
    });
  
    res.status(200).json({
      message: CSCreate
    });    
  } catch (err) {
    res.status(400).json({
      message: CFCreate
    });
  };
});
  
module.exports = router;