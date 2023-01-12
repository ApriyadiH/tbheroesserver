// MAKE SURE THE STATUS WILL BECOME DONE IF QUANTITY REACH 0
// CHANGE STATUS TO ISDONE

const express = require("express");

const router = express.Router();

const Requests = require("../schemas/requests");
const Users = require("../schemas/users");

router.get("/test/request", (req, res) => {
  res.send("Connected to API request");
});

// 19. get request list
router.get("/request", async (req, res) => {
  const requestTemp = await Requests.find( {status: true}, "userId location bloodType quantity status");

  const request = await Promise.all(requestTemp?.map(async (content)=>{
    const userInfo = await Users.findOne({ _id: content.userId}, "username image")
    return {
      requestId: content._id,
      image: userInfo.image,
      username: userInfo.username,
      location: content.location,
      bloodType: content.bloodType,
      quantity: content.quantity,
      status: content.status
    }
  }))

  res.json({
    data: request,
  });
});

// 20. get request details
router.get("/request/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const RequestSpecific = await Requests.findOne({ _id:  requestId }, "userId location bloodType quantity status");
  
  const userInfo = await Users.findOne ({ _id: RequestSpecific.userId}, "username image")

  const results = {
    _id: RequestSpecific._id,
    userId: RequestSpecific.userId,
    username: userInfo.username,
    image: userInfo.image,
    location: RequestSpecific.location,
    bloodType: RequestSpecific.bloodType,
    quantity: RequestSpecific.quantity,
    status: RequestSpecific.status,
  }

  res.json({
    data: results,
  });
});


// 21. add a request
router.post("/request", async (req, res) => {
  const { userId, location, bloodType, quantity } = req.body;
  const createRequest = await Requests.create({
    userId, 
    location, 
    bloodType,
    quantity,
    status: true
  });

  res.json({
    message: "Request added",
    data_baru: createRequest });
});

// 22. edit a request
router.patch("/request/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { userId, location, bloodType, quantity } = req.body;
  await Requests.updateOne({ _id: requestId }, { $set: { userId, location, bloodType, quantity, status: true } });
  
  res.json({
    message: "Request changed",
  });
});

// 23. reduce quantity
router.patch("/request/donated/:requestId", async (req, res) => {
//    /$$$$$$  /$$$$$$$$ /$$   /$$
//   /$$__  $$| $$_____/| $$  /$$/
//  | $$  \__/| $$      | $$ /$$/ 
//  | $$      | $$$$$   | $$$$$/  
//  | $$      | $$__/   | $$  $$  
//  | $$    $$| $$      | $$\  $$ 
//  |  $$$$$$/| $$$$$$$$| $$ \  $$
//   \______/ |________/|__/  \__/
  const { requestId } = req.params;
  const currentQuantity = await Requests.findOne({ _id:  requestId }, "quantity");
  await Requests.updateOne({ _id: requestId }, { $set: { quantity: currentQuantity.quantity-1 } });
  
  res.json({
    message: "Request changed",
  });
});

// 24. request fulfilled
router.patch("/request/done/:requestId", async (req, res) => {
  const { requestId } = req.params;
  await Requests.updateOne({ _id: requestId }, { $set: { quantity: 0, status: false } });
  
  res.json({
    message: "Request changed",
  });
});

// 25. delete a request 
router.delete("/request/:requestId", async (req, res) => {
  const { requestId } = req.params;

  await Requests.deleteOne({ _id: requestId });
  res.json({
    message: "Request deleted",
  });
})


module.exports = router;