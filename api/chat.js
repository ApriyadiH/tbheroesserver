////////////////////
// This is API for:
// 1. fetching past chat
// 2. storing chat
// User need to login to access this feature
////////////////////

// Import
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { GSConnect, GFFind, CSCreate, CFCreate, } = require("../constants");
const Chats = require("../schemas/chat");
const Users = require("../schemas/user");

const router = express.Router();

// Test API connection
router.get("/test/chat", (req, res) => {
  res.send(GSConnect);
});

// 26. fetch messages list ?????? NO LONGER USED
// router.get("/chat", authMiddleware, async (req,res) => {
//   const {userId1, userId2} = req.body;

//   // Create RoomId based on 2 userId
//   let roomId;
//   if (userId1 > userId2){
//     roomId = userId2 + "+" + userId1;
//   } else if (userId1 < userId2){
//     roomId = userId1 + "+" + userId2;
//   };

//   try {
//     const results = await Chats.find( {roomId} );

//     res.status(200).json({
//       data: results
//     });
//   } catch (err) {
//     res.status(400).send({
//       message: GFFind
//     });
//   };
// });

// 26.1 fetch Chat room with userId
router.get("/chat/room/:userId", authMiddleware, async (req,res) => {
  const { userId } = req.params;

  try {
    const chatroom = await Chats.distinct('roomId', {roomId: {$regex: userId}});

    const results = await Promise.all(chatroom.map(async (content)=>{
      if (content.split("+")[0] === userId){
        const { username, image } = await Users.findOne({ _id: content.split("+")[1]})
        return ({
          roomId:content,
          username,
          image
        })
      } else {
        const { username, image } = await Users.findOne({ _id: content.split("+")[0]})
        return ({
          roomId:content,
          username,
          image
        })
      }
    }))
  
    res.status(200).json({
      data: results
    });
  } catch (err) {
    res.status(400).send({
      message: GFFind
    });
  };
});

// 26.2 Fetch message list from chat room
router.get("/chat/:roomId", authMiddleware, async (req,res) => {
  const { roomId } = req.params;

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