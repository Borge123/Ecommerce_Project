const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async signup(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);

      res.json(newUser);
    } catch (error) {
      //allow database to deal with duplicate errors for now
      if (error.code === 11000) {
        return res.status(400).json({ error: "duplicate key error" });
      } else {
        return res.status(500).json({ error: error });
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
          token = await UserService.generateToken(id, user[0].email);
          console.log(token);
          return res
            .status(200)
            .json({ "Logged in": "Success", "token": token });
        } else {
          return res.status(400).json({ "Logged in": "wrong password" });
        }
      }

      return res.status(400).json({ "User": "Did not find user" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
