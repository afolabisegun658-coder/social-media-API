const mongoose = require("mongoose");

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-key";
  process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/social_media_test";

  await mongoose.connect(process.env.MONGO_URI);
}, 120000);

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});
