const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post(
  "/",
  protect,
  adminOnly,
  createEvent
);

module.exports = router;