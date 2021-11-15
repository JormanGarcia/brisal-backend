const { Schema, model } = require("mongoose");

const DishesEntity = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = model("dishes", DishesEntity);
