const mongoose = require("mongoose");
const ENV = require("./config/env");

try {
  mongoose.connect(ENV.mongoURI, () => {
    console.log("Database Connected");
  });
} catch (e) {
  console.error("Mongo Connection Failed");

  throw e;
}
