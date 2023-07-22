module.exports = {
  validateCreateDiscount: async (req, res, next) => {
    const { name, discount_percent, active } = req.body;

    if (name === undefined || name === null) {
      return res.status(400).json({ "name": "name is required." });
    }

    if (name === "" || typeof name !== "string") {
      return res.status(400).json({
        "name": "name needs to be a string and is required.",
      });
    }

    if (discount_percent === undefined || discount_percent === null) {
      return res
        .status(400)
        .json({ "discount_percent": "discount_percent is required." });
    }

    if (discount_percent === "" || typeof discount_percent !== "number") {
      return res.status(400).json({
        "discount_percent":
          "discount_percent needs to be a number and is required.",
      });
    }

    if (active === undefined || active === null) {
      return res.status(400).json({ "active": "active is required." });
    }

    if (active === "" || typeof active !== "boolean") {
      return res.status(400).json({
        "active": "active needs to be a boolean and is required.",
      });
    }

    next();
  },
};
