const Dishes = require("../entities/dishes.entity");

module.exports = {
  findAll: async () => {
    try {
      const dishes = await Dishes.find();
      console.log(dishes);
      return dishes;
    } catch (e) {
      throw e;
    }
  },

  findById: async (_id) => {
    const Dish = await Dishes.find({ _id });

    if (Dish.length === 0) {
      throw new Error("_id not exist");
    }

    return Dish[0];
  },

  createDish: async ({ name, description, category, price, photos }) => {
    try {
      const newDish = new Dishes({ name, description, category, price, photos });
      await newDish.save();

      return newDish;
    } catch (e) {
      throw e;
    }
  },

  deleteDish: async (_id) => {
    try {
      await Dishes.deleteOne({ _id });
    } catch (e) {
      throw e;
    }
  },

  updateDish: async (_id, dish) => {
    try {
      await Dishes.updateOne({ _id }, dish);
    } catch (e) {
      throw e;
    }
  },
};
