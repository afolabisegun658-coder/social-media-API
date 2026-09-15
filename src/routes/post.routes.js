// src/routes/post.routes.js
const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const {
  authenticate,
  optionalAuthenticate
} = require("../middleware/auth.middleware");

router.get(
  "/",
  optionalAuthenticate,
  postController.getPublishedPosts
);

router.get(
  "/mine",
  authenticate,
  postController.getMyPosts
);

router.get(
  "/:id",
  optionalAuthenticate,
  postController.getSinglePost
);

router.post(
  "/",
  authenticate,
  postController.createPost
);

router.patch(
  "/:id",
  authenticate,
  postController.updatePost
);

router.delete(
  "/:id",
  authenticate,
  postController.deletePost
);

router.post(
  "/:id/publish",
  authenticate,
  postController.publishPost
);

router.post(
  "/:id/like",
  authenticate,
  postController.likePost
);

router.delete(
  "/:id/like",
  authenticate,
  postController.unlikePost
);

module.exports = router;
