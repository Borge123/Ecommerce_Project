const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async signup(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);

      return res.status(200).json({ "User": "Success", "Created": newUser });
    } catch (error) {
      //allow database to deal with duplicate errors for now
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: error.name + " " + error.message });
      } else {
        return res
          .status(500)
          .json({ error: error.name + " " + error.message });
      }
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    let token;
    try {
      const user = await UserService.getUserByEmail(email);

      if (user) {
        const id = user[0]._id.toString();
        const hash = user[0].password;
        const match = await bcrypt.compare(password, hash);

        if (match) {
          token = await UserService.generateToken(
            id,
            user[0].email,
            user[0].firstName
          );
          //console.log(token);
          return res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json({ "Logged in": "Success" });
        } else {
          return res.status(400).json({ "password": "wrong password" });
        }
      }

      return res.status(400).json({ "User": "Did not find user" });
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async logout(req, res, next) {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ "message": "Successfully logged out" });
  }

  static async getAuthorizedUserInfo(req, res, next) {
    return res.json({ user: { id: req.userId, email: req.email } });
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();

      if (users) {
        return res.status(200).json({ "Users": "Success", "Users": users });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }
  static async updateUser(req, res, next) {
    try {
      const checkIfUser = await UserService.getUserById(req.body.id);

      if (checkIfUser) {
        const result = await UserService.updateUser(req.body.id, req.body);
        if (result) {
          return res.status(200).json({
            "Updated user": "Success",
            "user": checkIfUser?.firstName,
          });
        }
      } else {
        return res.status(400).json({ "User": "user not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async deleteUser(req, res, next) {
    const { id } = req.body;

    try {
      const checkIfUser = await UserService.getUserById(id);

      if (checkIfUser) {
        const result = await UserService.deleteUser(id);
        if (result) {
          return res.status(200).json({
            "Deleted user": "Success",
            "user": checkIfUser?.firstName,
          });
        }
      } else {
        return res.status(400).json({ "User": "user not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }
};
