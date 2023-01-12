// MAKE STATUS MORE CLEAR

const express = require("express");

const Donors = require("../schemas/donors");

const router = express.Router();

router.get("/test/donor", (req, res) => {
  res.send("Connected to API donor");
});

// 28. get connected donor list
router.get("/donor/:userId", async (req, res) => {
  const { userId } = req.params;
  const fetchDonors = await Donors.find({ userId }, "requestId endDate comment status");

  const results = fetchDonors.map((content) => {
		return {
      donorId: content._id,
      requestId: content.requestId,
      date: content.endDate,
      comment: content.comment,
      status: content.status
    }
  });

  res.json({
    data: results
  });
});

// 29. Add Donor
router.post("/donor", async (req, res) => {
  const { requestId, userId } = req.body;
  const createDonor = await Donors.create({ 
    requestId,
    userId, 
    status: "on progress"
  });

  res.json({
    message: "user connected",
    data_baru: createDonor });
});

// 30. post a review
router.patch("/donor/:donorId", async (req, res) => {
  const { donorId } = req.params;
  const { comment } = req.body;
  let currentDate = Date.now()
  await Donors.updateOne({ _id: donorId }, { $set: { comment, endDate: currentDate, status: "finished" } });
  
  res.json({
    message: "commented",
  });
});

module.exports = router;