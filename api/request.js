////////////////////
// This is API for:
// 1. Request CRUD
// 2. Change the quantity
// User need to login to access this feature
// Admin can manage request
////////////////////

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
// const adminMiddleware = require("../middlewares/adminMiddleware");
const Requests = require("../schemas/request");
const Users = require("../schemas/user");
const { GSConnect, R2DContent, GFFind, R2DContent2, R2SCreate, R2FCreate, GFUpdate, R2SUpdate, GFDelete, R2SDelete, R2DQuantity, R2FZeroLess } = require("../constants");

const router = express.Router();

// Test API connection
router.get("/test/request", (req, res) => {
  res.send(GSConnect);
});

// 19. get request list
router.get("/request", async (req, res) => {
  try {
    const requestTemp = await Requests.find( null, R2DContent);
    const request = await Promise.all(requestTemp?.map(async ( { _id: requestId, userId, location, bloodType, quantity, isDone} )=>{
      const {image, username} = await Users.findOne({ _id: userId}, R2DContent2);
      return ({
        requestId,
        userId,
        image,
        username,
        location,
        bloodType,
        quantity,
        isDone
      });
    }));
    
    res.status(200).json({
      data: request
    });
  } catch (err) {
    res.status(400).json({
      message: GFFind
    });
  };
});

// 20. get request details
router.get("/request/:requestId", authMiddleware, async (req, res) => {
  const { requestId } = req.params;

  try {
    const { userId, location, bloodType, quantity, isDone } = await Requests.findOne({ _id:  requestId }, R2DContent);
    const { username, image } = await Users.findOne ({ _id: userId}, R2DContent2)
    const results = {
      requestId,
      userId,
      image, 
      username,
      location,
      bloodType,
      quantity,
      isDone, 
    }
    res.status(200).json({
      data: results,
    });
  } catch (err) {
    res.status(400).json({
      message: GFFind
    });
  };
});

// 21. add a request
router.post("/request", authMiddleware, async (req, res) => {
  const { userId, location, bloodType, quantity } = req.body;

  if ( quantity <= 0) {
    return res.status(200).json({
      message: R2FZeroLess 
    });
  };

  try {
    await Requests.create({
      userId, 
      location, 
      bloodType,
      quantity,
      isDone: false
    });
  
    res.status(200).json({
      message: R2SCreate 
    });
  } catch (err) {
    res.status(400).json({
      message: R2FCreate 
    });
  };
});

// 22. edit a request
router.patch("/request/:requestId", authMiddleware, async (req, res) => {
  const { requestId } = req.params;
  const { location, bloodType, quantity } = req.body;

  if ( quantity <= 0) {
    return res.status(200).json({
      message: R2FZeroLess 
    });
  };

  try {
    await Requests.updateOne({ _id: requestId }, { $set: { location, bloodType, quantity, isDone: false } });
    
    res.status(200).json({
      message: R2SUpdate
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 23. reduce quantity
router.patch("/request/donated/:requestId", async (req, res) => {
  const { requestId } = req.params;

  try {
    const {quantity} = await Requests.findOne({ _id:  requestId }, R2DQuantity);
    const finalQuantity = quantity-1

    if (finalQuantity <= 0){
      await Requests.updateOne({ _id: requestId }, { $set: { quantity: 0, isDone: true } });
    } else {
      await Requests.updateOne({ _id: requestId }, { $set: { quantity: finalQuantity } });
    };
    
    res.status(200).json({
      message: R2SUpdate
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 24. request fulfilled
router.patch("/request/done/:requestId", async (req, res) => {
  const { requestId } = req.params;

  try {
    await Requests.updateOne({ _id: requestId }, { $set: { quantity: 0, isDone: true } });
    
    res.status(200).json({
      message: R2SUpdate
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 25. delete a request 
router.delete("/request/:requestId", authMiddleware, async (req, res) => {
  const { requestId } = req.params;

  try {
    await Requests.deleteOne({ _id: requestId });
    
    res.status(200).json({
      message: R2SDelete
    });
  } catch (err) {
    res.status(400).json({
      message: GFDelete
    });
  };
});

module.exports = router;