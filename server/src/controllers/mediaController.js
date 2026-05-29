const {
  generateTagsFromText,
} = require("../utils/aiTagGenerator");

const Media = require("../models/Media");

const uploadMedia = async (req, res) => {
  try {
   const { caption, event, visibility, tags } = req.body;
   const aiTags = await generateTagsFromText(
  caption || ""
);
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
  visibility: visibility || "public",
  tags: [
  ...(tags
    ? tags.split(",").map((tag) => tag.trim())
    : []),
  ...aiTags,
],
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
    const query = {
      event: req.params.eventId,
    };

    if (!req.user) {
      query.visibility = "public";
    }

    const media = await Media.find(query)
      .populate("uploadedBy", "name")
      .populate("comments.user", "name")
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

const toggleLikeMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    const alreadyLiked = media.likes.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      media.likes = media.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    } else {
      media.likes.push(req.user._id);
    }

    await media.save();

    res.status(200).json({
      likes: media.likes,
      likesCount: media.likes.length,
      isLiked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const toggleFavouriteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    const alreadyFavourited = media.favourites.some(
      (userId) =>
        userId.toString() === req.user._id.toString()
    );

    if (alreadyFavourited) {
      media.favourites = media.favourites.filter(
        (userId) =>
          userId.toString() !== req.user._id.toString()
      );
    } else {
      media.favourites.push(req.user._id);
    }

    await media.save();

    res.status(200).json({
      favourites: media.favourites,
      favouritesCount: media.favourites.length,
      isFavourited: !alreadyFavourited,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addCommentToMedia = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const media = await Media.findById(req.params.mediaId);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    media.comments.push({
      user: req.user._id,
      text,
    });

    await media.save();

    const updatedMedia = await Media.findById(req.params.mediaId)
      .populate("uploadedBy", "name")
      .populate("comments.user", "name");

    res.status(201).json(updatedMedia);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchMedia = async (req, res) => {
  try {
    const { query } = req.query;

    const searchQuery = query?.trim();

    if (!searchQuery) {
      return res.status(200).json([]);
    }

    const media = await Media.find({
      $or: [
        { caption: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate("uploadedBy", "name")
      .populate("event", "title category date")
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
  deleteMedia,
  toggleLikeMedia,
  addCommentToMedia,
  toggleFavouriteMedia,
  searchMedia,
};