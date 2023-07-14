module.exports = {
  validateSignup: async (req, res, next) => {
    const { email, firstName, lastName, password, role } = req.body;
    if (firstName === undefined || firstName === null) {
      return res.status(400).json({ "firstName": "firstName is required." });
    }

    if (firstName === "" || typeof firstName !== "string") {
      return res.status(400).json({
        "firstName": "firstName needs to be a string and is required.",
      });
    }

    if (lastName === undefined || lastName === null) {
      return res.status(400).json({ "lastName": "lastName is required." });
    }

    if (lastName === "" || typeof lastName !== "string") {
      return res.status(400).json({
        "lastName": "lastName needs to be a string and is required.",
      });
    }

    if (email === undefined || email === null) {
      return res.status(400).json({ "email": "email is required." });
    }

    if (email === "" || typeof email !== "string") {
      return res
        .status(400)
        .json({ "email": "email is required and needs to be a string" });
    }

    if (password === undefined || password === null) {
      return res.status(400).json({ "password": "password is required." });
    }

    if (password === "" || typeof password !== "string") {
      return res.status(400).json({
        "password": "password needs to be a string and is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        "password": "password needs to be atleast 6 characters .",
      });
    }
    if (role === undefined || role === null) {
      return res.status(400).json({ "role": "role is required." });
    }

    if (role === "" || typeof role !== "string") {
      return res.status(400).json({
        "role": "role needs to be a string and is required.",
      });
    }
    console.log(role === "admin");
    if (role.toLowerCase() != "admin" && role.toLowerCase() != "user") {
      return res.status(400).json({
        "role": "role needs to be either admin or user",
      });
    }
    next();
  },

  validateLogin: async (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined || email === null) {
      return res.status(400).json({ "email": "email is required." });
    }

    if (email === "" || typeof email !== "string") {
      return res
        .status(400)
        .json({ "email": "email is required and needs to be a string" });
    }

    if (password === undefined || password === null) {
      return res.status(400).json({ "password": "password is required." });
    }

    if (password === "" || typeof password !== "string") {
      return res.status(400).json({
        "password": "password needs to be a string and is required.",
      });
    }

    next();
  },
};
