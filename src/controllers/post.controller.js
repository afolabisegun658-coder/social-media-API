// src/controllers/post.controller.js
const Post = require("../models/Post");
const Like = require("../models/Like");

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    const post = await Post.create({
      title,
      content,
      tags,
      author: req.user.id,
      state: "draft"
    });

    const populatedPost = await post.populate(
      "author",
      "first_name last_name username email"
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    next(error);
  }
};

exports.getPublishedPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      author,
      tags,
      sort = "timestamp"
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const pageLimit = Math.min(Number(limit), 100);
    const skip = (currentPage - 1) * pageLimit;

    const filter = {
      state: "published"
    };

    if (search) {
      filter.$text = { $search: search };
    }

    if (tags) {
      filter.tags = {
        $in: tags.split(",").map((tag) => tag.toLowerCase())
      };
    }

    if (author) {
      filter.author = author;
    }

    const sortMap = {
      like_count: { like_count: -1 },
      comment_count: { comment_count: -1 },
      timestamp: { createdAt: -1 }
    };

    const sortOption = sortMap[sort] || sortMap.timestamp;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate(
          "author",
          "first_name last_name username email avatar"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(pageLimit),
      Post.countDocuments(filter)
    ]);

    res.json({
      data: posts,
      pagination: {
        page: currentPage,
        limit: pageLimit,
        total,
        pages: Math.ceil(total / pageLimit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      state: "published"
    }).populate(
      "author",
      "first_name last_name username email avatar"
    );

    if (!post) {
      return res.status(404).json({
        message: "Published post not found"
      });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      state
    } = req.query;

    const filter = {
      author: req.user.id
    };

    if (state && ["draft", "published"].includes(state)) {
      filter.state = state;
    }

    const currentPage = Math.max(Number(page), 1);
    const pageLimit = Math.min(Number(limit), 100);
    const skip = (currentPage - 1) * pageLimit;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate(
          "author",
          "first_name last_name username email"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit),
      Post.countDocuments(filter)
    ]);

    res.json({
      data: posts,
      pagination: {
        page: currentPage,
        limit: pageLimit,
        total,
        pages: Math.ceil(total / pageLimit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user.id
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const allowedFields = ["title", "content", "tags", "state"];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        post[field] = req.body[field];
      }
    }

    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.publishPost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user.id
      },
      {
        state: "published"
      },
      {
        new: true
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    await Like.deleteMany({ post: post._id });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      state: "published"
    });

    if (!post) {
      return res.status(404).json({
        message: "Published post not found"
      });
    }

    try {
      await Like.create({
        user: req.user.id,
        post: post._id
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          message: "Post already liked"
        });
      }

      throw error;
    }

    post.like_count += 1;
    await post.save();

    res.json({
      message: "Post liked",
      like_count: post.like_count
    });
  } catch (error) {
    next(error);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    const like = await Like.findOneAndDelete({
      user: req.user.id,
      post: req.params.id
    });

    if (!like) {
      return res.status(404).json({
        message: "Post has not been liked"
      });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { like_count: -1 } },
      { new: true }
    );

    res.json({
      message: "Post unliked",
      like_count: Math.max(post.like_count, 0)
    });
  } catch (error) {
    next(error);
  }
};
