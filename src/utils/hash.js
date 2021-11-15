const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  },

  compare: async (password, hashedpassword) =>
    await bcrypt.compare(password, hashedpassword),
};
