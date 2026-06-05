const {
  generateTagsFromText,
} = require("../utils/aiTagGenerator");

const Media = require("../models/Media");
const User = require("../models/User");
const Notification = require("../models/Notification");
const cloudinary = require("../utils/cloudinary");
function uploadBufferToCloudinary(fileBuffer, resourceType) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "clublens",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

const uploadMedia = async (req, res) => {
  try {
   const {
  caption,
  event,
  visibility,
  tags,
  taggedUsers,
} = req.body;
   const aiTags = await generateTagsFromText(
  caption || ""
);
    if (!req.file) {
      return res.status(400).json({
        message: "Image or Video is required",
      });
    }

  const taggedEmails = taggedUsers
  ? taggedUsers
      .split(",")
      .map((email) => email.trim())
  : [];

const usersToTag = await User.find({
  email: { $in: taggedEmails },
});

const mediaType = req.file.mimetype.startsWith("video")
  ? "video"
  : "image";

const uploadResult = await uploadBufferToCloudinary(
  req.file.buffer,
  mediaType
);

const media = await Media.create({
  imageUrl: uploadResult.secure_url,
mediaType,
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
  taggedUsers: usersToTag.map(
    (user) => user._id
  ),
});

for (const taggedUser of usersToTag) {
  if (
    taggedUser._id.toString() !==
    req.user._id.toString()
  ) {
    await Notification.create({
      recipient: taggedUser._id,
      sender: req.user._id,
      media: media._id,
      type: "tag",
      message: "tagged you in a photo",
    });
  }
}

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
  .populate("taggedUsers", "name email")
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

  if (
    media.uploadedBy.toString() !==
    req.user._id.toString()
  ) {
    await Notification.create({
      recipient: media.uploadedBy,
      sender: req.user._id,
      media: media._id,
      type: "like",
      message: "liked your photo",
    });
  }
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

  if (
    media.uploadedBy.toString() !==
    req.user._id.toString()
  ) {
    await Notification.create({
      recipient: media.uploadedBy,
      sender: req.user._id,
      media: media._id,
      type: "favourite",
      message: "added your photo to favourites",
    });
  }
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

if (
  media.uploadedBy.toString() !==
  req.user._id.toString()
) {
  await Notification.create({
    recipient: media.uploadedBy,
    sender: req.user._id,
    media: media._id,
    type: "comment",
    message: "commented on your photo",
  });
}

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

    const media = await Media.find()
      .populate("uploadedBy", "name")
      .populate("event", "title category date");

    const filteredMedia = media.filter((item) => {
      const captionMatch =
        item.caption?.toLowerCase().includes(
          searchQuery.toLowerCase()
        );

      const tagMatch = item.tags?.some((tag) =>
        tag.toLowerCase().includes(
          searchQuery.toLowerCase()
        )
      );

      const eventMatch =
        item.event?.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const uploaderMatch =
        item.uploadedBy?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      
          const formattedDate = new Date(
  item.createdAt
).toDateString().toLowerCase();

const uploadDateMatch =
  formattedDate.includes(
    searchQuery.toLowerCase()
  );

      return (
  captionMatch ||
  tagMatch ||
  eventMatch ||
  uploaderMatch ||
  uploadDateMatch
);
    });

    res.status(200).json(filteredMedia);
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