const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || ""
};

module.exports = { env };
