const UserService = require("../services/UserService");

module.exports = class UserController {
  static async createUser(req, res, next) {
    try {
      const checkEmail = await UserService.checkDuplicateEmail(req.body);

      if (checkEmail.length > 0) {
        return res
          .status(400)
          .json({ "Duplicate Error": "email is already in use" });
      }
      const newUser = await UserService.createUser(req.body);
      console.log(newUser);
      res.json(newUser);
    } catch (error) {
      next(error);
      res.status(500).json({ error: error });
    }
  }
};
