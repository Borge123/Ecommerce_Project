const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");

module.exports = {
  checkIfAdmin: async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ "Unathorized": "JWT token not provided" });
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

      const checkUser = await UserService.checkUserRole(decodedToken.id);

      if (checkUser === "admin") {
        next();
      } else {
        return res
          .status(403)
          .json({ "Unathorized": "Access denied due to user not being admin" });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ "Unathorized": "Access denied due to expired token" });
      } else {
        return res
          .status(500)
          .json({ error: error.name + " " + error.message });
      }
    }
  },

  checkIfRegistered: async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ "Unathorized": "JWT token not provided" });
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

      const checkUser = await UserService.checkUserRole(decodedToken.id);

      if (checkUser === "admin" || checkUser === "user") {
        req.user = decodedToken.id;
        next();
      } else {
        return res.status(403).json({
          "Unathorized": "Access denied due to user not being registered",
        });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ "Unathorized": "Access denied due to expired token" });
      } else {
        return res
          .status(500)
          .json({ error: error.name + " " + error.message });
      }
    }
  },
};
