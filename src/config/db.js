const mongoose = require("mongoose");
const { env } = require("./env");

async function connectToDatabase() {
  if (!env.mongoUri) {
    throw new Error("Missing MONGODB_URI in environment variables.");
  }

  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
}

module.exports = { connectToDatabase };
