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
        role: "user",
      };

      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const result = await User.find();
      if (result.length > 0) {
        return result;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async checkDuplicateEmail(data) {
    try {
      const findEmail = await User.find({ email: data.email });
      if (findEmail.length >= 1) {
        return findEmail;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async checkUserRole(id) {
    try {
      const user = await User.findById(id);
      if (user) {
        return user.role;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findById(id);

      if (user) {
        return user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await User.find({ email: email });
      if (user.length >= 1) {
        return user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async generateToken(id, email, firstName) {
    let token;
    try {
      token = jwt.sign(
        { id: id, email: email, firstName: firstName },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateUser(id, data) {
    try {
      const result = await User.updateOne(
        { _id: id },
        {
          $set: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const result = await User.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
