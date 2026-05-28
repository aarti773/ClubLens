const Event = require("../models/Event");

async function createEvent(req, res) {
  try {
   const event = new Event({
  ...req.body,
  createdBy: req.user._id,
});

await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log(error.message);

res.status(500).json({
  message: error.message,
});
  }
}

async function getEvents(req, res) {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email role")
      .sort({ date: -1 });

    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
}

module.exports = {
  createEvent,
  getEvents,
};