const express = require("express");

const {
  uploadMedia,
  getEventMedia,
  deleteMedia,
  toggleLikeMedia,
  toggleFavouriteMedia,
  addCommentToMedia,
  searchMedia,
} = require("../controllers/mediaController");

const {
  protect,
  optionalAuth,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("image"),
  uploadMedia
);

router.get(
  "/search",
  searchMedia
);

router.get(
  "/event/:eventId",
  optionalAuth,
  getEventMedia
);

router.post(
  "/:mediaId/like",
  protect,
  toggleLikeMedia
);

router.post(
  "/:mediaId/favourite",
  protect,
  toggleFavouriteMedia
);

router.post(
  "/:mediaId/comments",
  protect,
  addCommentToMedia
);

router.delete(
  "/:mediaId",
  protect,
  deleteMedia
);

module.exports = router;