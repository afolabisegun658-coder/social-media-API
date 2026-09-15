// src/models/Post.js
const mongoose = require("mongoose");

const Post = mongoose.models.Post || mongoose.model(
  "Post",
  new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
    like_count: {
      type: Number,
      default: 0
    },
    comment_count: {
      type: Number,
      default: 0
    }
  },
    { timestamps: true }
  )
);

Post.schema.index({
  title: "text",
  content: "text",
  tags: "text"
});

module.exports = Post;
