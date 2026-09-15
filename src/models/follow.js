// src/models/Follow.js
const mongoose = require("mongoose");

const Follow = mongoose.models.Follow || mongoose.model(
  "Follow",
  new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
    { timestamps: true }
  )
);

Follow.schema.index(
  { follower: 1, following: 1 },
  { unique: true }
);

module.exports = Follow;
