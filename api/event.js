////////////////////
// This is API for:
// 1. Event poster CRUD
// 2. Event poster detail
// 3. Changing Event poster status (pending, approved, rejected)
// Some are accessible for guest some need login
// Admin will manage the approval process
////////////////////

/// MAKE CUSTOMIZEABLE DATE

// Import 
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const Events = require("../schemas/event");
const { GSConnect, EDContent, GFFind, ESCreate, EFCreate, Approved, ESStatus, GFUpdate, Pending, Rejected, ESUpdate, ESDelete, GFDelete } = require("../constants");

const router = express.Router();

// Test API connection
router.get("/test/event", (req, res) => {
  res.send(GSConnect);
});

// 11. fetch event list
router.get("/event", async (req, res) => {
  try {
    const results = await Events.find(null, EDContent);
    res.status(200).json({
      data: results
    });
  } catch (err) {
    res.status(400).json({
      message: GFFind
    });
  };
});

// 12. event detail
router.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const EventSpecific = await Events.findOne({ _id:  eventId }, EDContent);
    res.status(200).json({
      data: EventSpecific
    });
  } catch (err) {
    res.status(400).json({
      message: GFFind
    });
  };
});

// 13. request an event
router.post("/event", authMiddleware, async (req, res) => {
  const { userId, image, name, location, date } = req.body;
  // const { userId, image, name, location } = req.body;

  try {
    await Events.create({
      userId, 
      image,
      name, 
      // date: Date.now(), 
      date, 
      location, 
      status: "pending"
    });

    res.status(200).json({
      message: ESCreate
    });
  } catch (err) {
    res.status(400).json({
      message: EFCreate
    });
  };
});

// 14. approve event request
router.patch("/event/approve/:eventId", adminMiddleware, async (req, res) => {
  const { eventId } = req.params;

  try {
    await Events.updateOne({ _id: eventId }, { $set: { status: Approved } });
    
    res.status(200).json({
      message: ESStatus + Approved + "."
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 15. change to pending
router.patch("/event/pending/:eventId", adminMiddleware, async (req, res) => {
  const { eventId } = req.params;

  try {
    await Events.updateOne({ _id: eventId }, { $set: { status: Pending } });
    
    res.status(200).json({
      message: ESStatus + Pending + "."
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 16. reject event request
router.patch("/event/reject/:eventId", adminMiddleware, async (req, res) => {
  const { eventId } = req.params;

  try {
    await Events.updateOne({ _id: eventId }, { $set: { status: Rejected } });
    
    res.status(200).json({
      message: ESStatus + Rejected + "."
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 17. edit event request 
router.patch("/event/:eventId", authMiddleware, async (req, res) => {
  const { eventId } = req.params;
  const { name, image, date, location } = req.body;

  try {
    await Events.updateOne({ _id: eventId }, { $set: { name, image, date, location, status: Pending }});

    res.status(200).json({
      message: ESUpdate
    });
  } catch (err) {
    res.status(400).json({
      message: GFUpdate
    });
  };
});

// 18. delete event request
router.delete("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    await Events.deleteOne({ _id: eventId });
    
    res.status(200).json({
      message: ESDelete
    });
  } catch (err) {
    res.status(400).json({
      message: GFDelete
    });
  };
});

module.exports = router;