const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports = class UserService {
  static async createUser(data) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      const newUser = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role: data.role,
      };

      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async checkDuplicateEmail(data) {
    try {
      const findEmail = await User.find({ email: data.email });
      return findEmail;
    } catch (error) {
      console.log(error);
    }
  }
};
