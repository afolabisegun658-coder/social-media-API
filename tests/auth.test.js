// tests/auth.test.js
const request = require("supertest");
const app = require("../src/app");

describe("Authentication", () => {
  it("should register a user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        first_name: "Jane",
        last_name: "Doe",
        username: "janedoe",
        email: "jane@example.com",
        password: "password123"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe("jane@example.com");
  });

  it("should reject duplicate email", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        first_name: "Jane",
        last_name: "Doe",
        username: "janedoe",
        email: "jane@example.com",
        password: "password123"
      });

    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        first_name: "Another",
        last_name: "User",
        username: "anotheruser",
        email: "jane@example.com",
        password: "password123"
      });

    expect(response.statusCode).toBe(409);
  });
});
