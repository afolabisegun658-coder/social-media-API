const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const Post = require("../src/models/post");
const jwt = require("jsonwebtoken");

describe("Likes API", () => {
  let token;
  let user;
  let post;

  beforeAll(async () => {
    user = await User.create({
      first_name: "Like",
      last_name: "User",
      username: "likeuser",
      email: "likeuser@example.com",
      password: "hashed-password"
    });

    token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    post = await Post.create({
      title: "Published post",
      content: "This is published",
      tags: ["news"],
      author: user._id,
      state: "published",
      like_count: 0
    });
  });

  it("should like a published post", async () => {
    const response = await request(app)
      .post(`/api/posts/${post._id}/like`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Post liked");
  });
});
