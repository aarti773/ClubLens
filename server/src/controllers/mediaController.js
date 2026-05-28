const Media = require("../models/Media");

const uploadMedia = async (req, res) => {
  try {
    const { caption, event } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const media = await Media.create({
      imageUrl: req.file.path,
      uploadedBy: req.user._id,
      event,
      caption,
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getEventMedia = async (req, res) => {
  try {
    const media = await Media.find({
      event: req.params.eventId,
    })
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadMedia,
  getEventMedia,
};