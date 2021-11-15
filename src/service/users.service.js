const Users = require("../entities/users.entity");
const hash = require("../utils/hash");
const serialize = require("../serializer");

module.exports = {
  findAll: async () => {
    try {
      const users = await Users.find();
      console.log(users);
      return users;
    } catch (e) {
      throw e;
    }
  },

  findById: async (_id) => {
    const user = await Users.find({ _id });

    return user[0];
  },

  findByUsername: async (username) => {
    const user = await Users.find({ username });

    console.log(user);

    return user[0];
  },

  createUser: async ({ name, username, password, role = "USER" }) => {
  

    try {
      const newUser = new Users({
        name,
        username,
        password: await hash.hashPassword(password),
        role,
      });
      await newUser.save();

      return newUser;
    } catch (e) {
      throw e;
    }
  },

  deleteUser: async (_id) => {
    try {
      await Users.deleteOne({ _id });
    } catch (e) {
      throw e;
    }
  },

  updatePassword: async ({ _id, newPassword }) => {
    try {
      await Users.updateOne(
        { _id },
        {
          password: await hash.hashPassword(newPassword),
        }
      );
    } catch (e) {
      throw e;
    }
  },
  update: async (_id, data) => {
    try {
      await Users.updateOne(
        { _id },
        {
          ...data,
        }
      );
    } catch (e) {
      throw e;
    }
  },
};
