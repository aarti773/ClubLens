const express = require("express");

const {
  uploadMedia,
  getEventMedia,
  deleteMedia,
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

router.delete(
  "/:mediaId",
  protect,
  deleteMedia
);

module.exports = router;