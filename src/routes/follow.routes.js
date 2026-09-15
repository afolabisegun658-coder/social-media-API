// src/routes/follow.routes.js
const express = require("express");
const router = express.Router();

const followController = require("../controllers/follow.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.get("/followers", authenticate, followController.getFollowers);
router.get("/", authenticate, followController.getFollowing);
router.post("/:userId", authenticate, followController.followUser);
router.delete("/:userId", authenticate, followController.unfollowUser);

module.exports = router;
