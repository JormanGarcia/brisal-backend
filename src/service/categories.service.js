const Categories = require("../entities/categories.entity");


module.exports = {
    findAll: async () => {
      try {
        const categories = await Categories.find();
        console.log(categories);
        return categories;
      } catch (e) {
        throw e;
      }
    },
  
    findById: async (_id) => {
      const category = await Categories.find({ _id });
  
      if (category.length === 0) {
        throw new Error("_id not exist");
      }
  
      return category[0];
    },
  
    create: async ({ name, description, category, price, photos }) => {
      try {
        const newCategory = new Categories({ name, description, category, price, photos });
        await newCategory.save();
  
        return newCategory;
      } catch (e) {
        throw e;
      }
    },
  
    delete: async (_id) => {
      try {
        await Categories.deleteOne({ _id });
      } catch (e) {
        throw e;
      }
    },
  
    update: async (_id, dish) => {
      try {
        await Categories.updateOne({ _id }, dish);
      } catch (e) {
        throw e;
      }
    },
  };
  