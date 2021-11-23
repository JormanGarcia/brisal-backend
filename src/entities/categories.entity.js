const { Schema, model } = require("mongoose");

const categories = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = model("categories", categories);
