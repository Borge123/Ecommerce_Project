const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    let jwtToken;
    let refreshToken;
    let payload;
    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res.status(400).json({ "User": "Did not find user" });
      }

      const id = user[0]._id.toString();
      const hash = user[0].password;
      const match = await bcrypt.compare(password, hash);

      if (!match) {
        return res.status(401).json({ "password": "wrong password" });
      }

      payload = {
        userId: id,
        firstName: user[0].firstName,
      };

      jwtToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1m",
      });

      refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "7d",
      });
      const now = new Date();
      const jwtExpire = now.setTime(now.getTime() + 0.01 * 3600 * 1000);

      res.cookie("refreshToken", refreshToken, {
        secure: true, // Set to true if using HTTPS
        httpOnly: true,
        domain: ".app.localhost",
        sameSite: "None", // Adjust to your requirements
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set the expiration time (7 days in this example)
      });

      res.status(200).json({
        jwtToken,
        refreshToken,
        payload,
        jwtExpire,
        message: { "Logged in": "Success" },
      });
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async logout(req, res, next) {
    try {
      return res
        .clearCookie("refreshToken", {
          secure: true, // Set to true if using HTTPS
          httpOnly: true,
          domain: ".app.localhost",
          sameSite: "None", // Adjust to your requirements
        })
        .status(200)
        .json({ "message": "Successfully logged out" });
    } catch (error) {
      console.log(error);
    }
  }

  static async refreshJwt(req, res, next) {
    if (req.cookies?.refreshToken) {
      const cookie = req.cookies.refreshToken;
      jwt.verify(cookie, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          // Handle invalid or expired refresh token

          res.status(401).json({ error: "Invalid or expired refresh token" });
        } else {
          // Generate a new JWT token
          const newJwtToken = jwt.sign(
            {
              userId: decoded.userId,
              firstName: decoded.firstName,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1m" }
          );

          // Update the JWT token in session storage
          // Update sessionStorage in client ---
          //sessionStorage.setItem('jwtToken', newJwtToken);

          // Return the new JWT token to the client
          res.json({ jwtToken: newJwtToken });
        }
      });
    } else {
      res.status(401).json({ error: "Refresh token not found" });
    }
  }

  static async getAuthorizedUserInfo(req, res, next) {
    if (req.cookies.refreshToken) {
      const user = await UserService.getUserById(req.userId);
      const token = req.cookies.refreshToken;
      try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
          if (err) {
            // Handle invalid or expired refresh token

            res.status(401).json({ error: "Invalid or expired refresh token" });
          } else {
            return res.json({
              user,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
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
        const result = await UserService.updateUser(checkIfUser._id, req.body);
        if (result) {
          return res.status(200).json({
            "Updated user": "Success",
            "user": req.body.firstName,
          });
        }
      } else {
        return res.status(400).json({ "User": "user not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async addBillingInfo(req, res, next) {
    try {
      console.log(req.userId);
      const checkIfUser = await UserService.getUserById(req.userId);

      if (checkIfUser) {
        const result = await UserService.addBillingInfo(
          checkIfUser._id,
          req.body
        );
        if (result) {
          return res.status(200).json({
            "Updated user": "Success",
            "user": checkIfUser.firstName,
          });
        }
      } else {
        return res.status(400).json({ "User": "user not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async changePassword(req, res, next) {
    try {
      const user = await UserService.getUserById(req.body.id);

      if (user) {
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const hash = user.password;
        const match = await bcrypt.compare(oldPassword, hash);

        if (!match) {
          return res.status(401).json({ "password": "wrong password" });
        }
        const result = await UserService.changePassword(user._id, newPassword);
        if (result) {
          return res.status(200).json({
            "Updated user": "Success",
            "user": user?.firstName,
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
