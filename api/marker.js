////////////////////
// This is API for fetching marker
////////////////////

// BELUM SELESAI CEK ULANG

// Import
const express = require("express");
const Requests = require("../schemas/request");
const Users = require("../schemas/user");
const { GSConnect, GFFind, MDContentUser, MDContentRequest, R2DContent2 } = require("../constants");

const router = express.Router();

// Test API connection
router.get("/test/marker", (req, res) => {
  res.send(GSConnect);
});

// 3. Fetch Marker
router.get("/marker", async (req, res) => {

  try {
    const donor = await Users.find( {canDonate: true}, MDContentUser);
    const requestTemp = await Requests.find( {isDone: false}, MDContentRequest);
    
    const request = await Promise.all(requestTemp?.map(async ( {_id, userId, location, bloodType, quantity, isDone} )=>{
      const userInfo = await Users.findOne({ _id: userId}, R2DContent2)
      return {
        requestId: _id,
        image: userInfo.image,
        username: userInfo.username,
        location,
        bloodType,
        quantity,
        isDone
      };
    }));

    res.status(200).json({
      donor,
      request 
    });
  } catch (err) {
    res.status(200).json({
      message: GFFind
    });
  }
});

module.exports = router;