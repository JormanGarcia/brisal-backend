const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("users", UserSchema);
