const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const mediaSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    caption: {
      type: String,
      trim: true,
    },
  
    tags: [
  {
    type: String,
    trim: true,
  },
],

    visibility: {
  type: String,
  enum: ["public", "private"],
  default: "public",
},
 
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
   favourites: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;