const express = require("express");

const {
  createEvent,
  getEvents,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getEvents);
router.post("/", protect, createEvent);

module.exports = router;
