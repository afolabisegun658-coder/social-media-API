const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");

describe("Follow API", () => {
  let tokenA;
  let tokenB;
  let userA;
  let userB;

  beforeAll(async () => {
    userA = await User.create({
      first_name: "Alice",
      last_name: "A",
      username: "alicea",
      email: "alice@example.com",
      password: "hashed-password"
    });

    userB = await User.create({
      first_name: "Bob",
      last_name: "B",
      username: "bobb",
      email: "bob@example.com",
      password: "hashed-password"
    });

    const jwt = require("jsonwebtoken");
    tokenA = jwt.sign({ id: userA._id, username: userA.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    tokenB = jwt.sign({ id: userB._id, username: userB.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  });

  it("should allow a user to follow another user", async () => {
    const response = await request(app)
      .post(`/api/follows/${userB._id}`)
      .set("Authorization", `Bearer ${tokenA}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("follower");
  });

  it("should list followers for a user", async () => {
    const response = await request(app)
      .get("/api/follows/followers")
      .set("Authorization", `Bearer ${tokenB}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
