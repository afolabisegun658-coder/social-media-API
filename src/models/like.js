// src/models/Like.js
const mongoose = require("mongoose");

const Like = mongoose.models.Like || mongoose.model(
  "Like",
  new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    }
  },
    { timestamps: true }
  )
);

Like.schema.index(
  { user: 1, post: 1 },
  { unique: true }
);

module.exports = Like;
