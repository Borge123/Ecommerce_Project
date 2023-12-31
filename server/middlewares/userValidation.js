const validator = require("validator");
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

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ "email": "email is not in the right format." });
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

    // might add possibility to chose role from app eventually but for now enforce admin users have to be created from the database itself
    // if (role === undefined || role === null) {
    //   return res.status(400).json({ "role": "role is required." });
    // }

    // if (role === "" || typeof role !== "string") {
    //   return res.status(400).json({
    //     "role": "role needs to be a string and is required.",
    //   });
    // }

    // if (role.toLowerCase() != "admin" && role.toLowerCase() != "user") {
    //   return res.status(400).json({
    //     "role": "role needs to be either admin or user",
    //   });
    // }
    next();
  },

  validateUpdateUser: async (req, res, next) => {
    const { email, firstName, lastName } = req.body;
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

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ "email": "email is not in the right format." });
    }

    next();
  },

  validateAddBillingInfo: async (req, res, next) => {
    const { address, city, zip, house_number } = req.body;
    if (address === undefined || address === null) {
      return res.status(400).json({ "address": "address is required." });
    }

    if (address === "" || typeof address !== "string") {
      return res.status(400).json({
        "address": "address needs to be a string and is required.",
      });
    }

    if (city === undefined || city === null) {
      return res.status(400).json({ "city": "city is required." });
    }

    if (city === "" || typeof city !== "string") {
      return res.status(400).json({
        "city": "city needs to be a string and is required.",
      });
    }

    if (zip === undefined || zip === null) {
      return res.status(400).json({ "zip": "zip is required." });
    }

    if (zip === "" || typeof zip !== "string") {
      return res
        .status(400)
        .json({ "zip": "zip is required and needs to be a string" });
    }

    if (house_number === undefined || house_number === null) {
      return res
        .status(400)
        .json({ "house_number": "house_number is required." });
    }

    if (house_number === "" || typeof house_number !== "string") {
      return res.status(400).json({
        "house_number": "house_number is required and needs to be a string",
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

  validateDeleteUser: async (req, res, next) => {
    const { id } = req.body;

    if (id === undefined || id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (id === "" || typeof id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }
    next();
  },
};
