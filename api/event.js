/// MAKE CUSTOMIZEABLE DATE

const express = require("express");

const router = express.Router();

const Events = require("../schemas/events");

router.get("/test/event", (req, res) => {
  res.send("Connected to API event");
});

// 11. fetch event list
router.get("/event", async (req, res) => {
  const results = await Events.find(null, 'image name date location status');

  res.json({
    data: results,
  });
});


// 12. event detail
router.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const EventSpecific = await Events.findOne({ _id:  eventId }, 'image name date location status');

  res.json({
    data: EventSpecific,
  });
});

// 13. request an event
router.post("/event", async (req, res) => {
  // const { userId, image, name, location, date } = req.body;
  const { userId, image, name, location } = req.body;
  const createEvent = await Events.create({
    userId, 
    image,
    name, 
    date: Date.now(), 
    // date, 
    location, 
    status: "pending"
  });

  res.json({
    message: "Event created",
    data: createEvent });
});

// 14. approve event request
router.patch("/event/approve/:eventId", async (req, res) => {
  const { eventId } = req.params;
  await Events.updateOne({ _id: eventId }, { $set: { status: "approved" } });
  
  res.json({
    message: "Event request approved",
  });
});

// 15. change to pending
router.patch("/event/pending/:eventId", async (req, res) => {
  const { eventId } = req.params;
  await Events.updateOne({ _id: eventId }, { $set: { status: "pending" } });
  
  res.json({
    message: "Event status changed to pending",
  });
});

// 16. reject event request
router.patch("/event/reject/:eventId", async (req, res) => {
  const { eventId } = req.params;
  await Events.updateOne({ _id: eventId }, { $set: { status: "rejected" } });
  
  res.json({
    message: "Event rejected",
  });
});

// 17. edit event request 
router.patch("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { name, image, date, location } = req.body;
  await Events.updateOne({ _id: eventId }, { $set: { name, image, date, location, status: "pending" } });
  
  res.json({
    message: "Event information changed",
  });
});

// 18. delete event request
router.delete("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;

  await Events.deleteOne({ _id: eventId });
  res.json({
    message: "Event deleted",
  });
})

module.exports = router;