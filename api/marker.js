// BELUM SELESAI

const express = require("express");
const router = express.Router();

const Requests = require("../schemas/requests");
const Users = require("../schemas/users");

router.get("/test/marker", (req, res) => {
  res.send("Connected to API marker");
});

// 3. Fetch Marker
router.get("/marker", async (req, res) => {
  const donor = await Users.find( {status: true}, "username location bloodType status image");
  const requestTemp = await Requests.find( {status: true}, "userId location bloodType quantity status");

  const request = await Promise.all(requestTemp?.map(async (content)=>{
    const userInfo = await Users.findOne({ _id: content.userId}, "username image")
    return {
      requestId: content._id,
      image: userInfo.image,
      username: userInfo.username,
      location: content.location,
      bloodType: content.bloodType,
      status: content.status
    }
  }))

  res.json({
    donor,
    request 
  });
});

module.exports = router;