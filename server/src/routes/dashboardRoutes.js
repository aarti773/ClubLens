const express = require("express");

const Event = require("../models/Event");
const Media = require("../models/Media");
const User = require("../models/User");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, async (req, res) => {
  try {
    const [
      totalEvents,
      totalMedia,
      totalImages,
      totalVideos,
      totalUsers,
      privateMedia,
      totalAiTags,
    ] = await Promise.all([
      Event.countDocuments(),
      Media.countDocuments(),
     Media.countDocuments({
  $or: [
    { mediaType: "image" },
    { mediaType: { $exists: false } },
  ],
}),
      Media.countDocuments({ mediaType: "video" }),
      User.countDocuments(),
      Media.countDocuments({ visibility: "private" }),
      Media.aggregate([
        {
          $project: {
            tagCount: {
              $size: {
                $ifNull: ["$tags", []],
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$tagCount" },
          },
        },
      ]),
    ]);

    res.status(200).json({
      totalEvents,
      totalMedia,
      totalImages,
      totalVideos,
      totalUsers,
      privateMedia,
      totalAiTags: totalAiTags[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
});

module.exports = router;