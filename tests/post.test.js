const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");

describe("Post API", () => {
  let token;
  let user;

  beforeAll(async () => {
    user = await User.create({
      first_name: "Post",
      last_name: "User",
      username: "postuser",
      email: "postuser@example.com",
      password: "hashed-password"
    });

    token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  });

  it("should create a draft post", async () => {
    const response = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My first post",
        content: "Hello world",
        tags: ["intro"]
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("title", "My first post");
  });
});
