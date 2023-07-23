const DiscountService = require("../services/DiscountService");
const InventoryService = require("../services/InventoryService");
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

  validateAddDiscount: async (req, res, next) => {
    const { id, discount_id } = req.body;
    if (id === undefined || id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (id === "" || typeof id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }

    if (discount_id === undefined || discount_id === null) {
      return res
        .status(400)
        .json({ "discount_id": "discount_id is required." });
    }

    if (discount_id === "" || typeof discount_id !== "string") {
      return res.status(400).json({
        "discount_id": "discount_id needs to be a string and is required.",
      });
    }

    next();
  },

  validateRemoveDiscount: async (req, res, next) => {
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
