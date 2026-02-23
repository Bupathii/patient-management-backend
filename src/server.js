const app = require("./app");
const { env } = require("./config/env");

app.listen(env.port, () => {
  console.log(`Patient Management API running on port ${env.port}`);
});
