////////////////////
// This is API for:
// 1. Check user history, user past donation process.
// 2. Donor process or when volunteer want to donate their blood.
// 3. Write a review to an user who donated their blood.
// User need to login to access this feature
////////////////////

// Import
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Donors = require("../schemas/donor");
const { GSConnect, DDContent, GFFind, DSParticipate, DFParticipate, DSReview, DFReview } = require("../constants");

const router = express.Router();

// Test API connection
router.get("/test/donor", (req, res) => {
  res.send(GSConnect);
});

// 28. get connected donor list
router.get("/donor/:requestId", authMiddleware, async (req, res) => {
  const { requestId } = req.params;

  try {
    const donorList = await Donors.find({ requestId }, DDContent);
    
    const results = donorList.map(({ _id, requestId, endDate, comment, isFinish }) => ({
      donorId: _id,
      username: "user1",
      requestId,
      date: endDate,
      comment,
      isFinish
    }));
    
    res.status(200).json({
      data: results
    });
  } catch (err) {
    res.status(400).json({
      message: GFFind
    });
  };
});

// 29. Add Donor
router.post("/donor", authMiddleware, async (req, res) => {
  const { requestId, userId } = req.body;
  try {
    await Donors.create({ 
      requestId,
      userId, 
      isFinish: false
    });
  
    res.status(200).json({
      message: DSParticipate
    });
    
  } catch (err) {
    res.status(400).json({
      message: DFParticipate
    });
  };
});

// 30. post a review
router.patch("/donor/:donorId", async (req, res) => {
  const { donorId } = req.params;
  const { comment } = req.body;
  let currentDate = Date.now()

  try {
    await Donors.updateOne({ _id: donorId }, { $set: { comment, endDate: currentDate, isFinish: true } });
    
    res.status(200).json({
      message: DSReview
    });
  } catch (err) {
    res.status(400).json({
      message: DFReview
    });
  };
});

module.exports = router;