// src/models/User.js
const mongoose = require("mongoose");

const User = mongoose.models.User || mongoose.model(
  "User",
  new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    bio: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    }
  },
    { timestamps: true }
  )
);

module.exports = User;
