const express = require("express");

const {
  uploadMedia,
  getEventMedia,
} = require("../controllers/mediaController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("image"),
  uploadMedia
);

router.get(
  "/event/:eventId",
  getEventMedia
);

module.exports = router;