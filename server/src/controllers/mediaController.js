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

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    if (media.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can delete only your own uploads",
      });
    }

    await media.deleteOne();

    res.status(200).json({
      message: "Media deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}; 

module.exports = {
  uploadMedia,
  getEventMedia,
  deleteMedia,
};