const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      throw error;
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

  static async checkUserRole(id) {
    try {
      const user = await User.findById(id);

      return user.role;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await User.find({ email: email });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async generateToken(id, email) {
    let token;
    try {
      token = jwt.sign({ id: id, email: email }, process.env.TOKEN_SECRET, {
        expiresIn: "2h",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
};
