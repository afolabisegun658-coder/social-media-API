// src/controllers/follow.controller.js
const Follow = require("../models/follow");
const User = require("../models/User");

exports.followUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (String(req.user.id) === String(userId)) {
      return res.status(400).json({
        message: "You cannot follow yourself"
      });
    }

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    try {
      const follow = await Follow.create({
        follower: req.user.id,
        following: userId
      });

      res.status(201).json(follow);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          message: "User already followed"
        });
      }

      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const follow = await Follow.findOneAndDelete({
      follower: req.user.id,
      following: req.params.userId
    });

    if (!follow) {
      return res.status(404).json({
        message: "Follow relationship not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getFollowing = async (req, res, next) => {
  try {
    const following = await Follow.find({
      follower: req.user.id
    }).populate(
      "following",
      "first_name last_name username email avatar"
    );

    res.json(following.map((item) => item.following));
  } catch (error) {
    next(error);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const followers = await Follow.find({
      following: req.user.id
    }).populate(
      "follower",
      "first_name last_name username email avatar"
    );

    res.json(followers.map((item) => item.follower));
  } catch (error) {
    next(error);
  }
};
